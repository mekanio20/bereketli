<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-show="isOpen"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                @click.self="closeModal">
                <div class="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300"
                    :class="{ 'animate-scale-in': isOpen }">
                    <!-- Close Button -->
                    <button @click="closeModal"
                        class="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#F3F8FF] hover:bg-[#edf5ff] hover:scale-110 transform transition-all duration-300 group"
                        aria-label="Close">
                        <close-icon :size="20" />
                    </button>

                    <div class="grid grid-cols-1 md:grid-cols-2 max-h-[700px]">
                        <!-- Left Side - Illustration -->
                        <div class="hidden md:flex items-center justify-center">
                            <div class="relative w-full h-full">
                                <MouseScaleImage class="w-full h-full object-cover transition-transform duration-700"
                                    :src="authImage" :maxScale="1.15" :parallax="50" :transition="400" />
                            </div>
                        </div>

                        <!-- Right Side - Form -->
                        <div class="flex flex-col py-8 lg:pt-40 md:pt-36 pt-20 relative">

                            <img :src="background" class="absolute top-32 -z-10 w-full h-[500px] object-cover" />

                            <h2
                                class="text-2xl lg:text-3xl font-bold text-[#222222] mb-8 text-center animate-slide-down">
                                {{ $t('names.otp') }}
                            </h2>

                            <!-- Form -->
                            <form @submit.prevent="handleSubmit" class="flex-1 flex flex-col px-8">
                                <Transition name="fade" mode="out-in">
                                    <div class="w-full flex justify-between sm:gap-x-4 gap-x-2 pb-5">
                                        <input v-for="(_, index) in codeInputs" :key="index" v-model="codeInputs[index]"
                                            @input="handleInput(index)" @keydown.backspace="handleBackspace(index)"
                                            maxlength="1" :ref="el => inputRefs[index] = el"
                                            class="w-full h-14 text-center text-base font-sf_pro font-medium text-black rounded-lg bg-[#EBF3FD] focus:outline-none focus:ring-1 focus:ring-[#F98900] focus:bg-white"
                                            type="text" inputmode="numeric" />
                                    </div>
                                </Transition>

                                <div class="flex items-center justify-between pb-5">
                                    <button type="button" @click.stop="resetTimer" class="text-[#F98900] hover:underline cursor-pointer">
                                        {{ $t('buttons.resend') }}
                                    </button>
                                    <span class="text-sm font-medium text-[#222222]">
                                        {{ formattedTime }}
                                    </span>
                                </div>

                                <!-- Submit Button -->
                                <button type="submit" :disabled="isSubmitting || !isCodeComplete"
                                    class="w-full light_effect py-4 bg-[#002645] text-white font-semibold rounded-full hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-12">
                                    <span v-if="!isSubmitting">{{ $t('buttons.next') }}</span>
                                    <span v-else class="flex items-center justify-center">
                                        <animate_spin-icon />
                                        {{ $t('info.loading') }}
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import authImage from '@/assets/images/auth.webp'
import background from '@/assets/images/modal.webp'
const emit = defineEmits(['close', 'success', 'redirect'])
const authStore = useAuthStore()
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})

// Form state
const isSubmitting = ref(false)
const timer = ref(60)
const timerInterval = ref(null)
const isTimerActive = ref(false)
const codeInputs = ref(["", "", "", "", "", ""])
const inputRefs = ref([]);

const formattedTime = computed(() => {
    const minutes = Math.floor(timer.value / 60);
    const seconds = timer.value % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
})

const isCodeComplete = computed(() => {
    return codeInputs.value.every((digit) => digit !== "");
})

// Methods
const handleSubmit = async () => {
    if (isCodeComplete.value) {
        isSubmitting.value = true
        try {
            const register_data = JSON.parse(localStorage.getItem('register_data'))
            const response = await authStore.register({ ...register_data, otp: [...codeInputs.value].join('') })
            if (response.status === "ok") {
                closeModal()
                emit('success', true)
            }
        } catch (err) {
            console.error(err)
            emit('success', false)
        } finally {
            isSubmitting.value = false
        }
    }
}

const startTimer = () => {
    timerInterval.value = setInterval(() => {
        if (timer.value > 0) {
            timer.value--;
        } else {
            isTimerActive.value = false;
            clearInterval(timerInterval.value);
        }
    }, 1000);
}

const resetTimer = async () => {
    const register_data = JSON.parse(localStorage.getItem('register_data'))

    await authStore.sendOtp({
        email: register_data.email,
        phone_number: register_data.phone_number,
        purpose: "registration"
    })
    timer.value = 60;
    isTimerActive.value = true;
    clearInterval(timerInterval.value);
    startTimer();
}

const handleInput = (index) => {
    const currentInput = codeInputs.value[index];
    if (!/^\d$/.test(currentInput)) {
        codeInputs.value[index] = "";
        return;
    }
    if (index < codeInputs.value.length - 1) {
        inputRefs.value[index + 1]?.focus();
    }
}

const handleBackspace = (index) => {
    if (codeInputs.value[index] === "" && index > 0) {
        inputRefs.value[index - 1]?.focus();
    }
}

watch(() => props.isOpen, (isOpen) => { if (isOpen) startTimer() })

onUnmounted(() => {
    clearInterval(timerInterval.value);
})

const closeModal = () => {
    emit('close')
}
</script>

<style scoped>
/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .animate-scale-in {
    animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
    from {
        transform: scale(0.9);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Animations */
@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-20px);
    }
}

@keyframes slideDown {
    from {
        transform: translateY(-20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes truckEntry {

    0%,
    100% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(-5px);
    }
}

@keyframes floatPaper {

    0%,
    100% {
        transform: translateY(0) rotate(0deg);
    }

    50% {
        transform: translateY(-10px) rotate(3deg);
    }
}

@keyframes floatEnvelope {

    0%,
    100% {
        transform: translateY(0) translateX(0);
    }

    50% {
        transform: translateY(-8px) translateX(5px);
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.animate-slide-down {
    animation: slideDown 0.5s ease-out;
}

.animate-truck-entry {
    animation: truckEntry 3s ease-in-out infinite;
}

.animate-float-paper {
    animation: floatPaper 4s ease-in-out infinite;
}

.animate-float-envelope {
    animation: floatEnvelope 5s ease-in-out infinite;
}
</style>
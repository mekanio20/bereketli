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
                        <div class="flex flex-col py-8 md:pt-24 relative">

                            <img :src="background" class="absolute top-32 -z-10 w-full h-[500px] object-cover" />

                            <h2
                                class="text-2xl lg:text-3xl font-bold text-[#222222] mb-16 text-center animate-slide-down">
                                Açar sözi döretmek
                            </h2>

                            <!-- Form -->
                            <form @submit.prevent="handleSubmit" class="flex-1 flex flex-col px-8">
                                <Transition name="fade" mode="out-in">
                                    <div class="flex flex-col space-y-8">
                                        <div>
                                            <label id="password" class="inline-block mb-3 text-[#222222]">Açar
                                                sözi</label>
                                            <div class="relative">
                                                <form-input :label="'password'" v-model="formData.password"
                                                    :type="passwordType" placeholder="Açar sözi" />
                                                <div
                                                    class="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
                                                    <eye_hide-icon v-if="passwordType === 'password'"
                                                        @click="passwordType = 'text'" />
                                                    <eye-icon v-if="passwordType === 'text'"
                                                        @click="passwordType = 'password'" />
                                                </div>
                                            </div>
                                            <Transition name="fade">
                                                <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{
                                                    errors.password
                                                }}</p>
                                            </Transition>
                                        </div>
                                        <div>
                                            <label id="confirm_password" class="inline-block mb-3 text-[#222222]">Açar
                                                sözi
                                                tassyklaň</label>
                                            <div class="relative">
                                                <form-input :label="'confirm_password'"
                                                    v-model="formData.confirm_password" :type="confirmPasswordType"
                                                    placeholder="Açar sözi tassyklaň" />
                                                <div
                                                    class="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
                                                    <eye_hide-icon v-if="confirmPasswordType === 'password'"
                                                        @click="confirmPasswordType = 'text'" />
                                                    <eye-icon v-if="confirmPasswordType === 'text'"
                                                        @click="confirmPasswordType = 'password'" />
                                                </div>
                                            </div>
                                            <Transition name="fade">
                                                <p v-if="errors.confirm_password" class="mt-2 text-sm text-red-600">{{ errors.confirm_password }}</p>
                                            </Transition>
                                        </div>
                                    </div>
                                </Transition>

                                <!-- Submit Button -->
                                <button type="submit" :disabled="isSubmitting"
                                    class="w-full py-4 bg-[#002645] text-white font-semibold rounded-full hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-12 select-none">
                                    <span v-if="!isSubmitting">Dowam etmek</span>
                                    <span v-else class="flex items-center justify-center">
                                        <animate_spin-icon />
                                        Ýüklenýär...
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
const emit = defineEmits(['close', 'redirect'])
const authStore = useAuthStore()
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})
const passwordType = ref('password')
const confirmPasswordType = ref('password')
const isSubmitting = ref(false)
const formData = reactive({
    password: '',
    confirm_password: ''
})

const errors = reactive({
    password: '',
    confirm_password: '',
})

const validateForm = () => {
    let isValid = true

    if (formData.password.length < 6) {
        errors.password = 'Açar sözi 6 harpdan uly bolmaly!'
        isValid = false
    } else if (formData.password !== formData.confirm_password) {
        errors.confirm_password = 'Açar sözi nädogry!'
        isValid = false
    }

    return isValid
}

const handleSubmit = async () => {
    if (!validateForm()) return

    isSubmitting.value = true

    try {
        const register_data = JSON.parse(sessionStorage.getItem('register_data'))
        register_data.password = formData.password
        sessionStorage.setItem('register_data', JSON.stringify(register_data))
        await authStore.sendOtp({
            email: register_data.email,
            phone_number: register_data.phone_number,
            purpose: "registration"
        })
        emit('redirect', 'otp')
    } catch (error) {
        console.error('Submission error:', error)
    } finally {
        isSubmitting.value = false
    }
}

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
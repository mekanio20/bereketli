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
                        <div class="flex flex-col py-8 lg:pt-20 relative">

                            <img :src="background" class="absolute top-32 -z-10 w-full h-[500px] object-cover" />

                            <h2
                                class="text-2xl lg:text-3xl font-bold text-[#222222] mb-12 text-center animate-slide-down">
                                {{ $t('buttons.login') }}
                            </h2>

                            <!-- Tab Buttons -->
                            <div class="flex gap-3 mb-8 bg-[#EBF3FD] rounded-full p-2 mx-8">
                                <button @click="activeTab = 'phone'"
                                    class="flex-1 py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                                    :class="activeTab === 'phone'
                                        ? 'bg-custom-gradient text-white shadow-lg font-bold'
                                        : 'bg-white text-[#838589]'">
                                    {{ $t('forms.phone') }}
                                </button>
                                <button @click="activeTab = 'email'"
                                    class="flex-1 py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                                    :class="activeTab === 'email'
                                        ? 'bg-custom-gradient text-white shadow-lg font-bold'
                                        : 'bg-white text-[#838589]'">
                                   {{ $t('forms.email') }}
                                </button>
                            </div>

                            <!-- Form -->
                            <form @submit.prevent="handleSubmit" class="flex-1 flex flex-col px-8">
                                <Transition name="fade" mode="out-in">
                                    <div v-if="activeTab === 'phone'" key="phone" class="space-y-6">
                                        <!-- Phone Number Field -->
                                        <div>
                                            <label for="phone" class="block text-sm text-[#222222] mb-3">
                                                {{ $t('forms.phone_number') }}
                                            </label>
                                            <div class="relative">
                                                <input id="phone" v-model="formData.phone" type="tel" placeholder="+993"
                                                    class="w-full px-4 py-4 bg-[#EBF3FD] rounded-xl outline-none  transition-all duration-300 text-[#222222] placeholder-gray-400"
                                                    :class="{ 'border-red-400': errors.phone }" />
                                                <Transition name="fade">
                                                    <p v-if="errors.phone" class="mt-2 text-sm text-red-600">{{
                                                        errors.phone }}</p>
                                                </Transition>
                                            </div>
                                        </div>

                                        <!-- Password Field -->
                                        <div>
                                            <label id="password" class="inline-block mb-3 text-[#222222]">
                                                {{ $t('forms.password') }}</label>
                                            <div class="relative">
                                                <form-input :label="'password'" v-model="formData.password"
                                                    :type="passwordType" :placeholder="$t('forms.password')" />
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
                                    </div>

                                    <div v-else key="email" class="space-y-6">
                                        <!-- Email Field -->
                                        <div>
                                            <label for="email" class="block text-sm text-[#222222] mb-3">
                                                {{ $t('forms.email_address') }}
                                            </label>
                                            <input id="email" v-model="formData.email" type="email"
                                                placeholder="example@email.com"
                                                class="w-full px-4 py-4 bg-[#EBF3FD] rounded-xl outline-none transition-all duration-300 text-[#222222] placeholder-gray-400"
                                                :class="{ 'border-red-400': errors.email }" />
                                            <Transition name="fade">
                                                <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email
                                                }}</p>
                                            </Transition>
                                        </div>

                                        <div>
                                            <label id="password" class="inline-block mb-3 text-[#222222]">
                                                {{ $t('forms.password') }}</label>
                                            <div class="relative">
                                                <form-input :label="'password'" v-model="formData.password"
                                                    :type="passwordType" :placeholder="$t('forms.password')" />
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
                                    </div>
                                </Transition>

                                <!-- Submit Button -->
                                <button type="submit" :disabled="isSubmitting"
                                    class="w-full light_effect py-4 bg-[#002645] text-white font-semibold rounded-full hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-12">
                                    <span v-if="!isSubmitting">{{ $t('buttons.next') }}</span>
                                    <span v-else class="flex items-center justify-center">
                                        <animate_spin-icon />
                                        {{ $t('info.loading') }}
                                    </span>
                                </button>

                                <!-- Already Have Account -->
                                <p class="text-center text-sm text-[#222222] mt-6">
                                    {{ $t('info.already_account') }}
                                    <button type="button" @click="$emit('redirect', 'register')"
                                        class="text-[#F98900] hover:text-orange-500 font-semibold hover:underline transition-colors duration-300 cursor-pointer">
                                        {{ $t('buttons.register') }}
                                    </button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n({ useScope: 'global' })
import authImage from '@/assets/images/auth.webp'
import background from '@/assets/images/modal.webp'
const emit = defineEmits(['close', 'submit', 'redirect'])
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})

const authStore = useAuthStore()

const activeTab = ref('phone')
const passwordType = ref('password')
const isSubmitting = ref(false)

const formData = reactive({
    phone: '+993',
    email: '',
    password: ''
})

const errors = reactive({
    phone: '',
    email: '',
    password: ''
})

const validateForm = () => {
    let isValid = true

    // Reset errors
    errors.phone = ''
    errors.email = ''
    errors.password = ''

    if (activeTab.value === 'phone') {
        if (!formData.phone || formData.phone === '+993') {
            errors.phone = t('errors.required')
            isValid = false
        } else if (!/^\+993\d{8}$/.test(formData.phone)) {
            errors.phone = t('errors.invalid_phone')
            isValid = false
        }
    } else {
        if (!formData.email) {
            errors.email = t('errors.required')
            isValid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = t('errors.invalid_email')
            isValid = false
        }
    }

    if (formData.password.length < 6) {
        errors.password = t('warning.password_length')
        isValid = false
    }

    return isValid
}

const handleSubmit = async () => {
    if (!validateForm()) return

    isSubmitting.value = true

    try {
        await authStore.login({
            identifier: activeTab.value === 'phone' ? formData.phone : formData.email,
            password: formData.password
        })
        closeModal()
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
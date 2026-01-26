<template>
    <section class="overflow-x-hidden relative">
        <!-- Absolute -->
        <div class="absolute -z-10 w-full h-full bg-[#F3F8FF]">
            <img :src="background" class="w-full h-full object-contain" />
        </div>
        <MainContainer>
            <SectionContainer class="pb-20">
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Sidebar -->
                    <aside class="lg:col-span-1">
                        <div class="bg-white rounded-2xl shadow-md p-6 sticky top-6 animate-fade-in">
                            <h1 class="text-2xl font-bold text-[#222222] mb-6">Hasabym</h1>

                            <nav class="space-y-2">
                                <!-- Account Information -->
                                <button @click="activeSection = 'info'"
                                    class="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300"
                                    :class="activeSection === 'info' ? 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700' : 'text-[#222222] hover:bg-gray-50'">
                                    <div class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                                        :class="activeSection === 'info' ? 'bg-gradient-to-br from-orange-400 to-orange-500' : 'bg-gray-100'">
                                        <edit-icon :class="activeSection === 'info' ? 'text-white' : 'text-[#838589]'" />
                                    </div>
                                    <span class="font-semibold">Hasap maglumatlary</span>
                                </button>

                                <!-- Change Password -->
                                <button @click="activeSection = 'password'"
                                    class="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300"
                                    :class="activeSection === 'password'
                                        ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700'
                                        : 'text-[#222222] hover:bg-gray-50'">
                                    <div class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                                        :class="activeSection === 'password'
                                            ? 'bg-gradient-to-br from-blue-400 to-blue-500'
                                            : 'bg-gray-100'">
                                        <key-icon :class="activeSection === 'password' ? 'text-white' : 'text-[#838589]'" />
                                    </div>
                                    <span class="font-semibold">Açar sözüni täzelemek</span>
                                </button>

                                <div class="pt-4 mt-4 border-t border-gray-200">
                                    <!-- Logout -->
                                    <button @click="handleLogout"
                                        class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 group">
                                        <div
                                            class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-all duration-300">
                                            <logout-icon class="text-red-600" />
                                        </div>
                                        <span class="font-semibold">Ulgamdan çykmak</span>
                                    </button>

                                    <!-- Delete Account -->
                                    <button @click="handleDeleteAccount"
                                        class="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 group mt-2">
                                        <div
                                            class="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200 transition-all duration-300">
                                            <delete-icon class="text-red-600" />
                                        </div>
                                        <span class="font-semibold">Delete account</span>
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </aside>

                    <!-- Main Content -->
                    <main class="lg:col-span-2">
                        <Transition name="fade" mode="out-in">
                            <!-- Account Information Section -->
                            <div v-if="activeSection === 'info'" key="info"
                                class="bg-white rounded-2xl shadow-md p-8 animate-slide-up">
                                <div class="flex items-center gap-4 mb-8">
                                    <div class="w-12 h-12 bg-[#EBF3FD] rounded-xl flex items-center justify-center">
                                        <edit-icon class="text-blue-600" />
                                    </div>
                                    <h2 class="text-2xl font-bold text-[#222222]">Hasap maglumatlary</h2>
                                </div>

                                <form @submit.prevent="handleSaveProfile" class="space-y-6">
                                    <!-- First Name and Last Name -->
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium text-[#838589] mb-2">Adyňyz</label>
                                            <form-input v-model="profileData.firstName" type="text" />
                                        </div>
                                        <div>
                                            <label
                                                class="block text-sm font-medium text-[#838589] mb-2">Familiýaňyz</label>
                                            <form-input v-model="profileData.lastName" type="text" />
                                        </div>
                                    </div>

                                    <!-- Company Name -->
                                    <div>
                                        <label class="block text-sm font-medium text-[#838589] mb-2">Kompaniýaňyz</label>
                                        <form-input v-model="profileData.company" type="text" />
                                    </div>

                                    <!-- Phone Number -->
                                    <div>
                                        <label class="block text-sm font-medium text-[#838589] mb-2">Telefon
                                            belgiňiz</label>
                                        <form-input v-model="profileData.phone" type="tel" />
                                    </div>

                                    <!-- Save Button -->
                                    <button type="submit" :disabled="isSaving"
                                        class="w-full py-4 bg-[#002645] text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                        <span v-if="!isSaving">Ýatda sakla</span>
                                        <span v-else class="flex items-center justify-center">
                                            <animate_spin-icon />
                                            Ýüklenýär...
                                        </span>
                                    </button>
                                </form>
                            </div>

                            <!-- Password Change Section -->
                            <div v-else-if="activeSection === 'password'" key="password"
                                class="bg-white rounded-2xl shadow-md p-8 animate-slide-up">
                                <div class="flex items-center gap-4 mb-8">
                                    <div class="w-12 h-12 bg-[#EBF3FD] rounded-xl flex items-center justify-center">
                                        <key-icon />
                                    </div>
                                    <h2 class="text-2xl font-bold text-[#222222]">Açar sözüni täzelemek</h2>
                                </div>

                                <form @submit.prevent="handleChangePassword" class="space-y-6">
                                    <!-- Current Password -->
                                    <div>
                                        <label class="block text-sm font-medium text-[#838589] mb-2">Häzirki açar
                                            sözi</label>
                                        <form-input v-model="passwordData.current" type="password" />
                                    </div>

                                    <!-- New Password -->
                                    <div>
                                        <label class="block text-sm font-medium text-[#838589] mb-2">Täze açar
                                            sözi</label>
                                        <form-input v-model="passwordData.new" type="password" />
                                    </div>

                                    <!-- Confirm Password -->
                                    <div>
                                        <label class="block text-sm font-medium text-[#838589] mb-2">Täze açar sözüni
                                            tassyklaň</label>
                                        <form-input v-model="passwordData.confirm" type="password" />
                                    </div>

                                    <!-- Change Password Button -->
                                    <button type="submit" :disabled="isChangingPassword"
                                        class="w-full py-4 bg-[#002645] text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                        <span v-if="!isChangingPassword">Üýtgetmek</span>
                                        <span v-else class="flex items-center justify-center">
                                            <animate_spin-icon />
                                            Ýüklenýär...
                                        </span>
                                    </button>
                                </form>
                            </div>
                        </Transition>
                    </main>
                </div>
            </SectionContainer>
        </MainContainer>

        <!-- Confirmation Modals -->
        <ConfirmModal :is-open="showLogoutModal" title="Ulgamdan çykmak" message="Ulgamdan çykmak isleýärsiňizmi?"
            confirm-text="Hawa, çyk" type="danger" cancel-text="Ýok" @confirm="confirmLogout" @cancel="showLogoutModal = false" />

        <ConfirmModal :is-open="showDeleteModal" title="Hasaby pozmak"
            message="Hasabyňyzy pozmak isleýärsiňizmi? Bu hereketi yzyna gaýtaryp bolmaýar." confirm-text="Hawa, poz"
            cancel-text="Ýok" type="danger" @confirm="confirmDelete" @cancel="showDeleteModal = false" />
    </section>
</template>

<script setup>
import background from '@/assets/images/background.webp'

const authStore = useAuthStore()

const activeSection = ref('info')
const isSaving = ref(false)
const isChangingPassword = ref(false)
const showLogoutModal = ref(false)
const showDeleteModal = ref(false)

const profileData = reactive({
    firstName: 'Aybibi',
    lastName: 'Ataýewa',
    company: 'Bereketli Logistika',
    phone: '+993 616161'
})

const passwordData = reactive({
    current: '',
    new: '',
    confirm: ''
})

const handleSaveProfile = async () => {
    isSaving.value = true
    try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log('Profile saved:', profileData)
        // Show success message
    } catch (error) {
        console.error('Error saving profile:', error)
    } finally {
        isSaving.value = false
    }
}

const handleChangePassword = async () => {
    if (passwordData.new !== passwordData.confirm) {
        alert('Täze açar sözleri gabat gelenok!')
        return
    }

    isChangingPassword.value = true
    try {
        await new Promise(resolve => setTimeout(resolve, 1500))
        console.log('Password changed')
        // Reset form
        passwordData.current = ''
        passwordData.new = ''
        passwordData.confirm = ''
        // Show success message
    } catch (error) {
        console.error('Error changing password:', error)
    } finally {
        isChangingPassword.value = false
    }
}

const handleLogout = () => {
    showLogoutModal.value = true
}

const confirmLogout = async () => {
    await authStore.logout()
    showLogoutModal.value = false
}

const handleDeleteAccount = () => {
    showDeleteModal.value = true
}

const confirmDelete = () => {
    console.log('Deleting account...')
    showDeleteModal.value = false
    // Delete account and redirect
}
</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.3s ease-out;
}

.animate-slide-up {
    animation: slideUp 0.3s ease-out;
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
</style>
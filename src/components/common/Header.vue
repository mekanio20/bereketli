<template>
    <header class="fixed w-full top-0 z-50 bg-white shadow-md">
        <MainContainer>
            <div class="py-4 flex items-center justify-between">
                <div class="flex items-center space-x-20">
                    <!-- Logo -->
                    <router-link to="/" class="w-[130px]">
                        <img src="/icons/logo.webp" />
                    </router-link>
                    <!-- Navigation Desktop -->
                    <nav class="hidden lg:flex items-center space-x-10">
                        <div v-for="(item, index) in navbar_menu" :key="index" class="relative group">
                            <router-link :to="item.link" class="nav_item flex items-center gap-2">
                                <span>{{ item.name }}</span>
                                <chevron_down-icon v-if="item?.children" :size="14" :color="'currentColor'"
                                    class="transition-transform duration-200 group-hover:rotate-180" />
                            </router-link>

                            <div v-if="item?.children" class="absolute left-28 -translate-x-1/2 top-full pt-3 min-w-[220px] opacity-0 translate-y-2 pointer-events-none
                                       group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                                       transition-all duration-200">
                                <div
                                    class="rounded-xl border border-gray-100 bg-white shadow-[0_12px_45px_rgba(0,0,0,0.1)] overflow-hidden">
                                    <div class="flex flex-col divide-y divide-gray-50">
                                        <router-link v-for="(i, x) in item.children" :key="x" :to="i.link"
                                            class="flex items-center justify-between px-4 py-3 text-sm text-[#222222] hover:text-[#F98900] hover:bg-[#F3F8FF] transition-colors">
                                            <span>{{ i.name }}</span>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>

                <!-- Desktop Actions -->
                <div class="hidden lg:flex items-center"
                    :class="[autStore.isAuthenticated ? 'space-x-16' : 'space-x-4']">
                    <div v-if="autStore.isAuthenticated" class="flex items-center space-x-10">
                        <!-- Orders -->
                        <div class="relative group">
                            <router-link to="/order/history" class="nav_item flex items-center gap-2">
                                <box_linear-icon :color="'currentColor'" />
                                <span>Sargytlar</span>
                                <chevron_down-icon :size="14" :color="'currentColor'"
                                    class="transition-transform duration-200 group-hover:rotate-180" />
                            </router-link>
                            <div class="absolute left-28 -translate-x-1/2 top-full pt-3 min-w-[220px] opacity-0 translate-y-2 pointer-events-none
                                       group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                                       transition-all duration-200">
                                <div
                                    class="rounded-xl border border-gray-100 bg-white shadow-[0_12px_45px_rgba(0,0,0,0.1)] overflow-hidden">
                                    <div class="flex flex-col divide-y divide-gray-50">
                                        <router-link to="/order/history"
                                            class="flex items-center justify-between px-4 py-3 text-sm text-[#222222] hover:text-[#F98900] hover:bg-[#F3F8FF] transition-colors">
                                            <span>Sargyt taryhy</span>
                                        </router-link>
                                        <router-link to="/order/requests"
                                            class="flex items-center justify-between px-4 py-3 text-sm text-[#222222] hover:text-[#F98900] hover:bg-[#F3F8FF] transition-colors">
                                            <span>Tassyklanmadyk sargytlar</span>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Account -->
                        <router-link to="/account" class="nav_item flex items-center gap-2">
                            <profile_circle-icon :color="'currentColor'" />
                            <span>Hasap</span>
                        </router-link>
                        <!-- Notification -->
                        <button v-if="!isMobile" ref="notifRef" type="button"
                            class="cursor-pointer relative text-[#002645] hover:text-[#F98900] transition-colors duration-200"
                            @click="toggleDropdown('notif')">
                            <span v-if="notificationStore.unreadNotifications > 0"
                                class="absolute top-[-2px] right-[1px] w-2 h-2 bg-[#FF0000] rounded-full">
                            </span>
                            <notification-icon :color="'currentColor'" />
                            <Transition name="notf">
                                <div v-if="dropdowns.notif">
                                    <div
                                        class="absolute top-12 -right-16 w-[400px] h-[420px] overflow-y-auto rounded-[14px] bg-white transition-all duration-200 px-7 py-6">
                                        <div v-if="notificationStore.notifications.length > 0">
                                            <router-link v-for="(item, index) in notificationStore.notifications"
                                                :key="index" :to="getNotificationLink(item)"
                                                class="flex space-x-5 text-[#222222] hover:text-[#F98900] transition-all duration-100 relative"
                                                :class="{ 'border-b border-[#EBF3FD] pb-4': index !== notificationStore.notifications.length - 1 }">
                                                <div class="w-[45px] h-[45px] flex items-center justify-center rounded-full flex-shrink-0"
                                                    :class="notificationBadgeClass(item?.event.type)">
                                                    <notification-icon :color="'currentColor'" />
                                                </div>
                                                <div class="flex flex-col space-y-2 items-start text-start">
                                                    <p class="font-medium">{{ item.title }}</p>
                                                    <p class="text-[#939393] text-sm">{{ item.date_created }}</p>
                                                </div>
                                                <!-- Notification read -->
                                                <div v-if="!item.is_read"
                                                    class="absolute top-2 right-2 w-[10px] h-[10px] bg-custom-gradient rounded-full flex items-center text-black justify-center">
                                                </div>
                                            </router-link>
                                        </div>
                                        <div v-else class="flex flex-col space-y-3 items-center justify-center py-5">
                                            <div class="w-[130px]">
                                                <img src="/icons/notification.webp" class="w-full h-full sobject-cover">
                                            </div>
                                            <h3 class="text-[20px] text-[#757575]">
                                                Sizde bildiriş ýok
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </Transition>
                        </button>
                    </div>
                    <!-- Languages -->
                    <div class="relative group" ref="langRef">
                        <button type="button" @click="toggleDropdown('lang')"
                            class="flex items-center space-x-1 select-none">
                            <lang-icon :color="'#222222'" />
                            <span class="sm:text-base text-sm leading-[100%] tracking-[0%] text-[#222222]">{{
                                String($i18n.locale).toUpperCase() }}</span>
                            <chevron_down-icon :size="16" :color="'#222222'"
                                :class="{ 'rotate-180 transition-transform duration-200': dropdowns.lang }" />
                        </button>
                        <div v-if="dropdowns.lang"
                            class="absolute top-8 right-0 w-32 bg-white shadow-lg rounded-lg p-2 border border-gray-100 animate-in fade-in duration-200">
                            <span v-for="item in langItems" :key="item.id" @click="switchLanguage(item.code)"
                                class="block px-4 py-2 mb-1 text-[#222222] hover:bg-gray-100 rounded transition cursor-pointer"
                                :class="{ 'bg-gray-100': $i18n.locale === item.code }">
                                {{ item.name }}
                            </span>
                        </div>
                    </div>
                    <!-- Auth -->
                    <div v-if="!autStore.isAuthenticated" class="flex items-center space-x-4">
                        <button @click="appStore.toggleModal('login')"
                            class="px-4 py-2 font-semibold sm:text-base text-sm leading-[100%] tracking-[0%] text-[#002645] hover:text-[#F98900] duration-200">Ulagama
                            gir</button>
                        <button @click="appStore.toggleModal('register')"
                            class="px-6 py-2 bg-custom-gradient text-white rounded-[10px] hover:scale-95 transition-all duration-300 font-medium">Hasap
                            döretmek</button>
                    </div>
                </div>

                <!-- Mobile Actions -->
                <div class="flex items-center space-x-4">
                    <!-- Notification -->
                    <button v-if="isMobile" ref="notifRef" type="button"
                        class="cursor-pointer relative text-[#002645] hover:text-[#F98900] transition-colors duration-200"
                        @click="toggleDropdown('notif')">
                        <span v-if="notificationStore.unreadNotifications > 0"
                            class="absolute top-[-2px] right-[1px] w-2 h-2 bg-[#FF0000] rounded-full">
                        </span>
                        <notification-icon :color="'currentColor'" />
                        <Transition name="notf">
                            <div v-if="dropdowns.notif">
                                <div
                                    class="absolute top-12 -right-16 w-[400px] h-[420px] overflow-y-auto rounded-[14px] bg-white transition-all duration-200 px-7 py-6">
                                    <div v-if="notificationStore.notifications.length > 0">
                                        <div v-for="(item, index) in notificationStore.notifications" :key="index"
                                            @click.stop="redirectPage(item)"
                                            class="flex space-x-5 text-[#222222] hover:text-[#F98900] transition-all duration-100 relative"
                                            :class="{ 'border-b border-[#EBF3FD] pb-4': index !== notificationStore.notifications.length - 1 }">
                                            <div class="w-[45px] h-[45px] flex items-center justify-center rounded-full flex-shrink-0"
                                                :class="notificationBadgeClass(item?.event.type)">
                                                <notification-icon :color="'currentColor'" />
                                            </div>
                                            <div class="flex flex-col space-y-2 items-start text-start">
                                                <p class="font-medium">{{ item.title }}</p>
                                                <p class="text-[#939393] text-sm">{{ item.date_created }}</p>
                                            </div>
                                            <!-- Notification read -->
                                            <div v-if="!item.is_read"
                                                class="absolute top-2 right-2 w-[10px] h-[10px] bg-custom-gradient rounded-full flex items-center text-black justify-center">
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="flex flex-col space-y-3 items-center justify-center py-5">
                                        <div class="w-[130px]">
                                            <img src="/icons/notification.webp" class="w-full h-full sobject-cover">
                                        </div>
                                        <h3 class="text-[20px] text-[#757575]">
                                            Sizde bildiriş ýok
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </button>
                    <!-- Mobile Menu Button -->
                    <button type="button" @click="mobileMenuOpen = !mobileMenuOpen"
                        class="lg:hidden p-2 text-[#002645] hover:text-[#F98900] transition-colors">
                        <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <close-icon v-else :size="24" :color="'currentColor'" />
                    </button>
                </div>
            </div>
        </MainContainer>

        <!-- Mobile Menu Overlay -->
        <Transition name="mobile-menu">
            <div v-if="mobileMenuOpen" class="lg:hidden fixed inset-0 top-[73px] z-40 bg-black bg-opacity-50"
                @click="mobileMenuOpen = false"></div>
        </Transition>

        <!-- Mobile Menu -->
        <Transition name="mobile-menu-slide">
            <div v-if="mobileMenuOpen"
                class="lg:hidden fixed top-[73px] left-0 right-0 bottom-0 z-50 bg-white overflow-y-auto">
                <div class="px-4 py-6 space-y-4">
                    <!-- Mobile Navigation Items -->
                    <nav class="space-y-2">
                        <div v-for="(item, index) in navbar_menu" :key="index" class="border-b border-gray-100 pb-2">
                            <div v-if="item.children" class="space-y-2">
                                <button @click="toggleMobileDropdown(index)"
                                    class="w-full flex items-center justify-between py-3 text-[#222222] hover:text-[#F98900] transition-colors font-medium">
                                    <span>{{ item.name }}</span>
                                    <chevron_down-icon :size="16" :color="'currentColor'"
                                        :class="{ 'rotate-180 transition-transform duration-200': mobileDropdowns[index] }" />
                                </button>
                                <div v-if="mobileDropdowns[index]" class="pl-4 space-y-1 pb-2">
                                    <router-link v-for="(child, x) in item.children" :key="x" :to="child.link"
                                        @click="mobileMenuOpen = false"
                                        class="block py-2.5 px-3 text-sm text-[#222222] hover:text-[#F98900] hover:bg-[#F3F8FF] rounded-lg transition-colors">
                                        {{ child.name }}
                                    </router-link>
                                </div>
                            </div>
                            <router-link v-else :to="item.link" @click="mobileMenuOpen = false"
                                class="block py-3 text-[#222222] hover:text-[#F98900] transition-colors font-medium">
                                {{ item.name }}
                            </router-link>
                        </div>
                    </nav>

                    <!-- Mobile User Actions -->
                    <div v-if="autStore.isAuthenticated" class="space-y-3">
                        <div>
                            <button @click="toggleOrder = !toggleOrder"
                                class="w-full flex items-center justify-between py-3 text-[#222222] hover:text-[#F98900] rounded-lg transition-colors">
                                <div class="flex items-center gap-2">
                                    <box_linear-icon :color="'currentColor'" />
                                    <span class="font-medium">Sargytlar</span>
                                </div>
                                <chevron_down-icon :size="16" :color="'currentColor'"
                                    :class="{ 'rotate-180 transition-transform duration-200': toggleOrder }" />
                            </button>
                            <div v-if="toggleOrder" class="pl-4 flex flex-col space-y-1 pb-2">
                                <router-link to="/order/history" @click="mobileMenuOpen = false"
                                    class="w-full text-left py-2.5 px-3 text-sm text-[#222222] hover:text-[#F98900] hover:bg-[#F3F8FF] rounded-lg transition-colors">
                                    Sargyt taryhy
                                </router-link>
                                <router-link to="/order/requests" @click="mobileMenuOpen = false"
                                    class="w-full text-left py-2.5 px-3 text-sm text-[#222222] hover:text-[#F98900] hover:bg-[#F3F8FF] rounded-lg transition-colors">
                                    Tassyklanmadyk sargytlar
                                </router-link>
                            </div>
                        </div>
                        <router-link to="/account" @click="mobileMenuOpen = false"
                            class="flex items-center gap-3 py-3 text-[#222222] hover:text-[#F98900] rounded-lg transition-colors">
                            <profile_circle-icon :color="'currentColor'" />
                            <span class="font-medium">Hasap</span>
                        </router-link>
                    </div>

                    <!-- Mobile Language Selector -->
                    <div>
                        <button @click="toggleMobileLangDropdown"
                            class="w-full flex items-center justify-between py-3 text-[#222222] hover:text-[#F98900] rounded-lg transition-colors">
                            <div class="flex items-center gap-2">
                                <lang-icon :color="'currentColor'" />
                                <span class="font-medium">Dil</span>
                            </div>
                            <chevron_down-icon :size="16" :color="'currentColor'"
                                :class="{ 'rotate-180 transition-transform duration-200': mobileLangDropdown }" />
                        </button>
                        <div v-if="mobileLangDropdown" class="pl-4 space-y-1 pb-2">
                            <button v-for="item in langItems" :key="item.id" @click="switchLanguage(item.code)"
                                class="w-full text-left py-2.5 px-3 text-sm text-[#222222] hover:text-[#F98900] hover:bg-[#F3F8FF] rounded-lg transition-colors"
                                :class="{ 'text-[#F98900] bg-[#F3F8FF]': $i18n.locale === item.code }">
                                {{ item.name }}
                            </button>
                        </div>
                    </div>

                    <!-- Mobile Auth Buttons -->
                    <div v-if="!autStore.isAuthenticated" class="pt-4 border-t border-gray-100 space-y-3">
                        <button @click="appStore.toggleModal('login'); mobileMenuOpen = false"
                            class="w-full px-4 py-3 font-semibold text-gold-gradient hover:text-[#F98900] border border-[#ff9e29] rounded-lg transition-colors">
                            Ulagama gir
                        </button>
                        <button @click="appStore.toggleModal('register'); mobileMenuOpen = false"
                            class="w-full px-6 py-3 bg-custom-gradient text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
                            Hasap döretmek
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n({ useScope: 'global' })
import { notificationBadgeClass, getNotificationLink } from '@/utils/switch'

const route = useRoute()
const router = useRouter()
const autStore = useAuthStore()
const appStore = useAppStore()
const notificationStore = useNotificationStore()
const isMobile = ref(null)

const mobileMenuOpen = ref(false)
const mobileLangDropdown = ref(false)
const mobileDropdowns = ref({})
const toggleOrder = ref(false)

const navbar_menu = ref([
    {
        name: 'Biz barada',
        link: '#',
        children: [
            { name: 'Ammarlar', link: '/warehouses' },
            { name: 'Täzelikler', link: '/news' },
            { name: 'Gadagan edilýän ýükler', link: '/forbidden-cargo' },
            { name: 'Köp soralýan soraglar', link: '/faq' },
        ]
    },
    {
        name: 'Sargyt ugratmak',
        link: '#',
        children: [
            { name: 'Simple Order', link: '/order/request/simple' },
            { name: 'Advanced Order', link: '/order/request/advanced' },
        ]
    },
    {
        name: 'Habarlaşmak',
        link: '/chat'
    },
])

const langItems = ref([
    { id: 1, name: 'English', code: 'en' },
    { id: 2, name: 'Turkmen', code: 'tk' },
])

const langRef = ref(null)
const notifRef = ref(null)
const dropdowns = ref({
    lang: false,
    notif: false
})

const toggleDropdown = (key) => {
    dropdowns.value[key] = !dropdowns.value[key]
}

const toggleMobileDropdown = (index) => {
    mobileDropdowns.value[index] = !mobileDropdowns.value[index]
}

const toggleMobileLangDropdown = () => {
    mobileLangDropdown.value = !mobileLangDropdown.value
}

const switchLanguage = (language) => {
    locale.value = language
    localStorage.setItem('lang', language)
    window.location.reload()
}

/* ---------------- CLICK OUTSIDE ---------------- */
const handleClickOutside = (e) => {
    if (langRef.value && !langRef.value.contains(e.target)) {
        dropdowns.value.lang = false
    }
    if (notifRef.value && !notifRef.value.contains(e.target)) {
        dropdowns.value.notif = false
    }
}

// Close mobile menu when route changes
watch(() => route.path, async () => {
    mobileMenuOpen.value = false
    await notificationStore.fetchNotifications()
}, { immediate: true })

// Prevent body scroll when mobile menu is open
watch(mobileMenuOpen, (isOpen) => {
    if (isOpen) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})

const redirectPage = async (item) => {
    await notificationStore.updateNotification(item.id, { is_read: true })
    const link = getNotificationLink(item)
    if (link) {
        router.push(link)
    }
}

const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 1024
}

onMounted(() => {
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenSize)
    document.removeEventListener('click', handleClickOutside)
    document.body.style.overflow = ''
})

</script>

<style scoped>
/* Modal Transitions */
.notf-enter-active,
.notf-leave-active {
    transition: opacity 0.3s ease;
}

.notf-enter-from,
.notf-leave-to {
    opacity: 0;
}

.notf-enter-active .animate-scale-in {
    animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
    from {
        transform: scale(0.95);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* Mobile Menu Transitions */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition: opacity 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
    opacity: 0;
}

.mobile-menu-slide-enter-active {
    transition: transform 0.3s ease-out;
}

.mobile-menu-slide-leave-active {
    transition: transform 0.3s ease-in;
}

.mobile-menu-slide-enter-from {
    transform: translateX(-100%);
}

.mobile-menu-slide-leave-to {
    transform: translateX(-100%);
}
</style>
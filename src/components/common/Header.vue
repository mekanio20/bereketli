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
                        <router-link to="/order/history" class="nav_item flex items-center gap-3">
                            <box_linear-icon :color="'currentColor'" />
                            <span>Sargytlar</span>
                        </router-link>
                        <router-link to="/account" class="nav_item flex items-center gap-3">
                            <profile_circle-icon :color="'currentColor'" />
                            <span>Hasap</span>
                        </router-link>
                        <div class="cursor-pointer relative text-[#002645] hover:text-[#F98900] transition-colors duration-200"
                            @click="openNotification = !openNotification">
                            <span v-if="false"
                                class="absolute top-[-2px] right-[1px] w-2 h-2 bg-[#FF0000] rounded-full"></span>
                            <notification-icon :color="'currentColor'" />
                            <Transition name="notf">
                                <div v-if="openNotification">
                                    <div
                                        class="absolute top-10 right-0 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white">
                                    </div>
                                    <div
                                        class="absolute top-12 -right-16 w-[400px] rounded-[14px] bg-white transition-all duration-200 px-7 py-6">
                                        <div v-if="false" class="flex flex-col space-y-3">
                                            <div v-for="(item, index) in 4" :key="index"
                                                class="flex space-x-5 text-[#222222] hover:text-[#F98900] transition-all duration-100"
                                                :class="{ 'border-b border-[#EBF3FD] pb-4': index !== 3 }">
                                                <div
                                                    class="w-[45px] h-[45px] flex items-center justify-center bg-[#EBF3FD] rounded-full flex-shrink-0">
                                                    <notification-icon :color="'#002645'" />
                                                </div>
                                                <div class="flex flex-col space-y-2">
                                                    <p class="font-medium">Ýüküňizi almak üçin goşmaça resminama gerek.
                                                    </p>
                                                    <p class="text-[#939393] text-sm">21.09.2025</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="true"
                                            class="flex flex-col space-y-3 items-center justify-center py-5">
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
                        </div>
                    </div>
                    <div class="relative group" ref="langRef">
                        <button @click="toggleDropdown('lang')" class="flex items-center space-x-1 select-none">
                            <lang-icon :color="'#222222'" />
                            <span class="sm:text-base text-sm leading-[100%] tracking-[0%] text-[#222222]">EN</span>
                            <chevron_down-icon :size="16" :color="'#222222'"
                                :class="{ 'rotate-180 transition-transform duration-200': dropdowns.lang }" />
                        </button>
                        <div v-if="dropdowns.lang"
                            class="absolute top-8 right-0 w-32 bg-white shadow-lg rounded-lg p-2 border border-gray-100 animate-in fade-in duration-200">
                            <span v-for="item in langItems" :key="item.id" @click="changLanguage(item.id)"
                                class="block px-4 py-2 mb-1 text-[#222222] hover:bg-gray-100 rounded transition cursor-pointer"
                                :class="{ 'bg-gray-100': item.isActive }">
                                {{ item.name }}
                            </span>
                        </div>
                    </div>
                    <div v-if="!autStore.isAuthenticated" class="flex items-center space-x-4">
                        <button @click="appStore.toggleModal('login')"
                            class="px-4 py-2 font-semibold sm:text-base text-sm leading-[100%] tracking-[0%] text-[#002645] hover:text-[#F98900] duration-200">Ulagama
                            gir</button>
                        <button @click="appStore.toggleModal('register')"
                            class="px-6 py-2 bg-custom-gradient text-white rounded-[10px] hover:scale-95 transition-all duration-300 font-medium">Hasap
                            döretmek</button>
                    </div>
                </div>

                <!-- Mobile Menu Button -->
                <button @click="mobileMenuOpen = !mobileMenuOpen"
                    class="lg:hidden p-2 text-[#002645] hover:text-[#F98900] transition-colors">
                    <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <close-icon v-else :size="24" :color="'currentColor'" />
                </button>
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
                        <router-link to="/order/history" @click="mobileMenuOpen = false"
                            class="flex items-center gap-3 py-3 px-3 text-[#222222] hover:text-[#F98900] hover:bg-[#F3F8FF] rounded-lg transition-colors">
                            <box_linear-icon :color="'currentColor'" />
                            <span class="font-medium">Sargytlar</span>
                        </router-link>
                        <router-link to="/account" @click="mobileMenuOpen = false"
                            class="flex items-center gap-3 py-3 px-3 text-[#222222] hover:text-[#F98900] hover:bg-[#F3F8FF] rounded-lg transition-colors">
                            <profile_circle-icon :color="'currentColor'" />
                            <span class="font-medium">Hasap</span>
                        </router-link>
                        <button @click="openNotification = !openNotification"
                            class="w-full flex items-center gap-3 py-3 px-3 text-[#222222] hover:text-[#F98900] hover:bg-[#F3F8FF] rounded-lg transition-colors relative">
                            <notification-icon :color="'currentColor'" />
                            <span class="font-medium">Bildirişler</span>
                            <span v-if="false" class="absolute left-8 top-2.5 w-2 h-2 bg-[#FF0000] rounded-full"></span>
                        </button>
                    </div>

                    <!-- Mobile Language Selector -->
                    <div class="">
                        <button @click="toggleMobileLangDropdown"
                            class="w-full flex items-center justify-between py-3 px-3 text-[#222222] hover:text-[#F98900] hover:bg-[#F3F8FF] rounded-lg transition-colors">
                            <div class="flex items-center gap-2">
                                <lang-icon :color="'currentColor'" />
                                <span class="font-medium">Dil</span>
                            </div>
                            <chevron_down-icon :size="16" :color="'currentColor'"
                                :class="{ 'rotate-180 transition-transform duration-200': mobileLangDropdown }" />
                        </button>
                        <div v-if="mobileLangDropdown" class="pl-4 space-y-1 pb-2">
                            <button v-for="item in langItems" :key="item.id" @click="changLanguage(item.id)"
                                class="w-full text-left py-2.5 px-3 text-sm text-[#222222] hover:text-[#F98900] hover:bg-[#F3F8FF] rounded-lg transition-colors"
                                :class="{ 'text-[#F98900] bg-[#F3F8FF]': item.isActive }">
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
const route = useRoute()
const autStore = useAuthStore()
const appStore = useAppStore()
const openNotification = ref(false)
const mobileMenuOpen = ref(false)
const mobileLangDropdown = ref(false)
const mobileDropdowns = ref({})

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
            { name: 'Simple Order', link: '/order/request/new' },
            { name: 'Advanced Order', link: '/order/request/advanced' },
        ]
    },
    {
        name: 'Habarlaşmak',
        link: '/chat'
    },
])

const langItems = ref([
    { id: 1, name: 'English', code: 'en', isActive: false },
    { id: 2, name: 'Turkmen', code: 'tm', isActive: true },
])

const langRef = ref(null)
const dropdowns = ref({
    lang: false,
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

const changLanguage = (id) => {
    langItems.value.map((item) => {
        if (item.id === id) {
            item.isActive = true
            localStorage.setItem('lang', item.code)
        } else {
            item.isActive = false
        }
    })
    dropdowns.value.lang = false
    mobileLangDropdown.value = false
}

/* ---------------- CLICK OUTSIDE ---------------- */
const handleClickOutside = (e) => {
    if (langRef.value && !langRef.value.contains(e.target)) {
        dropdowns.value.lang = false
    }
}

// Close mobile menu when route changes
watch(() => route.path, () => {
    mobileMenuOpen.value = false
})

// Prevent body scroll when mobile menu is open
watch(mobileMenuOpen, (isOpen) => {
    if (isOpen) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
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
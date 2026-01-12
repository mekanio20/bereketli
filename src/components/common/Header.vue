<template>
    <header class="fixed w-full top-0 z-50 bg-white shadow-md">
        <MainContainer>
            <nav class="py-4 flex items-center justify-between">
                <router-link to="/" class="w-[130px]">
                    <img src="/icons/logo.webp" />
                </router-link>

                <div class="hidden lg:flex items-center space-x-14">
                    <div v-for="(item, index) in navbar_menu" :key="index" class="relative group">
                        <router-link :to="item.link" class="nav_item flex items-center gap-2">
                            <span>{{ item.name }}</span>
                            <chevron_down-icon v-if="item?.children" :size="14" color="#222222"
                                class="transition-transform duration-200 group-hover:rotate-180" />
                        </router-link>

                        <div v-if="item?.children"
                            class="absolute left-28 -translate-x-1/2 top-full pt-3 min-w-[220px] opacity-0 translate-y-2 pointer-events-none
                                   group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                                   transition-all duration-200">
                            <div class="rounded-xl border border-gray-100 bg-white shadow-[0_12px_45px_rgba(0,0,0,0.1)] overflow-hidden">
                                <div class="flex flex-col divide-y divide-gray-50">
                                    <router-link v-for="(i, x) in item.children" :key="x" :to="i.link"
                                        class="flex items-center justify-between px-4 py-3 text-sm text-[#222222] hover:text-[#F98900] hover:bg-[#F3F8FF] transition-colors">
                                        <span>{{ i.name }}</span>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="hidden lg:flex items-center space-x-4">
                    <div class="relative group" @mouseenter="isHover = true" @mouseleave="isHover = false">
                        <button @click="toggleDropdown('lang')" class="flex items-center space-x-1">
                            <lang-icon :color="isHover ? '#F98900' : '#222222'" />
                            <span
                                class="sm:text-base text-sm leading-[100%] tracking-[0%] text-[#222222] group-hover:text-[#F98900]">EN</span>
                            <chevron_down-icon :size="16" :color="isHover ? '#F98900' : '#222222'"
                                :class="{ 'rotate-180 transition-transform duration-200': dropdowns.lang }" />
                        </button>
                        <div v-if="dropdowns.lang"
                            class="absolute right-0 w-32 bg-white shadow-lg rounded-lg p-2 border border-gray-100 animate-in fade-in duration-200">
                            <a href="#"
                                class="block px-4 py-2 text-[#222222] hover:bg-gray-100 rounded transition">English</a>
                            <a href="#"
                                class="block px-4 py-2 text-[#222222] hover:bg-gray-100 rounded transition">Türkmen</a>
                        </div>
                    </div>
                    <button @click="appStore.toggleModal('login')"
                        class="px-4 py-2 font-semibold sm:text-base text-sm leading-[100%] tracking-[0%] text-[#002645] hover:text-[#F98900] duration-200">Ulagama
                        gir</button>
                    <button @click="appStore.toggleModal('register')"
                        class="px-6 py-2 bg-custom-gradient text-white rounded-[10px] hover:scale-95 transition-all duration-300 font-medium">Hasap
                        döretmek</button>
                </div>
            </nav>
        </MainContainer>
    </header>
</template>

<script setup>
const appStore = useAppStore()
const isHover = ref(false)
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
            { name: 'Advanced Order', link: '#' },
        ]
    },
    {
        name: 'Habarlaşmak',
        link: '/chat'
    },
])

const dropdowns = ref({
    lang: false,
})

function toggleDropdown(key) {
    dropdowns.value[key] = !dropdowns.value[key]
}

</script>
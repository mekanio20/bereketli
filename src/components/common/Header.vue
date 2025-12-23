<template>
    <header class="fixed w-full top-0 z-50 bg-white shadow-md">
        <MainContainer>
            <nav class="py-4 flex items-center justify-between">
                <router-link to="/" class="w-[130px]">
                    <img src="/icons/logo.webp" />
                </router-link>

                <div class="hidden lg:flex items-center space-x-14">
                    <router-link v-for="(item, index) in navbar_menu" :key="index" :to="item.link">
                        <span class="nav_item">{{ item.name }}</span>
                    </router-link>
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
                            class="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg p-2 border border-gray-100 animate-in fade-in duration-200">
                            <a href="#"
                                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">English</a>
                            <a href="#"
                                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition">Türkmen</a>
                        </div>
                    </div>
                    <button
                        class="px-4 py-2 font-semibold sm:text-base text-sm leading-[100%] tracking-[0%] text-[#002645] hover:text-[#F98900] duration-200">Ulagama
                        gir</button>
                    <button
                        class="px-6 py-2 bg-custom-gradient text-white rounded-[10px] hover:scale-95 transition-all duration-300 font-medium">Hasap
                        döretmek</button>
                </div>
            </nav>
        </MainContainer>
    </header>
</template>

<script setup>
const isHover = ref(false)
const navbar_menu = ref([
    {
        name: 'Biz barada',
        link: '#'
    },
    {
        name: 'Sargyt ugratmak',
        link: '#'
    },
    {
        name: 'Habarlaşmak',
        link: '#'
    },
])

const dropdowns = ref({
    lang: false,
})

function toggleDropdown(key) {
    dropdowns.value[key] = !dropdowns.value[key]
}

</script>
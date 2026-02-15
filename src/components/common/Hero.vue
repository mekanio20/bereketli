<template>
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
        <img :src="heroImage" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div class="absolute inset-0 bg-custom-overlay"></div>
        <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center sm:space-y-8 space-y-4 animate-fade-in">
            <div
                class="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 animate-slide-down">
                <dote />
                <span class="text-white sm:text-sm text-xs font-medium">Siziň ynamyňyz - biziň borjumyzdyr</span>
            </div>

            <h1 class="md:text-[72px] sm:text-5xl text-4xl font-bold text-white sm:leading-[100%] leading-[110%] animate-slide-down pb-5"
                style="animation-delay: 100ms">
                Sargydyňyzy yzarlamak
            </h1>

            <div class="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-4 animate-slide-up">
                <div class="relative">
                    <input v-model="searchInput" @keyup.enter="$emit('search', searchInput)" type="text" placeholder="Sargydyňyzy trek kody boyunça gözläň..."
                        class="w-full md:text-lg sm:text-base text-sm px-6 py-[22px] bg-[#EBF3FD] rounded-[18px] sm:pr-48 pr-20 outline-none text-[#4D4D4D] placeholder-[#4D4D4D]" />
                    <button type="button" @click="$emit('search', searchInput)"
                        class="absolute right-4 top-1/2 transform -translate-y-1/2 sm:px-6 px-3 sm:py-4 py-3 bg-custom-gradient text-white rounded-[14px] font-semibold hover:shadow-lg transition-all duration-300 whitespace-nowrap flex items-center justify-center space-x-2">
                        <search-icon />
                        <span class="sm:block hidden">{{ orderStore.loading ? 'Ýüklenýär...' : 'Gözlemek' }}</span>
                    </button>
                </div>
            </div>
        </div>

        <button type="button" class="absolute bottom-0 z-20 cursor-pointer" @click.stop="$emit('scroll')">
            <img src="/icons/arrow_down.webp" class="sm:h-[30px] h-[25px]" />
        </button>
    </section>
</template>

<script setup>
import heroImage from '@/assets/images/hero.webp'
const emit = defineEmits(['search', 'scroll'])
const orderStore = useOrderStore()
const searchInput = ref('')
</script>
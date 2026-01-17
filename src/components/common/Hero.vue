<template>
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
        <img :src="heroImage" class="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div class="absolute inset-0 bg-custom-overlay"></div>
        <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 animate-fade-in">
            <div
                class="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 animate-slide-down">
                <dote />
                <span class="text-white text-sm font-medium">Siziň ynamyňyz - biziň borjumyzdyr</span>
            </div>

            <h1 class="text-5xl sm:text-[72px] font-bold text-white leading-[100%] animate-slide-down pb-5"
                style="animation-delay: 100ms">
                Sargydyňyzy yzarlamak
            </h1>

            <div class="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-4 animate-slide-up">
                <div class="relative">
                    <input v-model="searchInput" type="text" placeholder="Sargydyňyzy trek kody boyunça gözläň..."
                        class="w-full text-lg px-6 py-[22px] bg-[#EBF3FD] rounded-[18px] pr-48 outline-none text-[#4D4D4D] placeholder-[#4D4D4D]" />
                    <button @click="$emit('search', searchInput)"
                        class="absolute right-4 top-1/2 transform -translate-y-1/2 px-6 py-4 bg-custom-gradient text-white rounded-[14px] font-semibold hover:shadow-lg transition-all duration-300 whitespace-nowrap flex items-center justify-center space-x-2">
                        <search-icon />
                        <span>Gözlemek</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="bg-[#F3F8FF] w-full h-[55px] rounded-t-[40px] absolute bottom-0 z-40">
            <button @click="scrollToCalculator"
                class="absolute bottom-10 py-6 left-1/2 transform -translate-x-1/2 z-20 bg-[#F3F8FF] rounded-t-[40px] w-12 h-6 flex items-center justify-center text-white animate-bounce">
                <arrow_down-icon />
            </button>
        </div>
    </section>
</template>

<script setup>
import heroImage from '@/assets/images/hero.webp'
const searchInput = ref('')
</script>
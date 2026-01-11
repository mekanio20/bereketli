<template>
    <footer ref="footerRef" class="bg-[#002645] text-white relative overflow-hidden rounded-t-[40px]">

        <div class="absolute sm:block hidden top-0 bottom-0 left-0 right-0">
            <img class="w-full h-full object-cover" :src="background">
        </div>

        <!-- Main Footer Content -->
        <MainContainer>
            <div class="py-20 relative z-10">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-8">

                    <!-- Logo and App Downloads Column -->
                    <div class="space-y-24" :class="{ 'animate-slide-up': isVisible }" style="animation-delay: 0.1s">
                        <!-- Logo -->
                        <router-link to="/"
                            class="bg-white rounded-lg py-[10px] px-[25px] inline-block shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img src="/icons/logo.webp"
                                alt="Bereketli Logistika" class="w-auto h-[28px]" />
                        </router-link>

                        <!-- App Download Buttons -->
                        <div class="flex items-center space-x-4">
                            <a href="#"
                                class="w-[167px] block hover:scale-105 transform transition-all duration-300 group">
                                <img src="/icons/play_store.webp">
                            </a>

                            <a href="#"
                                class="w-[167px] block hover:scale-105 transform transition-all duration-300 group">
                                <img src="/icons/app_store.webp">
                            </a>
                        </div>
                    </div>

                    <!-- Navigation Column 1 -->
                    <nav class="space-y-8" :class="{ 'animate-slide-up': isVisible }" style="animation-delay: 0.2s">
                        <div>
                            <router-link to="/"
                                class="text-sm sm:text-base font-medium mb-4 hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                                Baş sahypa</router-link>
                        </div>
                        <div>
                            <router-link to="#"
                                class="text-sm sm:text-base font-medium mb-4 hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                                Habarlaşmak</router-link>
                        </div>
                        <div>
                            <router-link to="#"
                                class="text-sm sm:text-base font-medium mb-4 hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                                Hyzmatlarymyz</router-link>
                        </div>
                    </nav>

                    <!-- Navigation Column 2 -->
                    <nav class="space-y-8" :class="{ 'animate-slide-up': isVisible }" style="animation-delay: 0.3s">
                        <div>
                            <router-link to="#"
                                class="text-sm sm:text-base font-medium mb-4 hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                                Biz barada</router-link>
                        </div>
                        <div>
                            <router-link to="#"
                                class="text-sm sm:text-base font-medium mb-4 hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                                Kömek</router-link>
                        </div>
                        <div>
                            <router-link to="#"
                                class="text-sm sm:text-base font-medium mb-4 hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                                Howpsuzlyk</router-link>
                        </div>
                    </nav>

                    <!-- Contact Information Column -->
                    <div class="space-y-8" :class="{ 'animate-slide-up': isVisible }" style="animation-delay: 0.4s">
                        <div>
                            <h3 class="text-sm font-medium text-gray-300 mb-3">Salgy</h3>
                            <p class="text-base leading-relaxed hover:text-orange-400 transition-colors duration-300">
                                Jebel Free Zone, BCW, Office No.<br />
                                104-03, Dubai, UAE
                            </p>
                        </div>

                        <div>
                            <h3 class="text-sm font-medium text-gray-300 mb-3">Contact us</h3>
                            <a href="tel:+99361616161"
                                class="block text-base mb-2 hover:text-orange-400 transition-colors duration-300 hover:underline">
                                +99361 616161
                            </a>
                            <a href="mailto:bereketlilogistika@gmail.com"
                                class="block text-base hover:text-orange-400 transition-colors duration-300 hover:underline break-all">
                                bereketlilogistika@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </MainContainer>

        <!-- Bottom Bar -->
        <div class="border-t border-white/20 relative z-10">
            <MainContainer>
                <div class="py-5">
                    <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <!-- Copyright -->
                        <p class="text-sm text-gray-300">
                            Copyright © 2025 Bereketli Logistika - Ähli hukuklar goralandyr.
                        </p>
    
                        <!-- Social Media Icons -->
                        <div class="flex items-center space-x-4">
                            <a href="#"
                                class="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 hover:rotate-12 transform transition-all duration-300 shadow-lg hover:shadow-xl group"
                                aria-label="Instagram">
                                <instagram-icon class="text-[#002244] group-hover:text-pink-600 transition-colors duration-300" />
                            </a>
    
                            <a href="#"
                                class="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 hover:rotate-12 transform transition-all duration-300 shadow-lg hover:shadow-xl group"
                                aria-label="TikTok">
                                <tiktok-icon class="text-[#002244] group-hover:text-pink-600 transition-colors duration-300" /> 
                            </a>
    
                            <a href="#"
                                class="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 hover:rotate-12 transform transition-all duration-300 shadow-lg hover:shadow-xl group"
                                aria-label="X (Twitter)">
                                <x-icon class="text-[#002244] group-hover:text-blue-500 transition-colors duration-300" />
                            </a>
                        </div>
                    </div>
                </div>
            </MainContainer>
        </div>
    </footer>
</template>

<script setup>
import background from '@/assets/images/footer.webp'
const footerRef = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
    observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                isVisible.value = true
            }
        },
        { threshold: 0.1 }
    )

    if (footerRef.value) {
        observer.observe(footerRef.value)
    }
})

onUnmounted(() => {
    if (observer && footerRef.value) {
        observer.unobserve(footerRef.value)
    }
})
</script>

<style scoped>
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-slide-up {
    animation: slideUp 0.6s ease-out forwards;
    opacity: 0;
}
</style>
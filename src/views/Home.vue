<template>
    <div class="w-full">
        <Header />
        <NotificationBar />
        <Hero />
        <div class="relative pb-40">
            <MainContainer class="space-y-20">
                <Callculator />
                <Services />
            </MainContainer>

            <!-- Absolute Background -->
            <div class="absolute top-0 -z-10 w-full h-full bg-[#F3F8FF]">
                <img :src="background" class="w-full h-full object-cover" />
            </div>
        </div>

        <div class="relative">
            <MainContainer>
                <About />
            </MainContainer>
        </div>

        <!-- Phone Button -->
        <a href="tel:+99361626364"
            class="fixed bottom-8 right-8 z-40 bg-custom-gradient text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 group">
            <phone-icon />
            <span
                class="absolute right-full bottom-2 mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+99361626364</span>
        </a>
    </div>
</template>

<script setup>
import background from '@/assets/images/background.webp'
</script>
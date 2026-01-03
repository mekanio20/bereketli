<template>
    <div class="w-full overflow-hidden">
        <Header />
        <NotificationBar />
        <Hero />
        <div class="relative pb-28">
            <MainContainer>
                <div class="space-y-20">
                    <Callculator />
                    <Services />
                </div>
            </MainContainer>

            <!-- Absolute Background -->
            <div class="absolute top-0 -z-10 w-full h-full bg-[#F3F8FF]">
                <img :src="background" class="w-full h-full object-cover" />
            </div>
        </div>

        <div class="w-full">
            <OrderService />
            <MainContainer>
                <div class="relative">
                    <Mobile />
                    <div class="font-medium text-[52px] text-[#222222] leading-[62px] py-5">
                        Biz ygtybarly, netijeli we <img src="/images/img_1.webp"
                            class="w-[115px] h-[45px] inline-block" />
                        döwrebap logistika çözgütlerini hödürleýäris. <span class="text-gold-gradient">Transport,
                            ammarçylyk
                            we <img src="/images/img_2.webp" class="w-[115px] h-[45px] inline-block" />
                            üpjünçilik zynjyrynda baý</span> tejribämiz bilen iberişleri takyk we wagtynda ýetirilmegini
                        üpjün edýäris <img src="/images/img_3.webp" class="w-[115px] h-[45px] inline-block" />
                    </div>
                    <!-- Absolute Background -->
                    <div class="absolute top-[300px] -z-10 w-full h-full">
                        <img :src="background" class="w-full h-full object-cover" />
                    </div>
                </div>
            </MainContainer>
            <Statistic />
            <MainContainer>
                <div class="space-y-8">
                    <News />
                    <Comments />
                </div>
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
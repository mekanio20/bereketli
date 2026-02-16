<template>
    <section class="overflow-x-hidden">
        <!-- Absolute -->
         <div class="h-screen relative">
            <!-- Bg image -->
             <div class="absolute -z-10 w-full h-full bg-[#F3F8FF]">
                 <img :src="background" class="w-full h-full object-contain" />
             </div>
             <!-- Title -->
             <div class="absolute top-48 left-1/2 -translate-x-1/2 w-full">
                <h1 class="font-semibold text-[94px] leading-[90px] uppercase text-[#0C1A30] text-center mx-40">
                    Delivering <span class="text-gold-gradient italic">efficiency</span> at every mile
                </h1>
             </div>
             <!-- Bg container -->
             <div class="absolute z-10 top-[120px] left-1/2 -translate-x-1/2">
                 <img src="/images/container.webp" class="w-full h-[600px] object-cover" loading="lazy" />
             </div>
         </div>
        <MainContainer>
            <SectionContainer>
                
            </SectionContainer>
        </MainContainer>
    </section>
</template>

<script setup>
import background from '@/assets/images/background.webp'
</script>
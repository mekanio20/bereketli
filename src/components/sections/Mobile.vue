<template>
    <section class="relative w-full h-[370px] mt-10 mb-20 bg-custom-gradient py-6 md:py-10 rounded-3xl lg:py-24">
        <div class="h-full flex items-center justify-between pl-20 max-w-[550px]">
            <div class="h-full flex flex-col space-y-10 justify-center">
                <h2 class="text-[44px] text-white font-bold leading-[100%]">Mobil Programmamyz</h2>
                <p class="text-lg text-white font-medium leading-[100%]">Aňsatlyk bilen bukjalaryňyzy yzarlaň,
                    töläň we habarnama
                    alyň!</p>
                <router-link to="#" class="group relative z-10 flex items-center w-fit">
                    <!-- Text -->
                    <button type="button"
                        class="py-[10px] px-8 rounded-full bg-white text-[#F98900] hover:bg-[#fff7ec] transition-all duration-300 sm:text-lg text-base font-semibold">
                        Ýüklemek
                    </button>

                    <!-- Animated Dot -->
                    <span class="absolute -z-10 right-3 p-1 rounded-full bg-white hover:bg-[#fff7ec]
                rotate-[-180deg]
                 transition-all duration-500 ease-out
                 group-hover:translate-x-14
                 group-hover:rotate-[360deg]">
                        <arrow_right-icon :color="'#F98900'" />
                    </span>
                </router-link>
            </div>
        </div>
        <div class="absolute bottom-0 right-[100px] z-20 flex items-center space-x-10">
            <div class="w-[120px] h-[120px]">
                <img src="/icons/qr.webp" class="w-full h-full object-cover">
            </div>
            <div class="w-[360px] h-full">
                <img src="/icons/phone.webp" class="w-full h-full object-cover">
            </div>
        </div>
    </section>
</template>
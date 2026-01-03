<template>
    <button class="group relative flex items-center">
        <!-- Text -->
        <router-link to="#" class="py-[10px] px-8 rounded-full bg-[#002645] text-white sm:text-lg text-base font-semibold">
            Ählisini görmek
        </router-link>

        <!-- Animated Dot -->
        <span class="absolute -z-10 right-3 p-1 rounded-full bg-[#0B2545]
            rotate-[-180deg]
             transition-all duration-500 ease-out
             group-hover:translate-x-14
             group-hover:rotate-[360deg]">
            <arrow_right-icon />
        </span>
    </button>
</template>

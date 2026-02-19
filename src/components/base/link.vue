<template>
    <router-link :to="to" class="relative w-[200px] group flex items-center cursor-pointer">
        <span class="py-[10px] px-[30px] rounded-full z-20 bg-[#002645] text-white sm:text-lg text-base font-semibold">
            {{ text || $t("buttons.view_all") }}
        </span>
        <!-- Animated Dot -->
        <span class="absolute z-10 right-6 p-1 rounded-full bg-[#0B2545]
                            rotate-[-180deg]
                            transition-all duration-500 ease-out
                            group-hover:translate-x-12
                            group-hover:rotate-[360deg]">
            <arrow_right-icon />
        </span>
    </router-link>
</template>

<script setup>
defineProps({
    text: {
        type: String
    },
    to: {
        type: String,
        required: true
    }
})
</script>
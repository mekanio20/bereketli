<template>
    <div class="px-8 py-10 rounded-[20px] flex flex-col space-y-6 bg-white group hover:bg-[#002645] duration-300">
        <div class="text-[#002645] group-hover:text-white">
            <component :is="icons[data.icon]" :size="45" :color="'currentColor'" />
        </div>
        <h2 class="lg:text-[24px] sm:text-[22px] text-lg text-[#222222] group-hover:text-[#FEFEFE] font-bold">
            {{ data.title }}
        </h2>
        <p class="lg:text-base sm:text-sm text-xs text-[#838589] group-hover:text-[#FEFEFE] font-medium">
            {{ data.desc }}
        </p>
    </div>
</template>

<script setup>
const { icons } = useIcons()
defineProps({ data: Object })
</script>
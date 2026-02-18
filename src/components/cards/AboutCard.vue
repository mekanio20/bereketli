<template>
    <div class="px-8 py-10 rounded-[20px] flex flex-col space-y-6 bg-white group hover:bg-[#002645] duration-300">
        <div class="text-[#002645] group-hover:text-white">
            <component :is="icons[data.icon]" :size="48" :color="'currentColor'" />
        </div>
        <h2 class="text-[24px] text-[#222222] group-hover:text-[#FEFEFE] font-bold">
            {{ data.title }}
        </h2>
        <p class="text-base text-[#838589] group-hover:text-[#FEFEFE] font-medium">
            {{ data.desc }}
        </p>
    </div>
</template>

<script setup>
const { icons } = useIcons()
defineProps({ data: Object })
</script>
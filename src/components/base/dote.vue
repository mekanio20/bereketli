<template>
    <div :style="{ borderColor: border_color }"
        class="w-4 h-4 flex items-center justify-center border rounded-full">
        <div class="rounded-full w-[5px] h-[5px]" :style="{ backgroundColor: bg_color }"></div>
    </div>
</template>

<script setup>
const props = defineProps({
    border_color: { type: String, default: 'white' },
    bg_color: { type: String, default: 'white' },
})
</script>

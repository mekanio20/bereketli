<template>
    <div :style="{ borderColor: border_color, width: border_width, height: border_height }"
        class="flex items-center justify-center border rounded-full">
        <div class="rounded-full" :style="{ backgroundColor: bg_color, width: bg_width, height: bg_height }"></div>
    </div>
</template>

<script setup>
const props = defineProps({
    border_color: { type: String, default: 'white' },
    border_width: { type: String, default: '16px' },
    border_height: { type: String, default: '16px' },
    bg_color: { type: String, default: 'white' },
    bg_width: { type: String, default: '5px' },
    bg_height: { type: String, default: '5px' }
})
</script>

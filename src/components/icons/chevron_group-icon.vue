<template>
    <svg :width="size" :height="size" viewBox="0 0 52 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30.75 25.5L39.25 17L30.75 8.5" :stroke="color" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
        <path d="M21.75 25.5L30.25 17L21.75 8.5" :stroke="color" stroke-opacity="0.7" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" />
        <path d="M12.75 25.5L21.25 17L12.75 8.5" :stroke="color" stroke-opacity="0.3" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: [String, Number],
        default: 52
    },
    color: {
        type: String,
        default: '#B7B7B7'
    }
})
</script>
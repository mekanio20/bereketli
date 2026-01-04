<template>
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none">
        <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: [String, Number],
        default: 24
    },
    color: {
        type: String,
        default: 'white'
    }
})
</script>
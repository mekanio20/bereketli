<template>
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M13.8752 8.37527L8.38919 13.8613C7.56319 14.6873 7.56319 16.0273 8.38919 16.8533V16.8533C9.21519 17.6793 10.5552 17.6793 11.3812 16.8533L18.6132 9.62127C20.1282 8.10627 20.1282 5.65027 18.6132 4.13527V4.13527C17.0982 2.62027 14.6422 2.62027 13.1272 4.13527L5.89519 11.3673C3.69119 13.5713 3.69119 17.1433 5.89519 19.3473V19.3473C8.09919 21.5513 11.6712 21.5513 13.8752 19.3473L18.2642 14.9583"
            :stroke="color" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
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
        default: '#003B5F'
    }
})
</script>
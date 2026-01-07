<template>
    <svg :width="size" :height="size" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.4167 6.58333H15.75C16.192 6.58333 16.6159 6.75893 16.9285 7.07149C17.2411 7.38405 17.4167 7.80797 17.4167 8.25C17.4167 8.69203 17.2411 9.11595 16.9285 9.42851C16.6159 9.74107 16.192 9.91667 15.75 9.91667H12.4167L9.08333 15.75H6.58333L8.25 9.91667H4.91667L3.25 11.5833H0.75L2.41667 8.25L0.75 4.91667H3.25L4.91667 6.58333H8.25L6.58333 0.75H9.08333L12.4167 6.58333Z"
            :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: [String, Number],
        default: 20
    },
    color: {
        type: String,
        default: '#222222'
    }
})
</script>
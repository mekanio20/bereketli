<template>
    <svg :width="size" :height="size" fill="none" :stroke="color" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
    </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 22
  },
  color: {
    type: String,
    default: 'white'
  }
})
</script>
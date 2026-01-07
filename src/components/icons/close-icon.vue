<template>
  <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
    <path d="M20.625 6.875L6.875 20.625" :stroke="color" stroke-width="2.5" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M6.875 6.875L20.625 20.625" :stroke="color" stroke-width="2.5" stroke-linecap="round"
      stroke-linejoin="round" />
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 28
  },
  color: {
    type: String,
    default: '#222222'
  }
})
</script>
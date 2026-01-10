<template>
  <svg viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
    <path d="M12 5V19" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M19 12L12 19L5 12" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
    default: '#222222'
  }
})
</script>
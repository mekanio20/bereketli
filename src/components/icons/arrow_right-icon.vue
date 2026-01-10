<template>
  <svg viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
    <path d="M12.0215 21.9209L21.921 12.0214" :stroke="color" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M12.0215 12.0205H21.921V21.92" :stroke="color" stroke-width="2" stroke-linecap="round"
      stroke-linejoin="round" />
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 34
  },
  color: {
    type: String,
    default: 'white'
  }
})
</script>
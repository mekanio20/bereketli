<template>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        :stroke="color" :width="size" :height="size">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 16
  },
  color: {
    type: String,
    default: '#838589'
  }
})
</script>
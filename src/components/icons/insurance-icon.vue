<template>
  <svg   viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
<path d="M21.5 44H8C7.73478 44 7.48043 43.8946 7.29289 43.7071C7.10536 43.5196 7 43.2652 7 43V8C7 7.73478 7.10536 7.48043 7.29289 7.29289C7.48043 7.10536 7.73478 7 8 7H34C34.2652 7 34.5196 7.10536 34.7071 7.29289C34.8946 7.48043 35 7.73478 35 8V25.95" :stroke="color"/>
<path d="M9 4H37C37.2652 4 37.5196 4.10536 37.7071 4.29289C37.8946 4.48043 38 4.73478 38 5V26" :stroke="color" stroke-dasharray="2 2"/>
<path d="M11 13H31M11 21H31M11 29H23" :stroke="color"/>
<path d="M28 38L32 42L41 33" :stroke="color" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 48
  },
  color: {
    type: String,
    default: '#002645'
  }
})
</script>
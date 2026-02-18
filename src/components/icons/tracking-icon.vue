<template>
  <svg   viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
<path d="M4 44H36C38.1217 44 40.1566 43.1571 41.6569 41.6569C43.1571 40.1566 44 38.1217 44 36C44 33.8783 43.1571 31.8434 41.6569 30.3431C40.1566 28.8429 38.1217 28 36 28H16C9.373 28 4 22.627 4 16C4 9.373 9.373 4 16 4H44M44 4L37 1M44 4L37 7" :stroke="color"/>
<path d="M4 44H36C38.1217 44 40.1566 43.1571 41.6569 41.6569C43.1571 40.1566 44 38.1217 44 36C44 33.8783 43.1571 31.8434 41.6569 30.3431C40.1566 28.8429 38.1217 28 36 28H8C6.93913 28 5.92172 27.5786 5.17157 26.8284C4.42143 26.0783 4 25.0609 4 24C4 22.9391 4.42143 21.9217 5.17157 21.1716C5.92172 20.4214 6.93913 20 8 20H44M44 20L37 17M44 20L37 23" :stroke="color" stroke-dasharray="4 4"/>
<path d="M28 20H44M44 20L37 17M44 20L37 23" :stroke="color"/>
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
    default: 'white'
  }
})
</script>
<template>
  <svg   viewBox="0 0 13 13" :fill="color" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size">
<g clip-path="url(#clip0_5255_24111)">
<path d="M7.59072 5.42L12.2533 0H11.1483L7.09992 4.706L3.86632 0H0.136719L5.02652 7.1164L0.136719 12.8H1.24172L5.51712 7.8303L8.93192 12.8H12.6615L7.59042 5.42H7.59072ZM6.07732 7.179L5.58182 6.4704L1.63982 0.8318H3.33702L6.51812 5.3824L7.01352 6.091L11.1488 12.006H9.45182L6.07732 7.1793V7.179Z" :fill="color"/>
</g>
<defs>
<clipPath id="clip0_5255_24111">
<rect width="12.8" height="12.8" :fill="color"/>
</clipPath>
</defs>
</svg>

</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 13
  },
  color: {
    type: String,
    default: 'none'
  }
})
</script>
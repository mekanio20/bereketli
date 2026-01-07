<template>
    <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11.5" stroke="url(#paint0_linear_5250_5272)" />
        <circle cx="12.0007" cy="11.9997" r="6.66667" fill="url(#paint1_linear_5250_5272)" />
        <defs>
            <linearGradient id="paint0_linear_5250_5272" x1="23.6118" y1="-6.19998" x2="0.957475" y2="-5.334"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#FFC359" />
                <stop offset="0.3" stop-color="#FFA50D" />
                <stop offset="0.67" stop-color="#FFC156" />
                <stop offset="1" stop-color="#FFA100" />
            </linearGradient>
            <linearGradient id="paint1_linear_5250_5272" x1="18.4516" y1="1.88857" x2="5.86591" y2="2.36967"
                gradientUnits="userSpaceOnUse">
                <stop stop-color="#FFC359" />
                <stop offset="0.3" stop-color="#FFA50D" />
                <stop offset="0.67" stop-color="#FFC156" />
                <stop offset="1" stop-color="#FFA100" />
            </linearGradient>
        </defs>
    </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 24
  }
})
</script>
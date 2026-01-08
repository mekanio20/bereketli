<template>
    <svg :width="size" :height="size" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M3.11024 3.11133H15.5547C16.4102 3.11133 17.1102 3.81133 17.1102 4.66688V14.0002C17.1102 14.8558 16.4102 15.5558 15.5547 15.5558H3.11024C2.25469 15.5558 1.55469 14.8558 1.55469 14.0002V4.66688C1.55469 3.81133 2.25469 3.11133 3.11024 3.11133Z"
            :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M17.1102 4.66699L9.33247 10.1114L1.55469 4.66699" :stroke="color" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round" />
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: [String, Number],
        default: 19
    },
    color: {
        type: String,
        default: '#FFBE00'
    }
})
</script>
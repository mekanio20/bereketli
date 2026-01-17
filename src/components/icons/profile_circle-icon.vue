<template>
    <svg :width="size" :height="size" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_7001_4381)">
            <path
                d="M10.0013 1.66699C5.3988 1.66699 1.66797 5.39783 1.66797 10.0003C1.66797 14.6028 5.3988 18.3337 10.0013 18.3337C14.6038 18.3337 18.3346 14.6028 18.3346 10.0003C18.3346 5.39783 14.6038 1.66699 10.0013 1.66699Z"
                :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path
                d="M3.5625 15.2883C3.5625 15.2883 5.42 12.9167 10.0033 12.9167C14.5867 12.9167 16.445 15.2883 16.445 15.2883M10.0033 10C10.6664 10 11.3023 9.73661 11.7711 9.26777C12.2399 8.79893 12.5033 8.16304 12.5033 7.5C12.5033 6.83696 12.2399 6.20107 11.7711 5.73223C11.3023 5.26339 10.6664 5 10.0033 5C9.34029 5 8.70441 5.26339 8.23557 5.73223C7.76673 6.20107 7.50333 6.83696 7.50333 7.5C7.50333 8.16304 7.76673 8.79893 8.23557 9.26777C8.70441 9.73661 9.34029 10 10.0033 10Z"
                :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_7001_4381">
                <rect :width="size" :height="size" fill="white" />
            </clipPath>
        </defs>
    </svg>
</template>

<script setup>
defineProps({
    size: {
        type: [String, Number],
        default: 20
    },
    color: {
        type: String,
        default: '#002645'
    }
})
</script>
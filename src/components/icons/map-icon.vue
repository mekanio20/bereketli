<template>
    <svg :width="size" :height="size" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_5276_21865)">
            <path
                d="M0.728516 4.37467V16.0413L5.83268 13.1247L11.666 16.0413L16.7702 13.1247V1.45801L11.666 4.37467L5.83268 1.45801L0.728516 4.37467Z"
                :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M11.666 4.375V16.0417" :stroke="color" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            <path d="M5.83398 1.45801V13.1247" :stroke="color" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
        </g>
        <defs>
            <clipPath id="clip0_5276_21865">
                <rect width="17.5" height="17.5" fill="white" />
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
        default: '#222222'
    }
})
</script>
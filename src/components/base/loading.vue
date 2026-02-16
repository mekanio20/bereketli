<template>
    <div class="w-full flex items-center justify-center py-20" >
        <span class="font-medium text-[#002244]">{{ $t('info.loading') }}</span>
    </div>
</template>

<script setup>
defineProps({
    size: {
        type: [String, Number],
        default: 20
    },
    color: {
        type: String,
        default: '#002244'
    },
    customClass: {
        type: String,
        default: ''
    }
})
</script>
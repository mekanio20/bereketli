<template>
    <section class="w-full">
        <div class="flex flex-col items-center">
            <div v-if="image" class="w-[350px]">
                <img :src="image" class="w-full h-full object-cover">
            </div>
            <p class="text-[36px] text-[#838589] font-medium">{{ message || $t('info.no_data') }}</p>
        </div>
    </section>
</template>

<script setup>
defineProps({
    message: {
        type: String
    },
    image: {
        type: String,
        default: '/icons/empty_box.webp'
    }
})
</script>
<template>
    <section class="w-full">
        <div class="flex flex-col items-center">
            <div v-if="image" class="sm:w-[350px] w-[250px]">
                <img :src="image" class="w-full h-full object-cover">
            </div>
            <p class="lg:text-[36px] sm:text-2xl text-xl text-[#838589] font-medium">{{ message || $t('info.no_data') }}</p>
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
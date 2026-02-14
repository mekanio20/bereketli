<template>
    <div class="w-full space-y-10 pb-10">
        <h2 class="font-semibold text-[44px] text-[#222222]">
            Hyzmatlarymyz
        </h2>
        <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            <div v-for="(item, index) in services" :key="index" class="relative h-[290px] py-6 px-8 bg-white border border-[#F5F5F5] rounded-3xl">
                <h3 class="font-semibold text-[30px] text-[#222222]">{{ item.name }}</h3>
                <img class="absolute bottom-0 right-0 h-[190px]" :src="item.image">
            </div>
        </div>
    </div>
</template>

<script setup>
const services = ref([
    {
        name: 'Order Requests',
        image: '/icons/box.webp'
    },
    {
        name: 'Contact us',
        image: '/icons/comment.webp'
    },
    {
        name: 'Warehouses',
        image: '/icons/location.webp'
    },
])
</script>
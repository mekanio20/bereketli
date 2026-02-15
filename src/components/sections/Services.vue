<template>
    <div class="w-full space-y-10 pb-10">
        <h2 class="font-semibold text-[44px] text-[#222222]">
            Hyzmatlarymyz
        </h2>
        <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            <router-link v-for="(item, index) in services" :key="index" :to="item.link" class="relative h-[290px] py-6 px-8 bg-white border border-[#F5F5F5] hover:bg-[#fafcff] rounded-3xl group cursor-pointer">
                <h3 class="font-semibold text-[30px] text-[#222222] group-hover:scale-95 transition-all duration-300">{{ item.name }}</h3>
                <img class="absolute bottom-0 right-0 h-[190px] group-hover:scale-105 group-hover:rotate-3 transition-all duration-300" :src="item.image">
            </router-link>
        </div>
    </div>
</template>

<script setup>
const services = ref([
    {
        name: 'Order Requests',
        image: '/icons/box.webp',
        link: '/order/requests'
    },
    {
        name: 'Contact us',
        image: '/icons/comment.webp',
        link: '/chat'
    },
    {
        name: 'Warehouses',
        image: '/icons/location.webp',
        link: '/warehouses'
    },
])
</script>
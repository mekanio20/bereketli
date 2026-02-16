<template>
    <section class="py-16 px-4 sm:px-6 lg:px-20 bg-white rounded-t-[40px]">
        <MainContainer>
            <!-- Header -->
            <div class="flex justify-between items-center mb-12 transition-all duration-700"
                :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'">
                <h1 class="text-[44px] font-semibold text-[#222222]">
                    {{ $t('names.order_service') }}
                </h1>
            </div>

            <!-- Swiper Container -->
            <swiper :modules="modules" :slides-per-view="1" :space-between="20" :loop="true" :autoplay="{
                delay: 5000,
                disableOnInteraction: false,
            }" :pagination="{
                clickable: true,
                dynamicBullets: false,
            }" :breakpoints="{
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
            }" @swiper="onSwiper" class="transport-swiper">
                <swiper-slide v-for="(service, index) in services" :key="service.id">
                    <div class="relative rounded-3xl overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-3xl h-96"
                        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                        :style="{ transitionDelay: `${index * 100}ms` }">
                        <!-- Image -->
                        <div class="relative h-full overflow-hidden">
                            <img :src="service.image" :alt="service.title"
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                            <!-- Overlay Gradient -->
                            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="absolute inset-0 p-8 flex flex-col justify-between">
                            <!-- Top Icons -->
                            <div class="flex justify-between items-start">
                                <div
                                    class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
                                    <component :is="icons[service.icon]" :color="'#fff'" />
                                </div>
                                <span
                                    class="px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium transition-all duration-300 group-hover:bg-white/30">
                                    {{ service.category }}
                                </span>
                            </div>

                            <!-- Bottom Content -->
                            <div class="space-y-2">
                                <h3
                                    class="text-3xl font-bold text-white transition-all duration-300 group-hover:translate-x-2">
                                    {{ service.title }}
                                </h3>
                                <div class="flex justify-end">
                                    <span
                                        class="text-6xl font-bold text-white/30 transition-all duration-300 group-hover:text-white/50">
                                        {{ service.number }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Hover Effect Border -->
                        <div
                            class="absolute inset-0 border-4 border-transparent group-hover:border-white/20 rounded-3xl transition-all duration-300 pointer-events-none">
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </MainContainer>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n({ useScope: 'global' });

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const { icons } = useIcons();
const isVisible = ref(false);
const swiperRef = ref(null);

const modules = [Navigation, Pagination, Autoplay];

const services = ref([
    {
        id: 1,
        title: t('data.order_service.title_1'),
        number: '01',
        icon: 'truck-icon',
        category: t('data.order_service.category'),
        image: '/images/truck_service.webp'
    },
    {
        id: 2,
        title: t('data.order_service.title_2'),
        number: '02',
        icon: 'mingcute_ship_line-icon',
        category: t('data.order_service.category'),
        image: '/images/ship_service.webp'
    },
    {
        id: 3,
        title: t('data.order_service.title_3'),
        number: '03',
        icon: 'train-icon',
        category: t('data.order_service.category'),
        image: '/images/airplane_service.webp'
    }
]);

const onSwiper = (swiper) => {
    swiperRef.value = swiper;
};

onMounted(() => {
    isVisible.value = true;
});
</script>

<style>
.transport-swiper {
    padding-bottom: 60px !important;
}

.transport-swiper .swiper-pagination {
    bottom: 20px !important;
}

.transport-swiper .swiper-pagination-bullet {
    width: 12px;
    height: 12px;
    background: #cbd5e1;
    opacity: 1;
    transition: all 0.3s ease;
}

.transport-swiper .swiper-pagination-bullet-active {
    width: 48px;
    border-radius: 6px;
    background: #1e293b;
}

.transport-swiper .swiper-pagination-bullet:hover {
    background: #94a3b8;
}
</style>
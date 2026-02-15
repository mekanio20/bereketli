<template>
    <section class="px-4 sm:px-6 lg:px-20 bg-white rounded-t-[40px]">
        <MainContainer>
            <!-- Header -->
            <div class="flex justify-between items-center mb-12 transition-all duration-700"
                :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'">
                <h1 class="section_title">
                    {{ title }}
                </h1>
                <BaseLink :to="'/news'" />
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
                <swiper-slide v-for="(item, index) in data" :key="item.id">
                    <div class="relative rounded-3xl overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-3xl h-96"
                        :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
                        :style="{ transitionDelay: `${index * 100}ms` }">
                        <NewsCard :image="item.image" :date="item.date_created" :title="item.title" @click="handleNewsDetail(item.id)" />
                    </div>
                </swiper-slide>
            </swiper>
        </MainContainer>
    </section>
</template>

<script setup>
const { icons } = useIcons();
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const router = useRouter();
const modules = [Navigation, Pagination, Autoplay];
const isVisible = ref(false);
const swiperRef = ref(null);

defineProps({
    title: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    }
});

const onSwiper = (swiper) => {
    swiperRef.value = swiper;
};

const handleNewsDetail = (id) => {
    router.push({ name: 'NewsDetail', params: { id } })
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
<template>
    <section class="space-y-10 pb-10">
        <h2 class="text-[44px] font-semibold text-[#222222]">{{ $t('menu.news') }}</h2>
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
            <swiper-slide v-for="item in news" :key="item.id">
                <NewsCard :image="item.image" :date="item.date_created"
                    :title="item.title" @click="handleNewsDetail(item.id)" />
            </swiper-slide>
        </swiper>
        <div class="flex items-center justify-center">
            <Link :to="'/news'" />
        </div>
    </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiperRef = ref(null);
const modules = [Navigation, Pagination, Autoplay];

const router = useRouter()
const props = defineProps({
    news: {
        type: Array,
        required: true
    }
})
const handleNewsDetail = (id) => {
    router.push({ name: 'NewsDetail', params: { id } })
}

const onSwiper = (swiper) => {
    swiperRef.value = swiper;
};
</script>
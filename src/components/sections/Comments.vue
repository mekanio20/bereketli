<template>
    <section class="space-y-10 pb-10">
        <div class="flex items-center justify-between select-none">
            <h2 class="text-[44px] font-semibold text-[#222222]">{{ $t('names.customer_comments') }}</h2>
            <!-- Arrow icons -->
            <div class="flex items-center space-x-2">
                <div
                    class="prev_el w-[50px] h-[50px] bg-custom-gradient flex items-center justify-center rounded-full cursor-pointer">
                    <arrow_down-icon :color="'#fff'" :size="20" class="rotate-[90deg]" />
                </div>
                <div
                    class="next_el w-[50px] h-[50px] bg-custom-gradient flex items-center justify-center rounded-full cursor-pointer">
                    <arrow_down-icon :color="'#fff'" :size="20" class="rotate-[-90deg]" />
                </div>
            </div>
        </div>
        <!-- Cards -->
        <div class="pt-10">
            <swiper :modules="modules" :slides-per-view="1" :space-between="20" :loop="true"
                :autoplay="{ delay: 5000, disableOnInteraction: false, }"
                :navigation="{ prevEl: '.prev_el', nextEl: '.next_el' }"
                :breakpoints="{
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
                }">
                <swiper-slide v-for="(comment, index) in comments" :key="index">
                    <CommentCard :data="comment" />
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n({ useScope: 'global' });

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const modules = [Navigation, Pagination, Autoplay];
const comments = ref([
    {
        number: '01',
        comment: t('data.customer_comments.comment'),
        full_name: 'Aýlar M.',
        profession: t('data.customer_comments.profession'),
        avatar: '/images/avatar.webp'
    },
    {
        number: '02',
        comment: t('data.customer_comments.comment'),
        full_name: 'Aýlar M.',
        profession: t('data.customer_comments.profession'),
        avatar: '/images/avatar.webp'
    },
    {
        number: '03',
        comment: t('data.customer_comments.comment'),
        full_name: 'Aýlar M.',
        profession: t('data.customer_comments.profession'),
        avatar: '/images/avatar.webp'
    },
])
</script>
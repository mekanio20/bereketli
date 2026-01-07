<template>
    <section class="space-y-10 pb-10">
        <div class="flex items-center justify-between select-none">
            <h2 class="text-[44px] font-semibold text-[#222222]">Müşderilerimiziň biziň barada pikirleri</h2>
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
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const modules = [Navigation, Pagination, Autoplay];
const comments = ref([
    {
        number: '01',
        comment: '“Bereketli Logistika bilen hyzmatdaşlyk etmek örän ynamdar we aňsat boldy. Olar her bir iberişi takyk we wagtynda ýetirmegi üpjün edýärler. Müşderi hyzmatlary hemişe ünsli we kömekçi bolýar, haýsydyr bir soragym ýa-da islegim bolanda derrew çözgüt berýärler.”',
        full_name: 'Aýlar M.',
        profession: 'DHL kompaniýasynyň hünärmeni',
        avatar: '/images/avatar.webp'
    },
    {
        number: '02',
        comment: '“Logistika bilen baglanyşykly ähli hyzmatlaryndan doly kanagatlandym.  Biziň kompaniýamyzyň eltip bermelerini doly gözegçilikde saklap, ähli ädimleri doly dokumentirleýär. Tejribe we hyzmatlaryň hili ýokary derejesi bilen biziň işimizi ep-esli ýeňilleşdirdi.”',
        full_name: 'Aýlar M.',
        profession: 'DHL kompaniýasynyň hünärmeni',
        avatar: '/images/avatar.webp'
    },
    {
        number: '03',
        comment: '“Bereketli Logistika bilen işlemek biziň kompaniýamyz üçin örän peýdaly boldy. Olar diňe eltip bermeleri ýerine ýetirmeýär, eýsem logistika prosesini has optimal we tygşytly edýär. Müşderiniň isleglerini diňlemegi we çözgütleri ýörite taýýarlamalylygy bilen biziň bilelikdäki işimiz has netijeli boldy.”',
        full_name: 'Aýlar M.',
        profession: 'DHL kompaniýasynyň hünärmeni',
        avatar: '/images/avatar.webp'
    },
])
</script>
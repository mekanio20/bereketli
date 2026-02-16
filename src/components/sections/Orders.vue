<template>
    <section>
        <MainContainer>
            <!-- Header -->
            <div class="mb-10 animate-fade-in">
                <h1 class="section_title mb-8">
                    {{ $t('menu.orders') }}
                </h1>

                <!-- Filter Tabs -->
                <div class="flex flex-wrap gap-3">
                    <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                        class="flex items-center gap-2 px-8 py-3 border border-[#EDEDED] rounded-full transition-all duration-300 transform hover:scale-105"
                        :class="activeTab === tab.id
                            ? 'bg-[#002645] text-white font-semibold'
                            : 'bg-white text-[#222222] hover:bg-gray-50 font-medium'">
                        <component :is="icons[tab?.icon]" :size="20"
                            :color="activeTab === tab.id ? 'white' : '#002645'" />
                        <span>{{ tab.label }}</span>
                    </button>
                </div>
            </div>

            <!-- Loading -->
            <Loading v-if="orderStore.loading" />

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
                <swiper-slide v-for="order in orderStore.orders" :key="order.id">
                    <OrderCard :order="order" @click="handleOrderClick(order)" />
                </swiper-slide>
            </swiper>

            <div v-if="orderStore.orders.length > 0"
                class="flex justify-center items-center my-10 transition-all duration-700">
                <Link :to="'/order/history'" />
            </div>

            <!-- Empty State -->
            <NoData v-show="orderStore.orders.length === 0 && !orderStore.loading" :message="$t('info.no_order')" />
        </MainContainer>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n({ useScope: 'global' })

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiperRef = ref(null);
const modules = [Navigation, Pagination, Autoplay];

const { icons } = useIcons();
const router = useRouter()
const orderStore = useOrderStore()
const activeTab = ref('ALL')
const tabs = ref([
    { id: 'ALL', label: t('names.all'), icon: 'box_linear-icon' },
    { id: 'SEA', label: t('names.ship'), icon: 'mingcute_ship_line-icon' },
    { id: 'AIR', label: t('names.airplane'), icon: 'plane-icon' },
    { id: 'LAND', label: t('names.truck'), icon: 'truck_delivery-icon' },
    { id: 'RAIL', label: t('names.train'), icon: 'train_2-icon' }
])

const handleOrderClick = (order) => {
    router.push({ name: 'OrderDetail', params: { id: order.id } })
}

onMounted(async () => {
    await orderStore.fetchOrders()
})

watch(activeTab, async (newTab) => {
    await orderStore.fetchOrders({ transportation_type: newTab === 'ALL' ? '' : newTab })
})

const onSwiper = (swiper) => {
    swiperRef.value = swiper;
};
</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.6s ease-out;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
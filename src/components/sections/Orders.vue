<template>
    <section>
        <MainContainer>
            <!-- Header -->
            <div class="mb-10 animate-fade-in">
                <h1 class="section_title mb-8">
                    Sargytlar
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

            <!-- Orders Grid -->
            <TransitionGroup v-else name="card-list" tag="div"
                class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <OrderCard v-for="order in orderStore.orders" :key="order.id" :order="order"
                    @click="handleOrderClick(order)" />
            </TransitionGroup>

            <div v-if="orderStore.orders.length > 0"
                class="flex justify-center items-center my-10 transition-all duration-700">
                <router-link to="#" class="group relative flex items-center w-fit">
                    <!-- Text -->
                    <button type="button"
                        class="py-[10px] px-8 rounded-full bg-[#002645] text-white sm:text-lg text-base font-semibold">
                        Ählisini görmek
                    </button>

                    <!-- Animated Dot -->
                    <span class="absolute -z-10 right-3 p-1 rounded-full bg-[#0B2545]
                rotate-[-180deg]
                 transition-all duration-500 ease-out
                 group-hover:translate-x-14
                 group-hover:rotate-[360deg]">
                        <arrow_right-icon />
                    </span>
                </router-link>
            </div>

            <!-- Empty State -->
            <NoData v-show="orderStore.orders.length === 0 && !orderStore.loading" :message="'Sargyt tapylmady'" />
        </MainContainer>
    </section>
</template>

<script setup>
const { icons } = useIcons();
const orderStore = useOrderStore()
const activeTab = ref('ALL')
const tabs = ref([
    { id: 'ALL', label: 'Ählisi', icon: 'box_linear-icon' },
    { id: 'SEA', label: 'Gämi', icon: 'mingcute_ship_line-icon' },
    { id: 'AIR', label: 'Uçar', icon: 'plane-icon' },
    { id: 'LAND', label: 'Ulag', icon: 'truck_delivery-icon' },
    { id: 'RAIL', label: 'Otly', icon: 'train_2-icon' }
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

/* Card List Transitions */
.card-list-enter-active,
.card-list-leave-active {
    transition: all 0.4s ease;
}

.card-list-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.card-list-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

.card-list-move {
    transition: transform 0.4s ease;
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
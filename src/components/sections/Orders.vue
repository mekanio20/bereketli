<template>
    <section class="py-10">
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

            <!-- Orders Grid -->
            <TransitionGroup name="card-list" tag="div" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <OrderCard v-for="order in filteredOrders" :key="order.id" :order="order"
                    @click="handleOrderClick(order)" />
            </TransitionGroup>

            <div class="flex justify-center items-center my-10 transition-all duration-700">
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
            <Transition name="fade">
                <div v-if="filteredOrders.length === 0" class="text-center py-20">
                    <div class="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <p class="text-xl text-gray-500">Sargyt tapylmady</p>
                </div>
            </Transition>
        </MainContainer>
    </section>
</template>

<script setup>
const { icons } = useIcons();
const tabs = ref([
    { id: 'all', label: 'Ählisi', icon: 'box_linear-icon' },
    { id: 'sea', label: 'Gämi', icon: 'mingcute_ship_line-icon' },
    { id: 'air', label: 'Uçar', icon: 'plane-icon' },
    { id: 'road', label: 'Ulag', icon: 'truck_delivery-icon' },
    { id: 'rail', label: 'Otly', icon: 'train_2-icon' }
])

const activeTab = ref('sea')

// Sample orders data
const orders = ref([
    {
        id: 1,
        trackingNumber: '#RW3E-74ESW4',
        status: 'pending',
        statusLabel: 'Garasylyar',
        statusText: 'Tianjin portyna getirildi',
        fromDate: '18.08.2025',
        fromLocation: 'Tianjin porty',
        toDate: '28.08.2025',
        toLocation: 'Aşgabat',
        progress: 65,
        type: 'road'
    },
    {
        id: 2,
        trackingNumber: '#RW3E-74ESW4',
        status: 'pending',
        statusLabel: 'Garasylyar',
        statusText: 'Tianjin portyna getirildi',
        fromDate: '18.08.2025',
        fromLocation: 'Tianjin porty',
        toDate: '28.08.2025',
        toLocation: 'Aşgabat',
        progress: 25,
        type: 'sea'
    },
    {
        id: 3,
        trackingNumber: '#RW3E-74ESW4',
        status: 'pending',
        statusLabel: 'Garasylyar',
        statusText: 'Tianjin portyna getirildi',
        fromDate: '18.08.2025',
        fromLocation: 'Tianjin porty',
        toDate: '28.08.2025',
        toLocation: 'Aşgabat',
        progress: 65,
        type: 'air'
    },
    {
        id: 4,
        trackingNumber: '#RW3E-74ESW4',
        status: 'pending',
        statusLabel: 'Garasylyar',
        statusText: 'Tianjin portyna getirildi',
        fromDate: '18.08.2025',
        fromLocation: 'Tianjin porty',
        toDate: '28.08.2025',
        toLocation: 'Aşgabat',
        progress: 65,
        type: 'air'
    },
    {
        id: 5,
        trackingNumber: '#RW3E-74ESW4',
        status: 'accepted',
        statusLabel: 'Kabul edildi',
        statusText: 'Tianjin portyna getirildi',
        fromDate: '18.08.2025',
        fromLocation: 'Tianjin porty',
        toDate: '28.08.2025',
        toLocation: 'Aşgabat',
        progress: 65,
        type: 'rail'
    }
])

const filteredOrders = computed(() => {
    if (activeTab.value === 'all') return orders.value
    return orders.value.filter(order => order.type === activeTab.value)
})

const handleOrderClick = (order) => {
    console.log('Order clicked:', order)
    // Navigate to order details or open modal
}
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
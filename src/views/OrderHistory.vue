<template>
    <section class="overflow-x-hidden relative">
        <!-- Absolute -->
        <div class="absolute -z-10 w-full h-full bg-[#F3F8FF]">
            <img :src="background" class="w-full h-full object-contain" />
        </div>
        <MainContainer>
            <SectionContainer>
                <!-- Breadcrumb -->
                <bread-crumb class="mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: 'Sargytlar' }
                ]" />

                <!-- Header -->
                <div class="mb-10 animate-slide-down">
                    <h1 class="section_title mb-8">
                        Sargytlar
                    </h1>
                </div>

                <!-- Tab Buttons -->
                <div class="w-fit flex gap-0 p-[7px] mb-14 animate-slide-up bg-[#002645] rounded-2xl"
                    style="animation-delay: 0.1s">
                    <button @click="activeTab = 'pending'"
                        class="py-[9px] px-10 mr-2 font-semibold transition-all duration-300 rounded-xl"
                        :class="activeTab === 'pending' ? 'bg-white text-[#002645] z-10' : 'bg-[#002645] text-white'">
                        Garaşylýanlar
                    </button>
                    <button @click="activeTab = 'accepted'"
                        class="py-[9px] px-10 font-semibold transition-all duration-300 rounded-xl -ml-px"
                        :class="activeTab === 'accepted' ? 'bg-white text-[#002645] z-10' : 'bg-[#002645] text-white'">
                        Tamamlananlar
                    </button>
                </div>

                <!-- Warehouses Grid -->
                <TransitionGroup name="card-list" tag="div"
                    class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <OrderCard v-for="order in filteredOrders" :key="order.id" :order="order"
                        @click="handleOrderClick(order)" />
                </TransitionGroup>

                <!-- Empty State -->
                <Transition name="fade">
                    <NoData v-if="filteredOrders.length === 0" :message="'Sargyt tapylmady'" />
                </Transition>
            </SectionContainer>
        </MainContainer>
        <!-- Modal -->
        <WareHouseModal :isOpen="showModal" :warehouse="selectedWarehouse" @close="showModal = false" />
    </section>
</template>

<script setup>
import background from '@/assets/images/background.webp'
const activeTab = ref('pending')
const selectedWarehouse = ref({})
const showModal = ref(false)

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

const handleOrderClick = (order) => {
    console.log('Order clicked:', order)
    // Navigate to order details or open modal
}

const filteredOrders = computed(() => {
    if (activeTab.value === 'all') return orders.value
    return orders.value.filter(order => order.status === activeTab.value)
})
</script>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.6s ease-out;
}

.animate-slide-down {
    animation: slideDown 0.6s ease-out;
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
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
                    <button @click="activeTab = 'delivered'"
                        class="py-[9px] px-10 font-semibold transition-all duration-300 rounded-xl -ml-px"
                        :class="activeTab === 'delivered' ? 'bg-white text-[#002645] z-10' : 'bg-[#002645] text-white'">
                        Tamamlananlar
                    </button>
                </div>

                <!-- Loader -->
                <Loading v-if="orderStore.loading" />

                <!-- Warehouses Grid -->
                <TransitionGrou v-else name="card-list" tag="div"
                    class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <OrderCard v-for="order in filteredOrders" :key="order.id" :order="order"
                        @click="handleOrderClick(order)" />
                </TransitionGrou>

                <!-- Empty State -->
                <NoData v-show="filteredOrders.length === 0 && !orderStore.loading" :message="'Sargyt tapylmady'" />
            </SectionContainer>
        </MainContainer>
        <!-- Modal -->
        <WareHouseModal :isOpen="showModal" :warehouse="selectedWarehouse" @close="showModal = false" />
    </section>
</template>

<script setup>
import background from '@/assets/images/background.webp'
const router = useRouter()
const orderStore = useOrderStore()
const activeTab = ref('pending')
const selectedWarehouse = ref({})
const showModal = ref(false)

const handleOrderClick = (order) => {
    router.push({ name: 'OrderDetail', params: { id: order.id } })
}

onMounted(async () => {
    await orderStore.fetchOrders()
})

const filteredOrders = computed(() => {
    return orderStore.orders.filter(order => {
        if (activeTab.value === 'pending') {
            return order.status === 'PENDING' || order.status === 'IN_TRANSIT' || order.status === 'CUSTOMS'
        } else if (activeTab.value === 'delivered') {
            return order.status === 'DELIVERED' || order.status === 'CANCELLED'
        }
        return true
    })
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
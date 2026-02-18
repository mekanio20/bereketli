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
                    { label: $t('menu.about_us'), to: '/about' },
                    { label: $t('menu.warehouses') }
                ]" />

                <!-- Header -->
                <div class="mb-10 animate-slide-down">
                    <h1 class="section_title mb-8">
                        {{ $t('menu.warehouses') }}
                    </h1>

                    <!-- Search Bar -->
                    <div class="relative max-w-2xl">
                        <input v-model="searchQuery" type="text" :placeholder="$t('descriptions.request_search')"
                            class="w-full pl-6 pr-14 py-[14px] bg-white border border-[#F5F5F5] rounded-2xl transition-all duration-300 text-[#222222] placeholder-[#838589] outline-none hover:shadow" />
                        <button
                            class="absolute right-2 top-1/2 -translate-y-1/2 w-[45px] h-[45px] bg-custom-gradient rounded-xl flex items-center justify-center hover:shadow-md transform hover:scale-105 transition-all duration-300">
                            <search-icon :size="20" color="white" />
                        </button>
                    </div>
                </div>

                <!-- Warehouses Grid -->
                <TransitionGroup name="card-list" tag="div"
                    class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <WarehouseCard v-for="warehouse in warehouses" :key="warehouse.id" :warehouse="warehouse"
                        @click="handleWarehouseClick(warehouse)" />
                </TransitionGroup>

                <Loading v-if="warehouseStore.loading" />

                <!-- Empty State -->
                <Transition name="fade">
                    <div v-if="warehouses.length === 0 && !warehouseStore.loading" class="text-center py-20">
                        <div class="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                            <search-icon :size="40" />
                        </div>
                        <p class="text-xl text-[#222222]">Ammar tapylmady</p>
                        <p class="text-sm text-[#838589] mt-2">Başga söz bilen gözläp görüň</p>
                    </div>
                </Transition>
            </SectionContainer>
        </MainContainer>
        <!-- Modal -->
        <WareHouseModal :isOpen="showModal" :warehouse="selectedWarehouse" @close="showModal = false" />
    </section>
</template>

<script setup>
import background from '@/assets/images/background.webp'
import { debounce } from '@/utils/debounce'

const warehouseStore = useWarehouseStore()

const showModal = ref(false)
const searchQuery = ref('')
const selectedWarehouse = ref({})
const warehouses = computed(() => warehouseStore.warehouses)

const performSearch = async () => {
  await warehouseStore.fetchWarehouses({
    search: searchQuery.value || undefined
  })
}

const handleWarehouseClick = (warehouse) => {
  selectedWarehouse.value = warehouse
  showModal.value = true
}

watch(
  searchQuery,
  debounce(() => {
    performSearch()
  }, 400)
)

onMounted(async () => {
    await warehouseStore.fetchWarehouses()
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
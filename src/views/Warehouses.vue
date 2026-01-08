<template>
    <section class="overflow-hidden relative">
        <!-- Absolute -->
        <div class="absolute -z-10 w-full h-full bg-[#F3F8FF]">
            <img :src="background" class="w-full h-full object-cover" />
        </div>
        <MainContainer>
            <SectionContainer>
                <!-- Breadcrumb -->
                <bread-crumb class="mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: 'Biz barada', to: '#' },
                    { label: 'Ammarlar' }
                ]" />
    
                <!-- Header -->
                <div class="mb-10 animate-slide-down">
                    <h1 class="section_title mb-8">
                        Ammarlar
                    </h1>
    
                    <!-- Search Bar -->
                    <div class="relative max-w-2xl">
                        <input v-model="searchQuery" type="text" placeholder="Şäher, döwlet, köçe ady boýunça gözläň..."
                            class="w-full pl-6 pr-14 py-[14px] bg-white border border-[#F5F5F5] rounded-2xl transition-all duration-300 text-[#222222] placeholder-[#4D4D4D] outline-none hover:shadow" />
                        <button
                            class="absolute right-2 top-1/2 -translate-y-1/2 w-[45px] h-[45px] bg-custom-gradient rounded-xl flex items-center justify-center hover:shadow-md transform hover:scale-105 transition-all duration-300">
                            <search-icon :size="20" color="white" />
                        </button>
                    </div>
                </div>
    
                <!-- Warehouses Grid -->
                <TransitionGroup name="card-list" tag="div" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <WarehouseCard v-for="warehouse in filteredWarehouses" :key="warehouse.id" :warehouse="warehouse"
                        @click="handleWarehouseClick(warehouse)" />
                </TransitionGroup>
    
                <!-- Empty State -->
                <Transition name="fade">
                    <div v-if="filteredWarehouses.length === 0" class="text-center py-20">
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
         <Teleport to="body">
            <WareHouseModal :isOpen="showModal" :warehouse="selectedWarehouse" @close="showModal = false"/>
        </Teleport>
    </section>
</template>

<script setup>
import background from '@/assets/images/background.webp'
const selectedWarehouse = ref({})
const showModal = ref(false)
const searchQuery = ref('')
// Sample warehouses data
const warehouses = ref([
    {
        id: 1,
        name: 'Aşgabat',
        status: 'open',
        statusLabel: 'Açyk',
        city: 'Salgy',
        address: 'Parahat(Mir) 2/1, 23',
        workingDays: 'Du-Şen',
        workingHours: '10:00 - 20:00',
        isAvailable: true
    },
    {
        id: 2,
        name: 'Aşgabat',
        status: 'open',
        statusLabel: 'Açyk',
        city: 'Salgy',
        address: 'Parahat(Mir) 2/1, 23',
        workingDays: 'Du-Şen',
        workingHours: '10:00 - 20:00',
        isAvailable: true
    },
    {
        id: 3,
        name: 'Aşgabat',
        status: 'closed',
        statusLabel: 'Ýapyk',
        city: 'Salgy',
        address: 'Parahat(Mir) 2/1, 23',
        workingDays: 'Du-Şen',
        workingHours: '10:00 - 20:00',
        isAvailable: false
    },
    {
        id: 4,
        name: 'Aşgabat',
        status: 'open',
        statusLabel: 'Açyk',
        city: 'Salgy',
        address: 'Parahat(Mir) 2/1, 23',
        workingDays: 'Du-Şen',
        workingHours: '10:00 - 20:00',
        isAvailable: true
    },
    {
        id: 5,
        name: 'Aşgabat',
        status: 'open',
        statusLabel: 'Açyk',
        city: 'Salgy',
        address: 'Parahat(Mir) 2/1, 23',
        workingDays: 'Du-Şen',
        workingHours: '10:00 - 20:00',
        isAvailable: true
    },
    {
        id: 6,
        name: 'Aşgabat',
        status: 'closed',
        statusLabel: 'Ýapyk',
        city: 'Salgy',
        address: 'Parahat(Mir) 2/1, 23',
        workingDays: 'Du-Şen',
        workingHours: '10:00 - 20:00',
        isAvailable: false
    },
    {
        id: 7,
        name: 'Aşgabat',
        status: 'closed',
        statusLabel: 'Ýapyk',
        city: 'Salgy',
        address: 'Parahat(Mir) 2/1, 23',
        workingDays: 'Du-Şen',
        workingHours: '10:00 - 20:00',
        isAvailable: false
    },
    {
        id: 8,
        name: 'Aşgabat',
        status: 'open',
        statusLabel: 'Açyk',
        city: 'Salgy',
        address: 'Parahat(Mir) 2/1, 23',
        workingDays: 'Du-Şen',
        workingHours: '10:00 - 20:00',
        isAvailable: true
    },
    {
        id: 9,
        name: 'Aşgabat',
        status: 'open',
        statusLabel: 'Açyk',
        city: 'Salgy',
        address: 'Parahat(Mir) 2/1, 23',
        workingDays: 'Du-Şen',
        workingHours: '10:00 - 20:00',
        isAvailable: true
    }
])

const filteredWarehouses = computed(() => {
    if (!searchQuery.value) return warehouses.value

    const query = searchQuery.value.toLowerCase()
    return warehouses.value.filter(warehouse =>
        warehouse.name.toLowerCase().includes(query) ||
        warehouse.city.toLowerCase().includes(query) ||
        warehouse.address.toLowerCase().includes(query)
    )
})

const handleWarehouseClick = (warehouse) => {
    selectedWarehouse.value = warehouse
    showModal.value = true
}
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
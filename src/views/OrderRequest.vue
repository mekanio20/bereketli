<template>
    <section class="overflow-x-hidden relative">
        <!-- Absolute -->
        <div class="absolute -z-10 w-full h-full bg-[#F3F8FF]">
            <img :src="background" class="w-full h-full object-cover" />
        </div>
        <MainContainer>
            <SectionContainer class="pb-20">
                <!-- Breadcrumb -->
                <bread-crumb class="mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: 'Order Requests' }
                ]" />

                <!-- Title -->
                <div class="mb-10">
                    <h1 class="section_title mb-8">
                        Order Requests
                    </h1>
                    <!-- Search Bar -->
                    <div class="relative max-w-2xl">
                        <input v-model="searchQuery" type="text" placeholder="Şäher, döwlet, köçe ady boýunça gözläň..."
                            class="w-full pl-6 pr-14 py-[14px] bg-white border border-[#F5F5F5] rounded-2xl transition-all duration-300 text-[#222222] placeholder-[#838589] outline-none hover:shadow" />
                        <button
                            class="absolute right-2 top-1/2 -translate-y-1/2 w-[45px] h-[45px] bg-custom-gradient rounded-xl flex items-center justify-center hover:shadow-md transform hover:scale-105 transition-all duration-300">
                            <search-icon :size="20" color="white" />
                        </button>
                    </div>
                </div>

                <!-- Cards -->
                <TransitionGroup name="card-list" tag="div"
                    class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <RequestCard v-for="item in filteredData" :key="item.id" :order="item"
                        @click="handleDetail(item.id)" />
                </TransitionGroup>

                <!-- Empty State -->
                <Transition name="fade">
                    <div v-if="filteredData.length === 0" class="text-center py-20">
                        <div class="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                            <search-icon :size="40" />
                        </div>
                        <p class="text-xl text-[#222222]">Tapylmady</p>
                        <p class="text-sm text-[#838589] mt-2">Başga söz bilen gözläp görüň</p>
                    </div>
                </Transition>
            </SectionContainer>
        </MainContainer>
    </section>
</template>

<script setup>
import background from '@/assets/images/background.webp'
const searchQuery = ref('')
const dataOptions = ref([
    {
        id: 1,
        fromDate: '18.08.2025',
        fromLocation: 'Tianjin porty',
        toDate: '28.08.2025',
        toLocation: 'Aşgabat',
        status: 'pending',
        createdAt: '18.08.2025',
        statusText: 'Kabul edilmegine garaşylýar'
    },
    {
        id: 2,
        fromDate: '18.08.2025',
        fromLocation: 'Tianjin porty',
        toDate: '28.08.2025',
        toLocation: 'Aşgabat',
        status: 'pending',
        createdAt: '18.08.2025',
        statusText: 'Kabul edilmegine garaşylýar'
    },
])
const filteredData = computed(() => {
    if (!searchQuery.value) return dataOptions.value

    const query = searchQuery.value.toLowerCase()
    return dataOptions.value.filter(item =>
        item.fromLocation.toLowerCase().includes(query) ||
        item.toLocation.toLowerCase().includes(query)
    )
})
</script>
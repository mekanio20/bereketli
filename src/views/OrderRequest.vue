<template>
    <section class="overflow-hidden relative bg-[#F3F8FF]">
        <MainContainer>
            <SectionContainer class="pb-20">
                 <!-- Breadcrumb -->
                <bread-crumb class="mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: 'Order Requests', to: '#' },
                    { label: 'Request New Order' }
                ]" />
                
                <!-- Header -->
                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8 animate-fade-in">
                    Simple Order
                </h1>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Left Column -->
                    <div class="space-y-6">
                        <!-- Delivery Section -->
                        <div class="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style="animation-delay: 0.1s">
                            <h2 class="text-xl font-bold text-gray-900 mb-6">Eltip bermek</h2>

                            <div class="grid grid-cols-2 gap-4 mb-4">
                                <!-- From Location -->
                                <div>
                                    <label class="block text-sm text-gray-600 mb-2">Nirden</label>
                                    <div class="relative">
                                        <select v-model="formData.fromLocation"
                                            class="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-orange-400 focus:bg-white focus:outline-none transition-all duration-300 appearance-none cursor-pointer pr-10">
                                            <option value="Şanhaý">Şanhaý</option>
                                            <option value="Beijing">Beijing</option>
                                            <option value="Guangzhou">Guangzhou</option>
                                        </select>
                                        <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                        <div class="absolute left-4 top-1/2 -translate-y-1/2">
                                            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <!-- To Location -->
                                <div>
                                    <label class="block text-sm text-gray-600 mb-2">Nirä</label>
                                    <div class="relative">
                                        <select v-model="formData.toLocation"
                                            class="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-orange-400 focus:bg-white focus:outline-none transition-all duration-300 appearance-none cursor-pointer pr-10">
                                            <option value="Aşgabat">Aşgabat</option>
                                            <option value="Mary">Mary</option>
                                            <option value="Türkmenabat">Türkmenabat</option>
                                        </select>
                                        <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                        <div class="absolute left-4 top-1/2 -translate-y-1/2">
                                            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Swap Button -->
                            <div class="flex justify-center -mt-2 mb-4">
                                <button @click="swapLocations"
                                    class="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center hover:shadow-lg transform hover:rotate-180 transition-all duration-300">
                                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Information Section -->
                        <div class="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style="animation-delay: 0.2s">
                            <h2 class="text-xl font-bold text-gray-900 mb-6">Maglumatlar</h2>

                            <textarea v-model="formData.description" placeholder="Write description..." rows="4"
                                class="w-full px-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-orange-400 focus:bg-white focus:outline-none transition-all duration-300 resize-none"></textarea>
                        </div>

                        <!-- Cargo Type Section -->
                        <div class="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style="animation-delay: 0.3s">
                            <h2 class="text-xl font-bold text-gray-900 mb-6">Ýüküň görnüşi</h2>

                            <div class="flex flex-wrap gap-3">
                                <button v-for="type in cargoTypes" :key="type" @click="toggleCargoType(type)"
                                    class="px-5 py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                                    :class="formData.selectedCargoTypes.includes(type)
                                        ? 'bg-[#002244] text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
                                    {{ type }}
                                </button>
                            </div>
                        </div>

                        <!-- Transport Type Section -->
                        <div class="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style="animation-delay: 0.4s">
                            <h2 class="text-xl font-bold text-gray-900 mb-6">Eltip bermek görnüşi</h2>

                            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <button v-for="transport in transportTypes" :key="transport.id"
                                    @click="formData.selectedTransport = transport.id"
                                    class="flex flex-col items-center gap-2 px-4 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                                    :class="formData.selectedTransport === transport.id
                                        ? 'bg-[#002244] text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'">
                                    <component :is="icons[transport.icon]" :size="24" :color="formData.selectedTransport === transport.id ? 'white' : '#002645'" />
                                    <span class="text-sm">{{ transport.label }}</span>
                                </button>
                            </div>
                        </div>

                        <!-- Items Section -->
                        <div class="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style="animation-delay: 0.5s">
                            <h2 class="text-xl font-bold text-gray-900 mb-6">Items</h2>

                            <div class="space-y-3 mb-4">
                                <div v-for="(item, index) in formData.items" :key="index"
                                    class="flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer group"
                                    @click="editItem(index)">
                                    <div>
                                        <p class="font-semibold text-gray-900">{{ item.name }}</p>
                                        <p class="text-sm text-gray-500">{{ item.dimensions }}</p>
                                    </div>
                                    <svg class="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            <button @click="addItem"
                                class="w-full py-3 bg-blue-50 text-[#002244] font-semibold rounded-xl hover:bg-blue-100 transition-all duration-300 flex items-center justify-center gap-2">
                                <div class="w-6 h-6 bg-[#002244] rounded-full flex items-center justify-center">
                                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4v16m8-8H4" />
                                    </svg>
                                </div>
                                Add Item
                            </button>
                        </div>
                    </div>

                    <!-- Right Column -->
                    <div class="space-y-6">
                        <!-- Date Section -->
                        <div class="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style="animation-delay: 0.1s">
                            <h2 class="text-xl font-bold text-gray-900 mb-6">Eltip bermek möhleti</h2>

                            <div class="space-y-4">
                                <!-- Pickup Date -->
                                <div>
                                    <label class="block text-sm text-gray-600 mb-2">Requested pickup date</label>
                                    <div class="relative">
                                        <input v-model="formData.pickupDate" type="date"
                                            class="w-full px-4 py-3 bg-blue-50 border-2 border-transparent rounded-xl focus:border-orange-400 focus:bg-white focus:outline-none transition-all duration-300" />
                                        <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>

                                <!-- Delivery Date -->
                                <div>
                                    <label class="block text-sm text-gray-600 mb-2">Requested delivery date</label>
                                    <div class="relative">
                                        <input v-model="formData.deliveryDate" type="date"
                                            class="w-full px-4 py-3 bg-blue-50 border-2 border-transparent rounded-xl focus:border-orange-400 focus:bg-white focus:outline-none transition-all duration-300" />
                                        <svg class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <button @click="submitOrder"
                                class="w-full mt-6 py-4 bg-gradient-to-r from-[#002244] to-[#003366] text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300">
                                Tassyklamak
                            </button>
                        </div>
                    </div>
                </div>  
            </SectionContainer>
        </MainContainer>
    </section>
</template>

<script setup>
const { icons } = useIcons()
const cargoTypes = ref([
    'Elektronika',
    'Kosmetologiýa',
    'Derman',
    'Med tehnika',
    'Mebel',
    'Öý goslary',
    'Eşik',
    'Başgalar'
])

const transportTypes = ref([
    { id: 'sea', label: 'Gämi', icon: 'mingcute_ship_line-icon' },
    { id: 'air', label: 'Uçar', icon: 'plane-icon' },
    { id: 'road', label: 'Ulag', icon: 'truck-icon' },
    { id: 'rail', label: 'Otly', icon: 'train-icon' }
])

const formData = reactive({
    fromLocation: 'Şanhaý',
    toLocation: 'Aşgabat',
    description: '',
    selectedCargoTypes: [],
    selectedTransport: 'sea',
    pickupDate: '2005-12-14',
    deliveryDate: '2005-01-25',
    items: [
        { name: 'Item #1', dimensions: '34 × 27 × 2 cm' }
    ]
})

const swapLocations = () => {
    const temp = formData.fromLocation
    formData.fromLocation = formData.toLocation
    formData.toLocation = temp
}

const toggleCargoType = (type) => {
    const index = formData.selectedCargoTypes.indexOf(type)
    if (index > -1) {
        formData.selectedCargoTypes.splice(index, 1)
    } else {
        formData.selectedCargoTypes.push(type)
    }
}

const addItem = () => {
    const itemNumber = formData.items.length + 1
    formData.items.push({
        name: `Item #${itemNumber}`,
        dimensions: '34 × 27 × 2 cm'
    })
}

const editItem = (index) => {
    console.log('Edit item:', index)
    // Open item edit modal
}

const submitOrder = () => {
    console.log('Submit order:', formData)
    // Submit order logic
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

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.6s ease-out;
}

.animate-slide-up {
    animation: slideUp 0.6s ease-out;
    opacity: 0;
    animation-fill-mode: forwards;
}

/* Custom date input styling */
input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
}
</style>
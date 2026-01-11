<template>
    <section class="overflow-x-hidden relative">
        <!-- Absolute -->
        <div class="absolute -z-10 w-full h-full bg-[#F3F8FF]">
            <img :src="background" class="w-full h-full object-contain" />
        </div>
        <MainContainer>
            <SectionContainer class="pb-20">
                <!-- Breadcrumb -->
                <bread-crumb class="mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: 'Order Requests', to: '#' },
                    { label: 'Request New Order' }
                ]" />

                <!-- Title -->
                <h1 class="section_title mb-10">
                    Simple Order
                </h1>

                <div class="flex items-start space-x-6">
                    <!-- Left Column -->
                    <div class="flex-1 space-y-6">
                        <!-- Delivery Section -->
                        <FormContainer>
                            <h2 class="form_title mb-8">Eltip bermek</h2>
                            <div class="flex items-end space-x-6 mb-4">
                                <!-- From Location -->
                                <div class="flex-1">
                                    <SimpleSelect v-model="formData.fromLocation"
                                        :options="['Aşgabat', 'Mary', 'Türkmenabat']" placeholder="Nirden"
                                        :isSearch="true" :icon="'map_pin-icon'" />
                                </div>
                                <!-- Swap Button -->
                                <div class="flex-shrink-0">
                                    <button @click="swapLocations"
                                        class="w-[50px] h-[50px] bg-custom-gradient rounded-full -space-x-1 flex items-center justify-center transform hover:rotate-180 transition-all duration-300">
                                        <arrow_group-icon />
                                    </button>
                                </div>
                                <!-- To Location -->
                                <div class="flex-1">
                                    <SimpleSelect v-model="formData.toLocation"
                                        :options="['Aşgabat', 'Mary', 'Türkmenabat']" placeholder="Nirä"
                                        :isSearch="true" :icon="'map_pin-icon'" />
                                </div>
                            </div>
                        </FormContainer>

                        <!-- Information Section -->
                        <FormContainer>
                            <h2 class="form_title mb-8">Maglumatlar</h2>
                            <textarea v-model="formData.description" placeholder="Write description..." rows="2"
                                class="bg-[#EBF3FD] w-full px-[30px] py-[20px] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"></textarea>
                        </FormContainer>

                        <!-- Cargo Type Section -->
                        <FormContainer>
                            <h2 class="form_title mb-8">Ýüküň görnüşi</h2>
                            <div class="flex flex-wrap gap-3">
                                <button v-for="type in cargoTypes" :key="type" @click="toggleCargoType(type)"
                                    class="px-6 py-2.5 rounded-[14px] transition-all duration-300 transform hover:scale-105"
                                    :class="formData.selectedCargoTypes.includes(type)
                                        ? 'bg-[#002244] font-bold text-white shadow-lg'
                                        : 'bg-[#EBF3FD] text-[#222222] font-medium hover:bg-[#ddebfd]'">
                                    {{ type }}
                                </button>
                            </div>
                        </FormContainer>

                        <!-- Transport Type Section -->
                        <FormContainer>
                            <h2 class="form_title mb-8">Eltip bermek görnüşi</h2>
                            <div class="flex items-center gap-2 flex-wrap">
                                <button v-for="transport in transportTypes" :key="transport.id"
                                    @click="formData.selectedTransport = transport.id"
                                    class="flex items-center justify-center space-x-1 px-10 py-[13px] gap-2 rounded-[14px] transition-all duration-300 transform hover:scale-105"
                                    :class="formData.selectedTransport === transport.id
                                        ? 'bg-[#002244] font-bold text-white shadow-lg'
                                        : 'bg-[#EBF3FD] text-[#222222] font-medium  hover:bg-[#ddebfd]'">
                                    <component :is="icons[transport.icon]" :size="24"
                                        :color="formData.selectedTransport === transport.id ? 'white' : '#222222'" />
                                    <span class="text-sm">{{ transport.label }}</span>
                                </button>
                            </div>
                        </FormContainer>

                        <!-- Items Section -->
                        <FormContainer>
                            <h2 class="form_title mb-8">Items</h2>
                            <div class="space-y-3 mb-4">
                                <div v-for="(item, index) in formData.items" :key="index"
                                    class="flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer group"
                                    @click="editItem(index)">
                                    <div>
                                        <p class="font-semibold text-gray-900">{{ item.name }}</p>
                                        <p class="text-sm text-[#EBF3FD]0">{{ item.dimensions }}</p>
                                    </div>
                                    <svg class="w-5 h-5 text-gray-400 group-hover:text-[#939393] transition-colors"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>

                            <button @click="showModal = true"
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
                        </FormContainer>
                    </div>

                    <!-- Right Column -->
                    <div class="w-[35%] space-y-6">
                        <!-- Date Section -->
                        <FormContainer>
                            <h2 class="text-xl font-bold text-gray-900 mb-8">Eltip bermek möhleti</h2>

                            <div class="space-y-6">
                                <!-- Pickup Date -->
                                <div>
                                    <label class="block text-sm text-[#939393] mb-2">Requested delivery date</label>
                                    <VueDatePicker v-model="formData.pickupDate" :enable-time-picker="false"
                                        placeholder="Sene saýlaň">
                                    </VueDatePicker>
                                </div>

                                <!-- Delivery Date -->
                                <div>
                                    <label class="block text-sm text-[#939393] mb-2">Requested delivery date</label>
                                    <VueDatePicker v-model="formData.deliveryDate" :enable-time-picker="false"
                                        placeholder="Sene saýlaň" />
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <button @click="submitOrder"
                                class="w-full mt-[70px] py-4 bg-[#002645] text-white font-semibold rounded-full transform hover:scale-[1.02] transition-all duration-300">
                                Tassyklamak
                            </button>
                        </FormContainer>
                    </div>
                </div>
            </SectionContainer>
        </MainContainer>
        <!-- Modals -->
        <AddItemModal :is-open="showModal" @close="showModal = false" @submit="handleItemSubmit" />
    </section>
</template>

<script setup>
import background from '@/assets/images/background.webp'
const { icons } = useIcons()
const showModal = ref(false)
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
    { id: 'road', label: 'Ulag', icon: 'truck_delivery-icon' },
    { id: 'rail', label: 'Otly', icon: 'train_2-icon' }
])

const formData = reactive({
    fromLocation: '',
    toLocation: '',
    description: '',
    selectedCargoTypes: [],
    selectedTransport: '',
    pickupDate: '',
    deliveryDate: '',
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

const handleItemSubmit = (data) => {
    console.log('Item submitted:', data)
    submittedData.value = data
}

const editItem = (index) => {
    console.log('Edit item:', index)
}

const submitOrder = () => {
    console.log('Submit order:', formData)
}
</script>

<style scoped>
:deep(.dp__input) {
    border: none;
    border-radius: 14px;
    padding-top: 13px;
    padding-bottom: 13px;
    background-color: #EBF3FD;
}
</style>
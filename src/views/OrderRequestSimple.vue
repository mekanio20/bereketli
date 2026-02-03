<template>
    <section class="relative">
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
                                    <SimpleSelect v-model="formData.from_country"
                                        :options="nirdenOptions" @change="selectedCountry('nirden', $event)" placeholder="Nirden"
                                        :isSearch="true" :icon="'map_pin-icon'" />
                                </div>
                                <!-- Swap Button -->
                                <div class="flex-shrink-0">
                                    <button @click="swapLocations"
                                        class="w-[50px] h-[50px] bg-custom-gradient rounded-full -space-x-1 flex items-center justify-center transform transition-all duration-300"
                                        :class="[isSwap ? 'rotate-180' : '']">
                                        <arrow_group-icon class="rotate-[90deg]" />
                                    </button>
                                </div>
                                <!-- To Location -->
                                <div class="flex-1">
                                    <SimpleSelect v-model="formData.to_country"
                                        :options="niraOptions" @change="selectedCountry('nira', $event)" placeholder="Nirä"
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

                        <!-- Categories Section -->
                        <FormContainer>
                            <h2 class="form_title mb-8">Ýüküň görnüşi</h2>
                            <div class="flex flex-wrap gap-3">
                                <button v-for="(item, index) in itemCategoryStore.item_categories" :key="index" @click="toggleCargoType(item.id)"
                                    class="px-6 py-2.5 rounded-[14px] transition-all duration-300 transform hover:scale-105"
                                    :class="formData.categories.includes(item.id)
                                        ? 'bg-[#002244] font-bold text-white shadow-lg'
                                        : 'bg-[#EBF3FD] text-[#222222] font-medium hover:bg-[#ddebfd]'">
                                    {{ item.name }}
                                </button>
                            </div>
                        </FormContainer>

                        <!-- Transport Type Section -->
                        <FormContainer>
                            <h2 class="form_title mb-8">Eltip bermek görnüşi</h2>
                            <div class="flex items-center gap-2 flex-wrap">
                                <button v-for="transport in transportTypes" :key="transport.id"
                                    @click="formData.transportation_type = transport.id"
                                    class="flex items-center justify-center space-x-1 px-10 py-[13px] gap-2 rounded-[14px] transition-all duration-300 transform hover:scale-105"
                                    :class="formData.transportation_type === transport.id
                                        ? 'bg-[#002244] font-bold text-white shadow-lg'
                                        : 'bg-[#EBF3FD] text-[#222222] font-medium  hover:bg-[#ddebfd]'">
                                    <component :is="icons[transport.icon]" :size="24"
                                        :color="formData.transportation_type === transport.id ? 'white' : '#222222'" />
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
                                        <p class="font-semibold text-gray-900">{{ `${item.name} #${item.id}` }}</p>
                                        <p class="text-sm text-[#EBF3FD]0">{{ formattedMeasurement(item) }}</p>
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
                    <div class="w-[35%] space-y-6 self-start sticky top-32">
                        <!-- Date Section -->
                        <FormContainer>
                            <h2 class="text-xl font-bold text-gray-900 mb-8">Eltip bermek möhleti</h2>

                            <div class="space-y-6">
                                <!-- Pickup Date -->
                                <div>
                                    <label class="block text-sm text-[#939393] mb-2">Ugradylmaly senesi</label>
                                    <VueDatePicker v-model="formData.date_shipment_expected" :enable-time-picker="false"
                                        placeholder="Sene saýlaň">
                                    </VueDatePicker>
                                </div>

                                <!-- Delivery Date -->
                                <div>
                                    <label class="block text-sm text-[#939393] mb-2">Barmaly senesi</label>
                                    <VueDatePicker v-model="formData.date_arrival_expected" :enable-time-picker="false"
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
        <AddItemModal :is-open="showModal" :approximate="approximate" @close="showModal = false" @submit="handleItemSubmit" />
    </section>
</template>

<script setup>
import { normalizeToIdLabel } from '@/utils/normalizers'
import { formattedMeasurement } from '@/utils/strings'
import background from '@/assets/images/background.webp'

const { icons } = useIcons()
const countryStore = useCountryStore()
const itemSizeStore = useItemSizeStore()
const itemCategoryStore = useItemCategoryStore()
const orderRequestStore = useOrderRequestStore()

const nirdenOptions = ref([])
const niraOptions = ref([])
const approximate = ref([])

const isSwap = ref(false)
const showModal = ref(false)

const transportTypes = ref([
    { id: 'SEA', label: 'Gämi', icon: 'mingcute_ship_line-icon' },
    { id: 'AIR', label: 'Uçar', icon: 'plane-icon' },
    { id: 'LAND', label: 'Ulag', icon: 'truck_delivery-icon' },
    { id: 'RAIL', label: 'Otly', icon: 'train_2-icon' }
])

const formData = reactive({
    from_country: null,
    to_country: null,
    description: '',
    categories: [],
    transportation_type: '',
    date_shipment_expected: '',
    date_arrival_expected: '',
    items: []
})

const swapLocations = () => {
    isSwap.value = !isSwap.value
    const temp = formData.from_country
    formData.from_country = formData.to_country
    formData.to_country = temp
}

const toggleCargoType = (id) => {
    const index = formData.categories.indexOf(id)
    if (index > -1) {
        formData.categories.splice(index, 1)
    } else {
        formData.categories.push(id)
    }
}

const handleItemSubmit = (array) => {
    if (array.tab === "approximate") {
        array.data.forEach(item => {
            formData.items.push(item)
        })
    } else {
        
    }
}

const editItem = (index) => {
    
}

const submitOrder = async () => {
    console.log('Form data -> ', formData);
    await orderRequestStore.createOrderRequest(formData)
}



const selectedCountry = async (type, data) => {
    if (type === 'nirden') {
        const countries = await countryStore.fetchCountries({ from_country: data.id })
        niraOptions.value = normalizeToIdLabel(countries)
    } else if (type === 'nira') {
        const countries = await countryStore.fetchCountries({ to_country: data.id })
        nirdenOptions.value = normalizeToIdLabel(countries)
    }
}

onMounted(async () => {
    const itemSizes = await itemSizeStore.fetchItemSizes()
    const countries = await countryStore.fetchCountries()
    await itemCategoryStore.fetchItemCategories()
    nirdenOptions.value = normalizeToIdLabel(countries)
    niraOptions.value = normalizeToIdLabel(countries)
    approximate.value = itemSizes
})
</script>

<style scoped>
/* Date picker */
:deep(.dp__input) {
    border: none;
    border-radius: 14px;
    padding-top: 13px;
    padding-bottom: 13px;
    background-color: #ebf3fd;
}
</style>
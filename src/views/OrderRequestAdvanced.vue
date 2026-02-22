<template>
    <section class="relative">
        <!-- Absolute -->
        <div class="absolute -z-10 w-full h-full bg-[#F3F8FF]">
            <img :src="background" class="w-full h-full object-contain" />
        </div>
        <MainContainer>
            <SectionContainer>
                <!-- Breadcrumb -->
                <bread-crumb class="mb-6 md:mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: $t('menu.order_requests'), to: '/order/requests' },
                    { label: $t('menu.advanced_order') }
                ]" />

                <!-- Title -->
                <h1 class="section_title mb-6 md:mb-10">
                    {{ $t('menu.advanced_order') }}
                </h1>

                <div class="flex flex-col lg:flex-row items-start gap-6 lg:space-x-6">
                    <!-- Left Column -->
                    <div class="w-full lg:flex-1 space-y-6">
                        <!-- Delivery Section -->
                        <FormContainer>
                            <h2 class="form_title mb-6 md:mb-8">{{ $t('info.delivery') }}</h2>
                            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-6 mb-4">
                                <div class="w-full sm:flex-1 flex flex-col space-y-6 sm:space-y-8">
                                    <SimpleSelect v-model="formData.from_incoterm" :options="incoTerms"
                                        :placeholder="$t('forms.from_incoterm')" :isSearch="true" :icon="'map_pin-icon'" />
                                    <SimpleSelect v-model="formData.from_country" :options="nirdenOptions"
                                        :placeholder="$t('forms.from')" :isSearch="true" :icon="'map_pin-icon'" />
                                </div>

                                <!-- Swap Button -->
                                <div class="flex-shrink-0 self-center sm:self-auto">
                                    <button type="button" @click="swapLocations"
                                        class="w-[50px] h-[50px] bg-custom-gradient rounded-full flex items-center justify-center transform transition-all duration-300"
                                        :class="[isSwap ? 'rotate-180' : '']">
                                        <arrow_group-icon class="rotate-[90deg] sm:rotate-[90deg]" />
                                    </button>
                                </div>

                                <div class="w-full sm:flex-1 flex flex-col space-y-6 sm:space-y-8">
                                    <SimpleSelect v-model="formData.to_incoterm" :options="incoTerms"
                                        :placeholder="$t('forms.to_incoterm')" :isSearch="true" :icon="'map_pin-icon'" />
                                    <SimpleSelect v-model="formData.to_country" :options="niraOptions"
                                        :placeholder="$t('forms.to')" :isSearch="true" :icon="'map_pin-icon'" />
                                </div>
                            </div>
                        </FormContainer>

                        <!-- Information Section -->
                        <FormContainer>
                            <h2 class="form_title mb-6 md:mb-8">{{ $t('info.name') }}</h2>
                            <textarea v-model="formData.description" :placeholder="$t('forms.write_description')" rows="2"
                                class="bg-[#EBF3FD] w-full px-5 sm:px-[30px] py-4 sm:py-[20px] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"></textarea>
                        </FormContainer>

                        <!-- Cargo Type Section -->
                        <FormContainer>
                            <h2 class="form_title mb-6 md:mb-8">{{ $t('forms.cargo_type') }}</h2>
                            <div class="flex flex-wrap gap-3">
                                <button type="button" v-for="(item, index) in itemCategoryStore.item_categories"
                                    :key="index" @click="toggleCargoType(item.id)"
                                    class="px-4 sm:px-6 py-2.5 rounded-[14px] transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                                    :class="formData.categories.includes(item.id)
                                        ? 'bg-[#002244] font-bold text-white shadow-lg'
                                        : 'bg-[#EBF3FD] text-[#222222] font-medium hover:bg-[#ddebfd]'">
                                    {{ item.name }}
                                </button>
                            </div>
                        </FormContainer>

                        <!-- Shipping Type Section -->
                        <FormContainer>
                            <h2 class="form_title mb-6 md:mb-8">{{ $t('forms.route_type') }}</h2>
                            <div class="flex flex-wrap gap-3">
                                <!-- Direct -->
                                <div @click="formData.route_type = 'direct'" :class="cardClass('direct')">
                                    <div class="flex items-start justify-between">
                                        <div>
                                            <p :class="titleClass('direct')">{{ $t('forms.direct') }}</p>
                                            <p :class="descClass('direct')">{{ $t('forms.direct_time') }}</p>
                                        </div>
                                        <div class="w-6 h-6 border flex items-center justify-center rounded-full ml-2"
                                            :class="[formData.route_type === 'direct' ? 'border-[#FED181]' : 'border-[#C9C9C9]']">
                                            <div v-if="formData.route_type === 'direct'"
                                                class="w-[13px] h-[13px] bg-custom-gradient rounded-full"></div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Transit -->
                                <div @click="formData.route_type = 'transit'" :class="cardClass('transit')">
                                    <div class="flex items-start justify-between">
                                        <div>
                                            <p :class="titleClass('transit')">{{ $t('forms.transit') }}</p>
                                            <p :class="descClass('transit')">{{ $t('forms.transit_time') }}</p>
                                        </div>
                                        <div class="w-6 h-6 border flex items-center justify-center rounded-full ml-2"
                                            :class="[formData.route_type === 'transit' ? 'border-[#FED181]' : 'border-[#C9C9C9]']">
                                            <div v-if="formData.route_type === 'transit'"
                                                class="w-[13px] h-[13px] bg-custom-gradient rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormContainer>

                        <!-- Transport Type Section -->
                        <FormContainer>
                            <h2 class="form_title mb-6 md:mb-8">{{ $t('forms.transport_type') }}</h2>
                            <div class="flex items-center gap-2 flex-wrap">
                                <button v-for="transport in transportTypes" :key="transport.id"
                                    @click="formData.transportation_type = transport.id"
                                    class="flex items-center justify-center space-x-1 px-5 sm:px-10 py-3 gap-2 rounded-[14px] transition-all duration-300 transform hover:scale-105 text-sm"
                                    :class="formData.transportation_type === transport.id
                                        ? 'bg-[#002244] font-bold text-white shadow-lg'
                                        : 'bg-[#EBF3FD] text-[#222222] font-medium hover:bg-[#ddebfd]'">
                                    <component :is="icons[transport.icon]" :size="22"
                                        :color="formData.transportation_type === transport.id ? 'white' : '#222222'" />
                                    <span>{{ transport.label }}</span>
                                </button>
                            </div>
                        </FormContainer>

                        <!-- Container Section -->
                        <FormContainer>
                            <h2 class="form_title mb-6 md:mb-8">{{ $t('forms.containers') }}</h2>
                            <div v-for="(item, index) in formData.containers" :key="index" class="my-6">
                                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-6">
                                    <div class="w-full sm:flex-1">
                                        <SimpleSelect v-model="item.type" :options="containerTypeOptions"
                                            :placeholder="$t('forms.container_type')" :isSearch="true"
                                            @change="selectedContainer($event, index)" />
                                    </div>
                                    <div class="w-full sm:flex-1">
                                        <form-input v-model="item.quantity" type="number"
                                            :placeholder="$t('forms.container_quantity')" />
                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <button @click="item.quantity--"
                                            class="w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] text-[#222222] text-[20px] font-medium bg-[#EBF3FD] hover:bg-blue-100 duration-300 rounded-[14px] flex items-center justify-center">
                                            -
                                        </button>
                                        <button @click="item.quantity++"
                                            class="w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] text-[#222222] text-[20px] font-medium bg-[#EBF3FD] hover:bg-blue-100 duration-300 rounded-[14px] flex items-center justify-center">
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div v-if="item.type" class="py-10 sm:py-20 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:space-x-20">
                                    <!-- DELETE ICON -->
                                    <button type="button" @click.stop="formData.containers.splice(index, 1)"
                                        class="text-red-500 hover:text-red-600">
                                        <delete-icon :size="22" :color="'currentColor'" />
                                    </button>
                                    <div class="w-full sm:w-[220px] max-w-[220px]">
                                        <img :src="item.image" class="w-full h-full object-cover rounded-lg">
                                    </div>
                                    <div class="grid grid-cols-2 gap-x-10 sm:gap-x-24 gap-y-8 sm:gap-y-14">
                                        <div>
                                            <h5 class="text-[#939393] text-sm">{{ $t('forms.length') }}:</h5>
                                            <p class="text-[#222222]">{{ item.length_m }} m</p>
                                        </div>
                                        <div>
                                            <h5 class="text-[#939393] text-sm">{{ $t('forms.weight') }}:</h5>
                                            <p class="text-[#222222]">{{ item.max_weight_kg }} kg</p>
                                        </div>
                                        <div>
                                            <h5 class="text-[#939393] text-sm">{{ $t('forms.width') }}:</h5>
                                            <p class="text-[#222222]">{{ item.width_m }} m</p>
                                        </div>
                                        <div>
                                            <h5 class="text-[#939393] text-sm">{{ $t('forms.height') }}:</h5>
                                            <p class="text-[#222222]">{{ item.height_m }} m</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" @click="addNewContainer"
                                class="w-full py-3 bg-blue-50 text-[#002244] font-semibold rounded-xl hover:bg-blue-100 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
                                <div class="w-6 h-6 bg-[#002244] rounded-full flex items-center justify-center">
                                    <plus-icon class="text-white" :size="14" />
                                </div>
                                {{ $t('buttons.add_container') }}
                            </button>
                        </FormContainer>

                        <!-- Items Section -->
                        <FormContainer>
                            <h2 class="form_title mb-6 md:mb-8">{{ $t('forms.cargos') }}</h2>
                            <div class="space-y-3 mb-4">
                                <div v-for="(item, index) in formData.items" :key="index"
                                    class="flex items-center justify-between p-3 sm:p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer group"
                                    @click="editItem(index)">
                                    <div>
                                        <p class="font-semibold text-gray-900 text-sm sm:text-base">{{ `${item.name}` }}</p>
                                        <p class="text-sm text-[#EBF3FD]0">{{ formattedMeasurement(item) }}</p>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <button type="button" @click.stop="formData.items.splice(index, 1)"
                                            class="opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 text-red-500 hover:text-red-600">
                                            <delete-icon :size="22" />
                                        </button>
                                        <chevron_down-icon class="rotate-[-90deg]" :size="24" />
                                    </div>
                                </div>
                            </div>

                            <button type="button" @click="() => { itemMode = 'add'; showModal = true }"
                                class="w-full py-3 bg-blue-50 text-[#002244] font-semibold rounded-xl hover:bg-blue-100 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
                                <div class="w-6 h-6 rounded-full text-white bg-[#002244] flex items-center justify-center">
                                    <plus-icon :size="20" />
                                </div>
                                {{ $t('buttons.add_cargo') }}
                            </button>
                        </FormContainer>

                        <!-- Date Section - Mobile only (shown below items on mobile) -->
                        <FormContainer class="lg:hidden">
                            <h2 class="form_title mb-6">{{ $t('forms.transport_time') }}</h2>
                            <div class="space-y-6">
                                <div>
                                    <label class="block text-sm text-[#939393] mb-2">{{ $t('forms.pickup_date') }}</label>
                                    <VueDatePicker v-model="formData.date_shipment_expected" :enable-time-picker="false" />
                                </div>
                                <div>
                                    <label class="block text-sm text-[#939393] mb-2">{{ $t('forms.delivery_date') }}</label>
                                    <VueDatePicker v-model="formData.date_arrival_expected" :enable-time-picker="false" />
                                </div>
                            </div>
                            <button type="submit" :disabled="orderRequestStore.loading" @click="submitOrder"
                                class="w-full mt-10 py-4 bg-[#002645] text-white font-semibold rounded-full transform hover:scale-[1.02] transition-all duration-300"
                                :class="{ 'opacity-50 cursor-not-allowed': orderRequestStore.loading }">
                                <span v-if="!orderRequestStore.loading">{{ $t('buttons.confirmation') }}</span>
                                <span v-else class="flex items-center justify-center gap-2">
                                    <animate_spin-icon />
                                    {{ $t('info.loading') }}
                                </span>
                            </button>
                        </FormContainer>
                    </div>

                    <!-- Right Column - Desktop only -->
                    <div class="hidden lg:block w-[35%] space-y-6 self-start sticky top-32">
                        <FormContainer>
                            <h2 class="form_title mb-8">{{ $t('forms.transport_time') }}</h2>
                            <div class="space-y-6">
                                <div>
                                    <label class="block text-sm text-[#939393] mb-2">{{ $t('forms.pickup_date') }}</label>
                                    <VueDatePicker v-model="formData.date_shipment_expected" :enable-time-picker="false" />
                                </div>
                                <div>
                                    <label class="block text-sm text-[#939393] mb-2">{{ $t('forms.delivery_date') }}</label>
                                    <VueDatePicker v-model="formData.date_arrival_expected" :enable-time-picker="false" />
                                </div>
                            </div>
                            <button type="submit" :disabled="orderRequestStore.loading" @click="submitOrder"
                                class="w-full mt-[70px] py-4 bg-[#002645] text-white font-semibold rounded-full transform hover:scale-[1.02] transition-all duration-300"
                                :class="{ 'opacity-50 cursor-not-allowed': orderRequestStore.loading }">
                                <span v-if="!orderRequestStore.loading">{{ $t('buttons.confirmation') }}</span>
                                <span v-else class="flex items-center justify-center gap-2">
                                    <animate_spin-icon />
                                    {{ $t('info.loading') }}
                                </span>
                            </button>
                        </FormContainer>
                    </div>
                </div>
            </SectionContainer>
        </MainContainer>

        <!-- Modals -->
        <ItemModal :mode="itemMode" :is-open="showModal" :edit-data="editData" :approximateItems="approximateItems"
            :measurementItems="measurementItems" @close="showModal = false" @submit="handleItemSubmit" />
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n({ useScope: 'global' })

import background from '@/assets/images/background.webp'
import { normalizeToIdLabel } from '@/utils/normalizers'
import { formattedMeasurement } from '@/utils/strings'
import { formatToYYYYMMDD } from '@/utils/date'

const { icons } = useIcons()
const countryStore = useCountryStore()
const itemSizeStore = useItemSizeStore()
const itemCategoryStore = useItemCategoryStore()
const orderRequestStore = useOrderRequestStore()
const measurementStore = useMeasurementStore()
const containerTypeStore = useContainerTypeStore()

const transportTypes = ref([
    { id: 'AIR', label: t('names.airplane'), icon: 'plane-icon' },
    { id: 'SEA', label: t('names.ship'), icon: 'mingcute_ship_line-icon' },
    { id: 'LAND', label: t('names.truck'), icon: 'truck_delivery-icon' },
    { id: 'RAIL', label: t('names.train'), icon: 'train_2-icon' }
])

const incoTerms = ref([
    { id: 'FCA', label: 'FCA' },
    { id: 'EXW', label: 'EXW' },
    { id: 'FAS', label: 'FAS' },
    { id: 'FOB', label: 'FOB' },
    { id: 'CIF', label: 'CIF' },
    { id: 'CFR', label: 'CFR' },
    { id: 'CPT', label: 'CPT' },
    { id: 'CIP', label: 'CIP' },
    { id: 'DPU', label: 'DPU' },
    { id: 'DAP', label: 'DAP' },
    { id: 'DDP', label: 'DDP' }
])

const measurementItems = ref([])
const approximateItems = ref([])
const nirdenOptions = ref([])
const niraOptions = ref([])
const containerTypeOptions = ref([])

const itemMode = ref('add')
const isSwap = ref(false)
const showModal = ref(false)
const editingIndex = ref(null)

const cardClass = (type) => [
    'flex-1 min-w-[140px] sm:w-[200px] rounded-[14px] px-4 sm:px-5 py-4 cursor-pointer transition-all duration-200',
    formData.route_type === type
        ? 'border border-[#FFAE24] bg-[#fffaeb]'
        : 'bg-blue-50 border border-transparent'
]

const titleClass = (type) =>
    formData.route_type === type
        ? 'font-semibold text-gold-gradient'
        : 'font-medium text-[#222222]'

const descClass = (type) => [
    'text-sm mt-6 sm:mt-8 font-medium',
    formData.route_type === type
        ? 'text-gold-gradient'
        : 'text-[#939393]'
]

const editData = ref({})
const formData = reactive({
    type: 'ADVANCED',
    from_country: null,
    to_country: null,
    from_incoterm: null,
    to_incoterm: null,
    description: '',
    route_type: 'direct',
    transportation_type: '',
    date_shipment_expected: '',
    date_arrival_expected: '',
    categories: [],
    containers: [{
        type: null,
        quantity: 0,
        image: null,
        length_m: null,
        width_m: null,
        height_m: null,
        max_weight_kg: null,
    }],
    items: []
})

const swapLocations = () => {
    isSwap.value = !isSwap.value
    const temp_location = formData.from_country
    const temp_incoterm = formData.from_incoterm
    formData.from_country = formData.to_country
    formData.to_country = temp_location
    formData.from_incoterm = formData.to_incoterm
    formData.to_incoterm = temp_incoterm
}

const toggleCargoType = (id) => {
    const index = formData.categories.indexOf(id)
    if (index > -1) {
        formData.categories.splice(index, 1)
    } else {
        formData.categories.push(id)
    }
}

const handleItemSubmit = (payload) => {
    const { tab, mode, data } = payload
    if (mode === 'add') {
        formData.items.push({ ...data, tab })
    } else if (mode === 'edit' && editingIndex.value !== null) {
        formData.items[editingIndex.value] = { ...data, tab }
        editingIndex.value = null
    }
}

const editItem = (index) => {
    showModal.value = true
    itemMode.value = 'edit'
    editingIndex.value = index
    editData.value = { ...formData.items[index] }
}

const submitOrder = async () => {
    try {
        await orderRequestStore.createOrderRequest({
            ...formData,
            route_type: String(formData.route_type).trim().toUpperCase(),
            containers: formData.containers.map(container => ({
                type: container.type,
                quantity: container.quantity
            })),
            date_arrival_expected: formatToYYYYMMDD(formData.date_arrival_expected),
            date_shipment_expected: formatToYYYYMMDD(formData.date_shipment_expected)
        })
        resetForm()
    } catch (error) {
        console.log(error)
    }
}

onMounted(async () => {
    const itemSizes = await itemSizeStore.fetchItemSizes()
    const countries = await countryStore.fetchCountries()
    const measurements = await measurementStore.fetchMeasurements()
    await itemCategoryStore.fetchItemCategories()
    nirdenOptions.value = normalizeToIdLabel(countries)
    niraOptions.value = normalizeToIdLabel(countries)
    measurementItems.value = normalizeToIdLabel(measurements)
    approximateItems.value = itemSizes
})

const resetForm = () => {
    formData.from_country = null
    formData.to_country = null
    formData.from_incoterm = null
    formData.to_incoterm = null
    formData.description = ''
    formData.categories = []
    formData.route_type = 'direct'
    formData.containers = [{ type: null, quantity: 0 }]
    formData.items = []
    formData.transportation_type = ''
    formData.date_shipment_expected = ''
    formData.date_arrival_expected = ''
}

const addNewContainer = () => {
    formData.containers.push({ type: null, quantity: 0 })
}

const selectedContainer = (data, index) => {
    formData.containers[index].image = data.image
    formData.containers[index].length_m = data.length_m
    formData.containers[index].width_m = data.width_m
    formData.containers[index].height_m = data.height_m
    formData.containers[index].max_weight_kg = data.max_weight_kg
}

watch(
    () => formData.transportation_type,
    async (newVal) => {
        if (newVal) {
            await containerTypeStore.fetchContainerTypes({ transportation_type: newVal })
            containerTypeOptions.value = normalizeToIdLabel(containerTypeStore.container_types, true)
        }
    }
)
</script>

<style scoped>
:deep(.dp__input) {
    border: none;
    border-radius: 14px;
    padding-top: 13px;
    padding-bottom: 13px;
    background-color: #ebf3fd;
}
</style>
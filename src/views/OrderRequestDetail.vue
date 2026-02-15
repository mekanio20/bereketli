<template>
    <section class="relative">
        <!-- Absolute -->
        <div class="absolute -z-10 w-full h-full bg-[#F3F8FF]">
            <img :src="background" class="w-full h-full object-contain" />
        </div>
        <MainContainer>
            <SectionContainer>
                <!-- Breadcrumb -->
                <bread-crumb class="mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: 'Order Requests', to: '/order/requests' },
                    { label: 'Order Request Detail' }
                ]" />

                <div class="flex items-center justify-between mb-10">
                    <div class="flex items-center space-x-10">
                        <!-- Title -->
                        <h1 class="section_title">
                            Order Request Detail
                        </h1>
                        <div class="text-sm font-medium px-7 py-2 rounded-full w-fit"
                            :class="statusBadgeClass(order_request?.status)">
                            {{ getStatusLabel(order_request?.status) }}
                        </div>
                    </div>
                    <div v-if="order_request?.status === 'PENDING'">
                        <button @click="showCancelModal = true"
                            class="px-8 py-[6px] rounded-xl bg-[#E62927] text-white text-lg font-sembold hover:bg-red-600 hover:scale-105 transition duration-200 text-nowrap">
                            Cancel Order
                        </button>
                    </div>
                </div>

                <div class="flex items-start space-x-6">
                    <!-- Left Column -->
                    <div class="flex-1 space-y-6">
                        <!-- Delivery Section -->
                        <FormContainer>
                            <h2 class="form_title mb-8">Eltip bermek</h2>
                            <div class="flex items-center space-x-6 mb-4">
                                <div class="flex-1 flex flex-col space-y-8">
                                    <SimpleSelect v-if="isAdvanced" v-model="formData.from_incoterm" :options="incoTerms"
                                        placeholder="From Incoterm" :isSearch="true" :icon="'map_pin-icon'" />
                                    <!-- From Location -->
                                    <SimpleSelect :readonly="true" v-model="formData.from_country"
                                        :options="nirdenOptions" placeholder="Nirden" :icon="'map_pin-icon'" />
                                </div>
                                <!-- Swap Button -->
                                <div class="flex-shrink-0">
                                    <button type="button" disabled
                                        class="w-[50px] h-[50px] bg-custom-gradient rounded-full -space-x-1 flex items-center justify-center transform transition-all duration-300">
                                        <arrow_group-icon class="rotate-[90deg]" />
                                    </button>
                                </div>
                                <div class="flex-1 flex flex-col space-y-8">
                                    <SimpleSelect v-if="isAdvanced" v-model="formData.to_incoterm" :options="incoTerms"
                                        placeholder="To Incoterm" :isSearch="true" :icon="'map_pin-icon'" />
                                    <!-- To Location -->
                                    <SimpleSelect :readonly="true" v-model="formData.to_country" :options="niraOptions"
                                        placeholder="Nirä" :icon="'map_pin-icon'" />
                                </div>
                            </div>
                        </FormContainer>

                        <!-- Information Section -->
                        <FormContainer>
                            <h2 class="form_title mb-8">Maglumatlar</h2>
                            <textarea v-model="formData.description" disabled placeholder="Write description..."
                                rows="2"
                                class="bg-[#EBF3FD] w-full px-[30px] py-[20px] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"></textarea>
                        </FormContainer>

                        <!-- Categories Section -->
                        <FormContainer>
                            <h2 class="form_title mb-8">Ýüküň görnüşi</h2>
                            <div class="flex flex-wrap gap-3">
                                <button v-for="(item, index) in itemCategoryStore.item_categories" :key="index"
                                    v-show="formData.categories.includes(item.id)"
                                    class="px-6 py-2.5 rounded-[14px] transition-all duration-300 transform hover:scale-105"
                                    :class="formData.categories.includes(item.id)
                                        ? 'bg-[#002244] font-bold text-white shadow-lg'
                                        : 'bg-[#EBF3FD] text-[#222222] font-medium hover:bg-[#ddebfd]'">
                                    {{ item.name }}
                                </button>
                            </div>
                        </FormContainer>

                        <!-- Shipping Type Section -->
                        <FormContainer v-if="isAdvanced">
                            <h2 class="form_title mb-8">Ugur</h2>
                            <div class="flex flex-wrap gap-3">
                                <!-- Direct -->
                                <div v-if="formData.route_type === 'direct'" :class="cardClass('direct')">
                                    <div class="flex items-start justify-between">
                                        <div>
                                            <p :class="titleClass('direct')">Direct</p>
                                            <p :class="descClass('direct')">1 hepde</p>
                                        </div>

                                        <div class="w-6 h-6 border flex items-center justify-center rounded-full"
                                            :class="[formData.route_type === 'direct' ? 'border-[#FED181]' : 'border-[#C9C9C9]']">
                                            <div v-if="formData.route_type === 'direct'"
                                                class="w-[13px] h-[13px] bg-custom-gradient rounded-full"></div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Transit -->
                                <div v-if="formData.route_type === 'transit'" :class="cardClass('transit')">
                                    <div class="flex items-start justify-between">
                                        <div>
                                            <p :class="titleClass('transit')">Transit</p>
                                            <p :class="descClass('transit')">30 gün</p>
                                        </div>
                                        <div class="w-6 h-6 border flex items-center justify-center rounded-full"
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
                            <h2 class="form_title mb-8">Eltip bermek görnüşi</h2>
                            <div class="flex items-center gap-2 flex-wrap">
                                <button v-for="transport in transportTypes" :key="transport.id"
                                    v-show="formData.transportation_type === transport.id"
                                    class="flex items-center justify-center space-x-1 px-10 py-[13px] gap-2 rounded-[14px] transition-all duration-300 transform hover:scale-105"
                                    :class="formData.transportation_type === transport.id
                                        ? 'bg-[#002244] font-bold text-white shadow-lg'
                                        : 'bg-[#EBF3FD] text-[#222222] font-medium hover:bg-[#ddebfd]'">
                                    <component :is="icons[transport.icon]" :size="24"
                                        :color="formData.transportation_type === transport.id ? 'white' : '#222222'" />
                                    <span class="text-sm">{{ transport.label }}</span>
                                </button>
                            </div>
                        </FormContainer>

                        <!-- Containers -->
                        <FormContainer v-if="isAdvanced">
                            <h2 class="form_title mb-8">Konteýnerlar</h2>
                            <div v-for="(item, index) in formData.containers" :key="index" class="my-6">
                                <div class="flex items-center space-x-6">
                                    <SimpleSelect :readonly="true" v-model="item.type" :options="containerTypeOptions" placeholder="Type" />
                                    <form-input :readonly="true" v-model="item.quantity" type="number" />
                                </div>
                                <div v-if="item.type" class="py-20 flex items-center space-x-20">
                                    <div class="w-[220px] h-220px">
                                        <img :src="item.image" class="w-full h-full object-cover rounded-lg">
                                    </div>
                                    <div class="grid grid-cols-2 gap-x-24 gap-y-14">
                                        <div>
                                            <h5 class="text-[#939393]">Uzynlygy:</h5>
                                            <p class="text-[#222222]">{{ item.length_m }} m</p>
                                        </div>
                                        <div>
                                            <h5 class="text-[#939393]">Umumy agramy:</h5>
                                            <p class="text-[#222222]">{{ item.max_weight_kg }} kg</p>
                                        </div>
                                        <div>
                                            <h5 class="text-[#939393]">Giňligi:</h5>
                                            <p class="text-[#222222]">{{ item.width_m }} m</p>
                                        </div>
                                        <div>
                                            <h5 class="text-[#939393]">Beýikligi:</h5>
                                            <p class="text-[#222222]">{{ item.height_m }} m</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormContainer>

                        <!-- Items Section -->
                        <FormContainer>
                            <h2 class="form_title mb-8">Items</h2>
                            <div class="space-y-3 mb-4">
                                <div v-for="(item, index) in formData.items" :key="index"
                                    class="flex items-center justify-between p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer group"
                                    @click="viewItem(index)">
                                    <div>
                                        <p class="font-semibold text-gray-900">{{ `${item.name || 'Item'}` }}</p>
                                        <p class="text-sm text-[#EBF3FD]0">{{ formattedMeasurement(item) }}</p>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <!-- Chevron -->
                                        <chevron_down-icon class="rotate-[-90deg]" :size="24" />
                                    </div>
                                </div>
                            </div>
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
                                    <VueDatePicker readonly v-model="formData.date_shipment_expected"
                                        :enable-time-picker="false" />
                                </div>

                                <!-- Delivery Date -->
                                <div>
                                    <label class="block text-sm text-[#939393] mb-2">Barmaly senesi</label>
                                    <VueDatePicker readonly v-model="formData.date_arrival_expected"
                                        :enable-time-picker="false" />
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <button type="button" @click="redirectContact"
                                class="w-full mt-[70px] py-4 bg-[#002645] text-white font-semibold rounded-full transform hover:scale-[1.02] transition-all duration-300">
                                <div class="flex items-center justify-center gap-3">
                                    <message_circle-icon />
                                    <span>Habarlasmak</span>
                                </div>
                            </button>
                        </FormContainer>
                    </div>
                </div>
            </SectionContainer>
        </MainContainer>
        <!-- Modals -->
        <ItemModal :mode="itemMode" :is-open="showModal" :edit-data="viewData" :approximateItems="approximateItems"
            :measurementItems="measurementItems" @close="showModal = false" />
        <!-- Cancel Modal -->
        <ConfirmModal :is-open="showCancelModal" :loading="orderRequestStore.loading" title="Goýbolsun etmek"
            message="Sargydy goýbolsun etmek isleýärsiňizmi?" confirm-text="Hawa" cancel-text="Ýok" type="danger"
            @confirm="confirmCancel" @cancel="showCancelModal = false" />
    </section>
</template>

<script setup>
import background from '@/assets/images/background.webp'
import { statusBadgeClass, getStatusLabel } from '@/utils/switch'
import { normalizeToIdLabel } from '@/utils/normalizers'
import { formattedMeasurement } from '@/utils/strings'
import { parseTRDate } from '@/utils/date'
const { icons } = useIcons()

const route = useRoute()
const router = useRouter()
const countryStore = useCountryStore()
const itemSizeStore = useItemSizeStore()
const itemCategoryStore = useItemCategoryStore()
const orderRequestStore = useOrderRequestStore()
const measurementStore = useMeasurementStore()
const containerTypeStore = useContainerTypeStore()
const { order_request } = storeToRefs(orderRequestStore)

const measurementItems = ref([])
const approximateItems = ref([])
const nirdenOptions = ref([])
const niraOptions = ref([])
const containerTypeOptions = ref([])

const itemMode = ref('view')
const showModal = ref(false)
const viewIndex = ref(null)
const showCancelModal = ref(false)

const transportTypes = ref([
    { id: 'AIR', label: 'Uçar', icon: 'plane-icon' },
    { id: 'SEA', label: 'Gämi', icon: 'mingcute_ship_line-icon' },
    { id: 'LAND', label: 'Ulag', icon: 'truck_delivery-icon' },
    { id: 'RAIL', label: 'Otly', icon: 'train_2-icon' }
])

const isAdvanced = computed(() => formData.value.type === "ADVANCED")
const viewData = ref({})
const formData = ref({
    type: null,
    from_country: null,
    to_country: null,
    from_incoterm: null,
    to_incoterm: null,
    description: '',
    route_type: null,
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

const cardClass = (type) => [
    'w-[200px] rounded-[14px] px-5 py-4 cursor-pointer transition-all duration-200',
    formData.value.route_type === type
        ? 'border border-[#FFAE24] bg-[#fffaeb]'
        : 'bg-blue-50 border border-transparent'
]

const titleClass = (type) =>
    formData.value.route_type === type
        ? 'font-semibold text-gold-gradient'
        : 'font-medium text-[#222222]'

const descClass = (type) => [
    'text-sm mt-8 font-medium',
    formData.value.route_type === type
        ? 'text-gold-gradient'
        : 'text-[#939393]'
]

const viewItem = (index) => {
    showModal.value = true
    itemMode.value = 'view'
    viewIndex.value = index
    viewData.value = { ...formData.value.items[index] }
}

const redirectContact = () => {
    router.push({ name: 'Chat', query: { code: order_request.value.code } })
}

watch(
    () => route.params.id,
    async () => {
        const newVal = route.params.id
        const order_request = await orderRequestStore.fetchOrderRequest(newVal)
        formData.value = {
            type: order_request.type || null,
            from_incoterm: order_request.from_incoterm || null,
            to_incoterm: order_request.to_incoterm || null,
            from_country: order_request.from_country?.id || null,
            to_country: order_request.to_country?.id || null,
            route_type: String(order_request.route_type).toLowerCase() || null,
            description: order_request.description || '',
            categories: order_request.categories?.map(item => item.id) || [],
            transportation_type: order_request.transportation_type || null,
            date_shipment_expected: parseTRDate(order_request.date_shipment_expected) || '',
            date_arrival_expected: parseTRDate(order_request.date_arrival_expected) || '',
            items: order_request.items?.map(item => ({
                ...item,
                measurement: item.measurement?.id || null,
                size: item.size?.id || null
            })) || [],
            containers: order_request.containers?.map(item => ({
                quantity: item.quantity,
                type: item.type?.id,
                image: item.type?.image,
                length_m: item.type?.length_m,
                width_m: item.type?.width_m,
                height_m: item.type?.height_m,
                max_weight_kg: item.type?.max_weight_kg,
            })) || []
        }

        const itemSizes = await itemSizeStore.fetchItemSizes()
        const countries = await countryStore.fetchCountries()
        const measurements = await measurementStore.fetchMeasurements()
        await containerTypeStore.fetchContainerTypes()
        await itemCategoryStore.fetchItemCategories()
        nirdenOptions.value = normalizeToIdLabel(countries)
        niraOptions.value = normalizeToIdLabel(countries)
        measurementItems.value = normalizeToIdLabel(measurements)
        containerTypeOptions.value = normalizeToIdLabel(containerTypeStore.container_types, true)
        approximateItems.value = itemSizes
    }, { immediate: true })

const confirmCancel = async () => {
    try {
        await orderRequestStore.cancelOrderRequest(route.params.id)
        router.push({ name: 'OrderRequest' })
    } catch (error) {
        console.log(error);
    }
}
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
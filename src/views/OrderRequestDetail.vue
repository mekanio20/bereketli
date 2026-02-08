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
                            <div class="flex items-end space-x-6 mb-4">
                                <!-- From Location -->
                                <div class="flex-1">
                                    <SimpleSelect :readonly="true" v-model="formData.from_country" :options="nirdenOptions"
                                        placeholder="Nirden" :icon="'map_pin-icon'" />
                                </div>
                                <!-- Swap Button -->
                                <div class="flex-shrink-0">
                                    <button type="button" disabled
                                        class="w-[50px] h-[50px] bg-custom-gradient rounded-full -space-x-1 flex items-center justify-center transform transition-all duration-300">
                                        <arrow_group-icon class="rotate-[90deg]" />
                                    </button>
                                </div>
                                <!-- To Location -->
                                <div class="flex-1">
                                    <SimpleSelect :readonly="true" v-model="formData.to_country" :options="niraOptions"
                                        placeholder="Nirä" :icon="'map_pin-icon'" />
                                </div>
                            </div>
                        </FormContainer>

                        <!-- Information Section -->
                        <FormContainer>
                            <h2 class="form_title mb-8">Maglumatlar</h2>
                            <textarea v-model="formData.description" disabled placeholder="Write description..." rows="2"
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

                        <!-- Transport Type Section -->
                        <FormContainer>
                            <h2 class="form_title mb-8">Eltip bermek görnüşi</h2>
                            <div class="flex items-center gap-2 flex-wrap">
                                <button v-for="transport in transportTypes" :key="transport.id" v-show="formData.transportation_type === transport.id"
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
                                    <VueDatePicker readonly v-model="formData.date_shipment_expected" :enable-time-picker="false" />
                                </div>

                                <!-- Delivery Date -->
                                <div>
                                    <label class="block text-sm text-[#939393] mb-2">Barmaly senesi</label>
                                    <VueDatePicker readonly v-model="formData.date_arrival_expected" :enable-time-picker="false" />
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <button type="button" @click="redirectContact"
                                class="w-full mt-[70px] py-4 bg-[#002645] text-white font-semibold rounded-full transform hover:scale-[1.02] transition-all duration-300">
                                <div class="flex items-center justify-center gap-3">
                                    <message_circle-icon />
                                    <span >Habarlasmak</span>
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
        <ConfirmModal :is-open="showCancelModal" :loading="orderRequestStore.loading" title="Goýbolsun etmek" message="Sargydy goýbolsun etmek isleýärsiňizmi?"
            confirm-text="Hawa" cancel-text="Ýok" type="danger" @confirm="confirmCancel"
            @cancel="showCancelModal = false" />
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
const { order_request } = storeToRefs(orderRequestStore)

const measurementItems = ref([])
const approximateItems = ref([])
const nirdenOptions = ref([])
const niraOptions = ref([])

const itemMode = ref('view')
const showModal = ref(false)
const viewIndex = ref(null)
const showCancelModal = ref(false)

const transportTypes = ref([
    { id: 'SEA', label: 'Gämi', icon: 'mingcute_ship_line-icon' },
    { id: 'AIR', label: 'Uçar', icon: 'plane-icon' },
    { id: 'LAND', label: 'Ulag', icon: 'truck_delivery-icon' },
    { id: 'RAIL', label: 'Otly', icon: 'train_2-icon' }
])

const viewData = ref({})
const formData = ref({
    type: 'SIMPLE',
    from_country: null,
    to_country: null,
    description: '',
    categories: [],
    transportation_type: null,
    date_shipment_expected: '',
    date_arrival_expected: '',
    items: []
})

const viewItem = (index) => {
    showModal.value = true
    itemMode.value = 'view'
    viewIndex.value = index
    viewData.value = { ...formData.value.items[index] }
}

const redirectContact = async () => {
    try {
        
    } catch (error) {

    }
}

watch(
    () => route.params.id,
    async () => {
        const newVal = route.params.id
        const order_request = await orderRequestStore.fetchOrderRequest(newVal)
        formData.value = {
            from_country: order_request.from_country?.id || null,
            to_country: order_request.to_country?.id || null,
            description: order_request.description || '',
            categories: order_request.categories?.map(item => item.id) || [],
            transportation_type: order_request.transportation_type || null,
            date_shipment_expected: parseTRDate(order_request.date_shipment_expected) || '',
            date_arrival_expected: parseTRDate(order_request.date_arrival_expected) || '',
            items: order_request.items?.map(item => ({
                ...item,
                measurement: item.measurement?.id || null,
                size: item.size?.id || null
            })) || []
        }

        const itemSizes = await itemSizeStore.fetchItemSizes()
        const countries = await countryStore.fetchCountries()
        const measurements = await measurementStore.fetchMeasurements()
        await itemCategoryStore.fetchItemCategories()
        nirdenOptions.value = normalizeToIdLabel(countries)
        niraOptions.value = normalizeToIdLabel(countries)
        measurementItems.value = normalizeToIdLabel(measurements)
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
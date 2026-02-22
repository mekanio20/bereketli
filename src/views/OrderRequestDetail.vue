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
                    { label: `#${order_request?.id}` }
                ]" />

                <!-- Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-10">
                    <div class="flex flex-wrap items-center gap-4 sm:space-x-10">
                        <h1 class="section_title">
                            ID #{{ order_request?.id }}
                        </h1>
                        <div class="text-sm font-medium px-5 sm:px-7 py-2 rounded-full w-fit"
                            :class="statusBadgeClass(order_request?.status)">
                            {{ getStatusLabel(order_request?.status) }}
                        </div>
                    </div>
                    <div v-if="order_request?.status === 'PENDING'" class="w-full sm:w-auto">
                        <button @click="showCancelModal = true"
                            class="w-full sm:w-auto px-6 sm:px-8 py-[6px] rounded-xl bg-[#E62927] text-white text-base sm:text-lg font-semibold hover:bg-red-600 hover:scale-105 transition duration-200 whitespace-nowrap">
                            {{ $t('buttons.cancel_request') }}
                        </button>
                    </div>
                </div>

                <div class="flex flex-col lg:flex-row items-start gap-6 lg:space-x-6">
                    <!-- Left Column -->
                    <div class="w-full lg:flex-1 space-y-6">
                        <!-- Delivery Section -->
                        <FormContainer>
                            <h2 class="form_title mb-6 md:mb-8">{{ $t('info.delivery') }}</h2>
                            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-6 mb-4">
                                <div class="w-full sm:flex-1 flex flex-col space-y-6 sm:space-y-8">
                                    <SimpleSelect v-if="isAdvanced" v-model="formData.from_incoterm" :options="incoTerms"
                                        :placeholder="$t('forms.from_incoterm')" :isSearch="true" :icon="'map_pin-icon'" />
                                    <SimpleSelect :readonly="true" v-model="formData.from_country"
                                        :options="nirdenOptions" :placeholder="$t('forms.from')" :icon="'map_pin-icon'" />
                                </div>

                                <!-- Swap Button -->
                                <div class="flex-shrink-0 self-center">
                                    <button type="button" disabled
                                        class="w-[50px] h-[50px] bg-custom-gradient rounded-full flex items-center justify-center transform transition-all duration-300">
                                        <arrow_group-icon class="rotate-[90deg]" />
                                    </button>
                                </div>

                                <div class="w-full sm:flex-1 flex flex-col space-y-6 sm:space-y-8">
                                    <SimpleSelect v-if="isAdvanced" v-model="formData.to_incoterm" :options="incoTerms"
                                        :placeholder="$t('forms.to_incoterm')" :isSearch="true" :icon="'map_pin-icon'" />
                                    <SimpleSelect :readonly="true" v-model="formData.to_country" :options="niraOptions"
                                        :placeholder="$t('forms.to')" :icon="'map_pin-icon'" />
                                </div>
                            </div>
                        </FormContainer>

                        <!-- Information Section -->
                        <FormContainer>
                            <h2 class="form_title mb-6 md:mb-8">{{ $t('info.name') }}</h2>
                            <textarea v-model="formData.description" disabled :placeholder="$t('forms.write_description')"
                                rows="2"
                                class="bg-[#EBF3FD] w-full px-5 sm:px-[30px] py-4 sm:py-[20px] rounded-[14px] focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"></textarea>
                        </FormContainer>

                        <!-- Categories Section -->
                        <FormContainer>
                            <h2 class="form_title mb-6 md:mb-8">{{ $t('forms.cargo_type') }}</h2>
                            <div class="flex flex-wrap gap-3">
                                <button v-for="(item, index) in itemCategoryStore.item_categories" :key="index"
                                    v-show="formData.categories.includes(item.id)"
                                    class="px-4 sm:px-6 py-2.5 rounded-[14px] transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                                    :class="formData.categories.includes(item.id)
                                        ? 'bg-[#002244] font-bold text-white shadow-lg'
                                        : 'bg-[#EBF3FD] text-[#222222] font-medium hover:bg-[#ddebfd]'">
                                    {{ item.name }}
                                </button>
                            </div>
                        </FormContainer>

                        <!-- Shipping Type Section -->
                        <FormContainer v-if="isAdvanced">
                            <h2 class="form_title mb-6 md:mb-8">{{ $t('forms.route_type') }}</h2>
                            <div class="flex flex-wrap gap-3">
                                <div v-if="formData.route_type === 'direct'" :class="cardClass('direct')">
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

                                <div v-if="formData.route_type === 'transit'" :class="cardClass('transit')">
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
                                    v-show="formData.transportation_type === transport.id"
                                    class="flex items-center justify-center space-x-1 px-6 sm:px-10 py-3 gap-2 rounded-[14px] transition-all duration-300 transform hover:scale-105 text-sm"
                                    :class="formData.transportation_type === transport.id
                                        ? 'bg-[#002244] font-bold text-white shadow-lg'
                                        : 'bg-[#EBF3FD] text-[#222222] font-medium hover:bg-[#ddebfd]'">
                                    <component :is="icons[transport.icon]" :size="22"
                                        :color="formData.transportation_type === transport.id ? 'white' : '#222222'" />
                                    <span>{{ transport.label }}</span>
                                </button>
                            </div>
                        </FormContainer>

                        <!-- Containers -->
                        <FormContainer v-if="isAdvanced">
                            <h2 class="form_title mb-6 md:mb-8">{{ $t('forms.containers') }}</h2>
                            <div v-for="(item, index) in formData.containers" :key="index" class="my-6">
                                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:space-x-6">
                                    <div class="w-full sm:flex-1">
                                        <SimpleSelect :readonly="true" v-model="item.type" :options="containerTypeOptions"
                                            :placeholder="$t('forms.type')" />
                                    </div>
                                    <div class="w-full sm:flex-1">
                                        <form-input :readonly="true" v-model="item.quantity" type="number" />
                                    </div>
                                </div>

                                <div v-if="item.type" class="py-10 sm:py-20 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:space-x-20">
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
                        </FormContainer>

                        <!-- Items Section -->
                        <FormContainer>
                            <h2 class="form_title mb-6 md:mb-8">{{ $t('forms.cargos') }}</h2>
                            <div class="space-y-3 mb-4">
                                <div v-for="(item, index) in formData.items" :key="index"
                                    class="flex items-center justify-between p-3 sm:p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer group"
                                    @click="viewItem(index)">
                                    <div>
                                        <p class="font-semibold text-gray-900 text-sm sm:text-base">{{ `${item.name}` }}</p>
                                        <p class="text-sm text-[#EBF3FD]0">{{ formattedMeasurement(item) }}</p>
                                    </div>
                                    <div class="flex items-center gap-3">
                                        <chevron_down-icon class="rotate-[-90deg]" :size="24" />
                                    </div>
                                </div>
                            </div>
                        </FormContainer>

                        <!-- Right Column - Mobile only -->
                        <FormContainer class="lg:hidden">
                            <h2 class="text-xl font-bold text-gray-900 mb-6">{{ $t('forms.transport_time') }}</h2>
                            <div class="space-y-6">
                                <div>
                                    <label class="block text-sm text-[#939393] mb-2">{{ $t('forms.pickup_date') }}</label>
                                    <VueDatePicker readonly v-model="formData.date_shipment_expected"
                                        :enable-time-picker="false" />
                                </div>
                                <div>
                                    <label class="block text-sm text-[#939393] mb-2">{{ $t('forms.delivery_date') }}</label>
                                    <VueDatePicker readonly v-model="formData.date_arrival_expected"
                                        :enable-time-picker="false" />
                                </div>
                            </div>
                            <button type="button" @click="redirectContact"
                                class="w-full mt-10 py-4 bg-[#002645] text-white font-semibold rounded-full transform hover:scale-[1.02] transition-all duration-300">
                                <div class="flex items-center justify-center gap-3">
                                    <message_circle-icon />
                                    <span>{{ $t('menu.contacts') }}</span>
                                </div>
                            </button>
                        </FormContainer>
                    </div>

                    <!-- Right Column - Desktop only -->
                    <div class="hidden lg:block w-[35%] space-y-6 self-start sticky top-32">
                        <FormContainer>
                            <h2 class="text-xl font-bold text-gray-900 mb-8">{{ $t('forms.transport_time') }}</h2>
                            <div class="space-y-6">
                                <div>
                                    <label class="block text-sm text-[#939393] mb-2">{{ $t('forms.pickup_date') }}</label>
                                    <VueDatePicker readonly v-model="formData.date_shipment_expected"
                                        :enable-time-picker="false" />
                                </div>
                                <div>
                                    <label class="block text-sm text-[#939393] mb-2">{{ $t('forms.delivery_date') }}</label>
                                    <VueDatePicker readonly v-model="formData.date_arrival_expected"
                                        :enable-time-picker="false" />
                                </div>
                            </div>
                            <button type="button" @click="redirectContact"
                                class="w-full mt-[70px] py-4 bg-[#002645] text-white font-semibold rounded-full transform hover:scale-[1.02] transition-all duration-300">
                                <div class="flex items-center justify-center gap-3">
                                    <message_circle-icon />
                                    <span>{{ $t('menu.contacts') }}</span>
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
        <ConfirmModal :is-open="showCancelModal" :loading="orderRequestStore.loading" :title="$t('buttons.cancel_request')"
            :message="$t('descriptions.cancel_request')" type="danger"
            @confirm="confirmCancel" @cancel="showCancelModal = false" />
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n({ useScope: 'global' })

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
    { id: 'AIR', label: t('names.airplane'), icon: 'plane-icon' },
    { id: 'SEA', label: t('names.ship'), icon: 'mingcute_ship_line-icon' },
    { id: 'LAND', label: t('names.truck'), icon: 'truck_delivery-icon' },
    { id: 'RAIL', label: t('names.train'), icon: 'train_2-icon' }
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
    'flex-1 min-w-[140px] sm:w-[200px] rounded-[14px] px-4 sm:px-5 py-4 transition-all duration-200',
    formData.value.route_type === type
        ? 'border border-[#FFAE24] bg-[#fffaeb]'
        : 'bg-blue-50 border border-transparent'
]

const titleClass = (type) =>
    formData.value.route_type === type
        ? 'font-semibold text-gold-gradient'
        : 'font-medium text-[#222222]'

const descClass = (type) => [
    'text-sm mt-6 sm:mt-8 font-medium',
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
        console.log(error)
    }
}
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
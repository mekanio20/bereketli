<template>
    <div ref="wrapper">
        <!-- Trigger Button -->
        <button type="button" @click="isOpen = !isOpen" class="w-full relative bg-[#EBF3FD] font-medium px-6 py-[13px] rounded-[10px]
             flex items-center justify-between transition-all duration-300"
            :class="[selectedOption ? 'text-[#222222]' : 'text-[#838589]', icon && 'pl-12']">

            <!-- Icon -->
            <component v-if="icon" :is="icons[icon]" :color="'currentColor'" class="absolute left-6"
                :class="[modelValue.length > 0 ? 'text-[#222222]' : 'text-[#838589]']" />

            <span class="text-base truncate max-w-[200px]">
                {{ selectedOption?.name || placeholder }}
            </span>

            <chevron_down-icon :class="[
                'transition-transform duration-300',
                isOpen && 'rotate-180'
            ]" :color="'#222222'" :size="20" />
        </button>


        <!-- Dropdown -->
        <div v-show="isOpen" class="absolute z-20 w-full mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div class="w-full flex items-center space-x-2 p-2">
                <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                    class="w-full px-8 py-3 rounded-[10px] transition-all duration-300 transform hover:scale-105"
                    :class="activeTab === tab.id
                        ? 'bg-[#002645] text-white font-semibold'
                        : 'bg-white text-[#222222] hover:bg-gray-50 font-medium'">
                    <span>{{ tab.label }}</span>
                </button>
            </div>

            <!-- Options -->
            <div v-if="activeTab === 1" class="h-72 overflow-y-auto">
                <div class="p-4">
                    <SimpleSelect :isSearch="true" v-model="formData.item_type" :options="itemTypeOptions" placeholder="Type" />
                </div>
                <!-- Search -->
                <div v-if="isSearch" class="p-3 border-b">
                    <input v-model="search" type="text" placeholder="Gözle..." class="w-full px-4 py-2 rounded-lg bg-[#F5F7FA]
                 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <button v-for="(option, index) in filteredOptions" :key="index" @click="selectTakmynan(option)" class="w-full text-left px-6 py-3
                 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100
                 transition-all duration-200 text-gray-700 font-medium flex items-center space-x-4">
                    <img :src="option.icon" class="w-[36px] object-cover" />
                    <div class="flex items-center space-x-2">
                        <span title="ady">{{ option.name }}</span>
                        <span title="olcegi">
                            {{ formattedMeasurement(option) }}
                        </span>
                    </div>
                </button>

                <div v-if="!filteredOptions.length" class="px-6 py-4 text-sm text-gray-400">
                    Netije tapylmady
                </div>
            </div>

            <div v-if="activeTab === 2" class="overflow-y-auto space-y-6 p-4">
                <SimpleSelect :isSearch="true" v-model="formData.item_type" :options="itemTypeOptions" placeholder="Type" />
                <div class="flex items-center space-x-4">
                    <div class="flex-1 flex flex-col space-y-2">
                        <label for="weight" class="text-sm font-medium text-[#222222]">Agramy</label>
                        <form-input id="weight" v-model="formData.weight" type="text" />
                    </div>
                    <div class="flex-2 mt-[28px]">
                        <SimpleSelect v-model="formData.measurement" :options="measurementOptions" placeholder="" />
                    </div>
                </div>
                <div class="">
                    <div class="flex flex-col space-y-2">
                        <span class="text-sm font-medium text-[#222222]">Ölçegi, sm</span>
                        <p class="text-[12px] text-[#939393]">Giňligi, uzynlygy, beýikligi</p>
                        <div class="grid grid-cols-3 gap-3">
                            <form-input v-model="formData.width" type="number" />
                            <form-input v-model="formData.length" type="number" />
                            <form-input v-model="formData.height" type="number" />
                        </div>
                    </div>
                </div>
                <!-- Submit button -->
                <button @click="selectTakyk"
                    class="w-full bg-custom-gradient h-[52px] flex items-center justify-center rounded-full text-white font-bold transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                    Saýlamak
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { normalizeToIdLabel } from '@/utils/normalizers/optionNormalizer.js'
const itemCategoryStore = useItemCategoryStore()
const measurementStore = useMeasurementStore()
const { icons } = useIcons()
/* ---------------- PROPS ---------------- */
const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    options: {
        type: Array,
        required: true
    },
    placeholder: {
        type: String,
        default: 'Saýlaň'
    },
    isSearch: Boolean,
    icon: String
})

const emit = defineEmits(['update:modelValue', 'change'])
const activeTab = ref(1)
const tabs = [
    {
        id: 1,
        label: 'Takmynan'
    },
    {
        id: 2,
        label: 'Takyk'
    }
]
const measurementOptions = ref([])
const itemTypeOptions = ref([])

const formData = ref({
    item_type: null,
    weight: null,
    measurement: null,
    length: null,
    width: null,
    height: null
})

/* ---------------- STATE ---------------- */
const search = ref('')
const isOpen = ref(false)
const wrapper = ref(null)

/* ---------------- COMPUTED ---------------- */
const selectedOption = computed(() =>
    props.options.find(o => o.id === props.modelValue) || null
)

const filteredOptions = computed(() => {
    if (!props.isSearch || !search.value) return props.options

    return props.options.filter(option =>
        option.name.toLowerCase().includes(search.value.toLowerCase())
    )
})

/* ---------------- METHODS ---------------- */
const selectTakyk = () => {
    emit('change', {
        item_type: formData.value.item_type,
        width: formData.value.width,
        height: formData.value.height,
        length: formData.value.length,
        weight: formData.value.weight,
        measurement: formData.value.measurement
    })
    isOpen.value = false
    search.value = ''
}

const selectTakmynan = (value) => {
    emit('update:modelValue', value.id)
    emit('change', {
        item_size: value.id,
        width: value.width_m,
        height: value.height_m,
        length: value.length_m,
        weight: formData.value.weight,
        measurement: value.measurement
    })
    isOpen.value = false
    search.value = ''
}

const formattedMeasurement = (option) => {
    return `(${option.width_m}x${option.height_m}x${option.length_m} cm)`
}

/* ---------------- CLICK OUTSIDE ---------------- */
const handleClickOutside = (e) => {
    if (wrapper.value && !wrapper.value.contains(e.target)) {
        isOpen.value = false
    }
}

onMounted(async () => {
    await fetchData()
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})

const fetchData = async () => {
    await measurementStore.fetchMeasurements()
    await itemCategoryStore.fetchItemCategories()
    itemTypeOptions.value = normalizeToIdLabel(itemCategoryStore.item_categories)
    measurementOptions.value = normalizeToIdLabel(measurementStore.measurements)
}
</script>
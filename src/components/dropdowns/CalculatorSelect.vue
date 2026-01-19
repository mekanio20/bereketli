<template>
    <div ref="wrapper" class="relative w-full">
        <!-- Trigger Button -->
        <button type="button" @click="toggle" class="w-full relative bg-[#EBF3FD] font-medium px-6 py-[13px] rounded-[10px]
             flex items-center justify-between transition-all duration-300"
            :class="[modelValue.length > 0 ? 'text-[#222222]' : 'text-[#838589]', icon && 'pl-12']">

            <!-- Icon -->
            <component v-if="icon" :is="icons[icon]" :color="'currentColor'" class="absolute left-6"
                :class="[modelValue.length > 0 ? 'text-[#222222]' : 'text-[#838589]']" />

            <span class="text-base truncate max-w-[200px]">
                {{ modelValue || placeholder }}
            </span>

            <chevron_down-icon :class="[
                'transition-transform duration-300',
                isOpen && 'rotate-180'
            ]" :color="'#222222'" :size="20" />
        </button>


        <!-- Dropdown -->
        <div v-show="isOpen" class="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
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
            <div v-if="activeTab === 1" class="max-h-72 overflow-y-auto">
                <!-- Search -->
                <div v-if="isSearch" class="p-3 border-b">
                    <input v-model="search" type="text" placeholder="Gözle..." class="w-full px-4 py-2 rounded-lg bg-[#F5F7FA]
                 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <button v-for="option in filteredOptions" :key="option" @click="select(option)" class="w-full text-left px-6 py-3
                 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100
                 transition-all duration-200 text-gray-700 font-medium flex items-center space-x-4">
                    <img :src="option.img" class="w-[36px] object-cover" />
                    <span>{{ option.label }}</span>
                </button>

                <div v-if="!filteredOptions.length" class="px-6 py-4 text-sm text-gray-400">
                    Netije tapylmady
                </div>
            </div>

            <div v-if="activeTab === 2" class="overflow-y-auto space-y-6 p-4">
                <div class="flex items-center space-x-4">
                    <div class="flex-1 flex flex-col space-y-2">
                        <label for="name" class="text-sm font-medium text-[#222222]">Ady</label>
                        <form-input id="name" v-model="formData.name" type="text" />
                    </div>
                    <div class="mt-[28px]">
                        <SimpleSelect v-model="formData.agram" :options="['kg', 'g', 't']" placeholder="Agram" />
                    </div>
                </div>
                <div class="">
                    <div class="flex flex-col space-y-2">
                        <span class="text-sm font-medium text-[#222222]">Ölçegi, sm</span>
                        <p class="text-[12px] text-[#939393]">Giňligi, uzynlygy, beýikligi</p>
                        <div class="grid grid-cols-3 gap-3">
                            <form-input v-model="formData.dimensions" type="number" />
                            <form-input v-model="formData.length" type="number" />
                            <form-input v-model="formData.height" type="number" />
                        </div>
                    </div>
                </div>
                <!-- Submit button -->
                <button @click="submit"
                    class="w-full bg-custom-gradient h-[52px] flex items-center justify-center rounded-full text-white font-bold transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">Hasaplamak</button>
            </div>
        </div>
    </div>
</template>

<script setup>
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
    isSearch: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String
    }
})

const emit = defineEmits(['update:modelValue'])
const activeTab = ref(1)
const tabs = [
    {
        id: 1,
        label: 'Takyk'
    },
    {
        id: 2,
        label: 'Takmynan'
    }
]
const formData = ref({
    name: '',
    agram: 'kg',
    dimensions: null,
    length: null,
    height: null
})

/* ---------------- STATE ---------------- */
const isOpen = ref(false)
const search = ref('')
const wrapper = ref(null)

/* ---------------- COMPUTED ---------------- */
const filteredOptions = computed(() => {
    if (!props.isSearch || !search.value) return props.options

    return props.options.filter(option =>
        option.toLowerCase().includes(search.value.toLowerCase())
    )
})

/* ---------------- METHODS ---------------- */
const toggle = () => {
    isOpen.value = !isOpen.value
}

const select = (value) => {
    emit('update:modelValue', value)
    isOpen.value = false
    search.value = ''
}

/* ---------------- CLICK OUTSIDE ---------------- */
const handleClickOutside = (e) => {
    if (wrapper.value && !wrapper.value.contains(e.target)) {
        isOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>
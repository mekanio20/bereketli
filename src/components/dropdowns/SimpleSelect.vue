<template>
    <div ref="wrapper" class="relative w-full">
        <!-- Trigger Button -->
        <button type="button" :disabled="readonly" @click="isOpen = !isOpen" class="w-full relative bg-[#EBF3FD] font-medium px-6 py-[13px] rounded-[10px]
             flex items-center justify-between transition-all duration-300" :class="[
                selectedOption ? 'text-[#222222]' : 'text-[#838589]', icon && 'pl-12']">

            <!-- Icon -->
            <component v-if="icon" :is="icons[icon]" :color="'currentColor'" class="absolute left-6"
                :class="[selectedOption ? 'text-[#222222]' : 'text-[#838589]']" />

            <span class="sm:text-base text-sm truncate max-w-[200px]" :class="{ 'h-[24px]': readonly }">
                {{ selectedOption?.label || placeholder }}
            </span>

            <chevron_down-icon v-if="!readonly" :class="[
                'transition-transform duration-300',
                isOpen && 'rotate-180'
            ]" :color="'#222222'" :size="20" />
        </button>

        <!-- Dropdown -->
        <div v-show="isOpen" class="absolute z-30 w-full mt-2 bg-white rounded-2xl shadow-md overflow-hidden">
            <!-- Search -->
            <div v-if="isSearch" class="p-3 border-b">
                <input v-model="search" type="text" placeholder="Gözle..." class="w-full px-4 py-2 rounded-lg bg-[#F5F7FA]
                 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-base text-sm" />
            </div>

            <!-- Options -->
            <div class="max-h-60 overflow-y-auto">
                <button type="button" v-for="option in filteredOptions" :key="option.id" @click="select(option)" class="w-full text-left px-6 py-3
                 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100
                 transition-all duration-200 text-gray-700 font-medium sm:text-base text-sm">
                    {{ option.label }}
                </button>

                <div v-if="!filteredOptions.length" class="px-6 py-4 sm:text-sm text-xs text-gray-400">
                    Netije tapylmady
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { icons } = useIcons()
/* ---------------- EMITS ---------------- */
const emit = defineEmits(['update:modelValue', 'change'])
/* ---------------- PROPS ---------------- */
const props = defineProps({
    modelValue: {
        type: [String, Number, null],
        default: null
    },
    options: {
        type: Array,
        required: true
    },
    placeholder: {
        type: String,
        default: ''
    },
    isSearch: Boolean,
    readonly: Boolean,
    icon: String
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
    return props.options.filter(o =>
        o.label?.toLowerCase().includes(search.value.toLowerCase())
    )
})

/* ---------------- METHODS ---------------- */
const select = (option) => {
    emit('update:modelValue', option.id)
    emit('change', option)
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
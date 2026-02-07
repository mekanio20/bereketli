<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="isOpen"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                @click.self="$emit('close')">
                <div class="relative w-full max-w-[800px] max-h-[710px] bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300"
                    :class="{ 'animate-scale-in': isOpen }">
                    <!-- Close Button -->
                    <button type="button" @click="$emit('close')"
                        class="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#F3F8FF] hover:bg-[#edf5ff] hover:scale-110 transform transition-all duration-300 group"
                        aria-label="Close">
                        <close-icon :size="20" />
                    </button>

                    <div class="p-8 md:p-10">
                        <!-- Header -->
                        <h2 class="text-[30px] text-[#222222] font-bold mb-8 text-center animate-fade-in">
                            {{ mode === 'add' ? 'Täze haryt goşmak' : 'Harydy redaktirläň' }}
                        </h2>

                        <!-- Tab Buttons -->
                        <div class="flex max-w-[320px] mx-auto gap-0 p-1 mb-8 animate-slide-up bg-[#002645] rounded-[10px]"
                            style="animation-delay: 0.1s">
                            <button @click="activeTab = 'individual'"
                                class="flex-1 py-[9px] px-6 font-semibold transition-all duration-300 rounded-lg"
                                :class="activeTab === 'individual' ? 'bg-white text-[#002645] z-10' : 'bg-[#002645] text-white'">
                                Takyk
                            </button>
                            <button @click="activeTab = 'approximate'"
                                class="flex-1 py-[9px] px-6 font-semibold transition-all duration-300 rounded-lg -ml-px"
                                :class="activeTab === 'approximate' ? 'bg-white text-[#002645] z-10' : 'bg-[#002645] text-white'">
                                Takmynan
                            </button>
                        </div>

                        <!-- Form -->
                        <form @submit.prevent="handleSubmit" class="space-y-6">
                            <Transition name="fade" mode="out-in">
                                <div v-if="activeTab === 'individual'" key="individual" class="space-y-2">
                                    <!-- Type and Weight -->
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <!-- size and Quantity -->
                                        <div>
                                            <label class="block text-sm text-[#939393] mb-2">Quantity</label>
                                            <form-input v-model="formData.quantity" type="number" />
                                        </div>
                                        <div>
                                            <label class="block text-sm text-[#939393] mb-2">Agramy</label>
                                            <div class="flex gap-2">
                                                <form-input v-model="formData.weight" type="number" />
                                                <SimpleSelect v-model="formData.weightUnit" :options="measurementItems"
                                                    class="flex-1" />
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Dimensions -->
                                    <div class="grid grid-cols-3 gap-3">
                                        <div class="space-y-2">
                                            <label class="text-sm text-[#939393]">Giňligi</label>
                                            <form-input v-model="formData.width" type="number" />
                                        </div>
                                        <div class="space-y-2">
                                            <label class="text-sm text-[#939393]">Uzynlygy</label>
                                            <form-input v-model="formData.length" type="number" />
                                        </div>
                                        <div class="space-y-2">
                                            <label class="text-sm text-[#939393]">Beýikligi</label>
                                            <form-input v-model="formData.height" type="number" />
                                        </div>
                                    </div>

                                    <!-- Description -->
                                    <div>
                                        <label class="block text-sm text-[#939393] mb-2">Description</label>
                                        <textarea v-model="formData.description" rows="2"
                                            class="bg-[#EBF3FD] text-[#222222] font-medium outline-none w-full px-[20px] py-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 resize-none"></textarea>
                                    </div>
                                </div>

                                <div v-else key="approximate" class="space-y-3 max-h-96 overflow-y-auto pb-2">
                                    <div class="grid grid-cols-3 gap-3">
                                        <div class="px-1">
                                            <label class="block text-sm text-[#939393] mb-2">Quantity</label>
                                            <form-input v-model="formData.quantity" type="number" />
                                        </div>
                                        <!-- Description -->
                                        <div class="px-1 col-span-2">
                                            <label class="block text-sm text-[#939393] mb-2">Description</label>
                                            <form-input v-model="formData.description" type="text" />
                                        </div>
                                    </div>
                                    <div v-for="item in approximateItems" :key="item.id" @click="selectItem(item)"
                                        class="flex items-center space-x-8 px-14 py-4 rounded-xl bg-[#EBF3FD] hover:bg-[#ddebff] cursor-pointer duration-100"
                                        :class="[findArrayItem(approximateData, 'id', item.id) ? 'bg-[#ddebff]' : '']">
                                        <div class="w-[58px] h-[40px]">
                                            <img :src="item.icon" class="w-full h-full object-cover" />
                                        </div>
                                        <div class="flex flex-col space-y-2">
                                            <h4 class="text-[#222222] font-semibold">{{ `${item.name} #${item.id}` }}
                                            </h4>
                                            <p class="text-[#838589] text-sm">{{ formattedMeasurement(item) }}</p>
                                        </div>
                                    </div>
                                </div>
                            </Transition>

                            <div class="flex items-center justify-center">
                                <!-- Submit Button -->
                                <button type="submit" :disabled="isSubmitting"
                                    class="w-fit px-28 py-4 bg-custom-gradient text-white font-semibold rounded-full transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                    <span v-if="!isSubmitting">Ýatda saklamak</span>
                                    <span v-else class="flex items-center justify-center">
                                        <animate_spin-icon />
                                        Ýüklenýär...
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { formattedMeasurement } from '@/utils/strings'
import { findArrayItem } from '@/utils/arrays'
const emit = defineEmits(['close', 'submit'])
const props = defineProps({
    mode: {
        type: String,
        default: 'add'
    },
    editData: {
        type: Object,
        default: () => ({})
    },
    approximateItems: {
        type: Array,
        default: () => []
    },
    measurementItems: {
        type: Array,
        default: () => []
    },
    isOpen: {
        type: Boolean,
        default: false
    }
})

const activeTab = ref('individual')
const isSubmitting = ref(false)

const approximateData = ref([])
const formData = reactive({
    type: '',
    weight: null,
    weightUnit: '',
    width: null,
    length: null,
    height: null,
    size: null,
    quantity: null,
    description: ''
})

const handleSubmit = async () => {
    isSubmitting.value = true

    try {
        if (activeTab.value === 'approximate') {
            const selected = approximateData.value[0]
            if (!selected) {
                isSubmitting.value = false
                return
            }

            emit('submit', {
                tab: 'approximate',
                mode: props.mode,
                data: {
                    ...selected,
                    description: formData.description,
                    quantity: formData.quantity
                }
            })
        } else {
            const individualItem = {
                name: formData.type || 'Item',
                description: formData.description,
                size: formData.size,
                weight_kg: formData.weight,
                length_m: formData.length,
                width_m: formData.width,
                height_m: formData.height,
                measurement: formData.weightUnit,
                quantity: formData.quantity
            }

            emit('submit', {
                tab: 'individual',
                mode: props.mode,
                data: individualItem
            })
        }

        emit('close')
        resetForm()
    } catch (error) {
        console.error('Submission error:', error)
    } finally {
        isSubmitting.value = false
    }
}

const selectItem = (item) => {
    if (findArrayItem(approximateData.value, 'id', item.id)) {
        approximateData.value = []
        return
    }

    approximateData.value = [{
        id: item.id,
        name: item.name || 'Item',
        description: formData.description,
        size: item.id,
        weight_kg: item.weight_kg,
        length_m: item.length_m,
        width_m: item.width_m,
        height_m: item.height_m,
        measurement: item.measurement,
        quantity: formData.quantity
    }]
}

const resetForm = () => {
    formData.type = ''
    formData.weight = null
    formData.weightUnit = ''
    formData.width = null
    formData.length = null
    formData.height = null
    formData.size = null
    formData.quantity = null
    formData.description = ''
    approximateData.value = []
    activeTab.value = 'individual'
}

const initEditState = () => {
    if (props.mode !== 'edit' || !props.editData) {
        resetForm()
        return
    }

    const item = props.editData
    const tab = item.tab || 'approximate'
    activeTab.value = tab

    if (tab === 'approximate') {
        approximateData.value = [item]
        formData.quantity = item.quantity ?? null
        formData.description = item.description ?? ''
    } else {
        formData.type = item.name || ''
        formData.weight = item.weight_kg ?? null
        formData.width = item.width_m ?? null
        formData.length = item.length_m ?? null
        formData.height = item.height_m ?? null
        formData.size = item.size ?? null
        formData.quantity = item.quantity ?? null
        formData.description = item.description ?? ''
    }
}

onMounted(() => {
    if (props.mode === 'edit' && props.isOpen) {
        initEditState()
    } else {
        resetForm()
    }
})

watch(
    () => [props.isOpen, props.mode, props.editData],
    ([isOpen]) => {
        if (isOpen && props.mode === 'edit') {
            initEditState()
        }
    },
    { deep: true }
)
</script>

<style scoped>
/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .animate-scale-in {
    animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
    from {
        transform: scale(0.95);
        opacity: 0;
    }

    to {
        transform: scale(1);
        opacity: 1;
    }
}

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
    animation: fadeIn 0.5s ease-out;
}

.animate-slide-up {
    animation: slideUp 0.6s ease-out;
    opacity: 0;
    animation-fill-mode: forwards;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
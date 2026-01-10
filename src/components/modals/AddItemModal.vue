<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="isOpen"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                @click.self="closeModal">
                <div class="relative w-full max-w-[800px] max-h-[710px] bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300"
                    :class="{ 'animate-scale-in': isOpen }">
                    <!-- Close Button -->
                    <button @click="closeModal"
                        class="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#F3F8FF] hover:bg-[#edf5ff] hover:scale-110 transform transition-all duration-300 group"
                        aria-label="Close">
                        <close-icon :size="20" />
                    </button>

                    <div class="p-8 md:p-10">
                        <!-- Header -->
                        <h2 class="text-[30px] text-[#222222] font-bold mb-8 text-center animate-fade-in">
                            Add Item
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
                                <div v-if="activeTab === 'individual'" key="individual" class="space-y-6">
                                    <!-- Type and Weight -->
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label class="block text-sm text-[#939393] mb-2">Type</label>
                                            <SimpleSelect v-model="formData.fromLocation"
                                                :options="['Box', 'Package', 'Pallet']" placeholder="" />
                                        </div>
                                        <div>
                                            <label class="block text-sm text-[#939393] mb-2">Agramy</label>
                                            <div class="flex gap-2">
                                                <form-input v-model="formData.weight" type="number" />
                                                <SimpleSelect v-model="formData.weightUnit" :options="['kg', 'g', 't']"
                                                    class="flex-1" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <!-- Dimensions -->
                                            <label class="block text-sm text-[#939393] mb-2">Giňligi, uzynlygy,
                                                beýikligi</label>
                                            <div class="grid grid-cols-3 gap-3 h-[50px]">
                                                <form-input v-model="formData.dimensions" type="number" />
                                                <form-input v-model="formData.length" type="number" />
                                                <form-input v-model="formData.height" type="number" />
                                            </div>
                                        </div>

                                        <!-- Volume and Quantity -->
                                        <div class="grid grid-cols-2 gap-4">
                                            <div>
                                                <label class="block text-sm text-[#939393] mb-2">Volume, m³</label>
                                                <form-input v-model="formData.volume" type="number" class="h-[50px]" />
                                            </div>

                                            <div>
                                                <label class="block text-sm text-[#939393] mb-2">Quantity</label>
                                                <form-input v-model="formData.quantity" type="number" class="h-[50px]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-else key="approximate" class="space-y-6">
                                    <p class="text-center text-[#939393] py-6">Takmynan form fields here</p>
                                </div>
                            </Transition>

                            <!-- Description -->
                            <div>
                                <label class="block text-sm text-[#939393] mb-2">Description</label>
                                <textarea v-model="formData.description" rows="2"
                                    class="bg-[#EBF3FD] text-[#222222] font-medium outline-none w-full px-[20px] py-4 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 resize-none"></textarea>
                            </div>

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
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close', 'submit'])
const activeTab = ref('individual')
const isSubmitting = ref(false)

const formData = reactive({
    type: '',
    weight: null,
    weightUnit: 'kg',
    width: null,
    length: null,
    height: null,
    volume: null,
    quantity: null,
    description: ''
})

const handleSubmit = async () => {
    isSubmitting.value = true

    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        emit('submit', {
            tab: activeTab.value,
            ...formData
        })

        closeModal()
        resetForm()
    } catch (error) {
        console.error('Submission error:', error)
    } finally {
        isSubmitting.value = false
    }
}

const closeModal = () => {
    emit('close')
}

const resetForm = () => {
    formData.type = ''
    formData.weight = null
    formData.weightUnit = 'kg'
    formData.width = null
    formData.length = null
    formData.height = null
    formData.volume = null
    formData.quantity = null
    formData.description = ''
    activeTab.value = 'individual'
}
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
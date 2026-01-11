<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="isOpen"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                @click.self="$emit('close')">
                <div class="relative w-full max-w-[620px] max-h-[560px] bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300"
                    :class="{ 'animate-scale-in': isOpen }">
                    <!-- Close Button -->
                    <button @click="$emit('close')"
                        class="absolute top-6 right-6 z-10 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-[#F3F8FF] hover:bg-[#edf5ff] hover:scale-110 transform transition-all duration-300 group"
                        aria-label="Close">
                        <close-icon :size="24" />
                    </button>

                    <div class="p-10">
                        <!-- Header -->
                        <div class="flex items-center space-x-4 mb-8">
                            <h3
                                class="text-[20px] font-bold text-[#222222] group-hover:text-[#002244] transition-colors">
                                {{ order.trackingNumber }}
                            </h3>
                            <span class="px-5 py-[7px] rounded-full text-sm font-medium" :class="statusBadgeClass">
                                {{ order.statusLabel }}
                            </span>
                        </div>

                        <!-- Route Information -->
                        <div class="flex items-center justify-between mb-6">
                            <div class="flex-1">
                                <p class="text-sm text-[#838589] mb-1">{{ order.fromDate }}</p>
                                <p class="text-lg font-medium text-[#222222]">{{ order.fromLocation }}</p>
                            </div>

                            <div class="flex-shrink-0 mx-4">
                                <chevron_group-icon />
                            </div>

                            <div class="flex-1 text-right">
                                <p class="text-sm text-[#838589] mb-1">{{ order.toDate }}</p>
                                <p class="text-lg font-medium text-[#222222]">{{ order.toLocation }}</p>
                            </div>
                        </div>

                        <!-- Progress Bar -->
                        <div class="my-[70px]">
                            <div
                                class="w-full flex items-center justify-between bg-[#DADADA] rounded-full h-[2px] relative">
                                <div class="w-3 h-3 rounded-full bg-custom-gradient z-10"></div>
                                <div class="w-3 h-3 rounded-full z-10"
                                    :class="[order.progress >= 25 ? 'bg-custom-gradient' : 'bg-[#DADADA]']"></div>
                                <div class="w-9 h-9 rounded-full z-10 flex items-center justify-center"
                                    :class="[order.progress >= 50 ? 'bg-custom-gradient visible-yellow-pulse' : 'bg-[#DADADA]']">
                                    <mingcute_ship_line-icon :size="18" />
                                </div>
                                <div class="w-3 h-3 rounded-full z-10"
                                    :class="[order.progress >= 75 ? 'bg-custom-gradient' : 'bg-[#DADADA]']"></div>
                                <div class="w-3 h-3 rounded-full z-10"
                                    :class="[order.progress >= 100 ? 'bg-custom-gradient' : 'bg-[#DADADA]']"></div>
                                <div class="absolute bg-custom-gradient h-[2px] rounded-full transition-all duration-500"
                                    :style="{ width: order.progress + '%' }"></div>
                            </div>
                        </div>

                        <!-- Status Message -->
                        <div class="flex items-center gap-3">
                            <div class="flex-shrink-0">
                                <dote_2-icon />
                            </div>
                            <div class="flex-1">
                                <p class="font-medium sm:text-base text-sm">
                                    <span class="text-[#838589]">Status:</span>
                                    <span class="ml-1 text-[#222222]">{{ order.statusText }}</span>
                                </p>
                            </div>
                        </div>

                        <div class="flex items-center space-x-4 mt-14">
                            <button type="button" class="bg-custom-gradient px-20 py-4 rounded-full text-white font-bold text-nowrap flex items-center space-x-2  hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">Doly görmek</button>
                            <button type="button" class="bg-[#002645] px-20 py-4 rounded-full text-white font-bold text-nowrap flex items-center space-x-2  hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                                <comment-icon />
                                <span>Habarlaşmak</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
const emit = defineEmits(['close'])
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})

const statusBadgeClass = computed(() => {
    switch (order.status) {
        case 'pending':
            return 'bg-[#FFECB4] text-[#D59E00]'
        case 'accepted':
            return 'bg-gradient-to-r from-green-100 to-green-200 text-green-800'
        case 'completed':
            return 'bg-[#B3FFCE] text-[#009D37]'
        case 'rejected':
            return 'bg-[#FFC1C0] text-[#B50200]'
        default:
            return 'bg-[#1490FF33] text-[#1490FF]'
    }
})

const order = ref({
    id: 1,
    trackingNumber: '#RW3E-74ESW4',
    status: 'pending',
    statusLabel: 'Garasylyar',
    statusText: 'Tianjin portyna getirildi',
    fromDate: '18.08.2025',
    fromLocation: 'Tianjin porty',
    toDate: '28.08.2025',
    toLocation: 'Aşgabat',
    progress: 65,
    type: 'road'
},)
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
</style>
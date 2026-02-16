<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="isOpen"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                @click.self="$emit('close')">
                <div class="relative w-full max-w-[800px] bg-white rounded-2xl shadow-2xl p-8 animate-scale-in">
                    <!-- Close Button -->
                    <button @click="$emit('close')"
                        class="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#F3F8FF] hover:bg-[#edf5ff] hover:scale-110 transform transition-all duration-300 group"
                        aria-label="Close">
                        <close-icon :size="20" />
                    </button>
                    <h3 class="text-2xl font-bold text-center text-[#002645] mb-4">{{ $t('names.total_price') }}</h3>

                    <div v-if="options.length > 0" class="flex flex-col space-y-2 pt-8">
                        <div v-for="(item, index) in options" :key="index" class="bg-[#F3F8FF] px-4 py-3 rounded-[18px] flex items-center justify-between">
                            <div class="flex items-center space-x-4">
                                <div class="w-[40px] h-[40px] rounded-full bg-[#FFBE00] flex items-center justify-center">
                                    <component :is="icons[getTypeIcon(item.type)]" :color="'#fff'" :size="20" />
                                </div>
                                <div class="flex flex-col space-y-1">
                                    <h4 class="text-[#222222] font-semibold">{{ item.type }}</h4>
                                    <p class="text-[#868686] text-sm">{{ $t('names.delivery') }}: {{ item.delivery_days }} {{ $t('names.day') }}</p>
                                </div>
                            </div>
                            <p class="font-bold text-[#222222] text-lg">{{ item.price.toFixed(2) }} TMT</p>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
const { icons } = useIcons()
defineEmits(['confirm', 'close'])
defineProps({
    isOpen: Boolean,
    options: Array
})

const getTypeIcon = (type) => {
    switch (type) {
        case 'AIR':
            return 'plane-icon'
        case 'SEA':
            return 'mingcute_ship_line-icon'
        case 'LAND':
            return 'truck_delivery-icon'
        case 'RAIL':
            return 'train_2-icon'
    }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
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

.animate-scale-in {
    animation: scaleIn 0.3s ease-out;
}
</style>
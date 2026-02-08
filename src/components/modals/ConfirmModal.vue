<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="isOpen"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                @click.self="$emit('cancel')">
                <div class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-scale-in">
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ title }}</h3>
                    <p class="text-gray-600 mb-8">{{ message }}</p>

                    <div class="flex gap-3">
                        <button @click="$emit('cancel')"
                            class="flex-1 py-3 px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300">
                            {{ cancelText }}
                        </button>
                        <button @click="$emit('confirm')"
                            class="flex-1 flex items-center justify-center space-x-2 py-3 px-6 font-semibold rounded-xl transition-all duration-300" :class="[type === 'danger'
                                ? 'bg-red-600 text-white hover:bg-red-700'
                                : 'bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:shadow-lg', loading ? 'opacity-50 cursor-not-allowed' : '']">
                                <span>{{ confirmText }}</span>
                                <animate_spin-icon v-if="loading" />
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
defineProps({
    isOpen: Boolean,
    title: String,
    message: String,
    confirmText: { type: String, default: 'Confirm' },
    cancelText: { type: String, default: 'Cancel' },
    type: { type: String, default: 'normal' },
    loading: { type: Boolean, default: false }
})

defineEmits(['confirm', 'cancel'])
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
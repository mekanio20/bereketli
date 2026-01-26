<template>
    <section class="container mx-auto px-4 sm:px-0">
        <h2 class="text-[44px] text-[#222222] font-semibold pb-10" :class="{'text-center' : isCenter}">{{ title }}</h2>
        <slot></slot>
        <!-- Accordion Container -->
        <div class="space-y-4">
            <!-- Accordion Items -->
            <div v-for="(item, index) in data" :key="index"
                class="accordion-item backdrop-blur-sm border-b-[0.5px] border-[#C0C0C0] overflow-hidden transition-all duration-300 hover:border-gray-700/70 bottom_scroll">
                <!-- Accordion Header -->
                <button @click="$emit('toggle', index)"
                    class="w-full py-4 flex items-center justify-between text-left focus:outline-none transition-all duration-200 group"
                    :class="{ 'pb-4': item.isOpen }">
                    <!-- Question Text -->
                    <h3
                        class="text-[#222222] text-sm font-inter sm:text-lg font-medium leading-relaxed pr-4 group-hover:text-[#F98900] transition-colors duration-200">
                        {{ item.question }}
                    </h3>

                    <!-- Plus/Minus Icon -->
                    <div class="flex-shrink-0 ml-4">
                        <div class="w-[50px] h-[50px] flex items-center justify-center transition-all duration-300 ease-in-out bg-custom-gradient rounded-full"
                            :class="{ 'rotate-45': item.isOpen }">
                            <!-- Plus Icon -->
                            <plus-icon class="text-white transition-all duration-300"
                                :class="{ 'scale-110': item.isOpen }" />
                        </div>
                    </div>
                </button>

                <!-- Accordion Content -->
                <div class="accordion-content overflow-hidden transition-all duration-500 ease-in-out" :style="{
                    maxHeight: item.isOpen ? item.contentHeight + 'px' : '0px',
                    opacity: item.isOpen ? 1 : 0
                }" ref="contentRefs">
                    <div class="pb-6 text-[#222222] sm:text-base text-sm leading-relaxed"
                        :class="{ 'animate-fade-in': item.isOpen }">
                        <div class="pt-4">
                            {{ item.answer }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const emit = defineEmits(['toggle', 'setContentHeight'])
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    isCenter: {
        type: Boolean,
        default: false
    },
    data: {
        type: Array,
        required: true
    }
})
const contentRefs = ref([])
onMounted(async () => {
    await nextTick()
    props.data.forEach((item, index) => {
        const contentEl = contentRefs.value[index]
        if (contentEl) {
            emit('setContentHeight', index, contentEl.scrollHeight)
        }
    })
})
</script>

<style scoped>
/* Smooth accordion animations */
.accordion-item {
    transform: translateY(0);
    transition: all 0.3s ease;
}

.accordion-item:hover {
    transform: translateY(-2px);
}

.accordion-content {
    will-change: max-height, opacity;
}

/* Fade in animation for content */
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.4s ease-out 0.1s both;
}

/* Focus states for accessibility */
button:focus {
    outline: none;
}

/* Smooth icon rotation */
.rotate-45 {
    transform: rotate(45deg);
}

/* Responsive adjustments */
@media (max-width: 640px) {
    .accordion-item button {
        padding: 1.25rem;
    }

    .accordion-content>div {
        padding: 1.25rem;
        padding-top: 1rem;
    }
}

/* Hover effect for the plus icon */
.group:hover svg {
    transform: scale(1.1);
    color: rgba(255, 255, 255, 0.9);
}

/* Backdrop blur support check */
@supports not (backdrop-filter: blur(12px)) {
    .accordion-item {
        background: rgba(250, 250, 250, 0.764);
    }
}
</style>
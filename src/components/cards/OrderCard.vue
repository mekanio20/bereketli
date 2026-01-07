<template>
    <article
        class="bg-white rounded-2xl border border-[#F5F5F5] hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden group"
        @click="$emit('click')">
        <div class="p-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-8">
                <h3 class="text-[20px] font-bold text-[#222222] group-hover:text-[#002244] transition-colors">
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
                <div class="w-full flex items-center justify-between bg-[#DADADA] rounded-full h-[2px] relative">
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
        </div>
    </article>
</template>

<script setup>
defineEmits(['click'])
const props = defineProps({
    order: {
        type: Object,
        required: true
    }
})

const statusBadgeClass = computed(() => {
    switch (props.order.status) {
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
</script>
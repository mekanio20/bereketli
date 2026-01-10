<template>
    <article
        class="bg-white rounded-2xl border border-[#F5F5F5] hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden group"
        @click="$emit('click')">
        <div class="px-6 py-8">
            <!-- Route Information -->
            <div class="flex items-center justify-between mb-10">
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

            <div class="flex items-center justify-between mb-10">
                <p class="text-[#838589] font-medium">
                    Arzanyň döredilen wagty:
                </p>
                <p class="text-[#222222] font-medium">
                    {{ order.createdAt }}
                </p>
            </div>

            <div class="text-sm font-medium px-7 py-2 rounded-full w-fit" :class="statusBadgeClass">
                {{ order.statusText }}
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
            return 'bg-[#1490FF33] text-[#1490FF]'
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
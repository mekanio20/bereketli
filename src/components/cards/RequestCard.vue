<template>
    <article
        class="bg-white rounded-2xl border border-[#F5F5F5] hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden group"
        @click="$emit('click')">
        <div class="px-6 py-8">
            <!-- Route Information -->
            <div class="flex items-center justify-between mb-10">
                <div class="flex-1">
                    <p class="text-sm text-[#838589] mb-1">{{ order.date_shipment_expected }}</p>
                    <p class="text-lg font-medium text-[#222222]">{{ order.from_country?.name }}</p>
                </div>

                <div class="flex-shrink-0 mx-4">
                    <chevron_group-icon />
                </div>

                <div class="flex-1 text-right">
                    <p class="text-sm text-[#838589] mb-1">{{ order.date_arrival_expected }}</p>
                    <p class="text-lg font-medium text-[#222222]">{{ order.to_country?.name }}</p>
                </div>
            </div>

            <div class="flex items-center justify-between mb-10">
                <p class="text-[#838589] font-medium">
                    {{ $t('info.created_at') }}:
                </p>
                <p class="text-[#222222] font-medium">
                    {{ order.date_created }}
                </p>
            </div>

            <div class="text-sm font-medium px-7 py-2 rounded-full w-fit" :class="statusBadgeClass(order.status)">
                {{ getStatusLabel(order.status) }}
            </div>

        </div>
    </article>
</template>

<script setup>
import { statusBadgeClass, getStatusLabel } from '@/utils/switch';
defineEmits(['click'])
const props = defineProps({
    order: {
        type: Object,
        required: true
    }
})
</script>
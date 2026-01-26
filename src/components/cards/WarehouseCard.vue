<template>
    <article
        class="bg-white rounded-[20px] border border-[#F5F5F5] hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden group p-6"
        @click="$emit('click')">
        <!-- Header -->
        <div class="flex items-start justify-between mb-6">
            <div class="flex items-center gap-3">
                <div
                    class="w-[50px] h-[50px] bg-[#F3F8FF] rounded-full flex items-center justify-center transition-all duration-300">
                    <map-icon />
                </div>
                <h3 class="text-lg font-semibold text-[#222222] group-hover:text-[#002244] transition-colors">
                    {{ warehouse.name }}
                </h3>
            </div>

            <span class="px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
                :class="[warehouse.isOpen ? 'bg-[#B3FFCE] text-[#009D37]' : 'bg-[#FFC1C0] text-[#B50200]']">
                {{ warehouse.isOpen ? 'Açyk' : 'Ýapyk' }}
            </span>
        </div>

        <!-- Divider -->
        <div class="h-px bg-[#EDEDED] mb-6"></div>

        <!-- Location -->
        <div class="flex items-start gap-3 mb-6">
            <div class="flex-shrink-0 mt-0.5">
                <map_pin-icon />
            </div>
            <div>
                <p class="text-base text-[#838589] mb-2 leading-[114.99999999999999%]">{{ warehouse.location }}</p>
                <p class="text-base font-medium text-[#222222]">{{ warehouse.address }}</p>
            </div>
        </div>

        <!-- Working Hours -->
        <div class="flex items-start gap-3">
            <div class="flex-shrink-0 mt-0.5 flex items-center space-x-1">
                <clock-icon />
            </div>
            <div>
                <p class="text-base text-[#838589] mb-2 leading-[114.99999999999999%]">Iş wagty</p>
                <p class="text-base font-medium text-gray-900">
                    {{ warehouse.work_hours_start }} / {{ warehouse.work_hours_end }}
                </p>
            </div>
        </div>

        <!-- Hover Effect Border -->
        <div
            class="absolute bottom-0 left-0 right-0 h-1 bg-custom-gradient transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left">
        </div>
    </article>
</template>

<script setup>
defineEmits(['click'])
const props = defineProps({
    warehouse: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
article {
    position: relative;
}
</style>
<template>
    <section class="overflow-x-hidden relative min-h-screen">
        <!-- Background -->
        <div class="absolute -z-10 w-full h-full bg-[#F3F8FF]">
            <img :src="background" class="w-full h-full object-contain" />
        </div>
        <MainContainer>
            <SectionContainer>
                <!-- Breadcrumb -->
                <bread-crumb class="mb-6 md:mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: $t('menu.orders'), to: '/order/history' },
                    { label: order?.code },
                ]" />

                <!-- Header -->
                <div class="mb-6 md:mb-10 animate-slide-down flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h1 class="section_title">
                        {{ $t('names.order_info') }}
                    </h1>
                    <!-- Action Buttons -->
                    <div class="w-full sm:w-auto">
                        <router-link
                            :to="{ name: 'Chat', query: { code: order.code } }"
                            class="w-full sm:w-auto py-3 px-8 bg-[#002645] text-white font-semibold rounded-full transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <message_circle-icon />
                            <span>{{ $t('menu.contacts') }}</span>
                        </router-link>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Main Content - Left Side -->
                    <div class="lg:col-span-2 space-y-6">
                        <!-- Order Info Card -->
                        <FormContainer class="animate-slide-up" style="animation-delay: 0.1s;">
                            <div class="flex flex-wrap items-start sm:items-center justify-between gap-3 mb-6">
                                <h2 class="text-xl sm:text-2xl font-bold text-[#222222] break-all">{{ order?.code }}</h2>
                                <span class="px-4 sm:px-5 py-[7px] rounded-full text-sm font-medium whitespace-nowrap"
                                    :class="statusBadgeClass(order?.status)">
                                    {{ getStatusLabel(order?.status) }}
                                </span>
                            </div>

                            <!-- Route -->
                            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 gap-4 sm:gap-0">
                                <div class="flex-1 w-full sm:w-auto">
                                    <p class="text-sm text-[#939393] mb-1">{{ order?.date_shipment_expected }}</p>
                                    <p class="text-base sm:text-lg font-medium text-[#222222]">{{ order?.from_country?.name }}</p>
                                </div>
                                <div class="flex-shrink-0 mx-4 sm:mx-6 self-center rotate-90 sm:rotate-0">
                                    <chevron_group-icon />
                                </div>
                                <div class="flex-1 w-full sm:w-auto sm:text-right">
                                    <p class="text-sm text-[#939393] mb-1">{{ order?.date_arrival_expected }}</p>
                                    <p class="text-base sm:text-lg font-medium text-[#222222]">{{ order?.to_country?.name }}</p>
                                </div>
                            </div>

                            <!-- Status -->
                            <div v-if="order?.notes" class="flex flex-wrap items-center gap-3 py-4">
                                <dote border_width="24px" border_height="24px" bg_width="12px" bg_height="12px"
                                    border_color="#FFA500" bg_color="#FFC359" />
                                <span class="font-medium text-[#838589]">{{ $t('info.status') }}:</span>
                                <span class="font-medium text-[#222222]">{{ order?.notes }}</span>
                            </div>

                            <!-- View on Map Button -->
                            <a target="_blank" :href="order?.location"
                                class="w-full sm:max-w-[400px] my-4 flex items-center justify-center gap-3 px-[10px] py-4 bg-[#002645] text-white rounded-full hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 group relative cursor-pointer">
                                <div
                                    class="w-10 h-10 absolute left-3 bg-white rounded-full flex items-center justify-center group-hover:scale-105 transform transition-all duration-300">
                                    <route-icon />
                                </div>
                                <span class="font-semibold pl-4 pr-6">{{ $t('buttons.view_map') }}</span>
                            </a>
                        </FormContainer>

                        <!-- Timeline Card -->
                        <FormContainer class="animate-slide-up" style="animation-delay: 0.2s">
                            <h3 class="text-[20px] sm:text-[22px] font-semibold text-[#222222] mb-6">{{ $t('names.order_statuses') }}</h3>

                            <div class="pt-6">
                                <!-- Timeline Item -->
                                <div v-for="(event, index) in timeline" :key="index" class="flex gap-3 sm:gap-4">
                                    <div class="flex flex-col items-center">
                                        <dote border_width="24px" border_height="24px" bg_width="12px" bg_height="12px"
                                            :border_color="index - 1 >= timeline.findIndex(e => e.status === String(order?.status).toLowerCase()) ? '#E5E7EB' : '#FFA500'"
                                            :bg_color="index - 1 >= timeline.findIndex(e => e.status === String(order?.status).toLowerCase()) ? '#E5E7EB' : '#FFA500'" />
                                        <div v-if="index < timeline.length - 1" class="flex-1" :style="{
                                            background: `repeating-linear-gradient(to bottom, ${index >= timeline.findIndex(e => e.status === String(order?.status).toLowerCase()) ? '#E5E7EB' : '#FFA500'}, ${index >= timeline.findIndex(e => e.status === String(order?.status).toLowerCase()) ? '#E5E7EB' : '#FFA500'} 5px, transparent 2px, transparent 8px)`,
                                            width: '1px'
                                        }"></div>
                                    </div>
                                    <div class="flex-1 pb-8 sm:pb-10">
                                        <p class="font-medium text-[#222222] mb-2 text-sm sm:text-base">{{ event.title }}</p>
                                    </div>
                                </div>
                            </div>
                        </FormContainer>
                    </div>

                    <!-- Right Sidebar -->
                    <div class="space-y-6">
                        <!-- Delivery Details Card -->
                        <FormContainer class="animate-slide-up" style="animation-delay: 0.3s">
                            <h3 class="text-[20px] sm:text-[22px] font-bold text-[#222222] mb-6">{{ $t('info.delivery') }}</h3>
                            <div class="space-y-4 sm:space-y-6">
                                <!-- From Incoterm -->
                                <div>
                                    <label class="block text-[#939393] mb-2 sm:mb-3 text-sm sm:text-base">{{ $t('forms.from_incoterm') }}</label>
                                    <div class="p-3 sm:p-4 bg-[#EBF3FD] rounded-[14px]">
                                        <p class="font-medium text-[#222222] text-sm sm:text-base">{{ order?.from_incoterm }}</p>
                                    </div>
                                </div>

                                <!-- To Incoterm -->
                                <div>
                                    <label class="block text-[#939393] mb-2 sm:mb-3 text-sm sm:text-base">{{ $t('forms.to_incoterm') }}</label>
                                    <div class="p-3 sm:p-4 bg-[#EBF3FD] rounded-[14px]">
                                        <p class="font-medium text-[#222222] text-sm sm:text-base">{{ order?.to_incoterm }}</p>
                                    </div>
                                </div>

                                <!-- Transport Type -->
                                <div>
                                    <label class="block text-[#939393] mb-2 sm:mb-3 text-sm sm:text-base">{{ $t('forms.transport_type') }}</label>
                                    <div class="flex items-center gap-3 p-3 sm:p-4 bg-[#EBF3FD] rounded-[14px]">
                                        <component :is="icons[getTransportTypeIcon(order?.transportation_type)]"
                                            color="#222222" />
                                        <span class="font-medium text-[#222222] text-sm sm:text-base">{{
                                            getTransportTypeLabel(order?.transportation_type) }}</span>
                                    </div>
                                </div>
                            </div>
                        </FormContainer>
                    </div>
                </div>
            </SectionContainer>
        </MainContainer>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n({ useScope: 'global' })

import background from '@/assets/images/background.webp'
import { statusBadgeClass, getStatusLabel, getTransportTypeLabel, getTransportTypeIcon } from '@/utils/switch'

const { icons } = useIcons()
const route = useRoute()
const orderStore = useOrderStore()
const { order } = storeToRefs(orderStore)

const timeline = ref([
    { title: t('data.timeline.title_1'), status: 'pending' },
    { title: t('data.timeline.title_2'), status: 'in_transit' },
    { title: t('data.timeline.title_3'), status: 'customs' },
    { title: t('data.timeline.title_4'), status: 'delivered' },
])

watch(() => route.params.id, async (newId) => {
    if (newId) await orderStore.fetchOrder(newId)
}, { immediate: true })
</script>

<style scoped>
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

.animate-slide-up {
    animation: slideUp 0.6s ease-out;
    opacity: 0;
    animation-fill-mode: forwards;
}
</style>
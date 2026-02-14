<template>
    <section class="overflow-x-hidden relative">
        <!-- Absolute -->
        <div class="absolute -z-10 w-full h-full bg-[#F3F8FF]">
            <img :src="background" class="w-full h-full object-contain" />
        </div>
        <MainContainer>
            <SectionContainer>
                <!-- Breadcrumb -->
                <bread-crumb class="mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: 'Sargytlar', to: '/order/history' },
                    { label: '#RW3E-74ESW4' }
                ]" />

                <!-- Header -->
                <div class="mb-10 animate-slide-down flex items-center justify-between">
                    <h1 class="section_title">
                        Sargyt maglumatlary
                    </h1>
                    <!-- Action Buttons -->
                    <div class="grid grid-cols-1 gap-3">
                        <!-- <button
                            class="py-3 bg-custom-gradient text-white font-semibold rounded-full transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                            <span>Hasap - Faktura</span>
                        </button> -->
                        <router-link :to="{ name: 'Chat', query: { code: order.code } }" class="py-3 px-10 bg-[#002645] text-white font-semibold rounded-full transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                            <message_circle-icon />
                            <span>Habarlaşmak</span>
                        </router-link>
                    </div>

                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Main Content - Left Side -->
                    <div class="lg:col-span-2 space-y-6">
                        <!-- Order Info Card -->
                        <FormContainer class="animate-slide-up" style="animation-delay: 0.1s;">
                            <div class="flex items-center justify-between mb-6">
                                <h2 class="text-2xl font-bold text-[#222222]">{{ order?.code }}</h2>
                                <span class="px-5 py-[7px] rounded-full text-sm font-medium"
                                    :class="statusBadgeClass(order?.status)">
                                    {{ getStatusLabel(order?.status) }}
                                </span>
                            </div>

                            <!-- Route -->
                            <div class="flex items-center justify-between py-6">
                                <div class="flex-1">
                                    <p class="text-sm text-[#939393] mb-1">{{ order?.date_shipment_expected }}</p>
                                    <p class="text-lg font-medium text-[#222222]">{{ order?.from_country?.name }}</p>
                                </div>
                                <div class="flex-shrink-0 mx-6">
                                    <chevron_group-icon />
                                </div>
                                <div class="flex-1 text-right">
                                    <p class="text-sm text-[#939393] mb-1">{{ order?.date_arrival_expected }}</p>
                                    <p class="text-lg font-medium text-[#222222]">{{ order?.to_country?.name }}</p>
                                </div>
                            </div>

                            <!-- Status -->
                            <div v-if="order?.notes" class="flex items-center gap-3 py-4">
                                <dote border_width="24px" border_height="24px" bg_width="12px" bg_height="12px"
                                    border_color="#FFA500" bg_color="#FFC359" />
                                <span class="font-medium text-[#838589]">Status:</span>
                                <span class="font-medium text-[#222222]">{{ order?.notes }}</span>
                            </div>

                            <!-- View on Map Button -->
                            <a target="_blank" :href="order?.location"
                                class="sm:w-[400px] my-4 flex items-center justify-center gap-3 px-[10px] py-4 bg-[#002645] text-white rounded-full hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 group relative cursor-pointer">
                                <div
                                    class="w-10 h-10 absolute left-3 bg-white rounded-full flex items-center justify-center group-hover:scale-105 transform transition-all duration-300">
                                    <route-icon />
                                </div>
                                <span class="font-semibold pl-4 pr-6">Kartada görmek</span>
                            </a>
                        </FormContainer>

                        <!-- Timeline Card -->
                        <FormContainer class="animate-slide-up" style="animation-delay: 0.2s">
                            <h3 class="text-[22px] font-semibold text-[#222222] mb-6">Sargydyň ýagdaýlary</h3>

                            <div class="pt-6">
                                <!-- Timeline Item -->
                                <div v-for="(event, index) in timeline" :key="index" class="flex gap-4">
                                    <div class="flex flex-col items-center">
                                        <dote border_width="24px" border_height="24px" bg_width="12px" bg_height="12px"
                                            :border_color="index - 1 >= timeline.findIndex(e => e.status === String(order?.status).toLowerCase()) ? '#E5E7EB' : '#FFA500'"
                                            :bg_color="index - 1 >= timeline.findIndex(e => e.status === String(order?.status).toLowerCase()) ? '#E5E7EB' : '#FFA500'" />
                                        <div v-if="index < timeline.length - 1" class="flex-1" :style="{
                                            background: `repeating-linear-gradient(to bottom, ${index >= timeline.findIndex(e => e.status === String(order?.status).toLowerCase()) ? '#E5E7EB' : '#FFA500'}, ${index >= timeline.findIndex(e => e.status === String(order?.status).toLowerCase()) ? '#E5E7EB' : '#FFA500'} 5px, transparent 2px, transparent 8px)`,
                                            width: '1px'
                                        }"></div>
                                    </div>
                                    <div class="flex-1 pb-10">
                                        <p class="font-medium text-[#222222] mb-2">{{ event.title }}</p>
                                    </div>
                                </div>
                            </div>
                        </FormContainer>
                    </div>

                    <!-- Right Sidebar -->
                    <div class="space-y-6">
                        <!-- Delivery Details Card -->
                        <FormContainer class="animate-slide-up" style="animation-delay: 0.3s">
                            <h3 class="text-[22px] font-bold text-[#222222] mb-6">Eltip bermek</h3>
                            <div class="space-y-6">
                                <!-- From Incoterm -->
                                <div>
                                    <label class="block text-[#939393] mb-3">From incoterm</label>
                                    <div class="p-4 bg-[#EBF3FD] rounded-[14px]">
                                        <p class="font-medium text-[#222222]">{{ order?.from_incoterm }}</p>
                                    </div>
                                </div>

                                <!-- To Incoterm -->
                                <div>
                                    <label class="block text-[#939393] mb-3">To incoterm</label>
                                    <div class="p-4 bg-[#EBF3FD] rounded-[14px]">
                                        <p class="font-medium text-[#222222]">{{ order?.to_incoterm }}</p>
                                    </div>
                                </div>

                                <!-- To Incoterm -->
                                <div>
                                    <label class="block text-[#939393] mb-3">Eltip bermek görnüşi</label>
                                    <div class="flex items-center gap-3 p-4 bg-[#EBF3FD] rounded-[14px]">
                                        <component :is="icons[getTransportTypeIcon(order?.transportation_type)]"
                                            color="#222222" />
                                        <span class="font-medium text-[#222222]">{{
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
import { statusBadgeClass, getStatusLabel, getTransportTypeLabel, getTransportTypeIcon } from '@/utils/switch'
import background from '@/assets/images/background.webp'
import router from '../router'
const { icons } = useIcons()
const route = useRoute()
const orderStore = useOrderStore()
const { order } = storeToRefs(orderStore)

const timeline = ref([
    { title: 'Ýük ölçelýär we bellikler goýulýar', status: 'pending' },
    { title: 'Ýük transitda', status: 'in_transit' },
    { title: 'Ýük barlag nokadynda barlanylýar', status: 'customs' },
    { title: 'Ýük müşderä gowşuryldy', status: 'delivered' },
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
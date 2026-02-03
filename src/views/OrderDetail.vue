<template>
    <section class="overflow-x-hidden relative">
        <!-- Absolute -->
        <div class="absolute -z-10 w-full h-full bg-[#F3F8FF]">
            <img :src="background" class="w-full h-full object-contain" />
        </div>
        <MainContainer>
            <SectionContainer class="pb-20">
                <!-- Breadcrumb -->
                <bread-crumb class="mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: 'Sargytlar', to: '/order/history' },
                    { label: '#RW3E-74ESW4' }
                ]" />

                <!-- Header -->
                <div class="mb-10 animate-slide-down">
                    <h1 class="section_title mb-8">
                        Sargyt maglumatlary
                    </h1>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Main Content - Left Side -->
                    <div class="lg:col-span-2 space-y-6">
                        <!-- Order Info Card -->
                        <div class="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style="animation-delay: 0.1s">
                            <div class="flex items-center justify-between mb-6">
                                <h2 class="text-2xl font-bold text-gray-900">#RW3E-74ESW4</h2>
                                <span
                                    class="px-4 py-2 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 rounded-full text-sm font-semibold">
                                    Garaşýar
                                </span>
                            </div>

                            <!-- Route -->
                            <div class="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
                                <div class="flex-1">
                                    <p class="text-sm text-gray-500 mb-1">18.08.2025</p>
                                    <p class="text-lg font-semibold text-gray-900">Tianjin porty</p>
                                </div>
                                <div class="flex-shrink-0 mx-6">
                                    <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <div class="flex-1 text-right">
                                    <p class="text-sm text-gray-500 mb-1">28.08.2025</p>
                                    <p class="text-lg font-semibold text-gray-900">Aşgabat</p>
                                </div>
                            </div>

                            <!-- Status -->
                            <div class="flex items-center gap-3 p-4 bg-orange-50 rounded-xl mb-6">
                                <div class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                                <span class="font-semibold text-gray-900">Status:</span>
                                <span class="text-gray-700">Tianjin portyna getirildi</span>
                            </div>

                            <!-- View on Map Button -->
                            <button
                                class="w-full py-4 bg-gradient-to-r from-[#002244] to-[#003366] text-white font-semibold rounded-xl hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                                <span>Kartada görmek</span>
                            </button>
                        </div>

                        <!-- Timeline Card -->
                        <div class="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style="animation-delay: 0.2s">
                            <h3 class="text-xl font-bold text-gray-900 mb-6">Sargydyň ýagdaýlary</h3>

                            <div class="space-y-6">
                                <!-- Timeline Item -->
                                <div v-for="(event, index) in timeline" :key="index" class="flex gap-4">
                                    <div class="flex flex-col items-center">
                                        <div class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                                            :class="getTimelineIconClass(event.status)">
                                            <div class="w-3 h-3 rounded-full"
                                                :class="getTimelineDotClass(event.status)">
                                            </div>
                                        </div>
                                        <div v-if="index < timeline.length - 1" class="w-0.5 flex-1 mt-2"
                                            :class="event.status === 'completed' ? 'bg-yellow-300' : 'bg-gray-200'">
                                        </div>
                                    </div>
                                    <div class="flex-1 pb-8">
                                        <p class="font-semibold text-gray-900 mb-1">{{ event.title }}</p>
                                        <p v-if="event.description" class="text-sm text-red-600 mb-2">{{
                                            event.description
                                        }}</p>
                                        <p class="text-sm text-gray-500">{{ event.date }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Sidebar -->
                    <div class="space-y-6">
                        <!-- Delivery Details Card -->
                        <div class="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style="animation-delay: 0.3s">
                            <h3 class="text-lg font-bold text-gray-900 mb-6">Eltip bermek</h3>

                            <div class="space-y-6">
                                <!-- Incoterm -->
                                <div>
                                    <label class="block text-sm text-gray-500 mb-2">Incoterm</label>
                                    <div class="p-4 bg-blue-50 rounded-xl">
                                        <p class="font-semibold text-gray-900">FOB (Free on Board)</p>
                                    </div>
                                </div>

                                <!-- From Location -->
                                <div>
                                    <label class="block text-sm text-gray-500 mb-2">Nirden</label>
                                    <div class="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                                        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span class="font-semibold text-gray-900">Şanhaý</span>
                                    </div>
                                </div>

                                <!-- Incoterm Type -->
                                <div>
                                    <label class="block text-sm text-gray-500 mb-2">Incoterm</label>
                                    <div class="p-4 bg-blue-50 rounded-xl">
                                        <p class="font-semibold text-gray-900">CPT (Carriage Paid To)</p>
                                    </div>
                                </div>

                                <!-- To Location -->
                                <div>
                                    <label class="block text-sm text-gray-500 mb-2">Nirä</label>
                                    <div class="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                                        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span class="font-semibold text-gray-900">Aşgabat</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Transport Type Card -->
                        <div class="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style="animation-delay: 0.4s">
                            <h3 class="text-lg font-bold text-gray-900 mb-6">Eltip bermek görnüşi</h3>
                            <div class="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-xl">
                                <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v-2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v2h-2z" />
                                </svg>
                                <span class="font-semibold text-gray-900">Gämi</span>
                            </div>
                        </div>

                        <!-- Route Card -->
                        <div class="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style="animation-delay: 0.5s">
                            <h3 class="text-lg font-bold text-gray-900 mb-6">Route</h3>
                            <div
                                class="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 border-dashed rounded-xl">
                                <p class="font-semibold text-gray-900 mb-2">Direct</p>
                                <p class="text-sm text-gray-600">1 hop/da</p>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="grid grid-cols-2 gap-3 animate-slide-up" style="animation-delay: 0.6s">
                            <button
                                class="py-3 bg-gradient-to-r from-[#002244] to-[#003366] text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span>Habarlaşmak</span>
                            </button>
                            <button
                                class="py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>Faktura</span>
                            </button>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </MainContainer>
    </section>
</template>

<script setup>
import background from '@/assets/images/background.webp'
const orderStore = useOrderStore()
const timeline = ref([
    {
        title: 'Ýük olçaýar we bellikler goýulýar',
        date: '18.08.2025',
        status: 'completed'
    },
    {
        title: 'Ýolda barlap nokadynda barlanýýar',
        date: '18.08.2025',
        status: 'completed'
    },
    {
        title: 'Ýük paýlaýyş merkezine geldi',
        date: '18.08.2025',
        status: 'completed'
    },
    {
        title: 'Ýük paýlaýyş merkezine geldi',
        description: 'Tehnki näsazlyklar sebäpli ýük wagtlaryn ugradylyp bilmesinndi',
        date: '18.08.2025',
        status: 'error'
    },
    {
        title: 'Ýük müşderi ettiýär',
        date: '',
        status: 'pending'
    },
    {
        title: 'Müşderi tarapyndan tassyklandy',
        date: '',
        status: 'pending'
    }
])

function getTimelineIconClass(status) {
    switch (status) {
        case 'completed':
            return 'bg-yellow-100'
        case 'error':
            return 'bg-red-100'
        case 'pending':
            return 'bg-gray-100'
        default:
            return 'bg-gray-100'
    }
}

function getTimelineDotClass(status) {
    switch (status) {
        case 'completed':
            return 'bg-yellow-500'
        case 'error':
            return 'bg-red-500'
        case 'pending':
            return 'bg-gray-300'
        default:
            return 'bg-gray-300'
    }
}

onMounted(async () => {
    
})

</script>

<style scoped>
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
    animation: fadeIn 0.6s ease-out;
}

.animate-slide-up {
    animation: slideUp 0.6s ease-out;
    opacity: 0;
    animation-fill-mode: forwards;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
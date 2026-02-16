<template>
    <div class="w-full min-h-screen bg-white">
        <Header />

        <div class="h-20"></div>

        <MainContainer>
            <div class="py-12 lg:py-20">
                <div class="mb-12 text-center">
                    <h1 class="text-4xl lg:text-5xl font-bold text-[#222222] mb-4">
                        {{ $t('privacy.name') }} <span class="text-gold-gradient">{{ $t('privacy.policy') }}</span>
                    </h1>
                    <p class="text-gray-600 text-lg">{{ $t('privacy.last_updated') }}: {{ lastUpdated }}</p>
                </div>

                <div class="max-w-4xl mx-auto space-y-8">
                    <section class="bg-[#F3F8FF] rounded-2xl p-8 lg:p-10">
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4">
                            {{ $t('privacy.introduction') }}
                        </h2>
                        <p class="text-gray-700 leading-relaxed">
                            {{ $t('privacy.intro_description') }}
                        </p>
                    </section>

                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            {{ $t('privacy.write_info') }}
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8 space-y-4">
                            <p class="text-gray-700 leading-relaxed">
                                {{ $t('privacy.we_following_info') }}
                            </p>
                            <ul class="space-y-3 ml-6">
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">•</span>
                                    <span class="text-gray-700">
                                        <strong class="text-[#222222]">{{ $t('privacy.personal_info') }}:</strong>
                                        {{ $t('privacy.personal_desc') }}
                                    </span>
                                </li>
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">•</span>
                                    <span class="text-gray-700">
                                        <strong class="text-[#222222]">{{ $t('privacy.order_info') }}:</strong>
                                        {{ $t('privacy.order_desc') }}
                                    </span>
                                </li>
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">•</span>
                                    <span class="text-gray-700">
                                        <strong class="text-[#222222]">{{ $t('privacy.teh_info') }}:</strong>
                                        {{ $t('privacy.teh_desc') }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            {{ $t('privacy.use_info') }}
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                            <p class="text-gray-700 leading-relaxed mb-4">
                                {{ $t('privacy.use_info_desc') }}
                            </p>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-[#F3F8FF] rounded-lg p-4">
                                    <h3 class="font-semibold text-[#222222] mb-2">{{ $t('privacy.service_info') }}</h3>
                                    <p class="text-sm text-gray-600">
                                        {{ $t('privacy.service_desc') }}
                                    </p>
                                </div>
                                <div class="bg-[#F3F8FF] rounded-lg p-4">
                                    <h3 class="font-semibold text-[#222222] mb-2">{{ $t('privacy.contact_info') }}</h3>
                                    <p class="text-sm text-gray-600">{{ $t('privacy.contact_desc') }}</p>
                                </div>
                                <div class="bg-[#F3F8FF] rounded-lg p-4">
                                    <h3 class="font-semibold text-[#222222] mb-2">{{ $t('privacy.service_improvement') }}</h3>
                                    <p class="text-sm text-gray-600">{{ $t('privacy.service_improvement_desc') }}</p>
                                </div>
                                <div class="bg-[#F3F8FF] rounded-lg p-4">
                                    <h3 class="font-semibold text-[#222222] mb-2">{{ $t('privacy.legal_info') }}</h3>
                                    <p class="text-sm text-gray-600">{{ $t('privacy.legal_desc') }}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            {{ $t('privacy.info_security') }}
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                            <p class="text-gray-700 leading-relaxed">
                                {{ $t('privacy.info_security_desc') }}
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            {{ $t('privacy.cookies') }}
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                            <p class="text-gray-700 leading-relaxed mb-4">
                               {{ $t('privacy.cookies_desc') }}
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            {{ $t('privacy.user_rights') }}
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8 space-y-3">
                            <p class="text-gray-700 leading-relaxed">
                                {{ $t('privacy.user_rights_desc') }}
                            </p>
                            <ul class="space-y-2 ml-6">
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">✓</span>
                                    <span class="text-gray-700">{{ $t('privacy.r1') }}</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">✓</span>
                                    <span class="text-gray-700">{{ $t('privacy.r2') }}</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">✓</span>
                                    <span class="text-gray-700">{{ $t('privacy.r3') }}</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">✓</span>
                                    <span class="text-gray-700">{{ $t('privacy.r4') }}</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            {{ $t('privacy.contact') }}
                        </h2>
                        <div
                            class="bg-gradient-to-r from-[#F3F8FF] to-white border border-gray-200 rounded-xl p-6 lg:p-8">
                            <p class="text-gray-700 leading-relaxed mb-4">
                                {{ $t('privacy.desc') }}
                            </p>
                            <div class="space-y-2">
                                <p class="text-gray-700">
                                    <strong class="text-[#222222]">{{ $t('forms.email') }}:</strong>
                                    <a href="mailto:info@bereketlilogistika.com" class="text-[#F98900] hover:underline">
                                        info@bereketlilogistika.com
                                    </a>
                                </p>
                                <p class="text-gray-700">
                                    <strong class="text-[#222222]">{{ $t('forms.phone') }}:</strong>
                                    <a href="tel:+99371984704" class="text-[#F98900] hover:underline">
                                        +99371984704
                                    </a>
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            {{ $t('privacy.updates') }}
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                            <p class="text-gray-700 leading-relaxed">
                                {{ $t('privacy.updates_desc') }}
                            </p>
                        </div>
                    </section>
                </div>

                <div class="mt-12 text-center">
                    <router-link to="/"
                        class="inline-flex items-center px-8 py-3 bg-custom-gradient text-white rounded-[10px] hover:scale-95 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
                        {{ $t('menu.home_page') }}
                        <arrow_right-icon class="ml-2" :size="20" color="white" />
                    </router-link>
                </div>
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
const lastUpdated = ref(new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}))
</script>
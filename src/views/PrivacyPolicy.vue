<template>
    <div class="w-full min-h-screen bg-white">
        <Header />

        <div class="h-20"></div>

        <MainContainer>
            <div class="py-12 lg:py-20">
                <div class="mb-12 text-center">
                    <h1 class="text-4xl lg:text-5xl font-bold text-[#222222] mb-4">
                        Privacy <span class="text-gold-gradient">Policy</span>
                    </h1>
                    <p class="text-gray-600 text-lg">Last updated: {{ lastUpdated }}</p>
                </div>

                <div class="max-w-4xl mx-auto space-y-8">
                    <section class="bg-[#F3F8FF] rounded-2xl p-8 lg:p-10">
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4">
                            Introduction
                        </h2>
                        <p class="text-gray-700 leading-relaxed">
                            Our privacy policy explains how your personal information is collected,
                            used, and protected. This page describes how your data is handled
                            when you use our services.
                        </p>
                    </section>

                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            Data Collection
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8 space-y-4">
                            <p class="text-gray-700 leading-relaxed">
                                We may collect the following information:
                            </p>
                            <ul class="space-y-3 ml-6">
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">•</span>
                                    <span class="text-gray-700">
                                        <strong class="text-[#222222]">Personal information:</strong>
                                        Your name, email address, phone number, and other contact information
                                    </span>
                                </li>
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">•</span>
                                    <span class="text-gray-700">
                                        <strong class="text-[#222222]">Order information:</strong>
                                        Your orders, delivery addresses, and logistics information
                                    </span>
                                </li>
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">•</span>
                                    <span class="text-gray-700">
                                        <strong class="text-[#222222]">Technical data:</strong>
                                        Your IP address, browser type, time of use, and other automatically collected
                                        information
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            Data Usage
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                            <p class="text-gray-700 leading-relaxed mb-4">
                                We use the collected information for the following purposes:
                            </p>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-[#F3F8FF] rounded-lg p-4">
                                    <h3 class="font-semibold text-[#222222] mb-2">Service Fulfillment</h3>
                                    <p class="text-sm text-gray-600">Processing your orders and providing logistics
                                        services</p>
                                </div>
                                <div class="bg-[#F3F8FF] rounded-lg p-4">
                                    <h3 class="font-semibold text-[#222222] mb-2">Communication</h3>
                                    <p class="text-sm text-gray-600">Informing you about your orders</p>
                                </div>
                                <div class="bg-[#F3F8FF] rounded-lg p-4">
                                    <h3 class="font-semibold text-[#222222] mb-2">Improving Services</h3>
                                    <p class="text-sm text-gray-600">Developing our platform and services</p>
                                </div>
                                <div class="bg-[#F3F8FF] rounded-lg p-4">
                                    <h3 class="font-semibold text-[#222222] mb-2">Legal Requirements</h3>
                                    <p class="text-sm text-gray-600">Fulfilling our legal obligations</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            Data Protection
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                            <p class="text-gray-700 leading-relaxed">
                                We use established technical and organizational measures to protect your information.
                                We ensure your data is kept secure through strong encryption,
                                protected servers, and regulated access mechanisms.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            Cookies
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                            <p class="text-gray-700 leading-relaxed mb-4">
                                We use cookies to personalize our website and improve your user experience.
                                You can manage cookies through your browser settings.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            User Rights
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8 space-y-3">
                            <p class="text-gray-700 leading-relaxed">
                                You have the following rights:
                            </p>
                            <ul class="space-y-2 ml-6">
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">✓</span>
                                    <span class="text-gray-700">Accessing your personal data</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">✓</span>
                                    <span class="text-gray-700">Correcting or deleting your data</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">✓</span>
                                    <span class="text-gray-700">Objecting to the processing of your data</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">✓</span>
                                    <span class="text-gray-700">Data portability (exporting your data)</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            Contact Us
                        </h2>
                        <div
                            class="bg-gradient-to-r from-[#F3F8FF] to-white border border-gray-200 rounded-xl p-6 lg:p-8">
                            <p class="text-gray-700 leading-relaxed mb-4">
                                If you have any questions or complaints about our privacy policy,
                                please contact us using the information below:
                            </p>
                            <div class="space-y-2">
                                <p class="text-gray-700">
                                    <strong class="text-[#222222]">Email:</strong>
                                    <a href="mailto:info@bereketlilogistika.com" class="text-[#F98900] hover:underline">
                                        info@bereketlilogistika.com
                                    </a>
                                </p>
                                <p class="text-gray-700">
                                    <strong class="text-[#222222]">Phone:</strong>
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
                            Changes
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                            <p class="text-gray-700 leading-relaxed">
                                We may update this privacy policy from time to time. Changes will be
                                posted on this page and the "Last updated" date will be revised.
                                We recommend reviewing this page periodically to stay informed
                                about any changes in the policy.
                            </p>
                        </div>
                    </section>
                </div>

                <div class="mt-12 text-center">
                    <router-link to="/"
                        class="inline-flex items-center px-8 py-3 bg-custom-gradient text-white rounded-[10px] hover:scale-95 transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
                        Back to Home
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
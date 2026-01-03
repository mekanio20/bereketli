<template>
    <div class="w-full min-h-screen bg-white">
        <Header />
        
        <!-- Spacer for fixed header -->
        <div class="h-20"></div>

        <MainContainer>
            <div class="py-12 lg:py-20">
                <!-- Header Section -->
                <div class="mb-12 text-center">
                    <h1 class="text-4xl lg:text-5xl font-bold text-[#222222] mb-4">
                        Gizlinlik <span class="text-gold-gradient">Sýasaty</span>
                    </h1>
                    <p class="text-gray-600 text-lg">Soňky täzelendirilen: {{ lastUpdated }}</p>
                </div>

                <!-- Content Section -->
                <div class="max-w-4xl mx-auto space-y-8">
                    <!-- Introduction -->
                    <section class="bg-[#F3F8FF] rounded-2xl p-8 lg:p-10">
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4">
                            Giriş
                        </h2>
                        <p class="text-gray-700 leading-relaxed">
                            Biziň gizlinlik syýasatymyz, siziň şahsy maglumatlaryňyzyň nähili ýygnanylandygyny, 
                            ulanylandygyny we goragly saklanýandygyny düşündirýär. Bu sahypa biziň hyzmatlarymyzy 
                            ulananyňyzda, siziň maglumatlaryňyza nähili garamaklygyňyzy aňladýar.
                        </p>
                    </section>

                    <!-- Data Collection -->
                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            Maglumat Ýygnamak
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8 space-y-4">
                            <p class="text-gray-700 leading-relaxed">
                                Biz aşakdaky maglumatlary ýygnap bileris:
                            </p>
                            <ul class="space-y-3 ml-6">
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">•</span>
                                    <span class="text-gray-700">
                                        <strong class="text-[#222222]">Şahsy maglumatlar:</strong> 
                                        Adyňyz, e-poçta salgyňyz, telefon belgiňiz we beýleki habarlaşmak maglumatlaryňyz
                                    </span>
                                </li>
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">•</span>
                                    <span class="text-gray-700">
                                        <strong class="text-[#222222]">Sargyt maglumatlary:</strong> 
                                        Sargytlaryňyz, iberiş salgylaryňyz we logistika maglumatlaryňyz
                                    </span>
                                </li>
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">•</span>
                                    <span class="text-gray-700">
                                        <strong class="text-[#222222]">Tehniki maglumatlar:</strong> 
                                        IP salgyňyz, brauzer görnüşi, ulanyş wagty we beýleki awtomatik ýygnanan maglumatlar
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <!-- Data Usage -->
                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            Maglumatlary Ulanyş
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                            <p class="text-gray-700 leading-relaxed mb-4">
                                Ýygnanan maglumatlary aşakdaky maksatlar üçin ulanyýarys:
                            </p>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div class="bg-[#F3F8FF] rounded-lg p-4">
                                    <h3 class="font-semibold text-[#222222] mb-2">Hyzmatlary ýerine ýetirmek</h3>
                                    <p class="text-sm text-gray-600">Sargytlaryňyzy işlemek we logistika hyzmatlaryny üpjün etmek</p>
                                </div>
                                <div class="bg-[#F3F8FF] rounded-lg p-4">
                                    <h3 class="font-semibold text-[#222222] mb-2">Habarlaşmak</h3>
                                    <p class="text-sm text-gray-600">Sargytlaryňyz barada size habar bermek</p>
                                </div>
                                <div class="bg-[#F3F8FF] rounded-lg p-4">
                                    <h3 class="font-semibold text-[#222222] mb-2">Hyzmatlary ýokarlandyrmak</h3>
                                    <p class="text-sm text-gray-600">Biziň platformamyzy we hyzmatlarymyzy ösdürmek</p>
                                </div>
                                <div class="bg-[#F3F8FF] rounded-lg p-4">
                                    <h3 class="font-semibold text-[#222222] mb-2">Hukuky talapnamalar</h3>
                                    <p class="text-sm text-gray-600">Hukuky borçlarymyzy ýerine ýetirmek</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- Data Protection -->
                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            Maglumatlary Goramak
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                            <p class="text-gray-700 leading-relaxed">
                                Siziň maglumatlaryňyzy goramak üçin kabul edilen tehniki we guramaklyk çäreleri 
                                ulanýarys. Maglumatlaryňyzyň güýçli şifrlenişi, güýçli goragly serwerler we 
                                düzgün goragly giriş mehanizmleri bilen goragly saklanýandygyny üpjün edýäris.
                            </p>
                        </div>
                    </section>

                    <!-- Cookies -->
                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            Çörekler (Cookies)
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                            <p class="text-gray-700 leading-relaxed mb-4">
                                Web sahypamyzy özleşdirmek we ulanyş tejribäni ýokarlandyrmak üçin çörekleri 
                                ulanýarys. Çörekleri brauzeriňiziň sazlamalaryndan dolandyryp bilersiňiz.
                            </p>
                        </div>
                    </section>

                    <!-- User Rights -->
                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            Ulanyjynyň Hukuklary
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8 space-y-3">
                            <p class="text-gray-700 leading-relaxed">
                                Sizde aşakdaky hukuklar bar:
                            </p>
                            <ul class="space-y-2 ml-6">
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">✓</span>
                                    <span class="text-gray-700">Şahsy maglumatlaryňyza giriş almak</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">✓</span>
                                    <span class="text-gray-700">Maglumatlaryňyzy düzetmek ýa-da öçürmek</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">✓</span>
                                    <span class="text-gray-700">Maglumatlaryňyzyň işlenmegine garşy çykmak</span>
                                </li>
                                <li class="flex items-start">
                                    <span class="text-[#F98900] mr-3">✓</span>
                                    <span class="text-gray-700">Maglumatlaryňyzy göçürmek</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    <!-- Contact -->
                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            Habarlaşmak
                        </h2>
                        <div class="bg-gradient-to-r from-[#F3F8FF] to-white border border-gray-200 rounded-xl p-6 lg:p-8">
                            <p class="text-gray-700 leading-relaxed mb-4">
                                Gizlinlik syýasatymyz barada soraglaryňyz ýa-da şikäýetleriňiz bar bolsa, 
                                aşakdaky ünümler bilen biz bilen habarlaşyň:
                            </p>
                            <div class="space-y-2">
                                <p class="text-gray-700">
                                    <strong class="text-[#222222]">E-poçta:</strong> 
                                    <a href="mailto:info@bereketli.com" class="text-[#F98900] hover:underline">
                                        info@bereketli.com
                                    </a>
                                </p>
                                <p class="text-gray-700">
                                    <strong class="text-[#222222]">Telefon:</strong> 
                                    <a href="tel:+99361626364" class="text-[#F98900] hover:underline">
                                        +993 61 62 63 64
                                    </a>
                                </p>
                            </div>
                        </div>
                    </section>

                    <!-- Changes -->
                    <section>
                        <h2 class="text-2xl font-semibold text-[#222222] mb-4 flex items-center">
                            <span class="w-2 h-2 bg-custom-gradient rounded-full mr-3"></span>
                            Üýtgeşmeler
                        </h2>
                        <div class="bg-white border border-gray-200 rounded-xl p-6 lg:p-8">
                            <p class="text-gray-700 leading-relaxed">
                                Biz bu gizlinlik syýasatyny wagty-wagty täzeläp bilýäris. Üýtgeşmeler 
                                bu sahypada ýaylymlaşdyrylar we "Soňky täzelendirilen" sany täzelenilýär. 
                                Syýasatdaky üýtgeşmelerden habardar bolmak üçin bu sahypany yzygiderli 
                                gözden geçirmegi maslahat berýäris.
                            </p>
                        </div>
                    </section>
                </div>

                <!-- Back to Home Button -->
                <div class="mt-12 text-center">
                    <router-link 
                        to="/" 
                        class="inline-flex items-center px-8 py-3 bg-custom-gradient text-white rounded-[10px] hover:scale-95 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                    >
                        Baş sahypa gaýtmak
                        <arrow_right-icon class="ml-2" :size="20" color="white" />
                    </router-link>
                </div>
            </div>
        </MainContainer>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import MainContainer from '@/components/containers/MainContainer.vue'
import Header from '@/components/common/Header.vue'

const lastUpdated = ref(new Date().toLocaleDateString('tk-TM', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}))
</script>


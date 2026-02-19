<template>
    <section class="overflow-x-hidden">
        <!-- Absolute -->
        <div class="lg:h-screen sm:h-[80vh] h-[60vh] relative">
            <!-- Bg image -->
            <div class="absolute -z-10 w-full h-full bg-[#F3F8FF]">
                <img :src="background" class="w-full h-full object-contain" />
            </div>
            <!-- Title -->
            <div class="absolute top-48 left-1/2 -translate-x-1/2 w-full">
                <h1 class="font-semibold lg:text-[94px] md:text-7xl sm:text-6xl text-5xl md:leading-[90px] uppercase text-[#0C1A30] text-center md:mx-40">
                    Delivering <span class="text-gold-gradient italic">efficiency</span> at every mile
                </h1>
            </div>
            <!-- Bg container -->
            <div class="absolute lg:block hidden z-10 top-[120px] left-1/2 -translate-x-1/2">
                <img src="/images/container.webp" class="w-full h-[600px] object-cover" loading="lazy" />
            </div>
        </div>
        <MainContainer>
            <i18n-t keypath="descriptions.home_1" tag="div"
                class="font-medium lg:text-[52px] md:text-5xl sm:text-4xl text-3xl text-[#222222] lg:leading-[62px] pt-20">
                <template #img1>
                    <img src="/images/img_1.webp" class="lg:w-[115px] w-[70px] lg:h-[45px] h-[30px] inline-block" />
                </template>

                <template #img2>
                    <img src="/images/img_2.webp" class="lg:w-[115px] w-[70px] lg:h-[45px] h-[30px] inline-block" />
                </template>

                <template #img3>
                    <img src="/images/img_3.webp" class="lg:w-[115px] w-[70px] lg:h-[45px] h-[30px] inline-block" />
                </template>
            </i18n-t>
        </MainContainer>
        <Statistic />
        <div class="bg-[#F5F9FF] sm:py-20 py-10">
            <MainContainer>
                <h1 class="section_title mb-10">
                    Why Choose Us
                </h1>
                <div class="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                    <AboutCard v-for="item in aboutCards" :key="item.id" :data="item" />
                </div>
            </MainContainer>
        </div>
        <div class="sm:py-20 py-10">
            <Accordion :title="$t('menu.FAQ')" :data="faqStore.faqs" @toggle="toggleAccordion"
                @setContentHeight="setContentHeight" />
        </div>
    </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n({ useScope: 'global' })

import background from '@/assets/images/background.webp'
const faqStore = useFaqsStore()

const toggleAccordion = (index) => faqStore.toggleAccordion(index)
const setContentHeight = (index, height) => faqStore.setContentHeight(index, height)

const aboutCards = ref([
    { id: 1, icon: 'insurance-icon', title: t('data.about.title_1'), desc: t('data.about.desc_1') },
    { id: 2, icon: 'packaging-icon', title: t('data.about.title_2'), desc: t('data.about.desc_2') },
    { id: 3, icon: 'pickup-icon', title: t('data.about.title_3'), desc: t('data.about.desc_3') },
    { id: 4, icon: 'support-icon', title: t('data.about.title_4'), desc: t('data.about.desc_4') },
    { id: 5, icon: 'tracker-icon', title: t('data.about.title_5'), desc: t('data.about.desc_5') },
    { id: 6, icon: 'tracking-icon', title: t('data.about.title_6'), desc: t('data.about.desc_6') },
])

onMounted(async () => {
    await faqStore.fetchFaqs()
})
</script>
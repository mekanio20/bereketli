<template>
    <section class="overflow-x-hidden relative">
        <MainContainer>
            <SectionContainer>
                <!-- Breadcrumb -->
                <bread-crumb class="mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: $t('menu.about_us'), to: '/about' },
                    { label: $t('menu.FAQ') }
                ]" />

               <Accordion :isCenter="true" :title="$t('menu.FAQ')" :data="faqStore.faqs" @toggle="toggleAccordion" @setContentHeight="setContentHeight" />
            </SectionContainer>
        </MainContainer>
    </section>
</template>

<script setup>
const faqStore = useFaqsStore()
const toggleAccordion = (index) => faqStore.toggleAccordion(index)
const setContentHeight = (index, height) => faqStore.setContentHeight(index, height)

onMounted(async () => {
    await faqStore.fetchFaqs()
})
</script>

<style scoped>
@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-slide-down {
    animation: slideDown 0.6s ease-out;
}
</style>
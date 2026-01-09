<template>
    <section class="overflow-hidden relative">
        <MainContainer>
            <SectionContainer class="pb-20">
                <!-- Breadcrumb -->
                <bread-crumb class="mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: 'Biz barada', to: '#' },
                    { label: 'Köp soralýan soraglar' }
                ]" />

               <Accordion :isCenter="true" :title="'Köp soralýan soraglar'" :data="faqStore.faqs" @toggle="toggleAccordion" @setContentHeight="setContentHeight" />
            </SectionContainer>
        </MainContainer>
    </section>
</template>

<script setup>
const faqStore = useFaqsStore()
const toggleAccordion = (index) => faqStore.toggleAccordion(index)
const setContentHeight = (index, height) => faqStore.setContentHeight(index, height)
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
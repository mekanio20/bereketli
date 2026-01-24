<template>
    <section class="overflow-x-hidden relative">
        <MainContainer>
            <SectionContainer class="py-20">
                <!-- Breadcrumb -->
                <bread-crumb class="mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: 'Biz barada', to: '#' },
                    { label: 'Gadagan edilýän ýükler' }
                ]" />

               <Accordion :isCenter="true" :title="'Gadagan edilýän ýükler'" :data="forbiddenStore.forbidden_cargos" @toggle="toggleAccordion" @setContentHeight="setContentHeight" />
            </SectionContainer>
        </MainContainer>
    </section>
</template>

<script setup>
const forbiddenStore = useForbiddenStore()
const toggleAccordion = (index) => forbiddenStore.toggleAccordion(index)
const setContentHeight = (index, height) => forbiddenStore.setContentHeight(index, height)

onMounted(async () => {
    await forbiddenStore.fetchForbidden()
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
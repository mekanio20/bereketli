<template>
    <section class="overflow-hidden relative">
        <MainContainer>
            <SectionContainer class="pb-20">
                <!-- Breadcrumb -->
                <bread-crumb class="mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: 'Biz barada', to: '#' },
                    { label: 'Täzelikler', to: '/news' }
                ]" />

                <!-- Header -->
                <div class="mb-10 animate-slide-down">
                    <h1 class="section_title mb-2">
                        {{ newsDetail.title }}
                    </h1>
                    <!-- Date -->
                    <div class="flex items-center text-[#838589] text-sm">
                        <calendar-icon :size="20" />
                        <span class="ml-2">{{ newsDetail.date }}</span>
                    </div>
                </div>

                <div class="space-y-10">
                    <img :src="newsDetail.image" class="w-full max-h-[500px] object-cover rounded-[14px]">
                    <p class="text-lg text-[#222222]">
                        {{ newsDetail.content }}
                    </p>
                </div>
            </SectionContainer>
        </MainContainer>
        <Slider v-if="newsDetail.related_news?.length > 0" title="Meňzeş täzelikler" :data="newsDetail.related_news" />
    </section>
</template>

<script setup>
const route = useRoute()
const newsStore = useNewsStore()
const newsDetail = ref({})
watch(
    () => route.params.id,
    () => {
        newsDetail.value = newsStore.getNewsById(route.params.id)
    }, { immediate: true })
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
<template>
    <section class="overflow-x-hidden relative">
        <MainContainer>
            <SectionContainer>
                <!-- Breadcrumb -->
                <bread-crumb class="mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: $t('menu.about_us'), to: '/about' },
                    { label: $t('menu.news'), to: '/news' },
                    { label: newsStore.news_detail.title }
                ]" />

                <!-- Header -->
                <div class="mb-10 animate-slide-down">
                    <h1 class="section_title mb-2">
                        {{ newsStore.news_detail.title }}
                    </h1>
                    <!-- Date -->
                    <div class="flex items-center text-[#838589] text-sm">
                        <calendar-icon :size="20" />
                        <span class="ml-2">{{ newsStore.news_detail.date_created }}</span>
                    </div>
                </div>

                <div class="space-y-10">
                    <img :src="newsStore.news_detail.image" class="w-full max-h-[500px] object-cover rounded-[14px]">
                    <p class="text-lg text-[#222222]">
                        {{ newsStore.news_detail.description }}
                    </p>
                </div>

                <!-- Loading -->
                <Loading v-if="newsStore.loading" />
            </SectionContainer>
        </MainContainer>
        <Slider v-if="related_news?.length > 0" :title="$t('names.related_news')" :data="related_news" />
    </section>
</template>

<script setup>
const route = useRoute()
const newsStore = useNewsStore()
const related_news = ref([])

watch(
    () => route.params.id,
    async () => {
       await newsStore.fetchNewsById(route.params.id)
       related_news.value = await newsStore.relatedNews(route.params.id)
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
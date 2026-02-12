<template>
    <section class="overflow-x-hidden relative">
        <MainContainer>
            <SectionContainer>
                <!-- Breadcrumb -->
                <bread-crumb class="mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: 'Biz barada', to: '#' },
                    { label: 'Täzelikler' }
                ]" />

                <!-- Header -->
                <div class="mb-10 animate-slide-down">
                    <h1 class="section_title mb-8">
                        Täzelikler
                    </h1>
                </div>

                <!-- Warehouses Grid -->
                <TransitionGroup name="card-list" tag="div"
                    class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <NewsCard v-for="item in newsStore.news" :key="item.id" :title="item.title"
                        :date="item.date_created" :image="item.image" @click="handleNewsDetail(item.id)" />
                </TransitionGroup>

                <!-- Loading -->
                <Loading v-if="newsStore.loading" />

                <NoData v-show="newsStore.news.length === 0 && !newsStore.loading" :message="'Täzelik tapylmady'" :image="''" />
            </SectionContainer>
        </MainContainer>
    </section>
</template>

<script setup>
const router = useRouter()
const newsStore = useNewsStore()
const handleNewsDetail = (id) => {
    router.push({ name: 'NewsDetail', params: { id } })
}

onMounted(async () => {
    await newsStore.fetchNews()
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

/* Card List Transitions */
.card-list-enter-active,
.card-list-leave-active {
    transition: all 0.4s ease;
}

.card-list-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.card-list-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

.card-list-move {
    transition: transform 0.4s ease;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
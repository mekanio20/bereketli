<template>
    <section class="overflow-hidden relative">
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
                    <NewsCard v-for="item in newsStore.newsData" :key="item.id" :title="item.title" :date="item.date"
                        :image="item.image" @click="handleNewsDetail(item.id)" />
                </TransitionGroup>

                <!-- Empty State -->
                <Transition name="fade">
                    <div v-if="newsStore.newsData.length === 0" class="text-center py-20">
                        <div class="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
                            <search-icon :size="40" />
                        </div>
                        <p class="text-xl text-[#222222]">Täzelik tapylmady</p>
                        <p class="text-sm text-[#838589] mt-2">Başga söz bilen gözläp görüň</p>
                    </div>
                </Transition>
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
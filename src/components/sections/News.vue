<template>
    <section class="space-y-10 pb-10">
        <h2 class="text-[44px] font-semibold text-[#222222]">Täzelikler</h2>
        <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 pb-16">
            <NewsCard v-for="item in news" :key="item.id" :image="item.image" :date="item.date_created"
                :title="item.title" @click="handleNewsDetail(item.id)" />
        </div>
        <div class="flex items-center justify-center">
            <router-link to="/news" class="group relative flex items-center">
                <!-- Text -->
                <button type="button"
                    class="py-[10px] px-8 rounded-full bg-[#002645] text-white sm:text-lg text-base font-semibold">
                    Ählisini görmek
                </button>
    
                <!-- Animated Dot -->
                <span class="absolute -z-10 right-3 p-1 rounded-full bg-[#0B2545]
                rotate-[-180deg]
                 transition-all duration-500 ease-out
                 group-hover:translate-x-14
                 group-hover:rotate-[360deg]">
                    <arrow_right-icon />
                </span>
            </router-link>
        </div>
    </section>
</template>

<script setup>
const router = useRouter()
const newsStore = useNewsStore()
const handleNewsDetail = (id) => {
    router.push({ name: 'NewsDetail', params: { id } })
}
const props = defineProps({
    news: {
        type: Array,
        required: true
    }
})

onMounted(async () => {
   console.log('News -> ', props.news);
   
})
</script>
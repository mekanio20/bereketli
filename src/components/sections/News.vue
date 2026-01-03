<template>
    <section class="space-y-10 pb-10">
        <h2 class="text-[44px] font-semibold text-[#222222]">Täzelikler</h2>
        <div class="grid grid-cols-3 gap-8 pb-16">
            <NewsCard v-for="item in newsData" :key="item.id" :image="item.image" :date="item.date"
                :title="item.title" />
        </div>
        <div class="flex items-center justify-center">
            <router-link to="#" class="group relative flex items-center">
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
const newsData = ref([
    {
        id: 1,
        image: '/images/new_1.png',
        date: '02.09.2025 - 12:05',
        title: 'Ýük daşamakda has çalt we ygtybarly hyzmatlar hödürlenyär'
    },
    {
        id: 2,
        image: '/images/new_2.png',
        date: '02.09.2025 - 12:05',
        title: 'Serhetara ýük daşamakda täze mümkinçilikler açyldy'
    },
    {
        id: 3,
        image: '/images/new_3.png',
        date: '02.09.2025 - 12:05',
        title: 'Logistika hyzmatlarymyz täze ugurlar bilen giňeldi'
    },
    {
        id: 4,
        image: '/images/new_4.png',
        date: '02.09.2025 - 12:05',
        title: 'Logistika hyzmatlarymyz täze ugurlar bilen giňeldi'
    },
    {
        id: 5,
        image: '/images/new_5.png',
        date: '02.09.2025 - 12:05',
        title: 'Serhetara ýük daşamakda täze mümkinçilikler açyldy'
    },
    {
        id: 6,
        image: '/images/new_6.png',
        date: '02.09.2025 - 12:05',
        title: 'Ýük daşamakda has çalt we ygtybarly hyzmatlar hödürlenyär'
    }
]);
</script>
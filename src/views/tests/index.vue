<template>
    <div class="relative">
        <button ref="prevEl" class="absolute left-0 top-1/2 z-10">
            ◀
        </button>

        <button ref="nextEl" class="absolute right-0 top-1/2 z-10">
            ▶
        </button>

        <Swiper :modules="[Navigation]" :navigation="navigation" @swiper="onSwiper">
            <SwiperSlide v-for="i in 5" :key="i">
                <div class="h-48 bg-gray-200 flex items-center justify-center">
                    Slide {{ i }}
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'

import 'swiper/css'

const prevEl = ref(null)
const nextEl = ref(null)

const navigation = {
    prevEl,
    nextEl
}

const onSwiper = (swiper) => {
    swiper.params.navigation.prevEl = prevEl.value
    swiper.params.navigation.nextEl = nextEl.value
    swiper.navigation.init()
    swiper.navigation.update()
}
</script>

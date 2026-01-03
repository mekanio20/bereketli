<template>
  <section class="relative h-[400px] md:h-[500px] lg:h-[520px]
           overflow-hidden rounded-[25px]
           px-6 my-20 mx-5
           bg-[url('/images/boat_background.webp')] bg-cover">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/30"></div>

    <!-- Stats -->
    <div class="relative z-10 h-full flex items-end justify-center pb-10">
      <div class="flex gap-32">
        <div v-for="(stat, index) in stats" :key="index" ref="items" class="text-white">
          <!-- Number -->
          <div class="flex items-end font-semibold">
            <span class="text-[100px] leading-[100px]" :ref="el => numberEls[index] = el">0</span>
            <span class="text-[100px] leading-[100px] ml-1">{{ stat.suffix }}</span>
          </div>

          <!-- Label -->
          <p class="mt-2 text-[22px] tracking-[-5%]">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const rawStats = [
  { value: '7+', label: 'Ýyl tejribe' },
  { value: '98%', label: 'Kargo howpuzlyk derejämiz' },
  { value: '5K+', label: 'Müşderi' },
  { value: '100+', label: 'Her günki müşderi sany' }
]

const stats = rawStats.map(item => {
  const match = item.value.match(/^(\d+)(.*)$/)
  return {
    label: item.label,
    number: Number(match[1]),
    suffix: match[2] || ''
  }
})

const items = ref([])
const numberEls = []
const observers = []

onMounted(() => {
  items.value.forEach((item, index) => {
    const counter = new CountUp(numberEls[index], stats[index].number, {
      duration: 3
    })

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          counter.start()
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(item)
    observers.push(observer)
  })
})

onBeforeUnmount(() => {
  observers.forEach(o => o.disconnect())
})
</script>
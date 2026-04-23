<template>
  <div class="flex justify-center items-center h-screen bg-white">
    <div ref="animationContainer" class="w-40 h-40"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import lottie from "lottie-web"
import animationData from "@/assets/loader.json"

const animationContainer = ref(null)
let animation = null

onMounted(() => {
  animation = lottie.loadAnimation({
    container: animationContainer.value,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData
  })
})

onBeforeUnmount(() => {
  if (animation) {
    animation.destroy()
  }
})
</script>
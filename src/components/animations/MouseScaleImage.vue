<script setup>
const props = defineProps({
    src: { type: String, required: true },
    maxScale: { type: Number, default: 1.12 },
    parallax: { type: Number, default: 15 },
    transition: { type: Number, default: 300 }
})

const imageRef = ref(null)
const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)

const handleMove = (e) => {
    const rect = imageRef.value.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const normX = x / rect.width
    const normY = y / rect.height

    const dist =
        Math.sqrt(Math.pow(normX - 0.5, 2) + Math.pow(normY - 0.5, 2)) * 2

    scale.value = 1 + (props.maxScale - 1) * dist

    translateX.value = (normX - 0.5) * props.parallax
    translateY.value = (normY - 0.5) * props.parallax
}

const reset = () => {
    scale.value = 1
    translateX.value = 0
    translateY.value = 0
}

onMounted(() => {
    const el = imageRef.value
    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', reset)
})

onBeforeUnmount(() => {
    const el = imageRef.value
    el.removeEventListener('mousemove', handleMove)
    el.removeEventListener('mouseleave', reset)
})
</script>

<template>
    <div ref="imageRef" class="relative w-full h-full overflow-hidden rounded-md cursor-pointer select-none" :style="{
        transition: `transform ${transition}ms ease-out`
    }">
        <img :src="src" class="w-full h-full object-cover will-change-transform" :style="{
            transform: `
          scale(${scale})
          translate(${translateX}px, ${translateY}px)
        `,
            transition: `transform ${transition}ms ease-out`
        }" />
    </div>
</template>
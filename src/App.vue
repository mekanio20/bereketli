<template>
  <component :is="layout"></component>
</template>

<script setup>
const route = useRoute()
import baseLayout from '@/layouts/baseLayout.vue';
const layouts = {
  'base-layout': baseLayout,
}
const layout = computed(() => {
  return layouts[route.meta.layout] || layouts['base-layout']
})

const { loadIcons } = useIcons()
onMounted(() => { loadIcons() })
</script>
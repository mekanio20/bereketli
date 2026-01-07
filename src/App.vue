<template>
  <component :is="layout"></component>
  <RegisterModal :isOpen="appStore.activeModal === 'register'" @close="appStore.toggleModal('register')" @redirect="redirectModal" />
  <LoginModal :isOpen="appStore.activeModal === 'login'" @close="appStore.toggleModal('login')" @redirect="redirectModal" />
  
</template>

<script setup>
import baseLayout from '@/layouts/baseLayout.vue';
const appStore = useAppStore()
const route = useRoute()

const layouts = { 'base-layout': baseLayout }
const layout = computed(() => {
  return layouts[route.meta.layout] || layouts['base-layout']
})

const { loadIcons } = useIcons()
onMounted(() => { loadIcons() })

const redirectModal = (modal) => {
  appStore.toggleModal(modal)
}
</script>
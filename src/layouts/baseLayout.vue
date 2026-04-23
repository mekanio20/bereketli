<template>
    <div class="min-h-screen flex flex-col">
        <Header />
        <NotificationBar />
        <ToastContainer />
        <div class="flex-1">
            <Loader v-show="loading" />
            <router-view v-show="!loading"></router-view>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import router from '@/router/index'
const loading = ref(false)

onMounted(() => {
    router.beforeEach((to, from, next) => {
        loading.value = true
        next()
    })
    router.afterEach(() => {
        setTimeout(() => { loading.value = false }, 1000)
    })
})
</script>
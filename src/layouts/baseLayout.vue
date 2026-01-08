<template>
    <div class="min-h-screen flex flex-col">
        <Header />
        <NotificationBar />
        <div class="flex-1">
            <router-view></router-view>
        </div>
        <Footer />
    </div>
</template>
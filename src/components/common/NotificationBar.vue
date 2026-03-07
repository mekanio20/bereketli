<template>
    <div class="fixed top-20 left-0 right-0 z-40">
        <div class="bg-[#002645] py-3 overflow-hidden">
            <div class="flex items-center space-x-8 animate-marquee">
                <div class="flex items-center space-x-2 whitespace-nowrap">
                    <span class="notification_bar">Bereketli Logistika</span>
                </div>
                <div class="flex items-center space-x-2 whitespace-nowrap">
                    <span class="notification_bar">{{ contactStore.contact?.phone }}</span>
                </div>
                <div class="flex items-center space-x-2 whitespace-nowrap">
                    <dote border_color="#FFA500" bg_color="#FFC359" />
                    <span class="notification_bar">{{ $t('info.notification_bar_1') }}</span>
                </div>
                <div class="flex items-center space-x-2 whitespace-nowrap">
                    <dote border_color="#FFA500" bg_color="#FFC359" />
                    <span class="notification_bar">{{ $t('info.notification_bar_2') }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const contactStore = useContactStore()
onMounted(async () => {
    await contactStore.fetchContact()
});
</script>
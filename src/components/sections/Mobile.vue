<template>
    <section class="relative w-full md:h-[370px] h-[300px] mt-10 mb-20 bg-custom-gradient py-6 md:py-10 rounded-3xl lg:py-24">
        <div class="h-full flex items-center justify-between sm:pl-20 pl-4 max-w-[550px]">
            <div class="h-full flex flex-col space-y-10 justify-center">
                <h2 class="lg:text-[44px] md:text-4xl text-3xl text-white font-bold leading-[100%]">{{ $t('names.mobile_app') }}</h2>
                <p class="lg:text-lg text-base text-white font-medium leading-[100%]">{{ $t('descriptions.mobile_1') }}</p>
                <a :href="link" target="_blank" class="group relative z-10 flex items-center w-fit">
                    <!-- Text -->
                    <button type="button"
                        class="py-[10px] px-8 rounded-full bg-white text-[#F98900] hover:bg-[#fff7ec] transition-all duration-300 sm:text-lg text-base font-semibold">
                        {{ $t('buttons.download') }}
                    </button>

                    <!-- Animated Dot -->
                    <span class="absolute -z-10 right-3 p-1 rounded-full bg-white hover:bg-[#fff7ec]
                rotate-[-180deg]
                 transition-all duration-500 ease-out
                 group-hover:translate-x-14
                 group-hover:rotate-[360deg]">
                        <arrow_right-icon :color="'#F98900'" />
                    </span>
                </a>
            </div>
        </div>
        <div class="absolute bottom-0 right-[100px] z-20 lg:flex hidden items-center space-x-10">
            <canvas id="qrcode" class="w-[120px] h-[120px]"></canvas>
            <div class="w-[360px] h-full">
                <img src="/icons/phone.webp" class="w-full h-full object-cover">
            </div>
        </div>
    </section>
</template>

<script setup>
import QRCode from 'qrcode'
const link = ref('')
onMounted(() => {
    appLink()
})
const appLink = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    if (/android/i.test(userAgent)) {
        link.value = 'https://play.google.com/store/apps/details?id=tm.bereketli.logistika'
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        link.value = 'https://apps.apple.com/tm/app/bereketli-logistika/id6755937543'
    } else if (/Win/i.test(userAgent)) {
        link.value = 'https://play.google.com/store/apps/details?id=tm.bereketli.logistika'
    } else if (/Mac/i.test(userAgent)) {
        link.value = 'https://apps.apple.com/tm/app/bereketli-logistika/id6755937543'
    }
    generateQR(link.value)
}

const generateQR = async (link) => {
    const canvas = document.getElementById('qrcode')
    const qrText = link

    await QRCode.toCanvas(canvas, qrText, { width: 120, height: 120 })

    const ctx = canvas.getContext('2d')
    const logo = new Image()
    logo.src = '/logo.webp'
    logo.onload = () => {
        const size = 40
        const x = (canvas.width - size) / 2
        const y = (canvas.height - size) / 2
        ctx.drawImage(logo, x, y, size, size)
    }
}
</script>
<template>
    <div class="w-full overflow-hidden">
        <Hero @search="handleSearch" @scroll="scrollDown" />
        <div class="relative pb-10">
            <MainContainer>
                <div class="space-y-16 pt-20">
                    <Calculator @showResult="showResult" />
                    <Services id="services" />
                    <Orders v-if="authStore.isAuthenticated" />
                </div>
            </MainContainer>

            <!-- Absolute Background -->
            <div class="absolute top-0 -z-10 w-full h-full bg-[#F3F8FF]">
                <img :src="background" class="w-full h-full object-cover" />
            </div>
        </div>

        <div class="w-full">
            <OrderService />
            <MainContainer>
                <div class="relative">
                    <Mobile />
                    <div class="font-medium text-[52px] text-[#222222] leading-[62px] py-5">
                        Biz ygtybarly, netijeli we <img src="/images/img_1.webp"
                            class="w-[115px] h-[45px] inline-block" />
                        döwrebap logistika çözgütlerini hödürleýäris. <span class="text-gold-gradient">Transport,
                            ammarçylyk
                            we <img src="/images/img_2.webp" class="w-[115px] h-[45px] inline-block" />
                            üpjünçilik zynjyrynda baý</span> tejribämiz bilen iberişleri takyk we wagtynda ýetirilmegini
                        üpjün edýäris <img src="/images/img_3.webp" class="w-[115px] h-[45px] inline-block" />
                    </div>
                    <!-- Absolute Background -->
                    <div class="absolute top-[300px] -z-10 w-full h-full">
                        <img :src="background" class="w-full h-full object-cover" />
                    </div>
                </div>
            </MainContainer>
            <Statistic />
            <MainContainer>
                <div class="space-y-8 pb-20">
                    <News :news="newsStore.news" />
                    <Comments />
                    <Accordion :title="'Köp soralýan soraglar'" :data="faqStore.faqs" @toggle="toggleAccordion" @setContentHeight="setContentHeight" />
                </div>
            </MainContainer>


        </div>

        <!-- Phone Button -->
        <a href="tel:+99371984704"
            class="fixed bottom-8 right-8 z-40 bg-custom-gradient text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 group">
            <phone-icon />
            <span
                class="absolute right-full bottom-2 mr-3 bg-gray-900 text-white px-3 py-2 rounded-lg sm:text-sm text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">+99371984704</span>
        </a>
    </div>
    <SearchResultModal :isOpen="searchOpen" :order="searchResult" @close="searchOpen = false" />
    <ResultPrices :options="resultOptions" :isOpen="showResultModal" @close="showResultModal = false" />
</template>

<script setup>
import { usdToTmt } from "@/utils/numbers";
import { normalizePrices } from '@/utils/normalizers'
import background from '@/assets/images/background.webp'

const authStore = useAuthStore()
const faqStore = useFaqsStore()
const newsStore = useNewsStore()
const configStore = useConfigStore()
const orderStore = useOrderStore()

const searchOpen = ref(false)
const showResultModal = ref(false)
const resultOptions = ref([])
const searchResult = ref({})

const toggleAccordion = (index) => faqStore.toggleAccordion(index)
const setContentHeight = (index, height) => faqStore.setContentHeight(index, height)
const handleSearch = async (search) => {
    const results = await orderStore.fetchOrders({ search })
    searchResult.value = results[0]
    searchOpen.value = true
}

const showResult = async (results) => {
    showResultModal.value = true
    resultOptions.value = normalizePrices(results.prices).map((option) => ({
        ...option,
        price: usdToTmt(option.price, configStore.usd_rate)
    }))
}

const scrollDown = () => {
  window.scrollBy({
    top: window.innerHeight - 120,
    behavior: 'smooth'
  })
}

onMounted(async () => {
    await faqStore.fetchFaqs()
    await newsStore.fetchNews()
    await configStore.fetchConfig()
})
</script>
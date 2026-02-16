<template>
    <section class="overflow-x-hidden relative">
        <!-- Absolute -->
        <div class="absolute -z-10 w-full h-full bg-[#F3F8FF]">
            <img :src="background" class="w-full h-full object-contain" />
        </div>
        <MainContainer>
            <SectionContainer>
                <!-- Breadcrumb -->
                <bread-crumb class="mb-8" :items="[
                    { icon: 'home-icon', to: '/' },
                    { label: $t('menu.order_requests') }
                ]" />

                <!-- Title -->
                <div class="mb-10">
                    <h1 class="section_title mb-8">
                        {{ $t('menu.order_requests') }}
                    </h1>
                    <!-- Search Bar -->
                    <div class="relative max-w-2xl">
                        <input v-model="searchQuery" type="text" :placeholder="$t('descriptions.request_search')"
                            class="w-full pl-6 pr-14 py-[14px] bg-white border border-[#F5F5F5] rounded-2xl transition-all duration-300 text-[#222222] placeholder-[#838589] outline-none hover:shadow" />
                        <button
                            class="absolute right-2 top-1/2 -translate-y-1/2 w-[45px] h-[45px] bg-custom-gradient rounded-xl flex items-center justify-center hover:shadow-md transform hover:scale-105 transition-all duration-300">
                            <search-icon :size="20" color="white" />
                        </button>
                    </div>
                </div>

                <!-- Cards -->
                <TransitionGroup name="card-list" tag="div"
                    class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <RequestCard v-for="item in requests" :key="item.id" :order="item"
                        @click="handleDetail(item.id)" />
                </TransitionGroup>

                <!-- Sentinel -->
                <div ref="sentinel" class="h-5"></div>

                <!-- Loading -->
                <Loading v-if="orderRequestStore.loading" />

                <!-- Empty State -->
                <NoData v-show="requests.length === 0 && !orderRequestStore.loading"
                    :message="$t('info.no_requests')" />
            </SectionContainer>
        </MainContainer>
    </section>
</template>

<script setup>
import background from '@/assets/images/background.webp'
const orderRequestStore = useOrderRequestStore()
const router = useRouter()


const searchQuery = ref('')
const requests = ref([]);
const offset = ref(0);
const limit = 10;

const hasMore = ref(true);
const localLoading = ref(false);

const sentinel = ref(null);
let observer = null;

const handleDetail = (id) => {
    router.push({ name: 'OrderRequestDetail', params: { id } })
}

const fetchData = async ({ reset = false } = {}) => {
  if (localLoading.value || orderRequestStore.loading) return;

  // reset ise baştan başla
  if (reset) {
    requests.value = [];
    offset.value = 0;
    hasMore.value = true;
  }

  if (!hasMore.value) return;

  localLoading.value = true;

  try {
    const data = await orderRequestStore.fetchOrderRequests({
      sort: "date_created",
      search: searchQuery.value?.trim() || undefined,
      limit,
      offset: offset.value,
    });

    const list = Array.isArray(data) ? data : [];

    if (list.length < limit) {
      hasMore.value = false;
    }

    requests.value.push(...list);
    offset.value += limit;
  } catch (err) {
    console.log("Fetch error:", err);
  } finally {
    localLoading.value = false;
  }
};

onMounted(async () => {
  await fetchData({ reset: true });

  observer = new IntersectionObserver(
    async ([entry]) => {
      if (entry.isIntersecting) {
        await fetchData();
      }
    },
    { threshold: 0.1 }
  );

  if (sentinel.value) observer.observe(sentinel.value);
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});

let searchTimer = null;

watch(searchQuery, (newVal) => {
  clearTimeout(searchTimer);

  searchTimer = setTimeout(async () => {
    await fetchData({ reset: true });
  }, 400);
});
</script>
<template>
    <section class="w-full bg-white rounded-3xl p-8 md:p-16">
        <h1 class="lg:text-[34px] sm:text-[28px] text-[24px] font-bold text-gray-900 text-center mb-12">
            {{ $t('names.calucalate_order') }}
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-14">
            <div class="relative">
                <SimpleSelect :isSearch="true" v-model="formData.from_country" :options="nirdenOptions"
                    @change="selectedCountry('nirden', $event)" :placeholder="$t('forms.from')" />
            </div>

            <div class="relative">
                <SimpleSelect :isSearch="true" v-model="formData.to_country" :options="niraOptions"
                    @change="selectedCountry('nira', $event)" :placeholder="$t('forms.to')" />
            </div>

            <div class="relative">
                <CalculatorSelect :isSearch="true" v-model="formData.weight" :options="agramOptions" @change="handleAddData"
                    :placeholder="$t('forms.weight')" />
            </div>
        </div>

        <div class="flex justify-center space-x-5">
            <button type="button" :disabled="calculatorStore.loading" @click="handleCalculate"
                class="bg-[#002645] text-white font-bold text-lg md:text-[20px] w-[380px] px-16 py-4 rounded-[100px] shadow-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none flex items-center justify-center"
                :class="[calculatorStore.loading ? 'opacity-50 cursor-not-allowed' : '']">
                <animate_spin-icon v-if="calculatorStore.loading" />
                <span>{{ $t('buttons.calculate') }}</span>
            </button>
            <!-- Clear button -->
            <button type="button" @click="handleClear" class="text-[#002645] font-semibold hover:underline text-lg md:text-[20px]">
                {{ $t('buttons.clear') }}
            </button>
        </div>
    </section>
</template>

<script setup>
import { normalizeToIdLabel } from '@/utils/normalizers'
import { cleanObject } from '@/utils/objects'
const emits = defineEmits(['showResult'])

const countryStore = useCountryStore()
const itemSizeStore = useItemSizeStore()
const calculatorStore = useCalculatorStore()

const nirdenOptions = ref([])
const niraOptions = ref([])
const agramOptions = ref([])

const formData = ref({
    from_country: 0,
    to_country: 0,
    item_type: 0,
    weight: 0,
    measurement: 0,
    length: 0,
    width: 0,
    height: 0,
    item_size: 0
})

const selectedCountry = async (type, data) => {
    if (type === 'nirden') {
        const countries = await countryStore.fetchCountries({ from_country: data.id })
        niraOptions.value = normalizeToIdLabel(countries)
    } else if (type === 'nira') {
        const countries = await countryStore.fetchCountries({ to_country: data.id })
        nirdenOptions.value = normalizeToIdLabel(countries)
    }
}

const handleAddData = async (data) => {
    formData.value = {
        ...formData.value,
        ...data
    }
}

const handleCalculate = async () => {
    const payload = cleanObject(formData.value)
    const result = await calculatorStore.calculate(payload)
    emits('showResult', result)
}

const handleClear = () => {
    formData.value = {
        from_country: 0,
        to_country: 0,
        item_type: 0,
        weight: 0,
        measurement: 0,
        length: 0,
        width: 0,
        height: 0,
        item_size: 0
    }
}

onMounted(async () => {
    const countries = await countryStore.fetchCountries()
    const itemSizes = await itemSizeStore.fetchItemSizes()
    nirdenOptions.value = normalizeToIdLabel(countries)
    niraOptions.value = normalizeToIdLabel(countries)
    agramOptions.value = itemSizes
});

</script>
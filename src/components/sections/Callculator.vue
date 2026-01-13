<template>
    <section class="w-full bg-white rounded-3xl p-8 md:p-16">
        <h1 class="lg:text-[34px] sm:text-[28px] text-[24px] font-bold text-gray-900 text-center mb-12">
            Sargydyňyzy Hasaplaň
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-14">
            <div class="relative h-[50px]">
                <SimpleSelect :isSearch="true" v-model="nirden" :options="nirdenOptions" placeholder="Nireden" />
            </div>

            <div class="relative h-[50px]">
                <SimpleSelect :isSearch="true" v-model="nira" :options="niraOptions" placeholder="Nira" />
            </div>

            <div class="relative h-[50px]">
                <CalculatorSelect :isSearch="true" v-model="agram" :options="agramOptions" placeholder="Agram" />
            </div>
        </div>

        <div class="flex justify-center">
            <button @click="handleCalculate"
                class="bg-[#002645] text-white font-bold text-lg md:text-[20px] w-[380px] px-16 py-4 rounded-[100px] shadow-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none">
                Hasaplamak
            </button>
        </div>
    </section>
</template>

<script setup>
const nirden = ref('')
const nira = ref('')
const agram = ref('')
const nirdenOptions = [
    'Aşgabat',
    'Mary',
    'Türkmenabat',
    'Daşoguz',
    'Balkanabat'
]

const niraOptions = [
    'Aşgabat',
    'Mary',
    'Türkmenabat',
    'Daşoguz',
    'Balkanabat'
]

const agramOptions = [
    '0-1 kg',
    '1-5 kg',
    '5-10 kg',
    '10-20 kg',
    '20+ kg'
]

const handleCalculate = () => {
    console.log('Calculating...', { nirden: nirden.value, nira: nira.value, agram: agram.value })
}
</script>
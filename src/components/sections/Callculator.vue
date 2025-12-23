<template>
    <section v-motion :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
        class="w-full bg-white rounded-3xl p-8 md:p-16">
        <h1 class="lg:text-[34px] sm:text-[28px] text-[24px] font-bold text-gray-900 text-center mb-12" v-motion
            :initial="{ opacity: 0, y: -20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }">
            Sargydyňyzy Hasaplaň
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-14">
            <div class="relative" v-motion :initial="{ opacity: 0, x: -50 }"
                :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 400 } }">
                <button @click="toggleDropdown('nirden')"
                    class="w-full bg-[#EBF3FD] text-[#838589] font-medium px-6 py-4 rounded-2xl flex items-center justify-between transition-all duration-300">
                    <span class="text-base md:text-lg">{{ nirden || 'Nirden' }}</span>
                    <chevron_down-icon
                        :class="{ 'rotate-180 transition-transform duration-300': isDropdownOpen.nirden }"
                        :color="'#222222'" :size="21" />
                </button>
                <div v-show="isDropdownOpen.nirden" v-motion :initial="{ opacity: 0, y: -10 }"
                    :enter="{ opacity: 1, y: 0, transition: { duration: 300 } }"
                    class="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <button v-for="option in nirdenOptions" :key="option" @click="selectOption('nirden', option)"
                        class="w-full text-left px-6 py-3 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 text-gray-700 font-medium">
                        {{ option }}
                    </button>
                </div>
            </div>

            <div class="relative" v-motion :initial="{ opacity: 0, y: 50 }"
                :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 500 } }">
                <button @click="toggleDropdown('nira')"
                    class="w-full bg-[#EBF3FD] text-[#838589] font-medium px-6 py-4 rounded-2xl flex items-center justify-between transition-all duration-300">
                    <span class="text-base md:text-lg">{{ nira || 'Nirä' }}</span>
                    <chevron_down-icon :class="{ 'rotate-180 transition-transform duration-300': isDropdownOpen.nira }"
                        :color="'#222222'" :size="21" />
                </button>
                <div v-show="isDropdownOpen.nira" v-motion :initial="{ opacity: 0, y: -10 }"
                    :enter="{ opacity: 1, y: 0, transition: { duration: 300 } }"
                    class="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <button v-for="option in niraOptions" :key="option" @click="selectOption('nira', option)"
                        class="w-full text-left px-6 py-3 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 transition-all duration-200 text-gray-700 font-medium">
                        {{ option }}
                    </button>
                </div>
            </div>

            <div class="relative" v-motion :initial="{ opacity: 0, x: 50 }"
                :enter="{ opacity: 1, x: 0, transition: { duration: 600, delay: 600 } }">
                <button @click="toggleDropdown('agram')"
                    class="w-full bg-[#EBF3FD] text-[#838589] font-medium px-6 py-4 rounded-2xl flex items-center justify-between transition-all duration-300">
                    <span class="text-base md:text-lg">{{ agram || 'Agram we ölçegi' }}</span>
                    <chevron_down-icon :class="{ 'rotate-180 transition-transform duration-300': isDropdownOpen.agram }"
                        :color="'#222222'" :size="21" />
                </button>
                <div v-show="isDropdownOpen.agram" v-motion :initial="{ opacity: 0, y: -10 }"
                    :enter="{ opacity: 1, y: 0, transition: { duration: 300 } }"
                    class="absolute z-10 w-full mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <button v-for="option in agramOptions" :key="option" @click="selectOption('agram', option)"
                        class="w-full text-left px-6 py-3 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-blue-100 transition-all duration-200 text-gray-700 font-medium">
                        {{ option }}
                    </button>
                </div>
            </div>
        </div>

        <div class="flex justify-center" v-motion :initial="{ opacity: 0, scale: 0.8 }"
            :enter="{ opacity: 1, scale: 1, transition: { duration: 600, delay: 700 } }">
            <button @click="handleCalculate"
                class="bg-[#002645] text-white font-bold text-lg md:text-[20px] w-[380px] px-16 py-4 rounded-[100px] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none">
                Hasaplamak
            </button>
        </div>
    </section>
</template>

<script setup>
const nirden = ref('')
const nira = ref('')
const agram = ref('')
const isDropdownOpen = ref({
    nirden: false,
    nira: false,
    agram: false
})

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

const toggleDropdown = (dropdown) => {
    isDropdownOpen.value[dropdown] = !isDropdownOpen.value[dropdown]
    Object.keys(isDropdownOpen.value).forEach(key => {
        if (key !== dropdown) {
            isDropdownOpen.value[key] = false
        }
    })
}

const selectOption = (dropdown, value) => {
    if (dropdown === 'nirden') nirden.value = value
    else if (dropdown === 'nira') nira.value = value
    else if (dropdown === 'agram') agram.value = value
    isDropdownOpen.value[dropdown] = false
}

const handleCalculate = () => {
    console.log('Calculating...', { nirden: nirden.value, nira: nira.value, agram: agram.value })
}
</script>
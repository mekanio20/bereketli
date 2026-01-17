<template>
    <div class="bg-white rounded-2xl p-8 w-full max-w-3xl">
        <!-- Title -->
        <h2 class="text-xl font-semibold text-gray-900 mb-6">
            Ugur
        </h2>

        <!-- Options -->
        <div class="flex gap-4">
            <!-- Direct -->
            <div @click="selected = 'direct'" :class="cardClass('direct')">
                <div class="flex items-start justify-between">
                    <div>
                        <p :class="titleClass('direct')">Direct</p>
                        <p class="text-sm mt-2 text-orange-500">
                            1 hepde
                        </p>
                    </div>

                    <span :class="radioClass('direct')" />
                </div>
            </div>

            <!-- Transit -->
            <div @click="selected = 'transit'" :class="cardClass('transit')">
                <div class="flex items-start justify-between">
                    <div>
                        <p :class="titleClass('transit')">Transit</p>
                        <p class="text-sm mt-2 text-gray-400">
                            30 gün
                        </p>
                    </div>

                    <span :class="radioClass('transit')" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const selected = ref('direct')

const cardClass = (type) => [
    'w-60 rounded-xl p-5 cursor-pointer transition-all duration-200',
    selected.value === type
        ? 'border-2 border-orange-400 bg-orange-50'
        : 'bg-blue-50 border border-transparent'
]

const titleClass = (type) =>
    selected.value === type
        ? 'font-semibold text-orange-500'
        : 'font-medium text-gray-800'

const radioClass = (type) => [
    'w-5 h-5 rounded-full border flex items-center justify-center',
    selected.value === type
        ? 'border-orange-400'
        : 'border-gray-300',
    selected.value === type
        ? 'after:content-[""] after:w-3 after:h-3 after:bg-orange-400 after:rounded-full'
        : ''
]
</script>

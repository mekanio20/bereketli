<template>
    <div class="bg-[#F5F9FF] group hover:bg-[#002645] transition-all duration-300 md:h-[450px] h-[350px] rounded-[20px] px-6 py-10 flex flex-col space-y-10 justify-between cursor-pointer">
        <span class="font-semibold md:text-[20px] text-lg group-hover:text-white text-[#222222] leading-[100%]">
            {{ data.number }}
        </span>
        <p class="md:text-lg text-base group-hover:text-white text-[#222222] leading-[140%]">
            {{ data.comment }}
        </p>
        <div class="flex items-center space-x-4">
            <div class="sm:w-[50px] w-[40px] sm:h-[50px] h-[40px] rounded-full">
                <img :src="data.avatar" class="w-full h-full object-cover">
            </div>
            <div class="flex flex-col md:space-y-3 space-y-2">
                <h4 class="font-semibold md:text-lg text-base group-hover:text-white text-[#222222] leading-[100%]">
                    {{ data.full_name }}
                </h4>
                <p class="text-sm group-hover:text-white text-[#868686] leading-[100%]">
                    {{ data.profession }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    data: Object
})
</script>
<template>
    <div v-motion :initial="{ opacity: 0, y: 50 }" :visible="{ opacity: 1, y: 0 }" :hover="{ y: -8 }"
        class="group space-y-4 cursor-pointer transition-all duration-300">
        <div
            class="relative w-full h-[280px] overflow-hidden rounded-[14px] shadow-md group-hover:shadow-2xl transition-all duration-500">
            <img :src="image" :alt="title"
                class="w-full h-full object-cover rounded-[14px] transform group-hover:scale-110 transition-transform duration-700 ease-out">

            <!-- Gradient Overlay on Hover -->
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[14px]" />
        </div>

        <!-- Date with Icon Animation -->
        <div class="flex items-center gap-2">
            <date-icon />
            <p class="text-sm text-[#838589] leading-[100%] group-hover:text-[#555555] transition-colors duration-300">
                {{ date }}
            </p>
        </div>

        <!-- Title with Underline Effect -->
        <div class="relative">
            <h3 class="text-[20px] font-semibold leading-tight text-[#222222] 
           group-hover:text-[#ffa50d] transition-colors duration-300 truncate">
                {{ title }}
            </h3>
        </div>

        <!-- Floating Particles Effect -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden rounded-[14px]">
            <div v-for="i in 3" :key="i"
                class="absolute w-1 h-1 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100" :style="{
                    left: `${20 + i * 30}%`,
                    top: '50%',
                    animation: `float-up-${i} 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`
                }" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    image: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
})
</script>

<style scoped>
@keyframes float-up-1 {

    0%,
    100% {
        transform: translateY(0) scale(1);
        opacity: 0;
    }

    50% {
        transform: translateY(-30px) scale(1.5);
        opacity: 1;
    }
}

@keyframes float-up-2 {

    0%,
    100% {
        transform: translateY(0) scale(1);
        opacity: 0;
    }

    50% {
        transform: translateY(-40px) scale(1.3);
        opacity: 1;
    }
}

@keyframes float-up-3 {

    0%,
    100% {
        transform: translateY(0) scale(1);
        opacity: 0;
    }

    50% {
        transform: translateY(-35px) scale(1.4);
        opacity: 1;
    }
}

/* Smooth Hardware Acceleration */
.group {
    will-change: transform;
    backface-visibility: hidden;
    perspective: 1000px;
}

img {
    will-change: transform;
    backface-visibility: hidden;
}
</style>
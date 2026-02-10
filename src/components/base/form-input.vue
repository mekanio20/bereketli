<template>
    <input :id="label" :type="type" :placeholder="placeholder" :value="modelValue" :required="required" :min="min"
        :max="max" @input="$emit('update:modelValue', $event.target.value)"
        class="bg-[#EBF3FD] text-[#222222] h-[50px] font-medium outline-none w-full px-[30px] py-[9px] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300" />
</template>

<script setup>
defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    required: {
        type: Boolean,
        default: false
    },
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: Infinity
    },
    label: {
        type: String
    }
})
</script>

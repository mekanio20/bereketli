<template>
    <button class="btn btn-primary" :class="{'btn-block': block}"><slot></slot></button>
</template>

<script setup>
defineProps({
    block: {
        type: Boolean,
        default: false
    }
})
</script>
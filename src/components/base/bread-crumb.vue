<template>
    <nav class="flex items-center space-x-1 gap-1">
        <template v-for="(item, index) in items" :key="index">
            <!-- Breadcrumb Item -->
            <div class="flex items-center gap-1">
                <!-- If item has a link -->
                <router-link v-if="item.to && index < items.length - 1" :to="item.to" @click.stop class="flex items-center gap-1">
                    <component v-if="item?.icon" :is="icons[item?.icon]" />
                    <span v-if="item?.label" class="text-[13px] text-[#838589]">
                        {{ item?.label }}
                    </span>
                </router-link>

                <!-- Last item or non-link -->
                <div v-else class="flex items-center gap-1">
                    <component v-if="item.icon" :is="icons[item?.icon]" />
                    <span class="text-sm" :class="index < items.length - 1 ? 'text-[#838589]' : 'text-[#222222] font-medium'">
                        {{ item.label }}
                    </span>
                </div>
            </div>

            <!-- Separator -->
            <span v-if="index < items.length - 1">
                <angle_small_left-icon />
            </span>
        </template>
    </nav>
</template>

<script setup>
const { icons } = useIcons();
defineProps({
    items: {
        type: Array,
        default: () => []
    },
});
</script>

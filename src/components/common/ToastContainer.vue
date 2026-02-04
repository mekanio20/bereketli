<template>
  <div
    v-if="toasts.length"
    class="fixed sm:top-32 top-20 right-0 z-[60] space-y-3"
  >
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="sm:w-[400px] w-full rounded-lg px-4 py-3 flex items-start gap-3"
        :class="bgClass(toast.type)"
      >
        <div class="mt-0.5">
          <component
            :is="iconComponent(toast.type)"
            :size="22"
            :color="iconColor(toast.type)"
          />
        </div>

        <div class="flex-1 min-w-0">
          <p
            v-if="toast.title"
            class="text-sm font-semibold mb-1"
            :class="titleClass(toast.type)"
          >
            {{ toast.title }}
          </p>
          <div class="text-xs sm:text-[13px] text-[#444] space-y-1">
            <p
              v-for="(line, idx) in messageLines(toast.message)"
              :key="idx"
              class="leading-snug"
            >
              {{ line }}
            </p>
          </div>
        </div>

        <button
          type="button"
          class="flex-shrink-0 mt-0.5 text-[#9CA3AF] hover:text-[#4B5563] transition-colors"
          @click="close(toast.id)"
        >
          <close-icon :size="16" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useToastStore } from "@/stores/toast";

const toastStore = useToastStore();
const { items: toasts } = storeToRefs(toastStore);

const close = (id) => {
  toastStore.hide(id);
};

const messageLines = (message) => {
  if (!message) return [];
  return String(message)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
};

const bgClass = (type) => {
  if (type === "success") return "bg-green-50";
  if (type === "info") return "bg-blue-50";
  return "bg-red-50";
}

const titleClass = (type) => {
  if (type === "success") return "text-[#16A34A]";
  if (type === "info") return "text-[#1D4ED8]";
  return "text-[#B91C1C]";
};

const iconComponent = (type) => {
  if (type === "success") return "dote_2-icon";
  if (type === "info") return "message-icon";
  return "x-icon";
};

const iconColor = (type) => {
  if (type === "success") return "#22C55E";
  if (type === "info") return "#3B82F6";
  return "#EF4444";
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease-out;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(8px) translateX(10px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(8px) translateX(10px);
}
</style>


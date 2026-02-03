<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        @click.self="$emit('close')">
        <div
          class="relative w-full max-w-[800px] bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300"
          :class="{ 'animate-scale-in': isOpen }">
          <!-- Close Button -->
          <button @click="$emit('close')"
            class="absolute top-6 right-6 z-10 w-[50px] h-[50px] flex items-center justify-center rounded-full bg-[#F3F8FF] hover:bg-[#edf5ff] hover:scale-110 transform transition-all duration-300 group"
            aria-label="Close">
            <close-icon :size="24" />
          </button>

          <div class="p-8 md:p-10">
            <!-- Header -->
            <div class="mb-4 animate-fade-in">
              <h2 class="text-[30px] text-center font-bold text-[#222222] mb-10">
                Ammar maglumatlary
              </h2>
              <p class="text-gray-500 text-sm">
               {{ warehouse.name }}
              </p>
            </div>
            
            <!-- Address Section -->
            <div class="mb-8 animate-slide-up" style="animation-delay: 0.1s">
              <div class="flex items-center gap-8 mb-6">
                <h3 class="text-[30px] font-semibold text-[#222222]">
                  {{ warehouse.address }}
                </h3>
                <span
                  class="px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
                  :class="[warehouse.isOpen ? 'bg-[#B3FFCE] text-[#009D37]' : 'bg-[#FFC1C0] text-[#B50200]']">
                  {{ warehouse.isOpen ? 'Açyk' : 'Ýapyk' }}
                </span>
              </div>

              <!-- View on Map Button -->
              <a target="_blank" :href="warehouse.location"
                class="flex items-center gap-3 px-[10px] py-2 bg-[#002645] text-white rounded-full hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 group">
                <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-105 transform transition-all duration-300">
                    <route-icon />
                </div>
                <span class="font-semibold pl-4 pr-6">Kartada görmek</span>
              </a>
            </div>

            <!-- Information Section -->
            <div class="space-y-1 border-t border-[#EDEDED] pt-8 animate-slide-up" style="animation-delay: 0.2s">
              <h4 class="text-lg font-semibold text-[#222222] mb-4">
                Maglumatlar
              </h4>

              <!-- Working Hours -->
              <div class="flex items-center gap-4 group py-3 rounded-xl transition-all duration-300">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-[#FFBE0033] rounded-full flex items-center justify-center group-hover:scale-110 transform transition-all duration-300">
                  <clock-icon :color="'#FFBE00'" :size="17" />
                </div>
                <div class="flex-1">
                  <p class="text-base font-medium text-[#222222]">
                   {{ warehouse.work_hours_start }} / {{ warehouse.work_hours_end }}
                  </p>
                </div>
              </div>
              <!-- Contact Numbers -->
              <div class="flex items-center gap-4 group py-3 rounded-xl transition-all duration-300">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-[#FFBE0033] rounded-full flex items-center justify-center group-hover:scale-110 transform transition-all duration-300">
                  <phone-icon :color="'#FFBE00'" :size="17" />
                </div>
                <div class="flex-1 space-y-1">
                  <p class="text-base font-medium text-[#222222]">
                    {{ warehouse.phone }}
                  </p>
                </div>
              </div>
              <!-- Email -->
              <div class="flex items-center gap-4 group py-3 rounded-xl transition-all duration-300">
                <div
                  class="flex-shrink-0 w-10 h-10 bg-[#FFBE0033] rounded-full flex items-center justify-center group-hover:scale-110 transform transition-all duration-300">
                  <mail-icon :color="'#FFBE00'" :size="17" />
                </div>
                <div class="flex-1">
                  <p class="text-base font-medium text-[#222222]">
                    {{ warehouse.email }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const emit = defineEmits(['close'])
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  warehouse: {
    type: Object,
    default: () => {}
  }
})
const statusBadgeClass = computed(() => {
    switch (props.warehouse.status) {
        case 'open':
            return 'bg-[#B3FFCE] text-[#009D37]'
        case 'closed':
            return 'bg-[#FFC1C0] text-[#B50200]'
        default:
            return 'bg-gray-100 text-gray-800'
    }
})
</script>

<style scoped>
/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .animate-scale-in {
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out;
  opacity: 0;
  animation-fill-mode: forwards;
}
</style>
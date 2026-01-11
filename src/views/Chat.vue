<template>
    <section class="overflow-x-hidden relative">
        <MainContainer>
            <SectionContainer class="pb-20">
                <div class="flex">
                    <!-- Hidden File Inputs -->
                    <input ref="imageInput" type="file" accept="image/*" multiple class="hidden"
                        @change="handleImageSelect" />
                    <input ref="fileInput" type="file" multiple class="hidden" @change="handleFileSelect" />

                    <!-- Sidebar - Chat List -->
                    <aside class="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col">
                        <!-- Sidebar Header -->
                        <div class="p-6 border-b border-gray-200">
                            <h1 class="text-2xl font-bold text-gray-900">Habarlaşmak</h1>
                        </div>

                        <!-- Chat List -->
                        <div class="flex-1 overflow-y-auto">
                            <!-- Active Chat -->
                            <button v-for="chat in chats" :key="chat.id" @click="selectChat(chat)"
                                class="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100"
                                :class="{ 'bg-blue-50 border-l-4 border-l-orange-500': selectedChat?.id === chat.id }">
                                <div class="relative">
                                    <div
                                        class="w-14 h-14 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                                        <img v-if="chat.avatar" :src="chat.avatar" :alt="chat.name"
                                            class="w-full h-full object-cover" />
                                        <svg v-else class="w-7 h-7 text-gray-500" fill="currentColor"
                                            viewBox="0 0 24 24">
                                            <path d="M3 3h18v18H3V3zm16 2H5v14h14V5zm-3 7H8v2h8v-2z" />
                                        </svg>
                                    </div>
                                    <!-- Badge -->
                                    <span v-if="chat.unreadCount"
                                        class="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                        {{ chat.unreadCount }}
                                    </span>
                                    <!-- Verified Badge -->
                                    <div v-if="chat.verified"
                                        class="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                                        <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <div class="flex-1 text-left min-w-0">
                                    <div class="flex items-center justify-between mb-1">
                                        <h3 class="font-semibold text-gray-900 truncate">{{ chat.name }}</h3>
                                    </div>
                                    <p class="text-sm text-gray-500 truncate">{{ chat.lastMessage }}</p>
                                </div>
                            </button>
                        </div>
                    </aside>

                    <!-- Main Chat Area -->
                    <main v-if="selectedChat" class="flex-1 flex flex-col bg-white">
                        <!-- Chat Header -->
                        <header class="flex items-center gap-4 p-6 bg-white border-b border-gray-200 shadow-sm">
                            <button @click="selectedChat = null"
                                class="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                            </button>
                            <div
                                class="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                                <img v-if="selectedChat.avatar" :src="selectedChat.avatar" :alt="selectedChat.name"
                                    class="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h2 class="text-xl font-bold text-gray-900">{{ selectedChat.name }}</h2>
                            </div>
                        </header>

                        <!-- Messages Area -->
                        <div ref="messagesContainer"
                            class="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-br from-gray-50 to-white">
                            <!-- Date Separator -->
                            <div class="flex justify-center">
                                <span class="px-4 py-1.5 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                    Sentyabr 2, 2025
                                </span>
                            </div>

                            <!-- Messages -->
                            <div v-for="message in messages" :key="message.id" class="flex items-start gap-3"
                                :class="{ 'flex-row-reverse': message.isMine }">
                                <!-- Avatar -->
                                <div v-if="!message.isMine"
                                    class="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    <img v-if="message.avatar" :src="message.avatar" :alt="message.sender"
                                        class="w-full h-full object-cover" />
                                </div>

                                <div class="flex flex-col max-w-xl" :class="{ 'items-end': message.isMine }">
                                    <!-- Sender Name -->
                                    <span v-if="!message.isMine" class="text-sm font-semibold text-gray-900 mb-1 ml-1">
                                        {{ message.sender }}
                                    </span>

                                    <!-- Text Message Bubble -->
                                    <div v-if="message.type === 'text'" class="relative group">
                                        <div class="px-5 py-3 rounded-2xl shadow-sm" :class="message.isMine
                                            ? 'bg-gradient-to-r from-[#002244] to-[#003366] text-white rounded-tr-sm'
                                            : 'bg-blue-50 text-gray-900 rounded-tl-sm'">
                                            <p class="text-base leading-relaxed">{{ message.content }}</p>
                                        </div>
                                        <span class="text-xs text-gray-500 mt-1 block"
                                            :class="{ 'text-right': message.isMine }">
                                            {{ message.time }}
                                        </span>
                                    </div>

                                    <!-- Image Message -->
                                    <div v-else-if="message.type === 'image'" class="relative group">
                                        <div
                                            class="rounded-2xl overflow-hidden shadow-lg max-w-sm cursor-pointer hover:opacity-90 transition-opacity">
                                            <img :src="message.imageUrl" :alt="message.fileName" class="w-full h-auto"
                                                @click="downloadFile(message.imageUrl, message.fileName)" />
                                        </div>
                                        <button @click="downloadFile(message.imageUrl, message.fileName)"
                                            class="absolute top-2 right-2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
                                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </button>
                                        <span class="text-xs text-gray-500 mt-1 block"
                                            :class="{ 'text-right': message.isMine }">
                                            {{ message.time }}
                                        </span>
                                    </div>

                                    <!-- File Message -->
                                    <div v-else-if="message.type === 'file'"
                                        class="bg-blue-50 rounded-2xl p-4 shadow-sm max-w-xs hover:bg-blue-100 transition-colors cursor-pointer group">
                                        <button @click="downloadFile(message.fileUrl, message.fileName)" class="w-full">
                                            <div class="flex items-center gap-3">
                                                <div
                                                    class="w-12 h-12 bg-gradient-to-br from-[#002244] to-[#003366] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div class="flex-1 min-w-0 text-left">
                                                    <p class="font-semibold text-gray-900 truncate">{{ message.fileName
                                                        }}</p>
                                                    <p class="text-sm text-gray-500">{{ message.fileSize }}</p>
                                                </div>
                                            </div>
                                        </button>
                                        <span class="text-xs text-gray-500 mt-2 block">{{ message.time }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- File Preview Area -->
                        <Transition name="slide-up">
                            <div v-if="selectedFiles.length > 0" class="border-t border-gray-200 bg-gray-50 p-4">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="text-sm font-semibold text-gray-700">Selected Files ({{
                                        selectedFiles.length }})</span>
                                    <button @click="clearAllFiles"
                                        class="ml-auto text-sm text-red-600 hover:text-red-700 font-medium">
                                        Clear All
                                    </button>
                                </div>
                                <div class="flex gap-3 overflow-x-auto pb-2">
                                    <!-- Image Previews -->
                                    <div v-for="(file, index) in selectedFiles" :key="index"
                                        class="relative flex-shrink-0 group">
                                        <div v-if="file.type === 'image'"
                                            class="w-24 h-24 rounded-xl overflow-hidden bg-gray-200 shadow-md">
                                            <img :src="file.preview" :alt="file.name"
                                                class="w-full h-full object-cover" />
                                        </div>

                                        <!-- File Preview -->
                                        <div v-else
                                            class="w-24 h-24 rounded-xl bg-white border-2 border-gray-200 shadow-md p-2 flex flex-col items-center justify-center">
                                            <svg class="w-8 h-8 text-gray-500 mb-1" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            <span class="text-xs text-gray-600 truncate w-full text-center">{{ file.name
                                                }}</span>
                                        </div>

                                        <!-- Remove Button -->
                                        <button @click="removeFile(index)"
                                            class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>

                                        <!-- File Size -->
                                        <span
                                            class="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                                            {{ file.size }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Transition>

                        <!-- Message Input -->
                        <footer class="p-6 bg-white border-t border-gray-200">
                            <form @submit.prevent="sendMessage" class="flex items-center gap-3">
                                <!-- Attachment Button -->
                                <button type="button" @click="openImagePicker"
                                    class="w-11 h-11 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                                    title="Send Image">
                                    <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </button>

                                <!-- File Button -->
                                <button type="button" @click="openFilePicker"
                                    class="w-11 h-11 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                                    title="Send File">
                                    <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                </button>

                                <!-- Message Input -->
                                <input v-model="newMessage" type="text" placeholder="SMS ýazyň..."
                                    class="flex-1 px-6 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300" />

                                <!-- Send Button -->
                                <button type="submit" :disabled="!newMessage.trim() && selectedFiles.length === 0"
                                    class="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    <span class="hidden sm:inline">Ugrat</span>
                                </button>
                            </form>
                        </footer>
                    </main>

                    <!-- Empty State -->
                    <div v-else class="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                        <div class="text-center">
                            <div
                                class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <p class="text-xl text-gray-500">Söhbetdeşligi saýlaň</p>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </MainContainer>
    </section>
</template>

<script setup>
const selectedChat = ref(null)
const newMessage = ref('')
const messagesContainer = ref(null)
const imageInput = ref(null)
const fileInput = ref(null)
const selectedFiles = ref([])

const chats = reactive([
  {
    id: 1,
    name: 'Bereketli Logistika',
    lastMessage: '#RW3E-74ESW4',
    unreadCount: 3,
    verified: true,
    avatar: null
  },
  {
    id: 2,
    name: '#RW3E-74ESW4',
    lastMessage: '',
    unreadCount: 0,
    verified: false,
    avatar: null
  },
  {
    id: 3,
    name: '#RW3E-74ESW4',
    lastMessage: '',
    unreadCount: 0,
    verified: false,
    avatar: null
  },
  {
    id: 4,
    name: '#RW3E-74ESW4',
    lastMessage: '',
    unreadCount: 0,
    verified: false,
    avatar: null
  }
])

const messages = reactive([
  {
    id: 1,
    sender: 'Aman Myradow',
    content: 'Salam! Hawa, sargydyňyz paylaýyş merkezimize gelipdir.',
    time: '18:30',
    isMine: false,
    type: 'text',
    avatar: null
  },
  {
    id: 2,
    content: 'Haýsy adrese baryp almalyň?',
    time: '6:34 pm',
    isMine: true,
    type: 'text'
  },
  {
    id: 3,
    sender: 'Leýli Aşyrowa',
    fileName: 'Sertnama.docx',
    fileSize: '30.4 KB',
    fileUrl: 'data:text/plain;base64,SGVsbG8gV29ybGQ=',
    time: '18:30',
    isMine: false,
    type: 'file'
  }
])

const selectChat = (chat) => {
  selectedChat.value = chat
  chat.unreadCount = 0
  nextTick(() => {
    scrollToBottom()
  })
}

const sendMessage = () => {
  const hasText = newMessage.value.trim()
  const hasFiles = selectedFiles.value.length > 0

  if (!hasText && !hasFiles) return

  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  // Send text message if exists
  if (hasText) {
    const textMessage = {
      id: messages.length + 1,
      content: newMessage.value,
      time: currentTime,
      isMine: true,
      type: 'text'
    }
    messages.push(textMessage)
    newMessage.value = ''
  }

  // Send all selected files
  selectedFiles.value.forEach(file => {
    const fileMessage = {
      id: messages.length + 1,
      type: file.type === 'image' ? 'image' : 'file',
      ...(file.type === 'image' ? { imageUrl: file.preview } : { fileUrl: file.preview }),
      fileName: file.name,
      fileSize: file.size,
      time: currentTime,
      isMine: true
    }
    messages.push(fileMessage)
  })

  // Clear selected files
  selectedFiles.value = []

  nextTick(() => {
    scrollToBottom()
  })
}

const openImagePicker = () => {
  imageInput.value?.click()
}

const openFilePicker = () => {
  fileInput.value?.click()
}

const handleImageSelect = (event) => {
  const files = event.target.files
  if (!files || files.length === 0) return

  Array.from(files).forEach(file => {
    if (!file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = (e) => {
      selectedFiles.value.push({
        type: 'image',
        name: file.name,
        size: formatFileSize(file.size),
        preview: e.target.result,
        file: file
      })
    }
    reader.readAsDataURL(file)
  })

  event.target.value = ''
}

const handleFileSelect = (event) => {
  const files = event.target.files
  if (!files || files.length === 0) return

  Array.from(files).forEach(file => {
    const reader = new FileReader()
    reader.onload = (e) => {
      selectedFiles.value.push({
        type: 'file',
        name: file.name,
        size: formatFileSize(file.size),
        preview: e.target.result,
        file: file
      })
    }
    reader.readAsDataURL(file)
  })

  event.target.value = ''
}

const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

const clearAllFiles = () => {
  selectedFiles.value = []
}

const downloadFile = (url, filename) => {
  const link = document.createElement('a')
  link.href = url
  link.download = filename || 'download'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>

<style scoped>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Slide up transition */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
<template>
    <section class="overflow-x-hidden relative">
        <!-- Absolute -->
        <div class="absolute -z-10 w-full h-full bg-[#F3F8FF]">
            <img :src="background" class="w-full h-full object-contain" />
        </div>
        <MainContainer>
            <SectionContainer>
                <div class="flex space-x-5">
                    <!-- Hidden File Inputs -->
                    <input ref="imageInput" type="file" accept="image/*" multiple class="hidden"
                        @change="handleImageSelect" />
                    <input ref="fileInput" type="file" multiple class="hidden" @change="handleFileSelect" />

                    <!-- Sidebar - Chat List -->
                    <aside class="w-full md:w-96 bg-white flex flex-col rounded-[26px] max-h-[600px] overflow-y-auto">
                        <!-- Sidebar Header -->
                        <div class="p-6">
                            <h1 class="text-[22px] font-semibold text-[#222222]">Habarlaşmak</h1>
                        </div>

                        <!-- Chat List -->
                        <div class="flex-1 overflow-y-auto">
                            <!-- Active Chat -->
                            <button v-for="chat in chats" :key="chat.id" @click="selectChat(chat)"
                                class="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100"
                                :class="{ 'bg-blue-50 border-l-2 border-l-[#3B82F6]': selectedChat?.id === chat.id }">
                                <div class="relative">
                                    <div
                                        class="w-[50px] h-[50px] bg-[#D4D9E7] rounded-full flex items-center justify-center overflow-hidden">
                                        <img v-if="chat.avatar" :src="chat.avatar" :alt="chat.name"
                                            class="w-full h-full object-cover" />
                                    </div>
                                    <!-- Badge -->
                                    <span v-if="chat.unreadCount"
                                        class="absolute -top-1 -right-1 w-[20px] h-[20px] bg-[#E62927] text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                        {{ chat.unreadCount }}
                                    </span>
                                </div>
                                <div class="flex-1 text-left min-w-0">
                                    <div class="flex items-center justify-between mb-1">
                                        <h3 class="font-semibold text-[#222222] truncate">{{ chat.name }}</h3>
                                    </div>
                                    <p class="text-sm text-[#838589] truncate">{{ chat.lastMessage }}</p>
                                </div>
                            </button>
                        </div>
                    </aside>

                    <!-- Main Chat Area -->
                    <main v-if="selectedChat" class="flex-1 flex flex-col bg-white rounded-[26px] max-h-[600px] overflow-y-auto">
                        <!-- Chat Header -->
                        <header class="flex items-center gap-4 px-6 py-5 border-b border-[#EDEDED]">
                            <div
                                class="w-10 h-10 bg-[#EBF3FD] rounded-full flex items-center justify-center overflow-hidden cursor-pointer hover:bg-blue-100 duration-100">
                                 <arrow_down-icon class="rotate-[90deg]" :size="18" />
                            </div>
                            <div>
                                <h2 class="text-xl font-bold text-[#222222]">Bereketli Logistika</h2>
                            </div>
                        </header>

                        <!-- Messages Area -->
                        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-6">
                            <!-- Date Separator -->
                            <div class="flex justify-center">
                                <span
                                    class="px-4 py-1.5 bg-[#EBF3FD] text-[#474747] text-[12px] font-medium rounded-full">
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
                                    <span v-if="!message.isMine"
                                        class="text-[15px] font-semibold text-[#222222] mb-2 ml-1">
                                        {{ message.sender }}
                                    </span>

                                    <!-- Text Message Bubble -->
                                    <div v-if="message.type === 'text'" class="relative group">
                                        <div class="px-5 py-3 rounded-2xl shadow-sm" :class="message.isMine
                                            ? 'bg-[#002645] text-white rounded-tr-sm'
                                            : 'bg-[#EBF3FD] text-[#222222] rounded-tl-sm'">
                                            <p class="text-base leading-relaxed">{{ message.content }}</p>
                                        </div>
                                        <span class="text-xs text-[#838589] mt-1 block"
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
                                            <arrow_down-icon color="white" :size="20" />
                                        </button>
                                        <span class="text-xs text-[#838589] mt-1 block"
                                            :class="{ 'text-right': message.isMine }">
                                            {{ message.time }}
                                        </span>
                                    </div>

                                    <!-- File Message -->
                                    <div v-else-if="message.type === 'file'"
                                        class="bg-[#EBF3FD] rounded-b-[20px] rounded-tr-[20px] p-4 shadow-sm hover:bg-blue-100 transition-colors cursor-pointer group">
                                        <button @click="downloadFile(message.fileUrl, message.fileName)" class="w-full">
                                            <div class="flex items-center gap-3">
                                                <div
                                                    class="p-2 bg-[#002645] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                                    <arrow_down-icon color="white" :size="20" />
                                                </div>
                                                <div class="flex-1 min-w-[200px] text-left">
                                                    <p class="font-medium text-[#222222] truncate">{{ message.fileName
                                                        }}</p>
                                                    <div class="flex items-center justify-between mt-[2px]">
                                                        <p class="text-[13px] text-[#838589]">{{ message.fileSize }}</p>
                                                        <span class="text-[13px] text-[#838589]">{{ message.time
                                                            }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- File Preview Area -->
                        <Transition name="slide-up">
                            <div v-if="selectedFiles.length > 0" class="border-t border-[#EDEDED] p-4">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="text-sm font-semibold text-[#222222]">Selected Files ({{
                                        selectedFiles.length }})</span>
                                    <button @click="clearAllFiles"
                                        class="ml-auto text-sm text-red-600 hover:text-red-700 font-medium">
                                        Clear All
                                    </button>
                                </div>
                                <div class="flex gap-3 overflow-x-auto py-2">
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
                                            <file-icon />
                                            <span class="text-xs text-gray-600 truncate w-full text-center">{{ file.name
                                            }}</span>
                                        </div>

                                        <!-- Remove Button -->
                                        <button @click="removeFile(index)"
                                            class="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            <close-icon color="white" :size="14" />
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
                        <footer class="p-6 border-t border-[#EDEDED]">
                            <form @submit.prevent="sendMessage" class="flex items-center gap-1">
                                <!-- Attachment Button -->
                                <button type="button" @click="openImagePicker"
                                    class="p-2 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                                    <camera-icon />
                                </button>

                                <!-- File Button -->
                                <button type="button" @click="openFilePicker"
                                    class="p-2 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                                    <attachment-icon />
                                </button>

                                <!-- Message Input -->
                                <form-input v-model="newMessage" type="text" placeholder="SMS ýazyň..."
                                    class="rounded-full placeholder:text-[#838589] font-normal text-[#222222] mx-2" />

                                <!-- Send Button -->
                                <button type="submit" :disabled="!newMessage.trim() && selectedFiles.length === 0"
                                    class="px-6 py-3 bg-custom-gradient rounded-full transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2">
                                    <send_solid-icon />
                                    <span class="hidden sm:inline text-white font-semibold text-sm">Ugrat</span>
                                </button>
                            </form>
                        </footer>
                    </main>

                    <!-- Empty State -->
                    <div v-else class="flex-1 flex items-center justify-center bg-white rounded-[26px]">
                        <div class="text-center">
                            <div
                                class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <message-icon color="#838589" :size="50" />
                            </div>
                            <p class="text-xl text-[#838589]">Söhbetdeşligi saýlaň</p>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </MainContainer>
    </section>
</template>

<script setup>
import background from '@/assets/images/background.webp'
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
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
                    <aside class="w-1/3 bg-white flex flex-col rounded-[26px] h-[600px] overflow-y-auto">
                        <!-- Sidebar Header -->
                        <div class="p-6">
                            <h1 class="text-[22px] font-semibold text-[#222222]">Habarlaşmak</h1>

                            <!-- Search Input -->
                            <!-- <div class="mt-4">
                                <form-input v-model="searchQuery" type="text" placeholder="Gözleg..."
                                    @input="handleSearch"
                                    class="rounded-full placeholder:text-[#838589] font-normal text-[#222222]" />
                            </div> -->
                        </div>

                        <!-- Chat List -->
                        <div class="flex-1 overflow-y-auto">
                            <!-- Loading State -->
                            <div v-if="roomStore.loading" class="flex items-center justify-center p-8">
                                <div
                                    class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin">
                                </div>
                            </div>

                            <!-- Chat Items -->
                            <button v-for="(room, index) in roomStore.rooms" :key="room.id" @click="selectChat(room)"
                                class="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors duration-200"
                                :class="{ 'bg-blue-50 border-l-2 border-l-[#3B82F6]': selectedRoom?.id === room.id, 'border-b border-gray-100': index < roomStore.rooms.length - 1 }">
                                <div class="relative">
                                    <div
                                        class="w-[50px] h-[50px] bg-[#D4D9E7] rounded-full flex items-center justify-center overflow-hidden">
                                        <span class="text-lg font-semibold text-gray-600">
                                            {{ getChatInitials(room) }}
                                        </span>
                                    </div>
                                    <!-- Badge -->
                                    <span v-if="room.unread_count > 0"
                                        class="absolute -top-1 -right-1 w-[20px] h-[20px] bg-[#E62927] text-white text-xs font-semibold rounded-full flex items-center justify-center">
                                        {{ room.unread_count }}
                                    </span>
                                </div>
                                <div class="flex-1 text-left min-w-0">
                                    <div class="flex items-center justify-between mb-1">
                                        <h3 class="font-semibold text-[#222222] truncate">{{ getChatName(room) }}</h3>
                                    </div>
                                    <p class="text-sm text-[#838589] truncate">
                                        {{ room.last_message?.text || 'Heniz sms ýok' }}
                                    </p>
                                    <p v-if="room.last_message_time" class="text-xs text-[#838589] mt-1">
                                        {{ room.last_message_time }}
                                    </p>
                                </div>
                            </button>
                        </div>
                    </aside>

                    <!-- Main Chat Area -->
                    <main v-if="selectedRoom"
                        class="flex-1 flex flex-col bg-white rounded-[26px] h-[600px] overflow-y-auto">
                        <!-- Chat Header -->
                        <header class="flex items-center gap-4 px-6 py-5 border-b border-[#EDEDED]">
                            <div class="w-10 h-10 bg-[#EBF3FD] rounded-full flex items-center justify-center overflow-hidden cursor-pointer hover:bg-blue-100 duration-100"
                                @click="selectedRoom = null">
                                <arrow_down-icon class="rotate-[90deg]" :size="18" />
                            </div>
                            <div>
                                <h2 class="text-xl font-bold text-[#222222]">{{ getChatName(selectedRoom) }}</h2>
                                <p class="text-sm text-[#838589]">{{ selectedRoom.code }}</p>
                            </div>
                        </header>

                        <!-- Messages Area -->
                        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-6">
                            <!-- Load More Button -->
                            <div v-if="hasMoreMessages" class="flex justify-center">
                                <button type="button" @click="loadMoreMessages" :disabled="loadingMoreMessages"
                                    class="px-4 py-2 bg-[#EBF3FD] hover:bg-blue-200 text-[#002645] rounded-full text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                                    <div v-if="loadingMoreMessages"
                                        class="w-4 h-4 border-2 border-[#002645] border-t-transparent rounded-full animate-spin">
                                    </div>
                                    <span>{{ loadingMoreMessages ? 'Ýükleniýär...' : 'Öňki habarlary ýükle' }}</span>
                                </button>
                            </div>

                            <!-- Loading Messages -->
                            <div v-if="messageStore.loading" class="flex items-center justify-center p-8">
                                <div
                                    class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin">
                                </div>
                            </div>

                            <!-- Empty State -->
                            <div v-else-if="messageStore.messages.length === 0"
                                class="flex items-center justify-center p-8">
                                <p class="text-[#838589]">Heniz sms ýok</p>
                            </div>

                            <!-- Messages -->
                            <div v-else v-for="message in messageStore.messages" :key="message.id"
                                class="flex items-start gap-3"
                                :class="{ 'flex-row-reverse': isMyMessage(message, currentUser) }">
                                <!-- Avatar -->
                                <div v-if="!isMyMessage(message, currentUser)"
                                    class="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                                    <img v-if="message.sender?.avatar" :src="message.sender.avatar"
                                        :alt="getSenderName(message)" class="w-full h-full object-cover" />
                                    <span v-else class="text-sm font-semibold text-gray-600">
                                        {{ getSenderInitials(message) }}
                                    </span>
                                </div>

                                <div class="flex flex-col max-w-xl"
                                    :class="{ 'items-end': isMyMessage(message, currentUser) }">
                                    <!-- Text Message Bubble -->
                                    <div v-if="message.text" class="relative group">
                                        <div class="px-5 py-3 rounded-2xl shadow-sm" :class="isMyMessage(message, currentUser)
                                            ? 'bg-[#002645] text-white rounded-tr-sm'
                                            : 'bg-[#EBF3FD] text-[#222222] rounded-tl-sm'">
                                            <p class="text-base leading-relaxed">{{ message.text }}</p>
                                        </div>
                                        <span class="text-xs text-[#838589] mt-1 block"
                                            :class="{ 'text-right': isMyMessage(message, currentUser) }">
                                            {{ message.date_created }}
                                        </span>
                                    </div>

                                    <!-- Attachments -->
                                    <div v-if="message.attachments && message.attachments.length > 0"
                                        class="space-y-2 mt-2">
                                        <div v-for="attachment in message.attachments" :key="attachment.id">
                                            <!-- Image Attachment -->
                                            <div v-if="isImageFile(attachment)" class="relative group">
                                                <div
                                                    class="rounded-2xl overflow-hidden shadow-lg max-w-sm cursor-pointer hover:opacity-90 transition-opacity">
                                                    <img :src="attachment.path" :alt="attachment.name"
                                                        class="w-full h-auto"
                                                        @click="downloadFile(attachment.path, attachment.name)" />
                                                </div>
                                                <button type="button"
                                                    @click="downloadFile(attachment.path, attachment.name)"
                                                    class="absolute top-2 right-2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
                                                    <arrow_down-icon color="white" :size="20" />
                                                </button>
                                            </div>

                                            <!-- File Attachment -->
                                            <div v-else
                                                class="bg-[#EBF3FD] rounded-b-[20px] rounded-tr-[20px] p-4 shadow-sm hover:bg-blue-100 transition-colors cursor-pointer group">
                                                <button @click="downloadFile(attachment.path, attachment.name)"
                                                    class="w-full">
                                                    <div class="flex items-center gap-3">
                                                        <div
                                                            class="p-2 bg-[#002645] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                                            <arrow_down-icon color="white" :size="20" />
                                                        </div>
                                                        <div class="flex-1 max-w-[200px] text-left">
                                                            <p class="font-medium text-[#222222] truncate">
                                                                {{ attachment.name }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                            <span class="text-xs text-[#838589] mt-1 block"
                                                :class="{ 'text-right': isMyMessage(message, currentUser) }">
                                                {{ message.date_created }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- File Preview Area -->
                        <Transition name="slide-up">
                            <div v-if="selectedFiles.length > 0" class="border-t border-[#EDEDED] p-4">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="text-sm font-semibold text-[#222222]">
                                        Saýlanan faýllar ({{ selectedFiles.length }})
                                    </span>
                                    <button type="button" @click="selectedFiles = []"
                                        class="ml-auto text-sm text-red-600 hover:text-red-700 font-medium">
                                        Hemmesini aýyr
                                    </button>
                                </div>
                                <div class="flex gap-3 overflow-x-auto py-2">
                                    <div v-for="(file, index) in selectedFiles" :key="index"
                                        class="relative flex-shrink-0 group">
                                        <div v-if="file.type === 'image'"
                                            class="w-24 h-24 rounded-xl overflow-hidden bg-gray-200 shadow-md">
                                            <img :src="file.preview" :alt="file.name"
                                                class="w-full h-full object-cover" />
                                        </div>

                                        <div v-else
                                            class="w-24 h-24 rounded-xl bg-white border-2 border-gray-200 shadow-md p-2 flex flex-col items-center justify-center">
                                            <file-icon />
                                            <span class="text-xs text-gray-600 truncate w-full text-center">
                                                {{ file.name }}
                                            </span>
                                        </div>

                                        <button type="button" @click="(index) => selectedFiles.splice(index, 1)"
                                            class="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                            <close-icon color="white" :size="14" />
                                        </button>

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
                                <button type="button" @click="imageInput?.click()"
                                    class="p-2 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                                    <camera-icon />
                                </button>

                                <button type="button" @click="fileInput?.click()"
                                    class="p-2 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
                                    <attachment-icon />
                                </button>

                                <form-input v-model="newMessage" type="text" placeholder="SMS ýazyň..."
                                    class="rounded-full placeholder:text-[#838589] font-normal text-[#222222] mx-2" />

                                <button type="submit"
                                    :disabled="(!newMessage.trim() && selectedFiles.length === 0) || isSending"
                                    class="px-6 py-3 bg-custom-gradient rounded-full transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2">
                                    <send_solid-icon v-if="!isSending" />
                                    <div v-else
                                        class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin">
                                    </div>
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
import { getUserId, getAccessToken } from "@/composables/useTokens";
import { getChatName, getChatInitials, getSenderName, getSenderInitials } from '@/utils/strings'
import { isImageFile, isMyMessage } from '@/utils/booleans'
import { formatFileSize } from '@/utils/numbers'

// Stores
const roomStore = useRoomStore()
const messageStore = useMessageStore()
const fileStore = useFileStore()

// Refs
const messagesContainer = ref(null)
const imageInput = ref(null)
const fileInput = ref(null)

const selectedRoom = ref(null)
const newMessage = ref('')
const selectedFiles = ref([])
const isSending = ref(false)
const searchQuery = ref('')
const searchTimeout = ref(null)

// Pagination
const currentOffset = ref(0)
const messageLimit = ref(10)
const hasMoreMessages = ref(false)
const loadingMoreMessages = ref(false)

// WebSocket
const socket = ref(null)
const reconnectTimer = ref(null)
const isManuallyClosed = ref(false)
const currentUser = ref(null)

// Search handling
const handleSearch = () => {
    clearTimeout(searchTimeout.value)
    searchTimeout.value = setTimeout(async () => {
        await roomStore.getRooms({ search: searchQuery.value })
    }, 500)
}

// Load more messages
const loadMoreMessages = async () => {
    if (!selectedRoom.value || loadingMoreMessages.value) return

    loadingMoreMessages.value = true
    const newOffset = currentOffset.value + messageLimit.value

    try {
        const result = await messageStore.getMessages({
            room_code: selectedRoom.value.code,
            limit: messageLimit.value,
            offset: newOffset
        })

        if (result && result.length > 0) {
            currentOffset.value = newOffset
            hasMoreMessages.value = result.length === messageLimit.value
        } else {
            hasMoreMessages.value = false
        }
    } catch (error) {
        console.error('Error loading more messages:', error)
    } finally {
        loadingMoreMessages.value = false
    }
}

// WebSocket connection
const connectToWebSocket = () => {
    const token = getAccessToken()
    if (!token) {
        console.warn('WebSocket token not found')
        return
    }

    if (socket.value && socket.value.readyState === WebSocket.OPEN) return

    isManuallyClosed.value = false

    const WS_URL = `wss://bereketlilogistika.com/ws/chat/?token=${token}`
    socket.value = new WebSocket(WS_URL)

    socket.value.onopen = () => {
        console.log('WebSocket connected')
    }

    socket.value.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data)

            if (data.type === 'receive_message') {
                const message = data.message

                // Add message to store if not already exists
                const exists = messageStore.messages.some(m => m.id === message.id)
                if (!exists) {
                    messageStore.messages.push(message)
                }

                // Update room's last message and unread count
                const room = roomStore.rooms.find(r => r.code === message.room_code)
                if (room) {
                    room.last_message = {
                        id: message.id,
                        text: message.text,
                        sender: message.sender,
                        date_created: message.date_created
                    }
                    room.last_message_time = message.date_created

                    if (!isMyMessage(message, currentUser.value) && selectedRoom.value?.code !== message.room_code) {
                        room.unread_count = (room.unread_count || 0) + 1
                    }
                }

                nextTick(scrollToBottom)
            } else if (data.type === 'message_delivered') {
                isSending.value = false
                const message = data.message

                // Replace temp message with real message
                const tempIndex = messageStore.messages.findIndex(m =>
                    typeof m.id === 'string' && m.id.startsWith('temp-')
                )

                if (tempIndex !== -1) {
                    messageStore.messages.splice(tempIndex, 1)
                }

                const exists = messageStore.messages.some(m => m.id === message.id)
                if (!exists) {
                    messageStore.messages.push(message)
                }

                // Update room's last message
                const room = roomStore.rooms.find(r => r.code === message.room_code)
                if (room) {
                    room.last_message = {
                        id: message.id,
                        text: message.text,
                        sender: message.sender,
                        date_created: message.date_created
                    }
                    room.last_message_time = message.date_created
                }

                nextTick(scrollToBottom)
            } else if (data.type === 'error') {
                console.error('WebSocket error:', data.error)
                isSending.value = false
            }
        } catch (err) {
            console.error('WS message parse error:', err)
        }
    }

    socket.value.onerror = (err) => {
        console.error('WebSocket error:', err)
        isSending.value = false
    }

    socket.value.onclose = () => {
        console.log('WebSocket closed')

        if (isManuallyClosed.value) return

        clearTimeout(reconnectTimer.value)
        reconnectTimer.value = setTimeout(() => {
            connectToWebSocket()
        }, 5000)
    }
}

const disconnectWebSocket = () => {
    isManuallyClosed.value = true
    clearTimeout(reconnectTimer.value)

    if (socket.value) {
        socket.value.close()
        socket.value = null
    }
}

// Chat selection
const selectChat = async (room) => {
    selectedRoom.value = room
    room.unread_count = 0
    currentOffset.value = 0
    hasMoreMessages.value = false

    const result = await messageStore.getMessages({
        room_code: room.code,
        limit: messageLimit.value,
        offset: 0
    })

    if (result && result.length === messageLimit.value) {
        hasMoreMessages.value = true
    }

    nextTick(() => {
        scrollToBottom()
    })
}

// Upload file
const uploadFile = async (file) => {
    const formData = new FormData()
    formData.append('path', file)

    try {
        const response = await fileStore.addFile(formData)
        return response.data.id
    } catch (error) {
        console.error('Error uploading file:', error)
        return null
    }
}

// Send message
const sendMessage = async () => {
    const hasText = newMessage.value.trim()
    const hasFiles = selectedFiles.value.length > 0

    if (!hasText && !hasFiles) return
    if (!socket.value || socket.value.readyState !== WebSocket.OPEN) {
        console.error('WebSocket not connected')
        return
    }

    isSending.value = true

    // Upload files first
    const attachmentIds = []
    if (hasFiles) {
        for (const fileData of selectedFiles.value) {
            const id = await uploadFile(fileData.file)
            if (id) attachmentIds.push(id)
        }
    }

    const payload = {
        type: 'send_message',
        data: {
            receiver: selectedRoom.value.owner?.id,
            room_code: selectedRoom.value.code,
            text: newMessage.value.trim() || '',
            attachments: attachmentIds
        }
    }

    socket.value.send(JSON.stringify(payload))

    // Optimistically add message to UI
    const tempMessage = {
        id: `temp-${Date.now()}`,
        text: newMessage.value.trim(),
        sender: { id: currentUser.value },
        room_code: selectedRoom.value.code,
        attachments: selectedFiles.value.map(f => ({
            id: `temp-${Date.now()}-${Math.random()}`,
            original_filename: f.name,
            file: f.preview,
            size: f.file.size
        }))
    }

    messageStore.pushMessage(tempMessage)

    newMessage.value = ''
    selectedFiles.value = []

    nextTick(() => {
        scrollToBottom()
    })
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

const downloadFile = (url, filename) => {
    const link = document.createElement('a')
    link.href = url
    link.target = '_blank'
    link.download = filename || 'download'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

onMounted(async () => {
    currentUser.value = JSON.parse(getUserId())
    await roomStore.getRooms()
    connectToWebSocket()
})

onUnmounted(() => {
    disconnectWebSocket()
})

const scrollToBottom = () => {
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}
</script>

<style scoped>
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
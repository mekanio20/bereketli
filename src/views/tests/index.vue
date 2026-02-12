<template>
  <div class="max-w-3xl mt-40 mx-auto p-6">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-semibold">Chat WebSocket</h1>

      <span
        class="text-sm font-medium"
        :class="isConnected ? 'text-green-600' : 'text-red-600'"
      >
        {{ isConnected ? "Connected" : "Disconnected" }}
      </span>
    </div>

    <!-- Messages -->
    <div class="border rounded-xl p-4 h-[420px] overflow-auto space-y-3 bg-white">
      <div
        v-for="(m, i) in messages"
        :key="i"
        class="p-3 rounded-lg border text-sm"
      >
        <div class="font-semibold mb-1">
          {{ m?.sender?.username || "Unknown" }}
        </div>
        <div class="text-gray-800">
          {{ m?.text }}
        </div>

        <div v-if="m?.attachments?.length" class="mt-2 text-xs text-gray-500">
          Attachments:
          <span v-for="a in m.attachments" :key="a.id" class="mr-2">
            #{{ a.id }} ({{ a.name || "file" }})
          </span>
        </div>
      </div>
    </div>

    <!-- Send -->
    <div class="mt-4 flex gap-2">
      <input
        v-model="text"
        @keydown.enter="sendMessage"
        class="flex-1 border rounded-xl px-4 py-2 outline-none"
        placeholder="Write message..."
      />

      <button
        @click="sendMessage"
        class="px-5 py-2 rounded-xl bg-blue-600 text-white font-medium disabled:opacity-50"
        :disabled="!isConnected"
      >
        Send
      </button>
    </div>

    <!-- Debug -->
    <div class="mt-4 text-xs text-gray-500">
      <p>Receiver: {{ receiverId }}</p>
      <p>Last event: {{ lastEventType }}</p>
    </div>
  </div>
</template>

<script setup>
/**
 * Guide'a göre:
 * - Endpoint: /ws/chat/
 * - Auth: Django session cookie
 * - Client sadece JSON gönderir
 */
const token = localStorage.getItem('bereketli_access')
const WS_URL = `wss://bereketlilogistika.com/ws/chat/?token=${token}`

const socket = ref(null)
const isConnected = ref(false)

const text = ref("")
const messages = ref([])
const lastEventType = ref("-")

// Normal user ise receiver zorunlu (guide)
const receiverId = ref(4)

// Attachments örneği (sistemde var olan file id'ler)
const attachments = ref([]) // örn: [12, 19]

const connect = () => {
  socket.value = new WebSocket(WS_URL)

  socket.value.onopen = () => {
    isConnected.value = true
    console.log("✅ WS connected")
  }

  socket.value.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data)
      lastEventType.value = payload.type

      // GUIDE: incoming event types
      if (payload.type === "receive_message") {
        messages.value.push(payload.message)
      }

      if (payload.type === "message_delivered") {
        // server kabul etti (istersen UI'da "sent" gibi gösterebilirsin)
        console.log("📦 Delivered:", payload.message)
      }

      if (payload.type === "error") {
        console.error("❌ WS error:", payload.error, payload.data)
      }
    } catch (err) {
      console.error("❌ JSON parse error:", err)
      console.log("Raw:", event.data)
    }
  }

  socket.value.onclose = (e) => {
    isConnected.value = false
    console.log("🔌 WS closed:", e.code, e.reason)

    // Guide: 4401 unauthorized
    if (e.code === 4401) {
      console.warn("⚠️ Unauthorized: user session not found")
    }
  }

  socket.value.onerror = (err) => {
    console.error("❌ WS socket error:", err)
  }
}

const sendMessage = () => {
  if (!socket.value || socket.value.readyState !== WebSocket.OPEN) return

  // text boş olabilir ama attachments varsa sorun yok (guide)
  if (!text.value.trim() && attachments.value.length === 0) return

  // GUIDE: outgoing event format
  const payload = {
    type: "send_message",
    data: {
      room_code: 'SUP419A',
      receiver: receiverId.value,
      text: text.value.trim(),
      attachments: attachments.value,
    },
  }

  socket.value.send(JSON.stringify(payload))
  text.value = ""
}

onMounted(() => {
  connect()
})

onBeforeUnmount(() => {
  if (socket.value) socket.value.close()
})
</script>

<script setup lang="ts">
import { watchEffect, watch, onMounted } from 'vue'

import { cn } from '@/lib/utils'
import { delay } from '@/shared/lib/utils/utils'
import { useChat } from './model/useChat'
import { ChatMessage, ChatInput, ChatHeader, ChatBubble } from './ui'

const CHAT_LIFETIME = 1000 * 60 * 5
const CHAT_LIFESTAMP_KEY = 'chat-timestamp'
const CHAT_LOCAL_STORAGE_KEY = 'chat-messages'

const { messages, updateMessageStatus, isOpen, messagesContainer, randomDelay, scrollToBottom } =
  useChat()

watchEffect(async (onInvalidate) => {
  const typingMessage = messages.find((m) => m.status === 'typing')
  if (!typingMessage) return

  const controller = new AbortController()

  onInvalidate(() => controller.abort())

  scrollToBottom()

  delay(randomDelay, controller.signal).then(async () => {
    updateMessageStatus(typingMessage.id, 'delivered')

    scrollToBottom()
  })
})

watch(
  messages,
  (newMessages) => {
    localStorage.setItem(CHAT_LIFESTAMP_KEY, Date.now().toString())
    localStorage.setItem(CHAT_LOCAL_STORAGE_KEY, JSON.stringify(newMessages))
  },
  { deep: true },
)

onMounted(() => {
  const timestamp = localStorage.getItem(CHAT_LIFESTAMP_KEY)
  const savedMessages = localStorage.getItem(CHAT_LOCAL_STORAGE_KEY)
  if (!timestamp || !savedMessages) return

  const now = Date.now()
  const diff = now - parseInt(timestamp)

  if (diff > CHAT_LIFETIME) {
    localStorage.removeItem(CHAT_LIFESTAMP_KEY)
    localStorage.removeItem(CHAT_LOCAL_STORAGE_KEY)
  } else {
    messages.push(...JSON.parse(savedMessages))
    isOpen.value = true
    scrollToBottom()
  }
})
</script>

<template>
  <div
    :class="
      cn(
        'fixed p-4 flex justify-end bottom-0 right-0',
        isOpen && 'left-0 sm:left-auto sm:max-w-xs w-full flex flex-col',
      )
    "
  >
    <ChatBubble v-if="!isOpen" />

    <div
      v-if="isOpen"
      class="flex flex-col max-h-[90dvh] sm:max-h-[75dvh] rounded-3xl bg-primary-100 dark:bg-primary-300 shadow-2xl grow w-full overflow-hidden"
    >
      <ChatHeader />

      <div
        ref="messagesContainer"
        :class="
          cn('grow flex flex-col gap-2 rounded-2xl w-full overflow-auto', messages.length && 'p-4')
        "
      >
        <ChatMessage
          v-for="(message, index) in messages"
          :key="index"
          :id="index"
          :message="message"
        />
      </div>

      <ChatInput />
    </div>
  </div>
</template>

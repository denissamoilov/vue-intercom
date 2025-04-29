<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { Message, MessageStatus } from '@/entities/message/model/types'
import { User, Bot } from 'lucide-vue-next'
import { TypingMessage } from '@/widgets/ChatWidget/ui'

defineProps<{
  message: Message
}>()
</script>

<template>
  <div
    :class="
      cn(
        'flex flex-col gap-1 w-full',
        message.from === 'user' && 'self-start items-start pr-6',
        message.from === 'bot' && 'self-end items-end pl-6',
        message.status === 'sending' && 'animate-pulse opacity-50',
        message.status === 'typing' && 'animate-pulse opacity-50',
      )
    "
  >
    <div class="text-xs text-neutral-700 dark:text-primary-900 flex items-center gap-1">
      <div class="flex items-center rounded-full bg-neutral-200 dark:bg-primary-100 p-1">
        <User v-if="message.from === 'user'" class="size-3" />
        <Bot v-if="message.from === 'bot'" class="size-3" />
      </div>
      {{ message.from === 'user' ? 'Me' : 'Bot' }}
    </div>

    <div
      :class="
        cn(
          'px-3 py-2 rounded-xl max-w-full text-sm dark:text-primary-100',
          message.from === 'user' && 'bg-bubble-me rounded-tl-none',
          message.from === 'bot' && 'bg-bubble-agent rounded-tr-none',
        )
      "
    >
      <TypingMessage v-if="message.status === 'typing'" />
      <div v-else :class="message.text.split(' ').length === 1 && 'truncate'">
        {{ message.text }}
      </div>
    </div>

    <div
      v-if="message.status && message.from === 'user'"
      class="text-xs mt-1 text-right opacity-70"
    >
      {{ statusLabel(message.status) }}
    </div>
  </div>
</template>

<script lang="ts">
function statusLabel(status: MessageStatus) {
  switch (status) {
    case 'sending':
      return 'Sending...'
    case 'delivered':
      return 'Sent'
    default:
      return ''
  }
}
</script>

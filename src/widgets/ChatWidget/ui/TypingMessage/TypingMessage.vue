<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useChat } from '@/widgets/ChatWidget/model/useChat'

const { messages } = useChat()

const typingText = ref('')

watchEffect((onInvalidate) => {
  if (!messages.some((m) => m.status === 'typing')) return

  let dots = 0

  const interval = setInterval(() => {
    dots = (dots + 1) % 4

    typingText.value = '.'.repeat(dots)
  }, 300)

  onInvalidate(() => clearInterval(interval))
})
</script>

<template>
  <div class="relative after:content-['...'] after:invisible text-left italic">
    Typing{{ ' ' }}<span class="absolute">{{ typingText }}</span>
  </div>
</template>

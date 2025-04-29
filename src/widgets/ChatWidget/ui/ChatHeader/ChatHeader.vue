<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { Button } from '@/shared/ui/button'
import { Bot } from 'lucide-vue-next'
import { useChat } from '../../model/useChat'

const { toggleOpen } = useChat()
</script>

<template>
  <div
    class="flex items-center justify-between p-4 rounded-b-3xl bg-white dark:bg-primary-100 shrink-0"
  >
    <h3 class="text-heading flex items-center gap-2">
      <Bot />
      Chat
    </h3>
    <Button size="icon" @click="toggleOpen">
      <X />
    </Button>
  </div>
</template>

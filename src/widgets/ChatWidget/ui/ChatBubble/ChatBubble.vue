<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'
import { Button } from '@/shared/ui/button'
import { useChat } from '../../model/useChat'

const { toggleOpen } = useChat()
</script>

<template>
  <div class="p-4">
    <Button size="icon" @click="toggleOpen">
      <MessageCircle />
    </Button>
  </div>
</template>

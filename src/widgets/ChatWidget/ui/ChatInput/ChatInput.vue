<script setup lang="ts">
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useChat } from '../../model/useChat'
import { ref } from 'vue'
import { Send } from 'lucide-vue-next'

const { sendMessage, isDisabled } = useChat()

const input = ref('')

const handleSend = () => {
  sendMessage(input.value)
  input.value = ''
}
</script>

<template>
  <div class="flex gap-2 p-2 rounded-2xl shrink-0">
    <form
      class="flex gap-2 p-2 bg-white dark:bg-primary-100 rounded-full w-full"
      @submit.prevent="handleSend"
    >
      <Input placeholder="Type a message..." v-model="input" :disabled="isDisabled" />
      <Button type="submit" :disabled="isDisabled" size="icon">
        <Send />
      </Button>
    </form>
  </div>
</template>

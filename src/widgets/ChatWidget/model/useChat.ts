import type { Message, MessageStatus } from '@/entities/message/model/types'
import { delay } from '@/shared/lib/utils/utils'
import { nextTick, reactive, ref } from 'vue'

const messages = reactive<Message[]>([])
const isOpen = ref(false)
const isDisabled = ref(false)
const messagesContainer = ref<HTMLDivElement | null>(null)

export function useChat() {
  const MAX_MESSAGES_COUNT = 20
  const randomDelay = 1000 + Math.random() * 500

  let msgId = 0

  const toggleOpen = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value === true) {
      scrollToBottom()
    }
  }

  const randomResponse = (text: string) => {
    const randomVariant = Math.floor(Math.random() * 3)

    switch (randomVariant) {
      case 0:
        // return reverse text
        return text.split('').reverse().join('')
      case 1:
        // return reverse text and words with spaces
        return text
          .split(' ')
          .map((word) => word.split('').reverse().join(''))
          .join(' ')
      default:
        // return base64 encoded text
        return btoa(encodeURIComponent(text))
    }
  }

  const botResponse = async () => {
    const newMessage: Message = {
      id: msgId++,
      from: 'bot',
      text: 'typing...',
      status: 'typing',
    }

    scrollToBottom()

    await delay(randomDelay)

    if (
      messages.length === 1 &&
      messages[0].from === 'user' &&
      messages[0].text.toLowerCase() === 'hello'
    ) {
      newMessage.text = 'Hello! How can I help you?'
    } else {
      newMessage.text = randomResponse(messages[messages.length - 1].text)
    }
    messages.push(newMessage)
  }

  const checkMessagesCount = () => {
    isDisabled.value = true
    messages.push({ id: msgId++, from: 'bot', text: 'Good bye!' })
  }

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    isDisabled.value = true

    const newMessage: Message = {
      id: msgId++,
      from: 'user',
      text: text,
      status: 'sending',
    }

    messages.push(newMessage)

    scrollToBottom()

    await delay(1000)

    updateMessageStatus(newMessage.id, 'delivered')

    if (messages.length < MAX_MESSAGES_COUNT) {
      botResponse()
    }

    if (messages.length >= MAX_MESSAGES_COUNT) {
      checkMessagesCount()
      return
    }
    isDisabled.value = false
  }

  const updateMessageStatus = (id: number, status: MessageStatus) => {
    const msg = messages.find((m) => m.id === id)

    if (msg) {
      msg.status = status
    }
  }

  const scrollToBottom = () => {
    if (!messagesContainer.value) return

    nextTick(() => {
      if (!messagesContainer.value) return

      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    })
  }

  return {
    messages,
    isDisabled,
    sendMessage,
    updateMessageStatus,
    isOpen,
    toggleOpen,
    messagesContainer,
    randomDelay,
    scrollToBottom,
  }
}

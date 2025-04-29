export type MessageStatus = 'sending' | 'delivered' | 'typing'

export type Message = {
  id: number
  from: 'user' | 'bot'
  text: string
  status?: MessageStatus
}

# Vue Chat Widget

A customizable chat widget built with Vue 3 and TypeScript, featuring an interactive bot response system.

![Vue Chat Widget Demo](demo.gif)

## Features

- 💬 Real-time chat interface
- 🤖 Auto-responding bot with multiple response patterns
- 💾 Local storage persistence
- ⚡ Message status tracking (sending, delivered)
- 🎨 Clean, modern UI
- 📱 Responsive design
- ⌨️ Typing indicators
- 🔄 Auto-scroll functionality

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/denissamoilov/vue-chat-widget.git
cd vue-chat-widget
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Usage

```vue
<template>
  <ChatWidget />
</template>

<script setup>
import { ChatWidget } from '@/widgets/ChatWidget'
</script>
```

## Configuration

The chat widget can be customized with the following properties:

- Maximum message count
- Chat session lifetime
- Response delay timing
- Bot response patterns

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { Moon, Sun } from 'lucide-vue-next'
import { Switch } from '@/shared/ui/switch'

import { useTheme } from './model/useTheme'
import type { Theme } from './types'

const { theme, toggleTheme, applyTheme, LOCAL_STORAGE_THEME_KEY } = useTheme()

onMounted(() => {
  const currentTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme | null

  theme.value = currentTheme ?? 'light'
  applyTheme(theme.value)
})

watch(theme, (newTheme) => {
  applyTheme(newTheme)
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
})
</script>

<template>
  <div class="fixed left-4 top-4 sm:bottom-4 sm:top-auto">
    <Switch @update:model-value="toggleTheme">
      <template #thumb>
        <div class="flex items-center justify-center size-4">
          <Moon v-if="theme === 'dark'" class="size-3" />
          <Sun v-else class="size-3" />
        </div>
      </template>
    </Switch>
  </div>
</template>

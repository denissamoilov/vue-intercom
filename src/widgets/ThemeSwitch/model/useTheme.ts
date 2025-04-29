import { ref } from 'vue'
import type { Theme } from '../types'

export function useTheme() {
  const LOCAL_STORAGE_THEME_KEY = 'theme'

  const theme = ref<Theme>('light')

  const applyTheme = (value: Theme) => {
    const root = document.documentElement

    if (value === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return {
    LOCAL_STORAGE_THEME_KEY,
    theme,
    toggleTheme,
    applyTheme,
  }
}

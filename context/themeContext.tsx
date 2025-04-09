import React, { createContext, useContext, useState, ReactNode } from 'react'
import { DarkTheme, DefaultTheme, Theme } from '@react-navigation/native'

type ThemeType = 'light' | 'dark'

const ThemeContext = createContext<{
  mode: ThemeType
  theme: Theme
  toggleTheme: () => void
}>({
  mode: 'dark',
  theme: DarkTheme,
  toggleTheme: () => {}
})

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeType>('dark')

  const toggleTheme = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const theme = mode === 'dark' ? DarkTheme : DefaultTheme

  return (
    <ThemeContext.Provider value={{ mode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

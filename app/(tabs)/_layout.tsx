import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { HistoryProvider } from '../../context/historyContext'
import { ThemeProvider, useThemeContext } from '../../context/themeContext'

function InnerLayout() {
  const { mode } = useThemeContext()

  const tabBarBg = mode === 'dark' ? '#121212' : '#ffffff'
  const activeColor = mode === 'dark' ? '#0af' : '#007aff'
  const inactiveColor = mode === 'dark' ? '#666' : '#999'

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: tabBarBg },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarIcon: ({ color, size }) => {
          const name = route.name === 'index' ? 'calculator' : 'time'
          return <Ionicons name={name as any} size={size} color={color} />
        }
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Calculator' }} />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
    </Tabs>
  )
}

export default function Layout() {
  return (
    <ThemeProvider>
      <HistoryProvider>
        <InnerLayout />
      </HistoryProvider>
    </ThemeProvider>
  )
}

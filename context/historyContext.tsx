import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const STORAGE_KEY = 'calc_history'

const HistoryContext = createContext<{
  history: string[]
  addHistory: (entry: string) => void
  clearHistory: () => void
}>({
  history: [],
  addHistory: () => {},
  clearHistory: () => {}
})

export const useHistoryContext = () => useContext(HistoryContext)

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    const loadHistory = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY)
      if (stored) setHistory(JSON.parse(stored))
    }
    loadHistory()
  }, [])

  const save = async (entries: string[]) => {
    setHistory(entries)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }

  const addHistory = (entry: string) => {
    const updated = [entry, ...history]
    save(updated)
  }

  const clearHistory = async () => {
    setHistory([])
    await AsyncStorage.removeItem(STORAGE_KEY)
  }

  return (
    <HistoryContext.Provider value={{ history, addHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  )
}

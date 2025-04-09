import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { useHistoryContext } from '../../context/historyContext'
import { useThemeContext } from '../../context/themeContext'

export default function HistoryScreen() {
  const { history, clearHistory } = useHistoryContext()
  const { mode } = useThemeContext()

  const bgColor = mode === 'dark' ? '#121212' : '#f2f2f2'
  const textColor = mode === 'dark' ? '#ffffff' : '#111111'
  const fadedText = mode === 'dark' ? '#777' : '#666'
  const borderColor = mode === 'dark' ? '#333' : '#ccc'
  const clearColor = mode === 'dark' ? '#ff5e5e' : '#cc0000'
  const cardBg = mode === 'dark' ? '#1f1f1f' : '#fff'

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.header, { color: textColor }]}>Calculation History</Text>

      <FlatList
        data={history}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, { backgroundColor: cardBg, borderColor }]}>
            <Text style={[styles.item, { color: textColor }]}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: fadedText }]}>No history available</Text>
        }
        contentContainerStyle={history.length === 0 ? styles.emptyContainer : undefined}
      />

      {history.length > 0 && (
        <TouchableOpacity style={styles.clearBtn} onPress={clearHistory}>
          <Text style={[styles.clearText, { color: clearColor }]}>Clear History</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16
  },
  itemContainer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10
  },
  item: {
    fontSize: 18
  },
  empty: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  clearBtn: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center'
  },
  clearText: {
    fontSize: 16,
    fontWeight: '500'
  }
})

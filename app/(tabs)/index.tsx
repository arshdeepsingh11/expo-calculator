import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native'
import { useHistoryContext } from '../../context/historyContext'
import { useThemeContext } from '../../context/themeContext'
import { Ionicons } from '@expo/vector-icons'

export default function CalculatorScreen() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const { addHistory } = useHistoryContext()
  const { mode, toggleTheme } = useThemeContext()

  const handlePress = (val: string) => {
    if (val === 'C' || val === 'AC') {
      setInput('')
      setResult('')
    } else if (val === '=') {
      try {
        const evalResult = eval(input.replace('×', '*').replace('÷', '/'))
        setResult(evalResult.toString())
        addHistory(`${input} = ${evalResult}`)
      } catch {
        setResult('Error')
      }
    } else {
      setInput(input + val)
    }
  }

  const handleAdvanced = (val: string) => {
    try {
      const x = parseFloat(input)
      let output = ''
      if (val === '√') output = Math.sqrt(x).toString()
      else if (val === '^') output = Math.pow(x, 2).toString()
      else if (val === 'log') output = Math.log10(x).toString()
      else return
      setResult(output)
      addHistory(`${val}(${x}) = ${output}`)
    } catch {
      setResult('Error')
    }
  }

  const buttons = [
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', 'C', '+'],
    ['√', '^', 'log', 'AC'],
    ['=']
  ]

  const bgColor = mode === 'dark' ? '#121212' : '#f2f2f2'
  const displayBg = mode === 'dark' ? '#1f1f1f' : '#ffffff'
  const inputColor = mode === 'dark' ? '#ffffff' : '#111111'
  const resultColor = mode === 'dark' ? '#b0b0b0' : '#444'
  const btnColor = mode === 'dark' ? '#2a2a2a' : '#e0e0e0'
  const textColor = mode === 'dark' ? '#f1f1f1' : '#111'

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleTheme} style={{
          marginRight:10
        }}>
          <Ionicons
            name={mode === 'dark' ? 'sunny-outline' : 'moon-outline'}
            size={28}
            color={mode === 'dark' ? '#ffd700' : '#333'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={[styles.display, { backgroundColor: displayBg }]}
        contentContainerStyle={styles.displayContent}
      >
        <Text style={[styles.input, { color: inputColor }]}>{input}</Text>
        <Text style={[styles.result, { color: resultColor }]}>{result}</Text>
      </ScrollView>

      {buttons.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.button,
                item === '='
                  ? { backgroundColor: '#32cd32' }
                  : item === 'AC'
                  ? { backgroundColor: '#f33' }
                  : { backgroundColor: btnColor }
              ]}
              
              onPress={() =>
                ['√', '^', 'log'].includes(item)
                  ? handleAdvanced(item)
                  : handlePress(item)
              }
            >
              <Text style={[styles.buttonText, { color: textColor }]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-end'
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 12
  },
  display: {
    flex: 1,
    borderRadius: 12,
    marginBottom: 16
  },
  displayContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 16
  },
  input: {
    fontSize: 34,
    textAlign: 'right',
    fontWeight: '500',
    marginBottom: 8
  },
  result: {
    fontSize: 24,
    textAlign: 'right'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  button: {
    flex: 1,
    margin: 4,
    paddingVertical: 22,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '600'
  }
})

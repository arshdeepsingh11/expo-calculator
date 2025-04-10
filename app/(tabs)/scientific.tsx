import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useThemeContext } from '../../context/themeContext'
import { useHistoryContext } from '../../context/historyContext'

export default function ScientificCalculatorScreen() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [isDegree, setIsDegree] = useState(true)
  const { addHistory } = useHistoryContext()
  const { mode, toggleTheme } = useThemeContext()

  const toRadians = (x: number) => (x * Math.PI) / 180

  const handleAdvanced = (func: string) => {
    try {
      const x = parseFloat(input)
      let output = ''
      switch (func) {
        case 'sin':
          output = isDegree ? Math.sin(toRadians(x)).toString() : Math.sin(x).toString()
          break
        case 'cos':
          output = isDegree ? Math.cos(toRadians(x)).toString() : Math.cos(x).toString()
          break
        case 'tan':
          output = isDegree ? Math.tan(toRadians(x)).toString() : Math.tan(x).toString()
          break
        case '√':
          output = Math.sqrt(x).toString()
          break
        case '^':
          output = Math.pow(x, 2).toString()
          break
        case 'log':
          output = Math.log10(x).toString()
          break
        case 'ln':
          output = Math.log(x).toString()
          break
        case 'exp':
          output = Math.exp(x).toString()
          break
        case 'abs':
          output = Math.abs(x).toString()
          break
        case 'π':
          output = Math.PI.toString()
          break
        case 'e':
          output = Math.E.toString()
          break
        default:
          return
      }
      setResult(output)
      addHistory(`${func}(${x}) = ${output}`)
    } catch {
      setResult('Error')
    }
  }

  const handlePress = (val: string) => {
    if (val === 'C' || val === 'AC') {
      setInput('')
      setResult('')
    } else if (val === '=') {
      try {
        const evalInput = input
          .replace('×', '*')
          .replace('÷', '/')
          .replace('π', Math.PI.toString())
          .replace('e', Math.E.toString())
        const evalResult = eval(evalInput)
        setResult(evalResult.toString())
        addHistory(`${input} = ${evalResult}`)
      } catch {
        setResult('Error')
      }
    } else {
      setInput(input + val)
    }
  }

  const toggleUnit = () => setIsDegree((prev) => !prev)

  const sciButtons = [
    ['sin', 'cos', 'tan', '√'],
    ['log', 'ln', 'exp', 'abs'],
    ['π', 'e', '^', 'C'],
    ['7', '8', '9', '÷'],
    ['4', '5', '6', '×'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+']
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
        <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 12 }}>
          <Ionicons
            name={mode === 'dark' ? 'sunny-outline' : 'moon-outline'}
            size={28}
            color={mode === 'dark' ? '#ffd700' : '#333'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleUnit}>
          <Text style={{ color: textColor, fontSize: 16 }}>
            {isDegree ? 'Deg' : 'Rad'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
  style={[styles.display, { backgroundColor: displayBg }]}
  contentContainerStyle={styles.displayContent}
>
  {input !== '' && (
    <Text style={[styles.input, { color: inputColor }]} numberOfLines={1}>
      {input}
    </Text>
  )}
  {result !== '' && (
    <Text style={[styles.result, { color: resultColor }]} numberOfLines={1}>
      = {result}
    </Text>
  )}
</ScrollView>

      {sciButtons.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.button,
                item === '='
                  ? { backgroundColor: '#32cd32' }
                  : item === 'AC' || item === 'C'
                  ? { backgroundColor: '#f33' }
                  : { backgroundColor: btnColor }
              ]}
              onPress={() =>
                [
                  'sin',
                  'cos',
                  'tan',
                  '√',
                  'log',
                  'ln',
                  'exp',
                  'abs',
                  'π',
                  'e',
                  '^'
                ].includes(item)
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
    alignItems: 'center',
    marginBottom: 12
  },
  display: {
    flex: 1,
    borderRadius: 12,
    marginBottom: 16
  },
  input: {
    fontSize: 40,         // Bigger font
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 8
  },
  result: {
    fontSize: 30,         // Bigger result
    fontWeight: '500',
    textAlign: 'right',
    color: '#4caf50'      // Optional: add green tone for success
  },
  displayContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 20           // More padding
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  button: {
    flex: 1,
    margin: 4,
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600'
  }
})

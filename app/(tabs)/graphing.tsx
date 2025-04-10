import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native'
import { WebView } from 'react-native-webview'
import { useThemeContext } from '../../context/themeContext'
import { useHistoryContext } from '../../context/historyContext'

export default function GraphingScreen() {
  const [expressions, setExpressions] = useState(['sin(x)', 'x*x'])
  const { mode } = useThemeContext()
  const { addHistory } = useHistoryContext()

  const bgColor = mode === 'dark' ? '#121212' : '#f2f2f2'
  const inputColor = mode === 'dark' ? '#ffffff' : '#111111'
  const placeholderColor = mode === 'dark' ? '#aaa' : '#888'

  const htmlContent = `
 <html>
    <head>
      <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;background-color:${bgColor}">
      <div id="plot" style="width:100%;height:100%"></div>
      <script>
        const functions = ${JSON.stringify(expressions)};
        const x = [], traces = [];
        for (let i = -10; i <= 10; i += 0.1) x.push(i);
        functions.forEach((expr) => {
          const y = x.map(val => {
            try {
              return eval(expr.replace(/x/g, val));
            } catch {
              return null;
            }
          });
          traces.push({ x, y, mode: 'lines', name: expr });
        });

        const layout = {
          margin: { t: 20 },
          dragmode: 'pan',
          paper_bgcolor: '${bgColor}',
          plot_bgcolor: '${bgColor}',
          font: { color: '${inputColor}' },
          xaxis: { title: 'x', fixedrange: false },
          yaxis: { title: 'y', fixedrange: false }
        };

        const config = {
          responsive: true,
          scrollZoom: true,      // Allow pinch zoom on mobile
          displayModeBar: true,  // Optional: toolbar for zoom, reset, etc.
        };

        Plotly.newPlot('plot', traces, layout, config);
      </script>
    </body>
  </html>
  `

  const handleAddFunction = () => setExpressions([...expressions, ''])

  const handleSave = () => {
    const combined = expressions.filter(e => e.trim()).join(', ')
    addHistory(`Plotted: ${combined}`)
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.label, { color: inputColor }]}>
        Enter functions (in terms of x):
      </Text>

      {expressions.map((expr, index) => (
        <TextInput
          key={index}
          style={[
            styles.input,
            { color: inputColor, borderColor: inputColor }
          ]}
          value={expr}
          onChangeText={(text) => {
            const updated = [...expressions]
            updated[index] = text
            setExpressions(updated)
          }}
          placeholder={`Function ${index + 1} (e.g. sin(x))`}
          placeholderTextColor={placeholderColor}
        />
      ))}

      <TouchableOpacity onPress={handleAddFunction} style={styles.addBtn}>
        <Text style={{ color: '#32cd32', fontWeight: '600' }}>+ Add Function</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
        <Text style={{ color: '#2196f3', fontWeight: '600' }}>Save to History</Text>
      </TouchableOpacity>

      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
        javaScriptEnabled
        scrollEnabled={false}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10
  },
  addBtn: {
    marginBottom: 12,
    alignItems: 'center'
  },
  saveBtn: {
    marginBottom: 12,
    alignItems: 'center'
  }
})

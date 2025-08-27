<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-6 lg:p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">科学计算器</h1>
          <p class="text-gray-600 dark:text-gray-400">功能强大的科学计算器，支持复杂运算</p>
        </div>
      </div>

      <!-- Calculator Container -->
      <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8">
        <!-- Display -->
        <div class="mb-6">
          <div class="bg-slate-900 dark:bg-slate-700 rounded-xl p-4 mb-2">
            <div class="text-right text-sm text-gray-400 mb-1 h-5">{{ expression || '0' }}</div>
            <div class="text-right text-2xl sm:text-3xl font-mono text-white overflow-hidden">
              {{ display }}
            </div>
          </div>
          <div class="flex gap-2">
            <button @click="clearAll" class="calc-btn-secondary flex-1">AC</button>
            <button @click="clearEntry" class="calc-btn-secondary flex-1">CE</button>
            <button @click="backspace" class="calc-btn-secondary flex-1">⌫</button>
          </div>
        </div>

        <!-- Button Grid -->
        <div class="grid grid-cols-5 gap-3">
          <!-- Row 1: Memory and Advanced Functions -->
          <button @click="memoryRecall" class="calc-btn-secondary">MR</button>
          <button @click="memoryClear" class="calc-btn-secondary">MC</button>
          <button @click="memoryAdd" class="calc-btn-secondary">M+</button>
          <button @click="memorySubtract" class="calc-btn-secondary">M-</button>
          <button @click="memoryStore" class="calc-btn-secondary">MS</button>

          <!-- Row 2: Scientific Functions -->
          <button @click="inputFunction('sin')" class="calc-btn-function">sin</button>
          <button @click="inputFunction('cos')" class="calc-btn-function">cos</button>
          <button @click="inputFunction('tan')" class="calc-btn-function">tan</button>
          <button @click="inputFunction('log')" class="calc-btn-function">log</button>
          <button @click="inputFunction('ln')" class="calc-btn-function">ln</button>

          <!-- Row 3: More Functions -->
          <button @click="inputFunction('asin')" class="calc-btn-function">sin⁻¹</button>
          <button @click="inputFunction('acos')" class="calc-btn-function">cos⁻¹</button>
          <button @click="inputFunction('atan')" class="calc-btn-function">tan⁻¹</button>
          <button @click="inputFunction('sqrt')" class="calc-btn-function">√</button>
          <button @click="inputOperator('^')" class="calc-btn-function">xʸ</button>

          <!-- Row 4: Constants and Operations -->
          <button @click="inputConstant('π')" class="calc-btn-function">π</button>
          <button @click="inputConstant('e')" class="calc-btn-function">e</button>
          <button @click="inputFunction('abs')" class="calc-btn-function">|x|</button>
          <button @click="inputOperator('/')" class="calc-btn-operator">÷</button>
          <button @click="inputOperator('*')" class="calc-btn-operator">×</button>

          <!-- Row 5: Numbers and Basic Operations -->
          <button @click="inputNumber('7')" class="calc-btn-number">7</button>
          <button @click="inputNumber('8')" class="calc-btn-number">8</button>
          <button @click="inputNumber('9')" class="calc-btn-number">9</button>
          <button @click="inputOperator('-')" class="calc-btn-operator">-</button>
          <button @click="inputOperator('+')" class="calc-btn-operator">+</button>

          <!-- Row 6 -->
          <button @click="inputNumber('4')" class="calc-btn-number">4</button>
          <button @click="inputNumber('5')" class="calc-btn-number">5</button>
          <button @click="inputNumber('6')" class="calc-btn-number">6</button>
          <button @click="inputOperator('(')" class="calc-btn-secondary">(</button>
          <button @click="inputOperator(')')" class="calc-btn-secondary">)</button>

          <!-- Row 7 -->
          <button @click="inputNumber('1')" class="calc-btn-number">1</button>
          <button @click="inputNumber('2')" class="calc-btn-number">2</button>
          <button @click="inputNumber('3')" class="calc-btn-number">3</button>
          <button @click="inputNumber('0')" class="calc-btn-number col-span-2">0</button>

          <!-- Row 8 -->
          <button @click="inputNumber('.')" class="calc-btn-number">.</button>
          <button @click="toggleSign" class="calc-btn-secondary">±</button>
          <button @click="inputFunction('factorial')" class="calc-btn-function">x!</button>
          <button @click="calculate" class="calc-btn-equals col-span-2">=</button>
        </div>

        <!-- Memory Display -->
        <div v-if="memory !== 0" class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Memory: {{ memory }}
        </div>
      </div>

      <!-- History Panel -->
      <div v-if="history.length > 0" class="mt-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">计算历史</h3>
        <div class="space-y-2 max-h-40 overflow-y-auto">
          <div v-for="(item, index) in history.slice(-10)" :key="index" 
               class="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
               @click="loadFromHistory(item)">
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ item.expression }}</span>
            <span class="text-sm font-mono text-gray-800 dark:text-gray-200">{{ item.result }}</span>
          </div>
        </div>
        <button @click="clearHistory" class="mt-4 text-sm text-red-600 hover:text-red-700 dark:text-red-400">
          清除历史
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// State
const display = ref('0')
const expression = ref('')
const memory = ref(0)
const history = ref<Array<{expression: string, result: string}>>([])
const shouldResetDisplay = ref(false)

// Input handlers
const inputNumber = (num: string) => {
  if (shouldResetDisplay.value) {
    display.value = num
    shouldResetDisplay.value = false
  } else {
    display.value = display.value === '0' ? num : display.value + num
  }
}

const inputOperator = (op: string) => {
  if (expression.value && !shouldResetDisplay.value) {
    calculate()
  }
  expression.value = display.value + ' ' + op + ' '
  shouldResetDisplay.value = true
}

const inputFunction = (func: string) => {
  const value = parseFloat(display.value)
  let result: number
  
  try {
    switch (func) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180)
        break
      case 'cos':
        result = Math.cos(value * Math.PI / 180)
        break
      case 'tan':
        result = Math.tan(value * Math.PI / 180)
        break
      case 'asin':
        result = Math.asin(value) * 180 / Math.PI
        break
      case 'acos':
        result = Math.acos(value) * 180 / Math.PI
        break
      case 'atan':
        result = Math.atan(value) * 180 / Math.PI
        break
      case 'log':
        result = Math.log10(value)
        break
      case 'ln':
        result = Math.log(value)
        break
      case 'sqrt':
        result = Math.sqrt(value)
        break
      case 'abs':
        result = Math.abs(value)
        break
      case 'factorial':
        result = factorial(value)
        break
      default:
        return
    }
    
    display.value = formatResult(result)
    expression.value = `${func}(${value})`
    shouldResetDisplay.value = true
  } catch (error) {
    display.value = 'Error'
    shouldResetDisplay.value = true
  }
}

const inputConstant = (constant: string) => {
  let value: number
  switch (constant) {
    case 'π':
      value = Math.PI
      break
    case 'e':
      value = Math.E
      break
    default:
      return
  }
  
  display.value = formatResult(value)
  shouldResetDisplay.value = true
}

// Utility functions
const factorial = (n: number): number => {
  if (n < 0 || !Number.isInteger(n)) throw new Error('Invalid input')
  if (n <= 1) return 1
  return n * factorial(n - 1)
}

const formatResult = (result: number): string => {
  if (isNaN(result) || !isFinite(result)) return 'Error'
  
  // Handle very small numbers
  if (Math.abs(result) < 1e-10 && result !== 0) return '0'
  
  // Format with appropriate precision
  if (Math.abs(result) >= 1e10 || (Math.abs(result) < 1e-4 && result !== 0)) {
    return result.toExponential(6)
  }
  
  return parseFloat(result.toPrecision(12)).toString()
}

// Calculator operations
const calculate = () => {
  if (!expression.value) return
  
  try {
    const fullExpression = expression.value + display.value
    const result = evaluateExpression(fullExpression)
    
    history.value.push({
      expression: fullExpression,
      result: formatResult(result)
    })
    
    display.value = formatResult(result)
    expression.value = ''
    shouldResetDisplay.value = true
  } catch (error) {
    display.value = 'Error'
    shouldResetDisplay.value = true
  }
}

const evaluateExpression = (expr: string): number => {
  // Simple expression evaluator (replace with more robust solution in production)
  const sanitized = expr.replace(/×/g, '*').replace(/÷/g, '/').replace(/\^/g, '**')
  return Function('"use strict"; return (' + sanitized + ')')()
}

// Clear functions
const clearAll = () => {
  display.value = '0'
  expression.value = ''
  shouldResetDisplay.value = false
}

const clearEntry = () => {
  display.value = '0'
}

const backspace = () => {
  if (display.value.length > 1) {
    display.value = display.value.slice(0, -1)
  } else {
    display.value = '0'
  }
}

const toggleSign = () => {
  if (display.value !== '0') {
    display.value = display.value.startsWith('-') 
      ? display.value.slice(1) 
      : '-' + display.value
  }
}

// Memory functions
const memoryStore = () => {
  memory.value = parseFloat(display.value)
}

const memoryRecall = () => {
  display.value = memory.value.toString()
  shouldResetDisplay.value = true
}

const memoryClear = () => {
  memory.value = 0
}

const memoryAdd = () => {
  memory.value += parseFloat(display.value)
}

const memorySubtract = () => {
  memory.value -= parseFloat(display.value)
}

// History functions
const loadFromHistory = (item: {expression: string, result: string}) => {
  display.value = item.result
  shouldResetDisplay.value = true
}

const clearHistory = () => {
  history.value = []
}
</script>

<style scoped>
.calc-btn-number {
  background-color: white;
  color: rgb(31 41 55);
  font-weight: 600;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 3rem;
}

.calc-btn-number:hover {
  background-color: rgb(249 250 251);
  transform: scale(0.95);
}

.calc-btn-number:active {
  transform: scale(0.95);
}

@media (prefers-color-scheme: dark) {
  .calc-btn-number {
    background-color: rgb(51 65 85);
    color: rgb(229 231 235);
  }

  .calc-btn-number:hover {
    background-color: rgb(71 85 105);
  }
}

.calc-btn-operator {
  background: linear-gradient(to right, rgb(59 130 246), rgb(79 70 229));
  color: white;
  font-weight: 600;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 3rem;
}

.calc-btn-operator:hover {
  background: linear-gradient(to right, rgb(37 99 235), rgb(67 56 202));
}

.calc-btn-operator:active {
  transform: scale(0.95);
}

.calc-btn-function {
  background: linear-gradient(to right, rgb(168 85 247), rgb(236 72 153));
  color: white;
  font-weight: 600;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 3rem;
  font-size: 0.875rem;
}

.calc-btn-function:hover {
  background: linear-gradient(to right, rgb(147 51 234), rgb(219 39 119));
}

.calc-btn-function:active {
  transform: scale(0.95);
}

.calc-btn-secondary {
  background-color: rgb(229 231 235);
  color: rgb(55 65 81);
  font-weight: 600;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 3rem;
}

.calc-btn-secondary:hover {
  background-color: rgb(209 213 219);
}

.calc-btn-secondary:active {
  transform: scale(0.95);
}

@media (prefers-color-scheme: dark) {
  .calc-btn-secondary {
    background-color: rgb(71 85 105);
    color: rgb(229 231 235);
  }

  .calc-btn-secondary:hover {
    background-color: rgb(100 116 139);
  }
}

.calc-btn-equals {
  background: linear-gradient(to right, rgb(34 197 94), rgb(5 150 105));
  color: white;
  font-weight: 700;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 3rem;
}

.calc-btn-equals:hover {
  background: linear-gradient(to right, rgb(22 163 74), rgb(4 120 87));
}

.calc-btn-equals:active {
  transform: scale(0.95);
}

@media (max-width: 640px) {
  .calc-btn-number,
  .calc-btn-operator,
  .calc-btn-function,
  .calc-btn-secondary,
  .calc-btn-equals {
    padding: 0.75rem 0.5rem;
    font-size: 0.875rem;
    min-height: 2.5rem;
  }
}
</style>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">文本对比工具</h1>
          <p class="text-gray-600 dark:text-gray-400">高效对比两段文本的差异，支持多种视图模式</p>
        </div>
      </div>

      <!-- Control Panel -->
      <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 mb-8">
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <!-- View Mode Toggle -->
          <div class="flex items-center gap-3">
            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">视图模式:</label>
            <div class="flex bg-gray-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                @click="viewMode = 'split'"
                :class="[
                  'px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  viewMode === 'split'
                    ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                ]"
              >
                分屏对比
              </button>
              <button
                @click="viewMode = 'unified'"
                :class="[
                  'px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  viewMode === 'unified'
                    ? 'bg-white dark:bg-slate-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                ]"
              >
                统一视图
              </button>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-3">
            <button
              @click="clearTexts"
              class="px-4 py-2 bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-500 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-all duration-200"
            >
              清空
            </button>
            <button
              @click="copyDifferences"
              :disabled="!hasDifferences"
              class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
            >
              复制差异
            </button>
          </div>
        </div>
      </div>

      <!-- Input Section (Mobile/Tablet) -->
      <div v-if="isMobile || showInputs" class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Left Text Input -->
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">原始文本</h3>
            <div class="flex gap-2">
              <button
                @click="loadSampleText('left')"
                class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
              >
                示例文本
              </button>
              <button
                @click="clearText('left')"
                class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                清空
              </button>
            </div>
          </div>
          <textarea
            v-model="leftText"
            placeholder="在此输入原始文本..."
            class="w-full h-64 p-4 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm"
            @input="onTextChange"
          ></textarea>
          <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
            字符数: {{ leftText.length }} | 行数: {{ leftText.split('\n').length }}
          </div>
        </div>

        <!-- Right Text Input -->
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">对比文本</h3>
            <div class="flex gap-2">
              <button
                @click="loadSampleText('right')"
                class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
              >
                示例文本
              </button>
              <button
                @click="clearText('right')"
                class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                清空
              </button>
            </div>
          </div>
          <textarea
            v-model="rightText"
            placeholder="在此输入对比文本..."
            class="w-full h-64 p-4 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none font-mono text-sm"
            @input="onTextChange"
          ></textarea>
          <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
            字符数: {{ rightText.length }} | 行数: {{ rightText.split('\n').length }}
          </div>
        </div>
      </div>

      <!-- Toggle Input Button (Desktop) -->
      <div v-if="!isMobile" class="text-center mb-6">
        <button
          @click="showInputs = !showInputs"
          class="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg transition-all duration-200"
        >
          {{ showInputs ? '隐藏输入框' : '显示输入框' }}
        </button>
      </div>

      <!-- Diff Viewer -->
      <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        <div class="p-6 border-b border-gray-200 dark:border-slate-600">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">对比结果</h3>
            <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span class="flex items-center gap-1">
                <div class="w-3 h-3 bg-red-200 dark:bg-red-800 rounded"></div>
                删除: {{ diffStats.deletions }}
              </span>
              <span class="flex items-center gap-1">
                <div class="w-3 h-3 bg-green-200 dark:bg-green-800 rounded"></div>
                添加: {{ diffStats.additions }}
              </span>
            </div>
          </div>
        </div>

        <div class="diff-container">
          <div v-if="isLoading" class="flex items-center justify-center py-16">
            <div class="flex items-center gap-3">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
              <span class="text-gray-600 dark:text-gray-400">正在对比文本...</span>
            </div>
          </div>

          <div v-else-if="!leftText && !rightText" class="flex flex-col items-center justify-center py-16 text-center">
            <div class="w-16 h-16 bg-gray-200 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p class="text-gray-500 dark:text-gray-400 mb-2">请输入要对比的文本</p>
            <p class="text-sm text-gray-400 dark:text-gray-500">支持任意长度的文本对比</p>
          </div>

          <div v-else class="diff-viewer-wrapper">
            <div
              v-html="diffHtml"
              class="custom-diff-viewer"
            ></div>
          </div>
        </div>
      </div>

      <!-- Statistics Panel -->
      <div v-if="hasDifferences" class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 text-center">
          <div class="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">{{ diffStats.deletions }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">删除的行</div>
        </div>
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 text-center">
          <div class="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">{{ diffStats.additions }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">添加的行</div>
        </div>
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6 text-center">
          <div class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{{ diffStats.changes }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">总变更数</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import * as Diff from 'diff'
import { html } from 'diff2html'

// Set page title
if (typeof document !== 'undefined') {
  document.title = '文本对比工具 - 在线文本差异比较 | WebCraft'
}

// State
const leftText = ref('')
const rightText = ref('')
const viewMode = ref<'split' | 'unified'>('split')
const showInputs = ref(false)
const isLoading = ref(false)

// Responsive detection
const isMobile = ref(false)

// Sample texts for demonstration
const sampleTexts = {
  left: `Hello World!
This is a sample text for comparison.
It contains multiple lines.
Some lines will be different.
This line will remain the same.
End of sample text.`,
  right: `Hello Universe!
This is a sample text for comparison.
It contains several lines.
Some lines will be modified.
This line will remain the same.
Additional line added here.
End of sample text.`
}

// Computed
const hasDifferences = computed(() => {
  return leftText.value !== rightText.value && (leftText.value || rightText.value)
})

const diffStats = computed(() => {
  if (!hasDifferences.value) {
    return { additions: 0, deletions: 0, changes: 0 }
  }

  try {
    const diff = Diff.createPatch('comparison', leftText.value, rightText.value, 'Original', 'Modified')
    const lines = diff.split('\n')

    let additions = 0
    let deletions = 0

    lines.forEach(line => {
      if (line.startsWith('+') && !line.startsWith('+++')) {
        additions++
      } else if (line.startsWith('-') && !line.startsWith('---')) {
        deletions++
      }
    })

    return {
      additions,
      deletions,
      changes: additions + deletions
    }
  } catch (error) {
    return { additions: 0, deletions: 0, changes: 0 }
  }
})

const diffHtml = computed(() => {
  if (!hasDifferences.value) {
    return ''
  }

  try {
    const diff = Diff.createPatch('comparison', leftText.value, rightText.value, 'Original', 'Modified')
    const outputFormat = viewMode.value === 'split' ? 'side-by-side' : 'line-by-line'

    return html(diff, {
      drawFileList: false,
      matching: 'lines',
      outputFormat: outputFormat as any,
      renderNothingWhenEmpty: false,
    })
  } catch (error) {
    console.error('Error generating diff:', error)
    return '<div class="error">Error generating diff</div>'
  }
})

// Methods
const onTextChange = () => {
  // Debounce could be added here for performance
}

const clearTexts = () => {
  leftText.value = ''
  rightText.value = ''
}

const clearText = (side: 'left' | 'right') => {
  if (side === 'left') {
    leftText.value = ''
  } else {
    rightText.value = ''
  }
}

const loadSampleText = (side: 'left' | 'right') => {
  if (side === 'left') {
    leftText.value = sampleTexts.left
  } else {
    rightText.value = sampleTexts.right
  }
}

const copyDifferences = async () => {
  if (!hasDifferences.value) return

  try {
    const diffText = `文本对比结果：
原始文本字符数: ${leftText.value.length}
对比文本字符数: ${rightText.value.length}
删除行数: ${diffStats.value.deletions}
添加行数: ${diffStats.value.additions}
总变更数: ${diffStats.value.changes}

原始文本:
${leftText.value}

对比文本:
${rightText.value}`

    await navigator.clipboard.writeText(diffText)
    alert('差异信息已复制到剪贴板')
  } catch (error) {
    console.error('复制失败:', error)
    alert('复制失败，请手动复制')
  }
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
  if (isMobile.value) {
    showInputs.value = true
  }
}

// Lifecycle
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
</script>

<style scoped>
.diff-container {
  min-height: 400px;
}

.diff-viewer-wrapper {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.custom-diff-viewer {
  border: none;
  background: transparent;
}

/* Custom styles for diff2html */
:deep(.d2h-wrapper) {
  border: none;
  background: transparent;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

:deep(.d2h-file-header) {
  display: none;
}

:deep(.d2h-file-wrapper) {
  border: none;
  border-radius: 0;
  background: transparent;
}

:deep(.d2h-code-wrapper) {
  border: none;
  border-radius: 0;
  background: transparent;
}

:deep(.d2h-diff-table) {
  border: none;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.4;
  background: transparent;
  width: 100%;
}

:deep(.d2h-code-line) {
  padding: 8px 12px;
  border: none;
  background: transparent;
}

:deep(.d2h-code-line-prefix) {
  padding: 0 8px 0 0;
  text-align: center;
  width: 40px;
  background: transparent;
  border: none;
}

:deep(.d2h-code-line-ctn) {
  background: transparent;
  border: none;
  word-break: break-all;
  white-space: pre-wrap;
}

:deep(.d2h-ins) {
  background-color: rgba(34, 197, 94, 0.1) !important;
  border-left: 3px solid #22c55e;
}

:deep(.d2h-del) {
  background-color: rgba(239, 68, 68, 0.1) !important;
  border-left: 3px solid #ef4444;
}

:deep(.d2h-cntx) {
  background-color: transparent !important;
}

:deep(.d2h-info) {
  background-color: rgba(59, 130, 246, 0.1) !important;
  border-left: 3px solid #3b82f6;
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  :deep(.d2h-wrapper) {
    background: transparent;
    color: #e5e7eb;
  }

  :deep(.d2h-diff-table) {
    background-color: transparent;
    color: #e5e7eb;
  }

  :deep(.d2h-code-line) {
    background-color: transparent;
    color: #e5e7eb;
    border-color: #374151;
  }

  :deep(.d2h-code-line-prefix) {
    color: #9ca3af;
    background: transparent;
  }

  :deep(.d2h-code-line-ctn) {
    color: #e5e7eb;
    background: transparent;
  }

  :deep(.d2h-ins) {
    background-color: rgba(34, 197, 94, 0.15) !important;
    color: #dcfce7;
  }

  :deep(.d2h-del) {
    background-color: rgba(239, 68, 68, 0.15) !important;
    color: #fecaca;
  }

  :deep(.d2h-info) {
    background-color: rgba(59, 130, 246, 0.15) !important;
    color: #dbeafe;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  :deep(.d2h-code-line) {
    padding: 6px 8px;
    font-size: 12px;
  }

  :deep(.d2h-code-line-prefix) {
    width: 30px;
    padding: 0 4px 0 0;
  }

  :deep(.d2h-diff-table) {
    font-size: 12px;
  }
}
</style>
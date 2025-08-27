<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-6 lg:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">图片压缩工具</h1>
          <p class="text-gray-600 dark:text-gray-400">智能压缩图片，保持质量的同时减小文件大小</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Upload Panel -->
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">上传图片</h2>
          
          <!-- File Upload Area -->
          <div
            @drop="handleDrop"
            @dragover.prevent
            @dragenter.prevent
            :class="[
              'border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer',
              isDragging 
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                : 'border-gray-300 dark:border-slate-600 hover:border-purple-400 hover:bg-gray-50 dark:hover:bg-slate-700'
            ]"
            @click="triggerFileInput"
          >
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              multiple
              @change="handleFileSelect"
              class="hidden"
            />
            
            <div class="flex flex-col items-center gap-4">
              <div class="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <p class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  拖拽图片到这里或点击上传
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  支持 JPG、PNG、WebP 格式，最大 10MB
                </p>
              </div>
            </div>
          </div>

          <!-- Compression Settings -->
          <div v-if="originalImages.length > 0" class="mt-6 space-y-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">压缩设置</h3>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                压缩质量: {{ Math.round(quality * 100) }}%
              </label>
              <input
                v-model="quality"
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                class="w-full h-2 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">最大宽度 (像素)</label>
              <input
                v-model="maxWidth"
                type="number"
                min="100"
                max="4000"
                class="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">输出格式</label>
              <select
                v-model="outputFormat"
                class="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>

            <button
              @click="compressImages"
              :disabled="isCompressing"
              class="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 disabled:cursor-not-allowed"
            >
              {{ isCompressing ? '压缩中...' : '开始压缩' }}
            </button>
          </div>
        </div>

        <!-- Preview Panel -->
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">压缩结果</h2>
          
          <div v-if="compressedImages.length > 0" class="space-y-6">
            <div v-for="(image, index) in compressedImages" :key="index" class="border border-gray-200 dark:border-slate-600 rounded-xl p-4">
              <!-- Image Preview -->
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="text-center">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">原图</p>
                  <img :src="image.originalUrl" :alt="image.name" class="w-full h-32 object-cover rounded-lg" />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {{ formatFileSize(image.originalSize) }}
                  </p>
                </div>
                <div class="text-center">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">压缩后</p>
                  <img :src="image.compressedUrl" :alt="image.name" class="w-full h-32 object-cover rounded-lg" />
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {{ formatFileSize(image.compressedSize) }}
                  </p>
                </div>
              </div>

              <!-- Stats -->
              <div class="bg-gray-50 dark:bg-slate-700 rounded-lg p-3 mb-4">
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-gray-600 dark:text-gray-400">文件名:</span>
                    <span class="text-gray-800 dark:text-gray-200 ml-1">{{ image.name }}</span>
                  </div>
                  <div>
                    <span class="text-gray-600 dark:text-gray-400">压缩率:</span>
                    <span :class="[
                      'ml-1 font-semibold',
                      image.compressionRatio > 50 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'
                    ]">
                      {{ image.compressionRatio }}%
                    </span>
                  </div>
                </div>
              </div>

              <!-- Download Button -->
              <button
                @click="downloadImage(image)"
                class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200"
              >
                下载压缩图片
              </button>
            </div>

            <!-- Batch Download -->
            <div v-if="compressedImages.length > 1" class="pt-4 border-t border-gray-200 dark:border-slate-600">
              <button
                @click="downloadAll"
                class="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200"
              >
                下载所有图片 ({{ compressedImages.length }} 张)
              </button>
            </div>
          </div>
          
          <div v-else class="text-center py-16">
            <div class="w-24 h-24 bg-gray-200 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p class="text-gray-500 dark:text-gray-400">上传图片后压缩结果将显示在这里</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface CompressedImage {
  name: string
  originalUrl: string
  compressedUrl: string
  originalSize: number
  compressedSize: number
  compressionRatio: number
  blob: Blob
}

// State
const fileInput = ref<HTMLInputElement>()
const isDragging = ref(false)
const isCompressing = ref(false)
const originalImages = ref<File[]>([])
const compressedImages = ref<CompressedImage[]>([])

// Settings
const quality = ref(0.8)
const maxWidth = ref(1920)
const outputFormat = ref('image/jpeg')

// Methods
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    addFiles(Array.from(target.files))
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false
  
  if (event.dataTransfer?.files) {
    addFiles(Array.from(event.dataTransfer.files))
  }
}

const addFiles = (files: File[]) => {
  const imageFiles = files.filter(file => file.type.startsWith('image/'))
  const validFiles = imageFiles.filter(file => file.size <= 10 * 1024 * 1024) // 10MB limit
  
  if (validFiles.length !== files.length) {
    alert('只能上传图片文件，且文件大小不能超过 10MB')
  }
  
  originalImages.value = [...originalImages.value, ...validFiles]
}

const compressImages = async () => {
  if (originalImages.value.length === 0) return
  
  isCompressing.value = true
  compressedImages.value = []
  
  try {
    for (const file of originalImages.value) {
      const compressed = await compressImage(file)
      if (compressed) {
        compressedImages.value.push(compressed)
      }
    }
  } catch (error) {
    console.error('Compression failed:', error)
    alert('图片压缩失败，请重试')
  } finally {
    isCompressing.value = false
  }
}

const compressImage = async (file: File): Promise<CompressedImage | null> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img
      
      if (width > maxWidth.value) {
        height = (height * maxWidth.value) / width
        width = maxWidth.value
      }
      
      canvas.width = width
      canvas.height = height
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height)
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const originalSize = file.size
            const compressedSize = blob.size
            const compressionRatio = Math.round(((originalSize - compressedSize) / originalSize) * 100)
            
            resolve({
              name: file.name,
              originalUrl: URL.createObjectURL(file),
              compressedUrl: URL.createObjectURL(blob),
              originalSize,
              compressedSize,
              compressionRatio,
              blob
            })
          } else {
            resolve(null)
          }
        },
        outputFormat.value,
        quality.value
      )
    }
    
    img.src = URL.createObjectURL(file)
  })
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const downloadImage = (image: CompressedImage) => {
  const link = document.createElement('a')
  link.href = image.compressedUrl
  link.download = `compressed_${image.name}`
  link.click()
}

const downloadAll = () => {
  compressedImages.value.forEach(image => {
    setTimeout(() => downloadImage(image), 100)
  })
}

// Drag and drop handlers
const handleDragEnter = () => {
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

onMounted(() => {
  document.addEventListener('dragenter', handleDragEnter)
  document.addEventListener('dragleave', handleDragLeave)
})

onUnmounted(() => {
  document.removeEventListener('dragenter', handleDragEnter)
  document.removeEventListener('dragleave', handleDragLeave)
  
  // Clean up object URLs
  compressedImages.value.forEach(image => {
    URL.revokeObjectURL(image.originalUrl)
    URL.revokeObjectURL(image.compressedUrl)
  })
})
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(168, 85, 247, 0.3);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 8px rgba(168, 85, 247, 0.3);
}
</style>

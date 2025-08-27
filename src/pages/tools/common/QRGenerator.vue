<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-6 lg:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">二维码工具</h1>
          <p class="text-gray-600 dark:text-gray-400">生成和扫描二维码的完整解决方案</p>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="flex flex-col sm:flex-row gap-2 mb-8">
        <button
          @click="activeTab = 'generate'"
          :class="[
            'flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200',
            activeTab === 'generate'
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
              : 'bg-white/70 dark:bg-slate-800/70 text-gray-700 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-slate-800/90'
          ]"
        >
          <div class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            生成二维码
          </div>
        </button>
        <button
          @click="activeTab = 'scan'"
          :class="[
            'flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200',
            activeTab === 'scan'
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
              : 'bg-white/70 dark:bg-slate-800/70 text-gray-700 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-slate-800/90'
          ]"
        >
          <div class="flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            扫描二维码
          </div>
        </button>
      </div>

      <!-- QR Generator Tab -->
      <div v-if="activeTab === 'generate'" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Input Panel -->
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">输入内容</h2>
          
          <!-- Content Type Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">内容类型</label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                v-for="type in contentTypes"
                :key="type.value"
                @click="selectedType = type.value"
                :class="[
                  'p-3 rounded-xl text-sm font-medium transition-all duration-200',
                  selectedType === type.value
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                ]"
              >
                <div class="flex flex-col items-center gap-1">
                  <component :is="type.icon" class="w-4 h-4" />
                  <span>{{ type.label }}</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Text Input -->
          <div v-if="selectedType === 'text'" class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">文本内容</label>
            <textarea
              v-model="textContent"
              placeholder="输入要生成二维码的文本内容..."
              class="w-full h-32 p-4 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            ></textarea>
          </div>

          <!-- URL Input -->
          <div v-if="selectedType === 'url'" class="mb-6">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">网址链接</label>
            <input
              v-model="urlContent"
              type="url"
              placeholder="https://example.com"
              class="w-full p-4 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <!-- WiFi Input -->
          <div v-if="selectedType === 'wifi'" class="mb-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">网络名称 (SSID)</label>
              <input
                v-model="wifiData.ssid"
                type="text"
                placeholder="WiFi网络名称"
                class="w-full p-4 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">密码</label>
              <input
                v-model="wifiData.password"
                type="password"
                placeholder="WiFi密码"
                class="w-full p-4 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">加密类型</label>
              <select
                v-model="wifiData.security"
                class="w-full p-4 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">无密码</option>
              </select>
            </div>
          </div>

          <!-- Contact Input -->
          <div v-if="selectedType === 'contact'" class="mb-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">姓名</label>
              <input
                v-model="contactData.name"
                type="text"
                placeholder="联系人姓名"
                class="w-full p-4 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">电话</label>
              <input
                v-model="contactData.phone"
                type="tel"
                placeholder="手机号码"
                class="w-full p-4 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">邮箱</label>
              <input
                v-model="contactData.email"
                type="email"
                placeholder="电子邮箱"
                class="w-full p-4 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Settings -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                尺寸: {{ qrSize }}x{{ qrSize }}px
              </label>
              <input
                v-model="qrSize"
                type="range"
                min="128"
                max="512"
                step="32"
                class="w-full h-2 bg-gray-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">容错级别</label>
              <select
                v-model="errorCorrectionLevel"
                class="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="L">低 (7%)</option>
                <option value="M">中 (15%)</option>
                <option value="Q">较高 (25%)</option>
                <option value="H">高 (30%)</option>
              </select>
            </div>
          </div>

          <!-- Generate Button -->
          <button
            @click="generateQR"
            :disabled="!canGenerate"
            class="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 disabled:cursor-not-allowed"
          >
            生成二维码
          </button>
        </div>

        <!-- Preview Panel -->
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">预览</h2>
          
          <div v-if="qrCodeDataURL" class="text-center">
            <div class="inline-block p-4 bg-white rounded-2xl shadow-lg mb-6">
              <img :src="qrCodeDataURL" :alt="'QR Code'" class="max-w-full h-auto" />
            </div>
            
            <div class="space-y-3">
              <button
                @click="downloadQR"
                class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200"
              >
                下载二维码
              </button>
              
              <button
                @click="copyToClipboard"
                class="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200"
              >
                复制到剪贴板
              </button>
            </div>
          </div>
          
          <div v-else class="text-center py-16">
            <div class="w-24 h-24 bg-gray-200 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <p class="text-gray-500 dark:text-gray-400">输入内容后点击生成按钮</p>
          </div>
        </div>
      </div>

      <!-- QR Scanner Tab -->
      <div v-if="activeTab === 'scan'" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Scanner Panel -->
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">扫描二维码</h2>

          <!-- Camera Controls -->
          <div class="mb-6">
            <div class="flex flex-wrap gap-3 mb-4">
              <button
                @click="startScanning"
                :disabled="isScanning"
                class="flex-1 sm:flex-none bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 disabled:cursor-not-allowed"
              >
                {{ isScanning ? '扫描中...' : '开始扫描' }}
              </button>

              <button
                @click="stopScanning"
                :disabled="!isScanning"
                class="flex-1 sm:flex-none bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 disabled:cursor-not-allowed"
              >
                停止扫描
              </button>
            </div>

            <!-- Camera Selection -->
            <div v-if="cameras.length > 1" class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">选择摄像头</label>
              <select
                v-model="selectedCamera"
                @change="switchCamera"
                class="w-full p-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option v-for="camera in cameras" :key="camera.deviceId" :value="camera">
                  {{ camera.label || `摄像头 ${cameras.indexOf(camera) + 1}` }}
                </option>
              </select>
            </div>
          </div>

          <!-- Scanner Display -->
          <div class="relative">
            <div class="aspect-square bg-gray-100 dark:bg-slate-700 rounded-2xl overflow-hidden relative">
              <!-- QR Scanner Component -->
              <qrcode-stream
                v-if="isScanning"
                :constraints="cameraConstraints"
                @detect="onDetect"
                @error="onError"
                @camera-on="onCameraReady"
                @camera-off="onCameraOff"
                class="w-full h-full object-cover"
              >
                <!-- Scanning Overlay -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-48 h-48 border-2 border-blue-500 rounded-2xl relative">
                    <div class="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg"></div>
                    <div class="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg"></div>
                    <div class="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg"></div>
                    <div class="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg"></div>
                  </div>
                </div>
              </qrcode-stream>

              <!-- Placeholder when not scanning -->
              <div v-else class="w-full h-full flex items-center justify-center">
                <div class="text-center">
                  <svg class="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p class="text-gray-500 dark:text-gray-400">点击开始扫描按钮启动摄像头</p>
                </div>
              </div>
            </div>

            <!-- Loading Overlay -->
            <div v-if="isLoading" class="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
              <div class="bg-white dark:bg-slate-800 rounded-xl p-4 flex items-center gap-3">
                <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <span class="text-gray-800 dark:text-gray-200">{{ loadingMessage }}</span>
              </div>
            </div>
          </div>

          <!-- Error Display -->
          <div v-if="scanError" class="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-red-700 dark:text-red-300 font-medium">扫描错误</span>
            </div>
            <p class="text-red-600 dark:text-red-400 text-sm mt-1">{{ scanError }}</p>
          </div>
        </div>

        <!-- Scan Results Panel -->
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8">
          <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6">扫描结果</h2>

          <div v-if="scanResult" class="space-y-6">
            <!-- Result Display -->
            <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-green-700 dark:text-green-300 font-medium">扫描成功</span>
              </div>

              <!-- Content Type Badge -->
              <div class="mb-3">
                <span :class="[
                  'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                  getContentTypeBadgeClass(scanResult.type)
                ]">
                  {{ getContentTypeLabel(scanResult.type) }}
                </span>
              </div>

              <!-- Raw Content -->
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">原始内容</label>
                <div class="p-3 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-600">
                  <pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-all">{{ scanResult.rawValue }}</pre>
                </div>
              </div>

              <!-- Parsed Content -->
              <div v-if="scanResult.parsedData" class="mb-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">解析结果</label>
                <div class="space-y-2">
                  <div v-for="(value, key) in scanResult.parsedData" :key="key" class="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span class="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-20">{{ key }}:</span>
                    <span class="text-sm text-gray-800 dark:text-gray-200 break-all">{{ value }}</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-2">
                <button
                  @click="copyResult"
                  class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 text-sm"
                >
                  复制内容
                </button>

                <button
                  v-if="scanResult.type === 'url'"
                  @click="openUrl(scanResult.rawValue)"
                  class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 text-sm"
                >
                  打开链接
                </button>
              </div>
            </div>

            <!-- Scan History -->
            <div v-if="scanHistory.length > 0">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">扫描历史</h3>
              <div class="space-y-2 max-h-40 overflow-y-auto">
                <div
                  v-for="(item, index) in scanHistory.slice(-5)"
                  :key="index"
                  @click="selectHistoryItem(item)"
                  class="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-600 transition-colors duration-200"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ getContentTypeLabel(item.type) }}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatTime(item.timestamp) }}</span>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">{{ item.rawValue }}</p>
                </div>
              </div>
              <button
                @click="clearScanHistory"
                class="mt-3 text-sm text-red-600 hover:text-red-700 dark:text-red-400"
              >
                清除历史
              </button>
            </div>
          </div>

          <div v-else class="text-center py-16">
            <div class="w-24 h-24 bg-gray-200 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p class="text-gray-500 dark:text-gray-400">扫描二维码后结果将显示在这里</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h, onMounted, onUnmounted } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import QRCode from 'qrcode'

// Tab state
const activeTab = ref('generate')

// Scanner state
const isScanning = ref(false)
const isLoading = ref(false)
const loadingMessage = ref('')
const scanError = ref('')
const scanResult = ref<any>(null)
const scanHistory = ref<any[]>([])
const cameras = ref<MediaDeviceInfo[]>([])
const selectedCamera = ref<MediaDeviceInfo | null>(null)

// Icons as functional components
const TextIcon = () => h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M4 6h16M4 12h16M4 18h7' })
])

const LinkIcon = () => h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' })
])

const WifiIcon = () => h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0' })
])

const ContactIcon = () => h('svg', { class: 'w-4 h-4', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })
])

// State
const selectedType = ref('text')
const textContent = ref('')
const urlContent = ref('')
const qrSize = ref(256)
const errorCorrectionLevel = ref('M')
const qrCodeDataURL = ref('')

const wifiData = ref({
  ssid: '',
  password: '',
  security: 'WPA'
})

const contactData = ref({
  name: '',
  phone: '',
  email: ''
})

const contentTypes = [
  { value: 'text', label: '文本', icon: TextIcon },
  { value: 'url', label: '链接', icon: LinkIcon },
  { value: 'wifi', label: 'WiFi', icon: WifiIcon },
  { value: 'contact', label: '联系人', icon: ContactIcon }
]

// Computed
const canGenerate = computed(() => {
  switch (selectedType.value) {
    case 'text':
      return textContent.value.trim().length > 0
    case 'url':
      return urlContent.value.trim().length > 0
    case 'wifi':
      return wifiData.value.ssid.trim().length > 0
    case 'contact':
      return contactData.value.name.trim().length > 0 || contactData.value.phone.trim().length > 0
    default:
      return false
  }
})

const cameraConstraints = computed(() => {
  if (selectedCamera.value) {
    return {
      deviceId: selectedCamera.value.deviceId,
      facingMode: undefined
    }
  }
  return { facingMode: 'environment' }
})

const getQRContent = () => {
  switch (selectedType.value) {
    case 'text':
      return textContent.value
    case 'url':
      return urlContent.value
    case 'wifi':
      return `WIFI:T:${wifiData.value.security};S:${wifiData.value.ssid};P:${wifiData.value.password};;`
    case 'contact':
      return `BEGIN:VCARD\nVERSION:3.0\nFN:${contactData.value.name}\nTEL:${contactData.value.phone}\nEMAIL:${contactData.value.email}\nEND:VCARD`
    default:
      return ''
  }
}

// Scanner Methods
const startScanning = async () => {
  try {
    isLoading.value = true
    loadingMessage.value = '正在启动摄像头...'
    scanError.value = ''

    // Get available cameras
    await getCameras()

    isScanning.value = true
    isLoading.value = false
  } catch (error) {
    console.error('Failed to start scanning:', error)
    scanError.value = '无法启动摄像头，请检查权限设置'
    isLoading.value = false
  }
}

const stopScanning = () => {
  isScanning.value = false
  scanError.value = ''
}

const getCameras = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    cameras.value = devices.filter(device => device.kind === 'videoinput')

    if (cameras.value.length > 0 && !selectedCamera.value) {
      // Prefer back camera if available
      const backCamera = cameras.value.find(camera =>
        camera.label.toLowerCase().includes('back') ||
        camera.label.toLowerCase().includes('rear')
      )
      selectedCamera.value = backCamera || cameras.value[0]
    }
  } catch (error) {
    console.error('Failed to get cameras:', error)
  }
}

const switchCamera = () => {
  if (isScanning.value) {
    // Restart scanning with new camera
    stopScanning()
    setTimeout(startScanning, 100)
  }
}

const onDetect = (detectedCodes: any[]) => {
  if (detectedCodes.length > 0) {
    const code = detectedCodes[0]
    const result = {
      rawValue: code.rawValue,
      type: detectContentType(code.rawValue),
      parsedData: parseQRContent(code.rawValue),
      timestamp: new Date()
    }

    scanResult.value = result
    scanHistory.value.push(result)

    // Auto-stop scanning after successful scan
    stopScanning()
  }
}

const onError = (error: any) => {
  console.error('QR Scanner error:', error)

  if (error.name === 'NotAllowedError') {
    scanError.value = '摄像头权限被拒绝，请在浏览器设置中允许摄像头访问'
  } else if (error.name === 'NotFoundError') {
    scanError.value = '未找到摄像头设备'
  } else if (error.name === 'NotSupportedError') {
    scanError.value = '浏览器不支持摄像头功能'
  } else {
    scanError.value = '摄像头启动失败: ' + (error.message || '未知错误')
  }

  isScanning.value = false
  isLoading.value = false
}

const onCameraReady = () => {
  isLoading.value = false
  scanError.value = ''
}

const onCameraOff = () => {
  isScanning.value = false
}

const detectContentType = (content: string): string => {
  if (content.startsWith('http://') || content.startsWith('https://')) {
    return 'url'
  } else if (content.startsWith('WIFI:')) {
    return 'wifi'
  } else if (content.startsWith('BEGIN:VCARD')) {
    return 'contact'
  } else if (content.startsWith('mailto:')) {
    return 'email'
  } else if (content.startsWith('tel:')) {
    return 'phone'
  } else {
    return 'text'
  }
}

const parseQRContent = (content: string): any => {
  const type = detectContentType(content)

  switch (type) {
    case 'wifi':
      return parseWiFiQR(content)
    case 'contact':
      return parseVCardQR(content)
    case 'email':
      return { email: content.replace('mailto:', '') }
    case 'phone':
      return { phone: content.replace('tel:', '') }
    default:
      return null
  }
}

const parseWiFiQR = (content: string) => {
  const matches = content.match(/WIFI:T:([^;]*);S:([^;]*);P:([^;]*);/)
  if (matches) {
    return {
      安全类型: matches[1] || '无',
      网络名称: matches[2] || '',
      密码: matches[3] || '无密码'
    }
  }
  return null
}

const parseVCardQR = (content: string) => {
  const lines = content.split('\n')
  const data: any = {}

  lines.forEach(line => {
    if (line.startsWith('FN:')) data.姓名 = line.substring(3)
    if (line.startsWith('TEL:')) data.电话 = line.substring(4)
    if (line.startsWith('EMAIL:')) data.邮箱 = line.substring(6)
    if (line.startsWith('ORG:')) data.组织 = line.substring(4)
  })

  return Object.keys(data).length > 0 ? data : null
}

const getContentTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    text: '文本',
    url: '网址链接',
    wifi: 'WiFi信息',
    contact: '联系人',
    email: '邮箱',
    phone: '电话'
  }
  return labels[type] || '未知类型'
}

const getContentTypeBadgeClass = (type: string): string => {
  const classes: Record<string, string> = {
    text: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
    url: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    wifi: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    contact: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    email: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    phone: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
  }
  return classes[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
}

const copyResult = async () => {
  if (!scanResult.value) return

  try {
    await navigator.clipboard.writeText(scanResult.value.rawValue)
    alert('内容已复制到剪贴板')
  } catch (error) {
    console.error('Copy failed:', error)
    alert('复制失败，请手动复制')
  }
}

const openUrl = (url: string) => {
  window.open(url, '_blank')
}

const selectHistoryItem = (item: any) => {
  scanResult.value = item
}

const clearScanHistory = () => {
  scanHistory.value = []
}

const formatTime = (timestamp: Date): string => {
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(timestamp)
}

// Generator Methods
const generateQR = async () => {
  const content = getQRContent()
  if (!content) return

  try {
    const options = {
      errorCorrectionLevel: errorCorrectionLevel.value as any,
      type: 'image/png' as const,
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      width: qrSize.value
    }

    qrCodeDataURL.value = await QRCode.toDataURL(content, options)
  } catch (error) {
    console.error('QR generation failed:', error)
    alert('二维码生成失败，请检查输入内容')
  }
}

const downloadQR = () => {
  if (!qrCodeDataURL.value) return
  
  const link = document.createElement('a')
  link.download = `qrcode-${Date.now()}.png`
  link.href = qrCodeDataURL.value
  link.click()
}

const copyToClipboard = async () => {
  if (!qrCodeDataURL.value) return
  
  try {
    const response = await fetch(qrCodeDataURL.value)
    const blob = await response.blob()
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ])
    alert('二维码已复制到剪贴板')
  } catch (error) {
    console.error('Copy failed:', error)
    alert('复制失败，请手动保存图片')
  }
}

// Lifecycle
onMounted(() => {
  getCameras()
})

onUnmounted(() => {
  if (isScanning.value) {
    stopScanning()
  }
})
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #059669);
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #059669);
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
}
</style>

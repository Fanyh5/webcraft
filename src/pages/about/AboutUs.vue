<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
    <!-- Hero Section -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <div class="flex items-center justify-center mb-8">
          <div class="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-2xl">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          关于 <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">WebCraft</span>
        </h1>
        <p class="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          打造最优秀的在线工具集合平台，让每个人都能轻松使用专业级工具
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://github.com/Fanyh5/webcraft"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            查看源码
          </a>
          <button
            @click="scrollToSection('mission')"
            class="inline-flex items-center px-8 py-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border border-gray-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-700 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            了解更多
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section id="mission" class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">我们的使命</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            WebCraft 致力于为用户提供最优质的在线工具体验，让复杂的任务变得简单高效
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 text-center transform hover:scale-105 transition-all duration-200">
            <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">高效便捷</h3>
            <p class="text-gray-600 dark:text-gray-300">
              无需下载安装，打开浏览器即可使用。所有工具都经过精心优化，确保最佳性能。
            </p>
          </div>

          <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 text-center transform hover:scale-105 transition-all duration-200">
            <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">安全可靠</h3>
            <p class="text-gray-600 dark:text-gray-300">
              所有数据处理都在本地进行，保护您的隐私安全。开源透明，值得信赖。
            </p>
          </div>

          <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 text-center transform hover:scale-105 transition-all duration-200">
            <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">用户至上</h3>
            <p class="text-gray-600 dark:text-gray-300">
              持续收集用户反馈，不断改进产品体验。每一个功能都以用户需求为出发点。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">核心特性</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            WebCraft 集成了多种实用工具，满足您的日常工作和学习需求
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <div class="flex items-start space-x-4">
              <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">科学计算器</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  支持高级数学运算，包括三角函数、对数、指数等科学计算功能。
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">二维码工具</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  生成和扫描二维码，支持文本、网址、WiFi、联系人等多种格式。
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">图片压缩</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  智能压缩图片文件，在保持质量的同时大幅减小文件大小。
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">文本对比</h3>
                <p class="text-gray-600 dark:text-gray-300">
                  高效对比两段文本的差异，支持多种视图模式和详细统计。
                </p>
              </div>
            </div>
          </div>

          <div class="relative">
            <div class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 class="text-2xl font-bold mb-4">持续更新</h3>
              <p class="text-blue-100 mb-6">
                我们不断添加新的工具和功能，根据用户需求持续改进产品体验。
              </p>
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span>响应式设计，完美适配移动端</span>
                </div>
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span>暗色模式支持，保护您的眼睛</span>
                </div>
                <div class="flex items-center space-x-3">
                  <svg class="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                  <span>开源免费，社区驱动开发</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Media Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">关注我们</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            通过以下平台与我们保持联系，获取最新更新和技术分享
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- GitHub -->
          <a
            v-for="social in socialPlatforms"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            :class="[
              'group relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-3xl',
              social.available ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
            ]"
            :aria-label="`关注我们的 ${social.name}`"
          >
            <div :class="[
              'flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-6 transition-all duration-300',
              social.gradient,
              social.available ? 'group-hover:scale-110' : ''
            ]">
              <component :is="social.icon" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ social.name }}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">{{ social.description }}</p>
            <div v-if="!social.available" class="text-sm text-amber-600 dark:text-amber-400 font-medium">
              即将推出
            </div>
            <div v-else class="flex items-center justify-center text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
              立即关注
              <svg class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>

            <!-- Hover effect overlay -->
            <div v-if="social.available" class="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" :class="social.gradient"></div>
          </a>
        </div>
      </div>
    </section>

    <!-- Developer Introduction Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">开发者介绍</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            了解项目背后的故事和开发历程
          </p>
        </div>

        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 lg:p-12">
          <div class="flex flex-col lg:flex-row items-center gap-8">
            <div class="flex-shrink-0">
              <div class="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div class="flex-1 text-center lg:text-left">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">项目创建者的话</h3>
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-xl p-6 mb-6">
                <div class="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p class="flex items-start gap-3">
                    <span class="text-2xl">👋</span>
                    <span>大家好！我是一位<span class="font-semibold text-blue-600 dark:text-blue-400">后端开发者</span>，对前端不是很了解，会一点 Vue。</span>
                  </p>
                  <p class="flex items-start gap-3">
                    <span class="text-2xl">🤖</span>
                    <span>这个项目是<span class="font-semibold text-indigo-600 dark:text-indigo-400">用 AI 开发的</span>，通过与 AI 助手的协作，我学习并实现了这个在线工具集合平台。</span>
                  </p>
                  <p class="flex items-start gap-3">
                    <span class="text-2xl">🙏</span>
                    <span>不足之处请各位开发者<span class="font-semibold text-purple-600 dark:text-purple-400">多多指教</span>，欢迎大家提出宝贵的意见和建议！</span>
                  </p>
                  <p class="flex items-start gap-3">
                    <span class="text-2xl">💡</span>
                    <span>希望这个项目能够帮助到大家，也希望能与更多开发者交流学习，共同进步。</span>
                  </p>
                </div>
              </div>

              <!-- Skills and Tags -->
              <div class="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
                <div class="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                  <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>后端开发</span>
                </div>
                <div class="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Vue.js 学习中</span>
                </div>
                <div class="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>AI 协作开发</span>
                </div>
                <div class="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">
                  <div class="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>开源贡献</span>
                </div>
              </div>

              <!-- Call to Action -->
              <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                <h4 class="text-lg font-bold mb-3">欢迎交流与合作</h4>
                <p class="text-blue-100 mb-4 text-sm">
                  如果您有任何建议、想法或者愿意一起完善这个项目，非常欢迎与我交流！
                </p>
                <div class="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://github.com/Fanyh5/webcraft"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-medium transition-all duration-200 text-sm"
                  >
                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub 项目
                  </a>
                  <a
                    href="https://github.com/Fanyh5/webcraft/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-medium transition-all duration-200 text-sm"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    提出建议
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h3 class="text-2xl font-bold mb-4">感谢您的支持</h3>
          <p class="text-blue-100 mb-6 max-w-2xl mx-auto">
            WebCraft 的成长离不开每一位用户的支持和反馈。如果您觉得我们的工具对您有帮助，请考虑给我们的 GitHub 项目点个 Star ⭐
          </p>
          <a
            href="https://github.com/Fanyh5/webcraft"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Star on GitHub
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'

// Set page title
if (typeof document !== 'undefined') {
  document.title = '关于我们 - WebCraft 在线工具集合'
}

// Social media platform interface
interface SocialPlatform {
  name: string
  description: string
  url: string
  gradient: string
  icon: any
  available: boolean
}

// Social media icons as functional components
const GitHubIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-8 h-8'
}, [
  h('path', {
    d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
  })
])

const YouTubeIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-8 h-8'
}, [
  h('path', {
    d: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
  })
])

const TwitterIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-8 h-8'
}, [
  h('path', {
    d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
  })
])

const DiscordIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-8 h-8'
}, [
  h('path', {
    d: 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9554 2.4189-2.1568 2.4189Z'
  })
])

const TelegramIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-8 h-8'
}, [
  h('path', {
    d: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z'
  })
])

const WeChatIcon = () => h('svg', {
  fill: 'currentColor',
  viewBox: '0 0 24 24',
  class: 'w-8 h-8'
}, [
  h('path', {
    d: 'M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.111.24-.248 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.858zm-3.288 1.987c.464 0 .840.385.840.86 0 .476-.376.861-.84.861-.464 0-.84-.385-.84-.86 0-.476.376-.861.84-.861zm3.733 0c.464 0 .84.385.84.86 0 .476-.376.861-.84.861-.464 0-.84-.385-.84-.86 0-.476.376-.861.84-.861z'
  })
])

// Social media platforms data
const socialPlatforms = ref<SocialPlatform[]>([
  {
    name: 'GitHub',
    description: '查看源代码，参与开源贡献',
    url: 'https://github.com/Fanyh5/webcraft',
    gradient: 'bg-gradient-to-r from-gray-700 to-gray-900',
    icon: GitHubIcon,
    available: true
  },
  {
    name: 'YouTube',
    description: '观看教程视频和产品演示',
    url: '#',
    gradient: 'bg-gradient-to-r from-red-500 to-red-600',
    icon: YouTubeIcon,
    available: false
  },
  {
    name: 'Twitter',
    description: '获取最新动态和技术分享',
    url: '#',
    gradient: 'bg-gradient-to-r from-blue-400 to-blue-600',
    icon: TwitterIcon,
    available: false
  },
  {
    name: 'Discord',
    description: '加入社区，与开发者实时交流',
    url: '#',
    gradient: 'bg-gradient-to-r from-indigo-500 to-purple-600',
    icon: DiscordIcon,
    available: false
  },
  {
    name: 'Telegram',
    description: '订阅频道，接收更新通知',
    url: '#',
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    icon: TelegramIcon,
    available: false
  },
  {
    name: '微信',
    description: '关注公众号，获取中文资讯',
    url: '#',
    gradient: 'bg-gradient-to-r from-green-500 to-green-600',
    icon: WeChatIcon,
    available: false
  }
])

// Smooth scroll to section
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<style scoped>
/* Custom animations and effects */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.float-animation {
  animation: float 6s ease-in-out infinite;
}

/* Gradient text animation */
@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.gradient-text {
  background: linear-gradient(-45deg, #3b82f6, #8b5cf6, #06b6d4, #10b981);
  background-size: 400% 400%;
  animation: gradient-shift 4s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Enhanced hover effects */
.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #2563eb, #7c3aed);
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }
}

/* Responsive text sizing */
@media (max-width: 640px) {
  .text-4xl {
    font-size: 2.5rem;
  }

  .text-3xl {
    font-size: 2rem;
  }
}

/* Focus styles for accessibility */
button:focus,
a:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Print styles */
@media print {
  .no-print {
    display: none;
  }

  body {
    background: white !important;
    color: black !important;
  }
}
</style>
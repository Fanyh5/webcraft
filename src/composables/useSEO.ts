import { useHead } from '@unhead/vue'
import { nextTick } from 'vue'

interface SEOOptions {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  siteName?: string
  locale?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
  noIndex?: boolean
  canonical?: string
}

export function useSEO(options: SEOOptions = {}) {
  const {
    title = 'WebCraft - 在线工具集合',
    description = 'WebCraft 提供专业的在线工具集合，包括科学计算器、二维码生成扫描器、图片压缩工具、M3U8播放器等。免费、快速、安全的网页工具，无需下载安装。',
    keywords = '在线工具,科学计算器,二维码生成器,二维码扫描,图片压缩,M3U8播放器,网页工具,免费工具,WebCraft',
    image = 'https://quixotic.eu.cc/og-image.jpg',
    url = 'https://quixotic.eu.cc/',
    type = 'website',
    siteName = 'WebCraft',
    locale = 'zh_CN',
    author = 'WebCraft Team',
    publishedTime,
    modifiedTime,
    section,
    tags = [],
    noIndex = false,
    canonical
  } = options

  const fullTitle = title.includes('WebCraft') ? title : `${title} | WebCraft - 在线工具集合`

  // 延迟调用 useHead 以确保上下文可用
  nextTick(() => {
    try {
      useHead({
    title: fullTitle,
    meta: [
      // 基础 SEO
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: author },
      { name: 'robots', content: noIndex ? 'noindex, nofollow' : 'index, follow' },
      
      // Open Graph
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: locale },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:url', content: url },
      
      // 文章相关 (如果提供)
      ...(publishedTime ? [{ property: 'article:published_time', content: publishedTime }] : []),
      ...(modifiedTime ? [{ property: 'article:modified_time', content: modifiedTime }] : []),
      ...(section ? [{ property: 'article:section', content: section }] : []),
      ...(author ? [{ property: 'article:author', content: author }] : []),
      
      // 标签
      ...tags.map(tag => ({ property: 'article:tag', content: tag })),
      
      // 移动端优化
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'WebCraft工具' },
      { name: 'theme-color', content: '#3b82f6' },
      
      // 安全相关 (移除 X-Frame-Options，因为它只能通过 HTTP 头设置)
      { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
      { 'http-equiv': 'X-XSS-Protection', content: '1; mode=block' },
      { 'http-equiv': 'Referrer-Policy', content: 'strict-origin-when-cross-origin' }
    ],
    link: [
      // Canonical URL
      { rel: 'canonical', href: canonical || url },
      
      // 预连接
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: '' },
      
      // 多语言支持
      { rel: 'alternate', hreflang: 'zh-CN', href: url },
      { rel: 'alternate', hreflang: 'en', href: url.replace('quixotic.eu.cc', 'quixotic.eu.cc/en') },
      { rel: 'alternate', hreflang: 'x-default', href: url }
    ],
    script: [
      // 结构化数据 - 面包屑导航
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: generateBreadcrumbs(url)
        })
      }
    ]
    })
    } catch (error) {
      console.warn('SEO head injection failed:', error)
    }
  })

  return {
    updateSEO: (newOptions: Partial<SEOOptions>) => {
      useSEO({ ...options, ...newOptions })
    }
  }
}

// 生成面包屑导航的结构化数据
function generateBreadcrumbs(url: string) {
  const path = new URL(url).pathname
  const segments = path.split('/').filter(Boolean)
  
  const breadcrumbs = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'WebCraft',
      item: 'https://quixotic.eu.cc/'
    }
  ]

  let currentPath = 'https://quixotic.eu.cc'
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    breadcrumbs.push({
      '@type': 'ListItem',
      position: index + 2,
      name: getBreadcrumbName(segment),
      item: currentPath
    })
  })

  return breadcrumbs
}

// 获取面包屑名称
function getBreadcrumbName(segment: string): string {
  const nameMap: Record<string, string> = {
    'tools': '工具',
    'common': '常用工具',
    'image': '图片工具',
    'video': '视频工具',
    'text': '文本工具',
    'calculator': '科学计算器',
    'qr-generator': '二维码工具',
    'compressor': '图片压缩',
    'm3u8-player': 'M3U8播放器',
    'comparison': '文本对比'
  }
  
  return nameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
}

// 预定义的工具页面 SEO 配置
export const toolSEOConfigs = {
  calculator: {
    title: '科学计算器 - 在线计算工具',
    description: '功能强大的在线科学计算器，支持三角函数、对数、指数、阶乘等高级数学运算。免费使用，支持移动端，计算历史记录。',
    keywords: '科学计算器,在线计算器,数学计算,三角函数,对数计算,指数运算,阶乘计算,计算工具',
    url: 'https://quixotic.eu.cc/tools/common/calculator',
    section: '常用工具',
    tags: ['计算器', '数学', '科学计算', '在线工具']
  },
  qrGenerator: {
    title: '二维码生成器和扫描器 - 在线二维码工具',
    description: '专业的二维码生成和扫描工具，支持文本、网址、WiFi、联系人等多种格式。可自定义尺寸和容错级别，支持摄像头扫描。',
    keywords: '二维码生成器,二维码扫描,QR码生成,二维码工具,在线生成二维码,扫描二维码,WiFi二维码',
    url: 'https://quixotic.eu.cc/tools/common/qr-generator',
    section: '常用工具',
    tags: ['二维码', 'QR码', '扫描', '生成器', '在线工具']
  },
  imageCompressor: {
    title: '图片压缩工具 - 在线图片优化',
    description: '智能图片压缩工具，支持JPG、PNG、WebP格式。可调节压缩质量，批量处理，大幅减小文件大小同时保持图片质量。',
    keywords: '图片压缩,图片优化,在线压缩图片,图片大小压缩,JPG压缩,PNG压缩,WebP转换,批量压缩',
    url: 'https://quixotic.eu.cc/tools/image/compressor',
    section: '图片工具',
    tags: ['图片压缩', '图片优化', '文件压缩', '在线工具']
  },
  m3u8Player: {
    title: 'M3U8播放器 - 在线HLS视频播放',
    description: '专业的M3U8在线播放器，支持HLS直播流和点播视频。高质量播放体验，支持全屏、倍速播放等功能。',
    keywords: 'M3U8播放器,HLS播放器,在线视频播放,直播播放器,视频工具,流媒体播放',
    url: 'https://quixotic.eu.cc/tools/video/m3u8-player',
    section: '视频工具',
    tags: ['视频播放', 'M3U8', 'HLS', '直播', '在线工具']
  },
  textComparison: {
    title: '文本对比工具 - 在线文本差异比较',
    description: '专业的在线文本对比工具，支持分屏和统一视图模式，高亮显示文本差异，提供详细的变更统计。免费使用，支持大文本对比。',
    keywords: '文本对比,文本比较,差异比较,文本差异,代码对比,在线对比工具,文本工具,diff工具',
    url: 'https://quixotic.eu.cc/tools/text/comparison',
    section: '文本工具',
    tags: ['文本对比', '差异比较', '文本工具', '在线工具']
  }
}

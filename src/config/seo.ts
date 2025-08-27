// SEO 配置文件
export const siteConfig = {
  name: 'WebCraft',
  title: 'WebCraft - 在线工具集合',
  description: 'WebCraft 提供专业的在线工具集合，包括科学计算器、二维码生成扫描器、图片压缩工具、M3U8播放器等。免费、快速、安全的网页工具，无需下载安装。',
  url: 'https://quixotic.eu.cc',
  ogImage: 'https://quixotic.eu.cc/og-image.jpg',
  twitterImage: 'https://quixotic.eu.cc/twitter-image.jpg',
  keywords: '在线工具,科学计算器,二维码生成器,二维码扫描,图片压缩,M3U8播放器,网页工具,免费工具,WebCraft',
  author: 'WebCraft Team',
  locale: 'zh_CN',
  themeColor: '#3b82f6'
}

// 页面特定的 SEO 配置
export const pageConfigs = {
  home: {
    title: 'WebCraft - 专业在线工具集合 | 科学计算器、二维码工具、图片压缩',
    description: '专业的在线工具集合平台，提供科学计算器、二维码生成扫描、图片压缩、视频播放等实用工具。免费使用，无需注册，支持移动端。',
    keywords: '在线工具集合,免费工具,网页工具,实用工具,WebCraft',
    url: 'https://quixotic.eu.cc/',
    section: '首页'
  },
  calculator: {
    title: '科学计算器 - 专业在线计算工具 | WebCraft',
    description: '功能强大的在线科学计算器，支持三角函数、对数、指数、阶乘等高级数学运算。免费使用，支持移动端，提供计算历史记录功能。',
    keywords: '科学计算器,在线计算器,数学计算,三角函数,对数计算,指数运算,阶乘计算,计算工具,免费计算器',
    url: 'https://quixotic.eu.cc/tools/common/calculator',
    section: '常用工具',
    tags: ['计算器', '数学', '科学计算', '在线工具']
  },
  qrGenerator: {
    title: '二维码生成器和扫描器 - 专业二维码工具 | WebCraft',
    description: '专业的二维码生成和扫描工具，支持文本、网址、WiFi、联系人等多种格式。可自定义尺寸和容错级别，支持摄像头扫描，免费使用。',
    keywords: '二维码生成器,二维码扫描,QR码生成,二维码工具,在线生成二维码,扫描二维码,WiFi二维码,联系人二维码',
    url: 'https://quixotic.eu.cc/tools/common/qr-generator',
    section: '常用工具',
    tags: ['二维码', 'QR码', '扫描', '生成器', '在线工具']
  },
  imageCompressor: {
    title: '图片压缩工具 - 在线图片优化压缩 | WebCraft',
    description: '智能图片压缩工具，支持JPG、PNG、WebP格式。可调节压缩质量，支持批量处理，大幅减小文件大小同时保持图片质量。',
    keywords: '图片压缩,图片优化,在线压缩图片,图片大小压缩,JPG压缩,PNG压缩,WebP转换,批量压缩,图片工具',
    url: 'https://quixotic.eu.cc/tools/image/compressor',
    section: '图片工具',
    tags: ['图片压缩', '图片优化', '文件压缩', '在线工具']
  },
  m3u8Player: {
    title: 'M3U8播放器 - 在线HLS视频播放器 | WebCraft',
    description: '专业的M3U8在线播放器，支持HLS直播流和点播视频。高质量播放体验，支持全屏、倍速播放、字幕等功能。',
    keywords: 'M3U8播放器,HLS播放器,在线视频播放,直播播放器,视频工具,流媒体播放,视频播放器',
    url: 'https://quixotic.eu.cc/tools/video/m3u8-player',
    section: '视频工具',
    tags: ['视频播放', 'M3U8', 'HLS', '直播', '在线工具']
  },
  textComparison: {
    title: '文本对比工具 - 在线文本差异比较 | WebCraft',
    description: '专业的在线文本对比工具，支持分屏和统一视图模式，高亮显示文本差异，提供详细的变更统计。免费使用，支持大文本对比。',
    keywords: '文本对比,文本比较,差异比较,文本差异,代码对比,在线对比工具,文本工具,diff工具',
    url: 'https://quixotic.eu.cc/tools/text/comparison',
    section: '文本工具',
    tags: ['文本对比', '差异比较', '文本工具', '在线工具']
  }
}

// 结构化数据模板
export const structuredDataTemplates = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    sameAs: [
      'https://github.com/webcraft-tools'
    ]
  },
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  },
  softwareApplication: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${siteConfig.name} 在线工具集合`,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      '@type': 'Organization',
      name: siteConfig.author
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250'
    }
  }
}

// 生成面包屑导航
export function generateBreadcrumbs(url: string) {
  const path = new URL(url).pathname
  const segments = path.split('/').filter(Boolean)
  
  const breadcrumbs = [
    {
      '@type': 'ListItem',
      position: 1,
      name: siteConfig.name,
      item: siteConfig.url
    }
  ]

  let currentPath = siteConfig.url.replace(/\/$/, '')
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

// 获取面包屑名称映射
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

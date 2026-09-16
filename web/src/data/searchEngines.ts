import { SearchEngine } from '../types';

export const SEARCH_ENGINES: SearchEngine[] = [
  { id: 'bing', name: '必应', url: 'https://www.bing.com/search?q=', placeholder: '微软 Bing 搜索...' },
  { id: 'baidu', name: '百度', url: 'https://www.baidu.com/s?wd=', placeholder: '百度一下，你就知道...' },
  { id: 'sogou', name: '搜狗', url: 'https://www.sogou.com/web?query=', placeholder: '搜狗搜索...' },
  { id: 'google', name: '谷歌', url: 'https://www.google.com/search?q=', placeholder: 'Google 全球搜索...' },
  { id: 'bilibili', name: 'Bilibili', url: 'https://search.bilibili.com/all?keyword=', placeholder: '搜索哔哩哔哩视频、UP主...' },
  { id: 'pan', name: '百度网盘', url: 'https://pan.baidu.com/s/1', placeholder: '搜索网盘资源...' },
  { id: 'weibo', name: '微博', url: 'https://s.weibo.com/weibo?q=', placeholder: '搜索微博热门话题...' },
  { id: 'zhihu', name: '知乎', url: 'https://www.zhihu.com/search?type=content&q=', placeholder: '知乎搜索问答与文章...' },
  { id: 'github', name: 'GitHub', url: 'https://github.com/search?q=', placeholder: '搜索开源项目与代码...' }
];

export const TOP_NAV_LINKS = [
  { name: '必应', url: 'https://www.bing.com' },
  { name: '搜资源', url: 'https://www.pansou.asia/' },
  { name: 'Bilibili', url: 'https://www.bilibili.com' },
  { name: '百度网盘', url: 'https://pan.baidu.com' },
  { name: '阿里云盘', url: 'https://www.alipan.com' },
  { name: '迅雷网盘', url: 'https://pan.xunlei.com' },
  { name: '百度', url: 'https://www.baidu.com' },
  { name: '搜狗', url: 'https://www.sogou.com' },
  { name: 'Yandex', url: 'https://yandex.com' },
  { name: '谷歌', url: 'https://www.google.com' },
  { name: '微博', url: 'https://weibo.com' },
  { name: '知乎', url: 'https://www.zhihu.com' },
  { name: '🔥 搜影视', url: 'https://kanju.ai/?utm_source=WZ-buzhaole', hot: true },
  { name: '游戏中心', url: '#section-game' },
  { name: 'AI集合站', url: '#section-tool' }
];

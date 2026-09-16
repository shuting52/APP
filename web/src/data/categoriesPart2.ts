import { Category } from '../types';

export const CATEGORIES_PART2: Category[] = [
  {
    id: 'novel',
    name: '小说阅读',
    iconName: 'BookOpen',
    desc: '全网小说免广告阅读、有声听书与电子报刊',
    subcategories: [
      { id: '26', name: '小说' },
      { id: '27', name: '听书' },
      { id: '28', name: '报刊' }
    ],
    cards: [
      {
        id: 'n-1',
        title: '悦读',
        url: 'https://yuedu.163.com',
        icon: 'https://www.daott.cn/zb_users/upload/iiice_nav/202607/20260703205626_53b7474e915a2a09af0d77e40571753d.webp',
        fallbackDomain: 'yuedu.163.com',
        fallbackText: '悦',
        subcatId: '26'
      },
      {
        id: 'n-2',
        title: '无限小说网',
        url: 'https://wuxianbook.com/',
        icon: 'https://www.daott.cn/zb_users/upload/iiice_nav/202608/20260801161229_cb3ec90c3ceed85f384ca91f19b35d71.png',
        fallbackDomain: 'wuxianbook.com',
        fallbackText: '无',
        subcatId: '26'
      },
      {
        id: 'n-3',
        title: '金庸武侠网',
        url: 'https://www.jinyongwx.com/',
        icon: 'https://onehu.xyz/img/fluid.png',
        fallbackDomain: 'www.jinyongwx.com',
        fallbackText: '金',
        subcatId: '26'
      },
      {
        id: 'n-4',
        title: '哔哩轻小说',
        url: 'https://www.linovelib.com/',
        icon: 'https://www.linovelib.com/favicon.ico',
        fallbackDomain: 'www.linovelib.com',
        fallbackText: '哔',
        subcatId: '26'
      },
      {
        id: 'n-5',
        title: '八零电子书',
        url: 'https://www.txt80.cc/',
        icon: 'https://www.txt80.cc/favicon.ico',
        fallbackDomain: 'www.txt80.cc',
        fallbackText: '八',
        subcatId: '26'
      },
      {
        id: 'n-6',
        title: 'Z-Library镜像',
        url: 'https://zh.101sat.ru/',
        icon: 'https://www.daott.cn/zb_users/upload/iiice_nav/202606/20260616205020_4286e3feb1dc73c5bdf9f0b4fe85bd82.png',
        fallbackDomain: 'zh.101sat.ru',
        fallbackText: 'Z',
        subcatId: '26'
      },
      {
        id: 'n-7',
        title: '鸠摩搜索',
        url: 'https://www.jiumodiary.com/',
        icon: 'https://www.jiumodiary.com/images/favicon.png',
        fallbackDomain: 'www.jiumodiary.com',
        fallbackText: '鸠',
        subcatId: '26'
      },
      {
        id: 'n-8',
        title: '识典古籍',
        url: 'https://www.shidianguji.com/',
        icon: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ipsaulpjuh_yzj_zlp/ljhwZthlaukjlkulzlp/logo/logo.ico',
        fallbackDomain: 'www.shidianguji.com',
        fallbackText: '识',
        subcatId: '26'
      },
      {
        id: 'n-9',
        title: '蜻蜓有声小说',
        url: 'https://www.qtfm.cn/',
        icon: 'https://sss.qtfm.cn/favicon.ico',
        fallbackDomain: 'www.qtfm.cn',
        fallbackText: '蜻',
        subcatId: '27'
      },
      {
        id: 'n-10',
        title: '听友FM',
        url: 'https://tingyou.fm/',
        icon: 'https://tingyou.fm/favicon.ico',
        fallbackDomain: 'tingyou.fm',
        fallbackText: '听',
        subcatId: '27'
      },
      {
        id: 'n-11',
        title: '时光图书馆',
        url: 'https://atimebook.com/',
        icon: 'https://atimebook.com/favicon.ico',
        fallbackDomain: 'atimebook.com',
        fallbackText: '时',
        subcatId: '28'
      },
      {
        id: 'n-12',
        title: '读者阁',
        url: 'https://duzhege.cn/',
        icon: 'https://www.daott.cn/zb_users/upload/iiice_nav/202605/20260524000804_82f3652db3384f57f8091f29b3e33758.png',
        fallbackDomain: 'duzhege.cn',
        fallbackText: '读',
        subcatId: '28'
      }
    ]
  },
  {
    id: 'game',
    name: '游戏资源',
    iconName: 'Gamepad2',
    desc: '单机游戏免安装下载、经典怀旧联机与免安装网页小游戏',
    subcategories: [
      { id: '17', name: '游戏下载' },
      { id: '18', name: '在线游戏' }
    ],
    cards: [
      {
        id: 'g-1',
        title: '霓虹游戏港',
        url: 'https://www.sogay.xyz/',
        icon: 'https://www.sogay.xyz/assets/favicon.svg',
        fallbackDomain: 'www.sogay.xyz',
        fallbackText: '霓',
        subcatId: '17'
      },
      {
        id: 'g-2',
        title: '游仓酷',
        url: 'https://quwan521.com/',
        icon: 'https://quwan521.com/api/site-icon',
        fallbackDomain: 'quwan521.com',
        fallbackText: '游',
        subcatId: '17'
      },
      {
        id: 'g-3',
        title: 'GameFreer资源网',
        url: 'https://www.gamefreer.com/',
        icon: 'https://www.gamefreer.com/wp-content/uploads/2025/04/cropped-GameFreerLOGO-32x32.png',
        fallbackDomain: 'www.gamefreer.com',
        fallbackText: 'G',
        subcatId: '17'
      },
      {
        id: 'g-4',
        title: '梨子乐游戏',
        url: 'https://lzlgo.com/',
        icon: 'https://lzlgo.com/wp-content/uploads/2025/04/1.png',
        fallbackDomain: 'lzlgo.com',
        fallbackText: '梨',
        subcatId: '17'
      },
      {
        id: 'g-5',
        title: '掌游网Switch',
        url: 'https://www.switchxiazai.com/',
        icon: 'https://cdn.wwwo.work/switchxiazai/favicon.ico',
        fallbackDomain: 'www.switchxiazai.com',
        fallbackText: '掌',
        subcatId: '17'
      },
      {
        id: 'g-6',
        title: '小叽资源Steam',
        url: 'https://steamzg.com/',
        icon: 'https://steamzg.com/wp-content/uploads/2021/10/cropped-hdpeb22e763-3cf4-41cc-a506-2179d40f2330-10886022-32x32.webp',
        fallbackDomain: 'steamzg.com',
        fallbackText: '小',
        subcatId: '17'
      },
      {
        id: 'g-7',
        title: '老机库FC',
        url: 'https://laojiku.com/',
        icon: 'https://laojiku.com/wp-content/uploads/attachment/2026/20260403021400_69cf2268ec51c.png',
        fallbackDomain: 'laojiku.com',
        fallbackText: '老',
        subcatId: '17'
      },
      {
        id: 'g-8',
        title: '植物大战僵尸全集',
        url: 'https://pan.quark.cn/s/3f82680fcb81',
        icon: 'https://patchwiki.biligame.com/images/pvz/thumb/b/bf/5iacom1ncmw4or73q0mtmsoxhb7o8y7.png/120px-PvZIcon01.png',
        fallbackDomain: 'pan.quark.cn',
        fallbackText: '植',
        subcatId: '17'
      },
      {
        id: 'g-9',
        title: '红色警戒2&尤里',
        url: 'https://pan.quark.cn/s/2f1d9bd396ca',
        icon: 'https://img.meituan.net/portalweb/b6012b5af86c061d2f4c0081b6bbcb55144018.png',
        fallbackDomain: 'pan.quark.cn',
        fallbackText: '红',
        subcatId: '17'
      },
      {
        id: 'g-10',
        title: '在线小霸王红白机',
        url: 'https://www.yikm.net/',
        icon: 'https://www.daott.cn/zb_users/upload/iiice_nav/202606/20260616204812_748c2fe8bf52548c7f7bb87d4dd5376b.png',
        fallbackDomain: 'www.yikm.net',
        fallbackText: '霸',
        subcatId: '18'
      },
      {
        id: 'g-11',
        title: '在线玩红警',
        url: 'https://game.ra2web.cn/',
        icon: 'https://game.ra2web.cn/favicon.ico',
        fallbackDomain: 'game.ra2web.cn',
        fallbackText: '红',
        subcatId: '18'
      },
      {
        id: 'g-12',
        title: '在线玩CS 1.6',
        url: 'https://vpn.zongsang.com/',
        icon: 'https://www.daott.cn/zb_users/upload/iiice_nav/202605/20260525165929_6d4974df790f58296a2075233a4b5a1d.png',
        fallbackDomain: 'vpn.zongsang.com',
        fallbackText: 'CS',
        subcatId: '18'
      },
      {
        id: 'g-13',
        title: '在线三国杀',
        url: 'https://web.sanguosha.com/login/x/index',
        icon: 'https://web.sanguosha.com/img/favicon.ico',
        fallbackDomain: 'web.sanguosha.com',
        fallbackText: '杀',
        subcatId: '18'
      },
      {
        id: 'g-14',
        title: '我的世界网页版',
        url: 'https://mcjs.link/',
        icon: 'https://www.daott.cn/zb_users/upload/iiice_nav/202608/20260819101720_a150d4882e2eabc7b2af76514fb32c8d.png',
        fallbackDomain: 'mcjs.link',
        fallbackText: 'MC',
        subcatId: '18'
      },
      {
        id: 'g-15',
        title: 'Poki在线游戏',
        url: 'https://poki.com/',
        icon: 'https://a.poki-cdn.com/icons/apple-touch-icon.png',
        fallbackDomain: 'poki.com',
        fallbackText: 'P',
        subcatId: '18'
      }
    ]
  },
  {
    id: 'tool',
    name: '好用工具',
    iconName: 'Wrench',
    desc: '大模型AI助手、格式转换、抠图压缩与高效实用在线工具',
    subcategories: [
      { id: '38', name: 'AI工具' },
      { id: '39', name: '在线工具' }
    ],
    cards: [
      {
        id: 't-1',
        title: 'DeepSeek',
        url: 'https://chat.deepseek.com/',
        icon: 'https://www.deepseek.com/favicon.ico',
        fallbackDomain: 'chat.deepseek.com',
        fallbackText: 'D',
        badge: '热',
        subcatId: '38'
      },
      {
        id: 't-2',
        title: '讯飞绘文',
        url: 'https://turbodesk.xfyun.cn/',
        icon: 'https://turbodesk.xfyun.cn/favicon.ico',
        fallbackDomain: 'turbodesk.xfyun.cn',
        fallbackText: '讯',
        subcatId: '38'
      },
      {
        id: 't-3',
        title: 'AI视频创作',
        url: 'https://www.liblib.art',
        icon: 'https://www.liblib.art/favicon.ico',
        fallbackDomain: 'liblib.art',
        fallbackText: 'A',
        subcatId: '38'
      },
      {
        id: 't-4',
        title: 'AI简历生成',
        url: 'https://upcv.tech/',
        icon: 'https://upcv.tech/image/ui/light.svg',
        fallbackDomain: 'upcv.tech',
        fallbackText: '简',
        subcatId: '38'
      },
      {
        id: 't-5',
        title: 'AI编程Atoms',
        url: 'https://atoms.dev',
        icon: 'https://atoms.dev/favicon.ico',
        fallbackDomain: 'atoms.dev',
        fallbackText: '编',
        subcatId: '38'
      },
      {
        id: 't-6',
        title: 'PDF24 Tools',
        url: 'https://tools.pdf24.org/zh/',
        icon: 'https://tools.pdf24.org/static/img/p24/pdf24_16.png',
        fallbackDomain: 'tools.pdf24.org',
        fallbackText: 'P',
        subcatId: '39'
      },
      {
        id: 't-7',
        title: '文叔叔-传文件',
        url: 'https://www.wenshushu.cn/',
        icon: 'https://www.wenshushu.cn/favicon.ico',
        fallbackDomain: 'www.wenshushu.cn',
        fallbackText: '文',
        subcatId: '39'
      },
      {
        id: 't-8',
        title: '局域网传文件LocalSend',
        url: 'https://localsend.org/#/',
        icon: 'https://p0.meituan.net/csc/8f3069710675d6ee3497c0bd233a755c4265.png',
        fallbackDomain: 'localsend.org',
        fallbackText: '局',
        subcatId: '39'
      },
      {
        id: 't-9',
        title: '在线PS',
        url: 'https://zaixianps.net/',
        icon: 'https://zaixianps.net/images/favicon.png',
        fallbackDomain: 'zaixianps.net',
        fallbackText: 'PS',
        subcatId: '39'
      },
      {
        id: 't-10',
        title: '在线一键抠图',
        url: 'https://www.remove.bg/zh',
        icon: 'https://www.remove.bg/favicon.ico',
        fallbackDomain: 'www.remove.bg',
        fallbackText: '抠',
        subcatId: '39'
      },
      {
        id: 't-11',
        title: '免费商用字体',
        url: 'https://www.maoken.com/',
        icon: 'https://www.maoken.com/favicon.ico',
        fallbackDomain: 'www.maoken.com',
        fallbackText: '字',
        subcatId: '39'
      },
      {
        id: 't-12',
        title: '草料二维码',
        url: 'https://cli.im/',
        icon: 'https://static.clewm.net/static/images/favicon.ico',
        fallbackDomain: 'cli.im',
        fallbackText: '草',
        subcatId: '39'
      },
      {
        id: 't-13',
        title: '帮小忙(腾讯)',
        url: 'https://tool.browser.qq.com/',
        icon: 'https://tool.browser.qq.com/favicon.ico',
        fallbackDomain: 'tool.browser.qq.com',
        fallbackText: '帮',
        subcatId: '39'
      },
      {
        id: 't-14',
        title: '临时邮箱',
        url: 'https://www.linshi-email.com/',
        icon: 'https://static.linshi-email.com/favicon.ico',
        fallbackDomain: 'www.linshi-email.com',
        fallbackText: '临',
        subcatId: '39'
      },
      {
        id: 't-15',
        title: '全球物流查询',
        url: 'https://www.17track.net/zh-cn',
        icon: 'https://res.17track.net/global-v2/imgs/oauth_image/apple_touch_60x60.png',
        fallbackDomain: 'www.17track.net',
        fallbackText: '查',
        subcatId: '39'
      }
    ]
  },
  {
    id: 'setup',
    name: '装机必备',
    iconName: 'Laptop',
    desc: '电脑装机常用、硬件检测跑分、常用办公与系统优化工具',
    subcategories: [
      { id: '14', name: '装机工具' },
      { id: '13', name: '常用软件' }
    ],
    cards: [
      {
        id: 'st-1',
        title: '微PE工具箱',
        url: 'https://www.wepe.com.cn/download.html',
        icon: 'https://www.wepe.com.cn/favicon.ico',
        fallbackDomain: 'wepe.com.cn',
        fallbackText: '微',
        badge: '推',
        subcatId: '14'
      },
      {
        id: 'st-2',
        title: '图吧工具箱',
        url: 'http://www.tbtool.cn/',
        icon: 'https://img.meituan.net/portalweb/a57f03b7f9ca5218a0585bef3bc66f5a426.png',
        fallbackDomain: 'www.tbtool.cn',
        fallbackText: '图',
        subcatId: '14'
      },
      {
        id: 'st-3',
        title: '硬盘分区助手',
        url: 'https://www.disktool.cn/download.html',
        icon: 'https://www.disktool.cn/favicon.ico',
        fallbackDomain: 'www.disktool.cn',
        fallbackText: '硬',
        subcatId: '14'
      },
      {
        id: 'st-4',
        title: 'HelloWindows',
        url: 'https://hellowindows.cn/',
        icon: 'https://img.meituan.net/csc/3f378fda8ebf8d02f1407a5c4e237f876243.png',
        fallbackDomain: 'hellowindows.cn',
        fallbackText: 'H',
        subcatId: '14'
      },
      {
        id: 'st-5',
        title: 'USB启动盘Rufus',
        url: 'http://rufus.ie/zh/',
        icon: 'https://p0.meituan.net/csc/6e73bb3f89c6eb9494de5585ca45867f5342.png',
        fallbackDomain: 'rufus.ie',
        fallbackText: 'U',
        subcatId: '14'
      },
      {
        id: 'st-6',
        title: 'CPU/显卡天梯榜',
        url: 'https://gpu.exprank.com/',
        icon: 'https://www.exprank.com/favicon.ico',
        fallbackDomain: 'gpu.exprank.com',
        fallbackText: '显',
        subcatId: '14'
      },
      {
        id: 'st-7',
        title: '显示器刷新率测试',
        url: 'https://testufo.com/',
        icon: 'https://testufo.com/favicon.ico',
        fallbackDomain: 'testufo.com',
        fallbackText: '帧',
        subcatId: '14'
      },
      {
        id: 'st-8',
        title: '在线键盘测试',
        url: 'https://www.zfrontier.com/lab/keyboardTester',
        icon: 'https://www.zfrontier.com/apple-touch-icon.png',
        fallbackDomain: 'zfrontier.com',
        fallbackText: '键',
        subcatId: '14'
      },
      {
        id: 'st-9',
        title: '微信电脑版',
        url: 'https://pc.weixin.qq.com/',
        icon: 'https://res.wx.qq.com/a/wx_fed/assets/res/NTI4MWU5.ico',
        fallbackDomain: 'weixin.qq.com',
        fallbackText: '微',
        subcatId: '13'
      },
      {
        id: 'st-10',
        title: 'QQ官方版',
        url: 'https://im.qq.com/pcqq',
        icon: 'https://qzonestyle.gtimg.cn/qzone/qzact/act/external/tiqq/logo.png',
        fallbackDomain: 'qq.com',
        fallbackText: 'Q',
        subcatId: '13'
      },
      {
        id: 'st-11',
        title: '火绒安全',
        url: 'https://www.huorong.cn/',
        icon: 'https://www.huorong.cn/favicon.ico',
        fallbackDomain: 'huorong.cn',
        fallbackText: '火',
        subcatId: '13'
      },
      {
        id: 'st-12',
        title: 'Everything搜索',
        url: 'https://www.voidtools.com/zh-cn/',
        icon: 'https://www.voidtools.com/favicon.ico',
        fallbackDomain: 'voidtools.com',
        fallbackText: 'E',
        subcatId: '13'
      },
      {
        id: 'st-13',
        title: '7-Zip解压',
        url: 'https://www.7-zip.org/',
        icon: 'https://pc3.gtimg.com/softmgr/logo/48/2685_48_1456478802.png',
        fallbackDomain: '7-zip.org',
        fallbackText: '7',
        subcatId: '13'
      },
      {
        id: 'st-14',
        title: 'PotPlayer播放器',
        url: 'https://potplayer.daum.net',
        icon: 'https://img.meituan.net/portalweb/907fae14af1b9da9604fe6e401951493650.png',
        fallbackDomain: 'potplayer.daum.net',
        fallbackText: 'P',
        subcatId: '13'
      },
      {
        id: 'st-15',
        title: 'Steam游戏平台',
        url: 'https://store.steampowered.com/about/',
        icon: 'https://store.steamchina.com/favicon.ico',
        fallbackDomain: 'store.steampowered.com',
        fallbackText: 'S',
        subcatId: '13'
      },
      {
        id: 'st-16',
        title: '谷歌Chrome',
        url: 'https://www.google.cn/intl/zh-CN/chrome/',
        icon: 'https://pc3.gtimg.com/softmgr/logo/48/2661_48_1450768944.png',
        fallbackDomain: 'google.cn',
        fallbackText: '谷',
        subcatId: '13'
      }
    ]
  },
  {
    id: 'explore',
    name: '探索世界',
    iconName: 'Compass',
    desc: '优质独立导航、脑洞趣站、极客开发与摸鱼神器',
    subcategories: [
      { id: '34', name: '实用导航' },
      { id: '35', name: '趣站' },
      { id: '15', name: '开发' }
    ],
    cards: [
      {
        id: 'e-1',
        title: '观影导航',
        url: 'https://www.qhdh.top/',
        icon: 'https://www.qhdh.top/wp-content/uploads/2026/07/www.qhdh_.png',
        fallbackDomain: 'qhdh.top',
        fallbackText: '观',
        subcatId: '34'
      },
      {
        id: 'e-2',
        title: '摸鱼导航',
        url: 'https://www.moyudh.com/',
        icon: 'https://www.moyudh.com/zb_users/theme/cat_dh/static/favicon.ico',
        fallbackDomain: 'moyudh.com',
        fallbackText: '摸',
        subcatId: '34'
      },
      {
        id: 'e-3',
        title: '聚资源导航',
        url: 'https://juzyw.com/',
        icon: 'https://juzyw.com/wp-content/uploads/2024/06/ju.png',
        fallbackDomain: 'juzyw.com',
        fallbackText: '聚',
        subcatId: '34'
      },
      {
        id: 'e-4',
        title: '信任的进化',
        url: 'https://dccxi.com/',
        icon: 'https://dccxi.com/apple-touch-icon.png',
        fallbackDomain: 'dccxi.com',
        fallbackText: '信',
        subcatId: '35'
      },
      {
        id: 'e-5',
        title: '全景故宫',
        url: 'https://pano.dpm.org.cn/#/',
        icon: 'https://pano.dpm.org.cn/./resource/favicon.ico',
        fallbackDomain: 'pano.dpm.org.cn',
        fallbackText: '宫',
        subcatId: '35'
      },
      {
        id: 'e-6',
        title: '在线放烟花',
        url: 'http://fangyanhua.top/',
        icon: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/329180/firework-burst-icon-v2.png',
        fallbackDomain: 'fangyanhua.top',
        fallbackText: '烟',
        subcatId: '35'
      },
      {
        id: 'e-7',
        title: '指尖陀螺',
        url: 'https://ffffidget.com/',
        icon: 'https://ffffidget.com/favicon.ico',
        fallbackDomain: 'ffffidget.com',
        fallbackText: '陀',
        subcatId: '35'
      },
      {
        id: 'e-8',
        title: '捏泡泡',
        url: 'https://bubblespop.netlify.app/',
        icon: 'https://bubblespop.netlify.app/bubblespop/fav/favicon-16x16.png',
        fallbackDomain: 'bubblespop.netlify.app',
        fallbackText: '泡',
        subcatId: '35'
      },
      {
        id: 'e-9',
        title: '天空有多高',
        url: 'https://www.secaibi.com/howbigisspace/',
        icon: 'https://www.secaibi.com/favicon.ico',
        fallbackDomain: 'secaibi.com',
        fallbackText: '天',
        subcatId: '35'
      },
      {
        id: 'e-10',
        title: 'Trae 代码助手',
        url: 'https://www.trae.cn',
        icon: 'https://lf-cdn.trae.com.cn/obj/trae-com-cn/trae_website_prod_cn/favicon.png',
        fallbackDomain: 'trae.cn',
        fallbackText: 'T',
        subcatId: '15'
      },
      {
        id: 'e-11',
        title: 'VsCode',
        url: 'https://code.visualstudio.com/',
        icon: 'https://img.meituan.net/csc/fe44a75d62aebb49ed05b8dc859eb3cf13468.png',
        fallbackDomain: 'visualstudio.com',
        fallbackText: 'V',
        subcatId: '15'
      },
      {
        id: 'e-12',
        title: 'Gitee 码云',
        url: 'https://gitee.com/',
        icon: 'https://gitee.com/favicon.ico',
        fallbackDomain: 'gitee.com',
        fallbackText: 'G',
        subcatId: '15'
      },
      {
        id: 'e-13',
        title: 'Apifox 接口调试',
        url: 'https://apifox.com/',
        icon: 'https://cdn.apifox.cn/logo/apifox-logo-256.png',
        fallbackDomain: 'apifox.com',
        fallbackText: 'A',
        subcatId: '15'
      },
      {
        id: 'e-14',
        title: '多地Ping测试',
        url: 'https://kzisp.com/',
        icon: 'https://www.daott.cn/zb_users/upload/iiice_nav/202604/20260419232449_7b12f89fa6555d9abc84e55918848887.png',
        fallbackDomain: 'kzisp.com',
        fallbackText: 'P',
        subcatId: '15'
      }
    ]
  }
];

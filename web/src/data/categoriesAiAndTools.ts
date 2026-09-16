import { Category } from '../types';

export const CATEGORIES_AI_AND_TOOLS: Category[] = [
  {
    id: 'ai-hub',
    name: '常用AI与大模型',
    iconName: 'Sparkles',
    desc: 'ChatGPT、即梦AI、通义万相、豆包、千问、前沿大模型与爆款拆解神器',
    subcategories: [
      { id: 'ai-common', name: '常用AI工具' },
      { id: 'ai-video-img', name: 'AI绘画与视频' },
      { id: 'ai-product', name: '爆款拆解与电商' },
      { id: 'ai-pay', name: 'AI充值平台' }
    ],
    cards: [
      {
        id: 'ai-1',
        title: '即梦AI',
        url: 'https://jimeng.jianying.com/',
        icon: 'https://www.google.com/s2/favicons?domain=jimeng.jianying.com&sz=64',
        fallbackDomain: 'jimeng.jianying.com',
        fallbackText: '即',
        badge: '国内顶尖',
        desc: '字节跳动旗下顶尖AI创作平台，支持AI生图、视频生成、分镜故事与模型微调',
        subcatId: 'ai-common'
      },
      {
        id: 'ai-2',
        title: '通义万相',
        url: 'https://tongyi.aliyun.com/wan/generate',
        icon: 'https://www.google.com/s2/favicons?domain=tongyi.aliyun.com&sz=64',
        fallbackDomain: 'tongyi.aliyun.com',
        fallbackText: '通',
        badge: '阿里大模型',
        desc: '阿里云旗下AI艺术大模型，文生图、涂鸦作画与风格重绘',
        subcatId: 'ai-common'
      },
      {
        id: 'ai-3',
        title: 'chatgpt',
        url: 'https://chatgpt.com/',
        icon: 'https://www.google.com/s2/favicons?domain=chatgpt.com&sz=64',
        fallbackDomain: 'chatgpt.com',
        fallbackText: 'C',
        badge: 'OpenAI',
        desc: 'OpenAI 官方 ChatGPT，全球领先的多模态大模型AI对话助手',
        subcatId: 'ai-common'
      },
      {
        id: 'ai-4',
        title: '千问-阿里 AI 助手',
        url: 'https://www.qianwen.com/',
        icon: 'https://www.google.com/s2/favicons?domain=qianwen.com&sz=64',
        fallbackDomain: 'qianwen.com',
        fallbackText: '千',
        badge: '阿里千问',
        desc: '通义千问官方智能助手，具备强大的语言理解、代码编写与超长文档阅读',
        subcatId: 'ai-common'
      },
      {
        id: 'ai-5',
        title: '豆包',
        url: 'https://www.doubao.com/',
        icon: 'https://www.google.com/s2/favicons?domain=doubao.com&sz=64',
        fallbackDomain: 'doubao.com',
        fallbackText: '豆',
        badge: '字节跳动',
        desc: '字节跳动旗下超人气AI智能对话助手，文案写作与多功能互动',
        subcatId: 'ai-common'
      },
      {
        id: 'ai-6',
        title: 'Dola',
        url: 'https://www.dola.com/chat/',
        icon: 'https://www.google.com/s2/favicons?domain=dola.com&sz=64',
        fallbackDomain: 'dola.com',
        fallbackText: 'D',
        badge: '豆包海外版',
        desc: '豆包国际版，支持多语言、多时区日程与任务安排助手',
        subcatId: 'ai-common'
      },
      {
        id: 'ai-7',
        title: 'Duck.ai',
        url: 'https://duck.ai/',
        icon: 'https://www.google.com/s2/favicons?domain=duck.ai&sz=64',
        fallbackDomain: 'duck.ai',
        fallbackText: 'D',
        badge: '无限生图',
        desc: '无限生图 Image 2 探索平台与多模态AI体验区',
        subcatId: 'ai-common'
      },
      {
        id: 'ai-8',
        title: '库库AI',
        url: 'https://kuku.baidu.com/',
        icon: 'https://www.google.com/s2/favicons?domain=kuku.baidu.com&sz=64',
        fallbackDomain: 'kuku.baidu.com',
        fallbackText: '库',
        badge: '百度出品',
        desc: '百度旗下新一代AI多模态创作与智能图文生成平台',
        subcatId: 'ai-common'
      },
      {
        id: 'ai-9',
        title: '可灵',
        url: 'https://klingai.com/app',
        icon: 'https://www.google.com/s2/favicons?domain=klingai.com&sz=64',
        fallbackDomain: 'klingai.com',
        fallbackText: '可',
        badge: '视频大模型',
        desc: '快手自研顶尖AI视频大模型，支持大幅度物理运动与生动角色生成',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-10',
        title: '海艺',
        url: 'https://www.seaart.ai/zhCN',
        icon: 'https://www.google.com/s2/favicons?domain=seaart.ai&sz=64',
        fallbackDomain: 'seaart.ai',
        fallbackText: '海',
        badge: '全貌升级',
        desc: '全貌升级！丰富模型库的二次元与写实AI绘画工具，支持工作流微调',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-11',
        title: 'ComfyUI',
        url: 'https://cloud.comfy.org/cloud/login',
        icon: 'https://www.google.com/s2/favicons?domain=cloud.comfy.org&sz=64',
        fallbackDomain: 'cloud.comfy.org',
        fallbackText: 'C',
        badge: '云端Comfy',
        desc: '官方在线ComfyUI云端运行环境，免装本地驱动与显卡配置直接在线生图',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-12',
        title: 'Veo3',
        url: 'https://labs.google/',
        icon: 'https://www.google.com/s2/favicons?domain=labs.google&sz=64',
        fallbackDomain: 'labs.google',
        fallbackText: 'V',
        badge: 'Google',
        desc: 'Google Labs 旗舰生成式AI视频模型实验室官方体验区',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-13',
        title: 'ideogram',
        url: 'https://ideogram.ai/t/explore',
        icon: 'https://www.google.com/s2/favicons?domain=ideogram.ai&sz=64',
        fallbackDomain: 'ideogram.ai',
        fallbackText: 'i',
        badge: '文字排版',
        desc: '顶尖海报图像生成与文字排版大模型，排版精准艺术感强',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-14',
        title: 'Arena AI',
        url: 'https://arena.ai/',
        icon: 'https://www.google.com/s2/favicons?domain=arena.ai&sz=64',
        fallbackDomain: 'arena.ai',
        fallbackText: 'A',
        badge: '模型对决',
        desc: '全球知名的生图工具与大模型盲测排位赛擂台',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-15',
        title: 'LartAICineStudio',
        url: 'https://ce.lartai.com/',
        icon: 'https://www.google.com/s2/favicons?domain=ce.lartai.com&sz=64',
        fallbackDomain: 'ce.lartai.com',
        fallbackText: 'L',
        badge: '电影级',
        desc: '专业影视工作流，工业级 AI 影视镜头与灯光视觉创作中心',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-16',
        title: 'Higgsfield',
        url: 'https://higgsfield.ai/',
        icon: 'https://www.google.com/s2/favicons?domain=higgsfield.ai&sz=64',
        fallbackDomain: 'higgsfield.ai',
        fallbackText: 'H',
        badge: '动态人物',
        desc: '专注于电影级动态人物动作与表情控制的AI视频生成器',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-17',
        title: 'leonardo',
        url: 'https://app.leonardo.ai/',
        icon: 'https://www.google.com/s2/favicons?domain=app.leonardo.ai&sz=64',
        fallbackDomain: 'app.leonardo.ai',
        fallbackText: 'L',
        badge: 'CG游戏级',
        desc: '工业级高画质AI图像生成与游戏美术资产创作工具，支持实时Canvas',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-18',
        title: 'MindVideo AI',
        url: 'https://www.mindvideo.ai/',
        icon: 'https://www.google.com/s2/favicons?domain=mindvideo.ai&sz=64',
        fallbackDomain: 'mindvideo.ai',
        fallbackText: 'M',
        badge: '运镜视频',
        desc: '智能文本生成高清生动视频，电影级光影与镜头运镜变换',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-19',
        title: 'AI绘画',
        url: 'https://mj.bandeyu.com/',
        icon: 'https://www.google.com/s2/favicons?domain=mj.bandeyu.com&sz=64',
        fallbackDomain: 'mj.bandeyu.com',
        fallbackText: '画',
        badge: '国内免翻',
        desc: 'Midjourney 国内镜像直连站，免翻墙一键体验最新V6作图',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-20',
        title: 'magnific',
        url: 'https://www.magnific.com/app',
        icon: 'https://www.google.com/s2/favicons?domain=magnific.com&sz=64',
        fallbackDomain: 'magnific.com',
        fallbackText: 'm',
        badge: '超分神器',
        desc: '最强AI高画质无损超分辨率放大与细节增强修复神器套件',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-21',
        title: '堆友',
        url: 'https://d.design/',
        icon: 'https://www.google.com/s2/favicons?domain=d.design&sz=64',
        fallbackDomain: 'd.design',
        fallbackText: '堆',
        badge: '阿里3D',
        desc: '阿里旗下多风格3D设计、AI绘画与高质量素材创意社区',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-22',
        title: 'Happy Horse',
        url: 'https://happy-horse.art/auth/signin',
        icon: 'https://www.google.com/s2/favicons?domain=happy-horse.art&sz=64',
        fallbackDomain: 'happy-horse.art',
        fallbackText: 'H',
        badge: '美学探索',
        desc: '新一代创意AI图像生成与视觉美学探索工作台',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-23',
        title: 'Labnana',
        url: 'https://labnana.com/zh',
        icon: 'https://www.google.com/s2/favicons?domain=labnana.com&sz=64',
        fallbackDomain: 'labnana.com',
        fallbackText: 'L',
        badge: '灵感中心',
        desc: '前沿AIGC视觉灵感中心，AI创意构图与提示词灵感实验室',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-24',
        title: 'evolink',
        url: 'https://evolink.ai/zh/gpt-image-2',
        icon: 'https://www.google.com/s2/favicons?domain=evolink.ai&sz=64',
        fallbackDomain: 'evolink.ai',
        fallbackText: 'e',
        badge: '生图接入',
        desc: '前沿AI生图与GPT-Image-2接入平台，高品质视觉创作工具',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-25',
        title: 'fal',
        url: 'https://fal.ai/sandbox?op=video.text_to_video&models=',
        icon: 'https://www.google.com/s2/favicons?domain=fal.ai&sz=64',
        fallbackDomain: 'fal.ai',
        fallbackText: 'f',
        badge: '极速沙盒',
        desc: '超低延迟文生视频与多模态AI沙盒环境，开发者极速运行首选',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-26',
        title: 'OiiOii',
        url: 'https://www.oiioii.ai/home',
        icon: 'https://www.google.com/s2/favicons?domain=oiioii.ai&sz=64',
        fallbackDomain: 'oiioii.ai',
        fallbackText: 'O',
        badge: 'AI短剧',
        desc: '新一代AI短剧创作与自动化视觉生成平台，零门槛制作故事大片',
        subcatId: 'ai-video-img'
      },
      {
        id: 'ai-27',
        title: 'MantleGo',
        url: 'https://www.mantlegoai.com/Home',
        icon: 'https://www.google.com/s2/favicons?domain=mantlegoai.com&sz=64',
        fallbackDomain: 'mantlegoai.com',
        fallbackText: 'M',
        badge: '爆款拆解',
        desc: '短视频爆款拆解神器，智能文案分析、吸睛点提炼与同款重构',
        subcatId: 'ai-product'
      },
      {
        id: 'ai-28',
        title: 'CreatOK爆款猎人',
        url: 'https://www.creatok.ai/app/dashboard',
        icon: 'https://www.google.com/s2/favicons?domain=creatok.ai&sz=64',
        fallbackDomain: 'creatok.ai',
        fallbackText: 'C',
        badge: '爆款猎人',
        desc: '短视频广告与跨境电商爆款素材生成引擎，提升点击与转化率',
        subcatId: 'ai-product'
      },
      {
        id: 'ai-29',
        title: '妙构',
        url: 'https://www.miaogou.tech/zh',
        icon: 'https://www.google.com/s2/favicons?domain=miaogou.tech&sz=64',
        fallbackDomain: 'miaogou.tech',
        fallbackText: '妙',
        badge: '爆款拆解',
        desc: '多维度拆解行业爆款短视频，镜头画面与脚本结构深度分析',
        subcatId: 'ai-product'
      },
      {
        id: 'ai-30',
        title: 'Skild Art',
        url: 'https://www.skildart.cn/',
        icon: 'https://www.google.com/s2/favicons?domain=skildart.cn&sz=64',
        fallbackDomain: 'skildart.cn',
        fallbackText: 'S',
        badge: '电商专用',
        desc: '专为电商而生，AI商品图模特试衣、智能换背景与场景合成',
        subcatId: 'ai-product'
      },
      {
        id: 'ai-31',
        title: 'FlowPix',
        url: 'https://www.flowpix.club/',
        icon: 'https://www.google.com/s2/favicons?domain=flowpix.club&sz=64',
        fallbackDomain: 'flowpix.club',
        fallbackText: 'F',
        badge: '图片微动',
        desc: '刺猬猩球，静态图片流光微动、3D视差粒子与魔法动画特效',
        subcatId: 'ai-product'
      },
      {
        id: 'ai-32',
        title: 'Yapper',
        url: 'https://yapper.so/dashboard',
        icon: 'https://www.google.com/s2/favicons?domain=yapper.so&sz=64',
        fallbackDomain: 'yapper.so',
        fallbackText: 'Y',
        badge: '社交运营',
        desc: '智能社交媒体内容生成与推文运营辅助控制面板',
        subcatId: 'ai-product'
      },
      {
        id: 'ai-33',
        title: 'linkfox',
        url: 'https://www.linkfox.com/',
        icon: 'https://www.google.com/s2/favicons?domain=linkfox.com&sz=64',
        fallbackDomain: 'linkfox.com',
        fallbackText: 'L',
        badge: '跨境选品',
        desc: '跨境电商与外贸卖家专属AI大数据选品、词库与翻译助手',
        subcatId: 'ai-product'
      },
      {
        id: 'ai-34',
        title: '小云雀',
        url: 'https://xyq.jianying.com/',
        icon: 'https://www.google.com/s2/favicons?domain=xyq.jianying.com&sz=64',
        fallbackDomain: 'xyq.jianying.com',
        fallbackText: '雀',
        badge: '剪映官方',
        desc: '剪映官方AI创意平台，短视频文案配音与画面生成利器',
        subcatId: 'ai-product'
      },
      {
        id: 'ai-35',
        title: '图片工具',
        url: 'https://magiceraser.org/',
        icon: 'https://www.google.com/s2/favicons?domain=magiceraser.org&sz=64',
        fallbackDomain: 'magiceraser.org',
        fallbackText: '图',
        badge: '去杂物',
        desc: '移除背景/人物杂物/老照片高清修复，在线全自动免扣图 (Magic Eraser)',
        subcatId: 'ai-product'
      },
      {
        id: 'ai-36',
        title: 'AI追光',
        url: 'https://aizhuiguang.tech/',
        icon: 'https://www.google.com/s2/favicons?domain=aizhuiguang.tech&sz=64',
        fallbackDomain: 'aizhuiguang.tech',
        fallbackText: '追',
        badge: '工作台',
        desc: '新一代AIGC创作者工作台，全方位激发视频与图文灵感',
        subcatId: 'ai-product'
      },
      {
        id: 'ai-37',
        title: '灵猫去水印',
        url: 'https://clearcat.lingxiangtools.top/',
        icon: 'https://www.google.com/s2/favicons?domain=clearcat.lingxiangtools.top&sz=64',
        fallbackDomain: 'clearcat.lingxiangtools.top',
        fallbackText: '猫',
        badge: '去水印',
        desc: '短视频解析与智能无痕去水印工具，一键提取高清无水印视频',
        subcatId: 'ai-product'
      },
      {
        id: 'ai-38',
        title: '123apps',
        url: 'https://123apps.com/cn/',
        icon: 'https://www.google.com/s2/favicons?domain=123apps.com&sz=64',
        fallbackDomain: '123apps.com',
        fallbackText: '1',
        badge: '综合转换',
        desc: '全能在线工具箱，支持视频剪辑、音频处理、PDF编辑与格式转换',
        subcatId: 'ai-product'
      },
      {
        id: 'ai-39',
        title: 'DiffMind',
        url: 'https://app.diffmind.ai/zh',
        icon: 'https://www.google.com/s2/favicons?domain=app.diffmind.ai&sz=64',
        fallbackDomain: 'app.diffmind.ai',
        fallbackText: 'D',
        badge: '横向对比',
        desc: '多AI对比工作台，多模型同时运行、画质与文本响应横向评测',
        subcatId: 'ai-product'
      },
      {
        id: 'ai-40',
        title: 'ChatGPT Plus',
        url: 'https://bewild.ai/subscribe',
        icon: 'https://www.google.com/s2/favicons?domain=bewild.ai&sz=64',
        fallbackDomain: 'bewild.ai',
        fallbackText: '充',
        badge: '充值平台',
        desc: 'ChatGPT Plus 官方代充/海外虚拟卡与极速充值订阅平台',
        subcatId: 'ai-pay'
      }
    ]
  },
  {
    id: 'ai-canvas',
    name: '无限画布与创作',
    iconName: 'Palette',
    desc: '京东云灵境、万镜一刻、RunningHub、LibTV等新一代AIGC无限画布与生成平台',
    subcategories: [
      { id: 'canvas-main', name: '无限画布类' },
      { id: 'canvas-music', name: 'AI音乐创作' }
    ],
    cards: [
      {
        id: 'cv-1',
        title: '京东云灵境',
        url: 'https://lingjing.jdcloud.com/',
        icon: 'https://www.google.com/s2/favicons?domain=lingjing.jdcloud.com&sz=64',
        fallbackDomain: 'lingjing.jdcloud.com',
        fallbackText: '京',
        badge: '京东云',
        desc: '京东云旗下AI生图生视频创作平台，多模态画布与智能商用设计',
        subcatId: 'canvas-main'
      },
      {
        id: 'cv-2',
        title: '万镜一刻',
        url: 'https://www.yikeai.com/#/home',
        icon: 'https://www.google.com/s2/favicons?domain=yikeai.com&sz=64',
        fallbackDomain: 'yikeai.com',
        fallbackText: '镜',
        badge: '无限画布',
        desc: '智能无限画布创作空间，生图、生视频与视觉节点漫游',
        subcatId: 'canvas-main'
      },
      {
        id: 'cv-3',
        title: '新片场',
        url: 'https://aigc.xinpianchang.com/',
        icon: 'https://www.google.com/s2/favicons?domain=aigc.xinpianchang.com&sz=64',
        fallbackDomain: 'aigc.xinpianchang.com',
        fallbackText: '新',
        badge: '新片场',
        desc: 'AIGC视频创作与无限画布灵感平台，赋能影视专业创作者',
        subcatId: 'canvas-main'
      },
      {
        id: 'cv-4',
        title: 'flova.tv',
        url: 'https://flova.tv/zh-CN',
        icon: 'https://www.google.com/s2/favicons?domain=flova.tv&sz=64',
        fallbackDomain: 'flova.tv',
        fallbackText: 'f',
        badge: '分镜画布',
        desc: 'AI驱动的影视级创意分镜与无限画布创作系统',
        subcatId: 'canvas-main'
      },
      {
        id: 'cv-5',
        title: 'LibTV',
        url: 'https://www.liblib.tv/',
        icon: 'https://www.google.com/s2/favicons?domain=liblib.tv&sz=64',
        fallbackDomain: 'liblib.tv',
        fallbackText: 'L',
        badge: '专业视频',
        desc: '专业视频创作工具与无限画布节点流，释放无限创意思维',
        subcatId: 'canvas-main'
      },
      {
        id: 'cv-6',
        title: 'AI应用聚合平台',
        url: 'https://ccai.quantv.com/dashboard',
        icon: 'https://www.google.com/s2/favicons?domain=ccai.quantv.com&sz=64',
        fallbackDomain: 'ccai.quantv.com',
        fallbackText: '聚',
        badge: '聚合画布',
        desc: '全功能AI多模态应用仪表盘，聚合各类画布工具与创作模型',
        subcatId: 'canvas-main'
      },
      {
        id: 'cv-7',
        title: 'RunningHub',
        url: 'https://www.runninghub.cn/#/home',
        icon: 'https://www.google.com/s2/favicons?domain=runninghub.cn&sz=64',
        fallbackDomain: 'runninghub.cn',
        fallbackText: 'R',
        badge: '节点画布',
        desc: '云端高算力 ComfyUI 工作流画布节点平台，海量社区节点一键运行',
        subcatId: 'canvas-main'
      },
      {
        id: 'cv-8',
        title: 'Seko',
        url: 'https://seko.sensetime.com//',
        icon: 'https://www.google.com/s2/favicons?domain=seko.sensetime.com&sz=64',
        fallbackDomain: 'seko.sensetime.com',
        fallbackText: 'S',
        badge: '商汤出品',
        desc: '商汤科技自研新一代生成式AI视觉创意与智能画布工作台',
        subcatId: 'canvas-main'
      },
      {
        id: 'cv-9',
        title: '小影马',
        url: 'https://yingma.tv/',
        icon: 'https://www.google.com/s2/favicons?domain=yingma.tv&sz=64',
        fallbackDomain: 'yingma.tv',
        fallbackText: '马',
        badge: '视频画布',
        desc: '智能分镜与视频画布工具，短视频剧情分镜自动化生成',
        subcatId: 'canvas-main'
      },
      {
        id: 'cv-10',
        title: 'AI 音樂影片生成器',
        url: 'https://app.edimakor.ai/tw/studio/ai-music-video-generator?from=tab',
        icon: 'https://www.google.com/s2/favicons?domain=app.edimakor.ai&sz=64',
        fallbackDomain: 'app.edimakor.ai',
        fallbackText: '乐',
        badge: '音乐MV',
        desc: '一键将音频转为酷炫音乐MV视频，节奏匹配、歌词同步与动态视觉',
        subcatId: 'canvas-music'
      }
    ]
  },
  {
    id: 'ai-prompt-skill',
    name: 'Prompt与Skill社区',
    iconName: 'Terminal',
    desc: 'Seedance 2.5、GPT Image 2海量提示词库、CocoLoop与前沿智能体技能',
    subcategories: [
      { id: 'prompt-sub', name: 'Prompt提示词' },
      { id: 'skill-sub', name: 'SKill技能中心' }
    ],
    cards: [
      {
        id: 'pr-1',
        title: 'Seedance 2.5 Prompt',
        url: 'https://evolink.ai/zh/seedance-2-5-prompts',
        icon: 'https://www.google.com/s2/favicons?domain=evolink.ai&sz=64',
        fallbackDomain: 'evolink.ai',
        fallbackText: 'S',
        badge: '海量词库',
        desc: '海量提示词库，覆盖人物、场景、镜头语言与高端摄影风格咒语',
        subcatId: 'prompt-sub'
      },
      {
        id: 'pr-2',
        title: 'AIART.PICS',
        url: 'https://aiart.pics/',
        icon: 'https://www.google.com/s2/favicons?domain=aiart.pics&sz=64',
        fallbackDomain: 'aiart.pics',
        fallbackText: 'A',
        badge: '提示词社区',
        desc: '全球高质量AI艺术提示词社区与视觉参考画廊',
        subcatId: 'prompt-sub'
      },
      {
        id: 'pr-3',
        title: 'AI Prompt Library',
        url: 'https://promptsref.com/',
        icon: 'https://www.google.com/s2/favicons?domain=promptsref.com&sz=64',
        fallbackDomain: 'promptsref.com',
        fallbackText: 'P',
        badge: '词典库',
        desc: '全网精选AI提示词参考图书馆，支持按风格与模型快速筛选',
        subcatId: 'prompt-sub'
      },
      {
        id: 'pr-4',
        title: 'GPT Image 2提示词',
        url: 'https://opennana.com/awesome-prompt-gallery?media_type=image',
        icon: 'https://www.google.com/s2/favicons?domain=opennana.com&sz=64',
        fallbackDomain: 'opennana.com',
        fallbackText: 'G',
        badge: '画廊画卷',
        desc: '提示词社区精选画廊，高审美提示词与高清大图参数一键复制',
        subcatId: 'prompt-sub'
      },
      {
        id: 'pr-5',
        title: 'youmind',
        url: 'https://youmind.com/zh-CN/gpt-image-2-prompts',
        icon: 'https://www.google.com/s2/favicons?domain=youmind.com&sz=64',
        fallbackDomain: 'youmind.com',
        fallbackText: 'y',
        badge: '咒语宝库',
        desc: '精选 GPT-Image-2 提示词社区，创意灵感与多语言咒语库',
        subcatId: 'prompt-sub'
      },
      {
        id: 'pr-6',
        title: 'AI工具',
        url: 'https://familypro.io/en/gpt-image-2',
        icon: 'https://www.google.com/s2/favicons?domain=familypro.io&sz=64',
        fallbackDomain: 'familypro.io',
        fallbackText: '工',
        badge: '提示词',
        desc: 'GPT Image 2 提示词生成与图像视觉提示词工程工具箱',
        subcatId: 'prompt-sub'
      },
      {
        id: 'pr-7',
        title: 'Vibe Shot Club',
        url: 'https://vibeshot.club/gallery',
        icon: 'https://www.google.com/s2/favicons?domain=vibeshot.club&sz=64',
        fallbackDomain: 'vibeshot.club',
        fallbackText: 'V',
        badge: '质感画廊',
        desc: '电影质感摄影与AI潮流视觉提示词画廊俱乐部',
        subcatId: 'prompt-sub'
      },
      {
        id: 'pr-8',
        title: 'promptmart',
        url: 'https://www.promptmart.cn/',
        icon: 'https://www.google.com/s2/favicons?domain=promptmart.cn&sz=64',
        fallbackDomain: 'promptmart.cn',
        fallbackText: '市',
        badge: '提示词库',
        desc: '国内精品提示词市场与创意提示词库，提升生图效果与效率',
        subcatId: 'prompt-sub'
      },
      {
        id: 'sk-1',
        title: 'CocoLoop AI社区',
        url: 'https://www.cocoloop.cn/',
        icon: 'https://www.google.com/s2/favicons?domain=cocoloop.cn&sz=64',
        fallbackDomain: 'cocoloop.cn',
        fallbackText: 'C',
        badge: '海量Skill',
        desc: '海量 AI Skill 智能体技能库、工具包与前沿Prompt提示词社群',
        subcatId: 'skill-sub'
      },
      {
        id: 'sk-2',
        title: 'CocoLoop',
        url: 'https://hub.cocoloop.cn/',
        icon: 'https://www.google.com/s2/favicons?domain=hub.cocoloop.cn&sz=64',
        fallbackDomain: 'hub.cocoloop.cn',
        fallbackText: 'H',
        badge: 'Skill枢纽',
        desc: 'CocoLoop 技能枢纽，智能体模块与自动化Prompt工作流',
        subcatId: 'skill-sub'
      },
      {
        id: 'sk-3',
        title: 'updream',
        url: 'https://www.updream.cn/',
        icon: 'https://www.google.com/s2/favicons?domain=updream.cn&sz=64',
        fallbackDomain: 'updream.cn',
        fallbackText: 'u',
        badge: '各类Skill',
        desc: '各类SKill应用集合、智能助理工作流与行业实战提示词',
        subcatId: 'skill-sub'
      }
    ]
  },
  {
    id: 'magic-tools',
    name: '常用工具与魔法网络',
    iconName: 'Wrench',
    desc: 'Cloudflare梯子搭建、高精度IP定位、纯净度检测、在线测速与临时邮箱',
    subcategories: [
      { id: 'util-common', name: '常用工具' },
      { id: 'magic-net', name: '魔法工具与测速' },
      { id: 'dev-deploy', name: '开发部署与UI' },
      { id: 'tool-download', name: '工具下载' },
      { id: 'media-short', name: '短视频与影视' }
    ],
    cards: [
      {
        id: 'ut-1',
        title: '地址生成器',
        url: 'https://address.aixmb.cn/',
        icon: 'https://www.google.com/s2/favicons?domain=address.aixmb.cn&sz=64',
        fallbackDomain: 'address.aixmb.cn',
        fallbackText: '地',
        badge: '国外地址',
        desc: '国外真实地址生成器，多国身份与地址信息一键获取',
        subcatId: 'util-common'
      },
      {
        id: 'ut-2',
        title: 'CF',
        url: 'https://dash.cloudflare.com/',
        icon: 'https://www.google.com/s2/favicons?domain=dash.cloudflare.com&sz=64',
        fallbackDomain: 'dash.cloudflare.com',
        fallbackText: 'C',
        badge: '梯子搭建',
        desc: 'Cloudflare 控制台，梯子搭建、Workers边缘计算与全球CDN加速配置',
        subcatId: 'util-common'
      },
      {
        id: 'ut-3',
        title: 'GitHub',
        url: 'https://github.com/',
        icon: 'https://www.google.com/s2/favicons?domain=github.com&sz=64',
        fallbackDomain: 'github.com',
        fallbackText: 'G',
        badge: '开源仓库',
        desc: '全球最大的开源代码托管仓库、开发者社区与全球技术交流平台',
        subcatId: 'util-common'
      },
      {
        id: 'ut-4',
        title: 'Runable',
        url: 'https://runable.com/',
        icon: 'https://www.google.com/s2/favicons?domain=runable.com&sz=64',
        fallbackDomain: 'runable.com',
        fallbackText: 'R',
        badge: '云开发',
        desc: '现代开发者全栈云端协作与代码运行部署平台',
        subcatId: 'util-common'
      },
      {
        id: 'ut-5',
        title: 'AI 工作市场',
        url: 'https://www.runjobs.ai/zh/',
        icon: 'https://www.google.com/s2/favicons?domain=runjobs.ai&sz=64',
        fallbackDomain: 'runjobs.ai',
        fallbackText: '职',
        badge: '求职兼职',
        desc: '全球AI领域远程办公、兼职与前沿高薪AI职位招聘聚合平台',
        subcatId: 'util-common'
      },
      {
        id: 'ut-6',
        title: 'X',
        url: 'https://x.com/',
        icon: 'https://www.google.com/s2/favicons?domain=x.com&sz=64',
        fallbackDomain: 'x.com',
        fallbackText: 'X',
        badge: '原推特',
        desc: '原推特 (Twitter)，全球即时新闻热点、AI行业大牛与科技资讯第一线',
        subcatId: 'util-common'
      },
      {
        id: 'ut-7',
        title: 'Gemini',
        url: 'https://gemini.google.com/app',
        icon: 'https://www.google.com/s2/favicons?domain=gemini.google.com&sz=64',
        fallbackDomain: 'gemini.google.com',
        fallbackText: 'G',
        badge: 'Google',
        desc: 'Google 原生多模态大模型，超长上下文与深厚知识库支持',
        subcatId: 'util-common'
      },
      {
        id: 'ut-8',
        title: '表答',
        url: 'https://biaoda.me/',
        icon: 'https://www.google.com/s2/favicons?domain=biaoda.me&sz=64',
        fallbackDomain: 'biaoda.me',
        fallbackText: '表',
        badge: '爆款对标',
        desc: '一句话智能匹配找到行业内的对标爆款视频与流量逻辑',
        subcatId: 'util-common'
      },
      {
        id: 'ut-9',
        title: 'cobalt',
        url: 'https://cobalt.tools/',
        icon: 'https://www.google.com/s2/favicons?domain=cobalt.tools&sz=64',
        fallbackDomain: 'cobalt.tools',
        fallbackText: 'c',
        badge: '视频下载',
        desc: '开源无广告无水印视频音频下载神器，支持 X、YouTube、B站等多平台',
        subcatId: 'util-common'
      },
      {
        id: 'ut-10',
        title: 'IP定位',
        url: 'https://www.ipip.net/',
        icon: 'https://www.google.com/s2/favicons?domain=ipip.net&sz=64',
        fallbackDomain: 'ipip.net',
        fallbackText: 'I',
        badge: '高精度',
        desc: 'IPIP.net 高精度全球IP地理位置归属地、运营商及网络链路查询',
        subcatId: 'util-common'
      },
      {
        id: 'ut-11',
        title: 'myip.ipip.net',
        url: 'https://myip.ipip.net/',
        icon: 'https://www.google.com/s2/favicons?domain=myip.ipip.net&sz=64',
        fallbackDomain: 'myip.ipip.net',
        fallbackText: 'P',
        badge: '秒开IP',
        desc: '极简纯文本 IP 定位显示，支持命令行与浏览器秒级获取出口 IP',
        subcatId: 'util-common'
      },
      {
        id: 'ut-12',
        title: 'UUID生成器',
        url: 'https://www.uuidgenerator.net/version4',
        icon: 'https://www.google.com/s2/favicons?domain=uuidgenerator.net&sz=64',
        fallbackDomain: 'uuidgenerator.net',
        fallbackText: 'U',
        badge: '生成器',
        desc: 'Version 4 随机 UUID 在线一键生成器，支持批量生成与格式转换',
        subcatId: 'util-common'
      },
      {
        id: 'ut-13',
        title: '免费临时邮箱',
        url: 'https://mail.cx/zh/',
        icon: 'https://www.google.com/s2/favicons?domain=mail.cx&sz=64',
        fallbackDomain: 'mail.cx',
        fallbackText: '邮',
        badge: '隐私安全',
        desc: '免费临时邮箱与安全验证码接收，免注册保护隐私防垃圾邮件',
        subcatId: 'util-common'
      },
      {
        id: 'ut-14',
        title: 'atoms',
        url: 'https://atoms.dev/zh/dashboard',
        icon: 'https://www.google.com/s2/favicons?domain=atoms.dev&sz=64',
        fallbackDomain: 'atoms.dev',
        fallbackText: 'a',
        badge: '极客面板',
        desc: '极客开发辅助与自动化任务控制面板',
        subcatId: 'util-common'
      },
      {
        id: 'ut-15',
        title: 'CREAO',
        url: 'https://agent.creao.ai/rewards?tab=tasks',
        icon: 'https://www.google.com/s2/favicons?domain=agent.creao.ai&sz=64',
        fallbackDomain: 'agent.creao.ai',
        fallbackText: 'C',
        badge: 'AI任务',
        desc: 'AI 代理任务激励与创意奖励交互控制中心',
        subcatId: 'util-common'
      },
      {
        id: 'ut-16',
        title: 'Skywork',
        url: 'https://skywork.ai/',
        icon: 'https://www.google.com/s2/favicons?domain=skywork.ai&sz=64',
        fallbackDomain: 'skywork.ai',
        fallbackText: '天',
        badge: '天工AI',
        desc: '昆仑万维天工AI，集成深度搜索、AI写作与多模态办公工作台',
        subcatId: 'util-common'
      },
      {
        id: 'mg-1',
        title: '365魔法工具',
        url: 'https://databridgestackpro.com/',
        icon: 'https://www.google.com/s2/favicons?domain=databridgestackpro.com&sz=64',
        fallbackDomain: 'databridgestackpro.com',
        fallbackText: '魔',
        badge: '全平台',
        desc: '手机电脑苹果全端网络辅助工具，稳定畅游全球互联网',
        subcatId: 'magic-net'
      },
      {
        id: 'mg-2',
        title: '在线网速测试',
        url: 'http://www.wangsu8.com/',
        icon: 'https://www.google.com/s2/favicons?domain=wangsu8.com&sz=64',
        fallbackDomain: 'wangsu8.com',
        fallbackText: '测',
        badge: '网速测试',
        desc: '在线测速工具，多节点精准测试下行速率、上行带宽与网络时延',
        subcatId: 'magic-net'
      },
      {
        id: 'mg-3',
        title: 'Cloudflare EDT 导航',
        url: 'https://bestcf.pages.dev/',
        icon: 'https://www.google.com/s2/favicons?domain=bestcf.pages.dev&sz=64',
        fallbackDomain: 'bestcf.pages.dev',
        fallbackText: 'C',
        badge: 'CF导航',
        desc: 'Cloudflare 优选IP、测速脚本与高速边缘节点导航站',
        subcatId: 'magic-net'
      },
      {
        id: 'mg-4',
        title: 'ping0.cc',
        url: 'https://ping0.cc',
        icon: 'https://www.google.com/s2/favicons?domain=ping0.cc&sz=64',
        fallbackDomain: 'ping0.cc',
        fallbackText: 'p',
        badge: '纯净检测',
        desc: '专业 IP 纯净度检测、欺诈评分、原生IP属性与风控环境评估',
        subcatId: 'magic-net'
      },
      {
        id: 'mg-5',
        title: 'CloudFlare优选IP_CF优选…',
        url: 'https://api.uouin.com/cloudflare.html',
        icon: 'https://www.google.com/s2/favicons?domain=api.uouin.com&sz=64',
        fallbackDomain: 'api.uouin.com',
        fallbackText: 'C',
        badge: '优选IP',
        desc: 'CF官方全球节点批量测速与优质IP实时提取工具',
        subcatId: 'magic-net'
      },
      {
        id: 'dv-1',
        title: 'Netlify',
        url: 'https://app.netlify.com/',
        icon: 'https://www.google.com/s2/favicons?domain=app.netlify.com&sz=64',
        fallbackDomain: 'app.netlify.com',
        fallbackText: 'N',
        badge: '部署网站',
        desc: '现代 Web 自动化持续集成部署、免服务器云托管平台',
        subcatId: 'dev-deploy'
      },
      {
        id: 'dv-2',
        title: 'MotionSites',
        url: 'https://motionsites.ai/',
        icon: 'https://www.google.com/s2/favicons?domain=motionsites.ai&sz=64',
        fallbackDomain: 'motionsites.ai',
        fallbackText: 'M',
        badge: 'UI设计',
        desc: '高端网站UI设计灵感、动效展示与前端实战代码参考',
        subcatId: 'dev-deploy'
      },
      {
        id: 'dv-3',
        title: '小渝児工具箱 - 喜庆版',
        url: 'https://xiaoyuer7758.vercel.app/',
        icon: 'https://www.google.com/s2/favicons?domain=xiaoyuer7758.vercel.app&sz=64',
        fallbackDomain: 'xiaoyuer7758.vercel.app',
        fallbackText: '渝',
        badge: '独立开发',
        desc: '个人独立开发的在线实用多功能工具箱合集 (喜庆纯净版)',
        subcatId: 'dev-deploy'
      },
      {
        id: 'dv-4',
        title: 'Link3',
        url: 'https://link3.cc/user',
        icon: 'https://www.google.com/s2/favicons?domain=link3.cc&sz=64',
        fallbackDomain: 'link3.cc',
        fallbackText: 'L',
        badge: '个人主页',
        desc: '个人数字身份主页，汇聚多平台社交链接与展示面板',
        subcatId: 'dev-deploy'
      },
      {
        id: 'dl-1',
        title: '4K工具下载器',
        url: 'https://www.4kdownload.com/thanks-for-downloading?source=videodownloaderandroid',
        icon: 'https://www.google.com/s2/favicons?domain=4kdownload.com&sz=64',
        fallbackDomain: '4kdownload.com',
        fallbackText: '4',
        badge: '4K下载',
        desc: '4K Video Downloader 官方下载，支持高帧率超清视频与音频提取',
        subcatId: 'tool-download'
      },
      {
        id: 'dl-2',
        title: '币安',
        url: 'https://www.binance.com/zh-CN/download',
        icon: 'https://www.google.com/s2/favicons?domain=binance.com&sz=64',
        fallbackDomain: 'binance.com',
        fallbackText: '币',
        badge: '客户端下载',
        desc: '全球顶尖数字资产交易客户端与移动端安全下载中心',
        subcatId: 'tool-download'
      },
      {
        id: 'md-1',
        title: '海量电视电影',
        url: 'https://moovie.c2v2.com/',
        icon: 'https://www.google.com/s2/favicons?domain=moovie.c2v2.com&sz=64',
        fallbackDomain: 'moovie.c2v2.com',
        fallbackText: '影',
        badge: '免费看剧',
        desc: '可免费看剧！海量电影热剧聚合，高清无广告极速播放',
        subcatId: 'media-short'
      },
      {
        id: 'md-2',
        title: '小红书',
        url: 'https://www.xiaohongshu.com/',
        icon: 'https://www.google.com/s2/favicons?domain=xiaohongshu.com&sz=64',
        fallbackDomain: 'xiaohongshu.com',
        fallbackText: '红',
        badge: '生活社区',
        desc: '年轻人的生活方式分享平台，海量美妆、穿搭、科技灵感与生活笔记',
        subcatId: 'media-short'
      },
      {
        id: 'md-3',
        title: 'YouTube',
        url: 'https://www.youtube.com/',
        icon: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=64',
        fallbackDomain: 'youtube.com',
        fallbackText: 'Y',
        badge: '全球视频',
        desc: '全球最大视频创作者与流媒体分享平台，汇聚全球顶尖教程与视听节目',
        subcatId: 'media-short'
      }
    ]
  }
];

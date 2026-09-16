import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialize Gemini client to avoid crashes if GEMINI_API_KEY is missing
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// Curated tech & AI headlines when API key is unconfigured or offline
const FALLBACK_TECH_HEADLINES = [
  {
    title: 'Google发布最新Gemini 3与多模态深度推理技术',
    tag: 'AI前沿',
    source: 'Google AI',
    query: 'Gemini AI'
  },
  {
    title: '全球开源大模型迎来突破，长上下文与推理性能大幅跃升',
    tag: '开源创新',
    source: '科技前沿',
    query: '开源大模型'
  },
  {
    title: '具身智能与人形机器人技术加速迈入量产实训阶段',
    tag: '具身智能',
    source: '机器之心',
    query: '具身智能机器人'
  },
  {
    title: '全球半导体产业持续演进，全新高能效算力芯片相继亮相',
    tag: '芯片算力',
    source: '快科技',
    query: 'AI芯片 算力'
  },
  {
    title: '多模态AI智能体深度融入日常办公与开发者工作流',
    tag: '应用落地',
    source: '36氪',
    query: 'AI Agent'
  },
  {
    title: '超导量子计算纠错技术取得新进展，保真度达到新高度',
    tag: '前沿探索',
    source: '科技日报',
    query: '量子计算'
  },
  {
    title: '国内主流大模型与应用接入多模态搜索和实时联网生态',
    tag: '国内热点',
    source: '新浪科技',
    query: '大模型 搜索'
  },
  {
    title: '端侧AI模型在智能手机与PC设备实现全天候离线流畅运行',
    tag: '硬件生态',
    source: '数码极客',
    query: '端侧AI'
  }
];

// In-memory cache for news headlines (cache for 10 minutes)
let cachedHeadlines: any[] = [];
let lastFetchedTime = 0;

// API route for live tech & AI headlines using Google Search grounding
app.get('/api/news/tech', async (req, res) => {
  const now = Date.now();
  // Return cached headlines if fresh (< 10 minutes)
  if (cachedHeadlines.length > 0 && now - lastFetchedTime < 10 * 60 * 1000) {
    return res.json({ success: true, headlines: cachedHeadlines, source: 'cache' });
  }

  const ai = getAI();
  if (!ai) {
    // If GEMINI_API_KEY is not configured, seamlessly provide high-quality curated headlines
    return res.json({ success: true, headlines: FALLBACK_TECH_HEADLINES, source: 'curated' });
  }

  try {
    // Use gemini-3.8-flash with googleSearch tool
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents:
        '请通过Google搜索查询并整理今天最新、最热门的 6 到 8 条全球科技与AI人工智能重大新闻头条。\n' +
        '必须严格返回符合以下JSON格式的纯数组，不要有任何markdown外包装：\n' +
        '[\n' +
        '  {\n' +
        '    "title": "精炼的新闻标题（20-35字以内，中文）",\n' +
        '    "tag": "如：AI大模型 / 芯片半导体 / 机器人 / 科技前沿",\n' +
        '    "source": "新闻来源媒体名称",\n' +
        '    "query": "适合在搜索引擎搜索该新闻的关键词"\n' +
        '  }\n' +
        ']',
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.text || '';
    // Extract JSON array
    let jsonStr = text.trim();
    const firstBracket = jsonStr.indexOf('[');
    const lastBracket = jsonStr.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1) {
      jsonStr = jsonStr.substring(firstBracket, lastBracket + 1);
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed) && parsed.length > 0) {
        cachedHeadlines = parsed.map((item: any) => ({
          title: item.title,
          tag: item.tag || '科技资讯',
          source: item.source || '全球科技资讯',
          query: item.query || item.title
        }));
        lastFetchedTime = now;
        return res.json({ success: true, headlines: cachedHeadlines, source: 'google_search' });
      }
    }

    // If parsing failed, return curated fallback
    res.json({ success: true, headlines: FALLBACK_TECH_HEADLINES, source: 'curated' });
  } catch {
    // Gracefully provide curated news without emitting error logs to console
    res.json({ success: true, headlines: FALLBACK_TECH_HEADLINES, source: 'curated' });
  }
});

// Start server with Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

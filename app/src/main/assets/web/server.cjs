var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_genai = require("@google/genai");
var import_vite = require("vite");
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json({ limit: "10mb" }));
var aiClient = null;
function getAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new import_genai.GoogleGenAI({ apiKey });
  }
  return aiClient;
}
var FALLBACK_TECH_HEADLINES = [
  {
    title: "Google\u53D1\u5E03\u6700\u65B0Gemini 3\u4E0E\u591A\u6A21\u6001\u6DF1\u5EA6\u63A8\u7406\u6280\u672F",
    tag: "AI\u524D\u6CBF",
    source: "Google AI",
    query: "Gemini AI"
  },
  {
    title: "\u5168\u7403\u5F00\u6E90\u5927\u6A21\u578B\u8FCE\u6765\u7A81\u7834\uFF0C\u957F\u4E0A\u4E0B\u6587\u4E0E\u63A8\u7406\u6027\u80FD\u5927\u5E45\u8DC3\u5347",
    tag: "\u5F00\u6E90\u521B\u65B0",
    source: "\u79D1\u6280\u524D\u6CBF",
    query: "\u5F00\u6E90\u5927\u6A21\u578B"
  },
  {
    title: "\u5177\u8EAB\u667A\u80FD\u4E0E\u4EBA\u5F62\u673A\u5668\u4EBA\u6280\u672F\u52A0\u901F\u8FC8\u5165\u91CF\u4EA7\u5B9E\u8BAD\u9636\u6BB5",
    tag: "\u5177\u8EAB\u667A\u80FD",
    source: "\u673A\u5668\u4E4B\u5FC3",
    query: "\u5177\u8EAB\u667A\u80FD\u673A\u5668\u4EBA"
  },
  {
    title: "\u5168\u7403\u534A\u5BFC\u4F53\u4EA7\u4E1A\u6301\u7EED\u6F14\u8FDB\uFF0C\u5168\u65B0\u9AD8\u80FD\u6548\u7B97\u529B\u82AF\u7247\u76F8\u7EE7\u4EAE\u76F8",
    tag: "\u82AF\u7247\u7B97\u529B",
    source: "\u5FEB\u79D1\u6280",
    query: "AI\u82AF\u7247 \u7B97\u529B"
  },
  {
    title: "\u591A\u6A21\u6001AI\u667A\u80FD\u4F53\u6DF1\u5EA6\u878D\u5165\u65E5\u5E38\u529E\u516C\u4E0E\u5F00\u53D1\u8005\u5DE5\u4F5C\u6D41",
    tag: "\u5E94\u7528\u843D\u5730",
    source: "36\u6C2A",
    query: "AI Agent"
  },
  {
    title: "\u8D85\u5BFC\u91CF\u5B50\u8BA1\u7B97\u7EA0\u9519\u6280\u672F\u53D6\u5F97\u65B0\u8FDB\u5C55\uFF0C\u4FDD\u771F\u5EA6\u8FBE\u5230\u65B0\u9AD8\u5EA6",
    tag: "\u524D\u6CBF\u63A2\u7D22",
    source: "\u79D1\u6280\u65E5\u62A5",
    query: "\u91CF\u5B50\u8BA1\u7B97"
  },
  {
    title: "\u56FD\u5185\u4E3B\u6D41\u5927\u6A21\u578B\u4E0E\u5E94\u7528\u63A5\u5165\u591A\u6A21\u6001\u641C\u7D22\u548C\u5B9E\u65F6\u8054\u7F51\u751F\u6001",
    tag: "\u56FD\u5185\u70ED\u70B9",
    source: "\u65B0\u6D6A\u79D1\u6280",
    query: "\u5927\u6A21\u578B \u641C\u7D22"
  },
  {
    title: "\u7AEF\u4FA7AI\u6A21\u578B\u5728\u667A\u80FD\u624B\u673A\u4E0EPC\u8BBE\u5907\u5B9E\u73B0\u5168\u5929\u5019\u79BB\u7EBF\u6D41\u7545\u8FD0\u884C",
    tag: "\u786C\u4EF6\u751F\u6001",
    source: "\u6570\u7801\u6781\u5BA2",
    query: "\u7AEF\u4FA7AI"
  }
];
var cachedHeadlines = [];
var lastFetchedTime = 0;
app.get("/api/news/tech", async (req, res) => {
  const now = Date.now();
  if (cachedHeadlines.length > 0 && now - lastFetchedTime < 10 * 60 * 1e3) {
    return res.json({ success: true, headlines: cachedHeadlines, source: "cache" });
  }
  const ai = getAI();
  if (!ai) {
    return res.json({ success: true, headlines: FALLBACK_TECH_HEADLINES, source: "curated" });
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: '\u8BF7\u901A\u8FC7Google\u641C\u7D22\u67E5\u8BE2\u5E76\u6574\u7406\u4ECA\u5929\u6700\u65B0\u3001\u6700\u70ED\u95E8\u7684 6 \u5230 8 \u6761\u5168\u7403\u79D1\u6280\u4E0EAI\u4EBA\u5DE5\u667A\u80FD\u91CD\u5927\u65B0\u95FB\u5934\u6761\u3002\n\u5FC5\u987B\u4E25\u683C\u8FD4\u56DE\u7B26\u5408\u4EE5\u4E0BJSON\u683C\u5F0F\u7684\u7EAF\u6570\u7EC4\uFF0C\u4E0D\u8981\u6709\u4EFB\u4F55markdown\u5916\u5305\u88C5\uFF1A\n[\n  {\n    "title": "\u7CBE\u70BC\u7684\u65B0\u95FB\u6807\u9898\uFF0820-35\u5B57\u4EE5\u5185\uFF0C\u4E2D\u6587\uFF09",\n    "tag": "\u5982\uFF1AAI\u5927\u6A21\u578B / \u82AF\u7247\u534A\u5BFC\u4F53 / \u673A\u5668\u4EBA / \u79D1\u6280\u524D\u6CBF",\n    "source": "\u65B0\u95FB\u6765\u6E90\u5A92\u4F53\u540D\u79F0",\n    "query": "\u9002\u5408\u5728\u641C\u7D22\u5F15\u64CE\u641C\u7D22\u8BE5\u65B0\u95FB\u7684\u5173\u952E\u8BCD"\n  }\n]',
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    const text = response.text || "";
    let jsonStr = text.trim();
    const firstBracket = jsonStr.indexOf("[");
    const lastBracket = jsonStr.lastIndexOf("]");
    if (firstBracket !== -1 && lastBracket !== -1) {
      jsonStr = jsonStr.substring(firstBracket, lastBracket + 1);
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed) && parsed.length > 0) {
        cachedHeadlines = parsed.map((item) => ({
          title: item.title,
          tag: item.tag || "\u79D1\u6280\u8D44\u8BAF",
          source: item.source || "\u5168\u7403\u79D1\u6280\u8D44\u8BAF",
          query: item.query || item.title
        }));
        lastFetchedTime = now;
        return res.json({ success: true, headlines: cachedHeadlines, source: "google_search" });
      }
    }
    res.json({ success: true, headlines: FALLBACK_TECH_HEADLINES, source: "curated" });
  } catch {
    res.json({ success: true, headlines: FALLBACK_TECH_HEADLINES, source: "curated" });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map

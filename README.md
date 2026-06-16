# 🧭 AI 学径（AI Hub）

为 **AI 学习者与转型者** 设计的一站式学习应用。零依赖纯静态页面，打开即用。

## ✨ 功能

| 模块 | 说明 |
|---|---|
| 📊 学习仪表盘 | 总进度、连续学习天数、待复习卡片、下一课推荐 |
| 🗺️ 学习路径 | 6 阶段 28 课：Python/数学 → 机器学习 → 深度学习 → LLM/RAG/Agent → 工程化 → 求职转型，每课含核心讲解 + 精选资源 + 完成打卡 |
| 📝 阶段测验 | 33 道带解析的选择题，按阶段闯关，记录最佳成绩 |
| 🃏 智能闪卡 | 30 张核心概念卡，Leitner 间隔重复算法（1/3/7/16 天）自动安排复习 |
| 💼 转型求职 | AI 岗位地图、简历策略 + 16 道高频面试题速查 |
| 📖 术语表 | 32 个核心 AI 术语，支持中英文搜索 |
| 🎓 AI 导师 | 浏览器直连 Claude API 的流式对话导师（可选，需自备 API Key） |

所有学习进度保存在浏览器 localStorage，无需注册、无后端、离线可用（AI 导师除外）。

## 🚀 使用

**方式一：直接打开**

下载本仓库，双击 `index.html` 即可。

**方式二：本地服务**

```bash
python3 -m http.server 8000
# 访问 http://localhost:8000
```

**方式三：部署到 GitHub Pages**

仓库 Settings → Pages → 选择分支根目录即可，无需构建。

## 🎓 AI 导师配置（可选）

1. 在 [platform.claude.com](https://platform.claude.com/) 注册并创建 API Key
2. 打开应用「AI 导师」页，粘贴 Key
3. Key 仅存于你本机浏览器 localStorage，请求由浏览器直连 Anthropic API，不经过任何第三方服务器

> 其余全部功能不需要 API Key。

## 🧱 技术结构

```
index.html      入口与导航
css/style.css   样式（暗色主题，响应式）
js/data.js      课程/测验/闪卡/面试题/术语 静态数据
js/app.js       哈希路由 + 状态管理(localStorage) + 页面渲染
js/tutor.js     AI 导师：Claude Messages API 流式调用（SSE 解析）
```

无框架、无构建步骤、无外部依赖——本身也是一份「读得懂的源码」教学素材：哈希路由、间隔重复算法、LLM 流式 API 调用都可直接阅读学习。

## 🛠️ 维护

想增改课程、测验、闪卡、面试题或术语？全部内容集中在 `js/data.js`，照着 **[docs/维护指南.md](docs/维护指南.md)** 改即可——内含每种内容的数据结构说明、提交前的自检脚本，以及 GitHub Pages 部署（含首次开启）的完整步骤。

## 📜 License

MIT

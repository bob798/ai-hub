/* ============================================================
 * AI 学径 — AI 导师
 * 浏览器直连 Anthropic Claude API（流式输出）。
 * API Key 仅保存在用户本地浏览器（localStorage），不经过任何服务器。
 * ============================================================ */

const TUTOR_MODEL = "claude-opus-4-8";
const KEY_STORE = "aihub_api_key";

const TUTOR_SYSTEM = `你是「AI 学径」应用内置的 AI 学习导师，服务对象是正在学习人工智能或从其他行业转型 AI 的中文学习者。

你的职责：
1. 用清晰、准确、循序渐进的方式解答机器学习、深度学习、大语言模型、AI 工程化与求职转型相关问题。
2. 解释概念时先给直觉/类比，再给严谨定义，必要时给出简短代码示例（Python/PyTorch 优先）。
3. 学习者基础可能薄弱，避免不加解释地堆砌术语；首次出现的术语附英文原文。
4. 对方迷茫时给出具体可执行的下一步建议，而不是空泛鼓励。
5. 涉及求职建议时结合中国就业市场的实际情况。
6. 回答保持简洁聚焦，默认 300 字以内；学习者要求深入时再展开。

课程体系供参考（学习者正在按此路径学习）：阶段一 Python 与数学基础 → 阶段二 机器学习核心 → 阶段三 深度学习与 PyTorch → 阶段四 LLM/RAG/Agent → 阶段五 工程化部署 → 阶段六 求职转型。可以在合适时建议学习者去对应阶段学习。`;

function getApiKey() { return localStorage.getItem(KEY_STORE) || ""; }

/* ---------------- 轻量 Markdown 渲染 ----------------
 * 先整体转义防 XSS，再按行解析常见语法：代码块、标题、列表、
 * 行内代码、加粗、斜体、链接。专为 LLM 回复设计，足够日常使用。 */
function mdToHtml(src) {
  const blocks = String(src).split(/```/);
  let out = "";
  blocks.forEach((chunk, i) => {
    if (i % 2 === 1) {
      // 代码块（奇数段在 ``` 之间）
      const body = chunk.replace(/^[a-zA-Z0-9]*\n/, ""); // 去掉语言标注行
      out += `<pre class="md-pre"><code>${esc(body.replace(/\n$/, ""))}</code></pre>`;
    } else {
      out += mdInlineBlocks(chunk);
    }
  });
  return out;
}

function mdInlineBlocks(text) {
  const lines = text.split("\n");
  let html = "", listType = null, para = [];
  const flushPara = () => {
    if (para.length) { html += `<p>${para.join("<br>")}</p>`; para = []; }
  };
  const closeList = () => { if (listType) { html += `</${listType}>`; listType = null; } };
  for (let raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) { flushPara(); closeList(); continue; }
    let m;
    if ((m = line.match(/^(#{1,4})\s+(.*)$/))) {
      flushPara(); closeList();
      const lvl = Math.min(m[1].length + 2, 6);
      html += `<h${lvl} class="md-h">${mdSpan(m[2])}</h${lvl}>`;
    } else if ((m = line.match(/^\s*[-*]\s+(.*)$/))) {
      flushPara();
      if (listType !== "ul") { closeList(); html += "<ul class='md-ul'>"; listType = "ul"; }
      html += `<li>${mdSpan(m[1])}</li>`;
    } else if ((m = line.match(/^\s*\d+\.\s+(.*)$/))) {
      flushPara();
      if (listType !== "ol") { closeList(); html += "<ol class='md-ol'>"; listType = "ol"; }
      html += `<li>${mdSpan(m[1])}</li>`;
    } else {
      closeList();
      para.push(mdSpan(line));
    }
  }
  flushPara(); closeList();
  return html;
}

// 行内：先转义，再套用 行内代码 / 粗体 / 斜体 / 链接
function mdSpan(s) {
  let t = esc(s);
  t = t.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
  t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
  t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    (_, txt, url) => `<a href="${url}" target="_blank" rel="noopener">${txt}</a>`);
  return t;
}

function renderTutor() {
  if (!getApiKey()) { renderKeySetup(); return; }
  renderChatUI();
}

function renderKeySetup(errMsg) {
  $("#app").innerHTML = `
  <h1 class="page-title">AI 导师</h1>
  <p class="page-sub">由 Claude 驱动的专属学习导师：概念答疑、代码讲解、学习规划、模拟面试。</p>
  <div class="card key-setup">
    <div style="font-weight:700;font-size:16px;margin-bottom:6px">🔑 配置你的 Anthropic API Key</div>
    <p class="notice">
      本应用是纯静态页面，没有自己的服务器。AI 导师功能通过你浏览器<strong>直连 Anthropic API</strong> 实现，
      因此需要你自己的 API Key（在 <a href="https://platform.claude.com/" target="_blank" rel="noopener">platform.claude.com</a> 注册获取）。<br>
      Key 仅保存在你本机浏览器的 localStorage 中，<strong>不会上传到任何第三方</strong>。按用量计费，日常答疑成本很低。
    </p>
    ${errMsg ? `<div class="msg error" style="max-width:100%">${esc(errMsg)}</div>` : ""}
    <input type="password" id="api-key-input" placeholder="sk-ant-..." autocomplete="off">
    <button class="btn primary" onclick="saveApiKey()">保存并开始对话</button>
  </div>
  <div class="card" style="margin-top:14px">
    <div style="font-weight:700;margin-bottom:6px">💡 没有 API Key？</div>
    <p class="notice">
      其余功能（课程、测验、闪卡、面试题库）完全离线可用，不需要 Key。
      你也可以把对 AI 导师的提问拿去问任何聊天助手——但配置 Key 后的导师内置了针对本课程体系的教学提示词，体验更佳。
      顺便说：学会调用 LLM API 正是阶段四的课程内容，配置这个 Key 就是你的第一次实践 😉
    </p>
  </div>
  ${footer()}`;
}

function saveApiKey() {
  const key = $("#api-key-input").value.trim();
  if (!key) { renderKeySetup("请输入有效的 API Key"); return; }
  localStorage.setItem(KEY_STORE, key);
  renderChatUI();
}

function clearApiKey() {
  if (confirm("确定要删除已保存的 API Key 吗？")) {
    localStorage.removeItem(KEY_STORE);
    renderTutor();
  }
}

function clearChat() {
  state.chat.messages = [];
  saveState();
  renderChatUI();
}

const SUGGESTIONS = [
  "用类比给我解释什么是反向传播",
  "RAG 和微调怎么选？",
  "帮我规划本周的学习计划",
  "模拟面试：问我一道机器学习题"
];

function renderChatUI() {
  const msgs = state.chat.messages;
  $("#app").innerHTML = `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px">
    <h1 class="page-title" style="margin:0">AI 导师</h1>
    <div style="display:flex;gap:8px">
      <button class="btn small" onclick="clearChat()">清空对话</button>
      <button class="btn small" onclick="clearApiKey()">更换 Key</button>
    </div>
  </div>
  <div class="chat-wrap">
    <div class="chat-messages" id="chat-messages">
      ${msgs.length === 0 ? `
        <div class="empty">
          <div style="font-size:34px">🎓</div>
          <p style="margin:10px 0">你好！我是你的 AI 学习导师，有任何概念不懂、学习卡壳、求职困惑都可以问我。</p>
          <div class="suggest-chips" style="justify-content:center">
            ${SUGGESTIONS.map(s => `<button class="chip" onclick="sendMessage('${s}')">${s}</button>`).join("")}
          </div>
        </div>` :
        msgs.map(m => `<div class="msg ${m.role}">${m.role === "assistant" ? mdToHtml(m.content) : esc(m.content)}</div>`).join("")}
    </div>
    <div class="chat-input-row">
      <textarea id="chat-input" placeholder="输入你的问题…（Enter 发送，Shift+Enter 换行）" rows="2"></textarea>
      <button class="btn primary" id="send-btn" onclick="sendMessage()">发送</button>
    </div>
  </div>`;

  const input = $("#chat-input");
  input.addEventListener("keydown", e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  scrollChat();
  input.focus();
}

function scrollChat() {
  const el = $("#chat-messages");
  if (el) el.scrollTop = el.scrollHeight;
}

let chatBusy = false;

async function sendMessage(preset) {
  if (chatBusy) return;
  const input = $("#chat-input");
  const text = (preset || (input ? input.value : "")).trim();
  if (!text) return;

  state.chat.messages.push({ role: "user", content: text });
  saveState();
  touchStudyDay();
  renderChatUI();
  await streamReply();
}

async function streamReply() {
  chatBusy = true;
  $("#send-btn").disabled = true;

  // 占位的助手消息
  const container = $("#chat-messages");
  const bubble = document.createElement("div");
  bubble.className = "msg assistant";
  bubble.textContent = "…";
  container.appendChild(bubble);
  scrollChat();

  // 只发送最近 20 条消息控制上下文成本
  const history = state.chat.messages.slice(-20).map(m => ({ role: m.role, content: m.content }));

  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": getApiKey(),
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: TUTOR_MODEL,
        max_tokens: 2048,
        stream: true,
        system: TUTOR_SYSTEM,
        messages: history
      })
    });

    if (!resp.ok) {
      let detail = `HTTP ${resp.status}`;
      try {
        const err = await resp.json();
        detail = err?.error?.message || detail;
      } catch { /* 保留默认 detail */ }
      if (resp.status === 401) detail = "API Key 无效或已被吊销，请点击「更换 Key」重新配置。";
      if (resp.status === 429) detail = "请求过于频繁（限流），请稍等几秒再试。";
      throw new Error(detail);
    }

    // 解析 SSE 流
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "", fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop(); // 留下不完整的行
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const payload = line.slice(6).trim();
        if (!payload || payload === "[DONE]") continue;
        let evt;
        try { evt = JSON.parse(payload); } catch { continue; }
        if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
          fullText += evt.delta.text;
          bubble.textContent = fullText;
          scrollChat();
        } else if (evt.type === "error") {
          throw new Error(evt.error?.message || "流式响应错误");
        }
      }
    }

    if (!fullText) fullText = "（模型没有返回文本内容，请重试）";
    bubble.innerHTML = mdToHtml(fullText); // 流式结束后渲染 Markdown
    scrollChat();
    state.chat.messages.push({ role: "assistant", content: fullText });
    saveState();
  } catch (e) {
    bubble.className = "msg error";
    bubble.textContent = "⚠️ " + (e.message || "请求失败，请检查网络后重试");
    // 失败时回滚最后一条用户消息，避免历史中出现孤立提问
    const last = state.chat.messages[state.chat.messages.length - 1];
    if (last && last.role === "user") {
      // 保留用户消息但不保存助手回复——用户可直接重发
    }
  } finally {
    chatBusy = false;
    const btn = $("#send-btn");
    if (btn) btn.disabled = false;
  }
}

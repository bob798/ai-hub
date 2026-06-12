/* ============================================================
 * AI 学径 — 应用核心：状态管理 + 哈希路由 + 页面渲染
 * 纯原生 JS，无依赖。进度数据保存在 localStorage。
 * ============================================================ */

/* ---------------- 状态管理 ---------------- */
const STORE_KEY = "aihub_state_v1";

const defaultState = () => ({
  completed: {},        // lessonId -> timestamp
  quizBest: {},         // stageId -> { score, total, ts }
  srs: {},              // cardId -> { box: 0-4, due: ts }
  studyDays: [],        // ["2026-06-11", ...] 学习日期（去重）
  chat: { messages: [] }
});

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return defaultState();
    return Object.assign(defaultState(), JSON.parse(raw));
  } catch { return defaultState(); }
}
function saveState() { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
let state = loadState();

function todayStr() { return new Date().toISOString().slice(0, 10); }
function touchStudyDay() {
  const t = todayStr();
  if (!state.studyDays.includes(t)) { state.studyDays.push(t); saveState(); }
}
function streakDays() {
  const set = new Set(state.studyDays);
  let n = 0;
  const d = new Date();
  if (!set.has(todayStr())) d.setDate(d.getDate() - 1); // 今天还没学，从昨天起算
  while (set.has(d.toISOString().slice(0, 10))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

/* ---------------- 工具 ---------------- */
const $ = sel => document.querySelector(sel);
function esc(s) {
  return String(s).replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function totalLessons() { return CURRICULUM.reduce((n, s) => n + s.lessons.length, 0); }
function completedCount() { return Object.keys(state.completed).length; }
function stageProgress(stage) {
  const done = stage.lessons.filter(l => state.completed[l.id]).length;
  return { done, total: stage.lessons.length, pct: Math.round(done / stage.lessons.length * 100) };
}
function findLesson(lessonId) {
  for (const s of CURRICULUM)
    for (let i = 0; i < s.lessons.length; i++)
      if (s.lessons[i].id === lessonId) return { stage: s, lesson: s.lessons[i], index: i };
  return null;
}
function flatLessons() {
  const out = [];
  for (const s of CURRICULUM) for (const l of s.lessons) out.push({ stage: s, lesson: l });
  return out;
}

/* ---------------- 路由 ---------------- */
const routes = {
  "": renderDashboard,
  "path": renderPath,
  "lesson": renderLesson,     // #/lesson/<lessonId>
  "quiz": renderQuiz,         // #/quiz/<stageId>
  "cards": renderCards,
  "career": renderCareer,
  "glossary": renderGlossary,
  "tutor": renderTutor
};

function navigate() {
  const hash = location.hash.replace(/^#\/?/, "");
  const [page, ...args] = hash.split("/");
  const fn = routes[page] || renderDashboard;
  // 高亮导航
  document.querySelectorAll("nav a").forEach(a => {
    const target = a.getAttribute("href").replace(/^#\/?/, "").split("/")[0];
    a.classList.toggle("active", target === (routes[page] ? page : ""));
  });
  window.scrollTo(0, 0);
  fn(...args);
}
window.addEventListener("hashchange", navigate);
window.addEventListener("DOMContentLoaded", navigate);

/* ---------------- 页面：仪表盘 ---------------- */
function renderDashboard() {
  const total = totalLessons(), done = completedCount();
  const pct = total ? Math.round(done / total * 100) : 0;
  const quizTaken = Object.keys(state.quizBest).length;
  const dueCards = FLASHCARDS.filter(c => {
    const r = state.srs[c.id];
    return !r || r.due <= Date.now();
  }).length;

  // 下一课推荐
  const next = flatLessons().find(x => !state.completed[x.lesson.id]);

  let html = "";
  if (done === 0) {
    html += `
    <div class="hero">
      <h1>从零到 <span class="grad">AI 工程师</span> 的学习路径</h1>
      <p>为转型与入门者设计的系统化课程：6 个阶段、${total} 节课，覆盖 Python 基础 → 机器学习 → 深度学习 → 大语言模型 → 工程实战 → 求职转型。配套测验、间隔重复闪卡与 AI 导师。</p>
      <a class="btn primary" href="#/lesson/${CURRICULUM[0].lessons[0].id}">🚀 开始第一课</a>
      <a class="btn" href="#/path" style="margin-left:8px">查看完整路径</a>
    </div>`;
  } else {
    html += `<h1 class="page-title">学习仪表盘</h1>
    <p class="page-sub">坚持就是最大的护城河。今天也学一点吧。</p>`;
  }

  html += `
  <div class="stats-grid">
    <div class="card stat"><div class="num">${pct}%</div><div class="lbl">总进度 ${done}/${total} 课</div></div>
    <div class="card stat"><div class="num">${streakDays()}</div><div class="lbl">连续学习天数</div></div>
    <div class="card stat"><div class="num">${dueCards}</div><div class="lbl">待复习闪卡</div></div>
    <div class="card stat"><div class="num">${quizTaken}/${CURRICULUM.length}</div><div class="lbl">已完成测验</div></div>
  </div>`;

  if (next) {
    html += `
    <div class="card clickable" onclick="location.hash='#/lesson/${next.lesson.id}'">
      <span class="tag">继续学习</span>
      <div style="margin-top:8px;font-size:17px;font-weight:700">${esc(next.lesson.title)}</div>
      <div style="color:var(--text-dim);font-size:13.5px;margin-top:3px">${esc(next.stage.title)} · 约 ${next.lesson.minutes} 分钟</div>
    </div>`;
  } else if (total > 0) {
    html += `<div class="card" style="text-align:center">
      <div style="font-size:34px">🎓</div>
      <div style="font-size:18px;font-weight:700;margin:6px 0">恭喜！你已完成全部课程</div>
      <p class="notice">继续用闪卡保持记忆，用面试题库冲刺 offer。</p>
    </div>`;
  }

  html += `<h2 style="margin:26px 0 12px;font-size:19px">各阶段进度</h2>`;
  for (const s of CURRICULUM) {
    const p = stageProgress(s);
    html += `
    <div class="card clickable dash-stage" onclick="location.hash='#/path'" style="margin-bottom:10px">
      <div class="info">
        <div style="font-weight:600;font-size:15px">${esc(s.title)}</div>
        <div class="progress-track" style="margin-top:8px"><div class="progress-fill" style="width:${p.pct}%"></div></div>
      </div>
      <div class="pct">${p.done}/${p.total} 课 · ${p.pct}%</div>
    </div>`;
  }
  html += footer();
  $("#app").innerHTML = html;
}

/* ---------------- 页面：学习路径 ---------------- */
function renderPath() {
  let html = `<h1 class="page-title">学习路径</h1>
  <p class="page-sub">按顺序学习效果最佳，但你随时可以跳到感兴趣的部分。点击课程标题进入学习，点击圆圈快速勾选完成。</p>`;

  for (const s of CURRICULUM) {
    const p = stageProgress(s);
    const best = state.quizBest[s.id];
    html += `
    <div class="card" style="margin-bottom:16px">
      <div class="stage-head">
        <div>
          <div style="font-size:18px;font-weight:700">${esc(s.title)}</div>
          <div style="color:var(--text-dim);font-size:13.5px;margin-top:2px">${esc(s.subtitle)} · ${esc(s.weeks)}</div>
        </div>
        <span class="tag ${p.pct === 100 ? "green" : ""}">${p.done}/${p.total} 完成</span>
      </div>
      <p style="color:var(--text-dim);font-size:14px;margin:10px 0 12px">${esc(s.desc)}</p>
      <div class="progress-track" style="margin-bottom:8px"><div class="progress-fill" style="width:${p.pct}%"></div></div>
      ${s.lessons.map(l => `
        <div class="lesson-row">
          <div class="lesson-check ${state.completed[l.id] ? "done" : ""}" onclick="event.stopPropagation();toggleLesson('${l.id}')">✓</div>
          <div class="lesson-title" onclick="location.hash='#/lesson/${l.id}'">${esc(l.title)}</div>
          <div class="lesson-min">${l.minutes} 分钟</div>
        </div>`).join("")}
      <div style="margin-top:14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap">
        <a class="btn small" href="#/quiz/${s.id}">📝 阶段测验</a>
        ${best ? `<span class="notice">最佳成绩：${best.score}/${best.total}</span>` : ""}
      </div>
    </div>`;
  }
  html += footer();
  $("#app").innerHTML = html;
}

function toggleLesson(id) {
  if (state.completed[id]) delete state.completed[id];
  else { state.completed[id] = Date.now(); touchStudyDay(); }
  saveState();
  navigate();
}

/* ---------------- 页面：课程详情 ---------------- */
function renderLesson(lessonId) {
  const found = findLesson(lessonId);
  if (!found) { location.hash = "#/path"; return; }
  const { stage, lesson } = found;
  const all = flatLessons();
  const idx = all.findIndex(x => x.lesson.id === lessonId);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;
  const done = !!state.completed[lessonId];

  touchStudyDay(); // 打开课程即记一天学习

  $("#app").innerHTML = `
  <div style="margin-bottom:14px"><a href="#/path">← 返回学习路径</a></div>
  <div class="card">
    <span class="tag">${esc(stage.title)}</span><span class="tag amber">约 ${lesson.minutes} 分钟</span>
    <h1 style="font-size:24px;margin:12px 0 4px">${esc(lesson.title)}</h1>
    <div class="lesson-content">${lesson.content}</div>
    <div class="resources">
      <h4>📚 推荐资源</h4>
      <ul>${lesson.resources.map(r => `<li><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.name)} ↗</a></li>`).join("")}</ul>
    </div>
    <div style="margin-top:24px;text-align:center">
      <button class="btn ${done ? "" : "primary"}" onclick="toggleLesson('${lesson.id}');renderLesson('${lesson.id}')">
        ${done ? "✓ 已完成（点击取消）" : "标记为已完成"}
      </button>
    </div>
  </div>
  <div class="lesson-nav">
    ${prev ? `<a class="btn" href="#/lesson/${prev.lesson.id}">← ${esc(prev.lesson.title)}</a>` : "<span></span>"}
    ${next ? `<a class="btn" href="#/lesson/${next.lesson.id}">${esc(next.lesson.title)} →</a>` : `<a class="btn primary" href="#/quiz/${stage.id}">完成本阶段测验 →</a>`}
  </div>
  ${footer()}`;
}

/* ---------------- 页面：测验 ---------------- */
let quizSession = null;

function renderQuiz(stageId) {
  const stage = CURRICULUM.find(s => s.id === stageId);
  const questions = QUIZZES[stageId];
  if (!stage || !questions) { location.hash = "#/path"; return; }

  if (!quizSession || quizSession.stageId !== stageId) {
    quizSession = { stageId, index: 0, score: 0, answered: false };
  }
  const qs = quizSession;

  if (qs.index >= questions.length) {
    // 结算
    const best = state.quizBest[stageId];
    if (!best || qs.score > best.score) {
      state.quizBest[stageId] = { score: qs.score, total: questions.length, ts: Date.now() };
      touchStudyDay(); saveState();
    }
    const pct = Math.round(qs.score / questions.length * 100);
    const verdict = pct === 100 ? "完美！🏆" : pct >= 80 ? "很棒！🎉" : pct >= 60 ? "及格，建议复习错题相关课程 💪" : "建议回去重学本阶段课程再来 📖";
    $("#app").innerHTML = `
    <div class="card" style="text-align:center;padding:46px 20px">
      <div style="font-size:42px;font-weight:800;color:var(--accent)">${qs.score} / ${questions.length}</div>
      <div style="font-size:18px;margin:10px 0 4px">${esc(stage.title)} 测验完成</div>
      <p class="notice">${verdict}</p>
      <div style="margin-top:20px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
        <button class="btn" onclick="quizSession=null;renderQuiz('${stageId}')">再来一次</button>
        <a class="btn primary" href="#/path">返回学习路径</a>
      </div>
    </div>${footer()}`;
    return;
  }

  const q = questions[qs.index];
  $("#app").innerHTML = `
  <div style="margin-bottom:14px"><a href="#/path">← 返回学习路径</a></div>
  <h1 class="page-title">${esc(stage.title)} · 测验</h1>
  <div class="quiz-progress">第 ${qs.index + 1} / ${questions.length} 题 · 当前得分 ${qs.score}</div>
  <div class="card">
    <div style="font-size:16.5px;font-weight:600;margin-bottom:14px">${esc(q.q)}</div>
    <div id="quiz-options">
      ${q.options.map((opt, i) =>
        `<button class="quiz-option" data-i="${i}" onclick="answerQuiz(${i})">${"ABCD"[i]}. ${esc(opt)}</button>`).join("")}
    </div>
    <div id="quiz-feedback"></div>
  </div>${footer()}`;
}

function answerQuiz(i) {
  const questions = QUIZZES[quizSession.stageId];
  const q = questions[quizSession.index];
  if (quizSession.answered) return;
  quizSession.answered = true;

  const buttons = document.querySelectorAll(".quiz-option");
  buttons.forEach(b => b.disabled = true);
  buttons[q.answer].classList.add("correct");
  const right = i === q.answer;
  if (!right) buttons[i].classList.add("wrong");
  else quizSession.score++;

  $("#quiz-feedback").innerHTML = `
    <div class="quiz-explain">${right ? "✅ 回答正确！" : "❌ 正确答案是 " + "ABCD"[q.answer] + "。"} ${esc(q.explain)}</div>
    <div style="text-align:right;margin-top:12px">
      <button class="btn primary" onclick="quizSession.index++;quizSession.answered=false;renderQuiz('${quizSession.stageId}')">
        ${quizSession.index + 1 >= questions.length ? "查看结果" : "下一题"} →
      </button>
    </div>`;
}

/* ---------------- 页面：闪卡（Leitner 间隔重复） ---------------- */
/* 盒子 0-4，对应复习间隔（天）。记得→升盒，忘了→回盒 0 */
const SRS_INTERVALS = [0, 1, 3, 7, 16];
let cardSession = null;

function dueCardsList() {
  return FLASHCARDS.filter(c => {
    const r = state.srs[c.id];
    return !r || r.due <= Date.now();
  });
}

function renderCards() {
  const due = dueCardsList();
  const learned = Object.keys(state.srs).length;
  const mastered = Object.values(state.srs).filter(r => r.box >= 4).length;

  if (!cardSession || cardSession.finished) {
    $("#app").innerHTML = `
    <h1 class="page-title">智能闪卡</h1>
    <p class="page-sub">基于 Leitner 间隔重复算法：记住的卡片复习间隔逐渐拉长（1→3→7→16 天），忘记的重新开始。每天清空到期卡片，记忆效率最高。</p>
    <div class="srs-stats">
      <span>📦 总卡片 ${FLASHCARDS.length}</span>
      <span>✅ 已学 ${learned}</span>
      <span>🏆 已掌握 ${mastered}</span>
      <span>⏰ 今日到期 <strong style="color:var(--amber)">${due.length}</strong></span>
    </div>
    ${due.length === 0
      ? `<div class="card empty">今天没有到期的卡片 🎉<br><br><button class="btn" onclick="startCards(true)">自由练习全部卡片</button></div>`
      : `<div class="card" style="text-align:center;padding:40px 20px">
          <div style="font-size:17px;margin-bottom:16px">有 <strong style="color:var(--amber)">${due.length}</strong> 张卡片等待复习</div>
          <button class="btn primary" onclick="startCards(false)">开始复习</button>
        </div>`}
    ${footer()}`;
    return;
  }
  showCard();
}

function startCards(freeMode) {
  const pool = freeMode ? [...FLASHCARDS] : dueCardsList();
  // 洗牌
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  cardSession = { pool, index: 0, flipped: false, freeMode, finished: false };
  touchStudyDay();
  showCard();
}

function showCard() {
  const cs = cardSession;
  if (cs.index >= cs.pool.length) {
    cs.finished = true;
    $("#app").innerHTML = `
    <div class="card" style="text-align:center;padding:46px 20px">
      <div style="font-size:38px">🎉</div>
      <div style="font-size:18px;font-weight:700;margin:8px 0">本轮复习完成（${cs.pool.length} 张）</div>
      <p class="notice">明天再来，间隔重复的魔法来自坚持。</p>
      <div style="margin-top:18px"><a class="btn primary" href="#/cards" onclick="cardSession=null">返回</a></div>
    </div>${footer()}`;
    return;
  }
  const c = cs.pool[cs.index];
  $("#app").innerHTML = `
  <h1 class="page-title">智能闪卡</h1>
  <div class="quiz-progress">第 ${cs.index + 1} / ${cs.pool.length} 张 ${cs.freeMode ? "· 自由练习（不影响复习计划）" : ""}</div>
  <div class="card flashcard" onclick="flipCard()">
    <span class="tag">${esc(c.tag)}</span>
    <div style="margin-top:14px" id="card-face">
      ${cs.flipped
        ? `<div class="back-text">${esc(c.back)}</div>`
        : `<div class="front-text">${esc(c.front)}</div>`}
    </div>
    <div class="hint">${cs.flipped ? "根据回忆情况选择下方按钮" : "点击卡片查看答案"}</div>
  </div>
  <div class="card-actions">
    ${cs.flipped ? `
      <button class="btn" style="border-color:var(--red);color:#ffb4b4" onclick="gradeCard(false)">😵 没记住</button>
      <button class="btn" style="border-color:var(--green);color:#9ff0c8" onclick="gradeCard(true)">😎 记住了</button>
    ` : `<button class="btn" onclick="flipCard()">翻面</button>`}
  </div>${footer()}`;
}

function flipCard() { cardSession.flipped = !cardSession.flipped; showCard(); }

function gradeCard(remembered) {
  const c = cardSession.pool[cardSession.index];
  if (!cardSession.freeMode) {
    const rec = state.srs[c.id] || { box: 0, due: 0 };
    rec.box = remembered ? Math.min(rec.box + 1, SRS_INTERVALS.length - 1) : 0;
    rec.due = Date.now() + SRS_INTERVALS[rec.box] * 86400000;
    state.srs[c.id] = rec;
    saveState();
  }
  cardSession.index++;
  cardSession.flipped = false;
  showCard();
}

/* ---------------- 页面：转型求职 ---------------- */
function renderCareer() {
  const cats = [...new Set(INTERVIEW_QA.map(x => x.cat))];
  $("#app").innerHTML = `
  <h1 class="page-title">转型求职</h1>
  <p class="page-sub">岗位定位与面试准备相关内容在「阶段六」课程中系统讲解，这里是高频面试题速查库——建议配合闪卡反复巩固。</p>
  <div class="card" style="margin-bottom:18px">
    <div style="font-weight:700;margin-bottom:8px">🧭 快速导航</div>
    <div class="suggest-chips">
      <button class="chip" onclick="location.hash='#/lesson/s6l1'">AI 岗位地图</button>
      <button class="chip" onclick="location.hash='#/lesson/s6l2'">简历与作品集</button>
      <button class="chip" onclick="location.hash='#/lesson/s6l3'">面试系统准备</button>
      <button class="chip" onclick="location.hash='#/lesson/s6l4'">求职执行策略</button>
    </div>
  </div>
  <h2 style="font-size:19px;margin:8px 0 14px">高频面试题（${INTERVIEW_QA.length} 题）</h2>
  ${cats.map(cat => `
    <h3 style="font-size:15px;color:var(--text-dim);margin:18px 0 8px">${esc(cat)}</h3>
    ${INTERVIEW_QA.filter(x => x.cat === cat).map(x => `
      <details class="qa"><summary>${esc(x.q)}</summary><div class="answer">${esc(x.a)}</div></details>
    `).join("")}
  `).join("")}
  ${footer()}`;
}

/* ---------------- 页面：术语表 ---------------- */
function renderGlossary() {
  $("#app").innerHTML = `
  <h1 class="page-title">AI 术语表</h1>
  <p class="page-sub">${GLOSSARY.length} 个核心术语。读文章、看论文遇到生词随时回来查。</p>
  <input class="search-box" id="gloss-search" placeholder="🔍 搜索术语（中文或英文）..." oninput="filterGloss()">
  <div id="gloss-list"></div>
  ${footer()}`;
  filterGloss();
}

function filterGloss() {
  const kw = ($("#gloss-search")?.value || "").trim().toLowerCase();
  const list = GLOSSARY.filter(g =>
    !kw || g.term.toLowerCase().includes(kw) || g.en.toLowerCase().includes(kw) || g.def.toLowerCase().includes(kw));
  $("#gloss-list").innerHTML = list.length
    ? list.map(g => `
      <div class="card gloss-item" style="margin-bottom:10px">
        <strong>${esc(g.term)}</strong><span class="en">${esc(g.en)}</span>
        <p>${esc(g.def)}</p>
      </div>`).join("")
    : `<div class="empty">没有匹配的术语</div>`;
}

/* ---------------- 页脚 ---------------- */
function footer() {
  return `<div class="footer-note">AI 学径 · 数据保存在本地浏览器 · 学习是一场长跑，今天的你已经领先了昨天的自己</div>`;
}

/* Skinomakase — Body Map
 * 랜딩: 인체 도면을 중심으로 도안이 하나의 원을 이루고, 직선 색선으로 몸에 이어진다.
 * 원은 아주 천천히 시계방향으로 돈다. 마우스를 올리면 멈춘다.
 * 도안을 몸 위에 올리면 그때만 조작 UI가 나타난다. → 다음 → 문의.
 */
(() => {
'use strict';

const CFG = window.SKM_CONFIG || {};
const BODY = window.SKM_BODY;
const BW = BODY.W, BH = BODY.H;
const CX = BW / 2, CY = BH / 2;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const brushRing = document.getElementById('brushring');
const $ = s => document.querySelector(s);
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const TAU = Math.PI * 2;
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── 상태 ─────────────────────────────── */
let catalog = [];
let nodes = [];
let items = [];
let sel = [];
let tool = 'select';
let brush = 52;
let hover = null;
let carry = null;
let uid = 0;
let spin = 0;                       // 원 전체 회전각
const SPIN_RATE = 0.030;            // rad/s — 한 바퀴 약 3분 30초
const cam = { s: 1, x: 0, y: 0 };
const imgCache = new Map();
const undoStack = [], redoStack = [];

const NODE = 430;                   // 도안 한 칸 크기(월드)
let RING_R = 3800;
let SCENE = [0, 0, 1, 1];

/* ── 다국어 ───────────────────────────── */
const I18N = window.SKM_I18N;
let lang = 'ko';
function detectLang() {
  try {
    const saved = localStorage.getItem('skm-lang');
    if (saved && I18N[saved]) return saved;
  } catch (_) {}
  const nav = (navigator.language || 'ko').toLowerCase();
  const hit = I18N.langs.find(l => nav.startsWith(l.code));
  return hit ? hit.code : 'en';
}
function t(key, vars) {
  let str = (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  if (vars) for (const k in vars) str = str.replace('{' + k + '}', vars[k]);
  return str;
}
function applyLang(code) {
  lang = I18N[code] ? code : 'en';
  try { localStorage.setItem('skm-lang', lang); } catch (_) {}
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.querySelectorAll('[data-i18n-title]').forEach(el => { el.title = t(el.dataset.i18nTitle); });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  $('#globe-code').textContent = lang.toUpperCase();
  $('#globe').title = t('langTitle');
  buildZones(); buildSwatches(); buildLangMenu();
  syncToolHint(); syncUI(); invalidate();
}
function buildLangMenu() {
  const m = $('#langmenu'); m.innerHTML = '';
  for (const l of I18N.langs) {
    const b = document.createElement('button');
    b.innerHTML = `<span>${l.native}</span><i>${l.code.toUpperCase()}</i>`;
    if (l.code === lang) b.classList.add('on');
    b.onclick = () => { applyLang(l.code); closeLangMenu(); };
    m.appendChild(b);
  }
}
function openLangMenu() { $('#langmenu').hidden = false; $('#globe').setAttribute('aria-expanded', 'true'); }
function closeLangMenu() { $('#langmenu').hidden = true; $('#globe').setAttribute('aria-expanded', 'false'); }
document.addEventListener('pointerdown', e => {
  if (!e.target.closest('.langwrap')) closeLangMenu();
}, true);

/* ── 유틸 ─────────────────────────────── */
function toast(msg, err) {
  const t = $('#toast');
  t.textContent = msg; t.classList.toggle('err', !!err); t.hidden = false;
  clearTimeout(t._t); t._t = setTimeout(() => t.hidden = true, 2600);
}
function loadImage(src) {
  if (imgCache.has(src)) return imgCache.get(src);
  const p = new Promise((res, rej) => {
    const im = new Image();
    im.crossOrigin = 'anonymous';
    im.onload = () => { p._el = im; res(im); };
    im.onerror = () => rej(new Error('load fail'));
    im.src = src;
  });
  imgCache.set(src, p);
  return p;
}
const elOf = src => { const p = imgCache.get(src); return p && p._el; };

/* ── 히스토리 ─────────────────────────── */
const snap = () => JSON.stringify(items.map(({ _cv, ...rest }) => rest));
function pushUndo() {
  undoStack.push(snap());
  if (undoStack.length > 40) undoStack.shift();
  redoStack.length = 0;
}
function applyState(json) {
  items = JSON.parse(json).map(o => Object.assign({}, o, { dirty: true, _cv: null }));
  sel = sel.filter(id => items.some(i => i.id === id));
}
function undo() { if (undoStack.length) { redoStack.push(snap()); applyState(undoStack.pop()); syncUI(); invalidate(); } }
function pushUndoAndSync() { pushUndo(); syncUI(); }
function redo() { if (redoStack.length) { undoStack.push(snap()); applyState(redoStack.pop()); syncUI(); invalidate(); } }

/* ── 원형 배치 ────────────────────────── */
function layoutNodes() {
  const n = catalog.length;
  // 도안끼리 살짝 여유를 두고 딱 한 바퀴
  RING_R = Math.max(2700, NODE * n / (TAU * 0.99));
  nodes = catalog.map((g, i) => ({
    g, i,
    a0: -Math.PI / 2 + (i / n) * TAU,     // 12시부터 시계방향
    hue: Math.round((i / n) * 360),
    w: NODE, h: NODE,
  }));
  // 썸네일 비율에 맞춰 칸 크기 보정
  for (const nd of nodes) {
    const im = elOf(nd.g.thumb);
    if (!im) continue;
    const ar = im.naturalWidth / im.naturalHeight;
    nd.w = ar >= 1 ? NODE : NODE * ar;
    nd.h = ar >= 1 ? NODE / ar : NODE;
  }
  const R = RING_R + NODE * 1.05;
  SCENE = [CX - R, CY - R, R * 2, R * 2];
}
const angleOf = nd => nd.a0 + spin;
function posOf(nd) {
  const a = angleOf(nd);
  return { x: CX + Math.cos(a) * RING_R, y: CY + Math.sin(a) * RING_R };
}
/* 몸 외곽선 위 시작점 — 12시에서 시계방향으로 잰 비율 */
function anchorOf(nd) {
  const a = angleOf(nd);
  const f = ((((a + Math.PI / 2) % TAU) + TAU) % TAU) / TAU;
  return BODY.sideAt(f);
}

/* ── 카메라 ───────────────────────────── */
const PAD = { x: 26, top: 30, bottom: 30 };
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(innerWidth * dpr);
  canvas.height = Math.round(innerHeight * dpr);
  canvas._dpr = dpr; canvas._w = innerWidth; canvas._h = innerHeight;
}
function boxToCam(box, pad) {
  pad = pad || PAD;
  const [bx, by, bw, bh] = box;
  const aw = canvas._w - pad.x * 2, ah = canvas._h - pad.top - pad.bottom;
  const s = clamp(Math.min(aw / bw, ah / bh), .008, 8);
  return { s, x: pad.x + aw / 2 - (bx + bw / 2) * s, y: pad.top + ah / 2 - (by + bh / 2) * s };
}
function clampCam() {
  cam.s = clamp(cam.s, .008, 8);
  const [sx, sy, sw, sh] = SCENE;
  const vw = canvas._w, vh = canvas._h, ww = sw * cam.s, wh = sh * cam.s;
  cam.x = ww <= vw ? (vw - ww) / 2 - sx * cam.s : clamp(cam.x, vw - (sx + sw) * cam.s, -sx * cam.s);
  cam.y = wh <= vh ? (vh - wh) / 2 - sy * cam.s : clamp(cam.y, vh - (sy + sh) * cam.s, -sy * cam.s);
}
const toWorld = (px, py) => ({ x: (px - cam.x) / cam.s, y: (py - cam.y) / cam.s });
const bodyBox = () => BODY.ZONES[0].box;

/* 카메라 트윈 */
let tween = null;
function flyTo(box, dur, pad) {
  const to = boxToCam(box, pad);
  if (REDUCED) { Object.assign(cam, to); clampCam(); invalidate(); return; }
  tween = { from: { s: cam.s, x: cam.x, y: cam.y }, to, t0: performance.now(), dur: dur || 660 };
}

/* ── 아이템 렌더 (지우개 · 색) ────────── */
function buildRender(it) {
  const im = elOf(it.src); if (!im) return null;
  const cv = it._cv || (it._cv = document.createElement('canvas'));
  cv.width = it.baseW; cv.height = it.baseH;
  const c = cv.getContext('2d');
  c.clearRect(0, 0, cv.width, cv.height);
  c.drawImage(im, 0, 0, cv.width, cv.height);

  let mask = null, m = null, st = null;
  const trace = c2 => {
    c2.beginPath(); c2.moveTo(st.p[0], st.p[1]);
    for (let i = 2; i < st.p.length; i += 2) c2.lineTo(st.p[i], st.p[i + 1]);
    if (st.p.length === 2) c2.lineTo(st.p[0] + .01, st.p[1]);
    c2.stroke();
  };
  for (st of it.strokes) {
    if (st.mode === 'erase') {
      c.save();
      c.lineCap = c.lineJoin = 'round';
      c.globalCompositeOperation = 'destination-out';
      c.lineWidth = st.r * 2; trace(c);
      c.restore();
    } else {
      if (!mask) { mask = document.createElement('canvas'); mask.width = cv.width; mask.height = cv.height; m = mask.getContext('2d'); }
      m.setTransform(1, 0, 0, 1, 0, 0);
      m.globalCompositeOperation = 'source-over';
      m.clearRect(0, 0, mask.width, mask.height);
      m.lineCap = m.lineJoin = 'round'; m.strokeStyle = '#000'; m.lineWidth = st.r * 2;
      trace(m);
      m.globalCompositeOperation = 'source-in';
      m.drawImage(im, 0, 0, mask.width, mask.height);
      c.drawImage(mask, 0, 0);
    }
  }
  if (it.color) {
    c.globalCompositeOperation = 'source-in';
    c.fillStyle = it.color; c.fillRect(0, 0, cv.width, cv.height);
    c.globalCompositeOperation = 'source-over';
  }
  it.dirty = false;
  return cv;
}
const renderOf = it => (it.dirty || !it._cv ? buildRender(it) : it._cv);

/* ── 원 투명도 ────────────────────────── */
function ringAlpha() {
  const wide = boxToCam(SCENE).s, close = boxToCam(bodyBox()).s;
  if (wide >= close) return 1;
  const k = clamp((cam.s - close) / (wide - close), 0, 1);
  return Math.pow(k, .75) * .94 + .06;
}

/* ── 그리기 ───────────────────────────── */
const MONO = '"IBM Plex Mono", ui-monospace, monospace';
const ROT_ARM = 34;   // 회전 손잡이 팔 길이(화면 px)
const HAIR = 'rgba(18,17,13,.22)';
const HAIR2 = 'rgba(18,17,13,.10)';

/* 도면 시트 — 바깥 테두리, 모서리 브래킷, 중심 십자선 */
function drawSheet(c, ra) {
  const [sx, sy, sw, sh] = SCENE;
  const px = 1 / cam.s;
  const inset = Math.min(sw, sh) * .012;
  const x0 = sx + inset, y0 = sy + inset, x1 = sx + sw - inset, y1 = sy + sh - inset;

  c.save();
  c.globalAlpha = ra;
  c.lineWidth = px;

  // 테두리
  c.strokeStyle = HAIR2;
  c.strokeRect(x0, y0, x1 - x0, y1 - y0);

  // 모서리 브래킷
  c.strokeStyle = HAIR;
  c.lineWidth = 1.4 * px;
  const b = Math.min(sw, sh) * .035;
  for (const [cx0, cy0, dx, dy] of [[x0,y0,1,1],[x1,y0,-1,1],[x0,y1,1,-1],[x1,y1,-1,-1]]) {
    c.beginPath();
    c.moveTo(cx0 + dx * b, cy0); c.lineTo(cx0, cy0); c.lineTo(cx0, cy0 + dy * b);
    c.stroke();
  }

  // 중심 십자선
  c.strokeStyle = HAIR2;
  c.lineWidth = px;
  c.setLineDash([14 * px, 10 * px, 3 * px, 10 * px]);
  c.beginPath();
  c.moveTo(x0, CY); c.lineTo(x1, CY);
  c.moveTo(CX, y0); c.lineTo(CX, y1);
  c.stroke();
  c.setLineDash([]);

  // 안내 원 + 각 도안 자리의 눈금
  c.strokeStyle = HAIR2;
  c.beginPath(); c.arc(CX, CY, RING_R, 0, TAU); c.stroke();
  c.strokeStyle = HAIR;
  c.beginPath();
  for (const nd of nodes) {
    const a = angleOf(nd), t = RING_R - NODE * .62, t2 = RING_R - NODE * .5;
    c.moveTo(CX + Math.cos(a) * t, CY + Math.sin(a) * t);
    c.lineTo(CX + Math.cos(a) * t2, CY + Math.sin(a) * t2);
  }
  c.stroke();

  c.restore();
}

function draw() {
  const c = ctx;
  c.setTransform(canvas._dpr, 0, 0, canvas._dpr, 0, 0);
  c.fillStyle = '#FFFFFF';
  c.fillRect(0, 0, canvas._w, canvas._h);
  c.translate(cam.x, cam.y);
  c.scale(cam.s, cam.s);

  const ra = ringAlpha();
  const px = 1 / cam.s;

  if (ra > .02) drawSheet(c, ra * .9);

  // 직선 리더선
  if (ra > .02) {
    c.save();
    c.lineCap = 'butt';
    for (const nd of nodes) {
      const a = anchorOf(nd), p = posOf(nd);
      const isHot = hover === nd;
      const dx = p.x - a.x, dy = p.y - a.y, len = Math.hypot(dx, dy) || 1;
      const ux = dx / len, uy = dy / len;
      const gap = Math.min(nd.w, nd.h) * .56;
      const ex = p.x - ux * gap, ey = p.y - uy * gap;
      c.globalAlpha = ra * (isHot ? 1 : .62);
      c.strokeStyle = `hsl(${nd.hue} 62% ${isHot ? 42 : 56}%)`;
      c.lineWidth = (isHot ? 2.6 : 1) * px;
      c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(ex, ey); c.stroke();
      // 끝 눈금
      c.beginPath();
      c.moveTo(ex - uy * 9 * px, ey + ux * 9 * px);
      c.lineTo(ex + uy * 9 * px, ey - ux * 9 * px);
      c.stroke();
      // 시작 점
      c.globalAlpha = ra;
      c.fillStyle = `hsl(${nd.hue} 62% 50%)`;
      c.beginPath(); c.arc(a.x, a.y, (isHot ? 4.5 : 2.4) * px, 0, TAU); c.fill();
    }
    c.restore();
  }

  // 몸 — 가는 제도선
  BODY.draw(c, { fill: '#FFFFFF', stroke: '#12110D', lineWidth: clamp(1.4 * px, .6, 4) });

  for (const it of items) {
    const cv = renderOf(it); if (!cv) continue;
    c.save();
    c.globalAlpha = it.alpha;
    c.translate(it.x, it.y); c.rotate(it.rot * Math.PI / 180);
    c.scale(it.flip ? -1 : 1, 1);
    c.drawImage(cv, -it.w / 2, -it.h / 2, it.w, it.h);
    c.restore();
  }

  // 선택 표시 — 3분할 격자 + 모서리 손잡이 + 회전 손잡이
  const marked = items.filter(i => sel.includes(i.id));
  if (marked.length) {
    c.save();
    for (const it of marked) {
      const only = marked.length === 1;
      c.save();
      c.translate(it.x, it.y); c.rotate(it.rot * Math.PI / 180);
      const hw = it.w / 2, hh = it.h / 2;

      // 격자
      c.strokeStyle = 'rgba(255,74,56,.28)'; c.lineWidth = .8 * px;
      c.beginPath();
      for (let k = 1; k <= 2; k++) {
        c.moveTo(-hw + it.w * k / 3, -hh); c.lineTo(-hw + it.w * k / 3, hh);
        c.moveTo(-hw, -hh + it.h * k / 3); c.lineTo(hw, -hh + it.h * k / 3);
      }
      c.stroke();

      // 테두리
      c.strokeStyle = '#FF4A38'; c.lineWidth = 1.2 * px;
      c.strokeRect(-hw, -hh, it.w, it.h);

      if (only && tool === 'select') {
        // 회전 손잡이
        c.beginPath();
        c.moveTo(0, -hh); c.lineTo(0, -hh - ROT_ARM * px);
        c.stroke();
        c.fillStyle = '#FF4A38';
        c.beginPath(); c.arc(0, -hh - ROT_ARM * px, 5.5 * px, 0, TAU); c.fill();
        c.strokeStyle = '#fff'; c.lineWidth = 1.4 * px;
        c.beginPath(); c.arc(0, -hh - ROT_ARM * px, 5.5 * px, 0, TAU); c.stroke();

        // 모서리 손잡이
        c.strokeStyle = '#FF4A38'; c.lineWidth = 1.2 * px;
        c.fillStyle = '#fff';
        const r = 5 * px;
        for (const [dx, dy] of [[-1,-1],[1,-1],[1,1],[-1,1]]) {
          c.beginPath(); c.arc(dx * hw, dy * hh, r, 0, TAU); c.fill(); c.stroke();
        }
      }
      c.restore();
    }
    c.restore();
  }

  // 지우개·복구 대상 표시
  if (tool !== 'select') {
    const target = items.find(i => i.id === sel[0]);
    if (target) {
      c.save();
      c.translate(target.x, target.y); c.rotate(target.rot * Math.PI / 180);
      c.setLineDash([9 * px, 7 * px]);
      c.strokeStyle = tool === 'restore' ? '#1F7A55' : '#12110D';
      c.lineWidth = 1.2 * px;
      c.strokeRect(-target.w / 2, -target.h / 2, target.w, target.h);
      c.restore();
    }
  }

  // 원 위의 도안 + 번호
  if (ra > .02) {
    c.save();
    for (const nd of nodes) {
      const im = elOf(nd.g.thumb); if (!im) continue;
      const p = posOf(nd);
      const isHot = hover === nd;
      const k = isHot ? 1.3 : 1;
      c.globalAlpha = ra;
      c.save();
      c.translate(p.x, p.y); c.scale(k, k);
      c.drawImage(im, -nd.w / 2, -nd.h / 2, nd.w, nd.h);
      c.restore();

      // 바깥쪽 라벨
      const a = angleOf(nd);
      const lr = RING_R + Math.max(nd.w, nd.h) * (isHot ? .96 : .62);
      const lx = CX + Math.cos(a) * lr, ly = CY + Math.sin(a) * lr;
      c.globalAlpha = ra * (isHot ? 1 : .55);
      c.fillStyle = isHot ? `hsl(${nd.hue} 62% 42%)` : 'rgba(18,17,13,.6)';
      c.font = `${(isHot ? 13 : 10) * px}px ${MONO}`;
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText(isHot ? nd.g.id.toUpperCase() : String(nd.i + 1).padStart(2, '0'), lx, ly);
    }
    c.restore();
  }

  if (carry) {
    const im = elOf(carry.g.thumb) || elOf(carry.g.src);
    if (im) {
      c.save(); c.globalAlpha = .9;
      c.drawImage(im, carry.x - carry.w / 2, carry.y - carry.h / 2, carry.w, carry.h);
      c.restore();
    }
  }

  c.setTransform(canvas._dpr, 0, 0, canvas._dpr, 0, 0);
}

/* ── 프레임 루프 ──────────────────────── */
let dirty = true, last = 0;
const invalidate = () => { dirty = true; };
function spinning() {
  return !REDUCED && ringAlpha() > .06 && !hover && !carry && !tween && $('#sheet').hidden && $('#pv').hidden;
}
function frame(now) {
  const dt = last ? Math.min((now - last) / 1000, .05) : 0;
  last = now;

  if (tween) {
    const k = Math.min(1, (now - tween.t0) / tween.dur), e = 1 - Math.pow(1 - k, 3);
    cam.s = tween.from.s + (tween.to.s - tween.from.s) * e;
    cam.x = tween.from.x + (tween.to.x - tween.from.x) * e;
    cam.y = tween.from.y + (tween.to.y - tween.from.y) * e;
    clampCam();
    if (k >= 1) { tween = null; syncUI(); }
    dirty = true;
  }
  if (spinning()) { spin = (spin + SPIN_RATE * dt) % TAU; dirty = true; }

  if (dirty) { draw(); dirty = false; }
  requestAnimationFrame(frame);
}

/* ── 히트 테스트 ──────────────────────── */
const hitCv = document.createElement('canvas');
const hitCtx = hitCv.getContext('2d', { willReadFrequently: true });
hitCv.width = hitCv.height = 1;

function toLocal(it, wx, wy) {
  const dx = wx - it.x, dy = wy - it.y, rad = -it.rot * Math.PI / 180;
  let lx = dx * Math.cos(rad) - dy * Math.sin(rad);
  const ly = dx * Math.sin(rad) + dy * Math.cos(rad);
  if (it.flip) lx = -lx;
  return { lx, ly };
}
function toPixel(it, wx, wy) {
  const { lx, ly } = toLocal(it, wx, wy);
  return { px: (lx + it.w / 2) / it.w * it.baseW, py: (ly + it.h / 2) / it.h * it.baseH };
}
function hitItem(wx, wy) {
  for (let i = items.length - 1; i >= 0; i--) {
    const it = items[i];
    const { lx, ly } = toLocal(it, wx, wy);
    if (Math.abs(lx) > it.w / 2 || Math.abs(ly) > it.h / 2) continue;
    const cv = renderOf(it); if (!cv) return it;
    const { px, py } = toPixel(it, wx, wy);
    hitCtx.clearRect(0, 0, 1, 1);
    hitCtx.drawImage(cv, Math.floor(px), Math.floor(py), 1, 1, 0, 0, 1, 1);
    if (hitCtx.getImageData(0, 0, 1, 1).data[3] > 12) return it;
  }
  return null;
}
function hitNode(wx, wy) {
  if (ringAlpha() < .3) return null;
  let best = null, bestD = Infinity;
  for (const nd of nodes) {
    const p = posOf(nd);
    if (Math.abs(wx - p.x) > nd.w / 2 || Math.abs(wy - p.y) > nd.h / 2) continue;
    const d = Math.hypot(wx - p.x, wy - p.y);
    if (d < bestD) { bestD = d; best = nd; }
  }
  return best;
}
function hitHandle(wx, wy) {
  if (tool !== 'select' || sel.length !== 1) return null;
  const it = items.find(i => i.id === sel[0]); if (!it) return null;
  const r = 14 / cam.s;
  const { lx, ly } = toLocal(it, wx, wy);
  if (Math.hypot(lx, ly + it.h / 2 + ROT_ARM / cam.s) < r) return { it, rot: true };
  for (const [sx, sy] of [[-1,-1],[1,-1],[1,1],[-1,1]]) {
    if (Math.hypot(lx - sx * it.w / 2, ly - sy * it.h / 2) < r) return { it, sx, sy };
  }
  return null;
}

/* ── 몸에 올리기 ──────────────────────── */
async function placeNode(g, wx, wy) {
  const im = await loadImage(g.src).catch(() => null);
  if (!im) return;
  pushUndo();
  const k = 460 / Math.max(im.naturalWidth, im.naturalHeight);
  const it = {
    id: 'i' + (++uid), gid: g.id, src: g.src, thumb: g.thumb,
    x: wx, y: wy, baseW: im.naturalWidth, baseH: im.naturalHeight,
    w: im.naturalWidth * k, h: im.naturalHeight * k,
    rot: 0, alpha: 1, flip: false, color: null, strokes: [], dirty: true, _cv: null,
  };
  const first = items.length === 0;
  items.push(it); sel = [it.id];
  syncUI(); invalidate();
  if (first) flyTo(bodyBox(), 760, { x: 44, top: 78, bottom: 100 });
}

/* ── 포인터 ───────────────────────────── */
let drag = null;
const evW = e => toWorld(e.clientX, e.clientY);

canvas.addEventListener('pointerdown', e => {
  canvas.setPointerCapture(e.pointerId);
  const p = evW(e);

  if (tool !== 'select') {
    const it = items.find(i => i.id === sel[0]) || hitItem(p.x, p.y);
    if (!it) { toast(t('t_pick_first'), true); return; }
    sel = [it.id]; pushUndo();
    const r = brush / 2 / cam.s * (it.baseW / it.w);
    const { px, py } = toPixel(it, p.x, p.y);
    const stroke = { mode: tool, r, p: [px, py] };
    it.strokes.push(stroke); it.dirty = true;
    drag = { mode: 'brush', it, stroke };
    invalidate(); return;
  }

  const h = hitHandle(p.x, p.y);
  if (h) {
    pushUndo(); syncUI();
    drag = h.rot
      ? { mode: 'rotate', it: h.it, rot0: h.it.rot,
          a0: Math.atan2(p.y - h.it.y, p.x - h.it.x) }
      : { mode: 'scale', it: h.it, w: h.it.w, hh: h.it.h,
          d: Math.hypot(p.x - h.it.x, p.y - h.it.y) || 1 };
    return;
  }

  const it = hitItem(p.x, p.y);
  if (it) {
    if (e.shiftKey) sel = sel.includes(it.id) ? sel.filter(i => i !== it.id) : sel.concat(it.id);
    else if (!sel.includes(it.id)) sel = [it.id];
    pushUndo();
    drag = { mode: 'move', start: p, orig: items.filter(i => sel.includes(i.id)).map(i => ({ i, x: i.x, y: i.y })) };
    syncUI(); invalidate(); return;
  }

  const nd = hitNode(p.x, p.y);
  if (nd) {
    carry = { g: nd.g, x: p.x, y: p.y, w: nd.w, h: nd.h, moved: false };
    drag = { mode: 'carry' };
    canvas.className = 'grabbing';
    invalidate(); return;
  }

  sel = [];
  drag = { mode: 'pan', sx: e.clientX, sy: e.clientY, cx: cam.x, cy: cam.y };
  canvas.className = 'grabbing';
  syncUI(); invalidate();
});

let lastPointer = null;
function moveBrushRing(x, y) {
  if (x != null) lastPointer = { x, y };
  if (tool === 'select' || !lastPointer) { brushRing.hidden = true; return; }
  const d = Math.max(10, brush);   // 브러시는 화면 픽셀 기준
  brushRing.hidden = false;
  brushRing.classList.toggle('restore', tool === 'restore');
  brushRing.style.left = lastPointer.x + 'px';
  brushRing.style.top = lastPointer.y + 'px';
  brushRing.style.width = brushRing.style.height = d + 'px';
  $('#brushring-v').textContent = brush;
}

canvas.addEventListener('pointermove', e => {
  const p = evW(e);
  moveBrushRing(e.clientX, e.clientY);
  if (!drag) {
    const nd = hitNode(p.x, p.y);
    const it = tool === 'select' ? hitItem(p.x, p.y) : null;
    if (nd !== hover) { hover = nd; invalidate(); }
    const onHandle = hitHandle(p.x, p.y);
    canvas.className = tool !== 'select' ? 'brushing'
      : onHandle ? (onHandle.rot ? 'rotating' : 'sizing')
      : it ? 'moving' : nd ? 'pointing' : '';
    return;
  }
  if (drag.mode === 'brush') {
    const { px, py } = toPixel(drag.it, p.x, p.y);
    drag.stroke.p.push(px, py); drag.it.dirty = true; invalidate();
  } else if (drag.mode === 'move') {
    const dx = p.x - drag.start.x, dy = p.y - drag.start.y;
    for (const o of drag.orig) { o.i.x = o.x + dx; o.i.y = o.y + dy; }
    invalidate();
  } else if (drag.mode === 'rotate') {
    const a = Math.atan2(p.y - drag.it.y, p.x - drag.it.x);
    let deg = drag.rot0 + (a - drag.a0) * 180 / Math.PI;
    if (e.shiftKey) deg = Math.round(deg / 15) * 15;
    drag.it.rot = ((deg + 180) % 360 + 360) % 360 - 180;
    syncSliders(); invalidate();
  } else if (drag.mode === 'scale') {
    const k = clamp(Math.hypot(p.x - drag.it.x, p.y - drag.it.y) / drag.d, .05, 8);
    drag.it.w = drag.w * k; drag.it.h = drag.hh * k;
    syncSliders(); invalidate();
  } else if (drag.mode === 'carry') {
    carry.x = p.x; carry.y = p.y; carry.moved = true; invalidate();
  } else if (drag.mode === 'pan') {
    cam.x = drag.cx + (e.clientX - drag.sx);
    cam.y = drag.cy + (e.clientY - drag.sy);
    clampCam(); invalidate(); syncUI();
  }
});

function release(e) {
  if (drag && drag.mode === 'carry' && carry) {
    const g = carry.g, moved = carry.moved, t = { x: carry.x, y: carry.y };
    carry = null;
    if (moved) placeNode(g, t.x, t.y);
    else openPreview(g);          // 탭 → 크게 보기
  }
  drag = null;
  canvas.className = tool !== 'select' ? 'brushing' : '';
  try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
  invalidate();
}
canvas.addEventListener('pointerup', release);
canvas.addEventListener('pointercancel', release);
canvas.addEventListener('pointerleave', () => {
  brushRing.hidden = true;
  if (hover) { hover = null; invalidate(); }
});
canvas.addEventListener('pointerenter', e => moveBrushRing(e.clientX, e.clientY));

canvas.addEventListener('wheel', e => {
  e.preventDefault();
  tween = null;
  const before = toWorld(e.clientX, e.clientY);
  cam.s = clamp(cam.s * Math.exp(-e.deltaY * 0.0018), .008, 8);
  cam.x = e.clientX - before.x * cam.s;
  cam.y = e.clientY - before.y * cam.s;
  clampCam(); invalidate(); syncUI(); moveBrushRing();
}, { passive: false });

let pinch = null;
canvas.addEventListener('touchstart', e => {
  if (e.touches.length === 2) {
    const [a, b] = e.touches;
    pinch = { d: Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY), s: cam.s };
  }
}, { passive: true });
canvas.addEventListener('touchmove', e => {
  if (!pinch || e.touches.length !== 2) return;
  e.preventDefault();
  const [a, b] = e.touches;
  const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  const mx = (a.clientX + b.clientX) / 2, my = (a.clientY + b.clientY) / 2;
  const before = toWorld(mx, my);
  cam.s = clamp(pinch.s * (d / pinch.d), .008, 8);
  cam.x = mx - before.x * cam.s; cam.y = my - before.y * cam.s;
  clampCam(); invalidate(); syncUI();
}, { passive: false });
canvas.addEventListener('touchend', () => { pinch = null; }, { passive: true });

/* ── 도안 미리보기 ────────────────────── */
let pvGraphic = null;

function openPreview(g) {
  pvGraphic = g;
  $('#pv-img').src = g.src;          // 풀 해상도
  $('#pv').hidden = false;
  invalidate();
}
function closePreview() {
  $('#pv').hidden = true;
  pvGraphic = null;
  invalidate();
}
$('#pv').addEventListener('pointerdown', e => {
  if (e.target === $('#pv')) closePreview();
});

/* 버튼: 가슴 기본 위치에 바로 배치 */
$('#pv-add').onclick = () => {
  if (!pvGraphic) return;
  const g = pvGraphic;
  closePreview();
  placeNode(g, CX, BH * 0.24);
};

/* 미리보기 이미지를 끌어서 몸 위에 놓기 */
$('#pv-img').addEventListener('pointerdown', e => {
  if (!pvGraphic) return;
  e.preventDefault();
  const g = pvGraphic;
  const ghost = new Image();
  ghost.className = 'ghost';
  ghost.src = g.thumb;
  document.body.appendChild(ghost);
  let started = false;
  const move = ev => {
    if (!started && Math.hypot(ev.clientX - e.clientX, ev.clientY - e.clientY) > 6) {
      started = true;
      closePreview();
    }
    ghost.style.left = (ev.clientX - 60) + 'px';
    ghost.style.top = (ev.clientY - 60) + 'px';
  };
  const up = ev => {
    ghost.remove();
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerup', up);
    if (!started) return;               // 탭이었으면 미리보기 유지
    const p = toWorld(ev.clientX, ev.clientY);
    placeNode(g, p.x, p.y);
  };
  move(e);
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
});

/* ── 조작 UI ──────────────────────────── */
const COLORS = [['col_ink','#12110D'],['col_sepia','#4A342A'],['col_red','#D33A2C'],['col_blue','#2A4BC4'],['col_green','#1F7A55'],['col_white','#C9C5BC']];
function buildSwatches() {
  const box = $('#sws'); box.innerHTML = '';
  const o = document.createElement('button');
  o.className = 'sw orig'; o.textContent = t('col_orig'); o.title = t('col_orig_t');
  o.onclick = () => setColor(null); box.appendChild(o);
  for (const [name, hex] of COLORS) {
    const b = document.createElement('button');
    b.className = 'sw'; b.style.background = hex; b.title = t(name); b.dataset.hex = hex;
    b.onclick = () => setColor(hex); box.appendChild(b);
  }
  const cu = document.createElement('input');
  cu.type = 'color'; cu.title = t('col_custom');
  cu.oninput = e => setColor(e.target.value);
  box.appendChild(cu);
}
function setColor(hex) {
  const t = items.filter(i => sel.includes(i.id)); if (!t.length) return;
  pushUndo();
  for (const it of t) { it.color = hex; it.dirty = true; }
  syncUI(); invalidate();
}
function buildZones() {
  const box = $('#zones'); box.innerHTML = '';
  BODY.ZONES.forEach((z, i) => {
    const b = document.createElement('button');
    b.textContent = t('zone_' + z.id); if (i === 0) b.classList.add('on');
    b.onclick = () => {
      box.querySelectorAll('button').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      const [x, y, w, h] = z.box, m = i === 0 ? 0 : .16;
      flyTo([x - w * m, y - h * m, w * (1 + m * 2), h * (1 + m * 2)], 660,
            { x: 44, top: 78, bottom: 100 });
    };
    box.appendChild(b);
  });
}

document.querySelectorAll('.t[data-tool]').forEach(b => {
  b.onclick = () => {
    document.querySelectorAll('.t[data-tool]').forEach(x => x.classList.remove('on'));
    b.classList.add('on'); tool = b.dataset.tool;
    $('#brushwrap').hidden = tool === 'select';
    canvas.className = tool === 'select' ? '' : 'brushing';
    syncToolHint(); moveBrushRing(); invalidate();
  };
});
function syncToolHint() {
  const h = $('#toolhint');
  if (tool === 'select' || $('#bar').hidden) { h.hidden = true; return; }
  h.textContent = t(tool === 'erase' ? 'hint_erase' : 'hint_restore');
  h.hidden = false;
}
$('#brush').addEventListener('input', e => {
  brush = +e.target.value;
  $('#brush-v').textContent = brush;
  moveBrushRing();
});
function nudgeBrush(d) {
  brush = clamp(brush + d, 6, 200);
  $('#brush').value = brush; $('#brush-v').textContent = brush;
  moveBrushRing();
}

function syncSliders() {
  const it = sel.length === 1 ? items.find(i => i.id === sel[0]) : null;
  if (!it) return;
  $('#p-scale').value = clamp(Math.round(it.w / it.baseW * 100), 4, 260);
  $('#p-rot').value = Math.round(it.rot);
}
function bind(id, fn) {
  const el = $(id);
  el.addEventListener('pointerdown', () => pushUndo());
  el.addEventListener('input', e => {
    for (const it of items.filter(i => sel.includes(i.id))) fn(it, +e.target.value);
    invalidate();
  });
}
bind('#p-scale', (it, v) => { it.w = it.baseW * v / 100; it.h = it.baseH * v / 100; });
bind('#p-rot', (it, v) => { it.rot = v; });

$('#p-flip').onclick = () => {
  const t = items.filter(i => sel.includes(i.id)); if (!t.length) return;
  pushUndo(); for (const it of t) it.flip = !it.flip; invalidate();
};
$('#p-del').onclick = () => {
  if (!sel.length) return;
  pushUndo(); items = items.filter(i => !sel.includes(i.id)); sel = [];
  syncUI(); invalidate();
};
$('#p-merge').onclick = merge;
$('#b-undo').onclick = undo;
$('#b-redo').onclick = redo;

function merge() {
  const chosen = items.filter(i => sel.includes(i.id));
  if (chosen.length < 2) return;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const it of chosen) {
    const rad = it.rot * Math.PI / 180, cos = Math.cos(rad), sin = Math.sin(rad);
    for (const [dx, dy] of [[-1,-1],[1,-1],[1,1],[-1,1]]) {
      const lx = dx * it.w / 2, ly = dy * it.h / 2;
      const x = it.x + lx * cos - ly * sin, y = it.y + lx * sin + ly * cos;
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
  }
  const ww = maxX - minX, hh = maxY - minY;
  const px = Math.min(2400 / Math.max(ww, hh), 4);
  const cv = document.createElement('canvas');
  cv.width = Math.max(2, Math.round(ww * px)); cv.height = Math.max(2, Math.round(hh * px));
  const c = cv.getContext('2d');
  c.scale(px, px); c.translate(-minX, -minY);
  for (const it of items) {
    if (!sel.includes(it.id)) continue;
    const src = renderOf(it); if (!src) continue;
    c.save(); c.globalAlpha = it.alpha;
    c.translate(it.x, it.y); c.rotate(it.rot * Math.PI / 180);
    c.scale(it.flip ? -1 : 1, 1);
    c.drawImage(src, -it.w / 2, -it.h / 2, it.w, it.h);
    c.restore();
  }
  pushUndo();
  const url = cv.toDataURL('image/png');
  const idx = items.findIndex(i => sel.includes(i.id));
  items = items.filter(i => !sel.includes(i.id));
  const merged = {
    id: 'i' + (++uid), gid: '합침·' + chosen.length, src: url, thumb: url,
    x: (minX + maxX) / 2, y: (minY + maxY) / 2,
    baseW: cv.width, baseH: cv.height, w: ww, h: hh,
    rot: 0, alpha: 1, flip: false, color: null, strokes: [], dirty: true, _cv: null,
  };
  loadImage(url).then(() => { merged.dirty = true; invalidate(); });
  items.splice(Math.max(0, idx), 0, merged);
  sel = [merged.id];
  syncUI(); invalidate();
  toast(t('t_merged', { n: chosen.length }));
}

/* ── UI 표시 규칙 ─────────────────────── */
function syncUI() {
  const placed = items.length > 0, chosen = sel.length > 0;
  $('#lede').hidden = placed;
  $('#titleblock').hidden = placed;
  $('#zones').hidden = !placed;
  $('#next').hidden = !placed;
  $('#bar').hidden = !chosen;
  $('#p-merge').hidden = sel.length < 2;
  if (typeof syncToolHint === 'function') syncToolHint();
  $('#back-spread').hidden = !placed || ringAlpha() > .5;
  $('#b-undo').disabled = !undoStack.length;
  $('#b-redo').disabled = !redoStack.length;
  if (chosen) syncSliders();
  const it = sel.length === 1 ? items.find(i => i.id === sel[0]) : null;
  document.querySelectorAll('#sws .sw').forEach(s => {
    s.classList.toggle('on', !!it && (s.dataset.hex ? s.dataset.hex === it.color : !it.color));
  });
}
$('#back-spread').onclick = () => { sel = []; syncUI(); flyTo(SCENE, 820); };

/* ── 키보드 ───────────────────────────── */
addEventListener('keydown', e => {
  if (/input|textarea/i.test(e.target.tagName)) return;
  if ((e.key === 'Delete' || e.key === 'Backspace') && sel.length) { e.preventDefault(); $('#p-del').click(); }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); }
  if (e.key === 'Escape') { if (!$('#sheet').hidden) $('#sheet-close').click(); else if (!$('#pv').hidden) closePreview(); else { sel = []; syncUI(); invalidate(); } }
  if (e.key === '[') { e.preventDefault(); nudgeBrush(-6); }
  if (e.key === ']') { e.preventDefault(); nudgeBrush(6); }
  if (e.key === 'v' || e.key === 'V') document.querySelector('[data-tool=select]').click();
  if (e.key === 'e' || e.key === 'E') document.querySelector('[data-tool=erase]').click();
  if (e.key.startsWith('Arrow') && sel.length) {
    e.preventDefault();
    const d = e.shiftKey ? 16 : 3;
    const dx = e.key === 'ArrowLeft' ? -d : e.key === 'ArrowRight' ? d : 0;
    const dy = e.key === 'ArrowUp' ? -d : e.key === 'ArrowDown' ? d : 0;
    for (const it of items.filter(i => sel.includes(i.id))) { it.x += dx; it.y += dy; }
    invalidate();
  }
});

/* ── 내보내기 · 전송 ──────────────────── */
async function exportPNG(scale) {
  scale = scale || CFG.EXPORT_SCALE || 2;
  const [bx, by, bw, bh] = bodyBox();
  const out = document.createElement('canvas');
  out.width = Math.round(bw * scale / 2); out.height = Math.round(bh * scale / 2);
  const c = out.getContext('2d');
  c.scale(scale / 2, scale / 2); c.translate(-bx, -by);
  c.fillStyle = '#FFFFFF'; c.fillRect(bx, by, bw, bh);
  BODY.draw(c, { fill: '#FFFFFF', stroke: '#12110D', lineWidth: 5 });
  for (const it of items) {
    const cv = renderOf(it); if (!cv) continue;
    c.save(); c.globalAlpha = it.alpha;
    c.translate(it.x, it.y); c.rotate(it.rot * Math.PI / 180);
    c.scale(it.flip ? -1 : 1, 1);
    c.drawImage(cv, -it.w / 2, -it.h / 2, it.w, it.h);
    c.restore();
  }
  return out;
}
function payload() {
  return {
    source: 'skinomakase-body-map',
    submittedAt: new Date().toISOString(),
    canvas: { width: BW, height: BH },
    customer: {
      name: $('#f-name').value.trim(), contact: $('#f-contact').value.trim(),
      placement: $('#f-placement').value.trim(), size: $('#f-size').value.trim(),
      note: $('#f-note').value.trim(),
    },
    graphics: items.map((it, i) => ({
      order: i, graphicId: it.gid,
      file: it.src.startsWith('data:') ? null : it.src.split('/').pop(),
      merged: it.src.startsWith('data:'),
      x: Math.round(it.x), y: Math.round(it.y),
      width: Math.round(it.w), height: Math.round(it.h),
      rotation: +it.rot.toFixed(1), opacity: +it.alpha.toFixed(2),
      flipped: it.flip, color: it.color, erased: it.strokes.length > 0,
    })),
  };
}

$('#next').onclick = async () => {
  if (!items.length) return;
  const out = await exportPNG(2);
  $('#sheet-preview').src = out.toDataURL('image/png');
  $('#sheet').hidden = false;
  $('#f-name').focus();
};
$('#sheet-close').onclick = () => { $('#sheet').hidden = true; invalidate(); };
$('#sheet').addEventListener('pointerdown', e => {
  if (e.target === $('#sheet')) { $('#sheet').hidden = true; invalidate(); }
});

$('#send').onclick = async () => {
  if (!$('#f-name').value.trim() || !$('#f-contact').value.trim())
    return toast(t('t_need_name'), true);
  const btn = $('#send');
  btn.disabled = true; btn.textContent = t('sending');
  try {
    const out = await exportPNG();
    const data = payload();
    const url = CFG.WEBHOOK_URL;
    if (!url && CFG.EMAILJS && window.emailjs) {
      const g = data.graphics.map((x, i) =>
        `${i + 1}. ${x.graphicId}  pos(${x.x},${x.y})  size(${x.width}x${x.height})` +
        `  rot ${x.rotation}deg${x.flipped ? ' flipped' : ''}` +
        `${x.color ? '  color ' + x.color : ''}${x.erased ? '  (edited)' : ''}`).join('\n');
      const c2 = data.customer;
      await emailjs.send(CFG.EMAILJS.serviceId, CFG.EMAILJS.templateId, {
        name: c2.name, email: c2.contact,
        tattoo_url: 'https://placehold.co/400x300?text=Body+Map+design+(image+sent+separately)',
        vision_analysis:
          `BODY MAP PLACEMENT\n\nContact: ${c2.contact}\nPlacement: ${c2.placement || '-'}\n` +
          `Size: ${c2.size || '-'}\nNote: ${c2.note || '-'}\n\n` +
          `Canvas ${data.canvas.width}x${data.canvas.height}\n${g}\n\n` +
          `The customer also has the composed PNG — ask them to reply with it.`,
      });
      if (!CFG.NO_DOWNLOAD) {
        const a = document.createElement('a');
        a.download = `skinomakase-bodymap-${Date.now()}.png`;
        a.href = out.toDataURL('image/png'); a.click();
      }
      $('#sheet').hidden = true;
      if (window.va) va('event', { name: 'enquiry_sent' });
      toast(t('t_sent'));
      return;
    }

    if (!url) {
      if (CFG.NO_DOWNLOAD) { toast(t('t_demo')); return; }
      data.previewPng = out.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = `venue-ink-${Date.now()}.json`;
      a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
      a.click();
      toast(t('t_test'));
      return;
    }
    let res;
    if ((CFG.WEBHOOK_MODE || 'json') === 'formdata') {
      const blob = await new Promise(r => out.toBlob(r, 'image/png'));
      const fd = new FormData();
      fd.append('design', blob, `skinomakase-${Date.now()}.png`);
      fd.append('data', JSON.stringify(data));
      res = await fetch(url, { method: 'POST', headers: CFG.WEBHOOK_HEADERS || {}, body: fd });
    } else {
      data.previewPng = out.toDataURL('image/png');
      res = await fetch(url, { method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, CFG.WEBHOOK_HEADERS || {}),
        body: JSON.stringify(data) });
    }
    if (!res.ok) throw new Error('HTTP ' + res.status);
    $('#sheet').hidden = true;
    if (window.va) va('event', { name: 'enquiry_sent' });
    toast(t('t_sent'));
  } catch (err) {
    console.error(err);
    toast(t('t_fail', { e: err.message }), true);
  } finally {
    btn.disabled = false; btn.textContent = t('btn_send');
  }
};

/* ── 시작 ─────────────────────────────── */
let rt = 0;
addEventListener('resize', () => {
  clearTimeout(rt);
  rt = setTimeout(() => { resize(); clampCam(); invalidate(); syncUI(); }, 90);
});

$('#globe').onclick = e => {
  e.stopPropagation();
  $('#langmenu').hidden ? openLangMenu() : closeLangMenu();
};

/* ── 배경음악 ─────────────────────────── */
function startBgm() {
  const a = $('#bgm');
  if (!a || !a.getAttribute('src')) return;
  a.volume = 0.45;
  const tryPlay = () => a.play().then(() => true).catch(() => false);
  tryPlay().then(ok => {
    if (ok) return;
    // 자동재생이 막히면 첫 상호작용에서 시작
    const kick = () => {
      tryPlay();
      window.removeEventListener('pointerdown', kick);
      window.removeEventListener('keydown', kick);
    };
    window.addEventListener('pointerdown', kick, { once: false });
    window.addEventListener('keydown', kick, { once: false });
  });
  a.addEventListener('error', () => {}, { once: true });   // 파일 없으면 무시
}

$('#intro-start').onclick = () => {
  $('#intro').hidden = true;
  const a = $('#bgm');
  if (a && a.paused) a.play().catch(() => {});   // 클릭 제스처를 재생 허가로 활용
  invalidate();
};

(async function init() {
  startBgm();
  applyLang(detectLang());
  catalog = window.SKM_CATALOG || await (await fetch('graphics.json')).json();
  resize();
  await Promise.all(catalog.map(g => loadImage(g.thumb).catch(() => null)));
  layoutNodes();
  $('#sheet-n').textContent = String(catalog.length).padStart(2, '0');
  Object.assign(cam, boxToCam(SCENE));
  clampCam(); syncUI(); syncToolHint();
  requestAnimationFrame(frame);

  if (!REDUCED) {
    const target = { s: cam.s, x: cam.x, y: cam.y };
    cam.s = target.s * .82;
    cam.x = canvas._w / 2 - (CX) * cam.s;
    cam.y = canvas._h / 2 - (CY) * cam.s;
    setTimeout(() => flyTo(SCENE, 1000), 40);
  }
  // 큰 이미지는 뒤에서 천천히
  catalog.forEach(g => loadImage(g.src).catch(() => null));

  window.SKM = {
    get items() { return items; }, get sel() { return sel; }, get nodes() { return nodes; },
    get spin() { return spin; }, posOf, exportPNG, merge, setColor, flyTo, bodyBox, placeNode,
    setTool: t => document.querySelector(`.t[data-tool=${t}]`).click(),
    setHover: n => { hover = n; invalidate(); },
    cam,
  };
})();

})();

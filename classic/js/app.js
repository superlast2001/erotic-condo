/* Erotic Condo — 18+ fiction. All characters are fictional adults. Explicit content is text-only. */
const $ = id => document.getElementById(id);
const SAVE_KEY = "erotic_condo_save_v1", AGE_KEY = "ec_age_ok", CON_KEY = "ec_console_hidden";
const lsGet = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const rnd = (a, b) => a + Math.random() * (b - a);
const money = n => "£" + Math.round(n).toLocaleString("en-GB");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const fmt = s => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>").replace(/\n/g, "<br>");
const ZLABEL = Object.fromEntries(ZONES);
const DEFAULT_SET = { intensity: 1, outline: false, reduce: false, instant: false, decay: true, auto: false };

/* ---------- state ---------- */
function newState() {
  const res = {};
  CHAR_ORDER.forEach(id => {
    const c = CHARS[id];
    res[id] = { in: id === "wolf", bed: id === "wolf" ? 1 : -1, xp: 0, lvl: 1, trust: c.trust0, mood: 60, boost: 0, lastFin: -99, lastDate: -99, fins: 0, touches: 0, loc: id === "wolf" ? 1 : -1, zones: {} };
  });
  const rooms = Array(6).fill(null);
  rooms[0] = { type: "lounge", lvl: 1 };
  rooms[1] = { type: "bedroom", lvl: 1, res: "wolf" };
  return { v: 1, money: 2500, day: 1, floors: 3, rooms, res, log: [{ d: 1, t: "Welcome to Erotic Condo. Wolf has moved into the bedroom — build rooms and invite more residents." }], set: Object.assign({}, DEFAULT_SET), stats: { finales: 0 } };
}
let S = lsGet(SAVE_KEY, null);
if (!S || S.v !== 1) S = newState();
S.set = Object.assign({}, DEFAULT_SET, S.set || {});
CHAR_ORDER.forEach(id => { if (!S.res[id]) S.res[id] = newState().res[id]; });
let consoleHidden = !!lsGet(CON_KEY, false);
function save() { lsSet(SAVE_KEY, S); }
const levelOf = xp => LEVELS.filter(t => xp >= t).length;

/* ---------- ui helpers ---------- */
let toastT;
function toast(msg, ms = 2400) { const t = $("toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), ms); }
function openSheet(html) { $("sheet").innerHTML = html; $("modal").classList.remove("hidden"); $("sheet").scrollTop = 0; }
function closeSheet() { $("modal").classList.add("hidden"); $("sheet").innerHTML = ""; }
$("modal").addEventListener("pointerdown", e => { if (e.target === $("modal") && !$("modal").dataset.lock) closeSheet(); });
function avatar(id, cls = "") {
  const c = CHARS[id], [px, py, z] = c.face, W = z * 100;
  const posx = (0.5 - px * z) / (1 - z) * 100, posy = (0.5 - py * z * 4 / 3) / (1 - z * 4 / 3) * 100;
  return `style="background-image:url(${c.img});background-size:${W}% auto;background-position:${posx}% ${posy}%"`;
}
const avBtn = (id, cls = "") => `<button class="av ${cls}" data-av="${id}" aria-label="Open ${CHARS[id].name}" ${avatar(id)}><span class="md">${moodEmoji(S.res[id].mood)}</span></button>`;
const moodEmoji = m => m < 25 ? "😠" : m < 45 ? "😐" : m < 70 ? "🙂" : m < 88 ? "😊" : "😍";
const moodWord = m => m < 25 ? "Grumpy" : m < 45 ? "Meh" : m < 70 ? "Content" : m < 88 ? "Happy" : "Delighted";
const built = type => S.rooms.some(r => r && r.type === type);
const unlocked = type => { const l = ROOMS[type].lock; return !l || S.res[l[0]].lvl >= l[1]; };
function log(t) { S.log.push({ d: S.day, t }); if (S.log.length > 80) S.log.shift(); }

/* ---------- economy ---------- */
function rentOf(id) { const r = S.res[id], c = CHARS[id]; const bed = r.bed >= 0 && S.rooms[r.bed] ? S.rooms[r.bed].lvl : 1; return c.rent * (0.6 + r.mood / 100 * 0.8) * (1 + 0.25 * (bed - 1)); }
function econ() {
  let inc = 0, up = 0, rent = 0;
  S.rooms.forEach(r => { if (r) { inc += ROOMS[r.type].income * r.lvl; up += 10 * r.lvl; } });
  CHAR_ORDER.forEach(id => { if (S.res[id].in) rent += rentOf(id); });
  return { inc, up, rent, net: inc + rent - up };
}
function moodTarget(id) {
  const r = S.res[id], c = CHARS[id];
  const liked = c.likes.filter(t => built(t)).length;
  return clamp(38 + 12 * Math.min(3, liked) + r.lvl * 3 + r.boost, 0, 100);
}
function pickLoc(id) {
  const r = S.res[id], c = CHARS[id];
  const slots = []; S.rooms.forEach((rm, i) => { if (rm && c.likes.includes(rm.type)) slots.push(i); });
  if (slots.length && Math.random() < 0.6) r.loc = slots[Math.floor(Math.random() * slots.length)]; else r.loc = r.bed;
}
const ACT = { gym: "lifting in the gym", lounge: "napping on the lounge sofa", sauna: "steaming in the sauna", kitchen: "stealing snacks in the kitchen", library: "reading in the library", rooftop: "watching the sunset from the roof", bedroom: "sleeping in" };
function nextDay() {
  const e = econ();
  S.day++; S.money += e.net;
  const parts = [`${money(e.rent)} rent`, `${money(e.inc)} rooms`, `−${money(e.up)} upkeep`];
  log(`Day ${S.day}: ${e.net >= 0 ? "+" : "−"}${money(Math.abs(e.net))} (${parts.join(", ")}).`);
  CHAR_ORDER.forEach(id => {
    const r = S.res[id]; if (!r.in) return;
    r.mood = clamp(r.mood + (moodTarget(id) - r.mood) * 0.3 + rnd(-3, 3), 0, 100);
    r.boost = Math.max(0, r.boost - 12);
    pickLoc(id);
    if (Math.random() < 0.35) {
      const rm = S.rooms[r.loc], act = rm ? ACT[rm.type] : "relaxing";
      log(`${CHARS[id].name} was spotted ${act}.`);
    }
  });
  if (Math.random() < 0.2 && CHAR_ORDER.some(i => S.res[i].in)) { const tip = Math.round(rnd(20, 90)); S.money += tip; log(`A resident left a ${money(tip)} tip in the lobby jar.`); }
  save(); renderAll();
  toast(`Day ${S.day}: ${e.net >= 0 ? "+" : "−"}${money(Math.abs(e.net))}`);
}
function buildRoom(slot, type) {
  const d = ROOMS[type];
  if (S.rooms[slot] || !unlocked(type)) return;
  if (S.money < d.cost) return toast("Not enough money");
  S.money -= d.cost; S.rooms[slot] = { type, lvl: 1 }; if (d.housing) S.rooms[slot].res = null;
  log(`Built a ${d.name} (${money(d.cost)}).`); save(); closeSheet(); renderAll(); toast(`${d.name} built!`);
}
const upCost = r => Math.round(ROOMS[r.type].cost * 0.7 * r.lvl);
function upgradeRoom(slot) {
  const r = S.rooms[slot]; if (!r || r.lvl >= 3) return; const c = upCost(r);
  if (S.money < c) return toast("Not enough money");
  S.money -= c; r.lvl++; log(`Upgraded the ${ROOMS[r.type].name} to ${ROOMS[r.type].furn[r.lvl - 1]}.`); save(); renderAll(); openCell(slot); toast("Upgraded!");
}
const floorCost = () => 2500 * (S.floors - 2);
function addFloor() {
  if (S.floors >= 5) return; const c = floorCost();
  if (S.money < c) return toast("Not enough money");
  S.money -= c; S.floors++; S.rooms.push(null, null); log(`Added floor ${S.floors}.`); save(); renderAll(); toast("New floor built!");
}
function moveReasons(id) {
  const c = CHARS[id], out = [];
  out.push([`Move-in fee ${money(c.moveIn.cost)}`, S.money >= c.moveIn.cost]);
  c.moveIn.req.forEach(t => out.push([`${ROOMS[t].name} built`, built(t)]));
  out.push(["A vacant bedroom", freeBeds().length > 0]);
  return out;
}
const freeBeds = () => S.rooms.map((r, i) => (r && r.type === "bedroom" && !r.res) ? i : -1).filter(i => i >= 0);
function moveIn(id, slot) {
  const c = CHARS[id], r = S.res[id];
  if (r.in || !moveReasons(id).every(x => x[1])) return toast("Requirements not met");
  const bed = slot ?? freeBeds()[0];
  S.money -= c.moveIn.cost; r.in = true; r.bed = bed; r.loc = bed; r.mood = 55; S.rooms[bed].res = id;
  log(`${c.name} moved in!`); save(); closeSheet(); renderAll();
  openSheet(`<div class="center"><div class="av lg lvlart" ${avatar(id)}></div><h2>${esc(c.name)} moved in!</h2><p>${esc(c.full || c.name)}, ${c.age}. ${esc(c.bio)}</p><button class="btn primary" style="width:100%" onclick="closeSheet()">Welcome home</button></div>`);
}

/* ---------- condo rendering ---------- */
function renderBuilding() {
  let h = `<div class="sign">Erotic Condo</div><div id="roof"></div>`;
  for (let f = S.floors - 1; f >= 0; f--) {
    h += `<div class="floor">`;
    for (let k = 0; k < 2; k++) {
      const i = f * 2 + k, r = S.rooms[i];
      if (!r) { h += `<div class="cell empty" role="button" tabindex="0" data-cell="${i}"><span style="font-size:1.6rem">＋</span><span>Build room</span></div>`; continue; }
      const d = ROOMS[r.type];
      const here = CHAR_ORDER.filter(id => S.res[id].in && S.res[id].loc === i);
      h += `<div class="cell" role="button" tabindex="0" data-cell="${i}" style="background:linear-gradient(150deg,${d.color},#1a1226)"><span class="ri">${d.icon}</span><div><div class="rn">${d.name}</div><div class="pips">${"★".repeat(r.lvl)}${"☆".repeat(3 - r.lvl)}</div></div><div class="avs">${here.map(id => avBtn(id)).join("")}</div></div>`;
    }
    h += `</div>`;
  }
  h += `<div class="ground"></div>`;
  $("building").innerHTML = h;
}
function renderHud() { $("hMoney").textContent = money(S.money); $("hDay").textContent = "Day " + S.day; }
let tab = "condo";
function renderPane() {
  const p = $("pane");
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("on", b.dataset.tab === tab));
  if (tab === "condo") {
    const e = econ();
    p.innerHTML = `<div class="stat"><div><b>${money(S.money)}</b><span>Money</span></div><div><b>${e.net >= 0 ? "+" : "−"}${money(Math.abs(e.net))}</b><span>Net / day</span></div><div><b>Day ${S.day}</b><span>Time</span></div></div>
    <div class="row" style="margin-bottom:10px"><button class="btn primary" id="btnDay" style="flex:2">☀ Next day</button><button class="btn" id="btnAuto" style="flex:1">${S.set.auto ? "⏸ Auto: on" : "▶ Auto: off"}</button></div>
    <div class="card"><h4>Daily breakdown</h4><div class="mut">Rent ${money(e.rent)} · Rooms ${money(e.inc)} · Upkeep −${money(e.up)}. Happy residents pay more rent; liked rooms raise mood.</div></div>
    <div class="card"><h4>Building</h4><div class="mut">${S.floors} floors · ${S.rooms.filter(Boolean).length}/${S.rooms.length} rooms built. Tap a room (or an empty slot) in the building to build, upgrade or move someone in.</div>
    <div class="acts"><button class="btn sm gold" id="btnFloor" ${S.floors >= 5 ? "disabled" : ""}>${S.floors >= 5 ? "Max height" : "＋ Add floor " + money(floorCost())}</button></div></div>`;
    $("btnDay").onclick = nextDay;
    $("btnAuto").onclick = () => { S.set.auto = !S.set.auto; save(); renderPane(); };
    $("btnFloor").onclick = addFloor;
  } else if (tab === "people") {
    let h = "";
    CHAR_ORDER.filter(id => S.res[id].in).forEach(id => { h += resCard(id); });
    const apps = CHAR_ORDER.filter(id => !S.res[id].in);
    if (apps.length) h += `<h3 style="margin:14px 0 8px">Applicants</h3>`;
    apps.forEach(id => {
      const c = CHARS[id], rs = moveReasons(id), ok = rs.every(x => x[1]);
      h += `<div class="card"><div class="rescard"><div class="av lg" ${avatar(id)}></div><div class="info"><h4>${esc(c.name)} <span class="mut">${c.age} · ${c.species}</span></h4><div class="mut">${esc(c.tag)}</div><div class="req">${rs.map(x => `<span class="${x[1] ? "ok" : "no"}">${x[1] ? "✔" : "✖"} ${x[0]}</span>`).join(" · ")}</div></div></div><div class="acts"><button class="btn sm ${ok ? "primary" : ""}" data-info="${id}">Profile</button><button class="btn sm ${ok ? "primary" : "dis"}" data-move="${id}">Move in ${money(c.moveIn.cost)}</button></div></div>`;
    });
    p.innerHTML = h || "<p class='mut'>No residents yet.</p>";
  } else if (tab === "log") {
    p.innerHTML = `<ul class="list">${S.log.slice().reverse().map(l => `<li><b style="color:var(--gold)">D${l.d}</b> ${esc(l.t)}</li>`).join("")}</ul>`;
  } else { p.innerHTML = settingsHtml(); bindSettings(p); }
}
function resCard(id) {
  const c = CHARS[id], r = S.res[id], lvl = r.lvl, base = LEVELS[lvl - 1], nxt = LEVELS[lvl] ?? base;
  const xpp = lvl >= 5 ? 100 : (r.xp - base) / (nxt - base) * 100;
  return `<div class="card"><div class="rescard"><button class="av lg" data-av="${id}" ${avatar(id)}></button><div class="info"><h4>${esc(c.name)} <span class="mut">${c.age} · ${c.species}</span></h4>
  <div class="mut">${moodEmoji(r.mood)} ${moodWord(r.mood)} · Rent ${money(rentOf(id))}/day</div>
  <div class="bar tr"><i style="width:${r.trust}%"></i></div><div class="mut">Trust ${Math.round(r.trust)} · Affection Lv ${lvl}${lvl >= 5 ? " (max)" : ""}</div>
  <div class="bar xp"><i style="width:${xpp}%"></i></div></div></div>
  <div class="acts"><button class="btn sm primary" data-av="${id}">✋ Touch</button><button class="btn sm" data-gift="${id}">🎁 Gift</button><button class="btn sm" data-date="${id}">💞 Date</button><button class="btn sm" data-info="${id}">ℹ</button></div></div>`;
}
function renderAll() { renderHud(); renderBuilding(); renderPane(); }
document.addEventListener("click", e => {
  const t = e.target.closest("[data-av],[data-gift],[data-date],[data-info],[data-move],[data-tab],[data-cell]"); if (!t) return;
  if (t.dataset.av) return openScene(t.dataset.av);
  if (t.dataset.gift) return giftSheet(t.dataset.gift);
  if (t.dataset.date) return dateSheet(t.dataset.date);
  if (t.dataset.info) return infoSheet(t.dataset.info);
  if (t.dataset.move) return moveSheet(t.dataset.move);
  if (t.dataset.tab) { tab = t.dataset.tab; return renderPane(); }
  if (t.dataset.cell && !e.target.closest(".av")) return openCell(+t.dataset.cell);
});
document.addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && e.target.dataset && e.target.dataset.cell) { e.preventDefault(); openCell(+e.target.dataset.cell); } });

/* ---------- sheets ---------- */
function openCell(i) {
  const r = S.rooms[i];
  if (!r) {
    let h = `<h2>Build a room</h2><p class="mut">Slot ${i + 1}. Cash: ${money(S.money)}</p>`;
    Object.keys(ROOMS).forEach(t => {
      const d = ROOMS[t], ok = unlocked(t), aff = S.money >= d.cost;
      const l = d.lock;
      h += `<div class="card"><div class="row" style="justify-content:space-between;flex-wrap:nowrap"><div><h4>${d.icon} ${d.name}</h4><div class="mut">${d.blurb}</div><div class="mut">${d.income ? "Earns " + money(d.income) + "/day" : "Housing"} · Cost ${money(d.cost)}</div></div><button class="btn sm ${ok && aff ? "primary" : "dis"}" data-build="${t}">${ok ? "Build" : "🔒 " + CHARS[l[0]].name + " Lv" + l[1]}</button></div></div>`;
    });
    h += `<button class="btn" style="width:100%" onclick="closeSheet()">Close</button>`;
    openSheet(h);
    $("sheet").querySelectorAll("[data-build]").forEach(b => b.onclick = () => { if (!b.classList.contains("dis")) buildRoom(i, b.dataset.build); else toast(unlocked(b.dataset.build) ? "Not enough money" : "Locked — raise that resident's affection"); });
    return;
  }
  const d = ROOMS[r.type], here = CHAR_ORDER.filter(id => S.res[id].in && S.res[id].loc === i);
  let h = `<h2>${d.icon} ${d.name} <span class="mut">Lv ${r.lvl}/3</span></h2><p>${d.blurb}<br><span class="mut">Furniture: <b>${d.furn[r.lvl - 1]}</b>${d.income ? " · Earns " + money(d.income * r.lvl) + "/day" : ""}</span></p>`;
  if (r.type === "bedroom") {
    const occ = r.res ? CHARS[r.res] : null;
    h += `<div class="card"><h4>${occ ? "Resident: " + esc(occ.name) : "Vacant"}</h4><div class="mut">${occ ? "Pays " + money(rentOf(r.res)) + "/day" : "Move an applicant in from the People tab, or here:"}</div>`;
    if (!occ) { const apps = CHAR_ORDER.filter(id => !S.res[id].in); h += `<div class="acts">${apps.map(id => `<button class="btn sm" data-moveto="${id}">${esc(CHARS[id].name)} ${money(CHARS[id].moveIn.cost)}</button>`).join("") || "<span class='mut'>No applicants left.</span>"}</div>`; }
    h += `</div>`;
  }
  if (here.length) h += `<div class="card"><h4>Here now</h4><div class="avs row">${here.map(id => avBtn(id)).join("")}</div></div>`;
  h += `<div class="row">${r.lvl < 3 ? `<button class="btn gold" id="upg" style="flex:2">⬆ ${d.furn[r.lvl]} ${money(upCost(r))}</button>` : `<span class="mut" style="flex:2">Fully upgraded ✔</span>`}<button class="btn" style="flex:1" onclick="closeSheet()">Close</button></div>`;
  openSheet(h);
  const u = $("upg"); if (u) u.onclick = () => upgradeRoom(i);
  $("sheet").querySelectorAll("[data-moveto]").forEach(b => b.onclick = () => { const id = b.dataset.moveto; if (!moveReasons(id).every(x => x[1])) return openSheet(reqSheet(id)); moveIn(id, i); });
}
function reqSheet(id) { const rs = moveReasons(id); return `<h2>${esc(CHARS[id].name)} can't move in yet</h2><div class="req" style="font-size:.95rem;line-height:1.8">${rs.map(x => `<div class="${x[1] ? "ok" : "no"}">${x[1] ? "✔" : "✖"} ${x[0]}</div>`).join("")}</div><button class="btn" style="width:100%;margin-top:10px" onclick="closeSheet()">OK</button>`; }
function moveSheet(id) {
  const rs = moveReasons(id);
  if (!rs.every(x => x[1])) return openSheet(reqSheet(id));
  const beds = freeBeds();
  if (beds.length === 1) return moveIn(id, beds[0]);
  openSheet(`<h2>Choose a bedroom for ${esc(CHARS[id].name)}</h2><div class="grid">${beds.map(b => `<button class="gbtn" data-pick="${b}"><span class="ico">🛏️</span><span>Slot ${b + 1}<small>Lv ${S.rooms[b].lvl}</small></span></button>`).join("")}</div>`);
  $("sheet").querySelectorAll("[data-pick]").forEach(b => b.onclick = () => moveIn(id, +b.dataset.pick));
}
function infoSheet(id) {
  const c = CHARS[id], r = S.res[id];
  let h = `<div class="center"><div class="av lg lvlart" ${avatar(id)}></div></div><h2 class="center">${esc(c.full || c.name)}</h2><p class="center mut">${c.age} years old · ${c.species} · ${esc(c.tag)}</p><p>${esc(c.bio)}</p>`;
  h += `<div class="card"><div class="mut">Likes rooms: ${c.likes.map(t => ROOMS[t].icon + " " + ROOMS[t].name).join(", ")}</div>`;
  h += `<div class="mut">Favourite gift: ${r.lvl >= 2 ? GIFTS.find(g => g.id === c.fav).icon + " " + GIFTS.find(g => g.id === c.fav).name : "??? (reach Affection Lv2)"}</div>`;
  h += `<div class="mut">Favourite touch zones: ${r.fins >= 1 ? c.favZones.map(z => ZLABEL[z]).join(", ") : "??? (finish a scene together)"}</div>`;
  h += `<div class="mut">Needs Trust ≥ ${c.need} for a finale (one per day). Thighs unlock at Affection Lv2.</div></div>`;
  h += `<div class="row">${S.res[id].in ? `<button class="btn primary" style="flex:1" data-av="${id}" onclick="closeSheet()">✋ Touch</button>` : ""}<button class="btn" style="flex:1" onclick="closeSheet()">Close</button></div>`;
  if (T) h += `<button class="btn" id="setLink" style="width:100%;margin-top:8px">⚙ Settings</button>`;
  openSheet(h);
  if (T) $("setLink").onclick = settingsModal;
}
function giftSheet(id) {
  if (!S.res[id].in) return;
  const c = CHARS[id];
  openSheet(`<h2>Gift or feed ${esc(c.name)}</h2><p class="mut">Cash: ${money(S.money)}. Gifts raise trust, mood and affection.</p><div class="grid">${GIFTS.map(g => `<button class="gbtn" data-g="${g.id}"><span class="ico">${g.icon}</span><span>${g.name}<small>${money(g.cost)}</small></span></button>`).join("")}</div><button class="btn" style="width:100%;margin-top:10px" onclick="closeSheet()">Close</button>`);
  $("sheet").querySelectorAll("[data-g]").forEach(b => b.onclick = () => giveGift(id, b.dataset.g));
}
function giveGift(id, gid) {
  const g = GIFTS.find(x => x.id === gid), c = CHARS[id], r = S.res[id];
  if (S.money < g.cost) return toast("Not enough money");
  S.money -= g.cost;
  const fav = c.fav === gid;
  r.trust = clamp(r.trust + (fav ? 12 : 4), 0, 100); r.boost += fav ? 30 : 10; r.mood = clamp(r.mood + (fav ? 25 : 8), 0, 100);
  const line = fav ? c.giftFav : c.giftLike[Math.random() < 0.5 ? 0 : 1];
  log(`Gave ${c.name} ${g.name.toLowerCase()}${fav ? " (favourite!)" : ""}.`);
  addXp(id, fav ? 8 : 3); save(); renderAll(); closeSheet();
  if (T && T.id === id) { say(line); updateMeters(); toast(`${g.icon} ${fav ? "He loved it!" : "He liked it."}`); showLevelUps(); }
  else { openSheet(`<div class="center"><div class="av lg lvlart" ${avatar(id)}></div><p class="big">${fmt(line)}</p><p class="mut">${fav ? "★ Favourite gift! +12 trust" : "+4 trust"}</p><button class="btn primary" style="width:100%" onclick="closeSheet();showLevelUps()">Nice</button></div>`); }
}
function dateSheet(id) {
  const c = CHARS[id], r = S.res[id];
  if (!r.in) return;
  const done = r.lastDate === S.day;
  const tiers = [{ n: "Casual outing", cost: 60, lvl: 1 }, { n: "Special night", cost: 150, lvl: 3 }];
  openSheet(`<h2>Date with ${esc(c.name)}</h2><p class="mut">One date per day. ${done ? "<b>Already had one today — try again tomorrow.</b>" : ""}</p>${tiers.map((t, i) => `<div class="card"><div class="row" style="justify-content:space-between;flex-wrap:nowrap"><div><h4>${t.n}</h4><div class="mut">${money(t.cost)} · needs Affection Lv ${t.lvl}</div></div><button class="btn sm ${!done && r.lvl >= t.lvl && S.money >= t.cost ? "primary" : "dis"}" data-d="${i}">Go</button></div></div>`).join("")}<button class="btn" style="width:100%" onclick="closeSheet()">Close</button>`);
  $("sheet").querySelectorAll("[data-d]").forEach(b => b.onclick = () => {
    const i = +b.dataset.d, t = tiers[i];
    if (done) return toast("Already had a date today"); if (r.lvl < t.lvl) return toast("Needs Affection Lv " + t.lvl); if (S.money < t.cost) return toast("Not enough money");
    S.money -= t.cost; r.lastDate = S.day; r.trust = clamp(r.trust + 6 + i * 4, 0, 100); r.boost += 15; r.mood = clamp(r.mood + 15, 0, 100);
    const coda = ["He holds your hand all the way home.", "At the door he kisses you slowly, a promise for later.", "At the door he whispers, in detail, what he wants to do to you tonight."][S.set.intensity];
    log(`Went on a ${t.n.toLowerCase()} with ${c.name}.`);
    addXp(id, 10 + i * 6); save(); renderAll();
    openSheet(`<div class="center"><div class="av lg lvlart" ${avatar(id)}></div></div><h2 class="center">${t.n}</h2><p>${esc(c.dates[i])}</p><p><em style="color:#c7b6e0">${esc(coda)}</em></p><p class="mut center">+${6 + i * 4} trust · +${10 + i * 6} affection XP</p><button class="btn primary" style="width:100%" onclick="closeSheet();showLevelUps();${T ? "updateMeters()" : ""}">Lovely</button>`);
  });
}
const pendingLv = [];
function addXp(id, n) {
  const r = S.res[id], before = r.lvl; r.xp += n; r.lvl = levelOf(r.xp);
  for (let l = before + 1; l <= r.lvl; l++) pendingLv.push({ id, lvl: l });
}
function showLevelUps() {
  if (!pendingLv.length || !$("modal").classList.contains("hidden")) return;
  const { id, lvl } = pendingLv.shift(), c = CHARS[id], rw = LEVEL_REWARD[lvl];
  S.money += rw;
  const unl = Object.keys(ROOMS).filter(t => ROOMS[t].lock && ROOMS[t].lock[0] === id && ROOMS[t].lock[1] === lvl);
  log(`${c.name} reached Affection Lv ${lvl}! +${money(rw)}${unl.length ? ", unlocked " + unl.map(t => ROOMS[t].name).join(", ") : ""}.`);
  save(); renderAll(); if (T) updateMeters();
  const extra = lvl === 2 ? "Thighs touch zone unlocked." : lvl === 3 ? "Special-night dates unlocked." : lvl === 5 ? "Maximum affection!" : "";
  openSheet(`<div class="center"><div class="av lg lvlart" ${avatar(id)}></div><h2>Affection Lv ${lvl} ❤</h2><p class="big">${fmt(c.levelup[Math.min(lvl - 2, 3)] || c.levelup[3])}</p><p>Reward <b style="color:var(--gold)">${money(rw)}</b>${unl.length ? `<br>🔓 Unlocked: <b>${unl.map(t => ROOMS[t].icon + " " + ROOMS[t].name).join(", ")}</b>` : ""}${extra ? `<br><span class="mut">${extra}</span>` : ""}</p><button class="btn gold" style="width:100%" id="lvOk">Continue</button></div>`);
  $("lvOk").onclick = () => { closeSheet(); showLevelUps(); };
}

/* ---------- settings ---------- */
function settingsHtml() {
  const s = S.set;
  return `<div class="mut" style="font-weight:700;text-transform:uppercase;letter-spacing:.08em">Text intensity</div>
  <div class="seg" id="intSeg">${INTENS.map((n, i) => `<button data-i="${i}" class="${s.intensity === i ? "on" : ""}">${n}</button>`).join("")}</div>
  <div class="mut" style="margin:-4px 0 8px">${INTENS_HINT[INTENS[s.intensity]]}</div>
  <label class="tog"><span>Show hotspot outlines</span><input type="checkbox" data-o="outline" ${s.outline ? "checked" : ""}></label>
  <label class="tog"><span>Reduced motion</span><input type="checkbox" data-o="reduce" ${s.reduce ? "checked" : ""}></label>
  <label class="tog"><span>Instant text (no typewriter)</span><input type="checkbox" data-o="instant" ${s.instant ? "checked" : ""}></label>
  <label class="tog"><span>Arousal cools when idle</span><input type="checkbox" data-o="decay" ${s.decay ? "checked" : ""}></label>
  <label class="tog"><span>Auto-advance days (15s)</span><input type="checkbox" data-o="auto" ${s.auto ? "checked" : ""}></label>
  <div class="row" style="margin-top:12px"><button class="btn danger" id="btnReset" style="flex:1">Reset save</button><a class="btn" style="flex:1;text-align:center;text-decoration:none" href="index.html">Menu</a></div>
  <p class="mut" style="margin-top:10px">18+ only. Fictional adult characters. Explicit content is text-only. Saved on this device.</p>`;
}
function bindSettings(root) {
  root.querySelectorAll("#intSeg button").forEach(b => b.onclick = () => { S.set.intensity = +b.dataset.i; save(); applySettings(); if (root === $("pane")) renderPane(); else settingsModal(); });
  root.querySelectorAll("[data-o]").forEach(i => i.onchange = () => { S.set[i.dataset.o] = i.checked; save(); applySettings(); });
  const rb = root.querySelector("#btnReset");
  let armed = 0;
  rb.onclick = () => { if (!armed) { armed = 1; rb.textContent = "Tap again to erase"; setTimeout(() => { armed = 0; rb.textContent = "Reset save"; }, 3500); return; } const keep = S.set; S = newState(); S.set = keep; save(); T = null; leaveScene(true); closeSheet(); renderAll(); toast("Save reset"); };
}
function settingsModal() { openSheet("<h2>Settings</h2>" + settingsHtml() + `<button class="btn primary" style="width:100%;margin-top:10px" onclick="closeSheet()">Done</button>`); bindSettings($("sheet")); }
function applySettings() {
  document.body.classList.toggle("reduce", !!S.set.reduce);
  $("hot").classList.toggle("show", !!S.set.outline);
  if (T) updateMeters();
}
function applyConsole() {
  $("console").classList.toggle("off", consoleHidden);
  document.body.classList.toggle("chide", consoleHidden);
  const b = $("consoleToggle");
  b.textContent = consoleHidden ? "▲ Show console" : "▼ Hide console";
  b.setAttribute("aria-label", consoleHidden ? "Show console" : "Hide console"); b.setAttribute("aria-pressed", String(consoleHidden));
  $("dayFab").classList.toggle("hidden", !(consoleHidden && !T));
  requestAnimationFrame(fitFigure);
}
$("consoleToggle").addEventListener("click", () => { consoleHidden = !consoleHidden; lsSet(CON_KEY, consoleHidden); applyConsole(); });
$("dayFab").addEventListener("click", nextDay);

/* ---------- touch scene ---------- */
let T = null, P = null, lastSay = 0, typeTimer = null, typeFull = "", typing = false, capTimer = null;
const fig = $("figure");
const stageOf = a => a < 25 ? 0 : a < 50 ? 1 : a < 75 ? 2 : 3;
const bags = {};
function bag(key, arr) {
  let b = bags[key];
  if (!b || !b.length) { b = arr.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } bags[key] = b; }
  return b.pop();
}
const parseTag = s => { const m = /^([TSE])\|([\s\S]*)$/.exec(s); return m ? ["TSE".indexOf(m[1]), m[2]] : [0, s]; };
function pool(arr, it) {
  const all = arr.map(parseTag).filter(x => x[0] <= it);
  const top = all.filter(x => x[0] === it && it > 0);
  return (top.length && Math.random() < 0.5 ? top : all).map(x => x[1]);
}
function pickLine(id, zone, st) {
  const c = CHARS[id], it = S.set.intensity;
  const zl = pool([].concat(c.z[zone][st]), it), beats = pool(BEATS[zone][st], it), voice = pool(c.v[st], it);
  const k = id + zone + st + it;
  if (zl.length && Math.random() < 0.35) return bag(k + "z", zl);
  return bag(k + "b", beats) + "\n" + bag(k + "v", voice);
}
function say(text) {
  clearInterval(typeTimer); typeFull = fmt(text); lastSay = performance.now();
  const el = $("dtext");
  const plain = text.replace(/\*/g, "").replace(/\n/g, " ");
  $("caption").textContent = plain; $("caption").classList.add("show"); clearTimeout(capTimer); capTimer = setTimeout(() => $("caption").classList.remove("show"), 6500);
  if (S.set.instant || S.set.reduce) { el.innerHTML = typeFull; typing = false; return; }
  let i = 0; typing = true; el.textContent = "";
  typeTimer = setInterval(() => { i += 3; if (i >= plain.length) { clearInterval(typeTimer); el.innerHTML = typeFull; typing = false; } else el.textContent = plain.slice(0, i); }, 16);
}
function fitFigure() {
  const sv = $("sceneView"); if (sv.classList.contains("hidden")) return;
  const w = sv.clientWidth, h = sv.clientHeight, fw = Math.min(w, h * 0.75), fh = fw / 0.75;
  fig.style.width = fw + "px"; fig.style.height = fh + "px";
}
new ResizeObserver(fitFigure).observe($("view"));
window.addEventListener("resize", fitFigure);

function polyPts(s) { return s.split(" ").map(p => p.split(",").map(Number)); }
function inPoly(x, y, pts) { let c = false; for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) { const [xi, yi] = pts[i], [xj, yj] = pts[j]; if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) c = !c; } return c; }
let ZP = [];
function openScene(id) {
  if (!S.res[id] || !S.res[id].in) return;
  closeSheet();
  const c = CHARS[id], r = S.res[id];
  T = { id, ar: 0, lastAct: performance.now(), lastGain: 0, stage: 0, finale: false, lastTouchZone: null };
  $("fig").src = c.img; $("fig").alt = c.name + ", a fictional adult character";
  $("sceneBg").style.backgroundImage = `url(${c.img})`;
  $("blush").style.left = c.blush[0] + "%"; $("blush").style.top = c.blush[1] + "%";
  ZP = c.zones.map(([z, p]) => [z, polyPts(p)]);
  const lockedThighs = r.lvl < 2;
  let svg = "";
  c.zones.forEach(([z, p], i) => { svg += `<polygon data-i="${i}" class="${z === "thighs" && lockedThighs ? "locked" : ""}" points="${p}"/>`; });
  const seen = {};
  ZP.forEach(([z, pts], i) => { const a = pts.length, cx = pts.reduce((s, q) => s + q[0], 0) / a, cy = pts.reduce((s, q) => s + q[1], 0) / a; if (!seen[z] || pts.length > seen[z].n) seen[z] = { n: pts.length, cx, cy }; });
  Object.keys(seen).forEach(z => { svg += `<text x="${seen[z].cx}" y="${seen[z].cy}">${z === "thighs" && lockedThighs ? "🔒 " : ""}${ZLABEL[z]}</text>`; });
  $("hot").innerHTML = svg;
  document.body.classList.add("scene");
  ["condoView", "conCondo"].forEach(x => $(x).classList.add("hidden"));
  ["sceneView", "conScene", "backBtn"].forEach(x => $(x).classList.remove("hidden"));
  $("dayFab").classList.add("hidden");
  $("speaker").textContent = c.name;
  applySettings(); fitFigure(); updateMeters();
  say(c.greet[Math.floor(Math.random() * c.greet.length)]);
}
function leaveScene(silent) {
  T = null; P = null;
  document.body.classList.remove("scene");
  ["sceneView", "conScene", "backBtn"].forEach(x => $(x).classList.add("hidden"));
  ["condoView", "conCondo"].forEach(x => $(x).classList.remove("hidden"));
  $("vignette").style.opacity = 0; $("caption").classList.remove("show");
  applyConsole(); if (!silent) { save(); renderAll(); }
}
$("backBtn").addEventListener("click", () => leaveScene());
$("sGift").onclick = () => T && giftSheet(T.id);
$("sDate").onclick = () => T && dateSheet(T.id);
$("sInfo").onclick = () => T && infoSheet(T.id);

function updateMeters() {
  if (!T) return;
  const c = CHARS[T.id], r = S.res[T.id], a = Math.round(T.ar), st = stageOf(T.ar);
  $("arBar").style.width = a + "%"; $("arVal").textContent = a;
  $("trBar").style.width = r.trust + "%"; $("trVal").textContent = Math.round(r.trust);
  $("trNeed").style.left = c.need + "%";
  $("stagebadge").textContent = STAGE_NAMES[st] + " · Lv" + r.lvl;
  const mm = $("miniMeters"); mm.querySelector(".a").style.width = a + "%"; mm.querySelector(".t").style.width = r.trust + "%";
  const f = T.ar / 100;
  $("blush").style.opacity = clamp((f - 0.1) * 1.3, 0, 0.9);
  $("fig").style.filter = `brightness(${1 + f * 0.05}) saturate(${1 + f * 0.25})`;
  const v = $("vignette"); v.style.opacity = S.set.reduce ? clamp(f * 0.5, 0, 0.5) : clamp(0.1 + f * 0.8, 0, 0.9);
  v.style.setProperty("--vig", ["#6a1020", "#a81d5e", "#d9267f", "#ff3d9a"][st]);
  fig.classList.toggle("tremble", f > 0.8 && !S.set.reduce);
  $("hot").classList.toggle("show", !!S.set.outline);
}
function toZone(cx, cy) {
  const rc = fig.getBoundingClientRect(), x = (cx - rc.left) / rc.width * 768, y = (cy - rc.top) / rc.height * 1024;
  for (let i = ZP.length - 1; i >= 0; i--) if (inPoly(x, y, ZP[i][1])) return { z: ZP[i][0], i, px: (cx - rc.left) / rc.width * 100, py: (cy - rc.top) / rc.height * 100 };
  return { z: null, px: (cx - rc.left) / rc.width * 100, py: (cy - rc.top) / rc.height * 100 };
}
fig.addEventListener("contextmenu", e => e.preventDefault());
fig.addEventListener("touchmove", e => e.preventDefault(), { passive: false });
fig.addEventListener("touchstart", e => e.preventDefault(), { passive: false });
["gesturestart", "gesturechange", "gestureend"].forEach(n => document.addEventListener(n, e => e.preventDefault()));
fig.addEventListener("pointerdown", e => {
  if (!T || T.finale) return; e.preventDefault();
  try { fig.setPointerCapture(e.pointerId); } catch (_) {}
  const h = toZone(e.clientX, e.clientY);
  P = { id: e.pointerId, x: e.clientX, y: e.clientY, h, t0: performance.now(), moved: 0, acc: 0, did: false, holding: false, lastTick: 0 };
  P.holdT = setTimeout(() => { if (P && P.moved < 18) { P.holding = true; touch(P.h, "hold"); P.holdI = setInterval(() => P && touch(P.h, "hold"), 650); } }, 450);
  showLabel(h);
});
fig.addEventListener("pointermove", e => {
  if (!P || e.pointerId !== P.id) return;
  const d = Math.hypot(e.clientX - P.x, e.clientY - P.y); P.x = e.clientX; P.y = e.clientY; P.moved += d; P.acc += d;
  P.h = toZone(e.clientX, e.clientY); showLabel(P.h);
  if (P.moved > 18) { clearTimeout(P.holdT); if (P.holdI) { clearInterval(P.holdI); P.holdI = null; P.holding = false; } }
  const thr = fig.getBoundingClientRect().width * 0.08, now = performance.now();
  if (P.acc > thr && now - P.lastTick > 260) { P.acc = 0; P.lastTick = now; P.did = true; touch(P.h, "stroke"); }
});
function endP(e) {
  if (!P || (e && e.pointerId !== P.id)) return;
  clearTimeout(P.holdT); clearInterval(P.holdI);
  if (!P.did && !P.holding && performance.now() - P.t0 < 600) touch(P.h, "tap");
  P = null; $("zonelabel").style.opacity = 0;
}
fig.addEventListener("pointerup", endP); fig.addEventListener("pointercancel", endP);
function showLabel(h) { const l = $("zonelabel"); if (h.z) { l.textContent = ZLABEL[h.z]; l.style.opacity = 1; } else l.style.opacity = 0; }

function spawn(cls, xp, yp, html, o = {}) {
  const el = document.createElement("span"); el.className = cls; if (html) el.textContent = html;
  el.style.left = xp + "%"; el.style.top = yp + "%";
  el.style.setProperty("--dx", (o.dx ?? rnd(-40, 40)) + "px"); el.style.setProperty("--dy", (o.dy ?? rnd(-110, -50)) + "px");
  el.style.setProperty("--r", rnd(-30, 30) + "deg"); el.style.setProperty("--s", (o.s ?? rnd(20, 34)) + "px"); el.style.setProperty("--t", rnd(1, 1.6) + "s");
  $("fx").appendChild(el); el.addEventListener("animationend", () => el.remove()); setTimeout(() => el.remove(), 2600);
}
function fx(st, px, py, kind) {
  const re = S.set.reduce;
  const n = re ? 1 : [1, 2, 3, 5][st] + (kind === "hold" ? 1 : 0);
  const sym = [["💢", "💦"], ["💗", "💦", "✨"], ["💖", "💕", "💗"], ["💖", "💕", "✨", "💞"]][st];
  for (let i = 0; i < n; i++) spawn("p", clamp(px + rnd(-8, 8), 6, 94), clamp(py + rnd(-4, 4), 6, 94), sym[Math.floor(Math.random() * sym.length)]);
  if (st >= 2 && !re) { spawn("steam", clamp(px + rnd(-10, 10), 8, 92), clamp(py, 10, 90)); }
  if (!re) { fig.classList.remove("shake", "bump"); void fig.offsetWidth; fig.classList.add(st === 0 ? "shake" : "bump"); }
}
function touch(h, kind) {
  if (!T || T.finale) return;
  const now = performance.now(), id = T.id, c = CHARS[id], r = S.res[id];
  T.lastAct = now;
  if (!h.z) return;
  if (h.z === "thighs" && r.lvl < 2) { if (now - lastSay > 900) say("*gently moves your hand away*\n(Thighs unlock at Affection Lv 2 with " + c.name + ".)"); return; }
  if (kind === "tap" && now - T.lastGain < 140) return;
  T.lastGain = now;
  const st = stageOf(T.ar), fav = c.favZones.includes(h.z), nogo = c.nogo === h.z;
  const base = kind === "tap" ? 4 : kind === "stroke" ? 3.4 : 3.8;
  const gain = base * (fav ? 1.4 : nogo ? (st === 0 ? 0.5 : 0.9) : 1) * (0.6 + r.trust / 100 * 0.6) * (0.8 + r.mood / 300) * (st === 0 ? 0.85 : 1);
  T.ar = Math.min(100, T.ar + gain);
  r.trust = clamp(r.trust + (fav ? 0.9 : nogo && st === 0 ? -0.4 : 0.35), 0, 100);
  r.touches++; r.zones[h.z] = (r.zones[h.z] || 0) + 1;
  if (st >= 1 && r.touches % 7 === 0) addXp(id, 1);
  const ns = stageOf(T.ar);
  const poly = $("hot").querySelector(`polygon[data-i="${h.i}"]`); if (poly) { poly.classList.remove("flash"); void poly.getBoundingClientRect(); poly.classList.add("flash"); }
  fx(ns, h.px, h.py, kind);
  if (now - lastSay > 650 || ns !== T.stage) say(pickLine(id, h.z, ns));
  if (ns !== T.stage) { T.stage = ns; toast(["", "😳 Flustered…", "🔥 Aroused…", "💞 Needy…"][ns] || "", 1400); }
  updateMeters();
  if (navigator.vibrate && !S.set.reduce) try { navigator.vibrate(kind === "hold" ? 12 : 8); } catch (_) {}
  if (T.ar >= 100) tryFinale();
}
function tryFinale() {
  const id = T.id, c = CHARS[id], r = S.res[id];
  if (r.trust < c.need) { T.ar = 88; updateMeters(); say(`*breathing hard, catches your wrist*\n${c.name} isn't ready to go that far. He doesn't trust you enough yet. (Trust ${Math.round(r.trust)}/${c.need} — try a gift or a date.)`); toast("Needs more trust: gifts & dates help", 3000); return; }
  if (r.lastFin === S.day) { T.ar = 88; updateMeters(); say(`*laughs breathlessly, spent*\n"Give me until tomorrow, ${c.name === "Wolf" ? "brat" : "sweetheart"}." (One finale per day — tap ☀ Next day.)`); toast("Rest needed — advance a day", 3000); return; }
  runFinale();
}
setInterval(() => {
  if (!T || T.finale || !S.set.decay) return;
  if (performance.now() - T.lastAct > 2800 && T.ar > 0) { T.ar = Math.max(0, T.ar - 0.9); const ns = stageOf(T.ar); T.stage = ns; updateMeters(); }
}, 500);
setInterval(() => { if (S.set.auto && !T && $("modal").classList.contains("hidden") && $("finale").className.indexOf("on") < 0) nextDay(); }, 15000);

/* ---------- finale (text only, fades to black) ---------- */
function runFinale() {
  const id = T.id, c = CHARS[id], r = S.res[id], it = S.set.intensity, fa = c.finale;
  T.finale = true; P = null;
  const steps = [fa.build[it], fa.climax[it], "·  ·  ·", fa.after[r.lvl >= 3 ? 1 : 0]];
  const f = $("finale"), tx = $("ftext"), btn = $("fbtn"), hint = $("fhint");
  f.classList.add("on"); tx.classList.remove("vis"); btn.classList.add("hidden"); hint.style.display = "";
  let i = -1, busy = false; const dly = S.set.reduce ? 50 : 1300;
  function next() {
    if (busy) return; busy = true; tx.classList.remove("vis");
    setTimeout(() => {
      i++;
      if (i >= steps.length) { busy = false; return; }
      tx.textContent = steps[i]; tx.classList.add("vis");
      if (i === steps.length - 1) { hint.style.display = "none"; btn.classList.remove("hidden"); }
      setTimeout(() => { busy = false; }, 500);
    }, i < 0 ? 900 : dly);
  }
  f.onclick = e => { if (e.target === btn) return; if (i < steps.length - 1) next(); };
  btn.onclick = () => finishFinale(id);
  next();
}
function finishFinale(id) {
  const c = CHARS[id], r = S.res[id], f = $("finale");
  const reward = 200 + 100 * r.lvl;
  S.money += reward; r.trust = clamp(r.trust + 8, 0, 100); r.fins++; r.lastFin = S.day; r.mood = clamp(r.mood + 20, 0, 100); r.boost += 20; S.stats.finales++;
  addXp(id, 25); log(`A private evening with ${c.name}. +${money(reward)} (grateful tip & good vibes).`);
  f.classList.remove("on"); f.onclick = null; T.finale = false; T.ar = 0; T.stage = 0;
  save(); renderAll(); updateMeters(); say(c.greet[0]);
  toast(`+${money(reward)} · Trust +8 · Affection +25 XP`, 3200);
  setTimeout(showLevelUps, 600);
}

/* ---------- boot ---------- */
function boot() {
  applySettings(); renderAll(); applyConsole();
  CHAR_ORDER.forEach(id => { const r = S.res[id]; if (r.in && (r.loc == null || !S.rooms[r.loc])) r.loc = r.bed; });
  renderAll();
  if (!lsGet(AGE_KEY, false)) {
    $("modal").dataset.lock = "1";
    openSheet(`<span class="chip" style="background:#7a1030">18+ ONLY</span><h2 style="margin-top:10px">Erotic Condo</h2><p>This game contains adult themes and sexually explicit <b>text</b>. All characters are fictional adults (21+). Confirm that you are at least 18 years old (or the age of majority where you live).</p><div class="row"><button class="btn primary" id="ageOk" style="flex:2">I am 18+ — Enter</button><a class="btn danger" href="https://www.google.com/" style="flex:1;text-align:center;text-decoration:none">Leave</a></div>`);
    $("ageOk").onclick = () => { lsSet(AGE_KEY, true); delete $("modal").dataset.lock; closeSheet(); };
  }
}
boot();
window.__EC = { get S() { return S; }, get T() { return T; }, nextDay, openScene };

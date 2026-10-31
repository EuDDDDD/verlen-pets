/* Verlen opening film for the Carrd site.
   A title screen asks the visitor to click (browsers only allow sound after a click),
   then the tour film plays full screen with a Skip button, and fades into the site.
   Once a visitor has watched it to the end or skipped it, this browser remembers that and
   goes straight to the site, until the visitor clears their history / site data.
   Add ?nointro to the address to skip it, or ?intro to see it again, while editing.
   Clicks on the letter and film are kept to this screen, so the site's own music and the
   walking mascots only start once the visitor is inside. */
(function () {
  var KEY = 'verlen-intro-seen';
  if (/[?&]nointro\b/.test(location.search)) return;
  var force = /[?&]intro\b/.test(location.search);
  try { if (!force && localStorage.getItem(KEY)) return; } catch (e) { /* storage blocked: show it */ }

  var me = document.currentScript && document.currentScript.src;
  var BASE = me ? me.replace(/[^\/]*$/, '') : 'https://cdn.jsdelivr.net/gh/EuDDDDD/verlen-pets@main/';
  /* the film is larger than jsDelivr serves, so it comes from GitHub Pages (raw GitHub as a fallback) */
  var VIDEOS = ['https://euddddd.github.io/verlen-pets/intro.mp4', 'https://raw.githubusercontent.com/EuDDDDD/verlen-pets/main/intro.mp4'];
  if (/^(file:|https?:\/\/(localhost|127\.0\.0\.1))/.test(BASE)) VIDEOS.unshift(BASE + 'intro.mp4');
  var POSTER = BASE + 'intro-poster.jpg';
  var EMBLEM = BASE + 'intro-emblem.png';

  var root = document.documentElement;
  root.classList.add('vl-intro-on');

  var font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500;1,600&family=Noto+Serif+TC:wght@500&display=swap';
  (document.head || root).appendChild(font);

  var css = document.createElement('style');
  css.textContent = [
    'html.vl-intro-on, html.vl-intro-on body { overflow: hidden !important; background-color: #0D0A07; }',
    'html.vl-intro-on body > *:not(#vl-intro) { visibility: hidden !important; }',
    '#vl-intro { position: fixed; inset: 0; z-index: 2147483000; background: #0D0A07; color: #F0E6D2; opacity: 1; transition: opacity .9s ease; -webkit-tap-highlight-color: transparent; }',
    '#vl-intro.vl-out { opacity: 0; pointer-events: none; }',
    '#vl-intro .vl-poster { position: absolute; inset: 0; background: #0D0A07 center / cover no-repeat; transform: scale(1.04); filter: brightness(.42) saturate(.9); transition: opacity 1s ease, transform 8s ease-out; }',
    '#vl-intro.vl-ready .vl-poster { transform: scale(1); }',
    '#vl-intro .vl-poster::after { content: ""; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 45%, rgba(13,10,7,0) 0%, rgba(13,10,7,.55) 62%, rgba(13,10,7,.92) 100%); }',
    '#vl-intro .vl-gate { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 24px 16px; transition: opacity .7s ease; }',
    '#vl-intro .vl-letter { position: relative; width: min(440px, 100%); padding: 66px 34px 30px; display: flex; flex-direction: column; align-items: center; gap: 6px; text-align: center; cursor: pointer; color: #3A2C1A; border: 1px solid #B8955A; border-radius: 3px; font: inherit;',
    '  background: radial-gradient(130% 120% at 30% 18%, #FBF4E4 0%, #F1E5CB 62%, #E6D3AE 100%);',
    '  box-shadow: inset 0 0 0 5px #F8EFDC, inset 0 0 0 6px #D5BA8A, inset 0 0 40px rgba(150,110,50,.18), 0 18px 50px rgba(0,0,0,.6);',
    '  opacity: 0; transform: translateY(18px) rotate(-.6deg); transition: opacity 1.2s ease .3s, transform 1.2s cubic-bezier(.2,.8,.2,1) .3s, box-shadow .3s ease; }',
    '#vl-intro.vl-ready .vl-letter { opacity: 1; transform: rotate(-.6deg); }',
    '#vl-intro .vl-letter:hover, #vl-intro .vl-letter:focus-visible { outline: none; transform: translateY(-3px) rotate(-.6deg); box-shadow: inset 0 0 0 5px #F8EFDC, inset 0 0 0 6px #C9A46A, inset 0 0 40px rgba(150,110,50,.18), 0 0 34px rgba(217,183,124,.35), 0 22px 56px rgba(0,0,0,.65); }',
    '#vl-intro .vl-seal { position: absolute; left: 50%; top: 0; width: 92px; height: 92px; transform: translate(-50%, -50%); filter: drop-shadow(0 4px 10px rgba(0,0,0,.45)); }',
    '#vl-intro .vl-name { font: italic 600 clamp(32px, 7.4vw, 44px)/1.1 "Cormorant Garamond", Georgia, serif; letter-spacing: .02em; color: #2E2214; white-space: nowrap; }',
    '#vl-intro .vl-name-zh { margin-top: 4px; font: 500 clamp(13px, 3vw, 15px)/1.5 "Noto Serif TC", "PMingLiU", serif; letter-spacing: .42em; padding-left: .42em; color: #7A5C30; }',
    '#vl-intro .vl-rule { width: 70%; height: 9px; margin: 12px 0 10px; background: radial-gradient(circle, #B8955A 2px, transparent 2.6px) center / 9px 9px no-repeat, linear-gradient(90deg, transparent, #C9A46A 18%, #C9A46A 44%, transparent 44%, transparent 56%, #C9A46A 56%, #C9A46A 82%, transparent) center / 100% 1px no-repeat; }',
    '#vl-intro .vl-body { font: italic 500 clamp(17px, 3.8vw, 20px)/1.5 "Cormorant Garamond", Georgia, serif; letter-spacing: .03em; color: #4A3820; }',
    '#vl-intro .vl-open { margin-top: 18px; padding: 7px 4px 5px; font: 500 15px/1.4 "Noto Serif TC", "PMingLiU", serif; letter-spacing: .26em; color: #6B4E26; border-bottom: 1px solid #B8955A; }',
    '#vl-intro .vl-open i { display: block; margin-top: 2px; font: italic 600 14px/1.3 "Cormorant Garamond", Georgia, serif; letter-spacing: .1em; color: #8A6A38; }',
    '#vl-intro .vl-hint { margin-top: 10px; font: 500 12px/1.6 "Noto Serif TC", "PMingLiU", serif; letter-spacing: .14em; color: #9C8360; }',
    '#vl-intro video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; background: transparent; opacity: 0; transition: opacity 1s ease; }',
    '#vl-intro .vl-fill { position: absolute; left: -8%; top: -8%; width: 116%; height: 116%; filter: blur(34px) brightness(.5) saturate(1.15); opacity: 0; transition: opacity 1.4s ease; }',
    '#vl-intro .vl-fillshade { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 50%, rgba(13,10,7,0) 45%, rgba(13,10,7,.6) 100%); opacity: 0; transition: opacity 1.4s ease; pointer-events: none; }',
    '#vl-intro.vl-playing video, #vl-intro.vl-playing .vl-fill, #vl-intro.vl-playing .vl-fillshade { opacity: 1; }',
    '#vl-intro.vl-playing .vl-gate { opacity: 0; pointer-events: none; }',
    '#vl-intro.vl-playing .vl-poster { filter: blur(30px) brightness(.32) saturate(1.1); transform: scale(1.1); }',
    '#vl-intro .vl-skip { position: absolute; right: max(16px, env(safe-area-inset-right, 0px)); bottom: max(18px, env(safe-area-inset-bottom, 0px)); display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px 8px 18px; cursor: pointer; color: #E9DCC4; background: rgba(23,18,13,.55); border: 1px solid rgba(201,164,106,.7); border-radius: 999px; font: 500 14px/1.2 "Noto Serif TC", "PMingLiU", serif; letter-spacing: .2em; opacity: 0; pointer-events: none; transition: opacity .6s ease .8s, background .2s ease; backdrop-filter: blur(3px); -webkit-backdrop-filter: blur(3px); }',
    '#vl-intro .vl-skip i { font: italic 500 14px "Cormorant Garamond", Georgia, serif; letter-spacing: .08em; color: #C9A46A; }',
    '#vl-intro .vl-skip:hover, #vl-intro .vl-skip:focus-visible { outline: none; background: rgba(60,46,30,.75); }',
    '#vl-intro.vl-playing .vl-skip { opacity: 1; pointer-events: auto; }',
    '@media (prefers-reduced-motion: reduce) { #vl-intro *, #vl-intro { transition-duration: .01s !important; transition-delay: 0s !important; } }'
  ].join('\n');
  (document.head || root).appendChild(css);

  var active = true;
  var handlers = { enter: null, skip: null };

  /* Every click, tap and key press made while the intro is up stays here:
     it is handled below and then stopped, so nothing else on the page reacts to it. */
  var SHIELD = ['click', 'dblclick', 'auxclick', 'contextmenu', 'mousedown', 'mouseup', 'pointerdown', 'pointerup', 'touchstart', 'touchend', 'keydown', 'keyup'];
  function shield(e) {
    if (!active) return;
    var t = e.target && e.target.closest ? e.target : null;
    if (e.type === 'click' && t) {
      if (t.closest('.vl-letter') && handlers.enter) handlers.enter();
      else if (t.closest('.vl-skip') && handlers.skip) handlers.skip();
    }
    if (e.type === 'keydown' && e.key === 'Escape' && handlers.skip) handlers.skip();
    e.stopImmediatePropagation();
  }
  SHIELD.forEach(function (type) { window.addEventListener(type, shield, true); });
  function unshield() {
    active = false;
    SHIELD.forEach(function (type) { window.removeEventListener(type, shield, true); });
  }

  function build() {
    var box = document.createElement('div');
    box.id = 'vl-intro';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'The Bells of Verlen');
    box.innerHTML =
      '<div class="vl-poster" style="background-image:url(\'' + POSTER + '\')"></div>' +
      '<canvas class="vl-fill" width="48" height="32" aria-hidden="true"></canvas>' +
      '<div class="vl-fillshade"></div>' +
      '<video playsinline preload="auto"></video>' +
      '<div class="vl-gate">' +
        '<button type="button" class="vl-letter">' +
          '<img class="vl-seal" src="' + EMBLEM + '" alt="">' +
          '<span class="vl-name">The Bells of Verlen</span>' +
          '<span class="vl-name-zh">維倫河港城邦</span>' +
          '<span class="vl-rule"></span>' +
          '<span class="vl-body">When the bell rings, our story begins.</span>' +
          '<span class="vl-open">拆信・進入維倫<i>Open the letter</i></span>' +
          '<span class="vl-hint">建議開啟聲音</span>' +
        '</button>' +
      '</div>' +
      '<button type="button" class="vl-skip">跳過 <i>Skip ›</i></button>';
    document.body.appendChild(box);

    var video = box.querySelector('video');
    var enter = box.querySelector('.vl-letter');
    var skip = box.querySelector('.vl-skip');
    var fill = box.querySelector('.vl-fill');
    var ctx = null;
    try { ctx = fill.getContext('2d'); } catch (e) { ctx = null; }
    var source = 0;
    var done = false;
    var playing = false;
    video.src = VIDEOS[0];

    /* the empty sides of the screen show a soft, blurred copy of the film */
    var lastPaint = 0;
    function paint(t) {
      if (done) return;
      if (ctx && playing && t - lastPaint > 90 && video.readyState >= 2) {
        lastPaint = t;
        try { ctx.drawImage(video, 0, 0, fill.width, fill.height); } catch (e) { /* not ready */ }
      }
      requestAnimationFrame(paint);
    }

    function finish() {
      if (done) return;
      done = true;
      try { localStorage.setItem(KEY, String(Date.now())); } catch (e) { /* ignore */ }
      box.classList.add('vl-out');
      var fade = setInterval(function () {
        try { video.volume = Math.max(0, video.volume - 0.08); } catch (e) { /* ignore */ }
      }, 60);
      setTimeout(function () {
        clearInterval(fade);
        try { video.pause(); } catch (e) { /* ignore */ }
        box.remove();
        root.classList.remove('vl-intro-on');
        unshield();
        try { document.dispatchEvent(new CustomEvent('verlen:intro-done')); } catch (e) { /* ignore */ }
      }, 950);
    }

    function play() {
      if (playing || done) return;
      playing = true;
      box.classList.add('vl-playing');
      video.muted = false;
      video.volume = 1;
      var p = video.play();
      if (p && p.catch) p.catch(function () { if (!video.error) finish(); });
      requestAnimationFrame(paint);
      setTimeout(function () { try { skip.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }, 900);
    }

    handlers.enter = play;
    handlers.skip = finish;
    video.addEventListener('ended', finish);
    video.addEventListener('error', function () {
      if (source + 1 < VIDEOS.length) {
        source += 1;
        video.src = VIDEOS[source];
        if (playing) { var p = video.play(); if (p && p.catch) p.catch(function () { finish(); }); }
        return;
      }
      if (playing) finish();
    });

    requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add('vl-ready'); try { enter.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }); });
  }

  if (document.body) build();
  else document.addEventListener('DOMContentLoaded', build);
})();

/* Welcome block on the home page: the emblem is stamped onto the page like a wax seal,
   then the greeting is typed out like a typewriter. Runs once per page load, after the
   opening film (or straight away when the film is not shown). */
(function () {
  if (/[?&]nowelcome\b/.test(location.search)) return;
  try { if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return; } catch (e) { /* ignore */ }

  var KEYS = ['致維倫的來訪者', 'Visitors of Verlen', '河岸燈火下的學院日常', 'Gaslit River'];
  var root = document.documentElement;
  root.classList.add('vl-wl');

  var css = document.createElement('style');
  css.textContent = [
    'html.vl-wl body > *:not(#vl-intro) { visibility: hidden !important; }',
    '.vl-wl-hide { opacity: 0 !important; }',
    '.vl-caret { display: inline-block; width: .08em; min-width: 2px; height: 1em; margin-left: .06em; vertical-align: -.12em; background: currentColor; animation: vlCaret .8s steps(1) infinite; }',
    '@keyframes vlCaret { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }',
    /* a solid brass seal comes down onto the page, lifts away, and leaves the emblem printed underneath */
    '.vl-seal { position: absolute; pointer-events: none; border-radius: 50%; z-index: 3; opacity: 0;',
    '  background: radial-gradient(circle at 38% 32%, #F3D99B 0%, #D3A85E 38%, #A87C3A 70%, #6E4E22 100%);',
    '  box-shadow: inset 0 0 0 3px rgba(80,55,20,.55), inset 0 -6px 14px rgba(60,40,15,.45), 0 30px 26px rgba(0,0,0,.55);',
    '  animation: vlSeal 1.8s cubic-bezier(.3,0,.2,1) forwards; }',
    '.vl-seal i { position: absolute; inset: 0; border-radius: 50%; background: var(--m) center / contain no-repeat; transform: scaleX(-1); mix-blend-mode: multiply; opacity: .55; filter: grayscale(1) contrast(1.3); }',
    '@keyframes vlSeal {',
    '  0%   { opacity: 0; transform: translateY(-70px) scale(1.12); box-shadow: inset 0 0 0 3px rgba(80,55,20,.55), inset 0 -6px 14px rgba(60,40,15,.45), 0 46px 34px rgba(0,0,0,.45); }',
    '  25%  { opacity: 1; transform: translateY(-48px) scale(1.1); }',
    '  48%  { opacity: 1; transform: translateY(-54px) scale(1.11); }',
    '  62%  { opacity: 1; transform: translateY(3px) scale(.97); box-shadow: inset 0 0 0 3px rgba(80,55,20,.55), inset 0 -6px 14px rgba(60,40,15,.45), 0 2px 4px rgba(0,0,0,.6); animation-timing-function: ease-in-out; }',
    '  74%  { opacity: 1; transform: translateY(0) scale(1); }',
    '  100% { opacity: 0; transform: translateY(-60px) scale(1.08); box-shadow: inset 0 0 0 3px rgba(80,55,20,.55), inset 0 -6px 14px rgba(60,40,15,.45), 0 40px 30px rgba(0,0,0,.3); } }',
    '.vl-inked { animation: vlInk 1.2s ease-out both; }',
    '@keyframes vlInk { 0% { opacity: 0; filter: brightness(1.8) saturate(1.3); } 15% { opacity: 1; filter: brightness(1.6) saturate(1.2) drop-shadow(0 0 14px rgba(233,203,140,.75)); } 100% { opacity: 1; filter: none; } }',
    '.vl-thud { animation: vlThud .5s ease-out; }',
    '@keyframes vlThud { 0% { transform: translateY(0); } 25% { transform: translateY(6px); } 50% { transform: translateY(-2px); } 75% { transform: translateY(1px); } 100% { transform: none; } }',
    '.vl-ring { position: absolute; pointer-events: none; border-radius: 50%; border: 3px solid rgba(217,183,124,.9); box-shadow: 0 0 26px rgba(217,183,124,.55), inset 0 0 18px rgba(217,183,124,.35); animation: vlRing 1.3s ease-out forwards; }',
    '.vl-ring.r2 { border-width: 2px; animation-delay: .14s; opacity: 0; }',
    '@keyframes vlRing { 0% { opacity: 1; transform: scale(.9); } 100% { opacity: 0; transform: scale(1.75); } }',
    '.vl-dust { position: absolute; pointer-events: none; width: 6px; height: 6px; border-radius: 50%; background: rgba(233,203,140,.85); box-shadow: 0 0 6px rgba(233,203,140,.8); animation: vlDust .9s ease-out forwards; }',
    '@keyframes vlDust { 0% { opacity: 1; transform: translate(0,0) scale(1); } 100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(.3); } }'
  ].join('\n');
  (document.head || root).appendChild(css);

  function findText(key) {
    var list = document.querySelectorAll('h1, h2, h3, h4, p, [id^="text"]');
    var best = null;
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      if ((el.textContent || '').indexOf(key) < 0) continue;
      if (!best || best.contains(el)) best = el;
    }
    return best;
  }

  function findEmblem(first) {
    var imgs = document.querySelectorAll('img');
    var pick = null;
    var sec = first.closest('section, article') || document.body;
    for (var i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      if (!sec.contains(im)) continue;
      if (im.compareDocumentPosition(first) & Node.DOCUMENT_POSITION_FOLLOWING) pick = im;
    }
    return pick;
  }

  /* every text piece of an element, emptied now and refilled one character at a time */
  function prepare(el) {
    var nodes = [];
    var h = el.offsetHeight;
    if (h) el.style.minHeight = h + 'px';   /* keep the space so nothing below jumps */
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var n;
    while ((n = walker.nextNode())) {
      if (!n.nodeValue.trim()) continue;
      nodes.push({ node: n, text: n.nodeValue });
      n.nodeValue = '';
    }
    return { el: el, nodes: nodes };
  }

  function typeOut(item, done) {
    var caret = document.createElement('span');
    caret.className = 'vl-caret';
    var ni = 0, ci = 0;
    function step() {
      if (ni >= item.nodes.length) {
        setTimeout(function () { caret.remove(); item.el.style.minHeight = ''; done(); }, 260);
        return;
      }
      var cur = item.nodes[ni];
      if (ci === 0) cur.node.parentNode.insertBefore(caret, cur.node.nextSibling);
      var chars = Array.from(cur.text);
      ci += 1;
      cur.node.nodeValue = chars.slice(0, ci).join('');
      var ch = chars[ci - 1] || '';
      var wait = /[　-鿿＀-￯]/.test(ch) ? 80 : 24;
      if (/[，。、！？：｜|,.:]/.test(ch)) wait += 120;
      if (ch === ' ') wait = 30;
      if (ci >= chars.length) { ni += 1; ci = 0; wait += 80; }
      setTimeout(step, wait);
    }
    step();
  }

  function setup() {
    var els = [];
    KEYS.forEach(function (k) {
      var el = findText(k);
      if (el && els.indexOf(el) < 0) els.push(el);
    });
    if (!els.length) { root.classList.remove('vl-wl'); return; }
    els.sort(function (a, b) { return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1; });
    var emblem = findEmblem(els[0]);
    var items = els.map(prepare);
    if (emblem) emblem.classList.add('vl-wl-hide');
    root.classList.remove('vl-wl');

    function visible() { return els[0].getClientRects().length > 0; }
    function ready() {
      if (!visible()) return false;
      if (document.readyState !== 'complete') return false;
      if (document.body.classList.contains('is-loading') || document.body.classList.contains('is-playing')) return false;
      if (emblem && !(emblem.complete && emblem.naturalWidth)) return false;
      var r = els[0].getBoundingClientRect();
      return r.top < innerHeight && r.bottom > 0;
    }
    var waited = 0;
    function begin() {
      if (!ready() && waited < 8000) { waited += 200; setTimeout(begin, 200); return; }
      var i = 0;
      function next() {
        if (i >= items.length) return;
        var it = items[i++];
        setTimeout(function () { typeOut(it, next); }, i === 1 ? 0 : 220);
      }
      if (emblem) {
        var host0 = emblem.parentNode;
        if (getComputedStyle(host0).position === 'static') host0.style.position = 'relative';
        var seal = document.createElement('span');
        seal.className = 'vl-seal';
        seal.style.left = emblem.offsetLeft + 'px';
        seal.style.top = emblem.offsetTop + 'px';
        seal.style.width = emblem.offsetWidth + 'px';
        seal.style.height = emblem.offsetHeight + 'px';
        var engr = document.createElement('i');
        engr.style.setProperty('--m', 'url("' + emblem.currentSrc + '")');
        seal.appendChild(engr);
        host0.appendChild(seal);
        setTimeout(function () { seal.remove(); }, 1900);
        setTimeout(function () {
          emblem.classList.remove('vl-wl-hide');
          emblem.classList.add('vl-inked');
          /* little sparks fly out where the seal lands */
          for (var k = 0; k < 10; k++) {
            var dot = document.createElement('span');
            dot.className = 'vl-dust';
            var ang = (k / 10) * Math.PI * 2, dist = emblem.offsetWidth * (0.55 + Math.random() * 0.35);
            dot.style.left = (emblem.offsetLeft + emblem.offsetWidth / 2 - 3) + 'px';
            dot.style.top = (emblem.offsetTop + emblem.offsetHeight / 2 - 3) + 'px';
            dot.style.setProperty('--dx', Math.round(Math.cos(ang) * dist) + 'px');
            dot.style.setProperty('--dy', Math.round(Math.sin(ang) * dist) + 'px');
            emblem.parentNode.appendChild(dot);
            (function (d) { setTimeout(function () { d.remove(); }, 1000); })(dot);
          }
          var host = emblem.parentNode;
          var hostCs = getComputedStyle(host);
          if (hostCs.position === 'static') host.style.position = 'relative';
          var ring = document.createElement('span');
          ring.className = 'vl-ring';
          ring.style.left = emblem.offsetLeft + 'px';
          ring.style.top = emblem.offsetTop + 'px';
          ring.style.width = emblem.offsetWidth + 'px';
          ring.style.height = emblem.offsetHeight + 'px';
          host.appendChild(ring);
          var ring2 = ring.cloneNode(); ring2.className = 'vl-ring r2'; host.appendChild(ring2);
          setTimeout(function () { ring.remove(); ring2.remove(); }, 1600);
          var sec = emblem.closest('section, article, .container, .inner') || emblem.parentNode;
          sec.classList.add('vl-thud');
          setTimeout(function () { sec.classList.remove('vl-thud'); }, 600);
        }, 1116);
        setTimeout(next, 2000);
      } else {
        next();
      }
    }

    if (root.classList.contains('vl-intro-on')) {
      document.addEventListener('verlen:intro-done', function () { setTimeout(begin, 700); }, { once: true });
    } else {
      /* give Carrd's own entrance fade time to finish so the stamp is actually seen */
      var go = function () { setTimeout(begin, 900); };
      if (document.readyState === 'complete') go(); else window.addEventListener('load', go, { once: true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();

/* Site music and the Vimeo film: when a visitor starts the film, any music that is playing
   pauses, and it carries on once the film is paused or finished. If the Vimeo player cannot
   be reached, clicking into the film still pauses the music (it then stays off until the
   visitor turns it back on). */
(function () {
  var media = new Set();
  try {
    var origPlay = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () { media.add(this); return origPlay.apply(this, arguments); };
  } catch (e) { /* ignore */ }
  document.addEventListener('play', function (e) { if (e.target && e.target.play) media.add(e.target); }, true);

  var ducked = [];
  var filmPlaying = 0;
  /* keep the site's ♪ button (#bgm-toggle) showing the right state */
  function syncBtn(playing) {
    var btn = document.getElementById('bgm-toggle');
    if (!btn) return;
    btn.classList.toggle('is-playing', playing);
    btn.classList.toggle('is-muted', !playing);
    btn.setAttribute('aria-label', playing ? '暫停背景音樂 Pause music' : '播放背景音樂 Play music');
  }
  function isOurs(m) { return m.closest && m.closest('#vl-intro'); }
  function duck() {
    media.forEach(function (m) {
      if (!m.paused && !isOurs(m) && ducked.indexOf(m) < 0) {
        try { m.pause(); ducked.push(m); } catch (e) { /* ignore */ }
      }
    });
    if (ducked.length) syncBtn(false);
  }
  function restore() {
    var list = ducked; ducked = [];
    list.forEach(function (m) {
      if (m.paused) {
        try {
          var p = m.play();
          if (p && p.then) p.then(function () { syncBtn(true); }).catch(function () {});
          else syncBtn(true);
        } catch (e) { /* ignore */ }
      }
    });
  }

  var players = [];
  var apiLoading = null;
  function loadApi(cb) {
    if (window.Vimeo && window.Vimeo.Player) { cb(); return; }
    if (!apiLoading) {
      apiLoading = [];
      var s = document.createElement('script');
      s.src = 'https://player.vimeo.com/api/player.js';
      s.onload = function () { var q = apiLoading; apiLoading = null; q.forEach(function (f) { f(); }); };
      s.onerror = function () { apiLoading = null; };
      (document.head || document.documentElement).appendChild(s);
    }
    if (apiLoading) apiLoading.push(cb);
  }
  function hook(frame) {
    if (frame.__vlHooked) return;
    frame.__vlHooked = true;
    loadApi(function () {
      try {
        var p = new window.Vimeo.Player(frame);
        var playing = false;
        p.on('play', function () { if (!playing) { playing = true; filmPlaying += 1; } duck(); });
        function stopped() {
          setTimeout(function () {
            p.getPaused().then(function (paused) {
              if (!paused || !playing) return;
              playing = false; filmPlaying = Math.max(0, filmPlaying - 1);
              if (!filmPlaying) restore();
            }).catch(function () {});
          }, 350);
        }
        p.on('pause', stopped);
        p.on('ended', stopped);
        players.push(p);
      } catch (e) { /* ignore */ }
    });
  }
  function scan() {
    var frames = document.querySelectorAll('iframe[src*="player.vimeo.com"]');
    for (var i = 0; i < frames.length; i++) hook(frames[i]);
  }

  /* fallback: a click into the film moves focus into its frame */
  window.addEventListener('blur', function () {
    setTimeout(function () {
      var a = document.activeElement;
      if (a && a.tagName === 'IFRAME' && /player\.vimeo\.com/.test(a.src || '')) duck();
    }, 0);
  });

  function start() {
    scan();
    try { new MutationObserver(scan).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] }); } catch (e) { /* ignore */ }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();

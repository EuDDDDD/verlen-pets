/* Verlen opening film for the Carrd site.
   A title screen asks the visitor to click (browsers only allow sound after a click),
   then the tour film plays full screen with a Skip button, and fades into the site.
   Shown every time the page is opened (add ?nointro to the address to skip it while editing).
   Clicks on the letter and film are kept to this screen, so the site's own music and the
   walking mascots only start once the visitor is inside. */
(function () {
  if (/[?&]nointro\b/.test(location.search)) return;

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
    '#vl-intro.vl-playing .vl-poster { opacity: 0; }',
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

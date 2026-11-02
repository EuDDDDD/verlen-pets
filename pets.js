/* Verlen Pets — © EuDDDDD. All rights reserved. */
(function () {
  var SCRIPT_SRC = document.currentScript && document.currentScript.src;
  function boot() {
    if (document.getElementById('vlp-layer')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,600&family=Noto+Serif+TC:wght@500&display=swap';
    document.head.appendChild(link);
    var style = document.createElement('style');
    style.textContent = `#vlp-layer { position: fixed; left: 0; bottom: 0; width: 100%; height: 0; z-index: 9000; pointer-events: none; }
#vlp-pet { position: absolute; left: 0; bottom: 6px; pointer-events: auto; cursor: pointer; touch-action: none; will-change: transform; -webkit-tap-highlight-color: transparent; visibility: hidden; }
#vlp-pet.vlp-held { cursor: grabbing; }
#vlp-pet .vlp-flip { transform-origin: 50% 6%; }
#vlp-pet .vlp-frames { position: relative; transform-origin: 50% 100%; }
#vlp-pet img { display: block; height: 130px; width: auto; user-select: none; -webkit-user-select: none; -webkit-user-drag: none; pointer-events: none; }
#vlp-pet img + img { position: absolute; left: 0; top: 0; opacity: 0; }
#vlp-pet.vlp-walk .vlp-frames { animation: vlp-bob .62s ease-in-out infinite; }
#vlp-pet.vlp-walk .vlp-a { animation: vlp-fa .62s infinite; }
#vlp-pet.vlp-walk .vlp-b { animation: vlp-fb .62s infinite; }
#vlp-pet.vlp-talk .vlp-a, #vlp-pet.vlp-held .vlp-a, #vlp-pet.vlp-fall .vlp-a, #vlp-pet.vlp-land .vlp-a { opacity: 0; }
#vlp-pet.vlp-talk .vlp-f, #vlp-pet.vlp-land .vlp-f { opacity: 1; }
#vlp-pet.vlp-held .vlp-u, #vlp-pet.vlp-fall .vlp-u { opacity: 1; }
#vlp-pet.vlp-talk .vlp-frames { animation: vlp-hop .28s ease-out; }
#vlp-pet.vlp-held .vlp-frames { transform-origin: 50% 6%; animation: vlp-struggle .34s ease-in-out infinite; }
#vlp-pet.vlp-land .vlp-frames { animation: vlp-squash .34s ease-out; }
@keyframes vlp-bob { 0% { transform: translateY(0) rotate(-1deg); } 25% { transform: translateY(-4%) rotate(0deg); } 50% { transform: translateY(0) rotate(1deg); } 75% { transform: translateY(-4%) rotate(0deg); } 100% { transform: translateY(0) rotate(-1deg); } }
@keyframes vlp-fa { 0%, 49.99% { opacity: 1; } 50%, 100% { opacity: 0; } }
@keyframes vlp-fb { 0%, 49.99% { opacity: 0; } 50%, 100% { opacity: 1; } }
@keyframes vlp-hop { 0% { transform: translateY(0) scale(1, 1); } 40% { transform: translateY(-6%) scale(.97, 1.03); } 100% { transform: translateY(0) scale(1, 1); } }
@keyframes vlp-struggle { 0%, 100% { transform: rotate(-3.5deg); } 50% { transform: rotate(3.5deg); } }
@keyframes vlp-squash { 0% { transform: scale(1.14, .82); } 55% { transform: scale(.95, 1.06); } 100% { transform: scale(1, 1); } }
#vlp-pet .vlp-shadow { position: absolute; left: 50%; bottom: -3px; width: 52%; height: 5px; transform: translateX(-50%); border-radius: 50%; background: rgba(0, 0, 0, .45); filter: blur(3px); opacity: .7; pointer-events: none; }
#vlp-bubble { --vlp-shift: 0px; position: absolute; bottom: calc(100% + 12px); left: 50%; width: max-content; max-width: 250px; padding: 9px 15px 10px; background: radial-gradient(130% 120% at 30% 20%, #FBF4E4 0%, #EFE2C6 100%); color: #3A2C1A; border: 1px solid #B8955A; border-radius: 3px; box-shadow: inset 0 0 0 3px #F6ECD7, inset 0 0 0 4px #D5BA8A, 0 4px 14px rgba(0, 0, 0, .5); text-align: left; transform: translateX(calc(-50% + var(--vlp-shift))) translateY(6px); opacity: 0; pointer-events: none; transition: opacity .3s ease, transform .3s ease; z-index: 2; }
#vlp-bubble.vlp-show { opacity: 1; transform: translateX(calc(-50% + var(--vlp-shift))) translateY(0); }
#vlp-bubble::after { content: ""; position: absolute; top: 100%; left: calc(50% - var(--vlp-shift)); width: 11px; height: 11px; background: #EFE2C6; border-right: 1px solid #B8955A; border-bottom: 1px solid #B8955A; transform: translate(-50%, -6px) rotate(45deg); }
#vlp-bubble.vlp-side-r, #vlp-bubble.vlp-side-l { bottom: auto; top: 2%; transform: translateY(6px); }
#vlp-bubble.vlp-side-r { left: calc(100% + 12px); }
#vlp-bubble.vlp-side-l { left: auto; right: calc(100% + 12px); }
#vlp-bubble.vlp-side-r.vlp-show, #vlp-bubble.vlp-side-l.vlp-show { transform: none; }
#vlp-bubble.vlp-side-r::after { top: 14px; left: 0; transform: translate(-50%, 0) rotate(135deg); }
#vlp-bubble.vlp-side-l::after { top: 14px; left: 100%; transform: translate(-50%, 0) rotate(-45deg); }
#vlp-bubble .vlp-who { display: block; font-family: "Cormorant Garamond", Georgia, serif; font-style: italic; font-weight: 600; font-size: 13px; letter-spacing: .06em; line-height: 1.3; color: #8A6A38; margin: 0 0 3px; padding: 0 0 3px; border-bottom: 1px solid #DCC59A; }
#vlp-bubble .vlp-say { display: block; white-space: pre-line; font-family: "Noto Serif TC", "Songti TC", "PMingLiU", serif; font-weight: 500; font-size: 14px; line-height: 1.55; letter-spacing: .02em; }
@media (max-width: 736px) {
  #vlp-pet img { height: 96px; }
  #vlp-bubble { max-width: 200px; padding: 7px 12px 8px; }
  #vlp-bubble .vlp-say { font-size: 13px; }
  #vlp-bubble .vlp-who { font-size: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  #vlp-pet.vlp-walk .vlp-frames, #vlp-pet.vlp-talk .vlp-frames, #vlp-pet.vlp-held .vlp-frames, #vlp-pet.vlp-land .vlp-frames { animation: none; }
}
`;
    document.head.appendChild(style);
    var holder = document.createElement('div');
    holder.innerHTML = '<div id="vlp-layer"><div id="vlp-pet" role="button" tabindex="0" aria-label="維倫的居民"><div id="vlp-bubble"><span class="vlp-who"></span><span class="vlp-say"></span></div><div class="vlp-flip"><div class="vlp-frames"></div></div><div class="vlp-shadow"></div></div></div>';
    document.body.appendChild(holder.firstChild);
    (function () {
  /* ===== 圖片網址：換成你自己上傳的位置（結尾要有斜線） ===== */
  var BASE = SCRIPT_SRC ? SCRIPT_SRC.replace(/[^\/]*$/, '') : 'https://cdn.jsdelivr.net/gh/EuDDDDD/verlen-pets@main/';

  var CAST = [
    { id: 'grey', zh: '格雷', en: 'Grey',
      lines: [
        '你來維倫玩了嗎？',
        '渡鴉書屋進了新書，要一起去看看嗎？',
        '五點的鐘聲一響就該回家了｜……不過今天例外。',
        '你又在發呆了，在想什麼？',
        '時間還早，我們繞遠路回去吧。',
        '雨果先生又幫我留了一本書……別問是什麼書。',
        '社辦的紅茶剛煮好，要上來坐坐嗎？',
        '華特說辯論賽的題目又是新舊工坊……他大概又要熬夜了。',
        '這本借你。裡面夾了書籤，看到那頁再告訴我感想。',
        '光影館今晚剛好有一場，要一起去嗎？',
        '語朵又在社辦吃點心了，稿紙上全是糖粉。',
        '尼科又來問我家要不要跟凡恩家合作……我拒絕了。',
        '河畔咖啡館靠窗的位子，老樣子，幫你點了你常喝的。',
        '山謬昨天幫社辦修好了印刷機，連一句謝謝都不讓我說完。',
        '《河燈》這期還缺一篇稿子……你要不要寫寫看？'
      ],
      held: [
        '……這個高度看維倫，倒也不壞。',
        '我剛好也想上來看看你。',
        '小時候你也這樣拎過我的書包……還記得嗎？',
        '好了好了，我投降。',
        '從這裡看得到渡鴉書屋的屋頂嗎？',
        '要是被語朵看到，她大概會拍下來。',
        '放我下來吧，懷錶的鍊子纏住了。',
        '你今天心情不錯？',
        '被尼科看到的話，他會笑整整一個禮拜。',
        '這樣算是……邀我出去走走嗎？'
      ] },
    { id: 'euduo', zh: '語朵', en: 'Euduo',
      lines: [
        '今天好適合曬太陽喔～',
        '你聽過蜜糖齒輪嗎？',
        '別動別動！這個角度超好看的！',
        '爸爸今天燉了肉，要不要來灰野小館？',
        '河岸市集好像有新攤位，去看看嘛！',
        '妮娜阿姨今天又多送我半塊蘋果派！',
        '蜜糖齒輪的奶油卷剛出爐，晚一步就賣完了！',
        '爸爸打烊後一直在擦杯子，擦到亮得可以照鏡子！',
        '格雷社長又在社辦偷偷煮紅茶，我聞到了！',
        '山謬來小館都點黑啤燉牛肉，每次都吃兩碗喔！',
        '我量過了，從學院走到舊石橋剛好一千兩百步！',
        '尼科跟華特又在課堂上吵起來了，像兩隻炸毛的貓～',
        '要不要喝薑汁汽水？我請你！',
        '河岸步道那隻橘貓今天也在曬太陽，跟我一樣！',
        '妮娜阿姨說，常一起來吃甜點的兩個人會越來越要好喔～（偷看）｜'
      ],
      held: [
        '哇——好高！可以順便拍一張嗎？',
        '我離太陽好近喔～暖暖的！',
        '喔喔！從這裡可以量到整條街的長度！',
        '再高一點！我要拍維倫的屋頂！',
        '好好玩！再一次再一次！',
        '爸爸看到會嚇一跳吧～',
        '這是新遊戲嗎？下次換我拎你喔！',
        '我的包包要掉了啦！',
        '好像在坐坡道升降機喔～',
        '哈哈哈好癢——不要晃啦！'
      ] },
    { id: 'johnny', zh: '約翰尼', en: 'Johnny',
      lines: [
        '今天來灰野小館吃飯嗎？',
        '語朵又跑去哪拍照了……',
        '餓著肚子可做不了事，先吃飽再說。',
        '老位子幫你留著了。',
        '長堤那邊風大，記得多穿一件。',
        '今天的黑啤燉牛肉，燉得剛好。',
        '早上的漁獲市場，鱈魚很新鮮。',
        '小寶貝說你最近很忙。……記得吃飯。',
        '山謬那孩子，每次都吃兩碗。很好。',
        '週三公休，我會去老茶館下棋。',
        '打烊後擦杯子，是一天裡最安靜的時候。',
        '但丁那小子，又在咖啡館跟人辯論了吧。',
        '妮娜說我太久沒笑了，硬塞了一盒司康給我。……下次回她一鍋燉肉吧。',
        '雨果那老頭又引了書裡的話……｜說燉肉跟好書一樣，都得慢慢熬。',
        '熱湯還有，要不要喝一碗？',
        '小寶貝又帶朋友回來了。……多添一份菜。',
        '碼頭的風，比以前冷了。'
      ],
      held: [
        '喂喂，杯子還在我手上啊。',
        '真拿你沒辦法……',
        '……好久沒人這樣拎我了。',
        '小心，別閃到腰。',
        '我很重的，放下吧。',
        '小寶貝小時候最愛這樣玩。',
        '……這個高度，看得到碼頭。',
        '慢慢來，不急。',
        '呵。',
        '力氣不小嘛。……要不要來小館幫忙搬貨？'
      ] },
    { id: 'nico', zh: '尼科', en: 'Nico',
      lines: [
        '你們平民，也懂這個？',
        '本少爺就勉強帶你逛逛維倫吧。',
        '哼，別誤會，我只是剛好路過。',
        '光影館的包廂本少爺訂好了……你要來也不是不行。',
        '站直一點，跟在本少爺身邊可別丟臉。',
        '華特那傢伙，今天又在課堂上跟本少爺唱反調。',
        '格雷什麼時候才肯跟凡恩家合作？這可是穩賺的生意。',
        '划船社今年也得靠那個平民……哼，力氣大有什麼了不起。',
        '老城那股霉味，本少爺一步都不想踏進去。',
        '《維倫晨報》的工坊專欄，你讀過了嗎？……沒讀過？真遺憾。',
        '河岸劇院的包廂，你們平民一輩子也坐不到幾次吧？',
        '這只懷錶是純金的。……看什麼？想摸也不是不行。',
        '大商場頂樓的茶座，本少爺常年訂著靠窗的位子。',
        '華特居然在咖啡館打工？……真是辛苦他了呢～',
        '輸？本少爺的字典裡沒有這個字。'
      ],
      held: [
        '放肆！快放本少爺下來！',
        '這、這件大衣很貴的！別抓皺了！',
        '你知道這件訂製大衣值多少錢嗎？！',
        '要是被華特看到，本少爺饒不了你！',
        '這、這是什麼新的談判手段嗎？',
        '喂！袖扣要掉了！純金的！',
        '本少爺命令你——立刻——放下來！',
        '哼……要拎就拎穩一點。',
        '你們平民就是這麼沒禮貌。',
        '……本少爺可沒有在享受。'
      ] },
    { id: 'samuel', zh: '山謬', en: 'Samuel',
      lines: [
        '你來嗎？',
        '……牠在睡。小聲點。',
        '想摸的話，輕一點。',
        '工坊那邊還有活要做。',
        '……嗯。',
        '……汽笛。討厭。',
        '你的東西壞了？……拿來。',
        '黑啤燉牛肉。……兩碗。',
        '划船社。……尼科很吵。',
        '老師傅說，齒輪不會說謊。',
        '……語朵給的餅乾。分你一半。',
        '格雷……是好人。',
        '牠叫……還沒想好。你取。',
        '船槳斷了。修好了。',
        '……今天，天氣好。'
      ],
      held: [
        '……小心貓。',
        '……牠喜歡這樣。',
        '………',
        '……輕。',
        '……放下。',
        '貓，沒事。',
        '……奇怪。',
        '……（盯著你看）',
        '我很重。……你力氣，不小。',
        '……再一下，也可以。'
      ] },
    { id: 'walter', zh: '華特', en: 'Walter',
      lines: [
        '你又遲到了？',
        '……謝謝，但我自己來就好。',
        '河畔咖啡館的咖啡，還算能喝。',
        '別吵，我在看書。',
        '……昨晚又沒睡。別問。',
        '但丁老闆又跟客人辯起新舊工坊了。……他其實很會說。',
        '但丁老闆說左手的疤是他的勳章。……我不太懂。',
        '打工的薪水不多，但但丁老闆從不少算。',
        '父親店裡的每座鐘都很準。我也是。',
        '十一月的辯論賽，我不會輸。',
        '尼科那種人，懂什麼叫努力？',
        '成績榜上，我的名字還在前面。……這樣就好。',
        '圖書館靠窗的位子，是我先坐的。',
        '格雷的懷錶慢了兩分鐘。……我沒跟他說。',
        '帳目要條理分明，人也是。'
      ],
      held: [
        '……咖啡要灑了。',
        '……你這樣會害我遲到。',
        '請你放我下來。……我說「請」了。',
        '這不好笑。',
        '要是被尼科看到……你就完了。',
        '眼鏡……眼鏡要掉了。',
        '我不需要任何人幫忙｜——包括把我拎起來。',
        '你這樣浪費時間，不覺得可惜嗎？',
        '……我還沒算完帳。',
        '……三秒。給你三秒。'
      ] }
  ];

  var GAP_MIN = 3000, GAP_MAX = 8000, SPEED = 40, TALK_MS = 3200;

  var pet = document.getElementById('vlp-pet');
  var flip = pet.querySelector('.vlp-flip');
  var frames = pet.querySelector('.vlp-frames');
  var shadow = pet.querySelector('.vlp-shadow');
  var bubble = document.getElementById('vlp-bubble');
  var who = bubble.querySelector('.vlp-who');
  /* Chinese lines: start the second sentence on a new line (a pause in the speech) instead of
     letting the bubble wrap a few characters onto a lonely last line */
  function zhBreak(t) {
    /* a ｜ in the line file marks exactly where to break */
    if (t.indexOf('｜') >= 0) return t.replace(/\s*｜\s*$/, '').replace(/\s*｜\s*/g, '\n');   /* a ｜ at the very end means: keep it as one line */
    var m = /^(.+?[。！？]+[」』）]*)(?=\S)/.exec(t);
    /* a new beat that opens with …… is the natural pause: break there if it comes early enough */
    var e = /^(.+?[。！？]+[」』）]*)(?=……)/.exec(t);
    if (e && e[1].length <= 20) m = e;
    if (!m) {
      /* one long sentence: break at the comma nearest the middle instead */
      if (t.length < 15) return t;
      var best = -1, mid = t.length / 2;
      for (var i = 4; i + 4 < t.length; i++) if (t.charAt(i) === '，' && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i;
      return best < 0 ? t : t.slice(0, best + 1) + '\n' + t.slice(best + 1);
    }
    if (t.length < 12) return t;
    var rest = t.slice(m[1].length);
    if (rest.replace(/[。！？…\s]/g, '').length < 2) return t;
    return m[1] + '\n' + rest;
  }
  var say = bubble.querySelector('.vlp-say');

  var mode = 'off';
  var idx = Math.floor(Math.random() * CAST.length);
  var x = 0, y = 0, vy = 0, dir = 1, last = null;
  var ang = 0, angV = 0, vxS = 0, prevVx = 0;
  var quietUntil = 0, timer = null, lastLine = {};

  function cur() { return CAST[idx]; }
  function W() { return pet.offsetWidth || 70; }
  function H() { return pet.offsetHeight || 96; }
  function VW() { return document.documentElement.clientWidth || window.innerWidth; }
  function VH() { return window.innerHeight; }

  /* Walking runs as a browser animation on the compositor, so the mascot keeps moving
     smoothly even when the page itself is busy (scrolling, big images, music player). */
  var walk = null;
  function walkX() {
    if (!walk) { return x; }
    var t = walk.anim.currentTime || 0;
    return walk.x0 + walk.dir * SPEED * t / 1000;
  }
  function startWalk() {
    if (walk || !pet.animate) { return; }
    var x0 = x, x1 = dir === 1 ? VW() + 10 : -W() - 10;
    var dist = Math.abs(x1 - x0);
    if ((x1 - x0) * dir <= 0) { leave(); return; }
    flip.style.transform = 'scaleX(' + (dir === -1 ? -1 : 1) + ')';
    shadow.style.bottom = '-3px';
    shadow.style.transform = 'translateX(-50%)';
    shadow.style.opacity = '0.7';
    var anim = pet.animate([
      { transform: 'translate(' + x0.toFixed(1) + 'px,0px)' },
      { transform: 'translate(' + x1.toFixed(1) + 'px,0px)' }
    ], { duration: dist / SPEED * 1000, easing: 'linear', fill: 'forwards' });
    walk = { anim: anim, x0: x0, dir: dir };
    anim.onfinish = function () {
      if (!walk || walk.anim !== anim) { return; }
      x = x1; stopWalk(); if (mode === 'walk') { leave(); }
    };
  }
  function stopWalk() {
    if (!walk) { return; }
    x = walkX();
    var a = walk.anim;
    walk = null;
    pet.style.transform = 'translate(' + x.toFixed(1) + 'px,' + (-y).toFixed(1) + 'px)';
    a.cancel();
  }

  function setMode(m) {
    if (m !== 'walk') { stopWalk(); }
    mode = m;
    pet.className = m === 'off' ? '' : 'vlp-' + m;
  }

  function img(cls, file) {
    return '<img class="' + cls + '" alt="" draggable="false" src="' + BASE + file + '.webp">';
  }

  function preload() {
    CAST.forEach(function (c) {
      ['walk1', 'walk2', 'front', 'up'].forEach(function (n) { var i = new Image(); i.src = BASE + c.id + '_' + n + '.webp'; });
    });
  }

  function load(i) {
    idx = i;
    var c = cur();
    frames.innerHTML = img('vlp-a', c.id + '_walk1') + img('vlp-b', c.id + '_walk2') + img('vlp-f', c.id + '_front') + img('vlp-u', c.id + '_up');
    pet.setAttribute('aria-label', c.zh + '，點一下會說話，按住可以拎起來');
  }

  function enter() {
    dir = Math.random() < 0.5 ? 1 : -1;
    x = dir === 1 ? -W() - 10 : VW() + 10;
    y = 0; ang = 0; angV = 0;
    pet.style.visibility = 'visible';
    setMode('walk');
    place();
  }

  function leave() {
    hideBubble();
    setMode('off');
    pet.style.visibility = 'hidden';
    load((idx + 1) % CAST.length);
    setTimeout(enter, GAP_MIN + Math.random() * (GAP_MAX - GAP_MIN));
  }

  function place() {
    if (walk) { return; }
    pet.style.transform = 'translate(' + x.toFixed(1) + 'px,' + (-y).toFixed(1) + 'px)';
    var flipX = mode === 'walk' && dir === -1;
    flip.style.transform = 'rotate(' + ang.toFixed(2) + 'deg) scaleX(' + (flipX ? -1 : 1) + ')';
    var s = Math.max(0.35, 1 - Math.max(0, y) / 260);
    shadow.style.bottom = (-3 - Math.max(0, y)) + 'px';
    shadow.style.transform = 'translateX(-50%) scale(' + s.toFixed(3) + ')';
    shadow.style.opacity = (0.7 * s).toFixed(3);
  }

  function land() {
    y = 0; ang = 0; angV = 0;
    hideBubble();
    setMode('land');
    quietUntil = performance.now() + 7000;
    setTimeout(function () {
      if (mode !== 'land') { return; }
      dir = x + W() / 2 < VW() / 2 ? 1 : -1;
      setMode('walk');
    }, 520);
  }

  function frame(t) {
    if (last === null) { last = t; }
    var dt = Math.min((t - last) / 1000, 0.05);
    last = t;
    if (mode === 'walk') {
      if (pet.animate) { startWalk(); x = walkX(); }
      else {
        x += dir * SPEED * dt;
        if ((dir === 1 && x > VW() + 10) || (dir === -1 && x < -W() - 10)) { leave(); }
      }
    } else if (mode === 'held') {
      var ax = (vxS - prevVx) / Math.max(dt, 0.001);
      prevVx = vxS;
      angV += (-90 * ang - 7 * angV - ax * 0.045) * dt;
      ang += angV * dt;
      if (ang > 42) { ang = 42; angV *= -0.3; }
      if (ang < -42) { ang = -42; angV *= -0.3; }
      vxS *= Math.pow(0.02, dt);
    } else if (mode === 'fall') {
      vy -= 2600 * dt;
      y += vy * dt;
      x += vxS * dt;
      vxS *= Math.pow(0.3, dt);
      x = Math.max(0, Math.min(VW() - W(), x));
      ang += -ang * Math.min(1, dt * 8);
      if (y <= 0) { land(); }
    }
    if (mode !== 'off' && !walk) { place(); }
    requestAnimationFrame(frame);
  }

  function pick(list, key) {
    if (list.length === 1) { return list[0]; }
    var l;
    do { l = list[Math.floor(Math.random() * list.length)]; } while (l === lastLine[key]);
    lastLine[key] = l;
    return l;
  }

  function clampBubble() {
    bubble.style.setProperty('--vlp-shift', '0px');
    bubble.classList.remove('vlp-side-r', 'vlp-side-l');
    var b = bubble.getBoundingClientRect();
    var m = pet.getBoundingClientRect();
    if (m.top < b.height + 22) {
      bubble.classList.add(VW() - m.right > b.width + 20 ? 'vlp-side-r' : 'vlp-side-l');
      return;
    }
    var shift = 0, pad = 8;
    if (b.left < pad) { shift = pad - b.left; }
    if (b.right > VW() - pad) { shift = VW() - pad - b.right; }
    var limit = b.width / 2 - 16;
    shift = Math.max(-limit, Math.min(limit, shift));
    bubble.style.setProperty('--vlp-shift', shift + 'px');
  }

  function showBubble(text) {
    var c = cur();
    who.textContent = c.en + ' · ' + c.zh;
    say.textContent = zhBreak(text);
    clampBubble();
    bubble.classList.add('vlp-show');
  }

  function hideBubble() {
    if (timer) { clearTimeout(timer); timer = null; }
    bubble.classList.remove('vlp-show');
  }

  function speak() {
    if (mode !== 'walk' && mode !== 'talk') { return; }
    hideBubble();
    setMode('talk');
    place();
    showBubble(pick(cur().lines, cur().id + 'l'));
    timer = setTimeout(function () {
      hideBubble();
      if (mode === 'talk') { setMode('walk'); }
    }, TALK_MS);
  }

  var press = null;

  pet.addEventListener('pointerdown', function (e) {
    if (mode === 'fall' || mode === 'off') { return; }
    var r = pet.getBoundingClientRect();
    press = { id: e.pointerId, sx: e.clientX, sy: e.clientY, offX: e.clientX - r.left, offY: Math.min(e.clientY - r.top, H() * 0.25), moved: false, lx: e.clientX, lt: performance.now() };
    try { pet.setPointerCapture(e.pointerId); } catch (err) {}
  });

  pet.addEventListener('pointermove', function (e) {
    if (!press || e.pointerId !== press.id) { return; }
    if (!press.moved && Math.hypot(e.clientX - press.sx, e.clientY - press.sy) > 6) {
      press.moved = true;
      hideBubble();
      setMode('held');
      ang = 0; angV = 0; vxS = 0; prevVx = 0;
      showBubble(pick(cur().held, cur().id + 'h'));
    }
    if (!press.moved) { return; }
    var now = performance.now();
    var vx = (e.clientX - press.lx) / Math.max((now - press.lt) / 1000, 0.001);
    vxS = vxS * 0.6 + vx * 0.4;
    press.lx = e.clientX; press.lt = now;
    x = Math.max(-W() * 0.3, Math.min(VW() - W() * 0.7, e.clientX - press.offX));
    var groundTop = VH() - 6 - H();
    y = Math.max(0, Math.min(groundTop - 4, groundTop - (e.clientY - press.offY)));
    clampBubble();
  });

  function release(e) {
    if (!press || e.pointerId !== press.id) { return; }
    var dragged = press.moved;
    press = null;
    if (!dragged) { speak(); return; }
    vy = 0;
    if (y <= 1) { land(); } else { setMode('fall'); }
  }
  pet.addEventListener('pointerup', release);
  pet.addEventListener('pointercancel', release);
  pet.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); speak(); }
  });

  setInterval(function () {
    var onScreen = x > 20 && x < VW() - W() - 20;
    if (mode === 'walk' && onScreen && performance.now() > quietUntil && Math.random() < 0.35) { speak(); }
  }, 5000);

  preload();
  load(idx);
  setTimeout(enter, 1500);
  requestAnimationFrame(frame);
})();
  }
  /* wait until the opening letter and film are over */
  function go() {
    if (document.documentElement.classList.contains('vl-intro-on')) {
      document.addEventListener('verlen:intro-done', function () { setTimeout(boot, 400); }, { once: true });
      return;
    }
    boot();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else setTimeout(go, 0);
})();

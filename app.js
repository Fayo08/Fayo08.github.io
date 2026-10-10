/* Oyende Favour · portfolio. Plain JavaScript, no build step. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s) { return document.querySelector(s); };

  /* ------------------------------------------------------------------
   * The work. One list drives the tree, the cube faces and the CLI.
   * `todo` lines show in amber until Favour fills them in.
   * ------------------------------------------------------------------ */
  var WORKS = [
    {
      slug: 'lagos-life', name: 'Lagos Life Besties', year: '2026', kind: 'Game feature · solo',
      tags: ['TypeScript', 'Canvas', 'Vite', 'Tests'],
      about: 'A playable feature concept for Lagos Life, the Nigerian life-sim. Chat with a friend three days in a row and you unlock a company together. Ride through Lagos in a keke, danfo or their car, get stuck in the Third Mainland go-slow, and land together at Quilox.',
      did: ['Designed the whole loop: streaks, trust, co-owned companies, shared rides', 'Canvas renderer for the drive, three cameras, isometric venues, day and night', '36 tests on the game rules; money splits in basis points, no naira lost', 'CI/CD on GitHub Actions'],
      links: [['play', 'https://fayo08.github.io/LagosLifeBestieDemo/'], ['code', 'https://github.com/Fayo08/LagosLifeBestieDemo']],
      demo: true,
    },
    {
      slug: 'talent-trace', name: 'TalentTrace', year: '2025', kind: 'Team project · Communiti',
      tags: ['React', 'Vite', 'Tailwind', 'Firebase'],
      about: 'Snapshot, a feature for the Communiti platform. New tech grads answer guided questions and get a polished one-page skills snapshot in under five minutes, shareable as a link, PDF or image.',
      did: ['Built the landing hero', 'Saved users’ answers to Firebase'],
      links: [['code', 'https://github.com/Fayo08/TalentTrace']],
      todo: 'add the live link',
    },
    {
      slug: 'instock', name: 'InStock', year: '', kind: 'Web app',
      tags: ['Web app'],
      about: '',
      did: [],
      links: [],
      todo: 'one line on what InStock does, your part, stack and link',
    },
    {
      slug: 'find-my-mechanic', name: 'Find My Mechanic', year: '', kind: 'Mobile app · UX',
      tags: ['UX', 'Mobile'],
      about: 'A mobile app for finding a trusted mechanic nearby, with a map of shops and booking in a few taps.',
      did: [],
      links: [],
      todo: 'confirm the description and add your part, tools and a link',
    },
    {
      slug: 'neuromedix', name: 'Neuromedix', year: '', kind: 'Hackathon · 2nd place',
      tags: ['Hackathon', 'Health tech'],
      about: 'A neuroscience hackathon project that placed second.',
      did: [],
      links: [],
      todo: 'what it does and what you built',
    },
    {
      slug: 'bbva', name: 'BBVA website', year: '', kind: 'Website · nonprofit',
      tags: ['Webflow', 'UX'],
      about: 'The website for the Black Business Ventures Association, built in Webflow so the team can update it themselves.',
      did: [],
      links: [],
      todo: 'add the site link',
    },
  ];

  /* ------------------------------------------------------------------
   * Hero: falling glyphs, with a few Yorùbá letters in the mix
   * ------------------------------------------------------------------ */
  (function rain() {
    var cv = $('#rain');
    if (!cv) return;
    var c = cv.getContext('2d');
    var glyphs = '01ABCDEFGHIJKLMNOPQRSTUVWXYZẸỌṢẹọṣ<>/{}=;$#*+-ŃÀÉÌÒÙ'.split('');
    var fs = 16, cols = 0, drops = [], w = 0, h = 0, dpr = 1, last = 0;
    function size() {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / fs);
      drops = Array.from({ length: cols }, function () { return Math.random() * -h / fs; });
      c.fillStyle = '#070a08'; c.fillRect(0, 0, w, h);
    }
    function frame(t) {
      if (t - last > 55) {
        last = t;
        c.fillStyle = 'rgba(7,10,8,0.12)';
        c.fillRect(0, 0, w, h);
        c.font = '500 ' + fs + "px 'JetBrains Mono', monospace";
        for (var i = 0; i < cols; i++) {
          var y = drops[i] * fs;
          var ch = glyphs[(Math.random() * glyphs.length) | 0];
          c.fillStyle = Math.random() < 0.04 ? '#d6ffe6' : (i % 3 ? '#1fae5c' : '#0f6b37');
          c.fillText(ch, i * fs, y);
          if (y > h && Math.random() > 0.975) drops[i] = 0;
          drops[i] += 1;
        }
      }
      if (!reduceMotion) requestAnimationFrame(frame);
    }
    size();
    window.addEventListener('resize', size);
    if (reduceMotion) { for (var k = 0; k < 60; k++) frame(k * 60); } else requestAnimationFrame(frame);
  })();

  /* Typed role line */
  (function typed() {
    var el = $('#typed');
    if (!el || reduceMotion) return;
    var lines = ['frontend developer & ux designer', 'i build things people come back to', 'react · typescript · react native', 'game loops, streaks, dashboards'];
    var li = 0, ci = lines[0].length, dir = -1;
    function step() {
      var s = lines[li];
      ci += dir;
      el.textContent = s.slice(0, ci);
      if (dir < 0 && ci <= 0) { dir = 1; li = (li + 1) % lines.length; }
      else if (dir > 0 && ci >= lines[li].length) { dir = -1; return setTimeout(step, 2200); }
      setTimeout(step, dir > 0 ? 55 : 25);
    }
    setTimeout(step, 2600);
  })();

  /* ------------------------------------------------------------------
   * Selected works as a component tree
   * ------------------------------------------------------------------ */
  (function tree() {
    var ol = $('#tree');
    var ind = function (n, hot) { var s = ''; for (var i = 0; i < n; i++) s += '<span class="ind' + (hot ? ' hot' : '') + '"></span>'; return s; };
    var rows = [
      ind(0) + '<span class="t"><span class="kw">function</span> <span class="fn">Render</span>(works) {</span>',
      ind(1) + '<span class="t"><span class="kw">return</span> (</span>',
      ind(2) + '<span class="t"><span class="tg">&lt;SelectedWorks&gt;</span></span>',
    ];
    WORKS.forEach(function (w, i) {
      rows.push(ind(3, true) + '<button class="work" type="button" data-slug="' + w.slug + '"><span class="t"><span class="tg">&lt;Work</span> <span class="at">name</span>=<span class="st">"' + w.name + '"</span>' + (w.year ? ' <span class="at">year</span>=<span class="st">"' + w.year + '"</span>' : '') + ' <span class="tg">/&gt;</span></span><span class="go">open ↵</span></button>');
    });
    rows.push(ind(2) + '<span class="t"><span class="tg">&lt;/SelectedWorks&gt;</span></span>');
    rows.push(ind(1) + '<span class="t">);</span>');
    rows.push(ind(0) + '<span class="t">}</span>');
    rows.push(ind(0) + '<span class="t cm">// click a work to open it in the cube ↓</span>');
    ol.innerHTML = rows.map(function (r) { return '<li>' + r + '</li>'; }).join('');
    ol.addEventListener('click', function (e) {
      var b = e.target.closest('button.work');
      if (!b) return;
      document.getElementById('works').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
      run('open ' + b.dataset.slug);
    });
  })();

  /* ------------------------------------------------------------------
   * The cube: six faces, one per work. Drag to spin, tap a face to open.
   * ------------------------------------------------------------------ */
  var cube = $('#cube');
  var FACES = [
    { rx: 0, ry: 0, tf: 'rotateY(0deg)' },
    { rx: 0, ry: -90, tf: 'rotateY(90deg)' },
    { rx: 0, ry: -180, tf: 'rotateY(180deg)' },
    { rx: 0, ry: 90, tf: 'rotateY(-90deg)' },
    { rx: -90, ry: 0, tf: 'rotateX(90deg)' },
    { rx: 90, ry: 0, tf: 'rotateX(-90deg)' },
  ];
  cube.innerHTML = WORKS.map(function (w, i) {
    return '<div class="face" data-slug="' + w.slug + '" style="transform:' + FACES[i].tf + ' translateZ(calc(var(--cube) / 2))">' +
      '<div class="term-bar"><i></i><i></i><i></i><span>~/works/' + w.slug + '</span></div>' +
      '<div class="face-body"><span class="k">// ' + (i + 1).toString().padStart(2, '0') + '</span><h3>' + w.name + '</h3>' +
      '<span class="meta">' + w.kind + (w.year ? ' · ' + w.year : '') + '</span>' +
      '<div class="tags">' + w.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div>' +
      '<span class="run">$ <b>open ' + w.slug + '</b></span></div></div>';
  }).join('');

  var rot = { x: -18, y: 28 }, target = null, auto = !reduceMotion, idleAt = 0;
  function applyRot() { cube.style.transform = 'rotateX(' + rot.x + 'deg) rotateY(' + rot.y + 'deg)'; }
  function nearest(a, b) { var d = ((b - a) % 360 + 540) % 360 - 180; return a + d; }
  function showFace(i) {
    var f = FACES[i];
    // Tilt a little off-axis so it still reads as a cube
    target = { x: nearest(rot.x, f.rx - 8), y: nearest(rot.y, f.ry + 12) };
    auto = false; idleAt = performance.now() + 9000;
    cube.querySelectorAll('.face').forEach(function (el, k) { el.classList.toggle('on', k === i); });
    if (reduceMotion) { rot = target; target = null; applyRot(); }
  }
  (function spin() {
    var lastT = 0;
    function tick(t) {
      var dt = lastT ? Math.min(50, t - lastT) : 16; lastT = t;
      if (target) {
        rot.x += (target.x - rot.x) * 0.08; rot.y += (target.y - rot.y) * 0.08;
        if (Math.abs(target.x - rot.x) < 0.05 && Math.abs(target.y - rot.y) < 0.05) { rot = target; target = null; }
      } else if (auto && !dragging) {
        rot.y += dt * 0.012; rot.x = -18 + Math.sin(t / 2400) * 6;
      } else if (!dragging && idleAt && t > idleAt) { auto = true; idleAt = 0; }
      applyRot();
      requestAnimationFrame(tick);
    }
    applyRot();
    if (!reduceMotion) requestAnimationFrame(tick);
  })();

  var dragging = false, start = null, moved = false;
  var stage = $('#stage');
  stage.addEventListener('pointerdown', function (e) { dragging = true; moved = false; start = { x: e.clientX, y: e.clientY, rx: rot.x, ry: rot.y }; target = null; auto = false; stage.setPointerCapture(e.pointerId); });
  stage.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - start.x, dy = e.clientY - start.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
    rot.y = start.ry + dx * 0.45; rot.x = Math.max(-80, Math.min(80, start.rx - dy * 0.45));
    if (reduceMotion) applyRot();
  });
  function endDrag() { if (!dragging) return; dragging = false; idleAt = performance.now() + 6000; }
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);
  cube.addEventListener('click', function (e) {
    if (moved) return;
    var f = e.target.closest('.face');
    if (f) run('open ' + f.dataset.slug);
  });

  /* ------------------------------------------------------------------
   * The CLI
   * ------------------------------------------------------------------ */
  var out = $('#out'), input = $('#cmd'), history = [], hi = 0;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function print(html, cls) { var p = document.createElement('p'); if (cls) p.className = cls; p.innerHTML = html; out.appendChild(p); out.scrollTop = out.scrollHeight; return p; }
  function blank() { print(''); }
  function findWork(q) {
    q = (q || '').toLowerCase().trim();
    if (!q) return null;
    var n = parseInt(q, 10);
    if (!isNaN(n) && WORKS[n - 1]) return WORKS[n - 1];
    return WORKS.filter(function (w) { return w.slug === q || w.slug.indexOf(q) === 0 || w.name.toLowerCase().indexOf(q) === 0; })[0] || null;
  }

  var COMMANDS = {
    help: function () {
      [['ls', 'list the work'], ['open <name|#>', 'open a project (spins the cube)'], ['run lagos-life', 'play the Lagos Life demo'], ['whoami', 'who built this'], ['skills', 'what I work with'], ['contact', 'how to reach me'], ['clear', 'clear the screen']]
        .forEach(function (r) { print('  <span class="ok">' + esc(r[0]).padEnd(16, ' ') + '</span><span class="dim">' + r[1] + '</span>'); });
      print('  <span class="dim">tip: tab completes names, ↑ ↓ go through history</span>');
    },
    ls: function () {
      WORKS.forEach(function (w, i) {
        print('  <span class="dim">' + String(i + 1).padStart(2, '0') + '</span>  <span class="ok">' + w.slug.padEnd(18, ' ') + '</span><span class="dim">' + esc(w.kind) + '</span>');
      });
    },
    open: function (arg) {
      var w = findWork(arg);
      if (!w) { print('open: no such work: ' + esc(arg || '') + ' <span class="dim">(try ls)</span>', 'warn'); return; }
      showFace(WORKS.indexOf(w));
      document.querySelectorAll('#tree button.work').forEach(function (b) { b.classList.toggle('on', b.dataset.slug === w.slug); });
      print('<span class="ok">▸ ' + esc(w.name) + '</span>  <span class="dim">' + esc(w.kind) + (w.year ? ' · ' + w.year : '') + '</span>');
      if (w.about) print('  ' + esc(w.about));
      if (w.did.length) { print('  <span class="key">built:</span>'); w.did.forEach(function (d) { print('   - ' + esc(d)); }); }
      print('  <span class="key">stack:</span> ' + w.tags.map(esc).join(', '));
      if (w.links.length || w.demo) {
        var p = print('  ');
        if (w.demo) p.insertAdjacentHTML('beforeend', '<button class="inline" type="button" data-run="run ' + w.slug + '">▶ play demo</button>');
        w.links.forEach(function (l) { p.insertAdjacentHTML('beforeend', ' <a href="' + l[1] + '" target="_blank" rel="noopener">' + l[0] + ' ↗</a> '); });
      }
      if (w.todo) print('  <span class="warn"># todo: ' + esc(w.todo) + '</span>');
    },
    cd: function (arg) { COMMANDS.open(arg); },
    cat: function (arg) { COMMANDS.open(arg); },
    run: function (arg) {
      var w = findWork(arg || 'lagos-life');
      if (!w || !w.demo) { print('run: ' + esc(arg || '') + ' has no live demo here. Try <span class="ok">run lagos-life</span>', 'warn'); return; }
      print('<span class="dim">starting lagos-life… opening the phone</span>');
      openDemo();
    },
    whoami: function () {
      print('<span class="ok">Oyende Favour</span> <span class="dim">(Fayo)</span>');
      print('  frontend developer &amp; ux designer · Calgary, AB · born in Nigeria');
      print('  background in frontend, UX and talent recruiting');
      print('  <a href="#about">more in ./about</a>');
    },
    skills: function () {
      print('  <span class="key">build</span>   React, React Native, TypeScript, JavaScript, Vite, Canvas');
      print('  <span class="key">style</span>   Tailwind, Sass, CSS');
      print('  <span class="key">ship</span>    Firebase, GitHub Actions, testing, Webflow');
      print('  <span class="key">design</span>  UX design, user flows');
      print('  <span class="key">work</span>    AI orchestration, finance dashboards');
    },
    contact: function () {
      print('  <span class="key">github</span>    <a href="https://github.com/Fayo08" target="_blank" rel="noopener">github.com/Fayo08</a>');
      print('  <span class="warn"># todo: email and linkedin</span>');
      print('  <a href="#contact">jump to ./contact</a>');
    },
    clear: function () { out.innerHTML = ''; },
    sudo: function (arg) {
      if (/hire/i.test(arg || '')) { print('[sudo] permission granted 🎉', 'ok'); COMMANDS.contact(); }
      else print('nice try. only <span class="ok">sudo hire favour</span> works here.', 'warn');
    },
  };
  COMMANDS.works = COMMANDS.ls; COMMANDS.dir = COMMANDS.ls; COMMANDS.about = COMMANDS.whoami;

  function run(line) {
    line = line.trim();
    print('<span class="ps">$</span> ' + esc(line), 'cmd');
    if (!line) return;
    history.push(line); hi = history.length;
    var parts = line.split(/\s+/), name = parts.shift().toLowerCase(), arg = parts.join(' ');
    var fn = COMMANDS[name];
    if (fn) fn(arg);
    else if (findWork(line)) COMMANDS.open(line);
    else print(esc(name) + ': command not found. type <span class="ok">help</span>', 'warn');
    blank();
  }

  $('#cli').addEventListener('submit', function (e) { e.preventDefault(); run(input.value); input.value = ''; });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp') { if (hi > 0) { hi--; input.value = history[hi]; } e.preventDefault(); }
    else if (e.key === 'ArrowDown') { if (hi < history.length - 1) { hi++; input.value = history[hi]; } else { hi = history.length; input.value = ''; } e.preventDefault(); }
    else if (e.key === 'Tab') {
      var m = input.value.match(/^(open|run|cd|cat)\s+(\S*)$/i);
      if (m) {
        var hit = WORKS.filter(function (w) { return w.slug.indexOf(m[2].toLowerCase()) === 0; });
        if (hit.length === 1) { input.value = m[1] + ' ' + hit[0].slug; e.preventDefault(); }
        else if (hit.length > 1) { print(hit.map(function (w) { return w.slug; }).join('   '), 'dim'); e.preventDefault(); }
      }
    }
  });
  out.addEventListener('click', function (e) { var b = e.target.closest('[data-run]'); if (b) run(b.dataset.run); });

  var chips = $('#chips');
  ['help', 'ls', 'open lagos-life', 'run lagos-life', 'whoami', 'sudo hire favour'].forEach(function (c) {
    var b = document.createElement('button'); b.type = 'button'; b.textContent = c;
    b.addEventListener('click', function () { run(c); });
    chips.appendChild(b);
  });

  /* Boot: print a banner and open the featured work when the section first comes into view */
  print('<span class="ascii"> ┌─┐┬ ┬┌─┐┌┐┌┌┬┐┌─┐  ┌─┐┌─┐┬  ┬┌─┐┬ ┬┬─┐\n │ │└┬┘├┤ │││ ││├┤   ├┤ ├─┤└┐┌┘│ ││ │├┬┘\n └─┘ ┴ └─┘┘└┘─┴┘└─┘  └  ┴ ┴ └┘ └─┘└─┘┴└─</span>');
  print('<span class="dim">portfolio v2026 · type</span> <span class="ok">help</span> <span class="dim">or tap a command below</span>');
  blank();
  var booted = false;
  function boot() {
    if (booted) return; booted = true;
    setTimeout(function () { run('ls'); }, 300);
    setTimeout(function () { run('open lagos-life'); }, 1300);
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es, o) { if (es.some(function (x) { return x.isIntersecting; })) { boot(); o.disconnect(); } }, { threshold: 0.3 }).observe($('#works'));
  } else boot();

  /* ------------------------------------------------------------------
   * Demo modal
   * ------------------------------------------------------------------ */
  var modal = $('#demo'), frame = $('#demoFrame'), lastFocus = null;
  function openDemo() {
    lastFocus = document.activeElement;
    if (!frame.src) frame.src = frame.dataset.src;
    modal.hidden = false;
    $('#demoClose').focus();
  }
  function closeDemo() { modal.hidden = true; if (lastFocus) lastFocus.focus(); }
  $('#demoClose').addEventListener('click', closeDemo);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeDemo(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeDemo(); });
})();

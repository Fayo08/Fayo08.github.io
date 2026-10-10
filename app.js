/* Oyende Favour · portfolio. Plain JavaScript, no build step. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s) { return document.querySelector(s); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ------------------------------------------------------------------
   * The work. One list drives the tree, the cube faces, the CLI and the rain.
   * `todo` lines show in amber until the link is added.
   * ------------------------------------------------------------------ */
  var WORKS = [
    {
      slug: 'lagos-life', name: 'Lagos Life Besties', year: '2026', kind: 'Game feature · solo',
      img: 'media/lagos-ride.webp', img2: 'media/lagos-land.webp', tags: ['TypeScript', 'Canvas', 'Vite', 'Tests'],
      about: 'A playable feature concept for Lagos Life, the Nigerian life-sim. Chat with a friend three days in a row and you unlock a company together. Ride through Lagos in a keke, danfo or their car, get stuck in the Third Mainland go-slow, and land together at Quilox.',
      did: ['Designed the loop: chat streaks, trust, co-owned companies, shared rides', 'Canvas renderer for the drive, three cameras, isometric venues, day and night', '36 tests on the game rules; money splits in basis points, no naira lost', 'CI/CD on GitHub Actions'],
      links: [['play', 'https://fayo08.github.io/LagosLifeBestieDemo/'], ['code', 'https://github.com/Fayo08/LagosLifeBestieDemo']],
      demo: true,
    },
    {
      slug: 'myareaa', name: 'MyAreaa', year: '2026', kind: 'Full-stack · community fintech',
      img: 'media/myareaa.webp', tags: ['Full-stack', 'Fintech', 'Community'],
      about: 'MyAreaa is about financial well-being. It is a community-focused app that provides financial services for users: they can donate, save and contribute money towards a shared goal.',
      did: [], links: [], todo: 'add the link to MyAreaa',
    },
    {
      slug: 'talent-trace', name: 'TalentTrace', year: '2025', kind: 'Snapshot for Communiti · MakeItMVP',
      img: 'media/talenttrace.webp', tags: ['React', 'Vite', 'Tailwind', 'Firebase'],
      about: 'The problem: how do you help job-seekers showcase their skills and achievements quickly and effectively? I built Snapshot, a dynamic, exportable profile that puts their key strengths front and centre so candidates stand out in a competitive job market.',
      did: ['Built the Snapshot feature with the team at MakeItMVP', 'Landing hero, and saving users’ answers to Firebase'],
      links: [['code', 'https://github.com/Fayo08/TalentTrace']],
    },
    {
      slug: 'instock', name: 'InStock', year: '2024', kind: 'Inventory management web app',
      img: 'media/instock.webp', tags: ['React', 'Express', 'MySQL', 'Knex'],
      about: 'Inventory management for warehouses. Users can add, edit and delete warehouses and the managers in charge of them, view each warehouse’s inventory, edit item details and create new items.',
      did: ['Built with React and an Express + MySQL API (Knex migrations and seeds)', 'Full CRUD for warehouses and inventory, with form validation'],
      links: [['live', 'https://fayo08.github.io/InStock-client/'], ['client', 'https://github.com/Fayo08/InStock-client'], ['server', 'https://github.com/Fayo08/inStock-server']],
    },
    {
      slug: 'find-my-mechanic', name: 'Find My Mechanic', year: '2024', kind: 'Mobile-first web app',
      img: 'media/mechanic.webp', tags: ['React', 'Express', 'MySQL', 'Maps'],
      about: 'Helps drivers in urgent situations by connecting them with nearby, reliable mechanics. Beyond emergencies, it makes booking and scheduling repairs simple, so trusted help is a few taps away.',
      did: ['React front end with Google Maps, booking and reviews', 'Express + MySQL API for mechanics, services and reviews'],
      links: [['live', 'https://fayo08.github.io/Find-my-mechanic/'], ['client', 'https://github.com/Fayo08/Find-my-mechanic'], ['server', 'https://github.com/Fayo08/Find-my-mechanic-Backend']],
    },
    {
      slug: 'neuromedix', name: 'Neuromedix', year: '', kind: 'Drug discovery · hackathon 2nd place',
      img: 'media/neuromedix.webp', tags: ['Python', 'JavaScript', 'ML'],
      about: 'Helps small pharmaceutical companies synthesize new drug candidates more efficiently.',
      did: ['Used Python for model refinement', 'Built the JavaScript front end for a product designed to speed up drug discovery'],
      links: [], note: 'private repository',
    },
  ];

  /* ------------------------------------------------------------------
   * Hero: rain made of project names, falling letter by letter
   * ------------------------------------------------------------------ */
  var WORDS = ['LAGOS LIFE', 'BESTIES', 'MYAREAA', 'TALENTTRACE', 'SNAPSHOT', 'INSTOCK', 'FIND MY MECHANIC', 'NEUROMEDIX', 'FAYO'];
  var setRainBoost = function () {};
  (function rain() {
    var cv = $('#rain');
    if (!cv) return;
    var c = cv.getContext('2d');
    var fs = 16, cols = [], w = 0, h = 0, last = 0, boost = 0;
    function pick() { return WORDS[(Math.random() * WORDS.length) | 0]; }
    function size() {
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      w = cv.clientWidth; h = cv.clientHeight;
      if (!w || !h) return;
      cv.width = w * dpr; cv.height = h * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.ceil(w / fs);
      cols = Array.from({ length: n }, function () { return { y: Math.random() * -h / fs, word: pick(), i: 0, speed: 0.6 + Math.random() * 0.7 }; });
      c.fillStyle = '#0b0f0c'; c.fillRect(0, 0, w, h);
    }
    setRainBoost = function (v) { boost = v; };
    function frame(t) {
      if (t - last > 50) {
        last = t;
        c.fillStyle = 'rgba(11,15,12,' + (boost ? 0.2 : 0.1) + ')';
        c.fillRect(0, 0, w, h);
        c.font = '500 ' + fs + "px 'JetBrains Mono', monospace";
        for (var k = 0; k < cols.length; k++) {
          var col = cols[k];
          col.y += col.speed * (boost ? 2.2 : 1);
          var row = Math.floor(col.y);
          if (row !== col.row) {
            col.row = row;
            var ch = col.word[col.i % col.word.length];
            col.i++;
            if (ch !== ' ') {
              // The head of each word is bright; the rest fades as it falls
              c.fillStyle = col.i === 1 ? '#d6ffe6' : (k % 3 ? '#1fae5c' : '#0f6b37');
              c.fillText(ch, k * fs, row * fs);
            }
            if (col.i >= col.word.length) { col.i = 0; col.word = pick(); col.y += 1.2; }
          }
          if (col.y * fs > h + 40 && Math.random() > 0.96) { col.y = -Math.random() * 10; col.i = 0; col.word = pick(); }
        }
      }
      if (!reduceMotion) requestAnimationFrame(frame);
    }
    size();
    window.addEventListener('resize', size);
    if (reduceMotion) { for (var s = 0; s < 120; s++) frame(s * 60); } else requestAnimationFrame(frame);
  })();

  /* ------------------------------------------------------------------
   * Hero: the editor types its own source, compiles, then renders the name
   * ------------------------------------------------------------------ */
  var GUTTER_LINES = 60;
  (function gutter() {
    var g = $('#gutter');
    var html = '';
    for (var i = 1; i <= GUTTER_LINES; i++) html += '<li></li>';
    g.innerHTML = html;
  })();
  function setCursor(line, col) {
    var lis = document.querySelectorAll('#gutter li');
    lis.forEach(function (li, i) { li.classList.toggle('cur', i === line - 1); });
    $('#stPos').textContent = 'Ln ' + line + ', Col ' + col;
  }

  // Each source line is a list of [class, text] tokens so it can be typed with highlighting
  var SRC = [
    [['k', 'import'], ['', ' { '], ['v', 'Name'], ['', ' } '], ['k', 'from'], ['', ' '], ['s', '"./fayo"'], ['', ';']],
    [],
    [['k', 'export default function'], ['', ' '], ['f', 'Hero'], ['', '() {']],
    [['', '  '], ['k', 'return'], ['', ' '], ['t', '<Name'], ['', ' '], ['a', 'first'], ['', '='], ['s', '"Favour"'], ['', ' '], ['a', 'last'], ['', '='], ['s', '"Oyende"'], ['', ' '], ['t', '/>'], ['', ';']],
    [['', '}']],
  ];
  function lineHTML(tokens, upto) {
    var out = '', n = 0;
    for (var i = 0; i < tokens.length; i++) {
      var cls = tokens[i][0], txt = tokens[i][1];
      if (upto !== undefined && n >= upto) break;
      var take = upto === undefined ? txt : txt.slice(0, upto - n);
      n += take.length;
      out += cls ? '<span class="' + cls + '">' + esc(take) + '</span>' : esc(take);
    }
    return out;
  }
  function lineLen(tokens) { return tokens.reduce(function (s, t) { return s + t[1].length; }, 0); }

  var heroRun = 0;
  function scramble(el, target, dur, done) {
    var glyphs = 'LAGOSBESTIMYRNDCHXU#<>/{}';
    var start = performance.now();
    (function step(now) {
      var p = Math.min(1, (now - start) / dur), out = '';
      for (var i = 0; i < target.length; i++) {
        out += p * target.length > i + 0.6 ? target[i] : glyphs[(Math.random() * glyphs.length) | 0];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(step); else if (done) done();
    })(start);
  }
  function playHero() {
    var run = ++heroRun;
    var src = $('#src'), inner = $('#heroInner'), state = $('#stState');
    var lines = SRC.map(function () { return ''; });
    function paint(active) {
      src.innerHTML = SRC.map(function (_, i) { return '<span class="ln' + (i === active ? ' on' : '') + '">' + (lines[i] || ' ') + '</span>'; }).join('\n');
    }
    if (reduceMotion) {
      SRC.forEach(function (t, i) { lines[i] = lineHTML(t); });
      paint(-1); inner.className = 'hero-inner built'; setCursor(SRC.length, 2);
      return;
    }
    inner.className = 'hero-inner typing';
    state.textContent = '● typing';
    $('#n1').textContent = ''; $('#n2').textContent = '';
    var li = 0, ci = 0;
    paint(0);
    (function type() {
      if (run !== heroRun) return;
      if (li >= SRC.length) return compile();
      var tok = SRC[li], len = lineLen(tok);
      if (ci <= len) {
        lines[li] = lineHTML(tok, ci);
        paint(li);
        setCursor(li + 1, ci + 1);
        ci++;
        return setTimeout(type, len ? 14 + Math.random() * 22 : 50);
      }
      li++; ci = 0;
      setTimeout(type, 110);
    })();
    function compile() {
      state.textContent = '⟳ compiling…';
      setRainBoost(1);
      setTimeout(function () {
        if (run !== heroRun) return;
        state.textContent = '✓ compiled in 0.42s';
        setRainBoost(0);
        inner.className = 'hero-inner rendering';
        scramble($('#n1'), 'OYENDE', 700);
        setTimeout(function () {
          scramble($('#n2'), 'FAVOUR', 700, function () {
            if (run !== heroRun) return;
            inner.className = 'hero-inner built';
            setCursor(SRC.length, 2);
          });
        }, 200);
      }, 650);
    }
  }
  playHero();
  $('#replay').addEventListener('click', playHero);

  /* Typed role line, after the hero is built */
  (function typed() {
    var el = $('#typed');
    if (!el || reduceMotion) return;
    var lines = ['full-stack developer · react, typescript, python', 'i build things people come back to', 'frontend + backend model refinement', 'currently: full-stack @ myareaa'];
    var li = 0, ci = lines[0].length, dir = -1;
    function step() {
      ci += dir;
      el.textContent = lines[li].slice(0, ci);
      if (dir < 0 && ci <= 0) { dir = 1; li = (li + 1) % lines.length; }
      else if (dir > 0 && ci >= lines[li].length) { dir = -1; return setTimeout(step, 2400); }
      setTimeout(step, dir > 0 ? 50 : 22);
    }
    setTimeout(step, 5200);
  })();

  /* ------------------------------------------------------------------
   * Favour's code snippets: shown in their own section and drifting behind the page
   * ------------------------------------------------------------------ */
  var SNIPPETS = [
    {
      file: 'TextField.jsx', from: 6, note: 'InStock · reusable form field with validation',
      code: String.raw`function TextField({
  label,
  name,
  placeholder,
  value,
  onChange,
  hasError,
  id,
  validationType,
}) {
  const isEmpty = value.trim() === "";

  const inputClasses = classNames("text-field", {
    "text-field--error": hasError && isEmpty,
  });


  function formatPhoneNumber(phoneNumber) {
    const phonePattern = /^\+(\d{1,2})\s?\((\d{3})\)\s?(\d{3})-(\d{4})$/;

    return phonePattern.test(phoneNumber);
  }

  const validate = () => {
    switch (validationType) {
      case "phone":
        return formatPhoneNumber(value);
      case "email":
        return value.includes("@");
      default:
        return !isEmpty;
    }
  };

  const isValid = validate();

  return (
    <div className="form-group">`,
    },
    {
      file: 'Question.jsx', from: 57, note: 'TalentTrace · upload an image to Firebase from a question card',
      code: String.raw`  //handler for image change
  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
    onImageChange(questionData.questionId, e.target.value);
  };

  const handleUploadImage = async () => {
    if (!imageUrl?.trim()) {
      alert('Please provide an image URL');
      return;
    }

    try {
      await updateImageUrls(
        questionData.questionId,
        questionData.skillId,
        imageUrl
      );
      console.log('Image uploaded successfully!');
      setUploadedImageUrl(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Card className="flex flex-col p-[33px] px-[64px] mb-16 gap-[10px] border border-[#003660] bg-white shadow-md">
      <CardHeader>
        <CardDescription
          className="text-[#003660] font-montserrat text-[16px] font-normal leading-[24px] pb-4"
          style={{
            color: 'var(--Blue-Blue12, #003660)',
            fontFeatureSettings: "'liga' off, 'clig' off",
          }}
        >
          {' '}
          Question {questionNumber} - {questionData.skillName} (
          {questionData.categoryName})
        </CardDescription>`,
    },
  ];

  // A small JSX highlighter: comments, strings, regex, tags, keywords, functions, numbers
  var KW = /^(function|const|let|var|return|if|else|switch|case|default|try|catch|await|async|export|import|from|new)$/;
  function highlight(line) {
    var re = /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\/\^.*\$\/)|(<\/?[A-Za-z][\w.]*|\/?>)|([A-Za-z_$][\w$]*)(?=\s*\()|([A-Za-z_$][\w$]*)|(\d+)/g;
    var out = '', last = 0, m;
    while ((m = re.exec(line))) {
      out += esc(line.slice(last, m.index));
      var t = esc(m[0]);
      if (m[1]) out += '<span class="cm">' + t + '</span>';
      else if (m[2]) out += '<span class="st">' + t + '</span>';
      else if (m[3]) out += '<span class="rx">' + t + '</span>';
      else if (m[4]) out += '<span class="tg">' + t + '</span>';
      else if (m[5]) out += KW.test(m[5]) ? '<span class="kw">' + t + '</span>' : '<span class="fn">' + t + '</span>';
      else if (m[6]) out += KW.test(m[6]) ? '<span class="kw">' + t + '</span>' : t;
      else if (m[7]) out += '<span class="nu">' + t + '</span>';
      last = re.lastIndex;
    }
    return out + esc(line.slice(last));
  }
  (function snippets() {
    var tabs = $('#snipTabs'), body = $('#snipBody'), status = $('#snipStatus');
    function show(i) {
      var s = SNIPPETS[i];
      tabs.querySelectorAll('button').forEach(function (b, k) { b.classList.toggle('on', k === i); b.setAttribute('aria-selected', k === i); });
      body.innerHTML = '<ol class="code-lines" start="' + s.from + '">' + s.code.split('\n').map(function (l) { return '<li>' + (highlight(l) || ' ') + '</li>'; }).join('') + '</ol>';
      body.style.setProperty('--start', s.from - 1);
      status.innerHTML = '<span>' + esc(s.note) + '</span><span>' + s.code.split('\n').length + ' lines · JavaScript React</span>';
    }
    SNIPPETS.forEach(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'tab'; b.setAttribute('role', 'tab'); b.textContent = s.file;
      b.addEventListener('click', function () { show(i); });
      tabs.appendChild(b);
    });
    show(0);
  })();

  /* Background code: Favour's snippets drifting up the page */
  (function bgcode() {
    var far = $('#bgFar'), near = $('#bgNear');
    var src = SNIPPETS.map(function (s) { return s.code; }).join('\n\n');
    var block = (src + '\n\n').repeat(2);
    far.textContent = block + block;
    near.textContent = block.split('\n').filter(function (_, i) { return i % 3 === 0; }).join('\n\n').repeat(2);
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
    WORKS.forEach(function (w) {
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
   * A cube per work. Each spins on its own; tap one to open it in the CLI.
   * Faces: front = screenshot, right = name, back = about (or a 2nd shot),
   * left = stack, top/bottom = the command that opens it.
   * ------------------------------------------------------------------ */
  var grid = $('#cubes');
  function faceSet(w, i) {
    var bar = '<span class="bar"><i></i><i></i><i></i><em>' + w.slug + '</em></span>';
    var back = w.img2
      ? '<span class="f f-back">' + bar + '<img src="' + w.img2 + '" alt="" loading="lazy" draggable="false"></span>'
      : '<span class="f f-back f-about"><span class="k">// about</span>' + esc(w.about.split('. ')[0].slice(0, 120)) + (w.about.length > 120 ? '…' : '.') + '</span>';
    return '<span class="f f-front">' + bar + '<img src="' + w.img + '" alt="" loading="lazy" draggable="false"></span>' +
      '<span class="f f-right f-name"><span class="k">// ' + String(i + 1).padStart(2, '0') + '</span><b>' + esc(w.name) + '</b><span>' + esc(w.kind) + (w.year ? ' · ' + w.year : '') + '</span></span>' +
      back +
      '<span class="f f-left f-tags"><span class="k">// stack</span>' + w.tags.map(function (t) { return '<span class="chip">' + esc(t) + '</span>'; }).join('') + '</span>' +
      '<span class="f f-top f-cmd">$ open<br><b>' + w.slug + '</b></span>' +
      '<span class="f f-bottom f-cmd">$ open<br><b>' + w.slug + '</b></span>';
  }
  grid.innerHTML = WORKS.map(function (w, i) {
    return '<button class="cell" type="button" data-slug="' + w.slug + '" aria-label="Open ' + esc(w.name) + '">' +
      '<span class="cube3"><span class="c3">' + faceSet(w, i) + '</span></span><span class="shadow" aria-hidden="true"></span>' +
      '<span class="cap"><span class="n">' + String(i + 1).padStart(2, '0') + '</span> ' + esc(w.name) + '</span></button>';
  }).join('');

  var cubes = Array.prototype.map.call(grid.querySelectorAll('.cell'), function (el, i) {
    return { el: el, c3: el.querySelector('.c3'), slug: el.dataset.slug, ry: 20 + i * 47, rx: -16, v: 0.011 + (i % 3) * 0.003, hover: false, active: false, phase: i * 1.3 };
  });
  function nearest(a, b) { var d = ((b - a) % 360 + 540) % 360 - 180; return a + d; }
  function paintCube(c) { c.c3.style.transform = 'rotateX(' + c.rx.toFixed(2) + 'deg) rotateY(' + c.ry.toFixed(2) + 'deg)'; }
  function focusCube(slug) {
    cubes.forEach(function (c) { c.active = c.slug === slug; c.el.classList.toggle('on', c.active); });
    if (reduceMotion) cubes.forEach(function (c) { if (c.active) { c.ry = -24; c.rx = -10; } paintCube(c); });
  }
  cubes.forEach(function (c) {
    c.el.addEventListener('pointerenter', function () { c.hover = true; });
    c.el.addEventListener('pointerleave', function () { c.hover = false; });
    c.el.addEventListener('click', function () {
      run('open ' + c.slug);
      // On narrow screens the terminal sits below the cubes, so bring it into view
      if (window.matchMedia('(max-width: 880px)').matches) $('#term').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
    paintCube(c);
  });
  (function spinAll() {
    if (reduceMotion) return;
    var lastT = 0, visible = true;
    if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(grid);
    function tick(t) {
      var dt = lastT ? Math.min(50, t - lastT) : 16; lastT = t;
      if (visible) cubes.forEach(function (c) {
        if (c.active) {
          // Ease round to the screenshot, slightly angled so it still reads as a cube
          var ty = nearest(c.ry, -24);
          c.ry += (ty - c.ry) * 0.08; c.rx += (-10 - c.rx) * 0.08;
        } else {
          c.ry += dt * c.v * (c.hover ? 0.2 : 1);
          c.rx = -16 + Math.sin(t / 2600 + c.phase) * 7;
        }
        paintCube(c);
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  /* ------------------------------------------------------------------
   * The CLI
   * ------------------------------------------------------------------ */
  var out = $('#out'), input = $('#cmd'), history = [], hi = 0, opened = false;
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
      [['ls', 'list the work'], ['open <name|#>', 'open a project (spins the cube)'], ['run lagos-life', 'play the Lagos Life demo'], ['cat snippets', 'jump to my code'], ['whoami', 'who built this'], ['skills', 'what I work with'], ['contact', 'how to reach me'], ['clear', 'clear the screen']]
        .forEach(function (r) { print('  <span class="ok">' + esc(r[0]).padEnd(16, ' ') + '</span><span class="dim">' + r[1] + '</span>'); });
      print('  <span class="dim">tip: tab completes names, ↑ ↓ go through history</span>');
    },
    ls: function () {
      WORKS.forEach(function (w, i) {
        print('  <span class="dim">' + String(i + 1).padStart(2, '0') + '</span>  <span class="ok">' + w.slug.padEnd(18, ' ') + '</span><span class="dim">' + esc(w.kind) + '</span>');
      });
    },
    open: function (arg) {
      if (/^snippets?$/i.test(arg || '')) { document.getElementById('snippets').scrollIntoView({ behavior: 'smooth' }); print('<span class="dim">opening ./snippets…</span>'); return; }
      var w = findWork(arg);
      if (!w) { print('open: no such work: ' + esc(arg || '') + ' <span class="dim">(try ls)</span>', 'warn'); return; }
      opened = true;
      focusCube(w.slug);
      document.querySelectorAll('#tree button.work').forEach(function (b) { b.classList.toggle('on', b.dataset.slug === w.slug); });
      print('<span class="ok">▸ ' + esc(w.name) + '</span>  <span class="dim">' + esc(w.kind) + (w.year ? ' · ' + w.year : '') + '</span>');
      print('<img class="thumb" src="' + w.img + '" alt="Screenshot of ' + esc(w.name) + '">');
      if (w.about) print('  ' + esc(w.about));
      if (w.did.length) { print('  <span class="key">built:</span>'); w.did.forEach(function (d) { print('   - ' + esc(d)); }); }
      print('  <span class="key">stack:</span> ' + w.tags.map(esc).join(', '));
      if (w.links.length || w.demo) {
        var p = print('  ');
        if (w.demo) p.insertAdjacentHTML('beforeend', '<button class="inline" type="button" data-run="run ' + w.slug + '">▶ play demo</button>');
        w.links.forEach(function (l) { p.insertAdjacentHTML('beforeend', ' <a href="' + l[1] + '" target="_blank" rel="noopener">' + l[0] + ' ↗</a> '); });
      }
      if (w.note) print('  <span class="dim">' + esc(w.note) + '</span>');
      if (w.todo) print('  <span class="warn"># todo: ' + esc(w.todo) + '</span>');
    },
    run: function (arg) {
      var w = findWork(arg || 'lagos-life');
      if (!w || !w.demo) { print('run: ' + esc(arg || '') + ' has no live demo here. Try <span class="ok">run lagos-life</span>', 'warn'); return; }
      print('<span class="dim">starting lagos-life… opening the phone</span>');
      openDemo();
    },
    whoami: function () {
      print('<span class="ok">Oyende Favour</span> <span class="dim">(Fayo)</span>');
      print('  full-stack developer · Calgary, AB · born in Nigeria');
      print('  frontend development + backend model refinement');
      print('  <a href="#about">more in ./about</a>');
    },
    skills: function () {
      print('  <span class="key">code</span>    TypeScript, JavaScript, React, React Native, Python, Java, SQL');
      print('  <span class="key">data</span>    Firebase, graph databases');
      print('  <span class="key">mobile</span>  React Native, Expo');
      print('  <span class="key">design</span>  UI design, UX design, UX research, prototyping, animation');
    },
    contact: function () {
      print('  <span class="key">email</span>    <a href="mailto:oyendefavour12@gmail.com">oyendefavour12@gmail.com</a>');
      print('  <span class="key">behance</span>  <a href="https://www.behance.net/oyendefavour" target="_blank" rel="noopener">behance.net/oyendefavour</a>');
      print('  <span class="key">github</span>   <a href="https://github.com/Fayo08" target="_blank" rel="noopener">github.com/Fayo08</a>');
    },
    clear: function () { out.innerHTML = ''; },
    sudo: function (arg) {
      if (/hire/i.test(arg || '')) { print('[sudo] permission granted 🎉', 'ok'); COMMANDS.contact(); }
      else print('nice try. only <span class="ok">sudo hire favour</span> works here.', 'warn');
    },
  };
  COMMANDS.cd = COMMANDS.open; COMMANDS.cat = COMMANDS.open;
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

  /* Boot: banner, then `ls` and the featured work when the section first comes into view */
  print('<span class="ascii"> ┌─┐┬ ┬┌─┐┌┐┌┌┬┐┌─┐  ┌─┐┌─┐┬  ┬┌─┐┬ ┬┬─┐\n │ │└┬┘├┤ │││ ││├┤   ├┤ ├─┤└┐┌┘│ ││ │├┬┘\n └─┘ ┴ └─┘┘└┘─┴┘└─┘  └  ┴ ┴ └┘ └─┘└─┘┴└─</span>');
  print('<span class="dim">portfolio v2026 · type</span> <span class="ok">help</span> <span class="dim">or tap a command below</span>');
  blank();
  // List the work when the section first comes into view, unless something is already open
  var booted = false;
  function boot() {
    if (booted) return; booted = true;
    setTimeout(function () { if (!opened) { run('ls'); print('<span class="dim">tap a cube, or type</span> <span class="ok">open &lt;name&gt;</span>'); blank(); } }, 300);
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

// ═══════════════════════════════════════════════════════════
//  app.js — Class A Farewell Website
//  All UI logic, animations, interactions
// ═══════════════════════════════════════════════════════════

// ── Student & Teacher name lists ──────────────────────────
// TODO: Replace with real names when ready

const STUDENT_NAMES = [
  'Bilal',  'Ayub',  'Barez',  'Evan',  'Faima Abdulla',
  'Ahmed Mamand',  'Ahmed Aziz',  'Aalan',  'Darwin',  'Sarwin',
  'Bushra', 'Balla', 'Fatima Jabr', 'Zina', 'Dllnya',
  'Suhaib Sardar', 'Pewist', 'Mustafa', 'Marwan', 'Emran',
  'Mahmud', 'Karox', 'Shallaw', 'Ibrahem', 'Asma',
  'Mazn', 'Rayan Hersh', 'Rayan Ahmed', 'Ashna Xalid', 'Dina Tayb',
  'Taza', 'Dllxosh', 'Dina Adnan', 'Ragaz Taha', 'Esra',
  'Eman', 'Zhwan', 'Sara Mawlan', 'Roshna',
];

const TEACHER_NAMES = [
  'M.Gaylan',  'St. Asma',  'St. Jyan',  'St. Pari',  'St. Awreng',
  'St. Tabarak',  'St. Sairan',  'St. Shahla',  'St. Bahra',  'St. Shiaw',
];

// ── State ─────────────────────────────────────────────────
let currentLang = 'en';
let currentTab = 'students';
let teacherSelectedStudents = [];
let reviewSubTab = 'students';
let studentSession = null; // holds the logged-in student's Supabase session
let teacherSession = null; // holds the logged-in teacher's Supabase session

// ── i18n strings ─────────────────────────────────────────
const i18n = {
  en: {
    eyebrow_students: 'For classmates',
    title_students: 'Leave your farewell',
    desc_students: 'Share a memory, say something to the whole class, or write a heartfelt message to a classmate.',
    label_your_name: 'Your name',
    label_tag: 'Write to someone (optional)',
    label_for_all: '— For everyone in Class A —',
    label_msg: 'Your message',
    ph_name: 'Enter your full name…',
    ph_msg: 'Say what is in your heart…',
    send: 'Send message',
    success_title: 'Your words are saved.',
    success_sub: 'They will be remembered forever by Class A.',
    write_another: 'Write another',
    eyebrow_teachers: 'For teachers',
    title_teachers: 'Choose your students',
    desc_teachers: 'Select your name, pick exactly 3 students, then write a personal note for each one.',
    label_teacher_name: 'Your name',
    step1: 'Your name', step2: 'Pick students', step3: 'Write notes',
    continue: 'Continue',
    pick_students: 'Pick exactly 3 students',
    selected_of: 'selected',
    write_note: 'Write your notes',
    submit_all: 'Submit all messages',
    teacher_success_title: 'All messages saved.',
    teacher_success_sub: 'Your students will carry your words forever.',
    write_again: 'Write again',
    review_title: 'Admin review',
    review_desc: 'Sign in to see all submissions.',
    email: 'Email', password: 'Password',
    sign_in: 'Sign in',
    sign_out: 'Sign out',
    tab_students: 'Students',
    tab_teachers: 'Teachers',
    tab_review: 'Review',
    all_students: 'Student messages',
    all_teachers: 'Teacher messages',
    no_messages: 'No messages yet.',
    to: 'To',
    hero_sub: 'Leave your words — they last forever',
    ph_pass: '••••••••',
    select_name: '— Select your name —',
    // Student login
    student_login_title: 'Sign in to continue',
    student_login_desc: 'Use the email and password sent to you by your class admin.',
    student_login_btn: 'Sign in',
    student_logout: 'Sign out',
    student_logged_as: 'Signed in as',
    login_error: 'Wrong email or password — try again.',
    already_sent: 'You already submitted a message. Sign out to go back.',
    teacher_login_title: 'Sign in to continue',
    teacher_login_desc: 'Use the teacher email and password provided by admin.',
    teacher_login_btn: 'Sign in',
    teacher_logout: 'Sign out',
    teacher_logged_as: 'Signed in as',
  },
  ar: {
    eyebrow_students: 'للزملاء',
    title_students: 'اترك وداعك',
    desc_students: 'شارك ذكرى، قل شيئاً للصف بأكمله، أو اكتب رسالة لزميل.',
    label_your_name: 'اسمك',
    label_tag: 'اكتب لشخص معين (اختياري)',
    label_for_all: '— للجميع في الصف أ —',
    label_msg: 'رسالتك',
    ph_name: 'أدخل اسمك الكامل…',
    ph_msg: 'قل ما في قلبك…',
    send: 'أرسل الرسالة',
    success_title: 'كُتبت كلماتك.',
    success_sub: 'سيتذكرها الصف أ إلى الأبد.',
    write_another: 'اكتب رسالة أخرى',
    eyebrow_teachers: 'للمعلمين',
    title_teachers: 'اختر طلابك',
    desc_teachers: 'اختر اسمك، حدد ٣ طلاب بالضبط، ثم اكتب ملاحظة شخصية لكل واحد منهم.',
    label_teacher_name: 'اسمك',
    step1: 'اسمك', step2: 'اختر الطلاب', step3: 'اكتب الرسائل',
    continue: 'تابع',
    pick_students: 'اختر ٣ طلاب بالضبط',
    selected_of: 'محدد',
    write_note: 'اكتب ملاحظاتك',
    submit_all: 'أرسل كل الرسائل',
    teacher_success_title: 'تم حفظ كل الرسائل.',
    teacher_success_sub: 'سيحمل طلابك كلماتك إلى الأبد.',
    write_again: 'اكتب مرة أخرى',
    review_title: 'مراجعة المشرف',
    review_desc: 'سجّل دخولك لرؤية جميع الرسائل.',
    email: 'البريد الإلكتروني', password: 'كلمة المرور',
    sign_in: 'تسجيل الدخول',
    sign_out: 'تسجيل الخروج',
    tab_students: 'الطلاب',
    tab_teachers: 'المعلمون',
    tab_review: 'المراجعة',
    all_students: 'رسائل الطلاب',
    all_teachers: 'رسائل المعلمين',
    no_messages: 'لا رسائل حتى الآن.',
    to: 'إلى',
    hero_sub: 'اترك كلماتك — ستبقى إلى الأبد',
    ph_pass: '••••••••',
    select_name: '— اختر اسمك —',
    student_login_title: 'سجّل دخولك للمتابعة',
    student_login_desc: 'استخدم البريد الإلكتروني وكلمة المرور التي أرسلها لك المشرف.',
    student_login_btn: 'تسجيل الدخول',
    student_logout: 'تسجيل الخروج',
    student_logged_as: 'مسجّل دخول كـ',
    login_error: 'البريد أو كلمة المرور خاطئة — حاول مجدداً.',
    already_sent: 'لقد أرسلت رسالتك بالفعل. سجّل خروجاً للعودة.',
    teacher_login_title: 'سجّل دخولك للمتابعة',
    teacher_login_desc: 'استخدم البريد الإلكتروني وكلمة المرور التي أرسلها لك المشرف.',
    teacher_login_btn: 'تسجيل الدخول',
    teacher_logout: 'تسجيل الخروج',
    teacher_logged_as: 'مسجّل دخول كـ',
  },
  ku: {
    eyebrow_students: 'بۆ هاوڕێکان',
    title_students:' نامەیەک جێبێڵە',
    desc_students: 'یادگاریێک بڵێ، شتێک بۆ هەموو پۆلەکە بنووسە، یان پەیامێک بۆ هاوڕێیەکت بنووسە.',
    label_your_name: 'ناوت',
    label_tag: 'بۆ کەسێکی دیاریکراو بنووسە (دیاری نییە)',
    label_for_all: '—  بۆ هەموو  کڵاسی A —',
    label_msg: 'پەیامت',
    ph_name: 'ناوی تەواوت بنووسە…',
    ph_msg: 'ئەوەی لە دڵتدایە بڵێ…',
    send: 'پەیام بنێرە',
    success_title: 'وشەکانت تۆمار کران.',
    success_sub: 'کڵاسی A هەتاهەتایە تەنگی ئەوانە دەبێت.',
    write_another: 'یەکی تر بنووسە',
    eyebrow_teachers: 'بۆ مامۆستایان',
    title_teachers: 'خوێندکارەکانت هەڵبژێرە',
    desc_teachers: '  تەنها ٣ خوێندکار هەڵبژێرە، دوای ئەوە تێبینییەکی تایبەت بۆ هەر یەکێکیان بنووسە.',
    label_teacher_name: 'ناوت',
    step1: 'ناوت', step2: 'خوێندکار هەڵبژێرە', step3: 'تێبینی بنووسە',
    continue: 'بەردەوام بە',
    pick_students: 'تەنها ٣ خوێندکار هەڵبژێرە',
    selected_of: 'هەڵبژێردراو',
    write_note: 'تێبینیەکانت بنووسە',
    submit_all: 'هەموو پەیامەکان بنێرە',
    teacher_success_title: 'هەموو پەیامەکان تۆمار کران.',
    teacher_success_sub: 'خوێندکارەکانت هەتاهەتایە وشەکان لەگەڵ دەبن.',
    write_again: 'دووبارە بنووسە',
    review_title: 'پێداچوونەوەی بەڕێوەبەر',
    review_desc: 'بچۆ ژوورەوە بۆ بینینی هەموو پەیامەکان.',
    email: 'ئیمەیڵ', password: 'وشەی نهێنی',
    sign_in: 'چوونە ژووەوە',
    sign_out: 'چوونە دەرەوە',
    tab_students: 'خوێندکاران',
    tab_teachers: 'مامۆستایان',
    tab_review: 'پێداچوونەوە',
    all_students: 'پەیامی خوێندکاران',
    all_teachers: 'پەیامی مامۆستایان',
    no_messages: 'هێشتا هیچ پەیامێک نییە.',
    to: 'بۆ',
    hero_sub: 'وشەکانت بهێڵە — هەتاهەتایە دەمێنن',
    ph_pass: '••••••••',
    select_name: '— ناوت هەڵبژێرە —',
    student_login_title: 'بچۆ ژوورەوە بۆ بەردەوام بوون',
    student_login_desc: 'ئیمەیڵ و وشەی نهێنییەکە بەکاربێنە کە بەڕێوەبەری پۆلەکەت پێتداوە.',
    student_login_btn: 'چوونە ژووەوە',
    student_logout: 'چوونە دەرەوە',
    student_logged_as: 'چوویتەژورەوە وەک',
    login_error: 'ئیمەیڵ یان وشەی نهێنی هەڵەیە — دووبارە هەوڵبدەرەوە.',
    already_sent: 'پێشتر پەیامت نێردووە. دەرببە بۆ گەڕانەوە.',
    teacher_login_title: 'بچۆ ژوورەوە بۆ بەردەوام بوون',
    teacher_login_desc: 'ئیمەیڵ و وشەی نهێنییەکە بەکاربێنە کە بەڕێوەبەری پۆلەکەت پێتداوە.',
    teacher_login_btn: 'چوونە ژووەوە',
    teacher_logout: 'چوونە دەرەوە',
    teacher_logged_as: 'چوویتەژووەوە وەک',
  }
};

function t(key) { return i18n[currentLang][key] || i18n.en[key] || key; }

// ── DOM helpers ───────────────────────────────────────────
const $ = id => document.getElementById(id);
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
};

// ── PARTICLE CANVAS ───────────────────────────────────────
function initParticles() {
  const canvas = $('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x     = Math.random() * W;
      this.y     = Math.random() * H;
      this.r     = Math.random() * 1.5 + 0.3;
      this.vx    = (Math.random() - 0.5) * 0.3;
      this.vy    = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.6 ? '#D5575E' : '#FEFEFE';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  for (let i = 0; i < 90; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#D5575E';
          ctx.globalAlpha = (1 - dist / 100) * 0.08;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => { p.update(); p.draw(); });
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }
  loop();
}

// ── LANG SWITCH ───────────────────────────────────────────
function setLang(l) {
  currentLang = l;
  const dir = (l === 'ar' || l === 'ku') ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', dir);
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === l);
  });
  renderCurrentPanel();
}

// ── TABS ──────────────────────────────────────────────────
function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === tab);
    b.textContent = t('tab_' + b.dataset.tab);
  });
  const panel = $('panel-' + tab);
  panel.classList.add('active');
  // Re-render the panel so it reflects the current language
  renderCurrentPanel();
}

function renderCurrentPanel() {
  if (currentTab === 'students')      buildStudentPanel();
  else if (currentTab === 'teachers') buildTeacherPanel();
  else if (currentTab === 'review')   initReview();

  document.querySelectorAll('.tab-btn').forEach(b => {
    b.textContent = t('tab_' + b.dataset.tab);
  });
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === currentLang);
  });
  updateHeroSub();
}

function updateHeroSub() {
  const sub = $('hero-sub');
  if (sub) sub.textContent = t('hero_sub');
}

// ── TOAST ─────────────────────────────────────────────────
function toast(msg, dur = 3200) {
  const toastEl = $('toast');
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), dur);
}

// ══════════════════════════════════════════════════════════
//  STUDENT PANEL  — now with login gate
// ══════════════════════════════════════════════════════════

function buildStudentPanel() {
  const p = $('panel-students');

  if (!studentSession) {
    // ── Step 0: Login gate ─────────────────────────────
    p.innerHTML = `
      <div class="sec-header">
        <div class="sec-eyebrow">${t('eyebrow_students')}</div>
        <div class="sec-title">${t('title_students').replace('farewell','<em>farewell</em>').replace('وداعك','<em>وداعك</em>')}</div>
        <div class="sec-desc">${t('desc_students')}</div>
      </div>
      <div class="login-wrap">
        <div class="glass-card">
          <div class="login-icon">🎓</div>
          <div class="login-heading">${t('student_login_title')}</div>
          <div class="login-hint">${t('student_login_desc')}</div>
          <div class="field">
            <label class="field-label">${t('email')}</label>
            <input id="sl-email" class="field-input" type="email"
              placeholder="your@epu.com" autocomplete="email"/>
          </div>
          <div class="field">
            <label class="field-label">${t('password')}</label>
            <input id="sl-pass" class="field-input" type="password"
              placeholder="${t('ph_pass')}" autocomplete="current-password"/>
          </div>
          <button class="btn btn-primary" id="sl-btn" onclick="studentLogin()">
            ${t('student_login_btn')} <span class="btn-icon">→</span>
          </button>
        </div>
      </div>`;
    return;
  }

  // ── Step 1+: Logged in — show message form ─────────────
  const displayName = dbGetStudentName(studentSession);

  p.innerHTML = `
    <div class="sec-header">
      <div class="sec-eyebrow">${t('eyebrow_students')}</div>
      <div class="sec-title">${t('title_students').replace('farewell','<em>farewell</em>').replace('وداعك','<em>وداعك</em>')}</div>
      <div class="sec-desc">${t('desc_students')}</div>
    </div>
    <!-- Logged-in badge -->
    <div class="student-badge">
      <div class="student-badge-inner">
        <span class="badge-avatar">${displayName.charAt(0).toUpperCase()}</span>
        <span class="badge-name">${t('student_logged_as')} <strong>${esc(displayName)}</strong></span>
      </div>
      <button class="btn btn-ghost badge-logout" onclick="studentLogout()">${t('student_logout')}</button>
    </div>
    <div id="s-form-wrap">
      <div class="glass-card">
        <!-- Name is read-only, taken from account -->
        <div class="field">
          <label class="field-label">${t('label_your_name')}</label>
          <div class="field-readonly">${esc(displayName)}</div>
        </div>
        <div class="field">
          <label class="field-label">${t('label_tag')}</label>
          <select id="s-tag" class="field-select">
            <option value="">${t('label_for_all')}</option>
            ${STUDENT_NAMES.map(n => `<option value="${esc(n)}">${esc(n)}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label class="field-label">${t('label_msg')}</label>
          <textarea id="s-msg" class="field-textarea" placeholder="${t('ph_msg')}"></textarea>
        </div>
        <button class="btn btn-primary" id="s-submit" onclick="submitStudent()">
          <span>${t('send')}</span>
          <span class="btn-icon">→</span>
        </button>
      </div>
    </div>
    <div id="s-success" style="display:none">
      <div class="success-wrap">
        <div class="success-orb">✦</div>
        <div class="success-title">${t('success_title')}</div>
        <div class="success-sub">${t('success_sub')}</div>
        <br/>
        <button class="btn btn-ghost" onclick="studentLogout()" style="margin-top:1.5rem">
          ${t('student_logout')}
        </button>
      </div>
    </div>`;
}

// ── Student login ─────────────────────────────────────────
async function studentLogin() {
  const email = ($('sl-email') || {}).value?.trim();
  const pass  = ($('sl-pass')  || {}).value;
  if (!email || !pass) { toast('⚠ ' + t('email') + ' / ' + t('password')); return; }

  const btn = $('sl-btn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>'; }

  try {
    const data = await dbStudentLogin(email, pass);
    studentSession = data.session;
    buildStudentPanel();
  } catch (e) {
    toast('⚠ ' + t('login_error'));
    console.error(e);
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = t('student_login_btn') + ' <span class="btn-icon">→</span>';
    }
  }
}

// ── Student logout ────────────────────────────────────────
async function studentLogout() {
  await dbStudentLogout();
  studentSession = null;
  buildStudentPanel();
}

// ── Submit message (authenticated) ───────────────────────
async function submitStudent() {
  const msgEl = $('s-msg');
  const tagEl = $('s-tag');
  const msg   = msgEl ? msgEl.value.trim() : '';
  const tag   = tagEl ? tagEl.value        : '';

  if (!msg) { toast('⚠ ' + t('label_msg')); return; }

  const btn = $('s-submit');
  btn.disabled = true;
  btn.innerHTML = `<span class="spinner"></span>`;

  try {
    // sender_name is written server-side via DB trigger using auth.uid()
    // See the SQL setup guide — we pass only message content here
    await dbInsertStudentMessage({ message: msg, tagged_classmate: tag });
    $('s-form-wrap').style.display = 'none';
    $('s-success').style.display   = 'block';
  } catch (e) {
    toast('Error — please try again');
    console.error(e);
    btn.disabled = false;
    btn.innerHTML = `<span>${t('send')}</span><span class="btn-icon">→</span>`;
  }
}

// ── TEACHER PANEL ─────────────────────────────────────────
let tStep = 1;

function buildTeacherPanel() {
  tStep = 1;
  teacherSelectedStudents = [];
  window._tName = '';
  const p = $('panel-teachers');

  if (!teacherSession) {
    // ── Login gate ─────────────────────────────────────────
    p.innerHTML = `
      <div class="sec-header">
        <div class="sec-eyebrow">${t('eyebrow_teachers')}</div>
        <div class="sec-title">${t('title_teachers').replace('students','<em>students</em>').replace('طلابك','<em>طلابك</em>').replace('خوێندکارەکانت','<em>خوێندکارەکانت</em>')}</div>
        <div class="sec-desc">${t('desc_teachers')}</div>
      </div>
      <div class="login-wrap">
        <div class="glass-card">
          <div class="login-icon">🎓</div>
          <div class="login-heading">${t('teacher_login_title')}</div>
          <div class="login-hint">${t('teacher_login_desc')}</div>
          <div class="field">
            <label class="field-label">${t('email')}</label>
            <input id="tl-email" class="field-input" type="email"
              placeholder="your@epu.com" autocomplete="email"/>
          </div>
          <div class="field">
            <label class="field-label">${t('password')}</label>
            <input id="tl-pass" class="field-input" type="password"
              placeholder="${t('ph_pass')}" autocomplete="current-password"/>
          </div>
          <button class="btn btn-primary" id="tl-btn" onclick="teacherLogin()">
            ${t('teacher_login_btn')} <span class="btn-icon">→</span>
          </button>
        </div>
      </div>`;
    return;
  }

  // ── Logged in: show the teacher form ──────────────────────
  const displayName = dbGetStudentName(teacherSession); // reuse same helper — reads full_name metadata
  window._tName = displayName;

  p.innerHTML = `
    <div class="sec-header">
      <div class="sec-eyebrow">${t('eyebrow_teachers')}</div>
      <div class="sec-title">${t('title_teachers').replace('students','<em>students</em>').replace('طلابك','<em>طلابك</em>').replace('خوێندکارەکانت','<em>خوێندکارەکانت</em>')}</div>
      <div class="sec-desc">${t('desc_teachers')}</div>
    </div>
    <!-- Logged-in badge -->
    <div class="student-badge">
      <div class="student-badge-inner">
        <span class="badge-avatar">${displayName.charAt(0).toUpperCase()}</span>
        <span class="badge-name">${t('teacher_logged_as')} <strong>${esc(displayName)}</strong></span>
      </div>
      <button class="btn btn-ghost badge-logout" onclick="teacherLogout()">${t('teacher_logout')}</button>
    </div>
    <div id="t-panel-inner"></div>
  `;
  renderTeacherStep();
}

// ── Teacher login ──────────────────────────────────────────
async function teacherLogin() {
  const email = ($('tl-email') || {}).value?.trim();
  const pass  = ($('tl-pass')  || {}).value;
  if (!email || !pass) { toast('⚠ ' + t('email') + ' / ' + t('password')); return; }

  const btn = $('tl-btn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>'; }

  try {
    const data = await dbStudentLogin(email, pass); // reuse same Supabase signIn
    teacherSession = data.session;
    window._tName = dbGetStudentName(teacherSession);
    buildTeacherPanel();
  } catch (e) {
    toast('⚠ ' + t('login_error'));
    console.error(e);
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = t('teacher_login_btn') + ' <span class="btn-icon">→</span>';
    }
  }
}

// ── Teacher logout ────────────────────────────────────────
async function teacherLogout() {
  await dbStudentLogout();
  teacherSession = null;
  window._tName = '';
  buildTeacherPanel();
}

function renderTeacherStep() {
  const inner = $('t-panel-inner');
  inner.innerHTML = '';

  const steps    = [t('step1'), t('step2'), t('step3')];
  const stepsHtml = steps.map((s, i) => {
    const n       = i + 1;
    const numCls  = n < tStep ? 'done' : n === tStep ? 'active' : '';
    const textCls = n === tStep ? 'active' : '';
    return `
      ${i > 0 ? `<div class="step-line ${n <= tStep ? 'done' : ''}"></div>` : ''}
      <div class="step-item">
        <div class="step-num ${numCls}">${n < tStep ? '✓' : n}</div>
        <span class="step-text ${textCls}">${s}</span>
      </div>`;
  }).join('');

  if (tStep === 1) {
    inner.innerHTML = `
      <div class="glass-card">
        <div class="steps-row">${stepsHtml}</div>
        <div class="field">
          <label class="field-label">${t('label_teacher_name')}</label>
          <div class="field-readonly">${esc(window._tName)}</div>
        </div>
        <button class="btn btn-primary" onclick="teacherStep1Next()">
          ${t('continue')} <span class="btn-icon">→</span>
        </button>
      </div>`;

  } else if (tStep === 2) {
    const chipsHtml = STUDENT_NAMES.map(n => {
      const selected = teacherSelectedStudents.includes(n);
      return `<div class="chip ${selected ? 'selected' : ''}" onclick="toggleChip(this,'${n}')"><span>${n}</span></div>`;
    }).join('');
    inner.innerHTML = `
      <div class="glass-card">
        <div class="steps-row">${stepsHtml}</div>
        <div class="field-label" style="margin-bottom:12px">${t('pick_students')}</div>
        <div class="chips-grid">${chipsHtml}</div>
        <div class="chip-counter" id="chip-count">
          <span id="chip-num">${teacherSelectedStudents.length}</span> / 3 ${t('selected_of')}
        </div>
        <div style="display:flex;gap:10px;margin-top:0.5rem">
          <button class="btn btn-ghost" onclick="tStep=1;renderTeacherStep()">← Back</button>
          <button class="btn btn-primary" id="t-next2" onclick="teacherStep2Next()" ${teacherSelectedStudents.length !== 3 ? 'disabled' : ''}>
            ${t('continue')} <span class="btn-icon">→</span>
          </button>
        </div>
      </div>`;

  } else if (tStep === 3) {
    const slots = teacherSelectedStudents.map(s => `
      <div class="student-slot">
        <div class="slot-header">
          <div class="slot-gem"></div>
          <div class="slot-name">${s}</div>
        </div>
        <div class="slot-body">
          <textarea
            class="slot-textarea t-note"
            data-student="${s}"
            placeholder="${currentLang === 'ar' ? 'اكتب شيئاً لـ ' : currentLang === 'ku' ? 'بۆ ' : 'Write something for '} ${s}…"
          ></textarea>
        </div>
      </div>`).join('');
    inner.innerHTML = `
      <div class="glass-card">
        <div class="steps-row">${stepsHtml}</div>
        <p class="field-label" style="margin-bottom:1.25rem">${t('write_note')}</p>
        ${slots}
        <div style="display:flex;gap:10px;margin-top:0.5rem">
          <button class="btn btn-ghost" onclick="tStep=2;renderTeacherStep()">← Back</button>
          <button class="btn btn-primary" id="t-submit" onclick="submitTeacher()">
            ${t('submit_all')} <span class="btn-icon">→</span>
          </button>
        </div>
      </div>`;

  } else if (tStep === 4) {
    inner.innerHTML = `
      <div class="success-wrap">
        <div class="success-orb">✦</div>
        <div class="success-title">${t('teacher_success_title')}</div>
        <div class="success-sub">${t('teacher_success_sub')}</div>
        <br/>
        <button class="btn btn-ghost" onclick="buildTeacherPanel()" style="margin-top:1.5rem">
          ${t('write_again')}
        </button>
      </div>`;
  }
}

window.teacherStep1Next = function () {
  if (!window._tName) { toast('⚠ ' + t('label_teacher_name')); return; }
  tStep = 2;
  renderTeacherStep();
};

function toggleChip(chipEl, name) {
  if (chipEl.classList.contains('selected')) {
    chipEl.classList.remove('selected');
    teacherSelectedStudents = teacherSelectedStudents.filter(s => s !== name);
  } else {
    if (teacherSelectedStudents.length >= 3) { toast('Maximum 3 students'); return; }
    chipEl.classList.add('selected');
    teacherSelectedStudents.push(name);
  }
  const numEl = $('chip-num');
  if (numEl) numEl.textContent = teacherSelectedStudents.length;
  const btn = $('t-next2');
  if (btn) btn.disabled = teacherSelectedStudents.length !== 3;
}

function teacherStep2Next() {
  if (teacherSelectedStudents.length !== 3) { toast('Pick exactly 3 students'); return; }
  tStep = 3;
  renderTeacherStep();
}

async function submitTeacher() {
  const notes     = document.querySelectorAll('.t-note');
  const rows      = [];
  let   allFilled = true;

  notes.forEach(n => {
    if (!n.value.trim()) allFilled = false;
    rows.push({
      teacher_name: window._tName || 'Teacher',
      student_name: n.dataset.student,
      message:      n.value.trim(),
    });
  });

  if (!allFilled) { toast('Write a note for every student'); return; }

  const btn = $('t-submit');
  if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>'; }
  try {
    await dbInsertTeacherMessages(rows);
    tStep = 4;
    renderTeacherStep();
  } catch (e) {
    toast('Error — please try again');
    console.error(e);
    if (btn) { btn.disabled = false; btn.innerHTML = t('submit_all') + ' →'; }
  }
}

// ── REVIEW PANEL ──────────────────────────────────────────
function buildReviewPanel() {
  const p = $('panel-review');
  p.innerHTML = `
    <div id="r-login-wrap">
      <div class="login-wrap">
        <div class="sec-header">
          <div class="sec-eyebrow">Admin</div>
          <div class="sec-title">${t('review_title').replace('review','<em>review</em>').replace('المراجعة','<em>المراجعة</em>').replace('پێداچوونەوە','<em>پێداچوونەوە</em>')}</div>
          <div class="sec-desc">${t('review_desc')}</div>
        </div>
        <div class="glass-card">
          <div class="field">
            <label class="field-label">${t('email')}</label>
            <input id="r-email" class="field-input" type="email" placeholder="your@epu.com" autocomplete="email"/>
          </div>
          <div class="field">
            <label class="field-label">${t('password')}</label>
            <input id="r-pass" class="field-input" type="password" placeholder="${t('ph_pass')}" autocomplete="current-password"/>
          </div>
          <button class="btn btn-primary" onclick="adminLogin()">${t('sign_in')} <span class="btn-icon">→</span></button>
        </div>
      </div>
    </div>
    <div id="r-content-wrap" style="display:none">
      <div class="admin-bar">
        <div class="sec-title" style="font-size:1.8rem">All <em>messages</em></div>
        <button class="btn btn-ghost" onclick="adminLogout()" style="font-size:10px;padding:8px 18px">${t('sign_out')}</button>
      </div>
      <div class="review-tabs">
        <button class="review-tab active" id="rtab-students" onclick="switchReviewTab('students')">
          ${t('all_students')} <span class="count-pill" id="rc-students">…</span>
        </button>
        <button class="review-tab" id="rtab-teachers" onclick="switchReviewTab('teachers')">
          ${t('all_teachers')} <span class="count-pill" id="rc-teachers">…</span>
        </button>
      </div>
      <div id="r-students-pane"></div>
      <div id="r-teachers-pane" style="display:none"></div>
    </div>
  `;
}

function switchReviewTab(tab) {
  reviewSubTab = tab;
  document.querySelectorAll('.review-tab').forEach(b => {
    b.classList.toggle('active', b.id === 'rtab-' + tab);
  });
  $('r-students-pane').style.display = tab === 'students' ? 'block' : 'none';
  $('r-teachers-pane').style.display = tab === 'teachers' ? 'block' : 'none';
}

async function initReview() {
  // Don't rebuild if content is already visible (avoids wiping loaded data)
  const existing = $('r-content-wrap');
  if (existing && existing.style.display !== 'none') return;
  buildReviewPanel();
  try {
    const session = await dbGetSession();
    if (session) showReviewContent();
  } catch (e) { console.error(e); }
}

async function adminLogin() {
  const email = $('r-email').value.trim();
  const pass  = $('r-pass').value;
  if (!email || !pass) { toast('Enter email and password'); return; }
  const btn = document.querySelector('#r-login-wrap .btn-primary');
  if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner"></span>'; }
  try {
    await dbLogin(email, pass);
    await showReviewContent();
  } catch (e) {
    toast('Login failed — check credentials');
    console.error(e);
    if (btn) { btn.disabled = false; btn.innerHTML = t('sign_in') + ' <span class="btn-icon">→</span>'; }
  }
}

async function adminLogout() {
  await dbLogout();
  buildReviewPanel();
}

async function showReviewContent() {
  $('r-login-wrap').style.display   = 'none';
  $('r-content-wrap').style.display = 'block';
  await loadAllMessages();
}

async function loadAllMessages() {
  const sp = $('r-students-pane');
  const tp = $('r-teachers-pane');
  if (sp) sp.innerHTML = '<div class="empty-state" style="opacity:0.5">Loading…</div>';
  if (tp) tp.innerHTML = '<div class="empty-state" style="opacity:0.5">Loading…</div>';
  try {
    const [sMsgs, tMsgs] = await Promise.all([
      dbGetStudentMessages(),
      dbGetTeacherMessages(),
    ]);
    const sc = $('rc-students');
    const tc = $('rc-teachers');
    if (sc) sc.textContent = sMsgs.length;
    if (tc) tc.textContent = tMsgs.length;
    renderStudentMessages(sMsgs);
    renderTeacherMessages(tMsgs);
  } catch (e) {
    console.error('loadAllMessages error:', e);
    const errHtml = `
      <div class="empty-state" style="color:#D5575E">
        <div style="font-size:1.1rem;margin-bottom:12px">⚠ Could not load messages</div>
        <div style="font-size:11px;opacity:0.7;margin-bottom:16px">${e?.message || 'Permission denied or network error'}</div>
        <button class="btn btn-ghost" style="font-size:11px;padding:8px 18px" onclick="loadAllMessages()">Retry</button>
      </div>`;
    if (sp) sp.innerHTML = errHtml;
    if (tp) tp.innerHTML = errHtml;
  }
}

function renderStudentMessages(msgs) {
  const pane = $('r-students-pane');
  if (!msgs.length) {
    pane.innerHTML = `<div class="empty-state">${t('no_messages')}</div>`;
    return;
  }
  pane.innerHTML = msgs.map((m, i) => `
    <div class="review-card" style="animation-delay:${i * 0.04}s">
      <div class="review-meta">
        <span class="review-sender">${esc(m.sender_name)}</span>
        <span class="review-date">${new Date(m.created_at).toLocaleDateString()}</span>
      </div>
      <div class="review-msg">${esc(m.message)}</div>
      ${m.tagged_classmate ? `<div class="review-tag">→ ${esc(m.tagged_classmate)}</div>` : ''}
    </div>`).join('');
}

function renderTeacherMessages(msgs) {
  const pane = $('r-teachers-pane');
  if (!msgs.length) {
    pane.innerHTML = `<div class="empty-state">${t('no_messages')}</div>`;
    return;
  }
  const grouped = {};
  msgs.forEach(m => {
    if (!grouped[m.teacher_name]) grouped[m.teacher_name] = [];
    grouped[m.teacher_name].push(m);
  });
  pane.innerHTML = Object.entries(grouped).map(([teacher, messages], gi) => `
    <div class="review-teacher-group" style="animation-delay:${gi * 0.06}s">
      <div class="review-group-label">${esc(teacher)}</div>
      ${messages.map((m, i) => `
        <div class="review-card" style="animation-delay:${(gi * 4 + i) * 0.04}s">
          <div class="review-meta">
            <span class="review-sender">${t('to')}: ${esc(m.student_name)}</span>
            <span class="review-date">${new Date(m.created_at).toLocaleDateString()}</span>
          </div>
          <div class="review-msg">${esc(m.message)}</div>
        </div>`).join('')}
    </div>`).join('');
}

// ── XSS escape helper ─────────────────────────────────────
function esc(s) {
  return String(s)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}

// ── WELCOME MODAL ─────────────────────────────────────────

const welcomeI18n = {
  en: {
    eyebrow:  'A message from the creator',
    msg:      'I created this for all of us — so it\'ll stay in our memory forever. Always remember the time we spent together. I hope we\'re all glad that we got to meet each other. 🤍',
    enter:    'Enter',
    sig:      'MIS  Class A · 2025 - 2026',
  },
  ar: {
    eyebrow:  'رسالة من المنشئ',
    msg:      'أنشأت هذا لأجلنا جميعاً — لكي يبقى في ذاكرتنا إلى الأبد. تذكّروا دائماً الوقت الذي قضيناه معاً. آمل أن نكون جميعاً سعداء بلقائنا ببعض. 🤍',
    enter:    'دخول',
    sig:      'الصف A · ٢٠٢٥ - ٢٠٢٦',
  },
  ku: {
    eyebrow:  'پەیامێک لە دروستکەر',
    msg:      'بۆ ئەوە دروستم کرد کە لە بیرەوەریماندا بمێنێتەوە و هەموو کات ئەو کاتانەمان بیربهێنینەوە کە پێکەوە بەسەرمان برد، هیوادارم هەموومان دڵخۆش بین بەوەی کە یەکتریمان ناسی.',
    enter:    'بچۆ ژوورەوە',
    sig:      'بەشی سیستەمی زانیاری- کڵاسی A · ٢٠٢٥ - ٢٠٢٦',
  },
};

let welcomeLang = 'en';

function welcomeSetLang(l) {
  welcomeLang = l;
  const isRTL = l === 'ar' || l === 'ku';

  // Update modal direction
  const modal = document.querySelector('.welcome-modal');
  if (modal) modal.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

  // Update active button
  document.querySelectorAll('.welcome-lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.wlang === l);
  });

  // Update text content
  const d = welcomeI18n[l];
  const set = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
  set('w-eyebrow',    d.eyebrow);
  set('w-msg',        d.msg);
  set('w-enter-text', d.enter);
  set('w-sig',        d.sig);
}

function closeWelcome() {
  const overlay = document.getElementById('welcome-overlay');
  if (!overlay) return;
  overlay.classList.add('hiding');
  // Also sync the main site language to whatever was chosen in modal
  setLang(welcomeLang);
  setTimeout(() => overlay.remove(), 500);
}

function initWelcomeModal() {
  // Only show once per browser session
  if (sessionStorage.getItem('welcome_seen')) {
    const overlay = document.getElementById('welcome-overlay');
    if (overlay) overlay.remove();
    return;
  }
  sessionStorage.setItem('welcome_seen', '1');
  // Modal is already in HTML, nothing to inject
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  initParticles();
  initWelcomeModal();

  // Admin emails — never treated as student/teacher sessions
  const adminEmails = ['rayanh@gmail.com', 'dina@gmail.com'];

  // Check if a user is already logged in (e.g. after page refresh)
  try {
    const sess = await dbGetStudentSession();
    if (sess && !adminEmails.includes(sess.user.email)) {
      // Determine if this is a teacher or student by checking role metadata
      const role = sess.user?.user_metadata?.role || 'student';
      if (role === 'teacher') {
        teacherSession = sess;
        window._tName = dbGetStudentName(sess);
      } else {
        studentSession = sess;
      }
    }
  } catch (e) { /* no session */ }

  buildStudentPanel();
  buildTeacherPanel();
  buildReviewPanel();
});

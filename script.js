/* ============================================================
   SCRIPT.JS — PortfolioForge Interactive Portfolio Builder
   8 Themes | Custom Colors/Fonts | Animations | Download
   ============================================================ */

(function () {
  'use strict';

  /* ==============================================
     1. TOAST
     ============================================== */
  const Toast = {
    container: document.getElementById('toastContainer'),
    show(msg, type = 'info') {
      const el = document.createElement('div');
      el.className = `toast ${type}`;
      el.textContent = msg;
      this.container.appendChild(el);
      setTimeout(() => el.remove(), 3200);
    }
  };

  /* ==============================================
     2. THEME DEFINITIONS (Gallery Data)
     ============================================== */
  const THEMES = [
    { id: 'minimal-light', name: 'Minimal Light', tag: 'Clean & Professional', preview: 'linear-gradient(135deg, #667eea, #764ba2)', previewText: '#ffffff', previewCards: '#ffffff' },
    { id: 'dark-modern', name: 'Dark Modern', tag: 'Sleek & Bold', preview: 'linear-gradient(135deg, #1a1a2e, #2d1b69)', previewText: '#eaeaff', previewCards: '#1e1e36' },
    { id: 'gradient-creative', name: 'Gradient Creative', tag: 'Vibrant & Artistic', preview: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)', previewText: '#ffffff', previewCards: '#ffffff' },
    { id: 'glass-premium', name: 'Glass Premium', tag: 'Glassmorphism', preview: 'linear-gradient(135deg, #0a1628, #1a3a5c)', previewText: '#e8f0fe', previewCards: 'rgba(255,255,255,0.06)' },
    { id: 'film-noir', name: 'Film Noir', tag: 'Cinematic Portfolio', preview: 'linear-gradient(180deg, #000000, #2a2018)', previewText: '#f5f5f5', previewCards: '#1e1e1e' },
    { id: 'neon-cyber', name: 'Neon Cyber', tag: 'Futuristic & Electric', preview: 'linear-gradient(135deg, #0a0a1a, #1a0a2e)', previewText: '#00ff88', previewCards: '#12122a' },
    { id: 'sunset-warm', name: 'Sunset Warm', tag: 'Warm & Inviting', preview: 'linear-gradient(135deg, #f093fb, #f5576c, #f6d365)', previewText: '#ffffff', previewCards: '#ffffff' },
    { id: 'nature-organic', name: 'Nature Organic', tag: 'Fresh & Natural', preview: 'linear-gradient(135deg, #134e5e, #2d8f6f, #5dad52)', previewText: '#ffffff', previewCards: '#ffffff' },
    { id: 'developer-dark', name: 'Developer Dark', tag: 'Bold & Technical', preview: 'linear-gradient(135deg, #0b0e17, #1b1440, #2d1b69)', previewText: '#4f8cff', previewCards: '#151b2b' },
    { id: 'portfolio-minimal', name: 'Portfolio Minimal', tag: 'Editorial & Clean', preview: 'linear-gradient(180deg, #f5f0eb, #ece5dc)', previewText: '#1a1a1a', previewCards: '#ffffff' },
    { id: 'dev-slate', name: 'Dev Slate', tag: 'Slate & Focused', preview: 'linear-gradient(180deg, #2a2a2a, #1c1c1c)', previewText: '#7c8db5', previewCards: '#262626' },
    { id: 'creative-noir', name: 'Creative Noir', tag: 'Black & Gold', preview: 'linear-gradient(160deg, #0a0a0a, #1a1510)', previewText: '#c8a97e', previewCards: '#151515' },
    { id: 'aurora-purple', name: 'Aurora Purple', tag: 'Violet Glow', preview: 'linear-gradient(135deg, #0c0618, #2d1060, #1a0830)', previewText: '#b24bff', previewCards: 'rgba(30,18,56,0.8)' },
  ];

  /* ==============================================
     3. THEME MANAGER
     ============================================== */
  const ThemeManager = {
    current: 'minimal-light',
    galleryEl: document.getElementById('themeGallery'),

    init() {
      const saved = localStorage.getItem('pf-theme');
      if (saved) this.current = saved;
      this.buildGallery();
      this.apply(this.current);
    },

    buildGallery() {
      this.galleryEl.innerHTML = THEMES.map(t => `
        <div class="theme-card ${t.id === this.current ? 'active' : ''}" data-theme="${t.id}">
          <div class="theme-card-preview" style="background:${t.preview};">
            <svg width="100%" height="100%" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="18" r="8" fill="${t.previewText}" opacity="0.7"/>
              <rect x="70" y="30" width="60" height="4" rx="2" fill="${t.previewText}" opacity="0.8"/>
              <rect x="80" y="38" width="40" height="3" rx="1.5" fill="${t.previewText}" opacity="0.5"/>
              <rect x="25" y="48" width="30" height="8" rx="3" fill="${t.previewCards}" opacity="0.6"/>
              <rect x="60" y="48" width="30" height="8" rx="3" fill="${t.previewCards}" opacity="0.6"/>
              <rect x="95" y="48" width="30" height="8" rx="3" fill="${t.previewCards}" opacity="0.6"/>
              <rect x="130" y="48" width="30" height="8" rx="3" fill="${t.previewCards}" opacity="0.6"/>
            </svg>
          </div>
          <div class="theme-card-info">
            <span class="theme-card-name">${t.name}</span>
            <span class="theme-card-tag">${t.tag}</span>
          </div>
        </div>
      `).join('');

      this.galleryEl.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', () => this.apply(card.dataset.theme));
      });
    },

    apply(theme) {
      this.current = theme;
      document.body.setAttribute('data-theme', theme);
      this.galleryEl.querySelectorAll('.theme-card').forEach(c => {
        c.classList.toggle('active', c.dataset.theme === theme);
      });
      localStorage.setItem('pf-theme', theme);
      // Update color pickers to match theme defaults
      CustomizeManager.syncToTheme();
      setTimeout(() => Preview.animateSkillBars(), 100);
    }
  };

  /* ==============================================
     4. CUSTOMIZE MANAGER (Colors, Fonts, Layout)
     ============================================== */
  const CustomizeManager = {
    accentInput: document.getElementById('customAccent'),
    bgInput: document.getElementById('customBg'),
    textInput: document.getElementById('customText'),
    accentHex: document.getElementById('customAccentHex'),
    bgHex: document.getElementById('customBgHex'),
    textHex: document.getElementById('customTextHex'),
    fontChips: document.querySelectorAll('.font-chip'),
    layoutChips: document.querySelectorAll('.layout-chip'),
    currentFont: "'Inter', sans-serif",
    currentLayout: 'standard',

    init() {
      // Color inputs
      this.accentInput.addEventListener('input', () => this.applyColors());
      this.bgInput.addEventListener('input', () => this.applyColors());
      this.textInput.addEventListener('input', () => this.applyColors());

      // Reset button
      document.getElementById('resetColorsBtn').addEventListener('click', () => {
        this.syncToTheme();
        Toast.show('Colors reset to theme defaults', 'info');
      });

      // Font chips
      this.fontChips.forEach(chip => {
        chip.addEventListener('click', () => {
          this.fontChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          this.currentFont = chip.dataset.font;
          document.documentElement.style.setProperty('--pv-font', this.currentFont);
          localStorage.setItem('pf-font', this.currentFont);
        });
      });

      // Layout chips
      this.layoutChips.forEach(chip => {
        chip.addEventListener('click', () => {
          this.layoutChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          this.currentLayout = chip.dataset.layout;
          this.applyLayout();
          localStorage.setItem('pf-layout', this.currentLayout);
        });
      });

      // Restore saved
      const savedFont = localStorage.getItem('pf-font');
      if (savedFont) {
        this.currentFont = savedFont;
        document.documentElement.style.setProperty('--pv-font', savedFont);
        this.fontChips.forEach(c => c.classList.toggle('active', c.dataset.font === savedFont));
      }
      const savedLayout = localStorage.getItem('pf-layout');
      if (savedLayout) {
        this.currentLayout = savedLayout;
        this.layoutChips.forEach(c => c.classList.toggle('active', c.dataset.layout === savedLayout));
        this.applyLayout();
      }

      // Restore custom colors
      const savedColors = JSON.parse(localStorage.getItem('pf-custom-colors') || 'null');
      if (savedColors) {
        this.accentInput.value = savedColors.accent;
        this.bgInput.value = savedColors.bg;
        this.textInput.value = savedColors.text;
        this.applyColors();
      }
    },

    syncToTheme() {
      // Read computed theme vars and update pickers
      const frame = document.getElementById('previewFrame');
      const cs = getComputedStyle(frame);
      const accent = this.rgbToHex(cs.getPropertyValue('--pv-accent').trim()) || '#6c5ce7';
      const bg = this.rgbToHex(cs.getPropertyValue('--pv-bg').trim()) || '#fafbfc';
      const text = this.rgbToHex(cs.getPropertyValue('--pv-text').trim()) || '#1a1a2e';
      this.accentInput.value = accent;
      this.bgInput.value = bg;
      this.textInput.value = text;
      this.accentHex.textContent = accent;
      this.bgHex.textContent = bg;
      this.textHex.textContent = text;
      // Remove overrides
      const root = document.documentElement;
      root.style.removeProperty('--pv-accent');
      root.style.removeProperty('--pv-bg');
      root.style.removeProperty('--pv-text');
      root.style.removeProperty('--pv-text-secondary');
      root.style.removeProperty('--pv-section-bg');
      localStorage.removeItem('pf-custom-colors');
    },

    applyColors() {
      const accent = this.accentInput.value;
      const bg = this.bgInput.value;
      const text = this.textInput.value;
      this.accentHex.textContent = accent;
      this.bgHex.textContent = bg;
      this.textHex.textContent = text;

      const root = document.documentElement;
      root.style.setProperty('--pv-accent', accent);
      root.style.setProperty('--pv-bg', bg);
      root.style.setProperty('--pv-text', text);
      // Derive secondary text: blend text toward bg
      root.style.setProperty('--pv-text-secondary', this.blendColor(text, bg, 0.35));
      root.style.setProperty('--pv-section-bg', bg);

      localStorage.setItem('pf-custom-colors', JSON.stringify({ accent, bg, text }));
    },

    applyLayout() {
      const frame = document.getElementById('previewFrame');
      frame.classList.remove('layout-standard', 'layout-centered', 'layout-cinematic');
      frame.classList.add(`layout-${this.currentLayout}`);
    },

    blendColor(c1, c2, ratio) {
      const hex = s => parseInt(s, 16);
      const r = Math.round(hex(c1.slice(1, 3)) * (1 - ratio) + hex(c2.slice(1, 3)) * ratio);
      const g = Math.round(hex(c1.slice(3, 5)) * (1 - ratio) + hex(c2.slice(3, 5)) * ratio);
      const b = Math.round(hex(c1.slice(5, 7)) * (1 - ratio) + hex(c2.slice(5, 7)) * ratio);
      return `rgb(${r},${g},${b})`;
    },

    rgbToHex(str) {
      if (!str) return '';
      if (str.startsWith('#')) return str.length === 7 ? str : str;
      const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) return str;
      return '#' + [m[1], m[2], m[3]].map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
    }
  };

  /* ==============================================
     5. TAB MANAGER
     ============================================== */
  const TabManager = {
    tabs: document.querySelectorAll('.tab-btn'),
    panels: document.querySelectorAll('.tab-content'),
    init() {
      this.tabs.forEach(tab => {
        tab.addEventListener('click', () => this.switchTo(tab.dataset.tab));
      });
    },
    switchTo(id) {
      this.tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      this.panels.forEach(p => p.classList.remove('active'));
      const activeTab = document.querySelector(`.tab-btn[data-tab="${id}"]`);
      const activePanel = document.getElementById(`tab-${id}`);
      if (activeTab) { activeTab.classList.add('active'); activeTab.setAttribute('aria-selected', 'true'); }
      if (activePanel) activePanel.classList.add('active');
    }
  };

  /* ==============================================
     6. MOBILE MENU
     ============================================== */
  const MobileMenu = {
    toggle: document.getElementById('mobileToggle'),
    panel: document.getElementById('builderPanel'),
    overlay: document.getElementById('mobileOverlay'),
    init() {
      this.toggle.addEventListener('click', () => this.toggleMenu());
      this.overlay.addEventListener('click', () => this.close());
    },
    toggleMenu() {
      const open = this.panel.classList.toggle('open');
      this.toggle.classList.toggle('active');
      this.toggle.setAttribute('aria-expanded', open);
      this.overlay.classList.toggle('show', open);
    },
    close() {
      this.panel.classList.remove('open');
      this.toggle.classList.remove('active');
      this.toggle.setAttribute('aria-expanded', 'false');
      this.overlay.classList.remove('show');
    }
  };

  /* ==============================================
     7. IMAGE MANAGER
     ============================================== */
  const ImageManager = {
    fileInput: document.getElementById('profileImage'),
    previewEl: document.getElementById('previewImg'),
    placeholder: document.querySelector('.image-placeholder'),
    removeBtn: document.getElementById('removeImageBtn'),
    base64: '',
    init() {
      this.fileInput.addEventListener('change', (e) => this.handleUpload(e));
      this.removeBtn.addEventListener('click', () => this.remove());
      const saved = localStorage.getItem('pf-image');
      if (saved) { this.base64 = saved; this.showImage(saved); }
    },
    handleUpload(e) {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 2 * 1024 * 1024) { Toast.show('Image must be under 2MB', 'error'); return; }
      const reader = new FileReader();
      reader.onload = (ev) => {
        this.base64 = ev.target.result;
        this.showImage(this.base64);
        localStorage.setItem('pf-image', this.base64);
        Preview.render();
        Toast.show('Photo uploaded!', 'success');
      };
      reader.readAsDataURL(file);
    },
    showImage(src) {
      this.previewEl.src = src; this.previewEl.style.display = 'block';
      this.placeholder.style.display = 'none'; this.removeBtn.style.display = 'inline-flex';
    },
    remove() {
      this.base64 = ''; this.previewEl.style.display = 'none'; this.previewEl.src = '';
      this.placeholder.style.display = 'block'; this.removeBtn.style.display = 'none';
      this.fileInput.value = ''; localStorage.removeItem('pf-image'); Preview.render();
    }
  };

  /* ==============================================
     8. FORM MANAGER
     ============================================== */
  const FormManager = {
    fields: ['fullName', 'profTitle', 'bio', 'email', 'linkedin', 'github', 'website', 'yearsExp', 'projectsCount'],
    debounceTimer: null,
    init() {
      const saved = JSON.parse(localStorage.getItem('pf-personal') || '{}');
      this.fields.forEach(id => {
        const el = document.getElementById(id);
        if (saved[id]) el.value = saved[id];
        el.addEventListener('input', () => this.onInput());
      });
      const bio = document.getElementById('bio');
      const bioCount = document.getElementById('bioCharCount');
      bio.addEventListener('input', () => { bioCount.textContent = `${bio.value.length} / 500`; });
      bioCount.textContent = `${bio.value.length} / 500`;
      this.onInput();
    },
    onInput() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => { this.save(); Preview.render(); }, 150);
    },
    getData() {
      const data = {};
      this.fields.forEach(id => { data[id] = document.getElementById(id).value; });
      return data;
    },
    save() { localStorage.setItem('pf-personal', JSON.stringify(this.getData())); },
    clear() {
      this.fields.forEach(id => { document.getElementById(id).value = ''; });
      document.getElementById('bioCharCount').textContent = '0 / 500';
      localStorage.removeItem('pf-personal');
    }
  };

  /* ==============================================
     9. SKILLS MANAGER
     ============================================== */
  const SkillsManager = {
    skills: [],
    listEl: document.getElementById('skillsList'),
    emptyEl: document.getElementById('skillsEmpty'),
    countEl: document.getElementById('skillCount'),
    nameInput: document.getElementById('skillNameInput'),
    levelInput: document.getElementById('skillLevelInput'),
    dragItem: null,
    init() {
      this.skills = JSON.parse(localStorage.getItem('pf-skills') || '[]');
      document.getElementById('addSkillBtn').addEventListener('click', () => this.add());
      this.nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); this.add(); } });
      this.renderList();
    },
    add() {
      const name = this.nameInput.value.trim();
      if (!name) { Toast.show('Enter a skill name', 'error'); this.nameInput.focus(); return; }
      if (this.skills.find(s => s.name.toLowerCase() === name.toLowerCase())) { Toast.show('Skill already exists', 'error'); return; }
      this.skills.push({ id: Date.now(), name, level: parseInt(this.levelInput.value) });
      this.nameInput.value = ''; this.nameInput.focus();
      this.save(); this.renderList(); Preview.render();
      Toast.show(`${name} added!`, 'success');
    },
    remove(id) {
      const item = this.listEl.querySelector(`[data-id="${id}"]`);
      if (item) { item.classList.add('removing'); setTimeout(() => { this.skills = this.skills.filter(s => s.id !== id); this.save(); this.renderList(); Preview.render(); }, 300); }
    },
    save() { localStorage.setItem('pf-skills', JSON.stringify(this.skills)); },
    renderList() {
      this.listEl.innerHTML = '';
      this.countEl.textContent = `${this.skills.length} skill${this.skills.length !== 1 ? 's' : ''}`;
      if (this.skills.length === 0) { this.emptyEl.classList.remove('hidden'); return; }
      this.emptyEl.classList.add('hidden');
      this.skills.forEach(skill => {
        const levelLabel = skill.level >= 80 ? 'Advanced' : skill.level >= 50 ? 'Intermediate' : 'Beginner';
        const li = document.createElement('li');
        li.className = 'list-item'; li.dataset.id = skill.id; li.draggable = true;
        li.innerHTML = `
          <span class="drag-handle" aria-hidden="true">⠿</span>
          <div class="item-info">
            <span class="item-name">${this.esc(skill.name)}</span>
            <span class="item-meta">${levelLabel} · ${skill.level}%</span>
          </div>
          <div class="item-level-bar"><div class="item-level-fill" style="width:${skill.level}%"></div></div>
          <button class="item-delete" aria-label="Remove ${this.esc(skill.name)}">✕</button>
        `;
        li.querySelector('.item-delete').addEventListener('click', () => this.remove(skill.id));
        li.addEventListener('dragstart', (e) => { this.dragItem = skill.id; e.target.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; });
        li.addEventListener('dragover', (e) => e.preventDefault());
        li.addEventListener('drop', (e) => { e.preventDefault(); if (this.dragItem === skill.id) return; const fi = this.skills.findIndex(s => s.id === this.dragItem); const ti = this.skills.findIndex(s => s.id === skill.id); const [m] = this.skills.splice(fi, 1); this.skills.splice(ti, 0, m); this.save(); this.renderList(); Preview.render(); });
        li.addEventListener('dragend', () => { this.dragItem = null; this.listEl.querySelectorAll('.list-item').forEach(el => el.classList.remove('dragging')); });
        this.listEl.appendChild(li);
      });
    },
    clear() { this.skills = []; localStorage.removeItem('pf-skills'); this.renderList(); },
    esc(str) { const d = document.createElement('div'); d.textContent = str; return d.innerHTML; }
  };

  /* ==============================================
     10. PROJECTS MANAGER
     ============================================== */
  const ProjectsManager = {
    projects: [],
    listEl: document.getElementById('projectsList'),
    emptyEl: document.getElementById('projectsEmpty'),
    countEl: document.getElementById('projectCount'),
    dragItem: null,
    init() {
      this.projects = JSON.parse(localStorage.getItem('pf-projects') || '[]');
      document.getElementById('addProjectBtn').addEventListener('click', () => this.add());
      this.renderList();
    },
    add() {
      const title = document.getElementById('projTitle').value.trim();
      const desc = document.getElementById('projDesc').value.trim();
      const tech = document.getElementById('projTech').value.trim();
      const link = document.getElementById('projLink').value.trim();
      if (!title) { Toast.show('Enter a project title', 'error'); document.getElementById('projTitle').focus(); return; }
      this.projects.push({ id: Date.now(), title, desc, tech, link });
      ['projTitle', 'projDesc', 'projTech', 'projLink'].forEach(x => document.getElementById(x).value = '');
      document.getElementById('projTitle').focus();
      this.save(); this.renderList(); Preview.render();
      Toast.show(`"${title}" added!`, 'success');
    },
    remove(id) {
      const item = this.listEl.querySelector(`[data-id="${id}"]`);
      if (item) { item.classList.add('removing'); setTimeout(() => { this.projects = this.projects.filter(p => p.id !== id); this.save(); this.renderList(); Preview.render(); }, 300); }
    },
    save() { localStorage.setItem('pf-projects', JSON.stringify(this.projects)); },
    renderList() {
      this.listEl.innerHTML = '';
      this.countEl.textContent = `${this.projects.length} project${this.projects.length !== 1 ? 's' : ''}`;
      if (this.projects.length === 0) { this.emptyEl.classList.remove('hidden'); return; }
      this.emptyEl.classList.add('hidden');
      this.projects.forEach(proj => {
        const li = document.createElement('li');
        li.className = 'list-item project-item'; li.dataset.id = proj.id; li.draggable = true;
        li.innerHTML = `
          <div class="project-item-header">
            <span class="drag-handle" aria-hidden="true">⠿</span>
            <div class="item-info"><span class="item-name">${this.esc(proj.title)}</span></div>
            <button class="item-delete" aria-label="Remove ${this.esc(proj.title)}">✕</button>
          </div>
          ${proj.desc ? `<div class="project-item-body">${this.esc(proj.desc)}</div>` : ''}
          ${proj.tech ? `<div class="project-item-tech">${this.esc(proj.tech)}</div>` : ''}
        `;
        li.querySelector('.item-delete').addEventListener('click', () => this.remove(proj.id));
        li.addEventListener('dragstart', (e) => { this.dragItem = proj.id; e.target.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; });
        li.addEventListener('dragover', (e) => e.preventDefault());
        li.addEventListener('drop', (e) => { e.preventDefault(); if (this.dragItem === proj.id) return; const fi = this.projects.findIndex(p => p.id === this.dragItem); const ti = this.projects.findIndex(p => p.id === proj.id); const [m] = this.projects.splice(fi, 1); this.projects.splice(ti, 0, m); this.save(); this.renderList(); Preview.render(); });
        li.addEventListener('dragend', () => { this.dragItem = null; this.listEl.querySelectorAll('.list-item').forEach(el => el.classList.remove('dragging')); });
        this.listEl.appendChild(li);
      });
    },
    clear() { this.projects = []; localStorage.removeItem('pf-projects'); this.renderList(); },
    esc(str) { const d = document.createElement('div'); d.textContent = str; return d.innerHTML; }
  };

  /* ==============================================
     11. LIVE PREVIEW RENDERER
     ============================================== */
  const Preview = {
    render() {
      const data = FormManager.getData();
      const skills = SkillsManager.skills;
      const projects = ProjectsManager.projects;
      const image = ImageManager.base64;

      // Avatar
      const pvAvatarImg = document.getElementById('pvAvatarImg');
      const pvAvatarPlaceholder = document.querySelector('.pv-avatar-placeholder');
      if (image) { pvAvatarImg.src = image; pvAvatarImg.style.display = 'block'; pvAvatarPlaceholder.style.display = 'none'; }
      else { pvAvatarImg.style.display = 'none'; pvAvatarPlaceholder.style.display = 'block'; }

      // Navbar
      document.getElementById('pvNavName').textContent = data.fullName || 'Portfolio';

      // Text
      document.getElementById('pvName').textContent = data.fullName || 'Your Name';
      document.getElementById('pvTitle').textContent = data.profTitle || 'Your Professional Title';
      document.getElementById('pvFooterName').textContent = data.fullName || 'Your Name';
      document.getElementById('pvFooterCopy').textContent = data.fullName || 'Your Name';

      // Hero Bio
      document.getElementById('pvHeroBio').textContent = data.bio || 'Your bio will appear here...';

      // Social
      const socialEl = document.getElementById('pvSocial');
      socialEl.innerHTML = '';
      if (data.linkedin) socialEl.innerHTML += `<a class="pv-social-link" href="${this.esc(data.linkedin)}" target="_blank">🔗 LinkedIn</a>`;
      if (data.github) socialEl.innerHTML += `<a class="pv-social-link" href="${this.esc(data.github)}" target="_blank">💻 GitHub</a>`;
      if (data.website) socialEl.innerHTML += `<a class="pv-social-link" href="${this.esc(data.website)}" target="_blank">🌐 Website</a>`;

      // Action Buttons Bar
      const actionEmail = document.getElementById('pvActionEmail');
      const actionLinkedin = document.getElementById('pvActionLinkedin');
      const actionGithub = document.getElementById('pvActionGithub');
      const actionWebsite = document.getElementById('pvActionWebsite');
      actionEmail.href = data.email ? `mailto:${data.email}` : '#';
      actionEmail.style.display = data.email ? 'flex' : 'none';
      if (actionLinkedin) { actionLinkedin.href = data.linkedin || '#'; actionLinkedin.style.display = data.linkedin ? 'flex' : 'none'; }
      if (actionGithub) { actionGithub.href = data.github || '#'; actionGithub.style.display = data.github ? 'flex' : 'none'; }
      if (actionWebsite) { actionWebsite.href = data.website || '#'; actionWebsite.style.display = data.website ? 'flex' : 'none'; }

      // Stats Row
      const statsRow = document.getElementById('pvStatsRow');
      if (data.yearsExp || data.projectsCount) {
        let statsHTML = '';
        if (data.yearsExp) {
          statsHTML += `<div class="pv-stat-item"><div class="pv-stat-number">${this.esc(data.yearsExp)}<span class="pv-stat-plus">+</span></div><div class="pv-stat-label">Years Experience</div></div>`;
          if (data.projectsCount) statsHTML += `<div class="pv-stat-divider"></div>`;
        }
        if (data.projectsCount) {
          statsHTML += `<div class="pv-stat-item"><div class="pv-stat-number">${this.esc(data.projectsCount)}<span class="pv-stat-plus">+</span></div><div class="pv-stat-label">Projects Done</div></div>`;
          statsHTML += `<div class="pv-stat-divider"></div>`;
          statsHTML += `<div class="pv-stat-item"><div class="pv-stat-number">${Math.round(parseInt(data.projectsCount) * 0.8)}<span class="pv-stat-plus">+</span></div><div class="pv-stat-label">Happy Clients</div></div>`;
        }
        statsRow.innerHTML = statsHTML;
        statsRow.style.display = 'flex';
      } else {
        statsRow.innerHTML = '';
        statsRow.style.display = 'none';
      }

      // Bio
      document.getElementById('pvBio').textContent = data.bio || 'Your bio will appear here. Start typing in the builder panel to see it come alive!';

      // Contact
      const contactRow = document.getElementById('pvContactRow');
      contactRow.innerHTML = '';
      if (data.email) contactRow.innerHTML += `<span class="pv-contact-item">📧 ${this.esc(data.email)}</span>`;
      const contactBtn = document.getElementById('pvContactBtn');
      contactBtn.href = data.email ? `mailto:${data.email}` : '#';
      document.getElementById('pvContactText').textContent = data.email ? 'Want to work together? Drop me a line!' : 'Add your email in the builder to enable this button.';

      // Footer Links
      const footerLinks = document.getElementById('pvFooterLinks');
      footerLinks.innerHTML = '';
      if (data.linkedin) footerLinks.innerHTML += `<a class="pv-footer-link" href="${this.esc(data.linkedin)}" target="_blank">LinkedIn</a>`;
      if (data.github) footerLinks.innerHTML += `<a class="pv-footer-link" href="${this.esc(data.github)}" target="_blank">GitHub</a>`;
      if (data.website) footerLinks.innerHTML += `<a class="pv-footer-link" href="${this.esc(data.website)}" target="_blank">Website</a>`;
      if (data.email) footerLinks.innerHTML += `<a class="pv-footer-link" href="mailto:${this.esc(data.email)}">Email</a>`;

      // Skills
      const skillsGrid = document.getElementById('pvSkillsGrid');
      if (skills.length === 0) {
        skillsGrid.innerHTML = '<div class="pv-empty-hint">Add skills in the builder to see them here</div>';
      } else {
        skillsGrid.innerHTML = skills.map(s => {
          const label = s.level >= 80 ? 'Advanced' : s.level >= 50 ? 'Intermediate' : 'Beginner';
          return `<div class="pv-skill-item"><div class="pv-skill-header"><span class="pv-skill-name">${this.esc(s.name)}</span><span class="pv-skill-level">${label}</span></div><div class="pv-skill-bar"><div class="pv-skill-fill" data-width="${s.level}"></div></div></div>`;
        }).join('');
        setTimeout(() => this.animateSkillBars(), 50);
      }

      // Project Carousel
      const carouselTrack = document.getElementById('pvCarouselTrack');
      if (projects.length === 0) {
        carouselTrack.innerHTML = '<div class="pv-empty-hint">Add projects in the builder to see them here</div>';
      } else {
        const icons = ['🚀', '💡', '⚡', '🎯', '🔧', '📱', '🌐', '🎨'];
        carouselTrack.innerHTML = projects.map((p, i) => {
          return `<div class="pv-carousel-card"><div class="pv-carousel-card-inner"><div class="pv-carousel-card-icon">${icons[i % icons.length]}</div><div class="pv-carousel-card-title">${this.esc(p.title)}</div></div></div>`;
        }).join('');
      }

      // Projects Grid
      const projGrid = document.getElementById('pvProjectsGrid');
      if (projects.length === 0) {
        projGrid.innerHTML = '<div class="pv-empty-hint">Add projects in the builder to see them here</div>';
      } else {
        projGrid.innerHTML = projects.map(p => {
          const techTags = p.tech ? p.tech.split(',').map(t => `<span class="pv-tech-tag">${this.esc(t.trim())}</span>`).join('') : '';
          return `<div class="pv-project-card"><div class="pv-project-title">${this.esc(p.title)}</div>${p.desc ? `<div class="pv-project-desc">${this.esc(p.desc)}</div>` : ''}${techTags ? `<div class="pv-project-tech">${techTags}</div>` : ''}${p.link ? `<a class="pv-project-link" href="${this.esc(p.link)}" target="_blank">View Project →</a>` : ''}</div>`;
        }).join('');
      }

      // Trigger section animations
      setTimeout(() => SectionAnimator.observe(), 100);
    },

    animateSkillBars() {
      document.querySelectorAll('.pv-skill-fill').forEach(bar => {
        const w = bar.dataset.width;
        bar.style.width = '0%';
        requestAnimationFrame(() => { requestAnimationFrame(() => { bar.style.width = w + '%'; }); });
      });
    },

    esc(str) { const d = document.createElement('div'); d.textContent = str; return d.innerHTML; }
  };

  /* ==============================================
     12. SECTION SCROLL ANIMATOR
     ============================================== */
  const SectionAnimator = {
    observed: false,
    observe() {
      const sections = document.querySelectorAll('.pv-animate-in');
      sections.forEach(s => {
        // Immediately show all in preview panel (no IntersectionObserver needed since preview is in-view)
        setTimeout(() => s.classList.add('visible'), 100);
      });
    }
  };

  /* ==============================================
     13. HERO PARTICLES
     ============================================== */
  const HeroParticles = {
    init() {
      const container = document.getElementById('pvHeroParticles');
      for (let i = 0; i < 5; i++) {
        const p = document.createElement('div');
        p.className = 'pv-particle';
        container.appendChild(p);
      }
    }
  };

  /* ==============================================
     14. DOWNLOAD MANAGER
     ============================================== */
  const DownloadManager = {
    btn: document.getElementById('downloadBtn'),
    init() { this.btn.addEventListener('click', () => this.download()); },

    download() {
      this.btn.classList.add('loading'); this.btn.disabled = true;
      setTimeout(() => {
        try {
          const html = this.generateHTML();
          const blob = new Blob([html], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a'); a.href = url; a.download = 'portfolio.html';
          document.body.appendChild(a); a.click(); document.body.removeChild(a);
          URL.revokeObjectURL(url);
          Toast.show('Portfolio downloaded!', 'success');
        } catch (err) { Toast.show('Download failed. Try again.', 'error'); }
        this.btn.classList.remove('loading'); this.btn.disabled = false;
      }, 800);
    },

    generateHTML() {
      const data = FormManager.getData();
      const skills = SkillsManager.skills;
      const projects = ProjectsManager.projects;
      const image = ImageManager.base64;
      const font = CustomizeManager.currentFont;
      const layout = CustomizeManager.currentLayout;

      const esc = (s) => { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; };

      // Read the actual rendered colors from the preview frame
      const frame = document.getElementById('previewFrame');
      const cs = getComputedStyle(frame);
      const v = {};
      ['pv-bg', 'pv-text', 'pv-text-secondary', 'pv-text-muted', 'pv-accent',
        'pv-hero-bg', 'pv-hero-text', 'pv-hero-text-secondary', 'pv-card-bg', 'pv-card-border', 'pv-card-shadow',
        'pv-bar-bg', 'pv-bar-fill', 'pv-footer-bg', 'pv-footer-text', 'pv-contact-bg',
        'pv-tag-bg', 'pv-tag-text', 'pv-section-bg', 'pv-section-alt-bg', 'pv-glass'
      ].forEach(n => { v[n] = cs.getPropertyValue('--' + n).trim(); });

      const heroAlign = layout === 'cinematic' ? 'left' : 'center';
      const nameSize = layout === 'cinematic' ? '3rem' : '2.2rem';
      const nameTransform = layout === 'cinematic' ? 'text-transform:uppercase;letter-spacing:0.05em;' : '';

      const socialLinks = [];
      if (data.linkedin) socialLinks.push(`<a href="${esc(data.linkedin)}" target="_blank" style="display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:50px;font-size:0.85rem;font-weight:600;background:rgba(255,255,255,0.18);color:${v['pv-hero-text']};border:1px solid rgba(255,255,255,0.25);text-decoration:none;">🔗 LinkedIn</a>`);
      if (data.github) socialLinks.push(`<a href="${esc(data.github)}" target="_blank" style="display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:50px;font-size:0.85rem;font-weight:600;background:rgba(255,255,255,0.18);color:${v['pv-hero-text']};border:1px solid rgba(255,255,255,0.25);text-decoration:none;">💻 GitHub</a>`);
      if (data.website) socialLinks.push(`<a href="${esc(data.website)}" target="_blank" style="display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:50px;font-size:0.85rem;font-weight:600;background:rgba(255,255,255,0.18);color:${v['pv-hero-text']};border:1px solid rgba(255,255,255,0.25);text-decoration:none;">🌐 Website</a>`);

      const skillsHTML = skills.map(s => {
        const label = s.level >= 80 ? 'Advanced' : s.level >= 50 ? 'Intermediate' : 'Beginner';
        return `<div style="margin-bottom:16px;"><div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span style="font-weight:600;color:${v['pv-text']};">${esc(s.name)}</span><span style="font-size:0.8rem;color:${v['pv-text-muted']};">${label}</span></div><div style="width:100%;height:8px;background:${v['pv-bar-bg']};border-radius:10px;overflow:hidden;"><div style="height:100%;width:${s.level}%;background:${v['pv-bar-fill']};border-radius:10px;"></div></div></div>`;
      }).join('');

      const projectsHTML = projects.map(p => {
        const techTags = p.tech ? p.tech.split(',').map(t => `<span style="padding:3px 10px;border-radius:50px;font-size:0.72rem;font-weight:600;background:${v['pv-tag-bg']};color:${v['pv-tag-text']};display:inline-block;margin:2px;">${esc(t.trim())}</span>`).join(' ') : '';
        return `<div style="background:${v['pv-card-bg']};border:1px solid ${v['pv-card-border']};border-radius:16px;padding:24px;box-shadow:${v['pv-card-shadow']};${v['pv-glass'] && v['pv-glass'] !== 'none' ? `backdrop-filter:${v['pv-glass']};` : ''}"><div style="font-size:1.05rem;font-weight:700;color:${v['pv-text']};margin-bottom:8px;">${esc(p.title)}</div>${p.desc ? `<div style="font-size:0.85rem;color:${v['pv-text-secondary']};line-height:1.6;margin-bottom:12px;">${esc(p.desc)}</div>` : ''}${techTags ? `<div style="margin-bottom:14px;">${techTags}</div>` : ''}${p.link ? `<a href="${esc(p.link)}" target="_blank" style="font-size:0.82rem;font-weight:600;color:${v['pv-accent']};text-decoration:none;">View Project →</a>` : ''}</div>`;
      }).join('');

      return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${esc(data.fullName || 'My Portfolio')}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:${font};background:${v['pv-bg']};color:${v['pv-text']};line-height:1.6;}
a{text-decoration:none;}
.section{padding:48px 40px;max-width:800px;margin:0 auto;}
.section-alt{background:${v['pv-section-alt-bg']};}
.section-title{font-size:1.4rem;font-weight:800;margin-bottom:24px;padding-bottom:12px;position:relative;color:${v['pv-text']};}
.section-title::after{content:'';position:absolute;bottom:0;left:${layout === 'centered' ? '50%' : '0'};${layout === 'centered' ? 'transform:translateX(-50%);' : ''}width:45px;height:3px;border-radius:3px;background:${v['pv-accent']};}
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;}
.project-card{transition:transform 0.3s ease;}
.project-card:hover{transform:translateY(-6px);}
@media(max-width:600px){.section{padding:32px 20px;}.projects-grid{grid-template-columns:1fr;}}
</style>
</head>
<body>
<div style="background:${v['pv-hero-bg']};padding:${layout === 'cinematic' ? '100px' : '70px'} 40px;text-align:${heroAlign};position:relative;overflow:hidden;">
<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.15),rgba(0,0,0,0.05));pointer-events:none;"></div>
<div style="position:relative;z-index:1;${layout === 'centered' || layout === 'standard' ? 'max-width:600px;margin:0 auto;' : 'max-width:800px;'}">
${image ? `<img src="${image}" style="width:110px;height:110px;border-radius:50%;object-fit:cover;border:3px solid rgba(255,255,255,0.4);${layout === 'centered' || layout === 'standard' ? 'margin:0 auto 20px;display:block;' : 'margin-bottom:20px;'}">` : ''}
<h1 style="font-size:${nameSize};font-weight:800;color:${v['pv-hero-text']};margin-bottom:8px;text-shadow:0 2px 8px rgba(0,0,0,0.15);${nameTransform}">${esc(data.fullName || 'Your Name')}</h1>
<p style="font-size:1.1rem;color:${v['pv-hero-text-secondary']};margin-bottom:24px;${layout === 'cinematic' ? 'letter-spacing:0.15em;text-transform:uppercase;font-size:0.95rem;' : ''}">${esc(data.profTitle || '')}</p>
<div style="display:flex;${heroAlign === 'center' ? 'justify-content:center;' : ''}gap:10px;flex-wrap:wrap;">${socialLinks.join('')}</div>
${this.generateStatsHTML(data, v)}
</div>
</div>
${data.bio ? `<div class="section" style="${layout === 'centered' ? 'text-align:center;' : ''}"><h2 class="section-title" style="${layout === 'centered' ? 'text-align:center;' : ''}">About Me</h2><p style="color:${v['pv-text-secondary']};line-height:1.8;max-width:600px;${layout === 'centered' ? 'margin:0 auto;' : ''}">${esc(data.bio)}</p>${data.email ? `<p style="margin-top:16px;color:${v['pv-text-muted']};font-size:0.88rem;">📧 ${esc(data.email)}</p>` : ''}</div>` : ''}
${skills.length ? `<div class="section section-alt"><h2 class="section-title">Skills</h2>${skillsHTML}</div>` : ''}
${projects.length ? `<div class="section"><h2 class="section-title">Projects</h2><div class="projects-grid">${projectsHTML}</div></div>` : ''}
${data.email ? `<div class="section section-alt" style="text-align:center;background:${v['pv-contact-bg']}"><h2 class="section-title" style="text-align:center;display:inline-block;">Get In Touch</h2><p style="color:${v['pv-text-secondary']};margin:24px 0;">Want to work together? Drop me a line!</p><a href="mailto:${esc(data.email)}" style="display:inline-block;padding:14px 36px;border-radius:50px;background:${v['pv-accent']};color:#fff;font-weight:600;text-decoration:none;box-shadow:0 4px 16px rgba(0,0,0,0.15);">Send Email</a></div>` : ''}
<div style="background:${v['pv-footer-bg']};padding:24px 40px;text-align:center;font-size:0.82rem;color:${v['pv-footer-text']};">
<p>© 2026 ${esc(data.fullName || 'Your Name')}. All rights reserved.</p>
</div>
</body></html>`;
    },

    generateStatsHTML(data, v) {
      const esc = (s) => { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; };
      const theme = ThemeManager.current;
      const STATS_THEMES = ['developer-dark', 'portfolio-minimal', 'dev-slate', 'creative-noir', 'aurora-purple'];
      if (!STATS_THEMES.includes(theme) || (!data.yearsExp && !data.projectsCount)) return '';

      const accentColor = v['pv-accent'] || '#6c5ce7';
      const heroText = v['pv-hero-text'] || '#ffffff';
      const heroTextSec = v['pv-hero-text-secondary'] || 'rgba(255,255,255,0.7)';

      let html = `<div style="display:flex;gap:32px;margin-top:28px;flex-wrap:wrap;">`;
      if (data.yearsExp) {
        html += `<div style="text-align:center;min-width:80px;"><div style="font-size:2rem;font-weight:800;color:${heroText};line-height:1.1;">${esc(data.yearsExp)}<span style="font-size:1.2rem;color:${accentColor};font-weight:700;">+</span></div><div style="font-size:0.72rem;color:${heroTextSec};text-transform:uppercase;letter-spacing:0.08em;margin-top:4px;">Years Experience</div></div>`;
        if (data.projectsCount) html += `<div style="width:1px;background:rgba(255,255,255,0.15);align-self:stretch;"></div>`;
      }
      if (data.projectsCount) {
        html += `<div style="text-align:center;min-width:80px;"><div style="font-size:2rem;font-weight:800;color:${heroText};line-height:1.1;">${esc(data.projectsCount)}<span style="font-size:1.2rem;color:${accentColor};font-weight:700;">+</span></div><div style="font-size:0.72rem;color:${heroTextSec};text-transform:uppercase;letter-spacing:0.08em;margin-top:4px;">Projects Done</div></div>`;
        html += `<div style="width:1px;background:rgba(255,255,255,0.15);align-self:stretch;"></div>`;
        html += `<div style="text-align:center;min-width:80px;"><div style="font-size:2rem;font-weight:800;color:${heroText};line-height:1.1;">${Math.round(parseInt(data.projectsCount) * 0.8)}<span style="font-size:1.2rem;color:${accentColor};font-weight:700;">+</span></div><div style="font-size:0.72rem;color:${heroTextSec};text-transform:uppercase;letter-spacing:0.08em;margin-top:4px;">Happy Clients</div></div>`;
      }
      html += `</div>`;
      return html;
    }
  };

  /* ==============================================
     15. CLEAR ALL
     ============================================== */
  const ClearAll = {
    init() {
      document.getElementById('clearBtn').addEventListener('click', () => {
        if (!confirm('Clear all data? This cannot be undone.')) return;
        FormManager.clear(); SkillsManager.clear(); ProjectsManager.clear(); ImageManager.remove();
        Preview.render(); Toast.show('All data cleared', 'info');
      });
      // Carousel arrows
      const track = document.getElementById('pvCarouselTrack');
      document.getElementById('pvCarouselPrev').addEventListener('click', () => { track.scrollBy({ left: -150, behavior: 'smooth' }); });
      document.getElementById('pvCarouselNext').addEventListener('click', () => { track.scrollBy({ left: 150, behavior: 'smooth' }); });
    }
  };

  /* ==============================================
     16. RIPPLE EFFECT
     ============================================== */
  const Ripple = {
    init() {
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('.ripple');
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const el = document.createElement('span');
        el.className = 'ripple-effect';
        el.style.width = el.style.height = size + 'px';
        el.style.left = (e.clientX - rect.left - size / 2) + 'px';
        el.style.top = (e.clientY - rect.top - size / 2) + 'px';
        btn.appendChild(el);
        setTimeout(() => el.remove(), 500);
      });
    }
  };

  /* ==============================================
     INIT ALL
     ============================================== */
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    CustomizeManager.init();
    TabManager.init();
    MobileMenu.init();
    ImageManager.init();
    FormManager.init();
    SkillsManager.init();
    ProjectsManager.init();
    HeroParticles.init();
    DownloadManager.init();
    ClearAll.init();
    Ripple.init();
    Preview.render();
  });

})();
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// ── Profile data ─────────────────────────────────────────
const PROFILE = {
  name: 'Citlalli',
  fullName: 'Citlalli Trejo Del Rio',
  handle: '@citlol',
  pronouns: 'she/her',
  school: 'CS @ UT Dallas',
  status: 'Open to grad-role offers',
  graduation: 'Class of 2026',
  mood: { label: 'mood', text: 'caffeinated and shipping ✦' },
  photo: '/IMG_8198.jpg',
  email: 'citlalli.tdr@gmail.com',
  github: 'https://github.com/citlol',
  linkedin: 'https://linkedin.com/in/citlalli-trejo-del-rio',
  resume: '/resume.pdf',
  bio: "Hi — I'm a CS senior at UT Dallas building thoughtful software at the intersection of frontend, iOS, and ML. I like soft tools, careful interfaces, and shipping things that feel a little personal.",
};

// ── Tools / languages ────────────────────────────────────
const TOOLS = {
  Languages: ['Java', 'TypeScript', 'Swift', 'Python', 'C++', 'SQL', 'JavaScript'],
  Frameworks: ['React', 'Next.js', 'Node.js', 'SwiftUI', 'PyTorch'],
  Tools: ['Git', 'VS Code', 'Linux', 'Xcode', 'Figma', 'MongoDB'],
};

// ── Featured projects (deep dives) ───────────────────────
const PROJECTS = [
  {
    id: 'pancake',
    name: 'Pancake Money',
    role: 'Frontend Developer',
    period: '06/2025 – Present',
    status: 'Current',
    description: 'iOS budgeting app integrating a Python backend and the Plaid API for secure aggregation and visualization of financial data.',
    highlights: [
      'Led iOS development for an app integrating a Python backend and Plaid API',
      'Designed and built UI and financial data visualizations in Swift',
      'Modular, object-oriented architecture',
    ],
    tech: ['Swift', 'SwiftUI', 'Python', 'Plaid API'],
    link: 'https://pancakemoney.com/',
    linkLabel: 'pancakemoney.com',
  },
  {
    id: 'phobos',
    name: 'Phobos — Wishlist Web App',
    role: 'Full-stack developer',
    period: 'Released',
    status: 'Released',
    description: 'Full-stack wishlist platform with multi-page routing, collaborative sharing, and a custom dark/light theme system.',
    highlights: [
      'Secure REST API with JWT auth, bcrypt hashing, email verification, account lockout',
      'Production hardening: rate limiting, input validation, Helmet, CORS',
      'Deployed on Vercel + Railway under a custom domain',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Vercel'],
    link: 'https://myphobos.app',
    linkLabel: 'myphobos.app',
  },
  {
    id: 'inpainting',
    name: 'Partial-Conv U-Net Inpainting',
    role: 'Researcher / developer',
    period: 'Personal research',
    status: 'Released',
    description: 'Image inpainting model based on published research, achieving 28–32 dB PSNR and SSIM up to 0.96.',
    highlights: [
      '33M-parameter Partial Convolution U-Net for irregular masks',
      'Full training pipeline with logging and a Gradio demo',
      'Evaluated with PSNR, SSIM, and FID metrics',
    ],
    tech: ['Python', 'PyTorch', 'TorchVision', 'OpenCV', 'Gradio'],
    link: 'https://github.com/citlol/partial-conv-inpainting',
    linkLabel: 'github.com/citlol',
  },
  {
    id: 'bigram',
    name: 'Bigram Language Model',
    role: 'Solo developer',
    period: 'Course / personal',
    status: 'Released',
    description: 'Java bigram language model with Kneser-Ney smoothing for probabilistic text generation and autocomplete.',
    highlights: [
      'Bigram model with Kneser-Ney smoothing, beam search, and greedy decoding',
      'MySQL persistence layer handling 600k+ relationships with batched writes',
      'Clean DBInterface abstraction; JUnit 5 coverage for training and prediction',
    ],
    tech: ['Java 17', 'Maven', 'MySQL', 'JavaFX', 'JUnit 5'],
    link: 'https://github.com/citlol/bigram-language-model',
    linkLabel: 'github.com/citlol',
  },
];

// ── Work / experience ────────────────────────────────────
const EXPERIENCE = [
  {
    id: 'pancake-job',
    company: 'Pancake Money',
    role: 'Frontend Developer (iOS)',
    period: 'Jun 2025 – Present',
    status: 'Current',
    blurb: 'Building an iOS budgeting app with secure Plaid integration and live financial visualizations.',
    highlights: [
      'Lead iOS development for a Plaid-integrated budgeting app with a Python backend',
      'Design and implement UI + financial data visualizations in Swift / SwiftUI',
      'Iterate on a modular, object-oriented architecture for fast feature work',
    ],
    stack: ['Swift', 'SwiftUI', 'Python', 'Plaid API'],
  },
  {
    id: 'top-escrow-job',
    company: 'Top Escrow',
    role: 'Website Redesign — Contractor',
    period: 'Jul 2025 – Aug 2025',
    status: 'Contract',
    blurb: 'Redesigned and rebuilt the company website using modern frontend practices.',
    highlights: [
      'Redesigned and rebuilt the company website with a modern frontend',
      'Collaborated with stakeholders through iterative revisions',
      'Configured the domain and contact form for production deployment',
    ],
    stack: ['Web Design', 'UI/UX', 'Frontend'],
  },
];

// ── Top 8 (a curation: 6 projects + GitHub + LinkedIn) ──
const TOP_8 = [
  { name: 'Pancake', detail: 'iOS budgeting',         href: 'https://pancakemoney.com/' },
  { name: 'Phobos',  detail: 'Wishlist web app',      href: 'https://myphobos.app' },
  { name: 'Miel',    detail: 'macOS Pomodoro',        href: 'https://github.com/citlol/miel-pomodoro' },
  { name: 'Bigram',  detail: 'Java language model',   href: 'https://github.com/citlol/bigram-language-model' },
  { name: 'Inpaint', detail: 'PyTorch U-Net',         href: 'https://github.com/citlol/partial-conv-inpainting' },
  { name: 'Top Escrow', detail: 'Site redesign',      href: 'https://topescrow.com' },
  { name: 'GitHub',  detail: '@citlol',               href: 'https://github.com/citlol' },
  { name: 'LinkedIn',detail: 'Connect',               href: 'https://linkedin.com/in/citlalli-trejo-del-rio' },
];

// ── Nav anchors ──────────────────────────────────────────
const NAV = [
  { id: 'home',     label: 'Home' },
  { id: 'top8',     label: 'Top 8' },
  { id: 'projects', label: 'Projects' },
  { id: 'work',     label: 'Experience' },
  { id: 'contact',  label: 'Contact' },
];

// ─────────────────────────────────────────────────────────

function Module({ title, hint, children, accent }) {
  const style = accent ? { '--module-accent': accent } : undefined;
  return (
    <section className="module" style={style}>
      <header className="module-head">
        <span>{title}</span>
        {hint && <small>{hint}</small>}
      </header>
      <div className="module-body">{children}</div>
    </section>
  );
}

function ProfileModule({ ghStats }) {
  return (
    <Module title="My Profile" hint="✦ online">
      <div className="profile">
        <div className="profile-photo-wrap">
          <img src={PROFILE.photo} alt="Citlalli" />
        </div>
        <h1 className="profile-name">{PROFILE.name}</h1>
        <div className="profile-handle">{PROFILE.handle}</div>
        <span className="online-badge">online now</span>

        <div className="mood">
          <span className="mood-label">{PROFILE.mood.label}</span>
          <span className="mood-text">{PROFILE.mood.text}</span>
        </div>

        <ul className="profile-info">
          <li><dt>school</dt><dd>{PROFILE.school}</dd></li>
          <li><dt>grad</dt><dd>{PROFILE.graduation}</dd></li>
          <li><dt>status</dt><dd>{PROFILE.status}</dd></li>
          {ghStats && (
            <li>
              <dt>github</dt>
              <dd>
                {ghStats.public_repos} repos · {ghStats.followers} followers
              </dd>
            </li>
          )}
        </ul>
      </div>
    </Module>
  );
}

function NavModule({ active, onNav }) {
  return (
    <Module title="View My:" hint="navigate" accent="var(--lavender-200)">
      <nav>
        <ul className="nav-list">
          {NAV.map(item => (
            <li key={item.id}>
              <button
                type="button"
                className="nav-link"
                aria-current={active === item.id ? 'true' : 'false'}
                onClick={() => onNav(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="btn-row" style={{ marginTop: 'var(--space-md)' }}>
        <a className="btn btn-primary" href={`mailto:${PROFILE.email}`}>
          ✦ Hire me
        </a>
        <a className="btn" href={PROFILE.resume} download>
          ⬇ Download résumé
        </a>
      </div>
    </Module>
  );
}

function ContactsModule() {
  const items = [
    { glyph: 'GH', label: 'GitHub',   href: PROFILE.github,   url: 'github.com/citlol' },
    { glyph: 'IN', label: 'LinkedIn', href: PROFILE.linkedin, url: 'linkedin.com/in/...' },
    { glyph: '@',  label: 'Email',    href: `mailto:${PROFILE.email}`, url: PROFILE.email.replace('@', ' [at] ') },
  ];
  return (
    <Module title="Contacting Citlalli" accent="var(--aqua-200)">
      <ul className="link-list">
        {items.map(item => (
          <li key={item.label}>
            <a
              className="link-row"
              href={item.href}
              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
            >
              <span className="glyph">{item.glyph}</span>
              <span className="label">{item.label}</span>
              <span className="url">{item.url}</span>
            </a>
          </li>
        ))}
      </ul>
    </Module>
  );
}

function ToolsModule() {
  return (
    <Module title="Tools / Languages" accent="var(--gold-mood)">
      {Object.entries(TOOLS).map(([group, items]) => (
        <div className="tag-group" key={group}>
          <h4 className="tag-group-title">{group}</h4>
          <ul className="tag-list">
            {items.map(t => <li key={t} className="tag">{t}</li>)}
          </ul>
        </div>
      ))}
    </Module>
  );
}

function GamingModule() {
  return (
    <Module title="Now Playing" hint="✦ game" accent="var(--gold-mood)">
      <div style={{ display: 'grid', gap: 8 }}>
        <div
          style={{
            fontFamily: 'var(--display)',
            fontSize: 20,
            lineHeight: 1.1,
            color: 'var(--ink)',
            letterSpacing: '-0.01em',
          }}
        >
          League of Legends
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-xs)' }}>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--ink-muted)',
            }}
          >
            mains
          </span>
          <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>Rakan · Milio</span>
        </div>
      </div>
    </Module>
  );
}

function ListeningModule() {
  const [loading, setLoading] = useState(true);
  return (
    <Module title="Currently Listening" hint="♫ apple music">
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 'var(--space-xs)',
          marginBottom: 'var(--space-sm)',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--ink-muted)',
          }}
        >
          song
        </span>
        <span style={{ color: 'var(--ink)', fontSize: 13, fontWeight: 600 }}>
          Decode
        </span>
        <span style={{ color: 'var(--ink-muted)', fontSize: 12 }}>— Paramore</span>
      </div>
      <div className="listening-frame">
        {loading && (
          <div style={{ padding: 'var(--space-md)', fontSize: 13, color: 'var(--ink-muted)' }}>
            loading playlist…
          </div>
        )}
        <iframe
          title="Apple Music Playlist"
          src="https://embed.music.apple.com/us/playlist/%EC%B2%AD%EC%B6%98%EC%9D%80-%EB%B0%94%EB%A1%9C-%EC%A7%80%EA%B8%88/pl.u-JPAZZlGtJa55XR"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{
            width: '100%',
            height: 175,
            display: loading ? 'none' : 'block',
            border: 0,
            background: '#fff',
          }}
          onLoad={() => setLoading(false)}
        />
      </div>
    </Module>
  );
}

// ── Main column ─────────────────────────────────────────

function Hero() {
  return (
    <section id="home" className="section">
      <div className="hero">
        <p className="section-eyebrow">welcome to my page ✦</p>
        <h2 className="section-title">Hi, I'm {PROFILE.name}.</h2>
        <p className="section-lead">{PROFILE.bio}</p>
        <div className="hero-meta">
          <dl>
            <dt>currently</dt>
            <dd>Frontend Dev @ Pancake Money</dd>
          </dl>
          <dl>
            <dt>studying</dt>
            <dd>{PROFILE.school} · {PROFILE.graduation}</dd>
          </dl>
          <dl>
            <dt>open to</dt>
            <dd>2026 grad-role offers</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Top8Section() {
  return (
    <section id="top8" className="section">
      <p className="section-eyebrow">★ top 8</p>
      <h2 className="section-title">My Top 8.</h2>
      <p className="section-lead" style={{ marginBottom: 'var(--space-lg)' }}>
        A handful of things I'm proud of — projects, work, and where to find me.
      </p>
      <div className="top8">
        {TOP_8.map((item, i) => (
          <a
            key={item.name}
            className="top8-card"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <div className="num">№ {String(i + 1).padStart(2, '0')}</div>
              <div className="name">{item.name}</div>
              <div className="detail">{item.detail}</div>
            </div>
            <div className="arrow">↗</div>
          </a>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <p className="section-eyebrow">/ projects</p>
      <h2 className="section-title">Featured Projects.</h2>
      <p className="section-lead" style={{ marginBottom: 'var(--space-lg)' }}>
        A few deeper looks at things I've shipped — mobile, web, and ML.
      </p>
      <div className="project-list">
        {PROJECTS.map((p, i) => (
          <article key={p.id} className="project">
            <div className="num">{String(i + 1).padStart(2, '0')}</div>
            <div>
              <h3>{p.name}</h3>
              <div className="meta">
                {p.role} · {p.period}
              </div>
              <p>{p.description}</p>
              <ul>
                {p.highlights.map(h => <li key={h}>{h}</li>)}
              </ul>
              <ul className="tags">
                {p.tech.map(t => <li key={t} className="tag">{t}</li>)}
              </ul>
            </div>
            {p.link && (
              <a
                className="visit"
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.linkLabel}
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function WorkSection() {
  return (
    <section id="work" className="section">
      <p className="section-eyebrow">↗ experience</p>
      <h2 className="section-title">Where I've Worked.</h2>
      <div className="work-list">
        {EXPERIENCE.map(job => (
          <article key={job.id} className="work-entry">
            <div className="period">
              {job.period}
              <div><span className="status">{job.status}</span></div>
            </div>
            <div>
              <h3>{job.company}</h3>
              <div className="role">{job.role}</div>
              <p>{job.blurb}</p>
              <ul>
                {job.highlights.map(h => <li key={h}>{h}</li>)}
              </ul>
              <ul className="stack">
                {job.stack.map(s => <li key={s} className="tag">{s}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section">
      <p className="section-eyebrow">✉ get in touch</p>
      <h2 className="section-title">Let's build something.</h2>
      <p className="section-lead">
        I'm graduating in {PROFILE.graduation.replace('Class of ', '')} and looking for a role
        where I can keep shipping thoughtful software. The fastest way to reach me is email —
        otherwise the résumé and socials are linked in the sidebar.
      </p>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-sm)',
          marginTop: 'var(--space-lg)',
          maxWidth: 480,
        }}
      >
        <a
          className="btn btn-primary"
          href={`mailto:${PROFILE.email}`}
          style={{ flex: '1 1 auto' }}
        >
          ✦ {PROFILE.email}
        </a>
        <a
          className="btn"
          href={PROFILE.resume}
          download
          style={{ flex: '0 1 200px' }}
        >
          ⬇ Download résumé
        </a>
      </div>
    </section>
  );
}

// ── App shell ────────────────────────────────────────────

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    try {
      const saved = window.localStorage.getItem('citlol-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (_) {}
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { window.localStorage.setItem('citlol-theme', theme); } catch (_) {}
  }, [theme]);

  const toggle = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  return [theme, toggle];
}

export default function App() {
  const [ghStats, setGhStats] = useState(null);
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    let cancelled = false;
    fetch('https://api.github.com/users/citlol')
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (!cancelled && data) setGhStats(data);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const navIds = useRef(NAV.map(n => n.id)).current;
  const active = useActiveSection(navIds);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className="banner">
        <span><span className="heart">✦</span>&nbsp;{PROFILE.fullName.toLowerCase()}.com</span>
        <span className="banner-right">
          <span>last login · today</span>
          <button
            type="button"
            className="theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            onClick={toggleTheme}
          >
            <span className="glyph">✦</span>
            {theme === 'dark' ? 'light' : 'dark'}
          </button>
        </span>
      </div>

      <div className="page">
        <aside className="sidebar">
          <ProfileModule ghStats={ghStats} />
          <NavModule active={active} onNav={scrollTo} />
          <ContactsModule />
          <ToolsModule />
          <GamingModule />
          <ListeningModule />
        </aside>

        <main className="main">
          <Hero />
          <Top8Section />
          <ProjectsSection />
          <WorkSection />
          <ContactSection />
          <footer className="foot">
            <span className="heart">✦</span>&nbsp;made with care · {PROFILE.handle} · {new Date().getFullYear()}
          </footer>
        </main>
      </div>
    </>
  );
}

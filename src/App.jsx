import { useEffect, useRef, useState } from 'react';
import './App.css';
import HeroParticles from './components/Home/HeroParticles.jsx';
import useScrollReveal from './useScrollReveal.js';

const capabilities = [
  { mark: '01', title: 'Desktop & user support', description: 'Helping people get back to work with clear, practical technical support.', tools: ['Windows 10 / 11 · macOS · Linux', 'Laptop & peripheral deployment', 'Level 1 & 2 troubleshooting', 'ConnectWise · TeamViewer · RDP'] },
  { mark: '02', title: 'Microsoft 365 & identity', description: 'Supporting everyday collaboration, user access, and account administration.', tools: ['Microsoft 365 & Exchange Online', 'SharePoint · Intune · Autopilot', 'Active Directory / Entra ID', 'MFA · SSPR · user access'] },
  { mark: '03', title: 'Networks & connectivity', description: 'Troubleshooting connectivity across devices, networks, and remote access.', tools: ['TCP/IP · DNS · DHCP', 'VLANs & VPNs', 'Routing & switching', 'LAN / WAN'] },
  { mark: '04', title: 'Systems & service desk', description: 'Bringing a structured approach to technical issues and IT operations.', tools: ['Windows Server 2019 / 2022', 'VMware ESXi · Hyper-V · Proxmox', 'Group Policy & SCCM', 'Ticket management & remote support'] },
];
const qualifications = [
  ['Dec 2022 – Dec 2023', 'Australian Computer Society Professional Year', 'Queensland Institute of Business & Technology, Canberra'],
  ['Jul 2020 – Nov 2021', 'Bachelor of Information Technology', 'Kent Institute, Sydney'],
  ['Jun 2018 – May 2020', 'Diploma & Advanced Diploma of IT', 'Australian Institute of Business and IT, Sydney'],
];
const certifications = [
  ['G', 'Google · Coursera', 'IT Support Professional Certificate', 'Technical support fundamentals'],
  ['N+', 'CompTIA', 'Network+', 'Networking & connectivity'],
  ['AZ', 'Microsoft', 'Azure Fundamentals', 'AZ-900 · Cloud concepts & Azure services'],
];

export default function App() {
  useScrollReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');
  const userPreference = useRef(document.documentElement.dataset.themePreference === 'saved');

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const followSystem = event => {
      if (!userPreference.current) setTheme(event.matches ? 'dark' : 'light');
    };
    systemTheme.addEventListener('change', followSystem);
    return () => systemTheme.removeEventListener('change', followSystem);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#101e25' : '#fafbf9');
  }, [theme]);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    userPreference.current = true;
    setTheme(nextTheme);
    try { localStorage.setItem('portfolio-theme', nextTheme); } catch { /* Theme still works when storage is unavailable. */ }
  }
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" aria-label="Ajaya KC home"><span className="brand-symbol">a<span>.</span></span><span>AJAYA KC<span className="brand-caption">IT TECHNICIAN</span></span></a>
          <button className="theme-toggle" type="button" aria-label="Dark mode" aria-pressed={theme === 'dark'} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} onClick={toggleTheme}>
            <span aria-hidden="true">{theme === 'dark' ? '☾' : '☀'}</span><span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>
          <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'} <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button>
          <nav id="navigation" aria-label="Main navigation" className={menuOpen ? 'navigation open' : 'navigation'} onClick={() => setMenuOpen(false)} onKeyDown={event => { if (event.key === 'Escape') setMenuOpen(false); }}>
            <a href="#about">About</a><a href="#skills">Expertise</a><a href="#certifications">Certifications</a><a href="#projects">Homelab</a><a href="#education">Education</a><a href="https://blogs.ajayakc.com/" target="_blank" rel="noreferrer">Blog ↗</a><a className="nav-contact" href="#contact">Let’s connect <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </header>
      <main id="main">
        <section className="hero" id="home">
          <div className="hero-stage">
          <HeroParticles theme={theme} />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot" /> IT TECHNICIAN & TECHNICAL SUPPORT</p>
              <h1>Technology working.<br /><span>People thriving.</span></h1>
              <p className="hero-intro">Hi, I’m Ajaya KC.</p>
              <p className="hero-location">Based in Perth, Western Australia</p>
              <p className="hero-description">I troubleshoot technical problems, support everyday users, and help keep IT running smoothly. A practical mindset. A people-first approach.</p>
              <div className="actions"><a className="button primary" href="#contact">Get in touch <span aria-hidden="true">↗</span></a><a className="button secondary" href="/AJ_CV.docx" download>Download CV <span aria-hidden="true">↓</span></a></div>
              <div className="hero-focus"><span>Desktop support</span><span>Networking</span><span>Cloud fundamentals</span></div>
            </div>

          </div>
          </div>
          <div className="technology-strip"><div className="container"><span className="strip-label">MY TECHNICAL TOOLKIT</span><span>Windows</span><span>Microsoft 365</span><span>Active Directory</span><span>Networking</span><span>Azure</span></div></div>
        </section>
        <section className="section container about-grid" id="about">
          <div><p className="eyebrow">01 / ABOUT ME</p><h2>Good IT support<br />starts with <em>people.</em></h2></div>
          <div className="about-copy"><p className="lead">I’m an IT support professional with hands-on experience in troubleshooting, technical support, and customer service.</p><p>My background covers Windows systems, Microsoft 365, Active Directory, Intune, and network connectivity. I enjoy making technical problems easier to understand and helping users feel confident with their technology.</p><p>I’m continuing to build my knowledge of cloud services and server administration, with a focus on growing in IT support and systems administration.</p><a className="text-link" href="/AJ_CV.docx" download>Explore my background <span aria-hidden="true">↗</span></a></div>
        </section>
        <section className="expertise-section" id="skills"><div className="container section">
          <div className="section-heading"><div><p className="eyebrow">02 / TECHNICAL EXPERTISE</p><h2>Practical skills.<br />Everyday impact.</h2></div><p>From the service desk to the network.<br />The tools and technologies I work with.</p></div>
          <div className="skills-grid">{capabilities.map(skill => <article className="skill-card" key={skill.mark}><span className="card-number">{skill.mark} <span aria-hidden="true">↗</span></span><h3>{skill.title}</h3><p>{skill.description}</p><ul>{skill.tools.map(tool => <li key={tool}>{tool}</li>)}</ul></article>)}</div>
        </div></section>
        <section className="section container" id="certifications"><div className="section-heading"><div><p className="eyebrow">03 / CERTIFICATIONS</p><h2>A foundation you can trust.</h2></div><p>Continuous learning.<br />Recognised technical foundations.</p></div>
          <div className="certifications-grid">{certifications.map(([mark, provider, name, topic]) => <article className="certification" key={name}><div className="cert-top"><span className="cert-mark" aria-hidden="true">{mark}</span><span className="completed">✓ Completed</span></div><p className="cert-provider">{provider}</p><h3>{name}</h3><p>{topic}</p></article>)}</div>
        </section>
        <section className="homelab-section" id="projects"><div className="container section"><div className="section-heading"><div><p className="eyebrow">04 / PROJECTS & HOMELAB</p><h2>Learning by doing.</h2><p className="blog-intro">I document all my homelab projects on my blog, sharing the setups, experiments, and lessons learned along the way.</p></div><a className="text-link blog-link" href="https://blogs.ajayakc.com/" target="_blank" rel="noreferrer">Explore my homelab blog ↗<span>blogs.ajayakc.com</span></a></div><div className="lab-grid">
          <article><span className="lab-category">VIRTUALISATION</span><h3>Enterprise virtualisation lab</h3><p>A high-availability home lab built with Proxmox and VMware ESXi to explore infrastructure and virtual environments.</p><div className="lab-tags">Proxmox / VMware ESXi</div></article>
          <article><span className="lab-category">REMOTE MANAGEMENT</span><h3>Centralised monitoring & support</h3><p>A self-hosted MeshCentral instance for remote monitoring and management across Linux and Windows systems.</p><div className="lab-tags">MeshCentral / Linux / Windows</div></article>
          <article><span className="lab-category">NETWORK SECURITY</span><h3>DNS filtering & remote access</h3><p>Network-wide DNS filtering with AdGuard Home and a self-hosted WireGuard instance for remote connectivity.</p><div className="lab-tags">AdGuard Home / WireGuard</div></article>
          <article><span className="lab-category">SYSTEMS ADMINISTRATION</span><h3>Self-hosted Linux services</h3><p>Linux virtual machines and containers, with command-line troubleshooting, updates, and performance tuning.</p><div className="lab-tags">Linux / Virtual machines / Containers</div></article>
        </div></div></section>
        <section className="education-section" id="education"><div className="container section education-grid"><div><p className="eyebrow">05 / EDUCATION</p><h2>Built on a solid<br /><em>IT foundation.</em></h2><p className="education-intro">Formal study in information technology, supported by professional development and a commitment to keep learning.</p></div><div className="education-list">{qualifications.map(([year, degree, institution]) => <article key={degree}><span className="education-year">{year}</span><h3>{degree}</h3><p>{institution}</p></article>)}</div></div></section>
        <section className="container section" id="contact"><div className="contact-panel"><div><p className="eyebrow"><span className="status-dot" /> LET’S CONNECT</p><h2>Your next IT team member?<br /><span>Let’s talk.</span></h2><p>I’d love to hear about IT technician, help desk, and technical support opportunities.</p><a className="button primary" href="mailto:aj@ajayakc.com">Email me <span aria-hidden="true">↗</span></a></div><div className="contact-details"><span>GET IN TOUCH</span><a href="mailto:aj@ajayakc.com">aj@ajayakc.com ↗</a><span>MORE ABOUT ME</span><a href="/AJ_CV.docx" download>Download my CV ↓</a><a href="https://github.com/Ajkce13101" target="_blank" rel="noreferrer">GitHub ↗</a></div></div></section>
      </main>
      <footer className="container footer"><p>© {new Date().getFullYear()} Ajaya KC</p><p>Technology with a human touch.</p><a href="#home">Back to top ↑</a></footer>
    </>
  );
}

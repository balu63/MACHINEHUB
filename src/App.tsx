import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navigation } from './components/Navigation'
import { MachineScene } from './components/MachineScene'
import { WorkspacePreview } from './components/WorkspacePreview'
import { CodeDemo } from './components/CodeDemo'
import { AutomationFlow } from './components/AutomationFlow'
import { CommandPalette, ToolDiscovery } from './components/ToolSystem'

import './App.css'

gsap.registerPlugin(ScrollTrigger)

const showcaseProjects = [
  { name: 'ORBIT', category: 'Real-time visualization system', tags: ['WebGL', 'Realtime', 'Data'] },
  { name: 'SYNTH', category: 'Creative generative environment', tags: ['Generative', 'Audio', 'Motion'] },
  { name: 'PULSE', category: 'Data intelligence interface', tags: ['Analytics', 'Insights', 'AI'] },
  { name: 'FORGE', category: 'Automated development workflow', tags: ['CI/CD', 'DevOps', 'Automation'] },
]

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [selectedToolId, setSelectedToolId] = useState('prompt-optimizer')

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'))
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-copy > *',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out', delay: 0.18 },
      )

      gsap.fromTo(
        '.hero-visual',
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.05, ease: 'power2.out', delay: 0.22 },
      )

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 34 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: element, start: 'top 82%' },
          },
        )
      })
    })

    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen(true)
      }
    }

    window.addEventListener('keydown', handler)
    return () => {
      ctx.revert()
      window.removeEventListener('keydown', handler)
    }
  }, [])

  return (
    <div className="page-shell">
      <Navigation />

      <button type="button" className="command-quicklaunch" onClick={() => setPaletteOpen(true)}>
        ⌘K COMMAND CENTER
      </button>

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        selectedToolId={selectedToolId}
        onSelectTool={setSelectedToolId}
      />

      <main className="app-main">
        <section className="hero-section">
          <div className="hero-copy reveal">
            <div className="eyebrow">MACHINEHUB</div>
            <h1>
              <span>BUILD.</span>
              <span>AUTOMATE.</span>
              <span>SHIP.</span>
            </h1>
            <p>
              A modern environment for developers to build, connect, automate, and ship powerful digital systems.
            </p>
            <div className="hero-actions">
              <a href="#get-started" className="primary-btn">GET STARTED</a>
              <a href="#platform" className="secondary-btn">EXPLORE PLATFORM</a>
            </div>
          </div>

          <div className="hero-visual reveal">
            <MachineScene />
          </div>
        </section>

        <section className="system-section section-block reveal" id="platform">
          <div className="section-heading">
            <div className="eyebrow">THE MACHINE</div>
            <h2>Everything connected.</h2>
          </div>

          <div className="system-core-wrap">
            <div className="system-node node-build">BUILD</div>
            <div className="system-node node-automate">AUTOMATE</div>
            <div className="system-core">MACHINEHUB CORE</div>
            <div className="system-node node-analyze">ANALYZE</div>
            <div className="system-node node-deploy">DEPLOY</div>
          </div>
        </section>

        <section className="workspace-section section-block reveal" id="product">
          <div className="section-heading">
            <div className="eyebrow">WORKSPACE</div>
            <h2>
              ONE WORKSPACE.
              <span>INFINITE POSSIBILITIES.</span>
            </h2>
          </div>
          <WorkspacePreview />
        </section>

        <section className="code-section section-block reveal" id="developers">
          <div className="section-heading narrow">
            <div className="eyebrow">EXECUTION</div>
            <h2>FROM IDEA TO EXECUTION.</h2>
          </div>
          <CodeDemo />
        </section>

        <section className="automation-section section-block reveal" id="showcase">
          <div className="section-heading narrow">
            <div className="eyebrow">FLOW</div>
            <h2>CONNECT EVERYTHING.</h2>
          </div>
          <AutomationFlow />
        </section>

        <section className="showcase-section section-block reveal" id="docs">
          <div className="section-heading narrow">
            <div className="eyebrow">SHOWCASE</div>
            <h2>BUILT WITH MACHINEHUB.</h2>
          </div>

          <div className="showcase-grid">
            {showcaseProjects.map((project) => (
              <motion.article
                key={project.name}
                className="showcase-item"
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                <div className="project-visual" aria-hidden="true" />
                <div className="project-meta">
                  <div className="project-name">{project.name}</div>
                  <p>{project.category}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a href="#" className="inline-link">VIEW PROJECT</a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="builder-section section-block reveal">
          <div className="section-heading narrow">
            <div className="eyebrow">DEVELOPER EXPERIENCE</div>
            <h2>BUILT FOR BUILDERS.</h2>
          </div>

          <div className="builder-stack">
            <div className="builder-panel terminal-panel">
              <div className="mini-header">TERMINAL</div>
              <pre>{`$ machine init project
Initializing MACHINEHUB...
✓ Environment created
✓ Assets synced
✓ Workspace ready`}</pre>
            </div>
            <div className="builder-panel hotkeys-panel">
              <div className="mini-header">KEYBOARD</div>
              <ul>
                <li><span>⌘K</span> Command Palette</li>
                <li><span>⌘B</span> Build</li>
                <li><span>⌘D</span> Deploy</li>
                <li><span>⌘⇧A</span> Automations</li>
              </ul>
            </div>
            <div className="builder-panel api-panel">
              <div className="mini-header">API</div>
              <pre>{`machine.deploy({
  target: 'production',
  region: 'us-east'
})`}</pre>
            </div>
          </div>
        </section>

        <section className="tool-platform section-block reveal" id="tooling">
          <div className="section-heading narrow">
            <div className="eyebrow">TOOL SYSTEM</div>
            <h2>BUILD WITH REAL TOOLS.</h2>
          </div>
          <ToolDiscovery selectedToolId={selectedToolId} onSelectTool={setSelectedToolId} />
        </section>

        <section className="final-cta reveal" id="get-started">
          <div className="cta-inner">
            <div className="eyebrow">NEXT SYSTEM</div>
            <h2>
              BUILD SOMETHING
              <span>EXTRAORDINARY.</span>
            </h2>
            <p>Your next system starts here.</p>
            <div className="hero-actions cta-actions">
              <a href="#" className="primary-btn">GET STARTED</a>
              <a href="#docs" className="secondary-btn">READ THE DOCS</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">MACHINEHUB</div>
        <div className="footer-tag">BUILD. AUTOMATE. SHIP.</div>
        <div className="footer-links">
          <a href="#product">Product</a>
          <a href="#platform">Platform</a>
          <a href="#developers">Developers</a>
          <a href="#showcase">Showcase</a>
          <a href="#docs">Docs</a>
          <a href="#">GitHub</a>
          <a href="#">Contact</a>
        </div>
        <div className="copyright">© 2026 MACHINEHUB</div>
      </footer>
    </div>
  )
}

export default App

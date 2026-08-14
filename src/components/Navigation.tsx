const navItems = ['PRODUCT', 'PLATFORM', 'DEVELOPERS', 'SHOWCASE', 'DOCS']

export function Navigation() {
  return (
    <header className="site-header">
      <nav className="topbar" aria-label="Main navigation">
        <div className="brand-lockup">MACHINEHUB</div>

        <div className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </div>

        <a href="#get-started" className="nav-cta">
          GET STARTED
        </a>
      </nav>
    </header>
  )
}

export function WorkspacePreview() {
  return (
    <div className="workspace-shell reveal">
      <div className="workspace-header">
        <div className="traffic-lights">
          <span />
          <span />
          <span />
        </div>
        <div className="workspace-title">project-machinehub</div>
      </div>

      <div className="workspace-layout">
        <aside className="project-tree">
          <div className="folder-item active">src</div>
          <div className="folder-item">components</div>
          <div className="folder-item">automations</div>
          <div className="folder-item">deploy</div>
        </aside>

        <main className="editor-panel">
          <div className="editor-tabs">
            <span className="tab active">main.ts</span>
            <span className="tab">system.ts</span>
            <span className="tab">deploy.yml</span>
          </div>

          <pre className="code-block">
            <code>{`machine.create("project")
machine.connect("system")
machine.run("workflow")
machine.deploy("production")`}</code>
          </pre>
        </main>

        <aside className="monitor-panel">
          <div className="panel-block">
            <span className="mini-label">SYSTEM</span>
            <strong>99.9%</strong>
          </div>
          <div className="panel-block">
            <span className="mini-label">NODES</span>
            <strong>204</strong>
          </div>
          <div className="panel-block">
            <span className="mini-label">LATENCY</span>
            <strong>12ms</strong>
          </div>
        </aside>
      </div>
    </div>
  )
}

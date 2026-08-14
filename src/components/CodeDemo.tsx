export function CodeDemo() {
  return (
    <div className="code-demo reveal">
      <div className="code-window">
        <div className="window-bar">
          <div className="traffic-lights">
            <span />
            <span />
            <span />
          </div>
          <div className="window-title">machinehub.ts</div>
        </div>

        <div className="code-content">
          <div className="code-lines">
            <span className="line-number">01</span>
            <span className="code-line">machine.create("project")</span>
          </div>
          <div className="code-lines">
            <span className="line-number">02</span>
            <span className="code-line active">machine.connect("system")</span>
          </div>
          <div className="code-lines">
            <span className="line-number">03</span>
            <span className="code-line">machine.run()</span>
          </div>
          <div className="code-lines">
            <span className="line-number">04</span>
            <span className="code-line">machine.deploy()</span>
          </div>
        </div>

        <div className="terminal-output">
          <div>✓ BUILD COMPLETE</div>
          <div>✓ SYSTEM READY</div>
          <div>✓ DEPLOYMENT SUCCESSFUL</div>
        </div>
      </div>
    </div>
  )
}

const steps = ['INPUT', 'PROCESS', 'INTELLIGENCE', 'OUTPUT']

export function AutomationFlow() {
  return (
    <div className="automation-flow reveal" aria-label="Automation flow">
      {steps.map((step, index) => (
        <div key={step} className="flow-node">
          <span className="flow-step">{step}</span>
          {index < steps.length - 1 && <span className="flow-arrow">↓</span>}
        </div>
      ))}
    </div>
  )
}

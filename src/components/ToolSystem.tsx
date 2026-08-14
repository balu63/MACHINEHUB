import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

export type ToolCategory = 'AI' | 'DEVELOPER' | 'PRODUCTIVITY' | 'CREATIVE' | 'DATA' | 'UTILITY'

export type MachineTool = {
  id: string
  title: string
  category: ToolCategory
  icon: string
  description: string
  defaultInput: string
  processor: (input: string) => string
}

export type ToolHistoryEntry = {
  id: string
  toolName: string
  input: string
  timestamp: string
  summary: string
}

const STORAGE_KEY = 'machinehub-tool-history-v1'

const tools: MachineTool[] = [
  {
    id: 'prompt-optimizer',
    title: 'Prompt Optimizer',
    category: 'AI',
    icon: '✦',
    description: 'Sharpen requirements into a production-ready brief.',
    defaultInput: 'Build a workflow that turns support tickets into routed tasks for engineering and customer success.',
    processor: (input) => {
      const trimmed = input.trim()
      const lines = [
        'SYSTEM BRIEF',
        'Goal: Turn raw ideas into precise, execution-ready tasks.',
        'Context: Prioritize clarity, measurable outcomes, and operational constraints.',
        `Input: ${trimmed}`,
        'Deliverables:',
        '1. Objective and success criteria',
        '2. User journey and edge cases',
        '3. Technical assumptions and dependencies',
        '4. Risk controls and validation steps',
        '5. Recommended next actions',
      ]
      return lines.join('\n')
    },
  },
  {
    id: 'workflow-lab',
    title: 'Workflow Lab',
    category: 'DEVELOPER',
    icon: '◎',
    description: 'Convert rough work steps into a clear operating flow.',
    defaultInput: 'Collect request -> validate input -> route team -> review metrics -> notify owner',
    processor: (input) => {
      const steps = input
        .split(/\n|->|\|/)
        .map((step) => step.trim())
        .filter(Boolean)

      const rendered = steps.length > 0 ? steps : ['Receive request', 'Validate data', 'Assign owner', 'Monitor result']

      return ['WORKFLOW MAP', ...rendered.map((step, index) => `${index + 1}. ${step}`), '', 'Execution rule: move to next stage only when the previous step verifies success.'].join('\n')
    },
  },
  {
    id: 'result-summarizer',
    title: 'Result Summarizer',
    category: 'PRODUCTIVITY',
    icon: '▣',
    description: 'Compress output into crisp status notes and action items.',
    defaultInput: 'We shipped a new release candidate with improved onboarding, reduced setup friction, and a 23% increase in activation.',
    processor: (input) => {
      const sentence = input.trim() || 'No input provided.'
      return ['SUMMARY', 'Status: Positive signal', `Evidence: ${sentence}`, 'Action Items:', '- Confirm rollout criteria', '- Share customer-facing notes', '- Capture follow-up analytics'].join('\n')
    },
  },
  {
    id: 'system-name',
    title: 'System Name Generator',
    category: 'CREATIVE',
    icon: '◈',
    description: 'Generate premium product names and concept framing.',
    defaultInput: 'A developer tool for coordinating autonomous systems and shipping products faster.',
    processor: (input) => {
      const tokens = input
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 8)
        .map((token) => token.replace(/[^a-zA-Z]/g, ''))
        .filter(Boolean)

      const baseName = tokens.length > 0 ? tokens.slice(0, 3).map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('') : 'MachineCore'
      return ['CONCEPT BOARD', `Primary Name: ${baseName}`, `Alternative Names: ${baseName}X, ${baseName}Grid, ${baseName}Flow`, 'Positioning: premium, intelligent, operational clarity'].join('\n')
    },
  },
  {
    id: 'data-brief',
    title: 'Data Signal Brief',
    category: 'DATA',
    icon: '◌',
    description: 'Turn noisy metrics into a concise signal review.',
    defaultInput: 'Traffic improved 18%, onboarding dropped 12%, but platform retention variance increased across new sessions.',
    processor: (input) => {
      const raw = input.trim()
      return ['SIGNAL REVIEW', `Source: ${raw}`, 'Signals:', '- Positive conversion trend', '- Stability improvements in activation path', '- Attention needed on retention variance', 'Recommendation: run a product experiment around onboarding friction and lifecycle follow-up.'].join('\n')
    },
  },
  {
    id: 'snippet-lab',
    title: 'Snippet Lab',
    category: 'UTILITY',
    icon: '⌁',
    description: 'Create portable code snippets and operation notes.',
    defaultInput: 'Initialize a new project workspace and deploy a production system bundle to a private environment.',
    processor: (input) => {
      const message = input.trim() || 'Initialize workspace'
      return ['SNIPPET OUTPUT', '```bash', `machine init ${message.toLowerCase().replace(/\s+/g, '-')}`, 'machine verify --workspace', 'machine deploy --target production', '```', '', 'Notes: keep environment variables isolated and verify output logs before release.'].join('\n')
    },
  },
]

export function ToolDiscovery({
  selectedToolId,
  onSelectTool,
}: {
  selectedToolId: string
  onSelectTool: (id: string) => void
}) {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<ToolCategory | 'ALL'>('ALL')

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory = activeFilter === 'ALL' || tool.category === activeFilter
      const matchesSearch =
        tool.title.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.category.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeFilter, search])

  const selectedTool = filteredTools.find((tool) => tool.id === selectedToolId) ?? filteredTools[0] ?? tools[0]

  useEffect(() => {
    if (!filteredTools.some((tool) => tool.id === selectedToolId) && filteredTools[0]) {
      onSelectTool(filteredTools[0].id)
    }
  }, [filteredTools, onSelectTool, selectedToolId])

  return (
    <div className="tool-discovery-shell reveal">
      <div className="tool-discovery-header">
        <div className="tool-search-wrap">
          <label htmlFor="tool-search" className="sr-only">
            Search tools
          </label>
          <input
            id="tool-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tools"
            className="tool-search"
          />
        </div>

        <div className="tool-filters" aria-label="Tool filters">
          {(['ALL', 'AI', 'DEVELOPER', 'PRODUCTIVITY', 'CREATIVE', 'DATA', 'UTILITY'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={activeFilter === filter ? 'filter-chip active' : 'filter-chip'}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="tool-discovery-layout">
        <div className="tool-card-list">
          {filteredTools.map((tool) => (
            <motion.button
              key={tool.id}
              type="button"
              className={selectedTool.id === tool.id ? 'tool-card active' : 'tool-card'}
              onClick={() => onSelectTool(tool.id)}
              whileHover={{ y: -6, rotateX: 3, rotateY: -3 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              <div className="tool-card-header">
                <div className="tool-icon">{tool.icon}</div>
                <span className="tool-category-pill">{tool.category}</span>
              </div>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
            </motion.button>
          ))}
        </div>

        <div className="tool-panel-wrap">
          <ToolShell tool={selectedTool} />
        </div>
      </div>
    </div>
  )
}

function ToolShell({ tool }: { tool: MachineTool }) {
  const [input, setInput] = useState(tool.defaultInput)
  const [result, setResult] = useState('')
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('READY')
  const [history, setHistory] = useState<ToolHistoryEntry[]>([])
  const intervalRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  const updateHistory = (entry: ToolHistoryEntry) => {
    const previous = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as ToolHistoryEntry[]
    const next = [entry, ...previous.filter((item) => item.toolName !== entry.toolName || item.input !== entry.input)].slice(0, 5)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setHistory(next)
  }

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as ToolHistoryEntry[]
      setHistory(stored)
    } catch {
      setHistory([])
    }
  }, [])

  useEffect(() => {
    setInput(tool.defaultInput)
    setResult('')
    setStatus('idle')
    setProgress(0)
    setMessage('READY')
  }, [tool])

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  const resetTool = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current)
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    setStatus('idle')
    setResult('')
    setProgress(0)
    setMessage('READY')
    setInput(tool.defaultInput)
  }

  const handleRun = () => {
    const trimmed = input.trim()

    if (!trimmed) {
      setStatus('error')
      setMessage('SYSTEM ERROR')
      setResult('Please provide input before running this tool.')
      return
    }

    if (intervalRef.current) window.clearInterval(intervalRef.current)
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)

    setStatus('processing')
    setResult('')
    setProgress(0)
    setMessage('INITIALIZING...')

    const steps = ['INITIALIZING...', 'ANALYZING INPUT...', 'PROCESSING...', 'GENERATING RESULT...', 'COMPLETE']
    let stepIndex = 0

    intervalRef.current = window.setInterval(() => {
      stepIndex += 1
      setProgress((stepIndex / steps.length) * 100)
      setMessage(steps[Math.min(stepIndex, steps.length - 1)])
    }, 280)

    timeoutRef.current = window.setTimeout(() => {
      window.clearInterval(intervalRef.current ?? undefined)
      const nextResult = tool.processor(trimmed)
      setResult(nextResult)
      setStatus('success')
      setProgress(100)
      setMessage('COMPLETE')

      const timestamp = new Date().toISOString()
      const entry: ToolHistoryEntry = {
        id: `${tool.id}-${timestamp}`,
        toolName: tool.title,
        input: trimmed,
        timestamp,
        summary: nextResult.split('\n')[0] || 'Generated result',
      }
      updateHistory(entry)
    }, 1800)
  }

  const handleCopy = async () => {
    if (!result) return

    try {
      await navigator.clipboard.writeText(result)
      setMessage('COPIED ✓')
    } catch {
      setMessage('COPY FAILED')
    }
  }

  const handleDownload = () => {
    if (!result) return
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${tool.id}-result.txt`
    anchor.click()
    URL.revokeObjectURL(url)
    setMessage('DOWNLOADED ✓')
  }

  const historyItems = history.filter((entry) => entry.toolName === tool.title).slice(0, 3)

  return (
    <motion.div
      className="tool-shell"
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className="tool-header-row">
        <div>
          <div className="tool-identity">
            <span className="tool-icon large">{tool.icon}</span>
            <div>
              <div className="tool-title">{tool.title}</div>
              <div className="tool-caption">{tool.category}</div>
            </div>
          </div>
        </div>
        <button type="button" className="ghost-button" onClick={resetTool}>RESET</button>
      </div>

      <div className="tool-input-area">
        <label htmlFor={`tool-input-${tool.id}`} className="input-label">INPUT</label>
        <textarea
          id={`tool-input-${tool.id}`}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={6}
          placeholder="Describe the system, task, or objective..."
        />
      </div>

      <div className="tool-actions">
        <button type="button" className="primary-action" onClick={handleRun} disabled={status === 'processing'}>
          {status === 'processing' ? 'PROCESSING...' : 'RUN'}
        </button>
        <button type="button" className="secondary-action" onClick={handleCopy} disabled={!result}>COPY RESULT</button>
        <button type="button" className="secondary-action" onClick={handleDownload} disabled={!result}>DOWNLOAD</button>
      </div>

      <div className="tool-processing-state" aria-live="polite">
        <div className="progress-bar">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="status-row">
          <span className="status-indicator" />
          <span>{message}</span>
        </div>
      </div>

      <div className={`tool-result ${status === 'success' ? 'success' : status === 'error' ? 'error' : ''}`}>
        {status === 'error' ? (
          <div className="system-alert">
            <strong>SYSTEM ERROR</strong>
            <p>{result}</p>
            <button type="button" className="ghost-button compact" onClick={() => setStatus('idle')}>
              TRY AGAIN
            </button>
          </div>
        ) : (
          <>
            <div className="result-header">RESULT</div>
            <pre>{result || 'Run this tool to generate a result.'}</pre>
          </>
        )}
      </div>

      <div className="tool-history">
        <div className="history-header">Recent runs</div>
        {historyItems.length > 0 ? (
          historyItems.map((entry) => (
            <button key={entry.id} type="button" className="history-item" onClick={() => setInput(entry.input)}>
              <span>{entry.toolName}</span>
              <small>{new Date(entry.timestamp).toLocaleDateString()}</small>
            </button>
          ))
        ) : (
          <p className="history-empty">No runs yet.</p>
        )}
      </div>
    </motion.div>
  )
}

export function CommandPalette({
  isOpen,
  onClose,
  selectedToolId,
  onSelectTool,
}: {
  isOpen: boolean
  onClose: () => void
  selectedToolId: string
  onSelectTool: (id: string) => void
}) {
  const [query, setQuery] = useState('')

  const matchingTools = useMemo(() => {
    const lowerQuery = query.trim().toLowerCase()
    return tools.filter((tool) => {
      if (!lowerQuery) return true
      return (
        tool.title.toLowerCase().includes(lowerQuery) ||
        tool.description.toLowerCase().includes(lowerQuery) ||
        tool.category.toLowerCase().includes(lowerQuery)
      )
    })
  }, [query])

  useEffect(() => {
    if (!isOpen) return
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="command-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="command-palette"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="palette-header">
              <span>Command Center</span>
              <button type="button" className="ghost-button compact" onClick={onClose}>ESC</button>
            </div>
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search tools or actions..."
              className="palette-input"
            />
            <div className="palette-list">
              {matchingTools.map((tool) => (
                <button
                  key={tool.id}
                  type="button"
                  className={selectedToolId === tool.id ? 'palette-item active' : 'palette-item'}
                  onClick={() => {
                    onSelectTool(tool.id)
                    onClose()
                  }}
                >
                  <span className="tool-icon">{tool.icon}</span>
                  <span>
                    <strong>{tool.title}</strong>
                    <small>{tool.category}</small>
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { tools }

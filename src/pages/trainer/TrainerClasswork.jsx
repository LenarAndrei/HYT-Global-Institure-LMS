import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  HiPlus,
  HiDocumentText,
  HiPaperClip,
  HiClipboardList,
  HiChevronDown,
  HiChevronUp,
  HiX,
} from 'react-icons/hi'

const POST_TYPES = [
  { label: 'Assignment', icon: HiDocumentText, bg: 'rgba(245,158,11,0.15)', color: '#d97706'  },
  { label: 'Material',   icon: HiPaperClip,    bg: 'rgba(59,130,246,0.15)', color: '#2563eb' },
  { label: 'Quiz',       icon: HiClipboardList, bg: 'rgba(139,92,246,0.15)', color: '#7c3aed' },
]

const INITIAL_POSTS = [
  {
    id: 1,
    typeLabel: 'Assignment',
    typeIcon: HiDocumentText,
    typeBg: 'rgba(245,158,11,0.15)',
    typeColor: '#d97706',
    title: 'Barista Lab Report',
    due: 'Due Mar 15',
    turnedIn: 0,
  },
  {
    id: 2,
    typeLabel: 'Material',
    typeIcon: HiPaperClip,
    typeBg: 'rgba(59,130,246,0.15)',
    typeColor: '#2563eb',
    title: 'Barista Module 4 Study Guide',
    due: 'No due date',
    turnedIn: null,
  },
  {
    id: 3,
    typeLabel: 'Quiz',
    typeIcon: HiClipboardList,
    typeBg: 'rgba(139,92,246,0.15)',
    typeColor: '#7c3aed',
    title: 'Module 4 Quiz',
    due: 'Due Mar 20',
    turnedIn: 0,
  },
  {
    id: 4,
    typeLabel: 'Material',
    typeIcon: HiPaperClip,
    typeBg: 'rgba(59,130,246,0.15)',
    typeColor: '#2563eb',
    title: 'Coffee Brewing Techniques',
    due: 'No due date',
    turnedIn: null,
  },
]

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}>
      <div style={{ background:'#fff', borderRadius:12, padding:'28px 32px', width:480, maxWidth:'90vw', boxShadow:'0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <span style={{ fontFamily:'var(--font-poppins)', fontWeight:700, fontSize:18, color:'var(--color-dark)' }}>{title}</span>
          <button onClick={onClose} style={{ background:'none', cursor:'pointer', color:'#6b7280', border:'none' }}><HiX size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default function TrainerClasswork() {
  const { course } = useOutletContext()
  const [createOpen, setCreateOpen] = useState(false)
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [createType, setCreateType] = useState(null)
  const [createForm, setCreateForm] = useState({ title: '', due: '', description: '' })
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div>
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-poppins)',
            fontWeight: 600,
            fontSize: 18,
            color: 'var(--color-dark)',
          }}
        >
          Classwork
        </div>
        <div style={{ position: 'relative' }}>
          <button
            className="btn btn--accent"
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            onClick={() => setCreateOpen(o => !o)}
          >
            <HiPlus style={{ fontSize: 16 }} />
            Create
            <HiChevronDown style={{ fontSize: 14 }} />
          </button>
          {createOpen && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 'calc(100% + 4px)',
                background: 'white',
                borderRadius: 8,
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                width: 180,
                zIndex: 10,
                padding: '4px 0',
              }}
            >
              {[
                { label: 'Assignment',  icon: HiDocumentText, bg: 'rgba(245,158,11,0.15)', color: '#d97706'  },
                { label: 'Material',    icon: HiPaperClip,    bg: 'rgba(59,130,246,0.15)', color: '#2563eb' },
                { label: 'Quiz / Test', icon: HiClipboardList, bg: 'rgba(139,92,246,0.15)', color: '#7c3aed' },
              ].map(item => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      width: '100%',
                      padding: '10px 16px',
                      fontSize: 14,
                      fontFamily: 'var(--font-poppins)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--color-dark)',
                      textAlign: 'left',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f9fafb')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                    onClick={() => {
                      setCreateType(item)
                      setCreateForm({ title: '', due: '', description: '' })
                      setCreateOpen(false)
                    }}
                  >
                    <Icon style={{ fontSize: 16, color: 'var(--color-gray)' }} />
                    {item.label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Topic Card */}
      <div
        style={{
          background: 'white',
          borderRadius: 12,
          boxShadow: 'var(--shadow-card)',
          overflow: 'hidden',
        }}
      >
        {/* Topic Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #f3f4f6',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: 600,
              fontSize: 15,
              color: 'var(--color-dark)',
            }}
          >
            Topic 1
          </span>
          <button
            className="btn btn--outline"
            style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13 }}
            onClick={() => setCollapsed(c => !c)}
          >
            {collapsed ? <HiChevronUp style={{ fontSize: 14 }} /> : <HiChevronDown style={{ fontSize: 14 }} />}
            {collapsed ? 'Expand all' : 'Collapse all'}
          </button>
        </div>

        {/* Post Rows */}
        {!collapsed && posts.map((post, i) => {
          const Icon = post.typeIcon
          return (
            <div
              key={post.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '14px 20px',
                borderBottom: i < posts.length - 1 ? '1px solid #f3f4f6' : 'none',
                transition: 'background 0.15s',
                cursor: 'default',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Type Icon */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: post.typeBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon style={{ fontSize: 18, color: post.typeColor }} />
              </div>

              {/* Title + Due */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-poppins)',
                    fontWeight: 600,
                    fontSize: 14,
                    color: 'var(--color-dark)',
                    marginBottom: 2,
                  }}
                >
                  {post.title}
                </div>
                <div style={{ fontSize: 13, color: 'var(--color-gray)' }}>{post.due}</div>
              </div>

              {/* Turned In + 3-dot */}
              <div
                style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                }}
              >
                {post.turnedIn !== null && (
                  <span style={{ fontSize: 13, color: 'var(--color-gray)' }}>
                    {post.turnedIn} turned in
                  </span>
                )}
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 20,
                    color: 'var(--color-gray)',
                    cursor: 'pointer',
                    lineHeight: 1,
                    padding: '0 4px',
                  }}
                >
                  ⋮
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Create Modal */}
      {createType && (
        <Modal title={`Create ${createType.label}`} onClose={() => setCreateType(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-poppins)', fontSize: 13, fontWeight: 600, color: 'var(--color-dark)', marginBottom: 6 }}>Title</label>
              <input
                className="settings-input"
                type="text"
                placeholder={`Enter ${createType.label.toLowerCase()} title`}
                value={createForm.title}
                onChange={e => setCreateForm(f => ({ ...f, title: e.target.value }))}
              />
            </div>
            {createType.label !== 'Material' && (
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-poppins)', fontSize: 13, fontWeight: 600, color: 'var(--color-dark)', marginBottom: 6 }}>Due Date</label>
                <input
                  className="settings-input"
                  type="date"
                  value={createForm.due}
                  onChange={e => setCreateForm(f => ({ ...f, due: e.target.value }))}
                />
              </div>
            )}
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-poppins)', fontSize: 13, fontWeight: 600, color: 'var(--color-dark)', marginBottom: 6 }}>Description</label>
              <textarea
                className="settings-input"
                rows={4}
                placeholder="Enter description"
                value={createForm.description}
                onChange={e => setCreateForm(f => ({ ...f, description: e.target.value }))}
                style={{ resize: 'vertical' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
              <button className="btn btn--outline" onClick={() => setCreateType(null)}>Cancel</button>
              <button
                className="btn btn--accent"
                onClick={() => {
                  const dueText = createType.label === 'Material'
                    ? 'No due date'
                    : createForm.due
                      ? `Due ${new Date(createForm.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                      : 'No due date'
                  setPosts(prev => [
                    ...prev,
                    {
                      id: Date.now(),
                      typeLabel: createType.label,
                      typeIcon: createType.icon,
                      typeBg: createType.bg,
                      typeColor: createType.color,
                      title: createForm.title || 'Untitled',
                      due: dueText,
                      turnedIn: createType.label === 'Material' ? null : 0,
                    },
                  ])
                  setCreateType(null)
                }}
              >
                Create
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

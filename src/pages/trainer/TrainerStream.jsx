import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  HiDocumentText,
  HiPaperClip,
  HiClipboardList,
  HiChat,
  HiCheck,
  HiUsers,
  HiBookOpen,
  HiX,
} from 'react-icons/hi'

const QUICK_ACTIONS = [
  { label: 'Assignment', icon: HiDocumentText, bg: 'rgba(245,158,11,0.1)',  color: '#d97706' },
  { label: 'Material',   icon: HiPaperClip,    bg: 'rgba(59,130,246,0.1)', color: '#2563eb' },
  { label: 'Quiz',       icon: HiClipboardList, bg: 'rgba(139,92,246,0.1)', color: '#7c3aed' },
  { label: 'Question',   icon: HiChat,          bg: 'rgba(34,197,94,0.1)', color: '#16a34a' },
]

const INITIAL_POSTS = [
  {
    type: 'Assignment',
    badgeBg: 'rgba(245,158,11,0.1)',
    badgeColor: '#d97706',
    title: 'Barista Lab Report',
    desc: 'Submit your detailed lab report on the coffee brewing session. Min 3 pages.',
    time: '2 hours ago',
  },
  {
    type: 'Material',
    badgeBg: 'rgba(59,130,246,0.1)',
    badgeColor: '#2563eb',
    title: 'Module 4 Study Guide',
    desc: 'PDF study guide covering espresso extraction techniques and barista theory.',
    time: '3 hours ago',
  },
  {
    type: 'Quiz',
    badgeBg: 'rgba(139,92,246,0.1)',
    badgeColor: '#7c3aed',
    title: 'Module 4 Knowledge Check',
    desc: '15-item multiple choice quiz. Must pass with 75% to proceed.',
    time: 'Yesterday',
  },
  {
    type: 'Question',
    badgeBg: 'rgba(34,197,94,0.1)',
    badgeColor: '#16a34a',
    title: 'Discussion: Best Coffee Origin?',
    desc: 'Share your thoughts on what coffee origin produces the best espresso and why.',
    time: '2 days ago',
  },
]

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 }}>
      <div style={{ background:'#fff', borderRadius:12, padding:'28px 32px', width:520, maxWidth:'90vw', boxShadow:'0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <span style={{ fontFamily:'var(--font-poppins)', fontWeight:700, fontSize:18, color:'var(--color-dark)' }}>{title}</span>
          <button onClick={onClose} style={{ background:'none', cursor:'pointer', color:'#6b7280', border:'none' }}><HiX size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default function TrainerStream() {
  const { course, courseId } = useOutletContext()
  const [createType, setCreateType] = useState(null)
  const [viewPost, setViewPost] = useState(null)
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [createForm, setCreateForm] = useState({ title: '', description: '' })

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      {/* Left Column */}
      <div style={{ flex: 2, minWidth: 0 }}>
        {/* Announcement Creator */}
        <div
          style={{
            background: 'white',
            borderRadius: 12,
            border: '1.5px dashed #d1d5db',
            padding: 16,
            marginBottom: 16,
          }}
        >
          {/* Top Row */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#f97316',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              T
            </div>
            <div
              style={{
                flex: 1,
                height: 44,
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                padding: '0 16px',
                display: 'flex',
                alignItems: 'center',
                color: '#9ca3af',
                fontSize: 14,
                cursor: 'pointer',
                fontFamily: 'var(--font-poppins)',
              }}
            >
              Announce something to your class…
            </div>
          </div>

          {/* Quick Post Row */}
          <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {QUICK_ACTIONS.map(qa => {
              const Icon = qa.icon
              return (
                <button
                  key={qa.label}
                  onClick={() => { setCreateType(qa.label); setCreateForm({ title: '', description: '' }) }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 14px',
                    background: qa.bg,
                    color: qa.color,
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 500,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-poppins)',
                  }}
                >
                  <Icon style={{ fontSize: 15 }} />
                  {qa.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Feed Posts */}
        {posts.map((post, i) => (
          <div
            key={i}
            style={{
              background: 'white',
              borderRadius: 12,
              marginBottom: 16,
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}
          >
            {/* Post Header */}
            <div
              style={{
                padding: '16px 16px 0',
                display: 'flex',
                gap: 12,
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: '#f97316',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 15,
                  flexShrink: 0,
                }}
              >
                M
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-poppins)',
                    fontWeight: 600,
                    fontSize: 14,
                    color: 'var(--color-dark)',
                  }}
                >
                  Maria Clara Garcia
                </div>
                <div style={{ fontSize: 12, color: 'var(--color-gray)' }}>{post.time}</div>
              </div>
              <button
                style={{
                  marginLeft: 'auto',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-gray)',
                  fontSize: 20,
                  cursor: 'pointer',
                  lineHeight: 1,
                  padding: '0 4px',
                }}
              >
                ⋮
              </button>
            </div>

            {/* Post Body */}
            <div style={{ padding: '12px 16px' }}>
              <span
                style={{
                  display: 'inline',
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  background: post.badgeBg,
                  color: post.badgeColor,
                }}
              >
                {post.type}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-poppins)',
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'var(--color-dark)',
                  marginLeft: 8,
                }}
              >
                {post.title}
              </span>
              <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', margin: '10px 0' }} />
              <p style={{ fontSize: 13, color: 'var(--color-gray)', lineHeight: 1.5, margin: 0 }}>
                {post.desc}
              </p>
              <button className="btn btn--outline" style={{ fontSize: 12, marginTop: 8 }} onClick={() => setViewPost(post)}>
                View
              </button>
            </div>

            {/* Post Footer */}
            <div
              style={{
                padding: '12px 16px',
                borderTop: '1px solid #f3f4f6',
                display: 'flex',
                gap: 16,
              }}
            >
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 13,
                  color: 'var(--color-gray)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                💬 0 class comments
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Column */}
      <div style={{ flex: 1, position: 'sticky', top: 16 }}>
        {/* Upcoming Card */}
        <div
          style={{
            background: 'white',
            borderRadius: 12,
            boxShadow: 'var(--shadow-card)',
            padding: 20,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: 600,
              fontSize: 16,
              color: 'var(--color-dark)',
              marginBottom: 12,
            }}
          >
            Upcoming
          </div>
          <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--color-gray)' }}>
            <HiCheck style={{ fontSize: 32, color: '#22c55e', display: 'block', margin: '0 auto 8px' }} />
            <div style={{ fontSize: 14, color: 'var(--color-gray)', marginBottom: 8 }}>No due work soon.</div>
            <a
              href="#"
              style={{ fontSize: 13, color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}
            >
              View all
            </a>
          </div>
        </div>

        {/* Class Code Card */}
        <div
          style={{
            background: 'white',
            borderRadius: 12,
            boxShadow: 'var(--shadow-card)',
            padding: 20,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: 500,
              fontSize: 13,
              color: 'var(--color-gray)',
            }}
          >
            Class Code
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 28,
              fontWeight: 700,
              color: 'var(--color-dark)',
              letterSpacing: 4,
              margin: '8px 0',
            }}
          >
            {course.code}
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-gray)' }}>Share this code with your students</div>
        </div>

        {/* About Card */}
        <div
          style={{
            background: 'white',
            borderRadius: 12,
            boxShadow: 'var(--shadow-card)',
            padding: 20,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: 600,
              fontSize: 14,
              color: 'var(--color-dark)',
              marginBottom: 12,
            }}
          >
            About this class
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <HiUsers style={{ fontSize: 14, color: 'var(--color-gray)' }} />
            <span style={{ fontSize: 13, color: 'var(--color-gray)' }}>
              {course.enrolled} students enrolled
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <HiBookOpen style={{ fontSize: 14, color: 'var(--color-gray)' }} />
            <span style={{ fontSize: 13, color: 'var(--color-gray)' }}>Created Jan 2026</span>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {createType && (
        <Modal title={`Create ${createType}`} onClose={() => setCreateType(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <input
              type="text"
              placeholder="Title"
              value={createForm.title}
              onChange={e => setCreateForm(f => ({ ...f, title: e.target.value }))}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #d1d5db',
                borderRadius: 8,
                fontSize: 14,
                fontFamily: 'var(--font-poppins)',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <textarea
              placeholder="Description"
              value={createForm.description}
              onChange={e => setCreateForm(f => ({ ...f, description: e.target.value }))}
              rows={4}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #d1d5db',
                borderRadius: 8,
                fontSize: 14,
                fontFamily: 'var(--font-poppins)',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
              <button
                onClick={() => setCreateType(null)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 8,
                  border: '1px solid #d1d5db',
                  background: '#fff',
                  fontSize: 13,
                  fontFamily: 'var(--font-poppins)',
                  cursor: 'pointer',
                  color: 'var(--color-gray)',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const qa = QUICK_ACTIONS.find(q => q.label === createType)
                  setPosts(prev => [
                    {
                      type: createType,
                      badgeBg: qa.bg,
                      badgeColor: qa.color,
                      title: createForm.title,
                      desc: createForm.description,
                      time: 'Just now',
                    },
                    ...prev,
                  ])
                  setCreateType(null)
                  setCreateForm({ title: '', description: '' })
                }}
                style={{
                  padding: '8px 20px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'var(--color-primary)',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: 'var(--font-poppins)',
                  cursor: 'pointer',
                }}
              >
                Create
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* View Modal */}
      {viewPost && (
        <Modal title="Post Details" onClose={() => setViewPost(null)}>
          <div style={{ marginBottom: 12 }}>
            <span
              style={{
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
                background: viewPost.badgeBg,
                color: viewPost.badgeColor,
              }}
            >
              {viewPost.type}
            </span>
          </div>
          <div style={{ fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: 16, color: 'var(--color-dark)', marginBottom: 8 }}>
            {viewPost.title}
          </div>
          <p style={{ fontSize: 14, color: 'var(--color-gray)', lineHeight: 1.6, margin: '0 0 12px' }}>
            {viewPost.desc}
          </p>
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 16 }}>
            Posted {viewPost.time}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setViewPost(null)}
              style={{
                padding: '8px 24px',
                borderRadius: 8,
                border: 'none',
                background: 'var(--color-primary)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'var(--font-poppins)',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}

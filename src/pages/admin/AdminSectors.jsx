import { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { adminNav } from './adminNav'
import { HiPlus, HiPencil, HiTrash, HiUsers, HiX } from 'react-icons/hi'

const INITIAL_SECTORS = [
  { id: 1,  name: 'Driving',               courses: 4,  enrolled: 120 },
  { id: 2,  name: 'Construction',           courses: 6,  enrolled: 85 },
  { id: 3,  name: 'Electrical',             courses: 5,  enrolled: 97 },
  { id: 4,  name: 'Health & Wellness',      courses: 3,  enrolled: 210 },
  { id: 5,  name: 'Heating & HVAC',         courses: 4,  enrolled: 60 },
  { id: 6,  name: 'ICT',                    courses: 8,  enrolled: 340 },
  { id: 7,  name: 'Social Services',        courses: 3,  enrolled: 75 },
  { id: 8,  name: 'Tourism & Hospitality',  courses: 5,  enrolled: 155 },
  { id: 9,  name: 'Human Resources',        courses: 4,  enrolled: 88 },
  { id: 10, name: 'Cybersecurity',          courses: 6,  enrolled: 200 },
]

const BG_GRADIENTS = [
  'linear-gradient(135deg,#0d4291,#1e5bb5)',
  'linear-gradient(135deg,#f97316,#fb923c)',
  'linear-gradient(135deg,#16a34a,#22c55e)',
  'linear-gradient(135deg,#7c3aed,#a855f7)',
  'linear-gradient(135deg,#0891b2,#06b6d4)',
  'linear-gradient(135deg,#dc2626,#ef4444)',
  'linear-gradient(135deg,#d97706,#f59e0b)',
  'linear-gradient(135deg,#0d4291,#7c3aed)',
  'linear-gradient(135deg,#16a34a,#0891b2)',
  'linear-gradient(135deg,#f97316,#dc2626)',
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

export default function AdminSectors() {
  const [sectors, setSectors] = useState(INITIAL_SECTORS)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [formName, setFormName] = useState('')
  const [formCourses, setFormCourses] = useState('')

  /* ---- open add modal ---- */
  const handleAdd = () => {
    setEditing(null)
    setFormName('')
    setFormCourses('')
    setModalOpen(true)
  }

  /* ---- open edit modal ---- */
  const handleEdit = (sector) => {
    setEditing(sector)
    setFormName(sector.name)
    setFormCourses(String(sector.courses))
    setModalOpen(true)
  }

  /* ---- submit add / edit ---- */
  const handleSubmit = (e) => {
    e.preventDefault()
    const name = formName.trim()
    const courses = parseInt(formCourses, 10)
    if (!name || isNaN(courses) || courses < 0) return

    if (editing) {
      setSectors((prev) =>
        prev.map((s) => (s.id === editing.id ? { ...s, name, courses } : s))
      )
    } else {
      const newId = sectors.length > 0 ? Math.max(...sectors.map((s) => s.id)) + 1 : 1
      setSectors((prev) => [...prev, { id: newId, name, courses, enrolled: 0 }])
    }

    setModalOpen(false)
  }

  /* ---- confirm + delete ---- */
  const handleDelete = () => {
    setSectors((prev) => prev.filter((s) => s.id !== confirmDelete.id))
    setConfirmDelete(null)
  }

  return (
    <DashboardLayout
      navItems={adminNav}
      pageTitle="Sectors"
      pageSubtitle="View, edit, and delete sector details."
    >
      <div className="page-header">
        <span className="page-header__title">All Sectors</span>
        <button className="btn btn--primary" onClick={handleAdd}><HiPlus /> Add Sector</button>
      </div>

      <div className="sector-grid">
        {sectors.map((s, i) => (
          <div key={s.id} className="sector-card">
            <div className="sector-card__img-placeholder" style={{ background: BG_GRADIENTS[i % BG_GRADIENTS.length] }} />
            <div className="sector-card__body">
              <div className="sector-card__title">{s.name}</div>
              <div className="sector-card__meta">
                <HiUsers size={14} /> {s.enrolled} enrolled &nbsp;·&nbsp; {s.courses} courses
              </div>
            </div>
            <div className="sector-card__actions">
              <button className="btn btn--outline" style={{ flex: 1 }} onClick={() => handleEdit(s)}>
                <HiPencil size={13} /> Edit
              </button>
              <button className="btn btn--danger" style={{ flex: 1 }} onClick={() => setConfirmDelete(s)}>
                <HiTrash size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ---- Add / Edit Modal ---- */}
      {modalOpen && (
        <Modal title={editing ? 'Edit Sector' : 'Add Sector'} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit}>
            <label style={{ display:'block', marginBottom:16 }}>
              <span style={{ display:'block', marginBottom:6, fontWeight:600, fontSize:14 }}>Sector Name</span>
              <input
                className="settings-input"
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
              />
            </label>
            <label style={{ display:'block', marginBottom:24 }}>
              <span style={{ display:'block', marginBottom:6, fontWeight:600, fontSize:14 }}>Number of Courses</span>
              <input
                className="settings-input"
                type="number"
                min="0"
                value={formCourses}
                onChange={(e) => setFormCourses(e.target.value)}
                required
              />
            </label>
            <div style={{ display:'flex', gap:12, justifyContent:'flex-end' }}>
              <button type="button" className="btn btn--outline" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn--primary">{editing ? 'Save Changes' : 'Add Sector'}</button>
            </div>
          </form>
        </Modal>
      )}

      {/* ---- Delete Confirm Modal ---- */}
      {confirmDelete && (
        <Modal title="Delete Sector" onClose={() => setConfirmDelete(null)}>
          <p style={{ marginBottom:24, color:'#374151', fontSize:15 }}>
            Are you sure you want to delete <strong>{confirmDelete.name}</strong>? This action cannot be undone.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'flex-end' }}>
            <button className="btn btn--outline" onClick={() => setConfirmDelete(null)}>Cancel</button>
            <button className="btn btn--danger" onClick={handleDelete}>Delete</button>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  )
}

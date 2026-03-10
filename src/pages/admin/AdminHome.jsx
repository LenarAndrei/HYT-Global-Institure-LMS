import { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { adminNav } from './adminNav'
import { HiTrendingUp, HiUsers, HiBookOpen, HiBell, HiPlus, HiX } from 'react-icons/hi'

const stats = [
  { label: 'Total Users',      value: '1,284' },
  { label: 'Active Courses',   value: '48' },
  { label: 'Sectors',          value: '10' },
  { label: 'Enrollments',      value: '3,540' },
  { label: 'Completions',      value: '892' },
  { label: 'Pending Approvals',value: '17' },
]

const announcements = [
  {
    type: 'orange',
    title: 'New Training Programs Available',
    text:  'Three new TESDA-aligned programs have been added. Review and publish them from the Sectors page.',
  },
  {
    type: 'blue',
    title: 'System Maintenance Scheduled',
    text:  'Scheduled downtime on Saturday 2:00 AM – 4:00 AM. Notify affected users in advance.',
  },
]

const defaultUsers = [
  { name: 'Maria Santos',   role: 'Student', status: 'Active',   date: 'Mar 10, 2026' },
  { name: 'Juan dela Cruz', role: 'Trainer', status: 'Active',   date: 'Mar 9, 2026' },
  { name: 'Ana Reyes',      role: 'Student', status: 'Pending',  date: 'Mar 9, 2026' },
  { name: 'Carlos Bautista',role: 'Student', status: 'Active',   date: 'Mar 8, 2026' },
  { name: 'Liza Villanueva',role: 'Trainer', status: 'Inactive', date: 'Mar 7, 2026' },
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

export default function AdminHome() {
  const [recentUsers, setRecentUsers] = useState(defaultUsers)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', role: 'Student', status: 'Active' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      name: form.name,
      role: form.role,
      status: form.status,
      date: 'Mar 10, 2026',
    }
    setRecentUsers([newUser, ...recentUsers])
    setForm({ name: '', email: '', role: 'Student', status: 'Active' })
    setShowModal(false)
  }

  return (
    <DashboardLayout navItems={adminNav} pageTitle={null}>
      {/* Stats */}
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <span className="stat-card__label">{s.label}</span>
            <span className="stat-card__value">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Announcements */}
      <div style={{ marginBottom: 24 }}>
        {announcements.map((a) => (
          <div key={a.title} className={`announcement-banner announcement-banner--${a.type}`}>
            <div className="announcement-banner__title">{a.title}</div>
            <div className="announcement-banner__text">{a.text}</div>
          </div>
        ))}
      </div>

      {/* Recent users */}
      <div className="card">
        <div className="page-header">
          <span className="page-header__title">Recent Users</span>
          <button className="btn btn--primary" onClick={() => setShowModal(true)}>
            <HiPlus /> Add User
          </button>
        </div>
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u) => (
                <tr key={u.name}>
                  <td>{u.name}</td>
                  <td>{u.role}</td>
                  <td>
                    <span className={`badge badge--${
                      u.status === 'Active' ? 'green' :
                      u.status === 'Pending' ? 'amber' : 'red'
                    }`}>{u.status}</span>
                  </td>
                  <td>{u.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <Modal title="Add User" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit}>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              <div>
                <label style={{ display:'block', marginBottom:6, fontWeight:600, fontSize:14 }}>Full Name</label>
                <input
                  className="settings-input"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label style={{ display:'block', marginBottom:6, fontWeight:600, fontSize:14 }}>Email</label>
                <input
                  className="settings-input"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label style={{ display:'block', marginBottom:6, fontWeight:600, fontSize:14 }}>Role</label>
                <select
                  className="settings-input"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option value="Student">Student</option>
                  <option value="Trainer">Trainer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div>
                <label style={{ display:'block', marginBottom:6, fontWeight:600, fontSize:14 }}>Status</label>
                <select
                  className="settings-input"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div style={{ display:'flex', justifyContent:'flex-end', gap:12, marginTop:24 }}>
              <button type="button" className="btn btn--outline" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="btn btn--primary">Add</button>
            </div>
          </form>
        </Modal>
      )}
    </DashboardLayout>
  )
}

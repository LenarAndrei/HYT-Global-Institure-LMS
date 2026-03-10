import { useState } from 'react'
import { HiX } from 'react-icons/hi'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { studentNav } from './studentNav'

const INITIAL_ASSIGNED = [
  { id: 1, title: 'Quiz: Barista Module 4',           course: 'Barista NCII',            due: 'Mar 15, 2026', type: 'Quiz' },
  { id: 2, title: 'Assignment: Coffee Extraction Lab', course: 'Barista NCII',            due: 'Mar 17, 2026', type: 'Assignment' },
  { id: 3, title: 'Quiz: Wiring Diagrams',             course: 'Electrical Installation', due: 'Mar 18, 2026', type: 'Quiz' },
  { id: 4, title: 'Practical: Safety Inspection',      course: 'Electrical Installation', due: 'Mar 20, 2026', type: 'Practical' },
  { id: 5, title: 'Quiz: Traffic Signs NC III',         course: 'Driving NC III',          due: 'Mar 21, 2026', type: 'Quiz' },
]

const INITIAL_COMPLETED = [
  { id: 6, title: 'Quiz: Barista Module 1',            course: 'Barista NCII',            submitted: 'Feb 20, 2026', score: '92/100' },
  { id: 7, title: 'Quiz: Barista Module 2',            course: 'Barista NCII',            submitted: 'Mar 1, 2026',  score: '88/100' },
  { id: 8, title: 'Assignment: Introduction Report',   course: 'Driving NC III',          submitted: 'Feb 28, 2026', score: '95/100' },
  { id: 9, title: 'Quiz: HTML Basics',                  course: 'Web Development',         submitted: 'Feb 15, 2026', score: '78/100' },
]

const TYPE_BADGE = { Quiz: 'blue', Assignment: 'amber', Practical: 'green' }

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

export default function StudentTasks() {
  const [tab, setTab] = useState('assigned')
  const [assigned, setAssigned] = useState(INITIAL_ASSIGNED)
  const [completed, setCompleted] = useState(INITIAL_COMPLETED)
  const [activeTask, setActiveTask] = useState(null)

  function handleSubmit() {
    if (!activeTask) return
    setAssigned((prev) => prev.filter((t) => t.id !== activeTask.id))
    setCompleted((prev) => [
      { id: activeTask.id, title: activeTask.title, course: activeTask.course, submitted: 'Mar 10, 2026', score: 'Pending' },
      ...prev,
    ])
    setActiveTask(null)
    setTab('completed')
  }

  return (
    <DashboardLayout
      navItems={studentNav}
      pageTitle="Tasks"
      pageSubtitle="Track your assignments, quizzes, and submissions."
    >
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <span className="badge badge--amber" style={{ fontSize: 13, padding: '4px 14px' }}>
          {assigned.length} pending
        </span>
      </div>

      <div className="task-tabs">
        <button
          className={`task-tab${tab === 'assigned' ? ' task-tab--active' : ''}`}
          onClick={() => setTab('assigned')}
        >
          Assigned ({assigned.length})
        </button>
        <button
          className={`task-tab${tab === 'completed' ? ' task-tab--active' : ''}`}
          onClick={() => setTab('completed')}
        >
          Completed ({completed.length})
        </button>
      </div>

      {tab === 'assigned' ? (
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Course</th>
                <th>Type</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {assigned.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 500 }}>{t.title}</td>
                  <td style={{ color: 'var(--color-gray)' }}>{t.course}</td>
                  <td><span className={`badge badge--${TYPE_BADGE[t.type] || 'blue'}`}>{t.type}</span></td>
                  <td style={{ color: 'var(--color-gray)', fontSize: 13 }}>{t.due}</td>
                  <td>
                    <button className="btn btn--accent" style={{ padding: '4px 14px', fontSize: 12 }} onClick={() => setActiveTask(t)}>
                      Start
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="data-table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Course</th>
                <th>Submitted</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {completed.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 500 }}>{t.title}</td>
                  <td style={{ color: 'var(--color-gray)' }}>{t.course}</td>
                  <td style={{ color: 'var(--color-gray)', fontSize: 13 }}>{t.submitted}</td>
                  <td><span className="badge badge--green">{t.score}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTask && (
        <Modal title={activeTask.title} onClose={() => setActiveTask(null)}>
          <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:20 }}>
            <div style={{ display:'flex', gap:12, alignItems:'center', fontSize:14, color:'var(--color-gray)' }}>
              <span><strong>Course:</strong> {activeTask.course}</span>
              <span className={`badge badge--${TYPE_BADGE[activeTask.type] || 'blue'}`}>{activeTask.type}</span>
              <span><strong>Due:</strong> {activeTask.due}</span>
            </div>
          </div>
          <label style={{ fontFamily:'var(--font-poppins)', fontWeight:600, fontSize:14, color:'var(--color-dark)', marginBottom:6, display:'block' }}>
            Your Answer / Submission
          </label>
          <textarea
            rows={5}
            style={{ width:'100%', borderRadius:8, border:'1px solid #d1d5db', padding:'10px 14px', fontSize:14, fontFamily:'inherit', resize:'vertical', marginBottom:20 }}
          />
          <div style={{ display:'flex', justifyContent:'flex-end', gap:10 }}>
            <button className="btn" style={{ padding:'6px 20px', fontSize:13 }} onClick={() => setActiveTask(null)}>Cancel</button>
            <button className="btn btn--accent" style={{ padding:'6px 20px', fontSize:13 }} onClick={handleSubmit}>Submit</button>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  )
}

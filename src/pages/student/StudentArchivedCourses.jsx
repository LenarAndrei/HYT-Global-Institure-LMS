import { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { studentNav } from './studentNav'
import { HiUsers, HiX, HiAcademicCap, HiCalendar, HiBookOpen } from 'react-icons/hi'

const ARCHIVED = [
  { title: 'Basic Barista Course',        sector: 'Tourism & Hospitality', completedOn: 'Jan 10, 2026', color: '#0d4291' },
  { title: 'Food Safety Fundamentals',    sector: 'Health & Wellness',     completedOn: 'Dec 5, 2025',  color: '#16a34a' },
  { title: 'Customer Service NC I',       sector: 'Tourism & Hospitality', completedOn: 'Nov 20, 2025', color: '#f97316' },
  { title: 'Basic Electrical Wiring',     sector: 'Electrical',            completedOn: 'Oct 15, 2025', color: '#7c3aed' },
  { title: 'Intro to Web Dev',            sector: 'ICT',                   completedOn: 'Sep 30, 2025', color: '#0891b2' },
  { title: 'HVAC Fundamentals',           sector: 'Heating & HVAC',        completedOn: 'Aug 12, 2025', color: '#d97706' },
]

const BG = [
  'linear-gradient(135deg,#0d4291,#1e5bb5)',
  'linear-gradient(135deg,#16a34a,#22c55e)',
  'linear-gradient(135deg,#f97316,#fb923c)',
  'linear-gradient(135deg,#7c3aed,#a855f7)',
  'linear-gradient(135deg,#0891b2,#06b6d4)',
  'linear-gradient(135deg,#d97706,#f59e0b)',
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

export default function StudentArchivedCourses() {
  const [viewCourse, setViewCourse] = useState(null)

  function downloadCertificate(course) {
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 850
    const ctx = canvas.getContext('2d')

    // White background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, 1200, 850)

    // Border with course color
    ctx.strokeStyle = course.color
    ctx.lineWidth = 12
    ctx.strokeRect(30, 30, 1140, 790)

    // Inner border
    ctx.strokeStyle = course.color
    ctx.lineWidth = 2
    ctx.strokeRect(45, 45, 1110, 760)

    // Header: HYT Global Institute
    ctx.fillStyle = course.color
    ctx.font = 'bold 32px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.fillText('HYT Global Institute', 600, 120)

    // Decorative line
    ctx.strokeStyle = course.color
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(350, 145)
    ctx.lineTo(850, 145)
    ctx.stroke()

    // CERTIFICATE OF COMPLETION
    ctx.fillStyle = '#1f2937'
    ctx.font = 'bold 40px Georgia, serif'
    ctx.fillText('CERTIFICATE OF COMPLETION', 600, 220)

    // "This is to certify that"
    ctx.fillStyle = '#6b7280'
    ctx.font = '18px Georgia, serif'
    ctx.fillText('This is to certify that', 600, 290)

    // Student name
    ctx.fillStyle = course.color
    ctx.font = 'bold 44px Georgia, serif'
    ctx.fillText('Sample Student', 600, 360)

    // "has successfully completed"
    ctx.fillStyle = '#6b7280'
    ctx.font = '18px Georgia, serif'
    ctx.fillText('has successfully completed the course', 600, 420)

    // Course title
    ctx.fillStyle = '#1f2937'
    ctx.font = 'bold 34px Georgia, serif'
    ctx.fillText(course.title, 600, 490)

    // Sector
    ctx.fillStyle = '#6b7280'
    ctx.font = '18px Georgia, serif'
    ctx.fillText('Sector: ' + course.sector, 600, 540)

    // Completed date
    ctx.fillStyle = '#374151'
    ctx.font = '20px Georgia, serif'
    ctx.fillText('Completed: ' + course.completedOn, 600, 610)

    // Bottom decorative line
    ctx.strokeStyle = course.color
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(350, 680)
    ctx.lineTo(850, 680)
    ctx.stroke()

    // Footer
    ctx.fillStyle = '#9ca3af'
    ctx.font = '14px Georgia, serif'
    ctx.fillText('HYT Global Institute \u2022 Learning Management System', 600, 720)

    // Trigger download
    const link = document.createElement('a')
    link.download = course.title + '-Certificate.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <DashboardLayout
      navItems={studentNav}
      pageTitle="Archived Courses"
      pageSubtitle="Your completed and archived course records."
    >
      <div className="page-header">
        <span className="page-header__title">Archived Courses</span>
        <span style={{ fontSize: 13, color: 'var(--color-gray)' }}>{ARCHIVED.length} courses</span>
      </div>

      <div className="sector-grid">
        {ARCHIVED.map((c, i) => (
          <div key={c.title} className="sector-card">
            <div className="sector-card__img-placeholder" style={{ background: BG[i % BG.length] }} />
            <div className="sector-card__body">
              <div className="sector-card__title">{c.title}</div>
              <div className="sector-card__meta">
                {c.sector}
              </div>
              <div style={{ marginTop: 8, fontSize: 12, color: 'var(--color-gray)' }}>
                Completed: {c.completedOn}
              </div>
            </div>
            <div className="sector-card__actions">
              <button className="btn btn--outline" style={{ flex: 1 }} onClick={() => setViewCourse(c)}>View Details</button>
              <button className="btn btn--primary" style={{ flex: 1 }} onClick={() => downloadCertificate(c)}>Certificate</button>
            </div>
          </div>
        ))}
      </div>

      {viewCourse && (
        <Modal title="Course Details" onClose={() => setViewCourse(null)}>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <HiBookOpen size={20} style={{ color: viewCourse.color }} />
              <div>
                <div style={{ fontSize:11, color:'#6b7280', fontWeight:600, textTransform:'uppercase', letterSpacing:0.5 }}>Course Title</div>
                <div style={{ fontWeight:700, fontSize:16, color:'var(--color-dark)' }}>{viewCourse.title}</div>
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <HiAcademicCap size={20} style={{ color: viewCourse.color }} />
              <div>
                <div style={{ fontSize:11, color:'#6b7280', fontWeight:600, textTransform:'uppercase', letterSpacing:0.5 }}>Sector</div>
                <div style={{ fontWeight:600, fontSize:14, color:'var(--color-dark)' }}>{viewCourse.sector}</div>
              </div>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <HiCalendar size={20} style={{ color: viewCourse.color }} />
              <div>
                <div style={{ fontSize:11, color:'#6b7280', fontWeight:600, textTransform:'uppercase', letterSpacing:0.5 }}>Completed</div>
                <div style={{ fontWeight:600, fontSize:14, color:'var(--color-dark)' }}>{viewCourse.completedOn}</div>
              </div>
            </div>
          </div>
          <div style={{ display:'flex', gap:10, marginTop:24 }}>
            <button className="btn btn--primary" style={{ flex:1 }} onClick={() => downloadCertificate(viewCourse)}>Download Certificate</button>
            <button className="btn btn--outline" style={{ flex:1 }} onClick={() => setViewCourse(null)}>Close</button>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  )
}

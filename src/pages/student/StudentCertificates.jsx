import DashboardLayout from '../../components/layout/DashboardLayout'
import { studentNav } from './studentNav'
import { HiAcademicCap, HiDownload } from 'react-icons/hi'

const CERTS = [
  { title: 'Barista NCII',              issuer: 'TESDA',      date: 'Feb 28, 2026', color: '#0d4291' },
  { title: 'Food Safety Level 1',       issuer: 'HYTech LMS', date: 'Jan 15, 2026', color: '#16a34a' },
  { title: 'Customer Service NC II',    issuer: 'TESDA',      date: 'Dec 10, 2025', color: '#7c3aed' },
  { title: 'Basic Computer Operations', issuer: 'HYTech LMS', date: 'Nov 5, 2025',  color: '#0891b2' },
]

function downloadCertificate(cert) {
  const W = 1200
  const H = 850
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  // ── White background ──
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, W, H)

  // ── Double-line border ──
  ctx.strokeStyle = cert.color
  ctx.lineWidth = 6
  ctx.strokeRect(20, 20, W - 40, H - 40)
  ctx.lineWidth = 2
  ctx.strokeRect(32, 32, W - 64, H - 64)

  // ── Decorative top line ──
  ctx.strokeStyle = cert.color
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(300, 110)
  ctx.lineTo(900, 110)
  ctx.stroke()

  // ── HYTech logo text ──
  ctx.fillStyle = cert.color
  ctx.font = 'bold 28px Georgia, serif'
  ctx.textAlign = 'center'
  ctx.fillText('HYT Global Institute', W / 2, 90)

  // ── CERTIFICATE OF COMPLETION ──
  ctx.fillStyle = '#1a1a1a'
  ctx.font = 'bold 42px Georgia, serif'
  ctx.fillText('CERTIFICATE OF COMPLETION', W / 2, 180)

  // ── Decorative line under heading ──
  ctx.strokeStyle = cert.color
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(350, 200)
  ctx.lineTo(850, 200)
  ctx.stroke()

  // ── "This is to certify that" ──
  ctx.fillStyle = '#555555'
  ctx.font = 'italic 20px Georgia, serif'
  ctx.fillText('This is to certify that', W / 2, 270)

  // ── Student name ──
  ctx.fillStyle = '#1a1a1a'
  ctx.font = 'bold 48px Georgia, serif'
  ctx.fillText('Sample Student', W / 2, 340)

  // ── Decorative line under name ──
  ctx.strokeStyle = '#cccccc'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(350, 360)
  ctx.lineTo(850, 360)
  ctx.stroke()

  // ── "has successfully completed the program" ──
  ctx.fillStyle = '#555555'
  ctx.font = '20px Georgia, serif'
  ctx.fillText('has successfully completed the program', W / 2, 420)

  // ── Course / cert title ──
  ctx.fillStyle = cert.color
  ctx.font = 'bold 36px Georgia, serif'
  ctx.fillText(cert.title, W / 2, 490)

  // ── Decorative line under title ──
  ctx.strokeStyle = cert.color
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(400, 510)
  ctx.lineTo(800, 510)
  ctx.stroke()

  // ── Issuer and date ──
  ctx.fillStyle = '#333333'
  ctx.font = '18px Georgia, serif'
  ctx.fillText(`Issued by: ${cert.issuer}`, W / 2, 580)
  ctx.fillText(`Date: ${cert.date}`, W / 2, 610)

  // ── Decorative bottom line ──
  ctx.strokeStyle = cert.color
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(300, 680)
  ctx.lineTo(900, 680)
  ctx.stroke()

  // ── Signature placeholders ──
  ctx.fillStyle = '#999999'
  ctx.font = '14px Georgia, serif'

  // Left signature
  ctx.strokeStyle = '#333333'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(200, 750)
  ctx.lineTo(450, 750)
  ctx.stroke()
  ctx.fillText('Authorized Signature', 325, 775)

  // Right signature
  ctx.beginPath()
  ctx.moveTo(750, 750)
  ctx.lineTo(1000, 750)
  ctx.stroke()
  ctx.fillText('Program Director', 875, 775)

  // ── Convert to PNG and trigger download ──
  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${cert.title}-Certificate.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 'image/png')
}

export default function StudentCertificates() {
  return (
    <DashboardLayout
      navItems={studentNav}
      pageTitle="Certificates"
      pageSubtitle="Your earned certifications and progress toward new ones."
    >
      <div className="page-header">
        <span className="page-header__title">My Certificates</span>
        <span style={{ fontSize: 13, color: 'var(--color-gray)' }}>{CERTS.length} earned</span>
      </div>

      <div className="cert-grid">
        {CERTS.map((c) => (
          <div key={c.title} className="cert-card">
            <div className="cert-card__banner" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}aa)` }}>
              <HiAcademicCap className="cert-card__icon" />
            </div>
            <div className="cert-card__body">
              <div className="cert-card__title">{c.title}</div>
              <div className="cert-card__date">{c.issuer} · Issued {c.date}</div>
            </div>
            <div className="cert-card__footer">
              <button
                className="btn btn--outline"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => downloadCertificate(c)}
              >
                <HiDownload size={14} /> Download Certificate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* In-progress section */}
      <div style={{ marginTop: 32 }}>
        <div className="page-header">
          <span className="page-header__title">In Progress</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { title: 'Electrical Installation NC II', progress: 40, color: '#7c3aed' },
            { title: 'Driving NC III',                progress: 90, color: '#16a34a' },
          ].map((c) => (
            <div key={c.title} className="card" style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{c.title}</span>
                <span style={{ fontSize: 13, color: c.color, fontWeight: 600 }}>{c.progress}%</span>
              </div>
              <div style={{ height: 8, background: '#f3f4f6', borderRadius: 99 }}>
                <div style={{ height: '100%', width: `${c.progress}%`, background: c.color, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

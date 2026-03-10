import { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { studentNav } from './studentNav'
import { HiBookOpen, HiClock, HiAcademicCap, HiSearch, HiX } from 'react-icons/hi'

const COURSES = [
  {
    id: 'barista-ncii',
    title: 'Barista NCII',
    trainer: 'Maria Clara Garcia',
    batch: 'Dreamers Batch 16',
    progress: 72,
    status: 'ongoing',
    color: 'linear-gradient(135deg,#f97316,#fb923c)',
    nextTask: 'Lab Exercise 4 due Mar 12',
  },
  {
    id: 'electrical',
    title: 'Basic Electrical Wiring',
    trainer: 'Robert Dela Cruz',
    batch: 'Batch 5',
    progress: 45,
    status: 'ongoing',
    color: 'linear-gradient(135deg,#7c3aed,#a855f7)',
    nextTask: 'Quiz 2 due Mar 14',
  },
  {
    id: 'web-dev',
    title: 'ICT Web Dev Fundamentals',
    trainer: 'Ana Santos',
    batch: 'Batch 3',
    progress: 90,
    status: 'ongoing',
    color: 'linear-gradient(135deg,#0891b2,#06b6d4)',
    nextTask: 'Final project due Mar 20',
  },
  {
    id: 'cookery',
    title: 'Cookery NCII',
    trainer: 'Jose Reyes',
    batch: 'Batch 8',
    progress: 100,
    status: 'completed',
    color: 'linear-gradient(135deg,#16a34a,#4ade80)',
    nextTask: 'Completed',
  },
]

export default function StudentCourses() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedCourse, setSelectedCourse] = useState(null)

  const filtered = COURSES.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                        c.trainer.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || c.status === filter
    return matchSearch && matchFilter
  })

  return (
    <DashboardLayout navItems={studentNav} pageTitle="My Courses" pageSubtitle="Track your enrolled courses">
      <div className="page-header">
        <h1 className="page-header__title">My Courses</h1>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', marginBottom: 24 }}>
        <div className="stat-card">
          <span className="stat-card__label">Enrolled</span>
          <span className="stat-card__value">{COURSES.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Ongoing</span>
          <span className="stat-card__value">{COURSES.filter(c => c.status === 'ongoing').length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__label">Completed</span>
          <span className="stat-card__value">{COURSES.filter(c => c.status === 'completed').length}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <HiSearch size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            className="table-search"
            style={{ paddingLeft: 32 }}
            placeholder="Search courses…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {['all', 'ongoing', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`settings-tab${filter === f ? ' settings-tab--active' : ''}`}
            style={{ textTransform: 'capitalize' }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Course cards */}
      <div className="sector-grid">
        {filtered.map(course => (
          <div
            key={course.id}
            className="sector-card"
            onClick={() => setSelectedCourse(course)}
          >
            {/* Banner */}
            <div style={{ height: 120, background: course.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HiBookOpen size={40} color="white" />
            </div>

            <div className="sector-card__body">
              <div className="sector-card__title">{course.title}</div>
              <div className="sector-card__meta">
                <HiAcademicCap size={14} />
                <span>{course.trainer}</span>
              </div>
              <div className="sector-card__meta" style={{ marginTop: 2 }}>
                <HiClock size={14} />
                <span>{course.batch}</span>
              </div>

              {/* Progress bar */}
              <div style={{ marginTop: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12, color: '#6b7280' }}>
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div style={{ height: 6, background: '#e5e7eb', borderRadius: 99, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${course.progress}%`,
                      background: course.status === 'completed' ? '#16a34a' : '#0D4291',
                      borderRadius: 99,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="sector-card__actions" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#6b7280' }}>
                {course.nextTask}
              </span>
              <span
                className={`badge ${course.status === 'completed' ? 'badge--green' : 'badge--blue'}`}
                style={{ textTransform: 'capitalize' }}
              >
                {course.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: '#9ca3af', fontFamily: 'var(--font-poppins)' }}>
          No courses match your search.
        </div>
      )}

      {/* Course detail modal */}
      {selectedCourse && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          }}
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="card"
            style={{ width: 440, maxWidth: '92vw', padding: 28, position: 'relative' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedCourse(null)}
              style={{
                position: 'absolute', top: 12, right: 12, background: 'none',
                border: 'none', cursor: 'pointer', color: '#6b7280',
              }}
            >
              <HiX size={20} />
            </button>

            {/* Title */}
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
              {selectedCourse.title}
            </h2>

            {/* Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <HiAcademicCap size={16} color="#6b7280" />
                <span><strong>Trainer:</strong> {selectedCourse.trainer}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <HiClock size={16} color="#6b7280" />
                <span><strong>Batch:</strong> {selectedCourse.batch}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <HiBookOpen size={16} color="#6b7280" />
                <span><strong>Status:</strong>{' '}
                  <span
                    className={`badge ${selectedCourse.status === 'completed' ? 'badge--green' : 'badge--blue'}`}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {selectedCourse.status}
                  </span>
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13, color: '#6b7280' }}>
                <span>Progress</span>
                <span>{selectedCourse.progress}%</span>
              </div>
              <div style={{ height: 8, background: '#e5e7eb', borderRadius: 99, overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${selectedCourse.progress}%`,
                    background: selectedCourse.status === 'completed' ? '#16a34a' : '#0D4291',
                    borderRadius: 99,
                  }}
                />
              </div>
            </div>

            {/* Next task */}
            <div style={{ marginTop: 16, padding: '10px 12px', background: '#f9fafb', borderRadius: 8, fontSize: 13, color: '#374151' }}>
              <strong>Next Task:</strong> {selectedCourse.nextTask}
            </div>

            {/* Close button */}
            <button
              className="btn btn--outline"
              style={{ marginTop: 20, width: '100%' }}
              onClick={() => setSelectedCourse(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

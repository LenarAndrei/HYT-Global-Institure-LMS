import { useState } from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { studentNav } from './studentNav'
import { HiChevronLeft, HiChevronRight, HiCalendar } from 'react-icons/hi'

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const EVENTS = {
  '2026-03-03': [{ title: 'Barista Quiz Module 4',     color: 'blue',   time: '9:00 AM - 10:30 AM',  location: 'Room 201' }],
  '2026-03-05': [{ title: 'Driving Practical',         color: 'green',  time: '1:00 PM - 3:00 PM',   location: 'Training Yard B' }],
  '2026-03-09': [{ title: 'Electrical Assignment Due', color: 'amber',  time: '11:59 PM',             location: 'Online' }],
  '2026-03-10': [{ title: 'Web Dev Module',            color: 'blue',   time: '10:00 AM - 12:00 PM', location: 'Lab A' }],
  '2026-03-12': [{ title: 'Trainer Meeting',           color: 'purple', time: '2:00 PM - 2:45 PM',   location: 'Room 105' }],
  '2026-03-15': [
    { title: 'Barista Quiz',        color: 'amber', time: '9:00 AM - 9:45 AM', location: 'Room 201' },
    { title: 'Assignment Deadline', color: 'red',   time: '11:59 PM',          location: 'Online' },
  ],
  '2026-03-18': [{ title: 'Practical Test',           color: 'green',  time: '10:00 AM - 12:30 PM', location: 'Workshop C' }],
  '2026-03-20': [{ title: 'Safety Inspection',        color: 'purple', time: '3:00 PM - 4:00 PM',   location: 'Building 3' }],
  '2026-03-22': [{ title: 'Group Discussion',         color: 'blue',   time: '1:00 PM - 2:30 PM',   location: 'Room 308' }],
  '2026-03-25': [{ title: 'Final Project Submission', color: 'red',    time: '5:00 PM',              location: 'Online' }],
  '2026-03-28': [{ title: 'Review Session',           color: 'blue',   time: '11:00 AM - 12:30 PM', location: 'Lab A' }],
  '2026-03-30': [{ title: 'Exam Prep Workshop',       color: 'purple', time: '9:30 AM - 11:30 AM',  location: 'Auditorium' }],
}

const DOT_COLORS = {
  blue:   '#0284c7',
  green:  '#16a34a',
  amber:  '#d97706',
  purple: '#7c3aed',
  red:    '#dc2626',
}

function pad(n) { return String(n).padStart(2, '0') }

export default function StudentCalendar() {
  const today = new Date(2026, 2, 10)
  const [view, setView] = useState({ year: 2026, month: 2 })
  const [selectedDate, setSelectedDate] = useState(10)

  const firstDay = new Date(view.year, view.month, 1).getDay()
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()

  const prev = () => {
    setView((v) => {
      const d = new Date(v.year, v.month - 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
    setSelectedDate(null)
  }
  const next = () => {
    setView((v) => {
      const d = new Date(v.year, v.month + 1)
      return { year: d.getFullYear(), month: d.getMonth() }
    })
    setSelectedDate(null)
  }

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  /* Build the key for the selected date so we can look up events */
  const selectedKey = selectedDate
    ? `${view.year}-${pad(view.month + 1)}-${pad(selectedDate)}`
    : null
  const selectedEvents = selectedKey ? (EVENTS[selectedKey] || []) : []

  /* Format the selected date for the detail panel heading */
  const formattedDate = selectedDate
    ? `${MONTHS[view.month]} ${selectedDate}, ${view.year}`
    : null

  return (
    <DashboardLayout
      navItems={studentNav}
      pageTitle="Calendar"
    >
      {/* Two-column layout: calendar 70% | detail panel 30% */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>

        {/* ── Left: Calendar Grid ──────────────────────────────────────── */}
        <div style={{ flex: '0 0 70%', minWidth: 0 }}>
          <div className="calendar-wrap">
            <div className="calendar-header">
              <button className="btn btn--outline" style={{ padding: '6px 10px' }} onClick={prev}>
                <HiChevronLeft />
              </button>
              <span className="calendar-header__title">
                {MONTHS[view.month]} {view.year}
              </span>
              <button className="btn btn--outline" style={{ padding: '6px 10px' }} onClick={next}>
                <HiChevronRight />
              </button>
            </div>

            <div className="calendar-grid">
              {DAYS.map((d) => (
                <div key={d} className="calendar-day-header">{d}</div>
              ))}
              {cells.map((day, idx) => {
                if (!day) return <div key={`blank-${idx}`} className="calendar-cell" />
                const key = `${view.year}-${pad(view.month + 1)}-${pad(day)}`
                const events = EVENTS[key] || []
                const isToday = day === today.getDate() && view.month === today.getMonth() && view.year === today.getFullYear()
                const isSelected = day === selectedDate
                return (
                  <div
                    key={key}
                    className={`calendar-cell${isToday ? ' calendar-cell--today' : ''}`}
                    style={{
                      cursor: 'pointer',
                      border: isSelected ? '2px solid #0D4291' : '1px solid #f3f4f6',
                      borderRight: isSelected ? '2px solid #0D4291' : undefined,
                      borderBottom: isSelected ? '2px solid #0D4291' : undefined,
                    }}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className="calendar-cell__num">{day}</div>
                    {events.map((e, ei) => (
                      <div key={ei} className={`calendar-event calendar-event--${e.color}`}>{e.title}</div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
            {[
              { color: 'blue',   label: 'Quizzes & Modules' },
              { color: 'green',  label: 'Practicals' },
              { color: 'amber',  label: 'Assignments' },
              { color: 'purple', label: 'Meetings & Workshops' },
              { color: 'red',    label: 'Deadlines' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div className={`calendar-event calendar-event--${item.color}`} style={{ margin: 0, minWidth: 12, height: 12, borderRadius: 2 }} />
                <span style={{ fontSize: 12, color: 'var(--color-gray)' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Detail Panel ──────────────────────────────────────── */}
        <div style={{ flex: '0 0 30%', minWidth: 0 }}>
          <div className="card" style={{ position: 'sticky', top: 28 }}>
            {selectedDate ? (
              <>
                {/* Date heading */}
                <h3 style={{
                  fontFamily: 'var(--font-poppins)',
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--color-dark)',
                  marginBottom: 4,
                }}>
                  {formattedDate}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-poppins)',
                  fontSize: 13,
                  color: 'var(--color-gray)',
                  marginBottom: 20,
                }}>
                  {selectedEvents.length
                    ? `${selectedEvents.length} event${selectedEvents.length > 1 ? 's' : ''}`
                    : 'No events'}
                </p>

                {selectedEvents.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {selectedEvents.map((evt, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          gap: 12,
                          padding: '12px 14px',
                          borderRadius: 'var(--radius-sm)',
                          background: '#f9fafb',
                        }}
                      >
                        {/* Colored dot */}
                        <div style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: DOT_COLORS[evt.color] || '#6b7280',
                          marginTop: 5,
                          flexShrink: 0,
                        }} />

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontFamily: 'var(--font-poppins)',
                            fontSize: 14,
                            fontWeight: 600,
                            color: 'var(--color-dark)',
                            marginBottom: 4,
                          }}>
                            {evt.title}
                          </div>
                          <div style={{
                            fontFamily: 'var(--font-poppins)',
                            fontSize: 12,
                            color: 'var(--color-gray)',
                            marginBottom: 2,
                          }}>
                            {evt.time}
                          </div>
                          <div style={{
                            fontFamily: 'var(--font-poppins)',
                            fontSize: 12,
                            color: 'var(--color-gray)',
                          }}>
                            {evt.location}
                          </div>
                        </div>

                        <span className={`badge badge--${evt.color === 'purple' || evt.color === 'green' ? 'blue' : evt.color}`} style={{
                          alignSelf: 'flex-start',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}>
                          {evt.color === 'blue' && 'Module'}
                          {evt.color === 'green' && 'Practical'}
                          {evt.color === 'amber' && 'Assignment'}
                          {evt.color === 'purple' && 'Meeting'}
                          {evt.color === 'red' && 'Deadline'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Empty state */
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px 0',
                    gap: 12,
                  }}>
                    <HiCalendar style={{ fontSize: 48, color: '#d1d5db' }} />
                    <span style={{
                      fontFamily: 'var(--font-poppins)',
                      fontSize: 14,
                      color: 'var(--color-gray)',
                    }}>
                      No events scheduled
                    </span>
                  </div>
                )}
              </>
            ) : (
              /* Nothing selected (after navigating to a new month) */
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 0',
                gap: 12,
              }}>
                <HiCalendar style={{ fontSize: 48, color: '#d1d5db' }} />
                <span style={{
                  fontFamily: 'var(--font-poppins)',
                  fontSize: 14,
                  color: 'var(--color-gray)',
                }}>
                  Select a date to view details
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

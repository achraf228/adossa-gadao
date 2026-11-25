/** Génère et télécharge un fichier .ics (événement sur plusieurs jours, journées entières). */
export function downloadIcs({ title, description, startDate, endDate, filename = 'evenement.ics' }) {
  const fmt = (d) => d.replaceAll('-', '')
  const endExclusive = new Date(endDate)
  endExclusive.setDate(endExclusive.getDate() + 1)
  const end = endExclusive.toISOString().slice(0, 10)
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ADOSSA-GADAO//FR', 'BEGIN:VEVENT',
    `UID:${fmt(startDate)}@adossa-gadao`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART;VALUE=DATE:${fmt(startDate)}`, `DTEND;VALUE=DATE:${fmt(end)}`,
    `SUMMARY:${title}`, `DESCRIPTION:${description}`, 'END:VEVENT', 'END:VCALENDAR',
  ]
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = Object.assign(document.createElement('a'), { href: url, download: filename })
  document.body.appendChild(a); a.click(); a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

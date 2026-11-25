import Badge from '../common/Badge'

const MAP = {
  pending: ['gold', 'En attente'], validated: ['green', 'Validée'], refused: ['wine', 'Refusée'],
  draft: ['gold', 'Brouillon'], published: ['green', 'Publiée'], archived: ['sand', 'Archivée'],
  read: ['sand', 'Lu'], unread: ['gold', 'Non lu'],
}
export default function StatusBadge({ status }) {
  const [tone, label] = MAP[status] || ['sand', status]
  return <Badge tone={tone}>{label}</Badge>
}

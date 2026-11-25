import { cn } from '../../utils/format'
import { EmptyState } from './StateBlock'

/** Tableau responsive (défilement horizontal sur petit écran). columns: [{ key, header, render?, className }] */
export default function DataTable({ columns, rows, rowKey = 'id', empty, caption, onRowClick, dark = false }) {
  if (!rows.length) return empty || <EmptyState title="Aucune donnée" />
  return (
    <div className="overflow-x-auto border border-sand bg-white">
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className={dark ? 'bg-bark text-cream' : 'bg-sand/70 text-bark'}>
          <tr>{columns.map((c) => <th key={c.key} scope="col" className={cn('px-4 py-3 text-xs font-bold tracking-wide whitespace-nowrap uppercase', c.className)}>{c.header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[rowKey]} onClick={onRowClick ? () => onRowClick(r) : undefined} className={cn('border-t border-sand transition-colors hover:bg-gold/10', onRowClick && 'cursor-pointer')}>
              {columns.map((c) => <td key={c.key} className={cn('px-4 py-3 align-middle', c.className)}>{c.render ? c.render(r) : r[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

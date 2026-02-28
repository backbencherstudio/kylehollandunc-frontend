'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { RowActions, TableAction } from './RowActions'

/* ================= Types ================= */

export interface Column<T> {
  header: React.ReactNode
  accessor: keyof T | ((item: T) => React.ReactNode)
  className?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (item: T) => void

  actions?: TableAction<T>[] // optional
  actionMode?: 'dropdown' | 'inline'

  colBorder?: boolean
  zebra?: boolean

  renderMobileCard?: (args: {
    item: T
    index: number
    onRowClick?: (item: T) => void
    actions?: TableAction<T>[]
  }) => React.ReactNode
  isLoading?: boolean
}

/* ================= Component ================= */

export function ReusableTable<
  T extends { id: string; isStarred?: boolean }
>({
  columns,
  data,
  onRowClick,
  actions,
  actionMode = 'dropdown',
  colBorder = false,
  zebra = true,
  isLoading = false,
}: TableProps<T>) {
  const hasActions = actions && actions.length > 0

  return (
    <div
      className={cn(
        'table-scroll-wrapper',
        'w-full max-w-full min-w-0 rounded-[10px] bg-white',
        'overflow-y-visible overflow-x-auto',
        'touch-pan-x'
      )}
      style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
    >
      <div className="min-w-[768px]">
        <Table>
          <TableHeader className='[&_tr]:border-b-0 rounded-[10px]'>
            <TableRow className="bg-[#FAFAFA]">
              {columns.map((col, idx) => (
                <TableHead
                  key={idx}
                  className={cn(
                    'text-[#687588] text-sm font-bold leading-[160%] tracking-[0.2px] capitalize p-4',
                    col.className,
                    colBorder &&
                      'border-r last:border-r-0 border-border'
                  )}
                >
                  {col.header}
                </TableHead>
              ))}

              {/* Render action header only if actions exist */}
              {hasActions && (
                <TableHead className="text-[#687588] text-xs font-bold leading-[160%] tracking-[0.2px] p-4">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item, rowIdx) => (
              <TableRow
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  'cursor-pointer transition-colors border-b border-[#F1F2F4]',
                  zebra &&
                    (rowIdx % 2 === 0
                      ? 'bg-muted/30'
                      : 'bg-white'),
                  item.isStarred && 'bg-orange-50',
                  'hover:bg-muted/60'
                )}
              >
                {columns.map((col, colIdx) => (
                  <TableCell
                    key={colIdx}
                    className={cn(
                      'text-sm p-4',
                      col.className,
                      colBorder &&
                        'border-r last:border-r-0 border-border'
                    )}
                  >
                    {typeof col.accessor === 'function'
                      ? col.accessor(item)
                      : (item[col.accessor] as React.ReactNode)}
                  </TableCell>
                ))}

                {/* Action Cell (Optional) */}
                {hasActions && (
                  <TableCell
                    className="text-left pl-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <RowActions
                      item={item}
                      actions={actions}
                      mode={actionMode}
                    />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
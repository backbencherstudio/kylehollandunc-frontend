'use client'

import { cn } from '@/lib/utils'

export type StatusType = 'pending' | 'in-progress' | 'completed'

interface StatusBadgeProps {
  status: StatusType | string
  className?: string
}

export function StatusBadge({
  status,
  className,
}: StatusBadgeProps) {
  const normalized = status.toLowerCase()

  const styles: Record<string, string> = {
    pending:
      'bg-[#FFFAE7] text-[#F9C80E]',
    'in progress':
      'bg-[#DFF1FF] text-[#8CB4F6]',
    'in-progress':
      'bg-[#DFF1FF] text-[#8CB4F6]',
    completed:
      'bg-[#E9FAF7] text-[#22CAAD]',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-lg px-4 py-1.5 text-sm font-medium',
        styles[normalized] || 'bg-gray-100 text-gray-600',
        className
      )}
    >
      {formatLabel(status)}
    </span>
  )
}

/* Helper to format label nicely */
function formatLabel(value: string) {
  return value
    .replace('-', ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
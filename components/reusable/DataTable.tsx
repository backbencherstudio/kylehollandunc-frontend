import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export interface ColumnDef<T> {
    header: string
    accessorKey?: keyof T
    render?: (item: T) => React.ReactNode
    className?: string
}

interface DataTableProps<T> {
    data: T[]
    columns: ColumnDef<T>[]
}

export function DataTable<T>({
    data,
    columns,
}: DataTableProps<T>) {
    return (
        <div className="w-full min-w-0 max-w-full rounded-xl border bg-background">

            {/* Scroll container - constrained width so horizontal scrollbar appears */}
            <div className="table-scroll-x w-full min-w-0 overflow-x-auto overflow-y-visible [-webkit-overflow-scrolling:touch]">

                {/* min-w-max keeps table wider than container so scroll appears */}
                <Table className="min-w-max w-full">

                    <TableHeader>
                        <TableRow>
                            {columns.map((col, index) => (
                                <TableHead
                                    key={index}
                                    className={col.className}
                                >
                                    {col.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    No data available.
                                </TableCell>
                            </TableRow>
                        )}

                        {data.map((item, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <TableCell key={colIndex}>
                                        {col.render
                                            ? col.render(item)
                                            : col.accessorKey
                                                ? String(item[col.accessorKey])
                                                : null}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </div>
        </div>
    )
}
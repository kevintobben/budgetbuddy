import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table"

interface Column<T> {
  header: string
  key: keyof T
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

interface BaseTableProps<T> {
  columns: Column<T>[]
  data: T[]
}

export const BaseTable = <T,>({ columns, data }: BaseTableProps<T>) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted font-semibold">
          {columns.map((col) => (
            <TableCell key={String(col.key)}>{col.header}</TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center">
              No data
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, idx) => (
            <TableRow key={idx}>
              {columns.map((col) => (
                <TableCell key={String(col.key)}>
                  {col.render ? col.render(row[col.key], row) : (row[col.key] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

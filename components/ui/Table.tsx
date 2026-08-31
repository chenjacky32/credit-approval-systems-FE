import { flexRender, type Table as ReactTable } from "@tanstack/react-table";

interface TableProps<T> {
  table: ReactTable<T>;
}

export function Table<T>({ table }: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto bg-[var(--color-card)] rounded-lg border border-[var(--color-border)] shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-50 text-[var(--color-heading)] border-b border-[var(--color-border)]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-6 py-3 font-semibold">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="bg-white border-b border-[var(--color-border)] hover:bg-gray-50 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={table.getAllColumns().length}
                className="px-6 py-8 text-center text-gray-500"
              >
                Tidak ada data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Table } from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import type { Submission } from "@/services/api";

const columnHelper = createColumnHelper<Submission>();

const columns = [
  columnHelper.accessor("fullName", {
    header: "Nama Nasabah",
    cell: (info) => <div className="font-medium">{info.getValue()}</div>,
  }),
  columnHelper.accessor("type", {
    header: "Tipe",
    cell: (info) => (
      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("amount", {
    header: "Nominal",
    cell: (info) => `Rp ${info.getValue().toLocaleString("id-ID")}`,
  }),
  columnHelper.accessor("tenor", {
    header: "Tenor",
    cell: (info) => `${info.getValue()} Bln`,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => {
      const val = info.getValue();
      const colors: Record<string, string> = {
        SUBMIT: "bg-blue-100 text-blue-700",
        APPROVE: "bg-green-100 text-green-700",
        REJECT: "bg-red-100 text-red-700",
      };
      return (
        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${colors[val] || "bg-gray-100"}`}>
          {val}
        </span>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Aksi",
    cell: (props) => (
      <Link href={`/submissions/${props.row.original.id}`}>
        <Button variant="outline" size="sm">
          <Eye className="w-4 h-4 mr-2" /> Detail
        </Button>
      </Link>
    ),
  }),
];

interface SubmissionsTableProps {
  submissions: Submission[];
}

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  const table = useReactTable({
    data: submissions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <Table table={table} />
    </div>
  );
}

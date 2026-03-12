"use client";

import { Text } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { TanstackDataTable } from "@/components/reusable-table/TanstackDataTable";
import { documents, Documents } from "@/data/doc-management/documenttype";

const columns: ColumnDef<Documents>[] = [
  {
    accessorKey: "documentType",
    header: "Document Type",
    enableColumnFilter: true,
    cell: (info) => <Text>{String(info.getValue())}</Text>,
  },
  {
    accessorKey: "documentCode",
    header: "Document Code",
    enableColumnFilter: true,
    cell: (info) => <Text>{String(info.getValue())}</Text>,
  },
  {
    accessorKey: "controlNo",
    header: "Control No",
    enableColumnFilter: true,
    cell: (info) => <Text>{String(info.getValue())}</Text>,
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    enableColumnFilter: true,
  },
  {
    accessorKey: "salesForceId",
    header: "Sales Force ID",
    enableColumnFilter: true,
    cell: (info) => <Text>{String(info.getValue())}</Text>,
  },
  { accessorKey: "qtyInUnit", header: "Total Qty", enableColumnFilter: false },
  {
    accessorKey: "remainingQty",
    header: "Remaining",
    enableColumnFilter: false,
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    enableColumnFilter: true,
  },
];

type Props = {
  onSelect?: (doc: Documents) => void;
};

export default function BlockedDocumentsTable({ onSelect }: Props) {
  return (
    <TanstackDataTable
      data={documents}
      columns={columns}
      features={{
        rowSelection: true,
        search: true,
        horizontalScroll: true,
      }}
      table={{
        initialPageSize: 10,
        getRowId: (row) => row.documentCode,
        nowrapCells: true,
      }}
      text={{
        searchPlaceholder: "Search by",
      }}
      events={{
        onRowClick: (doc) => onSelect?.(doc),
      }}
    />
  );
}

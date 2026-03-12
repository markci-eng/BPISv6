import type { LucideIcon } from "lucide-react";

export type TableSize = "sm" | "md" | "lg";

// ✅ add near top of DataTable.tsx (outside component)
import type { FilterFn } from "@tanstack/react-table";

// Your page expects BulkAction<T> where callback gets T[]
export type BulkAction<T> = import("./types").RowAction<T[]>;

// Your page expects multiSelectFilter
export const multiSelectFilter: FilterFn<any> = (
  row,
  columnId,
  filterValue,
) => {
  const selected = (filterValue ?? []) as string[];
  if (!selected.length) return true;
  const cellValue = String(row.getValue(columnId) ?? "");
  return selected.includes(cellValue);
};

export type RowAction<T> = {
  id: string;
  label: string;
  icon?: LucideIcon;
  variant?: "default" | "destructive";
  separator?: boolean;
  hidden?: (row: any) => boolean;
  disabled?: (row: any) => boolean;
  onClick: (row: T) => void;
};

export type DataTableFeatures = {
  sorting?: boolean;
  filtering?: boolean;
  search?: boolean;
  pagination?: boolean;
  columnToggle?: boolean;
  selection?: boolean;
  draggable?: boolean;
  detailSidebar?: boolean;
};

export const DEFAULT_FEATURES: Required<DataTableFeatures> = {
  sorting: true,
  filtering: true,
  search: true,
  pagination: true,
  columnToggle: true,
  selection: true,
  draggable: true,
  detailSidebar: true,
};

export const SIZE_STYLES: Record<
  TableSize,
  { headerPx: number; cellPx: number; fontSize: "sm" | "md" }
> = {
  sm: { headerPx: 10, cellPx: 10, fontSize: "sm" },
  md: { headerPx: 12, cellPx: 12, fontSize: "sm" },
  lg: { headerPx: 14, cellPx: 14, fontSize: "md" },
};

export interface HeaderButton {
  /** Button label text */
  label: string;
  /** Click handler — redirect, open modal, or any callback */
  onClick: () => void;
  /** Optional Lucide icon */
  icon?: LucideIcon;
}

export type DataTableProps<TData> = {
  columns: any[];
  data: TData[];
  title?: string;
  description?: string;
  features?: DataTableFeatures;
  size?: TableSize;

  pageSizeOptions?: number[];
  defaultPageSize?: number;

  renderDetail?: (row: TData) => React.ReactNode;

  onRowClick?: (row: TData) => void;
  headerButton?: HeaderButton;

  rowActions?: RowAction<TData>[];
  bulkActions?: RowAction<TData[]>[];

  onReorder?: (next: TData[]) => void;
  onSelectionChange?: (rows: TData[]) => void;

  emptyState?: React.ReactNode;
  headerActions?: React.ReactNode;

  className?: string;
  getRowId?: (row: TData, index: number) => string;
};

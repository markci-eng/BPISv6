"use client";

import * as React from "react";
import type { Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { IconButton, Table } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import type { TableSize } from "./types";
import { SIZE_STYLES } from "./types";

type Props<TData> = {
  row: Row<TData>;
  size: TableSize;
  draggable?: boolean;
  selectable?: boolean;
  isSelected?: boolean;
  onRowClick?: () => void;
};

export function DraggableRow<TData>({
  row,
  size,
  draggable,
  selectable,
  isSelected,
  onRowClick,
}: Props<TData>) {
  const rowId = String((row.original as any)?.id ?? row.id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: rowId, disabled: !draggable });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };

  const s = SIZE_STYLES[size];

  return (
    <Table.Row
      ref={setNodeRef as any}
      style={style}
      bg={isSelected ? "gray.50" : undefined}
      _hover={{ bg: "gray.50" }}
      cursor={onRowClick ? "pointer" : "default"}
      onClick={onRowClick}
    >
      {draggable && (
        <Table.Cell px={s.cellPx} w="40px">
          <IconButton
            aria-label="Drag row"
            variant="ghost"
            size="xs"
            onClick={(e) => e.stopPropagation()}
            {...attributes}
            {...listeners}
          >
            <GripVertical size={16} />
          </IconButton>
        </Table.Cell>
      )}

      {selectable && (
        <Table.Cell px={s.cellPx} w="44px" onClick={(e) => e.stopPropagation()}>
          <Checkbox.Root
            checked={row.getIsSelected()}
            onCheckedChange={(d) => row.toggleSelected(!!d.checked)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
          </Checkbox.Root>
        </Table.Cell>
      )}

      {row.getVisibleCells().map((cell) => (
        <Table.Cell key={cell.id} px={s.cellPx} fontSize={s.fontSize}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </Table.Cell>
      ))}
    </Table.Row>
  );
}

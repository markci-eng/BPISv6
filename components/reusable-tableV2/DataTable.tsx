"use client";

import * as React from "react";
import type {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  Search,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns3,
  X,
  MoreHorizontal,
} from "lucide-react";

import {
  Box,
  Button,
  Drawer,
  Flex,
  HStack,
  IconButton,
  Input,
  Menu,
  NativeSelect,
  Table,
  Text,
} from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";

import {
  DataTableProps,
  DEFAULT_FEATURES,
  SIZE_STYLES,
  RowAction,
} from "./types";
import { DraggableRow } from "./DraggableRow";
import { ColumnFilterPopover } from "./ColumnFilterPopOver";

export function DataTable<TData>({
  columns: userColumns,
  data: initialData,
  title,
  description,
  features: featuresProp,
  size = "md",
  pageSizeOptions = [10, 20, 30, 50, 100],
  defaultPageSize = 10,
  renderDetail,
  onRowClick,
  rowActions,
  bulkActions,
  onReorder,
  onSelectionChange,
  emptyState,
  headerButton,
  headerActions,
  className = "",
  getRowId, // NEW
}: DataTableProps<TData>) {
  const features = { ...DEFAULT_FEATURES, ...featuresProp };
  const s = SIZE_STYLES[size];

  const [data, setData] = React.useState<TData[]>(initialData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [selectedRow, setSelectedRow] = React.useState<TData | null>(null);

  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  /*
    Resolves a stable row id.
    - If caller provides getRowId, use it
    - Otherwise fall back to the row index
    Note: index fallback works, but a real stable id is better for sorting,
    filtering, selection, and drag-and-drop.
  */
  const resolveRowId = React.useCallback(
    (row: TData, index: number) => {
      return getRowId ? getRowId(row, index) : String(index);
    },
    [getRowId],
  );

  const arrayFilterFn = React.useCallback(
    (row: any, columnId: string, filterValue: string[]) => {
      if (!filterValue || filterValue.length === 0) return true;
      const cellValue = String(row.getValue(columnId) ?? "");
      return filterValue.includes(cellValue);
    },
    [],
  );

  const columns = React.useMemo(() => {
    const enhancedCols = userColumns.map((col) => ({
      ...col,
      filterFn: (col as any).filterFn ?? arrayFilterFn,
    }));

    if (!rowActions || rowActions.length === 0) return enhancedCols;

    const actionsCol: ColumnDef<TData, any> = {
      id: "_actions",
      header: "",
      enableSorting: false,
      enableHiding: false,
      enableColumnFilter: false,
      cell: ({ row }) => {
        const visibleActions = rowActions.filter(
          (a) => !a.hidden || !a.hidden(row.original),
        );

        if (visibleActions.length === 0) return null;

        return (
          <Menu.Root>
            <Menu.Trigger asChild>
              <IconButton
                aria-label="Row actions"
                variant="ghost"
                size="sm"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal size={16} />
              </IconButton>
            </Menu.Trigger>

            <Menu.Positioner>
              <Menu.Content minW="176px">
                {visibleActions.map((action, idx) => (
                  <React.Fragment key={action.id}>
                    {action.separator && idx > 0 && <Menu.Separator />}
                    <Menu.Item
                      value={action.id}
                      disabled={action.disabled?.(row.original)}
                      onClick={(e) => {
                        e.stopPropagation();
                        action.onClick(row.original);
                      }}
                    >
                      <HStack gap={2}>
                        {action.icon && <action.icon size={16} />}
                        <Text
                          color={
                            action.variant === "destructive"
                              ? "red.600"
                              : undefined
                          }
                        >
                          {action.label}
                        </Text>
                      </HStack>
                    </Menu.Item>
                  </React.Fragment>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>
        );
      },
    };

    return [...enhancedCols, actionsCol];
  }, [userColumns, rowActions, arrayFilterFn]);

  const table = useReactTable({
    data,
    columns,

    // NEW: tell TanStack how to identify a row
    getRowId: (row, index) => resolveRowId(row, index),

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    enableSorting: features.sorting,
    enableFilters: features.filtering,
    enableRowSelection: features.selection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(rowSelection) : updater;

      setRowSelection(next);

      if (onSelectionChange) {
        const nextSelectedRows = data.filter((row, index) => {
          const rowId = resolveRowId(row, index);
          return !!next[rowId];
        });

        onSelectionChange(nextSelectedRows);
      }
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: features.sorting ? getSortedRowModel() : undefined,
    getFilteredRowModel:
      features.filtering || features.search ? getFilteredRowModel() : undefined,
    getPaginationRowModel: features.pagination
      ? getPaginationRowModel()
      : undefined,
    initialState: { pagination: { pageSize: defaultPageSize } },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor),
  );

  /*
    Row ids used by dnd-kit sortable list.
    These should match the same ids used by TanStack.
  */
  const rowIds = React.useMemo(
    () => data.map((row, index) => resolveRowId(row, index)),
    [data, resolveRowId],
  );

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = rowIds.indexOf(String(active.id));
      const newIndex = rowIds.indexOf(String(over.id));

      if (oldIndex < 0 || newIndex < 0) return;

      const newData = arrayMove(data, oldIndex, newIndex);

      setData(newData);
      onReorder?.(newData);
    },
    [data, rowIds, onReorder],
  );

  const selectedCount = Object.keys(rowSelection).filter(
    (k) => rowSelection[k],
  ).length;

  /*
    Use resolved row ids instead of parsing indexes.
    This supports real ids like documentCode, employeeId, contractNo, etc.
  */
  const selectedRows = React.useMemo(() => {
    return data.filter((row, index) => {
      const rowId = resolveRowId(row, index);
      return !!rowSelection[rowId];
    });
  }, [data, rowSelection, resolveRowId]);

  return (
    <Box
      w="full"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      className={className}
    >
      {/* Header */}
      <Box p={{ base: 4, md: 5 }} borderBottomWidth="1px">
        <Flex
          direction={{ base: "column", sm: "row" }}
          align={{ sm: "center" }}
          justify="space-between"
          gap={3}
        >
          <Box>
            {title && (
              <Text fontSize="lg" fontWeight="700" color="gray.800">
                {title}
              </Text>
            )}
            {description && (
              <Text fontSize="sm" color="gray.600" mt={0.5}>
                {description}
              </Text>
            )}
          </Box>

          <HStack gap={2} wrap="wrap">
            {features.search && (
              <Box position="relative">
                <Box
                  position="absolute"
                  left="10px"
                  top="50%"
                  transform="translateY(-50%)"
                  color="gray.500"
                >
                  <Search size={16} />
                </Box>

                <Input
                  placeholder="Search..."
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  ps="34px"
                  pe="34px"
                  h="36px"
                  w={{ base: "180px", sm: "240px" }}
                  fontSize="sm"
                />

                {globalFilter && (
                  <IconButton
                    aria-label="Clear search"
                    variant="ghost"
                    size="xs"
                    position="absolute"
                    right="6px"
                    top="50%"
                    transform="translateY(-50%)"
                    onClick={() => setGlobalFilter("")}
                  >
                    <X size={14} />
                  </IconButton>
                )}
              </Box>
            )}

            {features.columnToggle && (
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button variant="outline" size="sm" h="36px">
                    <Columns3 size={16} style={{ marginRight: 6 }} />
                    Columns
                  </Button>
                </Menu.Trigger>

                <Menu.Positioner>
                  <Menu.Content minW="192px">
                    {table
                      .getAllColumns()
                      .filter((c) => c.getCanHide())
                      .map((col) => (
                        <Menu.Item
                          key={col.id}
                          value={col.id}
                          closeOnSelect={false}
                          onClick={() =>
                            col.toggleVisibility(!col.getIsVisible())
                          }
                        >
                          <HStack justify="space-between" w="full">
                            <Text textTransform="capitalize">
                              {col.id
                                .replace(/([A-Z])/g, " $1")
                                .replace(/_/g, " ")}
                            </Text>

                            <Checkbox.Root checked={col.getIsVisible()}>
                              <Checkbox.HiddenInput />
                              <Checkbox.Control />
                            </Checkbox.Root>
                          </HStack>
                        </Menu.Item>
                      ))}
                  </Menu.Content>
                </Menu.Positioner>
              </Menu.Root>
            )}

            {headerButton && (
              <Button
                variant="outline"
                size="sm"
                h="36px"
                onClick={headerButton.onClick}
              >
                {headerButton.icon && (
                  <headerButton.icon size={16} style={{ marginRight: 4 }} />
                )}
                {headerButton.label}
              </Button>
            )}

            {headerActions}
          </HStack>
        </Flex>

        {/* Active filters */}
        {features.filtering && columnFilters.length > 0 && (
          <Box mt={3}>
            <HStack gap={2} wrap="wrap">
              <Text fontSize="xs" color="gray.500" fontWeight="600">
                Filters:
              </Text>

              {columnFilters.map((filter) => {
                const values = filter.value as string[];
                const colName = String(filter.id)
                  .replace(/([A-Z])/g, " $1")
                  .replace(/_/g, " ");

                return values.map((val) => (
                  <HStack
                    key={`${filter.id}-${val}`}
                    px={2}
                    py={0.5}
                    borderRadius="full"
                    bg="blue.50"
                    color="blue.700"
                    fontSize="xs"
                    fontWeight="600"
                    gap={1}
                  >
                    <Text color="gray.600" textTransform="capitalize">
                      {colName}:
                    </Text>
                    <Text>{val}</Text>
                    <IconButton
                      aria-label="Remove filter"
                      variant="ghost"
                      size="2xs"
                      onClick={() => {
                        const next = values.filter((v) => v !== val);
                        const col = table.getColumn(filter.id);
                        col?.setFilterValue(next.length > 0 ? next : undefined);
                      }}
                    >
                      <X size={12} />
                    </IconButton>
                  </HStack>
                ));
              })}

              <Button
                variant="ghost"
                size="sm"
                h="24px"
                fontSize="xs"
                color="gray.600"
                onClick={() => table.resetColumnFilters()}
              >
                Clear all
              </Button>
            </HStack>
          </Box>
        )}

        {/* Selection bar */}
        {features.selection && selectedCount > 0 && (
          <Flex mt={3} align="center" gap={2} wrap="wrap">
            <Text fontSize="sm" color="gray.600" fontWeight="600">
              {selectedCount} row(s) selected
            </Text>

            {bulkActions?.map((action: RowAction<TData[]>) => (
              <Button
                key={action.id}
                size="sm"
                variant={action.variant === "destructive" ? "solid" : "outline"}
                colorPalette={
                  action.variant === "destructive" ? "red" : undefined
                }
                h="28px"
                fontSize="xs"
                onClick={() => {
                  action.onClick(selectedRows);
                  setRowSelection({});
                }}
              >
                {action.icon && (
                  <action.icon size={14} style={{ marginRight: 6 }} />
                )}
                {action.label}
              </Button>
            ))}

            <Button
              variant="ghost"
              size="sm"
              h="24px"
              fontSize="xs"
              ms="auto"
              onClick={() => setRowSelection({})}
            >
              Clear
            </Button>
          </Flex>
        )}
      </Box>

      {/* Table */}
      <Box overflowX="auto">
        <Box minW="max-content">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <Table.Root size="sm" width="max-content" minW="full">
              <Table.Header>
                {table.getHeaderGroups().map((hg) => (
                  <Table.Row key={hg.id} bg="gray.50" borderBottomWidth="1px">
                    {features.draggable && (
                      <Table.ColumnHeader
                        px={s.headerPx}
                        w="32px"
                        minW="32px"
                      />
                    )}

                    {features.selection && (
                      <Table.ColumnHeader px={s.headerPx} w="40px" minW="40px">
                        <Checkbox.Root
                          checked={
                            table.getIsAllRowsSelected()
                              ? true
                              : table.getIsSomeRowsSelected()
                                ? ("indeterminate" as const)
                                : false
                          }
                          onCheckedChange={(v: any) =>
                            table.toggleAllRowsSelected(
                              typeof v === "boolean" ? v : !!v?.checked,
                            )
                          }
                        >
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                        </Checkbox.Root>
                      </Table.ColumnHeader>
                    )}

                    {hg.headers.map((header) => (
                      <Table.ColumnHeader
                        key={header.id}
                        px={s.headerPx}
                        textAlign="left"
                        fontSize="xs"
                        textTransform="uppercase"
                        letterSpacing="wider"
                        color="gray.600"
                        fontWeight="700"
                        cursor={
                          header.column.getCanSort() ? "pointer" : "default"
                        }
                        userSelect={
                          header.column.getCanSort() ? "none" : "auto"
                        }
                        onClick={header.column.getToggleSortingHandler()}
                        _hover={
                          header.column.getCanSort()
                            ? { color: "gray.900" }
                            : undefined
                        }
                        whiteSpace="nowrap"
                      >
                        <HStack gap={1} minW={0}>
                          <Box minW={0} overflow="hidden">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </Box>

                          {header.column.getCanSort() && (
                            <Box flexShrink={0}>
                              {header.column.getIsSorted() === "asc" ? (
                                <ChevronUp size={14} />
                              ) : header.column.getIsSorted() === "desc" ? (
                                <ChevronDown size={14} />
                              ) : (
                                <ChevronsUpDown size={14} opacity={0.4} />
                              )}
                            </Box>
                          )}

                          {features.filtering &&
                            header.column.getCanFilter() &&
                            header.column.id !== "_actions" && (
                              <Box flexShrink={0}>
                                <ColumnFilterPopover
                                  column={header.column}
                                  data={data}
                                />
                              </Box>
                            )}
                        </HStack>
                      </Table.ColumnHeader>
                    ))}
                  </Table.Row>
                ))}
              </Table.Header>

              <Table.Body>
                <SortableContext
                  items={rowIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.length > 0 ? (
                    table
                      .getRowModel()
                      .rows.map((row) => (
                        <DraggableRow
                          key={row.id}
                          row={row}
                          size={size}
                          draggable={features.draggable}
                          selectable={features.selection}
                          isSelected={selectedRow === row.original}
                          onRowClick={
                            onRowClick
                              ? () => onRowClick(row.original)
                              : features.detailSidebar
                                ? () => setSelectedRow(row.original)
                                : undefined
                          }
                        />
                      ))
                  ) : (
                    <Table.Row>
                      <Table.Cell
                        colSpan={
                          columns.length +
                          (features.draggable ? 1 : 0) +
                          (features.selection ? 1 : 0)
                        }
                        textAlign="center"
                        py={12}
                        color="gray.500"
                      >
                        {emptyState || "No results found."}
                      </Table.Cell>
                    </Table.Row>
                  )}
                </SortableContext>
              </Table.Body>
            </Table.Root>
          </DndContext>
        </Box>
      </Box>

      {/* Pagination */}
      {features.pagination && (
        <Flex
          direction={{ base: "column", sm: "row" }}
          align={{ sm: "center" }}
          justify="space-between"
          gap={3}
          p={4}
          borderTopWidth="1px"
        >
          <HStack color="gray.600" fontSize="sm">
            <Text>Rows per page</Text>

            <NativeSelect.Root size="sm">
              <NativeSelect.Field
                value={String(table.getState().pagination.pageSize)}
                onChange={(e) =>
                  table.setPageSize(Number(e.currentTarget.value))
                }
              >
                {pageSizeOptions.map((ps) => (
                  <option key={ps} value={String(ps)}>
                    {ps}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </HStack>

          <HStack>
            <Text fontSize="sm" color="gray.600" me={2}>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount() || 1}
            </Text>

            <IconButton
              aria-label="First page"
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronsLeft size={16} />
            </IconButton>

            <IconButton
              aria-label="Previous page"
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft size={16} />
            </IconButton>

            <IconButton
              aria-label="Next page"
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRight size={16} />
            </IconButton>

            <IconButton
              aria-label="Last page"
              variant="outline"
              size="sm"
              onClick={() =>
                table.setPageIndex(Math.max(table.getPageCount() - 1, 0))
              }
              disabled={!table.getCanNextPage()}
            >
              <ChevronsRight size={16} />
            </IconButton>
          </HStack>
        </Flex>
      )}

      {/* Detail sidebar */}
      {features.detailSidebar && (
        <Drawer.Root
          open={!!selectedRow}
          onOpenChange={(e) => !e.open && setSelectedRow(null)}
          placement="end"
          size="md"
        >
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Row Details</Drawer.Title>
              </Drawer.Header>

              <Drawer.Body>
                <Box mt={2}>
                  {selectedRow && renderDetail ? (
                    renderDetail(selectedRow)
                  ) : selectedRow ? (
                    <Box display="grid" gap={4}>
                      {Object.entries(selectedRow as Record<string, any>).map(
                        ([key, value]) => (
                          <Box key={key}>
                            <Text
                              fontSize="xs"
                              fontWeight="700"
                              color="gray.500"
                              textTransform="uppercase"
                              letterSpacing="wider"
                              mb={1}
                            >
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/_/g, " ")}
                            </Text>
                            <Text fontSize="sm" color="gray.800">
                              {String(value ?? "—")}
                            </Text>
                          </Box>
                        ),
                      )}
                    </Box>
                  ) : null}
                </Box>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      )}
    </Box>
  );
}

export default DataTable;

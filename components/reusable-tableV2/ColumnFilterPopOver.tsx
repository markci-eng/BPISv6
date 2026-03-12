"use client";

import * as React from "react";
import type { Column } from "@tanstack/react-table";
import { Filter, X } from "lucide-react";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Popover,
  Text,
} from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";

interface ColumnFilterPopoverProps<TData> {
  column: Column<TData, unknown>;
  data: TData[];
}

export function ColumnFilterPopover<TData>({
  column,
  data,
}: ColumnFilterPopoverProps<TData>) {
  const [open, setOpen] = React.useState(false);

  const uniqueValues = React.useMemo(() => {
    const values = new Set<string>();
    data.forEach((row) => {
      const val = (row as any)[column.id];
      if (val !== undefined && val !== null) values.add(String(val));
    });
    return Array.from(values).sort();
  }, [data, column.id]);

  const currentFilter = (column.getFilterValue() as string[] | undefined) ?? [];
  const isFiltered = currentFilter.length > 0;

  const toggleValue = (val: string) => {
    const next = currentFilter.includes(val)
      ? currentFilter.filter((v) => v !== val)
      : [...currentFilter, val];
    column.setFilterValue(next.length > 0 ? next : undefined);
  };

  const selectAll = () => column.setFilterValue(undefined);

  const clearFilter = () => {
    column.setFilterValue(undefined);
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(!!e.open)}>
      <Popover.Trigger asChild>
        <IconButton
          aria-label="Column filter"
          variant="ghost"
          size="xs"
          onClick={(e) => e.stopPropagation()}
        >
          {isFiltered ? (
            <X
              size={14}
              onClick={(e) => {
                e.stopPropagation();
                clearFilter();
              }}
            />
          ) : (
            <Filter size={14} />
          )}
        </IconButton>
      </Popover.Trigger>

      <Popover.Positioner>
        <Popover.Content onClick={(e) => e.stopPropagation()}>
          <Popover.Arrow />
          <Popover.Body p={2}>
            <Box maxH="14rem" overflowY="auto" display="grid" gap={1}>
              <HStack
                px={2}
                py={1.5}
                borderRadius="md"
                _hover={{ bg: "gray.50" }}
                cursor="pointer"
                onClick={selectAll}
              >
                <Checkbox.Root checked={!isFiltered}>
                  <Checkbox.HiddenInput />
                  <Checkbox.Control />
                </Checkbox.Root>
                <Text fontSize="sm" fontWeight="600">
                  All
                </Text>
              </HStack>

              {uniqueValues.map((val) => (
                <HStack
                  key={val}
                  px={2}
                  py={1.5}
                  borderRadius="md"
                  _hover={{ bg: "gray.50" }}
                  cursor="pointer"
                  onClick={() => toggleValue(val)}
                >
                  <Checkbox.Root checked={currentFilter.includes(val)}>
                    <Checkbox.HiddenInput />
                    <Checkbox.Control />
                  </Checkbox.Root>
                  <Text fontSize="sm" truncate>
                    {val}
                  </Text>
                </HStack>
              ))}
            </Box>

            <HStack mt={2} pt={2} borderTopWidth="1px" gap={2}>
              <Button
                variant="outline"
                size="sm"
                flex="1"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button size="sm" flex="1" onClick={() => setOpen(false)}>
                Apply
              </Button>
            </HStack>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}

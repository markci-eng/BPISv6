"use client";

import React from "react";
import {
  SimpleGrid,
  Button,
  Flex,
  Separator,
  Strong,
  Text,
  Stack,
  Drawer,
  HStack,
  IconButton,
  Box as CBox,
} from "@chakra-ui/react";
import { X } from "lucide-react";

import {
  Documents,
  DocumentType,
} from "../../../data/doc-management/documenttype";

import { Box, InputFloatingLabel, SelectFloatingLabel } from "st-peter-ui";
import { SearchEmployeeDialog } from "@/components/common/employee-lookup/search-employee-dialog";
import BlockedDocumentsTable from "../blocked-documents/BlockedTable";

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <CBox>
      <Text fontSize="xs" color="fg.muted">
        {label}
      </Text>
      <Text fontSize="sm" fontWeight="semibold">
        {value ?? "-"}
      </Text>
    </CBox>
  );
}

function EvaluatePage() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Documents | null>(null);

  const handleSelect = (doc: Documents) => {
    setSelected(doc);
    setOpen(true);
  };

  return (
    <>
      <Flex
        direction="column"
        px={6}
        py={4}
        gap={4}
        maxW={{ base: "100%", sm: "500px", md: "8xl" }}
        mx="auto"
        minH={{ base: "100vh", md: "100%" }}
        h={{ base: "auto", md: "100%" }}
        overflowY={{ base: "auto", md: "hidden" }}
      >
        <Strong color="gray.700">Evaluate Documents</Strong>

        {/* Form card */}
        <Box bg="white" borderRadius="lg" p={4} boxShadow="sm">
          <Strong color="gray.700">Search Employee</Strong>
          <Separator my={2} />

          <SimpleGrid mt={{ base: 1, lg: 2 }} alignItems="center">
            <Box maxW={{ base: "100%", lg: "50%" }}>
              <SearchEmployeeDialog />
            </Box>
          </SimpleGrid>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            gap={{ base: 2, lg: 6 }}
            alignItems="center"
          >
            <SelectFloatingLabel
              label="Select Document Type"
              collection={DocumentType}
            />

            <InputFloatingLabel
              placeholder="From"
              id="AssignDateFrom"
              label="Assign Date From"
              type="date"
            />

            <InputFloatingLabel
              placeholder="To"
              id="AssignDateTo"
              label="Assign Date To"
              type="date"
            />

            <Button w={{ base: "100%", lg: "auto" }}>Show Document/s</Button>
          </SimpleGrid>
        </Box>

        {/* Table */}
        <Box h="100%" minH="0" display="flex" flexDir="column">
          <Box flex="1" minH="0" overflow="auto">
            <BlockedDocumentsTable onSelect={handleSelect} />
          </Box>
        </Box>
      </Flex>

      {/* Left collapsible sidebar */}
      <Drawer.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        placement="end"
        size={{ base: "full", md: "md" }} // mobile full screen, desktop sidebar width
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <HStack justify="space-between" w="full">
                <Drawer.Title>Document Details</Drawer.Title>
                <Drawer.CloseTrigger asChild>
                  <IconButton aria-label="Close" variant="ghost" size="sm">
                    <X size={16} />
                  </IconButton>
                </Drawer.CloseTrigger>
              </HStack>
            </Drawer.Header>

            <Drawer.Body maxW={"100%"} color={"black"}>
              {selected ? (
                <Stack gap={4}>
                  <Field label="Document Type" value={selected.documentType} />
                  <Field label="Document Code" value={selected.documentCode} />
                  <Field label="Control No" value={selected.controlNo} />
                  <Field label="Assigned To" value={selected.assignedTo} />
                  <Field label="Sales Force ID" value={selected.salesForceId} />

                  <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
                    <Field label="Start" value={selected.documentStart} />
                    <Field label="End" value={selected.documentEnd} />
                    <Field label="Ext" value={selected.documentExt || "-"} />
                    <Field label="Total Qty" value={selected.qtyInUnit} />
                    <Field label="Remaining" value={selected.remainingQty} />
                    <Field label="Expiry Date" value={selected.expiryDate} />
                  </SimpleGrid>

                  {/* actions area (optional) */}
                  <HStack pt={2} gap={2} maxW={"50%"}>
                    <Button
                      w="full"
                      variant="subtle"
                      onClick={() => setOpen(false)}
                    >
                      Close
                    </Button>
                    <Button w="full">Evaluate</Button>
                  </HStack>
                </Stack>
              ) : (
                <Text color="fg.muted" fontSize="sm">
                  Click a row to view details.
                </Text>
              )}
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </>
  );
}

export default EvaluatePage;

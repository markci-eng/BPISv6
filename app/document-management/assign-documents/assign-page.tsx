"use client";

import { SearchEmployeeDialog } from "@/components/common/employee-lookup/search-employee-dialog";
import { Strong, Separator, Button, SimpleGrid, Box } from "@chakra-ui/react";
import { H3, InputFloatingLabel, SelectFloatingLabel } from "st-peter-ui";
import { DocumentType } from "../../../data/doc-management/documenttype";

import DataTableTest from "./AssignedTable";
import DragAndDrop from "@/components/document-uploader/DragAndDrop";
import DataTable from "@/components/reusable-tableV2/DataTable";

export default function AssignDocumentPage() {
  return (
    <Box
      px={{ base: 3, md: 6 }}
      py={{ base: 3, md: 4 }}
      mx="auto"
      // display="flex"
      // flexDir="column"
      gap={4}
      // ✅ key: allow the page to shrink + let children manage scroll
      minH={{ base: "100vh", md: "100%" }}
    >
      <H3 color="gray.700">Assign Documents</H3>

      {/* Form card */}
      <Box p={3} bg="white" boxShadow="sm" borderRadius="lg">
        <Strong color="gray.700">Search Employee</Strong>
        <Separator my={2} />

        {/* ✅ let it be full width on mobile, smaller on desktop */}
        <Box w={{ base: "100%", md: "360px" }} mt={4}>
          <SearchEmployeeDialog />
        </Box>

        <SimpleGrid
          mt={{ base: 2, lg: 3 }}
          columns={{ base: 1, md: 2, lg: 4 }}
          gap={{ base: 2, lg: 6 }}
          alignItems="center"
        >
          <SelectFloatingLabel
            label="Select Document Type"
            collection={DocumentType}
          />
          <InputFloatingLabel placeholder="Quantity" id="" label="Quantity" />
          <InputFloatingLabel
            placeholder="Document Series"
            id=""
            label="Document Series"
            readOnly
          />
          <Button w={{ base: "100%", lg: "auto" }}>Assign Document</Button>
        </SimpleGrid>
      </Box>

      {/* ✅ TABLE REGION (this is the important part) */}
      <Box flex="1" minH="0" display="flex" flexDir="column">
        {/* if your DataTable already has internal overflow-x, keep overflowY here
        for page scrolling */}
        <Box flex="1" minH="0" overflow="auto">
          <DataTableTest />
        </Box>
      </Box>
    </Box>
  );
}

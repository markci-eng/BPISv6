import { Button, Flex, Separator, SimpleGrid, Strong } from "@chakra-ui/react";
import { Box, SelectFloatingLabel, InputFloatingLabel } from "st-peter-ui";
import BlockedDocumentsTable from "../blocked-documents/BlockedTable";
import { DocumentType } from "../../../data/doc-management/documenttype";

import { SearchEmployeeDialog } from "@/components/common/employee-lookup/search-employee-dialog";

const TagUces = () => {
  return (
    <Flex
      direction="column"
      px={6}
      py={4}
      gap={4}
      maxW={{ base: "100%", sm: "500px", md: "1200px" }}
      mx="auto"
      minH={{ base: "100vh", md: "100%" }} // ✅ ensures scroll works on phones
      h={{ base: "auto", md: "100%" }} // ✅ desktop uses parent height
      display="flex"
      flexDir="column"
      overflowY={{ base: "auto", md: "hidden" }} // ✅ page scroll on small screens only
    >
      <Strong color="gray.700">Tag Excess Cancelled Sales Invoice</Strong>
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
          gap={{ base: 1, lg: 6 }}
          alignItems="center"
        >
          <SelectFloatingLabel
            label="Select Document Type"
            collection={DocumentType}
            columnSpan={"3"}
          />
          <InputFloatingLabel
            placeholder="From"
            id="CancelDateFrom"
            label="Cancel Date From"
            type="date"
          />

          <InputFloatingLabel
            placeholder="To"
            id="CancelDateTo"
            label="Cancel Date To"
            type="date"
          />

          <Button w={{ base: "100%", lg: "auto" }}>Show Document/s</Button>
        </SimpleGrid>
      </Box>
      {/* Table card fills remaining height */}
      <Box h="100%" minH="0" display="flex" flexDir="column">
        <Box h="100%" minH="0" display="flex" flexDir="column">
          <BlockedDocumentsTable />
        </Box>
      </Box>
    </Flex>
  );
};

export default TagUces;

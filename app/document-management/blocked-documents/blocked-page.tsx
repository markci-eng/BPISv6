import { SimpleGrid, Button, Flex, Separator, Strong } from "@chakra-ui/react";
import { DocumentType } from "../../../data/doc-management/documenttype";
import {
  Box,
  H3,
  H4,
  InputFloatingLabel,
  SelectFloatingLabel,
} from "st-peter-ui";
import BlockedDocumentsTable from "./BlockedTable";

export default function BlockedPage() {
  return (
    <Flex
      direction="column"
      px={6}
      py={4}
      gap={4}
      // maxW={{ base: "100%", sm: "500px", md: "8xl" }}
      mx="auto"
      // minH={{ base: "100vh", md: "100%" }} // ✅ ensures scroll works on phones
      h={{ base: "auto", md: "100%" }} // ✅ desktop uses parent height
      display="flex"
      flexDir="column"
      overflowY={{ base: "auto", md: "hidden" }} // ✅ page scroll on small screens only
    >
      <H3 color="gray.700">Blocked Documents</H3>

      {/* Form card */}
      <Box bg="white" borderRadius="lg" p={4} boxShadow="sm">
        <H4 color="gray.700">Search Employee</H4>
        <Separator my={2} />
        <SimpleGrid
          mt={{ base: 1, lg: 2 }}
          columns={{ base: 1, md: 2, lg: 4 }}
          gap={{ base: 1, lg: 6 }}
          alignItems="center"
        >
          <SelectFloatingLabel
            label="Select Block Type"
            collection={DocumentType}
          />
          <InputFloatingLabel
            placeholder="Document Start"
            id=""
            label="Document Start"
          />
          <SelectFloatingLabel
            label="Select Document Extension"
            collection={DocumentType}
          />
        </SimpleGrid>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }}
          gap={{ base: 1, lg: 6 }}
          alignItems="center"
        >
          <SelectFloatingLabel
            label="Select Document Type"
            collection={DocumentType}
          />
          <InputFloatingLabel
            placeholder="Document End"
            id=""
            label="Document End"
          />
          <InputFloatingLabel
            placeholder="Document Start"
            id=""
            label="Document Start"
          />
          <Button w={{ base: "100%", lg: "auto" }}>Block Document</Button>
        </SimpleGrid>
      </Box>

      {/* Table card fills remaining height */}
      <Box h="100%" minH="0" display="flex" flexDir="column">
        <Box flex="1" minH="0" overflow="auto">
          <BlockedDocumentsTable />
        </Box>
      </Box>
    </Flex>
  );
}

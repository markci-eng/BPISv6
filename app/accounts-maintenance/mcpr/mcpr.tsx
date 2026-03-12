import {
  Grid,
  GridItem,
  Separator,
  SimpleGrid,
  Strong,
  Table,
  VStack,
} from "@chakra-ui/react";
import {
  Box,
  Breadcrumb,
  PrimaryLgFlexButton,
  PrimarySmButton,
  SelectFloatingLabel,
} from "st-peter-ui";

import { SearchEmployeeDialog } from "@/components/common/employee-lookup/search-employee-dialog";
import { TrxMonth } from "../data/transaction-month";
import MCPRList from "./mcpr-list";

const bcrumb = [
  {
    label: "Home",
  },
  {
    label: "Accounts Maintenance",
  },
];

export default function MCPRPage() {
  return (
    <>
      <Breadcrumb items={bcrumb} />
      <Box
        px={{ base: 3, md: 6 }}
        py={{ base: 4, md: 6 }}
        maxW={{ base: "100%", xl: "8xl" }}
        mx="auto"
      >
        <Grid
          templateRows="auto 1fr auto"
          gap={4}
          // minH={{ base: "auto", md: "90vh" }}
        >
          {/* Header */}
          <GridItem>
            <Strong
              color="gray.700"
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
            >
              Monthly Collection and Performance Report
            </Strong>
          </GridItem>

          <GridItem>
            <Box p={3} bg="white" boxShadow="sm" borderRadius="lg">
              <SimpleGrid columns={1} gap={6} w="100%">
                {/* Search Employee */}
                <Box w="100%">
                  <Strong color="gray.600" fontSize="sm">
                    Search Employee
                  </Strong>
                  <Box w="100%">
                    <SearchEmployeeDialog /> {/* force full width */}
                  </Box>
                </Box>

                {/* Select Transaction Month */}
                <Box w="100%">
                  <SelectFloatingLabel
                    label="Select Transaction Month"
                    collection={TrxMonth}
                    w="100%" // force full width
                  />
                </Box>
              </SimpleGrid>
            </Box>
          </GridItem>

          {/* Table Section */}
          <GridItem
            bg="white"
            p={{ base: 3, md: 5 }}
            boxShadow="sm"
            borderTopRadius="sm"
            borderBottomRadius="lg"
            overflow="hidden"
            display="flex"
            flexDir="column"
            minH={0}
          >
            <Box flex="1" overflow="auto">
              <MCPRList/>
            </Box>
          </GridItem>

          {/* Button Section */}
          <Grid
            templateColumns="repeat(2, auto)" // 2 columns, each sized to its content
            gap={3} // space between the buttons
            justifyContent={{ base: "center", md: "flex-end" }}
            w="100%"
          >
            <GridItem>
              <PrimarySmButton>Next Month Load</PrimarySmButton>
            </GridItem>
            <GridItem>
              <PrimarySmButton>View Incentives</PrimarySmButton>
            </GridItem>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

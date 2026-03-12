"use client";

import { Separator, SimpleGrid, Strong, Tabs } from "@chakra-ui/react";
import RequestsView from "./(views)/RequestsView";
import ApprovalsView from "./(views)/ApprovalsView";
import { canApprove, canRequest, Role } from "@/data/roletypes";
import { Box } from "st-peter-ui";
import { SearchEmployeeDialog } from "@/components/common/employee-lookup/search-employee-dialog";

export default function ReassignPage({ role }: { role: Role }) {
  // If somehow a user without access hits the route:
  if (!canRequest(role)) return null; // or show "Not authorized" UI

  const showApprovals = canApprove(role);

  return (
    <Box
      direction="column"
      px={6}
      py={4}
      gap={4}
      maxW={{ base: "100%", sm: "500px", md: "8xl" }}
      mx="auto"
      minH={{ base: "100vh", md: "100%" }} // ✅ ensures scroll works on phones
      h={{ base: "auto", md: "100%" }} // ✅ desktop uses parent height
      display="flex"
      flexDir="column"
      overflowY={"auto"} // ✅ page scroll on small screens only
    >
      <Strong color="gray.700">Reassign Documents</Strong>
      <Box bg="white" borderRadius="lg" p={4} boxShadow="sm">
        {/* <Strong color="gray.700">Search Employee</Strong> */}
        {/* <Separator my={2} />
        <SimpleGrid mt={{ base: 1, lg: 2 }} alignItems="center">
          <Box maxW={"48%"} mt={2}>
            <SearchEmployeeDialog />
          </Box>
        </SimpleGrid> */}
        <Tabs.Root defaultValue="requests">
          <Tabs.List>
            <Tabs.Trigger value="requests">Reassignment Requests</Tabs.Trigger>
            {showApprovals && (
              <Tabs.Trigger value="approvals">Approvals</Tabs.Trigger>
            )}
          </Tabs.List>

          <Tabs.Content value="requests">
            <RequestsView />
          </Tabs.Content>

          {showApprovals && (
            <Tabs.Content value="approvals">
              <ApprovalsView />
            </Tabs.Content>
          )}
        </Tabs.Root>
      </Box>
    </Box>
  );
}

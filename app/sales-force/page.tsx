'use client'

import { Box, Flex, Separator, Strong } from "@chakra-ui/react"
import { SaleForceDetailList } from "./saleforce-data.type"
import { useState } from "react";
import { H3, PrimarySmButton } from "st-peter-ui";
import { SearchAgentDialog } from "@/components/common/agent-lookup/search-agent-dialog";
import { AgentDetails } from "@/components/saleforce/agent-plan-details";

export const SalesForcePage = () => {
    const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

    return (
        <Box p={3} maxW={"8xl"} mx="auto">
            <H3>Sales Agent Profile</H3>

            <Flex 
                pb={2}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Box color="gray.500">{"Dashboard > Sales Agent Profile"}</Box>

                <SearchAgentDialog onSelectChange={(saleforceId) => setSelectedAgent(saleforceId)}/>
            </Flex>
            <Separator />

            <Box
                p={2}
                mt={2}
            >
                {selectedAgent ? (
                    <AgentDetails agent={{
                        SaleForceID: selectedAgent,
                        FirstName: "Jimwell",
                        MiddleName: "Leonor",
                        LastName: "Ocsio",
                        Position: "Sales Agent 2",
                        BirthDate: new Date("1998-10-19"),
                        ContactNumber: "+63-912-345-6789",
                        Email: "jimwelllo@stpeter.com.ph",
                        HireDate: new Date("2025-02-20"),
                        NBINumber: "NBIN-2025-001",
                        TINNumber: "TIN-2025-001",
                        SSSNumber: "SSS-2025-001",
                        Gender: "MALE"
                    }} />
                ) : (
                    <Box p={4} color="gray.500">No agent selected</Box>
                )}
            </Box>
        </Box>


    )
}

export default SalesForcePage

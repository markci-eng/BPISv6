import { Avatar, Box, Button, ButtonGroup, createListCollection, Flex, Grid, GridItem, IconButton, Pagination, Separator, Span, Strong, Text, VStack } from "@chakra-ui/react";
import { AgentDetail } from "./agent.types";
import { Body, H4, PrimaryLgFlexButton, SelectFloatingLabel, Small } from "st-peter-ui";
import { LuBuilding2, LuChevronLeft, LuChevronRight, LuCopy, LuHouse, LuMail, LuPen, LuPersonStanding, LuPhone, LuReplace, LuSmartphone, LuTrash, LuTrendingUpDown, LuUserPen, LuUserPlus } from "react-icons/lu";
import SaleForceOverlay from "./SaleForceOverlay";
import DataTable from "../reusable-tableV2/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { RowAction } from "../reusable-tableV2/types";
import React from "react";
import { ReplaceIcon } from 'lucide-react'

export function AgentDetails({ agent }: { agent: AgentDetail }) {
    const positionList = createListCollection(
        {
            items: [
                { label: "BRANCH CASHIER", value: "BC"},
                { label: "BRANCH ENCODER", value: "BE"},
                { label: "BRANCH MANAGER", value: "BM"},
                { label: "REGION MANAGER", value: "RM"},
                { label: "SALARIED COLECTOR", value: "SC"},
                { label: "SALES AGENT 1", value: "SA1"},
                { label: "SALES AGENT 2", value: "SA2"},
                { label: "SALES TEAM LEADER", value: "STL"},
                { label: "STAFF", value: "SF"}
            ]
        }
    )

    const superiorList = createListCollection(
        {
            items: [
                { label: "JENNIFER R. CATILLANO", value: "1"},
                { label: "VICTOR D. VARGAS JR.", value: "2"},
                { label: "LIMUEL ANTHONY R. HERNANDEZ", value: "3"},
                { label: "ELSA C. UMALI", value: "4"},
                { label: "REYNALDO K. MORALES JR.", value: "5"},
                { label: "JOVELYN T. DELOS SANTOS", value: "6"},
                { label: "FELIPE GENDRANO", value: "7"},
                { label: "EVANGILINE CONDE", value: "8"},
                { label: "ZENAIDA BASOBAS", value: "9"},
                { label: "ALFREDO LOPEZ", value: "10"},
                { label: "ARLENE LAYA", value: "11"},
                { label: "CATHERINE RAMIREZ", value: "12"},
            ]
        }
    )

    const rowActions = React.useMemo<RowAction<agentData>[]>(
        () => [
         {
            id: "reasign",
            label: "Re-Assign",
            icon: ReplaceIcon,
            onClick: () => {
            }
         }   
        ],
        []
    );
  return (
    <Grid my={2} gap={6} templateColumns={{ base: "1fr", md: `repeat(3, 1fr)` }}>
        <GridItem colSpan={2} padding={6} borderRadius={"md"} boxShadow={"sm"}>
            <Flex width={"full"} justify={"space-between"}>
                <Flex align={"start"} width={"full"}>
                    <Box>
                        <Avatar.Root size={"2xl"}>
                            <Avatar.Fallback name={agent.FirstName + " " + agent.LastName} />
                            {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
                        </Avatar.Root>
                    </Box>

                    <Flex direction={"column"} ml={4} gap={1} w={"full"}>
                        <Flex justify={"space-between"} align={"center"}>
                            <H4>{agent.FirstName} {agent.MiddleName} {agent.LastName}</H4>
                            <Flex gap={1} alignItems={"center"}>
                                <SaleForceOverlay id={agent.SaleForceID + "-edit"} title="Edit" content={
                                    <>
                                    </>
                                }
                                btnMessage={
                                    <>
                                        <LuUserPen />
                                        Edit
                                    </>
                                } />

                                <SaleForceOverlay id={agent.SaleForceID + "-reassign"} title="Re-Assign" content={
                                    <>
                                        <Box>
                                            <Text><Strong>Select New Superior</Strong></Text>
                                        </Box>
                                        <SelectFloatingLabel label="Superior" collection={superiorList} />
                                        <Box p={3} borderRadius={"sm"} bg="green.100">
                                            <Text><Strong>Current Superior:</Strong>LIZA CALDINO</Text>
                                        </Box>
                                    </>
                                } btnMessage={
                                    <>
                                        <LuReplace />
                                        Re-Assign
                                    </>
                                }/>

                                <SaleForceOverlay id={agent.SaleForceID + "-movement"} title="Movement" content={
                                    <>
                                        <Box>
                                            <Text><Strong>Select New Position</Strong> </Text>
                                        </Box>
                                        <SelectFloatingLabel label="Position" collection={positionList} />
                                        <Box p={3} borderRadius={"sm"} bg="green.100">
                                            <Text><Strong>Current Position:</Strong> Sales Agent 2</Text>
                                        </Box>
                                    </>
                                }
                                btnMessage={
                                    <>
                                        <LuTrendingUpDown />
                                        Movement
                                    </>
                                }/>
                            </Flex>
                        </Flex>

                        <Flex gap={3}>
                            <Body>Sales Agent 2</Body>
                            {/* <Badge size={"lg"}>Agent ID: <Strong fontSize={"lg"}>{agent.SaleForceID}</Strong> <LuCopy /></Badge> */}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            <Box width={"full"} mt={8}>
                <Flex justify={"space-between"}>
                    <Strong fontSize={"md"} color={"gray.700"}>Current Sales Agent</Strong>
                </Flex>
                <Separator my={2} />
                <Flex p={2} gap={4} direction={"column"}>
                    <DataTable columns={columns} data={agentItems} title="" description="" size="sm" 
                        features={{
                            search: true,
                            filtering: true,
                            sorting: true,
                            pagination: true,
                            columnToggle: true,
                            selection: false,
                            draggable: false,
                            detailSidebar: false,
                        }}
                        rowActions={rowActions}
                        />
                </Flex>
            </Box>

            <Box width={"full"} mt={8}>
                <Flex justify={"space-between"}>
                    <Strong fontSize={"md"} color={"gray.700"}>Monthly Collection Performance Report</Strong>
                </Flex>
                <Separator my={2} />
                <Flex p={2} gap={4} direction={"column"}>
                    <DataTable columns={agentMcpCol} data={mcprList} title="" description="" size="sm" 
                        features={{
                            search: true,
                            filtering: true,
                            sorting: true,
                            pagination: true,
                            columnToggle: true,
                            selection: false,
                            draggable: false,
                            detailSidebar: false,
                        }}/>
                </Flex>
            </Box>
        </GridItem>

        <GridItem colSpan={1}>
            <Box width={"full"} p={5} boxShadow={"sm"} borderRadius={"md"}>
                <Flex justify={"space-between"}>
                    <Strong fontSize={"md"} color={"gray.800"}>Personal Information</Strong>
                </Flex>
                <Separator my={2} />
                
                <Grid templateColumns={{ base: "repeat(2, 1fr)"}} gap={4}>
                    <InfoItem label="Gender" value={agent.Gender || "MALE"} />
                    <InfoItem label="Civil Status" value={"SINGLE"} />
                    <InfoItem label="Date of Birth" value={agent.BirthDate?.toISOString().split('T')[0] || "1900-01-01"} />
                    <InfoItem label="Place of Birth" value={"LOPEZ, QUEZON"} />
                </Grid>
            </Box>

            <Box width={"full"} my={5} p={5} boxShadow={"sm"} borderRadius={"md"}>
                <Flex justify={"space-between"}>
                    <Strong fontSize={"md"} color={"gray.800"}>Contact Information</Strong>
                </Flex>

                <Separator my={2} />
                <Flex align={"center"} mt={2} gap={3}>
                    <Box><LuMail size={24} color="#747474"/></Box>
                    <Body color={"gray.600"}>testemail@stpeter.com.ph</Body>
                </Flex>
                  
                <Flex align={"center"} mt={3} gap={3}>
                    <Box><LuSmartphone size={24} color="#747474"/></Box>
                    <Body color={"gray.600"}>+63-987-654-3210</Body>
                </Flex>
                 
                <Flex align={"center"} mt={3} mb={4} gap={3}>
                    <Box><LuPhone size={24} color="#747474"/></Box>
                    <Body color={"gray.600"}>800-7000</Body>
                </Flex>
            </Box>
        </GridItem>
    </Grid>
  );
}

const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <VStack gap={1} align="start" minW={0}>
    <Small color="gray.500">{label}</Small>
    <Body>
      <Span fontWeight="regular">{value}</Span>
    </Body>
  </VStack>
);


interface agentData {
    id: string;
    name: string;
}


const agentItems: agentData[] = [
    {
        id: 'HO26SA100001',
        name: "ALVIN M. SEVILLA JR."
    },
    {
        id: 'HO26SA100002',
        name: "MARCUS OWEN GRAE SENSANO"
    },
    {
        id: 'HO26SA100003',
        name: "JANICE M. GARCIA"
    },
    {
        id: 'HO26SA100004',
        name: "GRACIELA E. CLAVERIA"
    },
    {
        id: 'HO26SA100006',
        name: "SOFIA B. JIMENO"
    }
]

const columns: ColumnDef<agentData>[] = [
    {
        accessorKey: "id",
        header: "Agent ID",
        enableColumnFilter: false,
        cell: (info) => <Text>{info.getValue<string>()}</Text>,
    },
    {
        accessorKey: "name",
        header: "Name",
        enableColumnFilter: false,
        cell: (info) => <Text>{info.getValue<string>()}</Text>,
    },
]

interface agentMcpr {
    id: string,
    phName: string,
    planCode: string,
    instAmt: string,
    dueDate: string,
    instNo: string,
    aging: string,
    commQ30: string,
    qnCom: string,
    siAmt: string,
    mobileNo: string
}

const mcprList: agentMcpr[] = [
    {
        id: 'LPA001',
        phName: 'JUAN DELA CRUZ',
        planCode: 'PLN-A',
        instAmt: '1500.25',
        dueDate: '2026-01-15',
        instNo: '1',
        aging: '0',
        commQ30: '100.1234',
        qnCom: '50.5678',
        siAmt: '20000.50',
        mobileNo: ''
    },
    {
        id: 'LPA002',
        phName: 'MARIA SANTOS',
        planCode: 'PLN-A2',
        instAmt: '1999.25',
        dueDate: '2026-12-01',
        instNo: '3',
        aging: '1',
        commQ30: '304.1234',
        qnCom: '49.5678',
        siAmt: '21000.50',
        mobileNo: ''
    },
    {
        id: 'LPA003',
        phName: 'PEDRO PASCAL',
        planCode: 'PLN-B1',
        instAmt: '8023.25',
        dueDate: '2026-03-29',
        instNo: '5',
        aging: '3',
        commQ30: '320.0123',
        qnCom: '35.5678',
        siAmt: '1290.50',
        mobileNo: ''
    },
    {
        id: 'LPA004',
        phName: 'ANNA GARCIA',
        planCode: 'PLN-B2',
        instAmt: '2050.25',
        dueDate: '2026-03-22',
        instNo: '7',
        aging: '10',
        commQ30: '45.1234',
        qnCom: '41.5678',
        siAmt: '2400.50',
        mobileNo: ''
    },
    {
        id: 'LPA005',
        phName: 'LUIS MENDOZA',
        planCode: 'PLN-C1',
        instAmt: '2010.25',
        dueDate: '2026-04-01',
        instNo: '9',
        aging: '0',
        commQ30: '50.1234',
        qnCom: '10.5678',
        siAmt: '2030.50',
        mobileNo: ''
    },
    {
        id: 'LPA006',
        phName: 'CARLA BAUTISTA',
        planCode: 'PLN-C2',
        instAmt: '1500.25',
        dueDate: '2026-15-1',
        instNo: '11',
        aging: '3',
        commQ30: '100.1234',
        qnCom: '50.5678',
        siAmt: '20000.50',
        mobileNo: ''
    },
    {
        id: 'LPA007',
        phName: 'MIGUEL RAMOS',
        planCode: 'PLN-D1',
        instAmt: '1500.25',
        dueDate: '2026-15-1',
        instNo: '14',
        aging: '3',
        commQ30: '100.1234',
        qnCom: '50.5678',
        siAmt: '20000.50',
        mobileNo: ''
    },
    {
        id: 'LPA008',
        phName: 'SOFIA LOPEZ',
        planCode: 'PLN-D2',
        instAmt: '1500.25',
        dueDate: '2026-15-1',
        instNo: '17',
        aging: '8',
        commQ30: '100.1234',
        qnCom: '50.5678',
        siAmt: '20000.50',
        mobileNo: ''
    },
    {
        id: 'LPA009',
        phName: 'JOSE VILLANUEVA',
        planCode: 'PLN-E1',
        instAmt: '1500.25',
        dueDate: '2026-15-1',
        instNo: '20',
        aging: '10',
        commQ30: '100.1234',
        qnCom: '50.5678',
        siAmt: '20000.50',
        mobileNo: ''
    },
    {
        id: 'LPA010',
        phName: 'ANGELA CRUZ',
        planCode: 'PLN-E2',
        instAmt: '1500.25',
        dueDate: '2026-15-1',
        instNo: '22',
        aging: '8',
        commQ30: '100.1234',
        qnCom: '50.5678',
        siAmt: '20000.50',
        mobileNo: ''
    },
    {
        id: 'LPA011',
        phName: 'RAMON TORRES',
        planCode: 'PLN-F1',
        instAmt: '1500.25',
        dueDate: '2026-15-1',
        instNo: '24',
        aging: '12',
        commQ30: '100.1234',
        qnCom: '50.5678',
        siAmt: '20000.50',
        mobileNo: ''
    },
    {
        id: 'LPA012',
        phName: 'ISABEL FLORES',
        planCode: 'PLN-F2',
        instAmt: '1500.25',
        dueDate: '2026-15-1',
        instNo: '26',
        aging: '3',
        commQ30: '100.1234',
        qnCom: '50.5678',
        siAmt: '20000.50',
        mobileNo: ''
    },
    {
        id: 'LPA013',
        phName: 'DANIEL AQUINO',
        planCode: 'PLN-G1',
        instAmt: '1500.25',
        dueDate: '2026-15-1',
        instNo: '28',
        aging: '23',
        commQ30: '100.1234',
        qnCom: '50.5678',
        siAmt: '20000.50',
        mobileNo: ''
    },
    {
        id: 'LPA014',
        phName: 'PATRICIA LIM',
        planCode: 'PLN-G2',
        instAmt: '1500.25',
        dueDate: '2026-15-1',
        instNo: '30',
        aging: '0',
        commQ30: '100.1234',
        qnCom: '50.5678',
        siAmt: '20000.50',
        mobileNo: ''
    },
    {
        id: 'LPA015',
        phName: 'KEVIN TAN',
        planCode: 'PLN-H1',
        instAmt: '1500.25',
        dueDate: '2026-15-1',
        instNo: '31',
        aging: '1',
        commQ30: '100.1234',
        qnCom: '50.5678',
        siAmt: '20000.50',
        mobileNo: ''
    },
    {
        id: 'LPA016',
        phName: 'GRACE NAVARRO',
        planCode: 'PLN-H2',
        instAmt: '1500.25',
        dueDate: '2026-15-1',
        instNo: '32',
        aging: '2',
        commQ30: '100.1234',
        qnCom: '50.5678',
        siAmt: '20000.50',
        mobileNo: ''
    },
    {
        id: 'LPA017',
        phName: 'MARK HERRERA',
        planCode: 'PLN-I1',
        instAmt: '1500.25',
        dueDate: '2026-15-1',
        instNo: '35',
        aging: '1',
        commQ30: '100.1234',
        qnCom: '50.5678',
        siAmt: '20000.50',
        mobileNo: ''
    },
    {
        id: 'LPA018',
        phName: 'THERESA ONG',
        planCode: 'PLN-I2',
        instAmt: '1500.25',
        dueDate: '2026-15-1',
        instNo: '10',
        aging: '10',
        commQ30: '100.1234',
        qnCom: '50.5678',
        siAmt: '20000.50',
        mobileNo: ''
    },
    {
        id: 'LPA0019',
        phName: 'PAUL CASTILO',
        planCode: 'PLN-J1',
        instAmt: '1500.25',
        dueDate: '2026-15-1',
        instNo: '8',
        aging: '6',
        commQ30: '100.1234',
        qnCom: '50.5678',
        siAmt: '20000.50',
        mobileNo: ''
    },
    {
        id: 'LPA020',
        phName: 'CATHERINE SY',
        planCode: 'PLN-J2',
        instAmt: '1500.25',
        dueDate: '2026-15-1',
        instNo: '9',
        aging: '8',
        commQ30: '100.1234',
        qnCom: '50.5678',
        siAmt: '20000.50',
        mobileNo: ''
    }
]

const agentMcpCol: ColumnDef<agentMcpr>[] = [
    {
        accessorKey: "id",
        header: "LPA Number",
        enableColumnFilter: false,
        cell: (info) => <Text>{info.getValue<string>()}</Text>,
    },
    {
        accessorKey: "phName",
        header: "Planholder Name",
        enableColumnFilter: false,
        cell: (info) => <Text>{info.getValue<string>()}</Text>,
    },
    {
        accessorKey: "planCode",
        header: "Plan Code",
        enableColumnFilter: false,
        cell: (info) => <Text>{info.getValue<string>()}</Text>,
    },
    {
        accessorKey: "instAmt",
        header: "Installment Amount",
        enableColumnFilter: false,
        cell: (info) => <Text>{info.getValue<string>()}</Text>,
    },
    {
        accessorKey: "dueDate",
        header: "Due Date",
        enableColumnFilter: false,
        cell: (info) => <Text>{info.getValue<string>()}</Text>,
    },
    {
        accessorKey: "instNo",
        header: "Installment No",
        enableColumnFilter: false,
        cell: (info) => <Text>{info.getValue<string>()}</Text>,
    },
    {
        accessorKey: "aging",
        header: "Aging",
        enableColumnFilter: false,
        cell: (info) => <Text>{info.getValue<string>()}</Text>,
    },
    {
        accessorKey: "commQ30",
        header: "Comm Q30",
        enableColumnFilter: false,
        cell: (info) => <Text>{info.getValue<string>()}</Text>,
    },
    {
        accessorKey: "qnCom",
        header: "QN Comm",
        enableColumnFilter: false,
        cell: (info) => <Text>{info.getValue<string>()}</Text>,
    },
    {
        accessorKey: "siAmt",
        header: "SI Amount",
        enableColumnFilter: false,
        cell: (info) => <Text>{info.getValue<string>()}</Text>,
    },
    {
        accessorKey: "mobileNo",
        header: "Mobile No",
        enableColumnFilter: false,
        cell: (info) => <Text>{info.getValue<string>()}</Text>,
    }
]

"use client";
import {
  Avatar,
  Box,
  Button,
  Carousel,
  EmptyState,
  Flex,
  Grid,
  GridItem,
  IconButton,
  IconButtonProps,
  Input,
  InputGroup,
  Separator,
  Steps,
  Strong,
  Table,
  Tabs,
  VStack,
} from "@chakra-ui/react";
import { Body, H4, PrimaryLgFlexButton, Small } from "st-peter-ui";
import {
  LuArrowLeft,
  LuArrowRight,
  LuBuilding2,
  LuCopy,
  LuFile,
  LuFileText,
  LuHouse,
  LuMail,
  LuPencil,
  LuPhone,
  LuSearch,
  LuSmartphone,
  LuTrash,
} from "react-icons/lu";
import InfoItem from "../../common/info-item/info-item";
import { OSPBadge as Badge, OSPBadge } from "../../common/badge/badge";
import { PlanholdersProps } from "./planholders.types";
import { EditPlanDetails } from "./dialogs/edit-plan-details";
import { toast } from "sonner";
import { TanstackDataTable } from "@/components/reusable-table/TanstackDataTable";
import { planholderLookup } from "@/app/plan-management/data/planholder-lookup";
import { ColumnDef } from "@tanstack/react-table";
import { PlanholderLookup } from "@/components/common/planholder-lookup/planholder-lookup.type";
import { forwardRef } from "react";
import DataTableTest from "@/app/document-management/assign-documents/AssignedTable";
import { ProgressCard } from "./cards/pending-request-card";
import { AddAddressCard, AddressCard } from "./cards/address-card";
import { FiFileText, FiUsers } from "react-icons/fi";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { RiHistoryLine } from "react-icons/ri";
import { GrRotateLeft } from "react-icons/gr";
import { StatementOfAccount } from "./ph-statement-of-account";

const ActionButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function ActionButton(props, ref) {
    return (
      <IconButton
        {...props}
        ref={ref}
        size="xs"
        variant="outline"
        rounded="full"
        position="absolute"
        zIndex="1"
        bg="bg"
      />
    )
  },
)

export function PhPlanDetails({ props }: { props: PlanholdersProps }) {
  const columns: ColumnDef<PlanholderLookup>[] = [
    {
      accessorKey: "lpaNumber",
      header: "LPA Number",
      enableColumnFilter: true,
      cell: (info) => <Small>{String(info.getValue())}</Small>,
    },
    {
      accessorKey: "planDescription",
      header: "Plan Description",
      enableColumnFilter: true,
      cell: (info) => <Small>{String(info.getValue())}</Small>,
    },
    {
      accessorKey: "mode",
      header: "Mode",
      enableColumnFilter: true,
      cell: (info) => <Small>{String(info.getValue())}</Small>,
    },
    {
      accessorKey: "effectivityDate",
      header: "Effectivity Date",
      enableColumnFilter: true,
      cell: (info) => (
        <Small>{new Date(String(info.getValue())).toLocaleDateString()}</Small>
      ),
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      enableColumnFilter: true,
      cell: (info) => (
        <Small>{new Date(String(info.getValue())).toLocaleDateString()}</Small>
      ),
    },
    {
      accessorKey: "installmentNo",
      header: "Installment No.",
      enableColumnFilter: true,
      cell: (info) => <Small>{String(info.getValue())}</Small>,
    },
    {
      accessorKey: "balance",
      header: "Balance",
      enableColumnFilter: true,
      cell: (info) => <Small>{String(info.getValue())}</Small>,
    },

    {
      accessorKey: "accountStatus",
      header: "Account Status",
      enableColumnFilter: true,
      cell: (info) => (
        <Small color={String(info.getValue()) == "LAPSED" ? "red" : "gray.700"}>
          {String(info.getValue())}
        </Small>
      ),
    },
    {
      accessorKey: "terminationStatus",
      header: "Termination Status",
      enableColumnFilter: true,
      cell: (info) => (
        <Small
          color={
            String(info.getValue()) == "NOT YET TERMINATED" ? "gray.700" : "red"
          }
        >
          {String(info.getValue())}
        </Small>
      ),
    },
  ];

  return (
    <Grid gap={6} templateColumns={{ base: "1fr", lg: `repeat(3, 1fr)` }}>
      <GridItem colSpan={2}>

        <Box width={"full"} p={5} my={5} boxShadow={"sm"} borderRadius={"md"}>
          <Flex align={"start"}>
            <Avatar.Root size={"2xl"}>
              <Avatar.Fallback
                name={
                  props.planholderInfo.firstName +
                  " " +
                  props.planholderInfo.lastName
                }
              />
            </Avatar.Root>
            <Flex direction={"column"} ml={4} gap={1} w={"full"}>
              <H4>
                {props.planholderInfo.firstName +
                  " " +
                  props.planholderInfo.lastName}
              </H4>
              <Box>
                <Badge size={"sm"} type={"info"} m={1}>
                  {props.planDetails?.isInsured ? "INSURABLE" : "NOT INSURABLE"}
                </Badge>
              </Box>
            </Flex>
          </Flex>
          {/* <Flex justify={"space-between"}>
            <Strong fontSize={"md"} color={"gray.700"}>
              Personal Information
            </Strong>
          </Flex> */}
          <Separator my={2} />
          <Grid
            py={2}
            templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
            gap={4}
          >
            <InfoItem
              label="Nationality"
              value={props.planholderInfo.nationality ?? "N/A"}
            />
            <InfoItem
              label="Naturalization Date"
              value={
                props.planholderInfo.naturalizationDate?.toLocaleDateString() ??
                "N/A"
              }
            />
            <InfoItem
              label="Date of Birth"
              value={
                props.planholderInfo.dateOfBirth?.toLocaleDateString() ?? "N/A"
              }
            />
            <InfoItem
              label="Place of Birth"
              value={props.planholderInfo.placeOfBirth ?? "N/A"}
            />
            <InfoItem
              label="Age"
              value={computeAge(props.planholderInfo.dateOfBirth) ?? "N/A"}
            />
            <InfoItem
              label="Gender"
              value={props.planholderInfo.gender ?? "N/A"}
            />
            <InfoItem
              label="Civil Status"
              value={props.planholderInfo.civilStatus ?? "N/A"}
            />
            <InfoItem
              label="Height"
              value={props.planholderInfo.height ?? "N/A"}
            />
            <InfoItem
              label="Weight"
              value={props.planholderInfo.weight + " KG"}
            />
          </Grid>
        </Box>

        <Box
          width={"full"}
          mt={5}
          p={5}
          boxShadow={"sm"}
          w={"full"}
          borderRadius={"md"}
        >
          <Flex justify={"space-between"}>
            <Strong fontSize={"md"} color={"gray.700"}>
              Address Information
            </Strong>
          </Flex>
          <Separator my={2} />
          <Flex direction={"column"} gap={4}>
            {props.planholderAddress.filter((address) => address.addressType == "RESIDENCE").map((address, idx) => (
              <AddressCard 
              key={idx}
              id={idx.toString()} 
              addressType={address.addressType} 
              addressNo={address.addressNo ?? ""} 
              street={address.street ?? ""} 
              barangay={!address.barangay ? "" : "BARANGAY " + address.barangay} 
              district={!address.district ? "" : "DISTRICT " + address.district} 
              city={address.city} 
              province={address.province} 
              zipCode={address.zipCode?.toString() ?? ""} 
              isMailAddress/>
            ))}
            
            <AddressCard id={"2"} addressType={"OFFICE"} addressNo={"524"} street={"REPARO STREET."} barangay={"161"} district={"DISTRICT II"} city={"CALOOCAN CITY"} province={"METRO MANILA"} zipCode={"1400"}/>
            {/*<AddAddressCard/>*/}
          </Flex>
        </Box>

        {/* <Box width={"full"} my={5} p={5} boxShadow={"sm"} borderRadius={"md"}>
          <Strong fontSize={"md"} color={"gray.700"}>
              List of Plans 
          </Strong>
          <Separator mb={5}/>
          <TanstackDataTable data={planholderLookup.filter((plan) => plan.firstName == "ROGELIO")} columns={columns} />
        </Box>

        <Box width={"full"} my={5} p={5} boxShadow={"sm"} borderRadius={"md"}>
          <Flex justify={"space-between"}>
            <Strong fontSize={"md"} color={"gray.700"}>
              Plan Details
            </Strong>
          </Flex>
          <Separator my={2} color={"var(--chakra-colors-primary)"} />
          <Grid
            py={2}
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={4}
          >
            <InfoItem label="Plan" value={props.planDetails?.planDescription ?? "N/A"} />
            <InfoItem label="Mode" value={props.planDetails?.mode ?? "N/A"} />
            <InfoItem label="Term" value={(props.planDetails?.term ?? 0) + " YEARS"} />
            <InfoItem label="Plan Class" value={props.planDetails?.planClass ?? "N/A"} />
            <InfoItem label="Account Class" value={props.planDetails?.accountClass ?? "N/A"} />
            <InfoItem label="Plan Code" value={props.planDetails?.planCode ?? "N/A"} />
            <InfoItem label="Contract Price" value={ "₱ " + (props.planDetails?.contractPrice ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2, })}/>
            <InfoItem
              label="Installment Amount"
              value={
                "₱ " +
                (props.planDetails?.installmentAmount ?? 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }
            />
            <InfoItem
              label="Total Amount Payable"
              value={
                "₱ " +
                (props.planDetails?.totalAmountPayable ?? 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }
            />
            <InfoItem
              label="Effectivity Date"
              value={props.planDetails?.effectivityDate.toLocaleDateString() ?? "N/A"}
            />
            <InfoItem
              label="New Effectivity Date"
              value={props.planDetails?.newEffectivityDate?.toLocaleDateString() ?? "N/A"}
            />
            <InfoItem label="Branch" value={props.planDetails?.branch ?? "N/A"} />
            <InfoItem label="COFP Number" value={props.planDetails?.cfpNumber ?? "N/A"} />
            <InfoItem
              label="COFP Date"
              value={props.planDetails?.cfpDate?.toLocaleDateString() ?? "N/A"}
            />
            <InfoItem
              label="Service Only"
              value={props.planDetails?.isServiceOnly ? "YES" : "NO"}
            />
            <InfoItem
              label="Sales Agent"
              value={props.planDetails?.salesAgent1 ?? "N/A"}
            />
            <InfoItem
              label="Sales Agent 2"
              value={props.planDetails?.salesAgent2 ?? "N/A"}
            />
          </Grid>
        </Box>

        <Box width={"full"} p={5} my={3} boxShadow={"sm"} borderRadius={"md"}>
          <Flex justify={"space-between"}>
            <Strong fontSize={"md"} color={"gray.700"}>
              Beneficiaries
            </Strong>
          </Flex>
          <Separator my={2} />
          <Box py={5}>
            <Strong color={"gray.600"}>Principal</Strong>
            <Box
              my={3}
              p={3}
              borderRadius={"md"}
              bg={"gray.50"}
              boxShadow={"sm"}
            >
              <Grid
                p={2}
                templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
                gap={4}
              >
                <InfoItem label="Name" value={"JUAN DELA CRUZ"} />
                <InfoItem label="Relationship" value={"SPOUSE"} />
                <InfoItem label="Date of Birth" value={"1900-01-01"} />
                <InfoItem label="Contact Number" value={"+63-912-345-6789"} />
              </Grid>
            </Box>
            <Box
              my={3}
              p={3}
              borderRadius={"md"}
              bg={"gray.50"}
              boxShadow={"sm"}
            >
              <Grid
                p={2}
                templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
                gap={4}
              >
                <InfoItem label="Name" value={"JUAN DELA CRUZ"} />
                <InfoItem label="Relationship" value={"SPOUSE"} />
                <InfoItem label="Date of Birth" value={"1900-01-01"} />
                <InfoItem label="Contact Number" value={"+63-912-345-6789"} />
              </Grid>
            </Box>
          </Box>

          <Box py={3}>
            <Strong color={"gray.600"}>Contingent</Strong>
            <Box
              my={2}
              p={3}
              borderRadius={"md"}
              bg={"gray.50"}
              boxShadow={"sm"}
            >
              <Grid
                p={2}
                templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
                gap={4}
              >
                <InfoItem label="Name" value={"JUAN DELA CRUZ"} />
                <InfoItem label="Relationship" value={"SPOUSE"} />
                <InfoItem label="Date of Birth" value={"1900-01-01"} />
                <InfoItem label="Contact Number" value={"+63-912-345-6789"} />
              </Grid>
            </Box>
          </Box>
        </Box> */}
      </GridItem>
      <GridItem colSpan={1}>
        <Box my={5} p={5} boxShadow={"sm"} borderRadius={"md"}>
          <Strong fontSize={"md"} color={"gray.700"}>
            Pending Request
          </Strong>
          <Separator my={2} />
          <Carousel.Root slideCount={2} maxW="full" mx="auto" gap="4">
            <Carousel.Control justifyContent="center" gap="4" width="full">
              <Carousel.PrevTrigger asChild>
                <IconButton size="xs" variant="outline">
                  <LuArrowLeft />
                </IconButton>
              </Carousel.PrevTrigger>

              <Carousel.ItemGroup width="full">
                <Carousel.Item index={0}>
                  <ProgressCard current={3} total={7} title={"Reinstatement Application"} description={"Payment received. Waiting for approval."} transactionId="RI-202-6311" onClick={() => window.location.href = "/transaction/RI-202-6311"}/>
                </Carousel.Item>
                <Carousel.Item index={1}>
                  <ProgressCard current={2} total={3} title={"Transfer of Rights Application"} description={"Payment received. Waiting for approval."} transactionId="TF-202-6309" onClick={() => window.location.href = "/transaction/TF-202-6311"}/>
                </Carousel.Item>
              </Carousel.ItemGroup>

              <Carousel.NextTrigger asChild>
                <IconButton size="xs" variant="outline">
                  <LuArrowRight />
                </IconButton>
              </Carousel.NextTrigger>
            </Carousel.Control>

            <Carousel.Indicators
                  transition="width 0.2s ease-in-out"
                  transformOrigin="center"
                  opacity="0.5"
                  boxSize="2"
                  _current={{
                    width: "10",
                    bg: "colorPalette.subtle",
                    opacity: 1,
                  }}
                />
          </Carousel.Root>
        </Box>
        <Box width={"full"} my={5} p={5} boxShadow={"sm"} borderRadius={"md"}>
          <Flex justify={"space-between"}>
            <Strong fontSize={"md"} color={"gray.700"}>
              Contact Information
            </Strong>
            {/* <Button size={"sm"} variant={"outline"}>
              <LuPencil /> EDIT
            </Button> */}
          </Flex>
          <Separator my={2} />
          <Flex align={"center"} mt={2} gap={3}>
            <Box>
              <LuMail size={24} color="#747474" />
            </Box>
            {props.planholderContact.filter(
              (contact) => contact.type == "Email",
            ).length > 0 ? (
              props.planholderContact
                .filter((contact) => contact.type == "Email")
                .map((cc, idx) => (
                  <Body key={idx} color={"gray.600"}>
                    {cc.value}
                  </Body>
                ))
            ) : (
              <Body color={"gray.600"}>Not Set</Body>
            )}
          </Flex>
          <Flex align={"center"} mt={2} gap={3}>
            <Box>
              <LuSmartphone size={24} color="#747474" />
            </Box>
            {props.planholderContact.filter(
              (contact) => contact.type == "MobileNo",
            ).length > 0 ? (
              props.planholderContact
                .filter((contact) => contact.type == "MobileNo")
                .map((cc, idx) => (
                  <Body key={idx} color={"gray.600"}>
                    {cc.value}
                  </Body>
                ))
            ) : (
              <Body color={"gray.600"}>Not Set</Body>
            )}
          </Flex>
          <Flex align={"center"} mt={2} gap={3}>
            <Box>
              <LuPhone size={24} color="#747474" />
            </Box>
            {props.planholderContact.filter(
              (contact) => contact.type == "LandlineNo",
            ).length > 0 ? (
              props.planholderContact
                .filter((contact) => contact.type == "LandlineNo")
                .map((cc, idx) => (
                  <Body key={idx} color={"gray.600"}>
                    {cc.value}
                  </Body>
                ))
            ) : (
              <Body color={"gray.600"}>Not Set</Body>
            )}
          </Flex>
        </Box>

        <Box width={"full"} mt={5} p={5} boxShadow={"sm"} borderRadius={"md"}>
          <Flex justify={"space-between"}>
            <Strong fontSize={"md"} color={"gray.700"}>
              Employment Information
            </Strong>
            {/* <Button size={"sm"} variant={"outline"}>
              <LuPencil /> EDIT
            </Button> */}
          </Flex>
          <Separator my={2} />
          <Flex direction={"column"} align={"start"} mt={5} gap={5}>
            <InfoItem
              label="Employer"
              value={props.planholderInfo.employerName ?? "N/A"}
            />
            <InfoItem
              label="Tax Identification Number"
              value={props.planholderInfo.tin ?? "N/A"}
            />
            <InfoItem
              label="SSS/GSIS Number"
              value={props.planholderInfo.securityNo ?? "N/A"}
            />
            <InfoItem
              label="Source of Fund If Not Employed"
              value={props.planholderInfo.sourceOfFund ?? "N/A"}
            />
          </Flex>
        </Box>
      </GridItem>

      <GridItem colSpan={3}>
        <Box width={"full"} p={5} boxShadow={"sm"} borderRadius={"md"}>
          <Strong fontSize={"md"} color={"gray.700"}>
            List of Plans (2)
          </Strong>
          <Separator mt={2} mb={5} />
          <Tabs.Root
            variant="line"
            defaultValue="L25053168I"
            orientation={"vertical"}
          >
            <Grid templateColumns={"repeat(4, 1fr)"} width={"full"}>
              <GridItem colSpan={1}>
                <InputGroup startElement={<LuSearch />}>
                  <Input placeholder="LPA Number" />
                </InputGroup>
                <Separator my={3} />
                <Tabs.List width={"full"}>
                  <Tabs.Trigger value="L25053168I" _selected={{bg: "var(--chakra-colors-primary-disabled)/20", borderInlineEndColor: "var(--chakra-colors-primary)"}}>
                    <LuFileText /> L25053168I
                    <OSPBadge type="success">ACTIVE</OSPBadge>
                    <OSPBadge type="success">NOT YET TERMINATED</OSPBadge>
                  </Tabs.Trigger>
                  <Tabs.Trigger value="L25053169I">
                    <LuFileText /> L25053169I
                    <OSPBadge type="danger">LAPSED</OSPBadge>
                    <OSPBadge type="success">NOT YET TERMINATED</OSPBadge>
                  </Tabs.Trigger>
                </Tabs.List>
              </GridItem>
              <GridItem colSpan={3}>
                <Tabs.Content value="L25053168I" width={"full"}>
                  <Tabs.Root defaultValue="plan-details" variant={"outline"}>
                    <Tabs.List>
                      <Tabs.Trigger value="plan-details">
                        <FiFileText />
                        Plan Details
                      </Tabs.Trigger>
                      <Tabs.Trigger value="beneficiaries">
                        <FiUsers />
                        Beneficiaries
                      </Tabs.Trigger>
                      <Tabs.Trigger value="soa">
                        <LiaFileInvoiceDollarSolid  />
                        Statement of Account
                      </Tabs.Trigger>
                      <Tabs.Trigger value="tf-history">
                        <RiHistoryLine />
                        Transfer History
                      </Tabs.Trigger>
                      <Tabs.Trigger value="rop-history">
                        <GrRotateLeft />
                        ROP History
                      </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="plan-details">
                      <Box
                        width={"full"}
                        // my={5}
                        // p={5}
                        // boxShadow={"sm"}
                        // borderRadius={"md"}
                      >
                        <Grid
                          py={2}
                          templateColumns={{
                            base: "1fr",
                            md: "repeat(3, 1fr)",
                          }}
                          gap={4}
                        >
                          <InfoItem label="LPA Number" value={"L25053168I"} />
                          <InfoItem label="Account Status" value={"ACTIVE"} />
                          <InfoItem
                            label="Termimation Status"
                            value={"NOT YET TERMINATED"}
                          />
                          <InfoItem
                            label="Plan"
                            value={props.planDetails?.planDescription ?? "N/A"}
                          />
                          <InfoItem
                            label="Mode"
                            value={props.planDetails?.mode ?? "N/A"}
                          />
                          <InfoItem
                            label="Term"
                            value={(props.planDetails?.term ?? 0) + " YEARS"}
                          />
                          <InfoItem
                            label="Plan Class"
                            value={props.planDetails?.planClass ?? "N/A"}
                          />
                          <InfoItem
                            label="Account Class"
                            value={props.planDetails?.accountClass ?? "N/A"}
                          />
                          <InfoItem
                            label="Plan Code"
                            value={props.planDetails?.planCode ?? "N/A"}
                          />
                          <InfoItem
                            label="Contract Price"
                            value={
                              "₱ " +
                              (
                                props.planDetails?.contractPrice ?? 0
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            }
                          />
                          <InfoItem
                            label="Installment Amount"
                            value={
                              "₱ " +
                              (
                                props.planDetails?.installmentAmount ?? 0
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            }
                          />
                          <InfoItem
                            label="Total Amount Payable"
                            value={
                              "₱ " +
                              (
                                props.planDetails?.totalAmountPayable ?? 0
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            }
                          />
                          <InfoItem
                            label="Effectivity Date"
                            value={
                              props.planDetails?.effectivityDate.toLocaleDateString() ??
                              "N/A"
                            }
                          />
                          <InfoItem
                            label="New Effectivity Date"
                            value={
                              props.planDetails?.newEffectivityDate?.toLocaleDateString() ??
                              "N/A"
                            }
                          />
                          <InfoItem
                            label="Branch"
                            value={props.planDetails?.branch ?? "N/A"}
                          />
                          <InfoItem
                            label="COFP Number"
                            value={props.planDetails?.cfpNumber ?? "N/A"}
                          />
                          <InfoItem
                            label="COFP Date"
                            value={
                              props.planDetails?.cfpDate?.toLocaleDateString() ??
                              "N/A"
                            }
                          />
                          <InfoItem
                            label="Service Only"
                            value={
                              props.planDetails?.isServiceOnly ? "YES" : "NO"
                            }
                          />
                          <InfoItem
                            label="Sales Agent"
                            value={props.planDetails?.salesAgent1 ?? "N/A"}
                          />
                          <InfoItem
                            label="Sales Agent 2"
                            value={props.planDetails?.salesAgent2 ?? "N/A"}
                          />
                        </Grid>
                      </Box>
                    </Tabs.Content>
                    <Tabs.Content value="beneficiaries">
                      <Box
                        width={"full"}
                        // p={5}
                        // my={3}
                        // boxShadow={"sm"}
                        // borderRadius={"md"}
                      >
                        {/* <Flex justify={"space-between"}>
                      <Strong fontSize={"md"} color={"gray.700"}>
                        Beneficiaries
                      </Strong>
                    </Flex>
                    <Separator my={2} /> */}
                        <Box py={5}>
                          <Strong color={"gray.600"}>Principal</Strong>
                          <Flex
                          align={"center"}
                          gap={4}
                            my={3}
                            p={3}
                            borderRadius={"md"}
                            bg={"gray.50"}
                            boxShadow={"sm"}
                          >
                            <Avatar.Root>
                              <Avatar.Fallback name="Juan Dela Cruz" />
                              {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
                            </Avatar.Root>
                            <Grid
                              p={2}
                              width={"full"}
                              templateColumns={{
                                base: "1fr",
                                md: "repeat(4, 1fr)",
                              }}
                              gap={4}
                            >
                              <InfoItem label="Name" value={"JUAN DELA CRUZ"} />
                              <InfoItem label="Relationship" value={"SPOUSE"} />
                              <InfoItem
                                label="Date of Birth"
                                value={"1900-01-01"}
                              />
                              <InfoItem
                                label="Contact Number"
                                value={"+63-912-345-6789"}
                              />
                            </Grid>
                          </Flex>
                          <Flex
                            align={"center"}
                            gap={4}
                            my={3}
                            p={3}
                            borderRadius={"md"}
                            bg={"gray.50"}
                            boxShadow={"sm"}
                          >
                            <Avatar.Root>
                              <Avatar.Fallback name="Juan Dela Cruz" />
                              {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
                            </Avatar.Root>
                            <Grid
                              p={2}
                              width={"full"}
                              templateColumns={{
                                base: "1fr",
                                md: "repeat(4, 1fr)",
                              }}
                              gap={4}
                            >
                              <InfoItem label="Name" value={"JUAN DELA CRUZ"} />
                              <InfoItem label="Relationship" value={"SPOUSE"} />
                              <InfoItem
                                label="Date of Birth"
                                value={"1900-01-01"}
                              />
                              <InfoItem
                                label="Contact Number"
                                value={"+63-912-345-6789"}
                              />
                            </Grid>
                          </Flex>
                        </Box>

                        <Box py={3}>
                          <Strong color={"gray.600"}>Contingent</Strong>
                          <Flex
                            align={"center"}
                            gap={4}
                            my={3}
                            p={3}
                            borderRadius={"md"}
                            bg={"gray.50"}
                            boxShadow={"sm"}
                          >
                            <Avatar.Root>
                              <Avatar.Fallback name="Juan Dela Cruz" />
                              {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
                            </Avatar.Root>
                            <Grid
                              p={2}
                              width={"full"}
                              templateColumns={{
                                base: "1fr",
                                md: "repeat(4, 1fr)",
                              }}
                              gap={4}
                            >
                              <InfoItem label="Name" value={"JUAN DELA CRUZ"} />
                              <InfoItem label="Relationship" value={"SPOUSE"} />
                              <InfoItem
                                label="Date of Birth"
                                value={"1900-01-01"}
                              />
                              <InfoItem
                                label="Contact Number"
                                value={"+63-912-345-6789"}
                              />
                            </Grid>
                          </Flex>
                        </Box>
                      </Box>
                    </Tabs.Content>
                    <Tabs.Content value="soa">
                      <StatementOfAccount/>
                    </Tabs.Content>
                  </Tabs.Root>
                </Tabs.Content>
                <Tabs.Content value="L25053169I">
                  <Tabs.Root defaultValue="plan-details" variant={"outline"}>
                    <Tabs.List>
                      <Tabs.Trigger value="plan-details">
                        <LuFile />
                        Plan Details
                      </Tabs.Trigger>
                      <Tabs.Trigger value="beneficiaries">
                        <LuFile />
                        Beneficiaries
                      </Tabs.Trigger>
                      <Tabs.Trigger value="soa">
                        <LuFile />
                        Statement of Account
                      </Tabs.Trigger>
                      <Tabs.Trigger value="tf-history">
                        <LuFile />
                        Transfer History
                      </Tabs.Trigger>
                      <Tabs.Trigger value="rop-history">
                        <LuFile />
                        ROP History
                      </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="plan-details">
                      <Box
                        width={"full"}
                        // my={5}
                        // p={5}
                        // boxShadow={"sm"}
                        // borderRadius={"md"}
                      >
                        <Grid
                          py={2}
                          templateColumns={{
                            base: "1fr",
                            md: "repeat(3, 1fr)",
                          }}
                          gap={4}
                        >
                          <InfoItem label="LPA Number" value={"L25053169I"} />
                          <InfoItem
                            color="red.500"
                            label="Account Status"
                            value={"LAPSED"}
                          />
                          <InfoItem
                            label="Termimation Status"
                            value={"NOT YET TERMINATED"}
                          />
                          <InfoItem
                            label="Plan"
                            value={props.planDetails?.planDescription ?? "N/A"}
                          />
                          <InfoItem
                            label="Mode"
                            value={props.planDetails?.mode ?? "N/A"}
                          />
                          <InfoItem
                            label="Term"
                            value={(props.planDetails?.term ?? 0) + " YEARS"}
                          />
                          <InfoItem
                            label="Plan Class"
                            value={props.planDetails?.planClass ?? "N/A"}
                          />
                          <InfoItem
                            label="Account Class"
                            value={props.planDetails?.accountClass ?? "N/A"}
                          />
                          <InfoItem
                            label="Plan Code"
                            value={props.planDetails?.planCode ?? "N/A"}
                          />
                          <InfoItem
                            label="Contract Price"
                            value={
                              "₱ " +
                              (
                                props.planDetails?.contractPrice ?? 0
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            }
                          />
                          <InfoItem
                            label="Installment Amount"
                            value={
                              "₱ " +
                              (
                                props.planDetails?.installmentAmount ?? 0
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            }
                          />
                          <InfoItem
                            label="Total Amount Payable"
                            value={
                              "₱ " +
                              (
                                props.planDetails?.totalAmountPayable ?? 0
                              ).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })
                            }
                          />
                          <InfoItem
                            label="Effectivity Date"
                            value={
                              props.planDetails?.effectivityDate.toLocaleDateString() ??
                              "N/A"
                            }
                          />
                          <InfoItem
                            label="New Effectivity Date"
                            value={
                              props.planDetails?.newEffectivityDate?.toLocaleDateString() ??
                              "N/A"
                            }
                          />
                          <InfoItem
                            label="Branch"
                            value={props.planDetails?.branch ?? "N/A"}
                          />
                          <InfoItem
                            label="COFP Number"
                            value={props.planDetails?.cfpNumber ?? "N/A"}
                          />
                          <InfoItem
                            label="COFP Date"
                            value={
                              props.planDetails?.cfpDate?.toLocaleDateString() ??
                              "N/A"
                            }
                          />
                          <InfoItem
                            label="Service Only"
                            value={
                              props.planDetails?.isServiceOnly ? "YES" : "NO"
                            }
                          />
                          <InfoItem
                            label="Sales Agent"
                            value={props.planDetails?.salesAgent1 ?? "N/A"}
                          />
                          <InfoItem
                            label="Sales Agent 2"
                            value={props.planDetails?.salesAgent2 ?? "N/A"}
                          />
                        </Grid>
                      </Box>
                    </Tabs.Content>
                    <Tabs.Content value="beneficiaries">
                      <Box
                        width={"full"}
                        // p={5}
                        // my={3}
                        // boxShadow={"sm"}
                        // borderRadius={"md"}
                      >
                        {/* <Flex justify={"space-between"}>
                      <Strong fontSize={"md"} color={"gray.700"}>
                        Beneficiaries
                      </Strong>
                    </Flex>
                    <Separator my={2} /> */}
                        <Box py={5}>
                          <Strong color={"gray.600"}>Principal</Strong>
                          <Box
                            my={3}
                            p={3}
                            borderRadius={"md"}
                            bg={"gray.50"}
                            boxShadow={"sm"}
                          >
                            <Grid
                              p={2}
                              templateColumns={{
                                base: "1fr",
                                md: "repeat(4, 1fr)",
                              }}
                              gap={4}
                            >
                              <InfoItem label="Name" value={"JUAN DELA CRUZ"} />
                              <InfoItem label="Relationship" value={"SPOUSE"} />
                              <InfoItem
                                label="Date of Birth"
                                value={"1900-01-01"}
                              />
                              <InfoItem
                                label="Contact Number"
                                value={"+63-912-345-6789"}
                              />
                            </Grid>
                          </Box>
                          <Box
                            my={3}
                            p={3}
                            borderRadius={"md"}
                            bg={"gray.50"}
                            boxShadow={"sm"}
                          >
                            <Grid
                              p={2}
                              templateColumns={{
                                base: "1fr",
                                md: "repeat(4, 1fr)",
                              }}
                              gap={4}
                            >
                              <InfoItem label="Name" value={"JUAN DELA CRUZ"} />
                              <InfoItem label="Relationship" value={"SPOUSE"} />
                              <InfoItem
                                label="Date of Birth"
                                value={"1900-01-01"}
                              />
                              <InfoItem
                                label="Contact Number"
                                value={"+63-912-345-6789"}
                              />
                            </Grid>
                          </Box>
                        </Box>

                        <Box py={3}>
                          <Strong color={"gray.600"}>Contingent</Strong>
                          <Box
                            my={2}
                            p={3}
                            borderRadius={"md"}
                            bg={"gray.50"}
                            boxShadow={"sm"}
                          >
                            <Grid
                              p={2}
                              templateColumns={{
                                base: "1fr",
                                md: "repeat(4, 1fr)",
                              }}
                              gap={4}
                            >
                              <InfoItem label="Name" value={"JUAN DELA CRUZ"} />
                              <InfoItem label="Relationship" value={"SPOUSE"} />
                              <InfoItem
                                label="Date of Birth"
                                value={"1900-01-01"}
                              />
                              <InfoItem
                                label="Contact Number"
                                value={"+63-912-345-6789"}
                              />
                            </Grid>
                          </Box>
                        </Box>
                      </Box>
                    </Tabs.Content>
                    <Tabs.Content value="tasks">
                      Manage your tasks for freelancers
                    </Tabs.Content>
                  </Tabs.Root>
                </Tabs.Content>
              </GridItem>
            </Grid>
            {/* <Tabs.List>
              <Tabs.Trigger value="members">Members</Tabs.Trigger>
              <Tabs.Trigger value="projects">Projects</Tabs.Trigger>
              <Tabs.Trigger value="tasks">Settings</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="members">
              Manage your team members and their roles here.
            </Tabs.Content>

            <Tabs.Content value="projects">
              Manage your projects and their status here.
            </Tabs.Content>

            <Tabs.Content value="tasks">
              Manage your tasks and their progress here.
            </Tabs.Content> */}
          </Tabs.Root>
        </Box>
      </GridItem>
    </Grid>
  );
}

export function computeAge(date: Date | null): string {
  if (date === null) return "";
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();

  const today = new Date();
  const birth = new Date(year, month - 1, day);

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  // borrow days from previous month
  if (days < 0) {
    months--;

    const prevMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
    ).getDate();

    days += prevMonth;
  }

  // borrow months from previous year
  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years} YRS ${months} MOS ${days} DAYS`;
}

"use client";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Popover,
  Portal,
  Separator,
  Strong,
  VStack,
} from "@chakra-ui/react";
import { PhPlanDetails } from "./ph-plan-details";
import { PlanholdersProps } from "./planholders.types";
import { Body, DeleteButton, DynamicButton, EditButton, H3 } from "st-peter-ui";
import {
  LuLogOut,
  LuPencil,
  LuSettings,
  LuTrash,
  LuUser,
} from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbTransfer } from "react-icons/tb";
import { GiCash } from "react-icons/gi";
import { IoSkullSharp } from "react-icons/io5";

export function PlanholderPage({ props }: { props: PlanholdersProps }) {
  return (
    <Box mx="auto">
      <Box>
        <Flex justify={"space-between"} align={"center"}>
          <Box textAlign="start" mt={4}>
            <H3>Planholder Information</H3>
            <Body mt={2}>Clear Access to Every Planholder Detail.</Body>
          </Box>
          <Flex gap={3}>
            <Popover.Root positioning={{ placement: "bottom-start" }}>
              <Popover.Trigger asChild>
                <IconButton bg={"white"} color={"gray.700"}>
                  <RxHamburgerMenu />
                </IconButton>
              </Popover.Trigger>
              <Portal>
                <Popover.Positioner>
                  <Popover.Content>
                    <Popover.Arrow />
                    <Popover.Body>
                      <VStack
                        align="stretch"
                        gap={1}
                        fontFamily="'Open Sans'"
                        font-size="normal"
                        fontWeight="semibold"
                      >
                        <Flex
                          align="center"
                          gap={1}
                          p={1} // decreased padding
                          borderRadius="md"
                          _hover={{ bg: "gray.100", cursor: "pointer" }}
                          onClick={() =>
                            (window.location.href =
                              "/plan-management/reinstatement")
                          }
                        >
                          <LuUser size={14} />
                          <Body>Reinstatement</Body>
                        </Flex>
                        <Flex
                          align="center"
                          gap={1}
                          p={1} // decreased padding
                          borderRadius="md"
                          _hover={{ bg: "gray.100", cursor: "pointer" }}
                          onClick={() =>
                            (window.location.href =
                              "/plan-management/change-of-mode")
                          }
                        >
                          <LuSettings size={14} />
                          <Body>Change of Mode</Body>
                        </Flex>
                        <Flex
                          align="center"
                          gap={1}
                          p={1} // decreased padding
                          borderRadius="md"
                          _hover={{ bg: "gray.100", cursor: "pointer" }}
                          onClick={() =>
                            (window.location.href =
                              "/plan-management/transfer-of-rights")
                          }
                        >
                          <TbTransfer size={14} />
                          <Body>Transfer of Rights</Body>
                        </Flex>
                        <Flex
                          align="center"
                          gap={1}
                          p={1} // decreased padding
                          borderRadius="md"
                          _hover={{ bg: "gray.100", cursor: "pointer" }}
                          onClick={() =>
                            (window.location.href = "/plan-management/rop")
                          }
                        >
                          <GiCash size={14} color="red.700" />
                          <Body>Return of Premium</Body>
                        </Flex>
                        <Flex
                          align="center"
                          gap={1}
                          p={1} // decreased padding
                          borderRadius="md"
                          _hover={{ bg: "gray.100", cursor: "pointer" }}
                          onClick={() => (window.location.href = "/plan-management/claims")}
                        >
                          <IoSkullSharp />
                          <Body>Claim Application</Body>
                        </Flex>
                        <Flex
                          align="center"
                          gap={1}
                          p={1} // decreased padding
                          borderRadius="md"
                          _hover={{ bg: "gray.100", cursor: "pointer" }}
                          onClick={() => {
                            localStorage.removeItem("user");
                            window.location.reload();
                          }}
                        >
                          <LuLogOut size={14} color="red.700" />
                          <Body>Cash Surrendered Value</Body>
                        </Flex>
                      </VStack>
                    </Popover.Body>
                  </Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover.Root>

            <Button>
              <LuPencil /> Edit
            </Button>
            <Button bg={"red.500"} color={"white"}>
              <LuTrash /> Delete
            </Button>
          </Flex>
        </Flex>

        <PhPlanDetails props={props} />
      </Box>
    </Box>
  );
}

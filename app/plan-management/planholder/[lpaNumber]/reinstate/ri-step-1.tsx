import { Box, Flex, Heading, HStack, SimpleGrid, Stack, VStack } from "@chakra-ui/react";
import { Body, Checkbox, Small } from "st-peter-ui";
import { PhLapsedPlan, RIPlanItemProps } from "./reinstatement.types";
import { useState } from "react";

const Input = ({ label, value }: { label: string; value: string }) => {
  return (
    <Box width={"full"}>
      <Small>{label}</Small>
      <Box border={"none"} py={0} borderRadius={"sm"}>
        <Body fontWeight={"semibold"}>{value}</Body>
      </Box>
    </Box>
  );
};

function formatMoney(num: number) {
  return (
    "₱ " +
    num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export default function RIStep1({plan} : {plan : PhLapsedPlan}) {
  const [isCheckedFullyPaid, setIsCheckedFullyPaid] = useState(false);
  
  const reinstatementFee = 500;
  const reinstatementPayment = isCheckedFullyPaid
    ? Number(plan.newBalance ?? 0)
    : Number(plan.newInstAmt ?? 0);
  const totalAmountDue = reinstatementFee + reinstatementPayment;

  return (
    <Box>
      <Stack direction={{ base: "column", md: "row" }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} width="full">
          {/* Current Plan */}
          <Box px={3} py={3}>
            <Heading size="lg" textAlign="center">
              Current Plan
            </Heading>

            <Flex my={3} gap={2}>
              <Input label="LPA Number" value={plan.lpaNo} />
              <Input label="Account Status" value={plan.status} />
            </Flex>

            <Flex my={3} gap={2}>
              <Input
                label="Total Amount Payable"
                value={formatMoney(parseFloat(plan.totalAmtPayable))}
              />
              <Input
                label="Total Amount Paid"
                value={formatMoney(parseFloat(plan.totalAmtPaid))}
              />
            </Flex>

            <Flex my={3} gap={2}>
              <Input
                label="Balance"
                value={formatMoney(parseFloat(plan.balance))}
              />
              <Input
                label="Installment Amount"
                value={formatMoney(parseFloat(plan.instAmt))}
              />
            </Flex>

            <Checkbox
              checked={isCheckedFullyPaid}
              onCheckedChange={() => setIsCheckedFullyPaid((prev) => !prev)}
              label=" Reinstate Fully Paid"
              display={{ base: "block", mdDown: "none" }}
            />
          </Box>

          {/* After Reinstatement */}
          <Box p={3} bg="gray.50" border="1px solid #ddd" borderRadius="md">
            <Heading size="lg" textAlign="center">
              After Reinstatement
            </Heading>

            <Flex my={3} gap={2}>
              <Input label="LPA Number" value={plan.newLpaNo} />
              <Input label="Account Status" value={plan.newStatus} />
            </Flex>

            <Flex my={3} gap={2}>
              <Input
                label="Total Amount Payable"
                value={formatMoney(parseFloat(plan.newTotalAmtPayable))}
              />
              <Input
                label="Total Amount Paid"
                value={formatMoney(parseFloat(plan.newTotalAmtPaid))}
              />
            </Flex>

            <Flex my={3} gap={2}>
              <Input
                label="Balance"
                value={formatMoney(parseFloat(plan.newBalance))}
              />
              <Input
                label="Installment Amount"
                value={formatMoney(parseFloat(plan.newInstAmt))}
              />
            </Flex>
          </Box>
        </SimpleGrid>
      </Stack>

      {/* Mobile fully paid toggle */}
      <Checkbox
        checked={isCheckedFullyPaid}
        onCheckedChange={() => setIsCheckedFullyPaid((prev) => !prev)}
        label=" Reinstate Fully Paid"
        display={{ base: "none", mdDown: "block" }}
        mt={3}
      />

      {/* Payment Summary */}
      <Box
        p={5}
        mt={5}
        width={{ base: "md", mdDown: "full" }}
        mx="auto"
        borderWidth="1px"
        borderColor="var(--chakra-colors-primary)"
        borderRadius="lg"
        bg={"var(--chakra-colors-primary-disabled)/50"}
      >
        <Body>Applying for reinstatement requires:</Body>

        <HStack justifyContent={"space-between"} mt={3} width={"full"}>
          <VStack align={"start"} mr={3}>
            <Body>Reinstatement Fee: </Body>
            <Body>Reinstatement Payment: </Body>
            <Body fontWeight="bold">Total Amount Due: </Body>
          </VStack>
          <VStack align={"end"}>
            <Body>
              <strong>₱ {reinstatementFee.toLocaleString()}</strong>
            </Body>
            <Body>
              <strong>₱ {reinstatementPayment.toLocaleString()}</strong>
            </Body>
            <Body>
              <strong>₱ {totalAmountDue.toLocaleString()}</strong>
            </Body>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
}

import { VStack } from "@chakra-ui/react";
import { Small, Body } from "st-peter-ui";

export default function InfoItem({
  label,
  value,
  color,
}: {
  label: string;
  value: string | null | undefined;
  color?: string;
}) {
  return (
    <VStack gap={1} align="start" minW={0}>
      <Small color="gray.500">{label}</Small>
      <Body color={color ?? "gray.700"}>
        {value}
      </Body>
    </VStack>
  );
}
import { OSPBadge } from "@/components/common/badge/badge";
import { Box, Flex, Strong, Text } from "@chakra-ui/react";
import { Body, Small } from "st-peter-ui";

interface ProgressCardProps {
  current: number;
  total: number;
  title: string;
  description: string;
  transactionId: string
  onClick?: () => void;
}

export function ProgressCard ({
  current,
  total,
  title,
  description,
  transactionId,
  onClick
}: ProgressCardProps) {
  const percentage = (current / total) * 100;
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Flex
      align="center"
      gap={2}
      borderRadius={"lg"}
      borderWidth="1px"
      bg="bg"
      py={2}
      shadow="sm"
      cursor={"pointer"}
      _hover={{bg: "gray.50"}}
      onClick={() => onClick?.()}
    >
      <Box position="relative" h="80px" w="80px" flexShrink={0}>
        <Box
          as="svg"
        //   viewBox="0 0 80 80"
          h="100%"
          w="100%"
          transform="rotate(-90deg)"
        >
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="var(--chakra-colors-primary-disabled)"
            strokeWidth="7"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="var(--chakra-colors-primary)"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </Box>

        <Flex
          position="absolute"
          inset={0}
          align="center"
          justify="center"
        >
          <Text fontSize="sm" fontWeight="semibold">
            {current} / {total}
          </Text>
        </Flex>
      </Box>

      <Box minW={0}>
        <Strong color={"gray.700"}>
          {title}
        </Strong>
        <Body color="gray.500">
          {description}
        </Body>
        <OSPBadge type="info"># {transactionId}</OSPBadge>
      </Box>
    </Flex>
  );
}

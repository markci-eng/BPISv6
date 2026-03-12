"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  ArrowRight,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Strong,
  Text,
} from "@chakra-ui/react";
import {
  INITIAL_TRANSFERS,
  PendingTransfer,
} from "../../../../data/doc-management/documenttype";

const statusConfig: Record<
  PendingTransfer["status"],
  { label: string; icon: React.ElementType }
> = {
  pending: { label: "Pending", icon: Clock },
  approved: { label: "Approved", icon: CheckCircle2 },
  rejected: { label: "Rejected", icon: XCircle },
};

export default function Approvals() {
  const [transfers, setTransfers] =
    useState<PendingTransfer[]>(INITIAL_TRANSFERS);
  const [filter, setFilter] = useState<"all" | PendingTransfer["status"]>(
    "all",
  );

  const filteredTransfers = useMemo(() => {
    return filter === "all"
      ? transfers
      : transfers.filter((t) => t.status === filter);
  }, [transfers, filter]);

  const pendingCount = useMemo(
    () => transfers.filter((t) => t.status === "pending").length,
    [transfers],
  );

  const handleApprove = (id: string) => {
    setTransfers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "approved" } : t)),
    );
    toast.success("Transfer approved successfully");
  };

  const handleReject = (id: string) => {
    setTransfers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "rejected" } : t)),
    );
    toast.error("Transfer rejected");
  };

  const handleApproveAll = () => {
    setTransfers((prev) =>
      prev.map((t) =>
        t.status === "pending" ? { ...t, status: "approved" } : t,
      ),
    );
    toast.success("All pending transfers approved");
  };

  const handleRejectAll = () => {
    setTransfers((prev) =>
      prev.map((t) =>
        t.status === "pending" ? { ...t, status: "rejected" } : t,
      ),
    );
    toast.error("All pending transfers rejected");
  };

  const filterOptions: { key: typeof filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
  ];

  return (
    <Flex
      minH="100vh"
      justify="center"
      px={{ base: 4, md: 6 }}
      py={{ base: 8, md: 12 }}
      color="black"
    >
      <Box w="full" maxW="3xl">
        {/* Header */}
        <Flex
          mb="6"
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "stretch", md: "flex-start" }}
          gap={{ base: 3, md: 4 }}
        >
          <Box>
            <Strong
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="bold"
              letterSpacing="tight"
            >
              Transfer Approvals
            </Strong>

            <Text mt="1" color="fg.muted" fontSize={{ base: "sm", md: "md" }}>
              Review and approve pending document transfers.
              {pendingCount > 0 ? (
                <Box
                  as="span"
                  ml="2"
                  px="2.5"
                  py="0.5"
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="semibold"
                  bg="bg.muted"
                >
                  {pendingCount} pending
                </Box>
              ) : null}
            </Text>
          </Box>

          {/* Put any header buttons here; they’ll stack on mobile */}
          {/* <Button alignSelf={{ base: "flex-start", md: "flex-end" }} size="sm" variant="subtle">Back</Button> */}
        </Flex>

        {/* Filters */}
        <Flex direction={"row"} justify={"space-between"}>
          <Flex wrap="wrap" gap="1.5" mb="6">
            {filterOptions.map((opt) => {
              const active = filter === opt.key;
              return (
                <Button
                  key={opt.key}
                  size="sm"
                  variant={active ? "solid" : "subtle"}
                  onClick={() => setFilter(opt.key)}
                >
                  {opt.label}
                </Button>
              );
            })}
          </Flex>

          {/* You can also add bulk action buttons here, which would operate on selected rows in the table */}
          {pendingCount > 0 && (
            <Flex wrap="wrap" gap="1.5" mb="6">
              <Button
                variant={"solid"}
                size="sm"
                onClick={() => handleApproveAll()}
              >
                Approve All
              </Button>
              <Button
                variant={"subtle"}
                bgColor="fg.error"
                color={"White"}
                onClick={() => handleRejectAll()}
                size="sm"
              >
                Reject All
              </Button>
            </Flex>
          )}
        </Flex>

        {/* Transfer List */}
        {filteredTransfers.length === 0 ? (
          <Box
            borderWidth="1px"
            borderStyle="dashed"
            borderRadius="xl"
            bg="bg.muted"
            p={{ base: 8, md: 12 }}
            textAlign="center"
          >
            <Box display="grid" placeItems="center" opacity={0.5}>
              <Eye size={40} />
            </Box>
            <Text mt="3" fontSize="sm" color="fg.muted">
              No {filter === "all" ? "" : filter} transfers found
            </Text>
          </Box>
        ) : (
          <Flex direction="column" gap="3">
            {filteredTransfers.map((transfer) => {
              const cfg = statusConfig[transfer.status];
              const StatusIcon = cfg.icon;

              return (
                <Box
                  key={transfer.id}
                  borderWidth="1px"
                  borderRadius="xl"
                  p={{ base: 4, md: 5 }}
                  bg="bg"
                >
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align={{ base: "stretch", md: "flex-start" }}
                    gap={{ base: 3, md: 4 }}
                    minW="0"
                  >
                    {/* Left */}
                    <HStack align="flex-start" gap="3" minW="0" flex="1">
                      <Box
                        mt="0.5"
                        h="9"
                        w="9"
                        borderRadius="lg"
                        bg="colorPalette.subtle"
                        display="grid"
                        placeItems="center"
                        flexShrink={0}
                      >
                        <FileText size={16} />
                      </Box>

                      <Box minW="0" flex="1">
                        <Text fontSize="sm" fontWeight="semibold" lineClamp={1}>
                          {transfer.documentName}
                        </Text>

                        <HStack
                          mt="1"
                          gap="1.5"
                          fontSize="xs"
                          color="fg.muted"
                          wrap="wrap"
                        >
                          <Box
                            as="span"
                            px="1.5"
                            py="0.5"
                            borderRadius="sm"
                            bg="bg.muted"
                            color="fg"
                            fontWeight="medium"
                          >
                            {transfer.documentType}
                          </Box>
                          <Text as="span">·</Text>
                          <Text as="span">{transfer.requestedDate}</Text>
                        </HStack>

                        {/* On mobile, this wraps naturally */}
                        <HStack
                          mt="2"
                          gap="2"
                          fontSize="xs"
                          color="fg.muted"
                          wrap="wrap"
                        >
                          <Text as="span">
                            <Text as="span" color="fg" fontWeight="semibold">
                              {transfer.fromEmployee}
                            </Text>{" "}
                            ({transfer.fromDepartment})
                          </Text>

                          <Box opacity={0.8} flexShrink={0}>
                            <ArrowRight size={12} />
                          </Box>

                          <Text as="span">
                            <Text as="span" color="fg" fontWeight="semibold">
                              {transfer.toEmployee}
                            </Text>{" "}
                            ({transfer.toDepartment})
                          </Text>
                        </HStack>
                      </Box>
                    </HStack>

                    {/* Right */}
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      gap="2"
                      justify={{ base: "flex-start", md: "flex-end" }}
                      align={{ base: "stretch", sm: "center" }}
                      flexShrink={0}
                    >
                      <HStack
                        gap="1"
                        px="2.5"
                        py="1"
                        borderRadius="full"
                        borderWidth="1px"
                        fontSize="xs"
                        fontWeight="semibold"
                        alignSelf={{ base: "flex-start", sm: "center" }}
                      >
                        <StatusIcon size={12} />
                        <Text>{cfg.label}</Text>
                      </HStack>

                      {transfer.status === "pending" ? (
                        <Stack
                          direction={{ base: "column", sm: "row" }}
                          gap="2"
                          w={{ base: "full", sm: "auto" }}
                        >
                          <Button
                            size="sm"
                            onClick={() => handleApprove(transfer.id)}
                            w={{ base: "full", sm: "auto" }}
                          >
                            <HStack gap="1">
                              <CheckCircle2 size={14} />
                              <Text>Approve</Text>
                            </HStack>
                          </Button>

                          <Button
                            size="sm"
                            variant="solid"
                            onClick={() => handleReject(transfer.id)}
                            w={{ base: "full", sm: "auto" }}
                          >
                            <HStack gap="1">
                              <XCircle size={14} />
                              <Text>Reject</Text>
                            </HStack>
                          </Button>
                        </Stack>
                      ) : null}
                    </Stack>
                  </Flex>
                </Box>
              );
            })}
          </Flex>
        )}
      </Box>
    </Flex>
  );
}

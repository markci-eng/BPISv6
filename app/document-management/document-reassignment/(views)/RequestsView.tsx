"use client";

import { useMemo, useState } from "react";
import { ArrowRight, RefreshCw, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Box, Button, Flex, HStack, Strong, Text } from "@chakra-ui/react";
import EmployeeSelector from "../(components)/employeeSelector";
import DocumentList from "../(components)/documentsList";
import type { Employee as EmployeeModel } from "../(components)/employeeSelector";
import {
  DOCUMENTS_BY_EMPLOYEE,
  EMPLOYEES,
} from "../../../../data/doc-management/documenttype";

type Employee = (typeof EMPLOYEES)[number];

export default function ReassignDocumentsPage() {
  const [sourceEmployee, setSourceEmployee] = useState<EmployeeModel | null>(
    null,
  );
  const [targetEmployee, setTargetEmployee] = useState<EmployeeModel | null>(
    null,
  );
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const documents = useMemo(() => {
    if (!sourceEmployee) return [];
    return DOCUMENTS_BY_EMPLOYEE[sourceEmployee.id] || [];
  }, [sourceEmployee]);

  const targetEmployees = useMemo(
    () => EMPLOYEES.filter((e) => e.id !== sourceEmployee?.id),
    [sourceEmployee],
  );

  const handleToggleDoc = (id: string) => {
    setSelectedDocIds((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedDocIds.length === documents.length) setSelectedDocIds([]);
    else setSelectedDocIds(documents.map((d) => d.id));
  };

  const handleReassign = async () => {
    if (!sourceEmployee || !targetEmployee || selectedDocIds.length === 0)
      return;

    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsProcessing(false);

    setIsDone(true);
    toast.success(
      `${selectedDocIds.length} Document(s) reassigned to ${targetEmployee.name}`,
    );
  };

  const handleReset = () => {
    setSourceEmployee(null);
    setTargetEmployee(null);
    setSelectedDocIds([]);
    setIsDone(false);
  };

  const canReassign =
    !!sourceEmployee &&
    !!targetEmployee &&
    selectedDocIds.length > 0 &&
    !isProcessing &&
    !isDone;

  return (
    <Flex
      minH="100vh"
      bg="bg"
      justify="center"
      px={{ base: 2, md: 4 }}
      py={{ base: 4, md: 6 }}
      color="black"
    >
      <Box w="full" maxW="2xl">
        <Box mb="8">
          <Strong
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            letterSpacing="tight"
          >
            Reassign Documents
          </Strong>
          <Text mt="1" color="fg.muted">
            Transfer document ownership from one employee to another.
          </Text>
        </Box>

        {isDone ? (
          <Box
            borderWidth="1px"
            borderRadius="xl"
            p="8"
            textAlign="center"
            bg="bg.muted"
          >
            <Box display="grid" placeItems="center" color="black">
              <CheckCircle2 size={48} />
            </Box>

            <Text mt="4" fontSize="lg" fontWeight="semibold" color="black">
              Reassignment Complete
            </Text>

            <Text mt="1" color="fg.muted">
              {selectedDocIds.length} document(s) that is transferred from{" "}
              <Text as="span" fontWeight="semibold">
                {sourceEmployee?.name}
              </Text>{" "}
              to{" "}
              <Text as="span" fontWeight="semibold">
                {targetEmployee?.name}
              </Text>{" "}
              is subject for approval.
            </Text>

            <Button mt="6" onClick={handleReset}>
              <HStack gap="2">
                <RefreshCw size={16} />
                <Text>Start New Reassignment</Text>
              </HStack>
            </Button>
          </Box>
        ) : (
          <Box borderWidth="1px" borderRadius="xl" p={{ base: 4, md: 6 }}>
            <Flex direction="column" gap="6">
              {/* Source Employee */}
              <EmployeeSelector
                label="From (Source Employee)"
                employee={sourceEmployee}
                employees={[...EMPLOYEES]}
                onSelect={(emp) => {
                  setSourceEmployee(emp);
                  setTargetEmployee(null);
                  setSelectedDocIds([]);
                }}
              />

              {/* Documents */}
              <DocumentList
                documents={documents}
                selectedIds={selectedDocIds}
                onToggle={handleToggleDoc}
                onSelectAll={handleSelectAll}
              />

              {/* Arrow Divider */}
              {sourceEmployee ? (
                <Flex justify="center">
                  <Box
                    h="10"
                    w="10"
                    borderRadius="full"
                    bg="colorPalette.subtle"
                    display="grid"
                    placeItems="center"
                    color="black"
                  >
                    <Box transform="rotate(90deg)">
                      <ArrowRight size={18} />
                    </Box>
                  </Box>
                </Flex>
              ) : null}

              {/* Target Employee */}
              <EmployeeSelector
                label="To (Target Employee)"
                employee={targetEmployee}
                employees={targetEmployees as unknown as Employee[]}
                onSelect={setTargetEmployee}
                disabled={!sourceEmployee}
              />

              {/* Action */}
              <Button onClick={handleReassign} disabled={!canReassign} w="full">
                {isProcessing ? (
                  <HStack gap="2">
                    <RefreshCw size={16} />
                    <Text>Processing...</Text>
                  </HStack>
                ) : (
                  <Text>
                    Reassign{" "}
                    {selectedDocIds.length > 0
                      ? `${selectedDocIds.length} Document(s)`
                      : "Documents"}
                  </Text>
                )}
              </Button>
            </Flex>
          </Box>
        )}
      </Box>
    </Flex>
  );
}

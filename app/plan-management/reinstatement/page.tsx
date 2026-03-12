// "use client";
// import { Box } from "@chakra-ui/react";
// import { ReinstatementPage } from "@splpi/operations";
// import { useRouter } from "next/navigation";
// import { Breadcrumb } from "st-peter-ui";

// export default function Reinstatement() {
//   const router = useRouter();

//   const breadcrumbItems = [
//     {
//       label: "Home",
//       href: "/",
//     },

//     {
//       label: "Reinstatement",
//       href: "/plan-management/reinstatement",
//     },
//   ];

//   return (
//     <Box mx="auto" p={4}>
//       <Breadcrumb items={breadcrumbItems} />
//       <ReinstatementPage
//           onSuccess={(transactionId, transactionAmt) => {
//             alert(
//               "Reinstatement Application Submitted Successfully! \n Transaction No: " +
//                 transactionId +
//                 "\n Transaction Amount: ₱ " +
//                 transactionAmt.toLocaleString(),
//             );
//             router.push("/success");
//           }}
//           successLink={"/success"}
//         />
//     </Box>
//   );
// }

// app/page.tsx
"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Table,
  Badge,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { useReinstateTransactions } from "./hooks/useReinstateTransaction";

export default function ReinstatePage() {
  const {
    transactions,
    loading,
    createTransaction,
    updateTransaction,
    deleteTransaction,
  } = useReinstateTransactions();

  const [lpaInput, setLpaInput] = useState("");

  const handleCreate = () => {
    if (!lpaInput) return;
    createTransaction({
      lpaNo: lpaInput,
      trxMonth: "0326",
      riType: "RI",
      statusId: "001",
      notes: "Created from frontend",
      isReported: 0,
    });
    setLpaInput("");
  };

  return (
    <Box p={6}>
      <Box mb={6}>
        <HStack gap={2}>
          <Input
            placeholder="Enter LPA No"
            value={lpaInput}
            onChange={(e) => setLpaInput(e.target.value)}
          />
          <Button colorScheme="blue" onClick={handleCreate}>
            Add Transaction
          </Button>
        </HStack>
      </Box>

      {loading ? (
        <Spinner />
      ) : (
        <Table.Root colorScheme="gray">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>LPANo</Table.ColumnHeader>
              <Table.ColumnHeader>TrxMonth</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Notes</Table.ColumnHeader>
              <Table.ColumnHeader>IsReported</Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {transactions.length > 0 &&
              transactions.map((tx) => (
                <Table.Row key={tx.lpaNo}>
                  <Table.Cell>{tx.lpaNo}</Table.Cell>
                  <Table.Cell>{tx.trxMonth}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorScheme={tx.statusId === "001" ? "green" : "yellow"}
                    >
                      {tx.statusId}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>{tx.notes}</Table.Cell>
                  <Table.Cell>
                    <Badge colorScheme={tx.isReported ? "green" : "red"}>
                      {tx.isReported ? "Yes" : "No"}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack gap={2}>
                      <Button
                        size="sm"
                        colorScheme="yellow"
                        onClick={() =>
                          updateTransaction(tx.lpaNo, { notes: "Updated note" })
                        }
                      >
                        Update
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => deleteTransaction(tx.lpaNo)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>
      )}
    </Box>
  );
}

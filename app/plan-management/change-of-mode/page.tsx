"use client";
import { Box } from "@chakra-ui/react";
import { ChangeModePage } from "@splpi/operations";
import { Breadcrumb } from "st-peter-ui";

export default function Page() {

  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "Change of Mode",
      href: "/plan-management/change-of-mode",
    },
  ];
  return (
    <Box
      mx="auto"
      p={4}
    >
        <Breadcrumb items={breadcrumbItems} />
      <ChangeModePage
        onSuccess={function (
          transactionId: string,
          transactionAmount: number,
        ): void {
          throw new Error("Function not implemented.");
        }}
        successLink=""
      />
    </Box>
  );
}

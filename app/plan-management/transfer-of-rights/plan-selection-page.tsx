import { Box, Flex, Table } from "@chakra-ui/react";
import { useState } from "react";
import { Body, Checkbox, H4, Small } from "st-peter-ui";
import { CheckedPlan } from "./transfer-of-rights.types";
import { PlanDetailType } from "@/components/plan-management/planholders/planholders.types";
import { TanstackDataTable } from "@/components/reusable-table/TanstackDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { PlanholderLookup } from "@/components/common/planholder-lookup/planholder-lookup.type";
import { OSPBadge } from "@/components/common/badge/badge";
import { planholderLookup } from "../data/planholder-lookup";

export function PlanSelectionPage({
  plans
}: {
  plans: PlanholderLookup[];
}) {
  const [checkedPlans, setCheckedPlans] = useState<CheckedPlan[]>([]);

  const columns: ColumnDef<PlanholderLookup>[] = [
      {
        accessorKey: "lpaNumber",
        header: "LPA Number",
        enableColumnFilter: true,
        cell: (info) => <Small>{String(info.getValue())}</Small>,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        enableColumnFilter: true,
        cell: (info) => <Small>{String(info.getValue())}</Small>,
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        enableColumnFilter: true,
        cell: (info) => <Small>{String(info.getValue())}</Small>,
      },
      {
        accessorKey: "middleName",
        header: "Middle Name",
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
        accessorKey: "branch",
        header: "Branch",
        enableColumnFilter: true,
        cell: (info) => <Small>{String(info.getValue())}</Small>,
      },
      {
        accessorKey: "accountStatus",
        header: "Account Status",
        enableColumnFilter: true,
        cell: (info) => <OSPBadge type={String(info.getValue()) == "LAPSED" ? "danger" : "success"} >{String(info.getValue())}</OSPBadge>,
      },
      {
        accessorKey: "terminationStatus",
        header: "Termination Status",
        enableColumnFilter: true,
        cell: (info) => <OSPBadge type={String(info.getValue()) == "NOT YET TERMINATED" ? "success" : "danger"} >{String(info.getValue())}</OSPBadge>,
      },
    ];
    
  return (
    <Box py={3}>
      <Flex justify="space-between">
        <Box>
          <H4>Plans</H4>
          <Small mb="4" fontStyle="italic">
            Kindly select plans you want to transfer.
          </Small>
        </Box>
        <Box textAlign="right">
          <Body fontSize="sm" fontStyle="italic">
            No. of plans selected:
          </Body>
          <H4>{checkedPlans.length}/{plans.length}</H4>
        </Box>
      </Flex>

      <TanstackDataTable data={plans} columns={columns} table={{initialPageSize: 50}} features={{rowSelection: true}}/>  
    </Box>
  );
}

"use client";
import { TanstackDataTable } from "@/components/reusable-table/TanstackDataTable";
import { planholderLookup } from "../data/planholder-lookup";
import { ColumnDef } from "@tanstack/react-table";
import { Small } from "st-peter-ui";
import { OSPBadge } from "@/components/common/badge/badge";
import {
  Box,
  Button,
  Flex,
  Group,
  Input,
  Separator,
  Strong,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  PlanholderListTable,
  PlanholderLookup,
} from "@/components/plan-management/planholders/tables/planholder-list-table";

export default function Page() {
  const [data, setData] = useState<PlanholderLookup[]>([]);
  const [searchVal, setSearchVal] = useState("");

  return (
    <>
      <Flex
        width={"full"}
        my={5}
        p={5}
        boxShadow={"sm"}
        w={"full"}
        borderRadius={"md"}
        direction={"column"}
        bg={"white"}
      >
        <Strong fontSize={"md"} color={"gray.700"}>
          Search Planholder
        </Strong>
        <Separator my={2} />
        <Group attached w="full">
          <Input
            placeholder="Search LPA Number or Planholder Name"
            value={searchVal}
            onChange={(e) => setSearchVal(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.code == "Enter")
                setData(
                  planholderLookup.filter(
                    (lpa) =>
                      lpa.lpaNumber === searchVal ||
                      (lpa.firstName + lpa.lastName)
                        .trim()
                        .replace(" ", "")
                        .toLowerCase() ===
                        searchVal.trim().replace(" ", "").toLowerCase(),
                  ),
                );
            }}
          />
          <Button
            bg="bg.subtle"
            variant="outline"
            onClick={() =>
              setData(
                planholderLookup.filter(
                  (lpa) =>
                    lpa.lpaNumber === searchVal ||
                    (lpa.firstName + lpa.lastName)
                      .trim()
                      .replace(" ", "")
                      .toLowerCase() ===
                      searchVal.trim().replace(" ", "").toLowerCase(),
                ),
              )
            }
          >
            Search
          </Button>
        </Group>
      </Flex>
      <PlanholderListTable planholders={data} />
      {/* <TanstackDataTable data={data} columns={columns} table={{initialPageSize: 50}} events={{onRowClick: ((row) => {
      window.location.href = "/plan-management/planholder/" + row.lpaNumber})}}/> */}
    </>
  );
}

import { ButtonGroup, CloseButton, Dialog, Flex, IconButton, Input, InputGroup, Kbd, Pagination, Portal, Separator, Table } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight, LuSearch, LuX } from "react-icons/lu";
import { Small } from "st-peter-ui";
import { agentLookup } from "./data/agent-lookup";
import { useEffect, useState } from "react";
import { AgentLookup } from "./agent-lookup.type";

export function SearchAgentDialog({selectedSaleforceId = null, onSelectChange} : {selectedSaleforceId?: string | null, onSelectChange?: (saleforceId: string | null) => void}) {
  const [selectedSaleforce, setSelectedSaleforce] = useState<string | null>(selectedSaleforceId);
  const [selectedAgent, setSelectedAgent] = useState<AgentLookup | null>(null);
  const [filteredAgents, setFilteredAgents] = useState(agentLookup);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if(!open) {
      onSelectChange?.(selectedSaleforce);
    }
  }, [open]);

  useEffect(() => {
    setSelectedAgent(filteredAgents.find(item => item.saleforceId === selectedSaleforce) ?? null);
  }, [selectedSaleforce]);

  return (
    <Dialog.Root
      size={"cover"}
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      {selectedSaleforce ? (
        <Flex
          align={"start"}
          justify={"space-between"}
          p={"10px"}
          border={"1px solid #bbbbbbff"}
          borderRadius={"md"}
          bg={"gray.50"}
          cursor={"pointer"}
          width={"460px"}
        >
          <Small color={"var(--chakra-colors-primary-hover)"}>
            {`[${selectedSaleforce}] ${selectedAgent?.name}`}
          </Small>
          {<LuX color="#747474" onClick={() => setSelectedSaleforce(null)} />}
        </Flex>
      ) : (
        <Dialog.Trigger asChild>
          <Flex
            align={"start"}
            justify={"space-between"}
            p={"10px"}
            border={"1px solid #bbbbbbff"}
            borderRadius={"md"}
            bg={"gray.50"}
            cursor={"pointer"}
            width={"460px"}
          >
            <Small color={"gray.500"}>
              {"Search Agent ID or Name . . ."}
            </Small>
            {<LuSearch color="#747474" />}
          </Flex>
        </Dialog.Trigger>
      )}

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title fontSize={"md"}>Search Planholder</Dialog.Title>
            </Dialog.Header>
            <Separator />
            <Dialog.Body display="flex" flexDirection="column" minH={0}>
              <InputGroup
                startElement={<LuSearch />}
                endElement={<Kbd>↩ Enter</Kbd>}
              >
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.currentTarget.value)}
                  size="sm"
                  placeholder="Search Agent ID or Name . . ."
                  textTransform="uppercase"
                  onKeyDown={(e) => {
                    const query = e.currentTarget.value.toUpperCase();
                    console.log("Search query:", query);

                    if (query.length === 1) {
                      setFilteredAgents(agentLookup);
                    }

                    if (e.key === "Enter") {
                      setFilteredAgents(
                        agentLookup.filter(
                          (item) =>
                            item.saleforceId.includes(query) ||
                            item.name.toUpperCase().includes(query),
                        ),
                      );
                    }
                  }}
                />
              </InputGroup>

              <Table.ScrollArea
                mt={3}
                borderWidth="1px"
                borderRadius="md"
                flex="1"
                minH={0}
                overflow="auto"
              >
                <Table.Root size="sm" stickyHeader interactive>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeader>Id</Table.ColumnHeader>
                      <Table.ColumnHeader>Name</Table.ColumnHeader>
                      <Table.ColumnHeader>Birthdate</Table.ColumnHeader>
                      <Table.ColumnHeader>Position</Table.ColumnHeader>
                      <Table.ColumnHeader>Supperior</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {filteredAgents
                      .slice((page - 1) * 100, page * 100)
                      .map((item, idx) => (
                        <Table.Row
                          key={item.saleforceId}
                          cursor={"pointer"}
                          onClick={() => setSelectedSaleforce(item.saleforceId)}
                          onDoubleClick={() => setOpen(false)}
                          bg={
                            selectedSaleforce === item.saleforceId
                              ? "var(--chakra-colors-primary-disabled)"
                              : idx % 2 === 0
                                ? "var(--chakra-colors-gray-100)"
                                : "white"
                          }
                          color={
                            selectedSaleforce === item.saleforceId
                              ? "var(--chakra-colors-primary-hover)"
                              : "gray.800"
                          }
                          _hover={{
                            bg:
                              selectedSaleforce === item.saleforceId
                                ? "var(--chakra-colors-primary-disabled)"
                                : "var(--chakra-colors-gray-200)",
                          }}
                        >
                          <Table.Cell>{item.saleforceId}</Table.Cell>
                          <Table.Cell>{item.name}</Table.Cell>
                          <Table.Cell>{item.birthDate.getDate()}</Table.Cell>
                          <Table.Cell>{item.position}</Table.Cell>
                          <Table.Cell>{item.superiorName}</Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                </Table.Root>
              </Table.ScrollArea>
            </Dialog.Body>
            <Dialog.Footer>
              <Pagination.Root
                count={filteredAgents.length}
                page={page}
                pageSize={100}
                onPageChange={(e) => setPage(e.page)}
              >
                <ButtonGroup variant="ghost" size="sm">
                  <Pagination.PrevTrigger asChild>
                    <IconButton>
                      <LuChevronLeft />
                    </IconButton>
                  </Pagination.PrevTrigger>

                  <Pagination.Items
                    render={(page) => (
                      <IconButton
                        variant={{ base: "ghost", _selected: "outline" }}
                      >
                        {page.value}
                      </IconButton>
                    )}
                  />

                  <Pagination.NextTrigger asChild>
                    <IconButton>
                      <LuChevronRight />
                    </IconButton>
                  </Pagination.NextTrigger>
                </ButtonGroup>
              </Pagination.Root>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

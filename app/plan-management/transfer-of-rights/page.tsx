import { Box, Breadcrumb } from "st-peter-ui";
import { TransferOfRightsPage } from "./transfer-of-rights-page";

export default function Page() {
    
  const breadcrumbItems = [
    {
      label: "Home",
      href: "/",
    },

    {
      label: "Transfer of Rights",
      href: "/plan-management/transfer-of-rights",
    },
  ];

  return (
    <Box p={4} mx="auto">
      <Breadcrumb items={breadcrumbItems} />
      <TransferOfRightsPage/>
    </Box>
  );
}

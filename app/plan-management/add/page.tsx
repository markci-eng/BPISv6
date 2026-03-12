import LifePlanApplication from "@/components/plan-management/lifeplan-application/lifeplan-application";
import { Box } from "@chakra-ui/react";
import { Breadcrumb } from "st-peter-ui";

export default function Page() {
    
      const breadcrumbItems = [
        {
          label: "Home",
          href: "/",
        },
    
        {
          label: "Lifeplan Application",
          href: "/plan-management/add",
        },
      ];
      
  return (
    <Box
      mx="auto"
      p={4}
    >
        <Breadcrumb items={breadcrumbItems} />
        <LifePlanApplication />
    </Box>
  )
}

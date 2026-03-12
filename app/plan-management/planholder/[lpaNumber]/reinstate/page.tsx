import { Box } from "@chakra-ui/react";
import { FormSteps } from "osp.cis.nextjs.components";
import { FaFileAlt } from "react-icons/fa";
import { Breadcrumb } from "st-peter-ui";
import RIStep1 from "./ri-step-1";
import { PhLapsedPlan, RIPlanItemProps } from "./reinstatement.types";
import { PlanholderInfoData } from "@/app/plan-management/data/planholder-info.data";
import { PlanDetailType, PlanholderInfoType } from "@/components/plan-management/planholders/planholders.types";
import { PlanDetailsData } from "@/app/plan-management/data/plan-details.data";
import { PlanholderPaymentData } from "@/app/plan-management/data/planholder-payment.data";
import { PlanTypesData } from "@/app/plan-management/data/plan-types.data";

export default async function Page({params} : {params: Promise<{lpaNumber: string}>}) {
    const lpaNumber = (await params).lpaNumber;
    const planInfo : PlanholderInfoType | undefined = PlanholderInfoData.find((plan) => plan.lpaNumber == lpaNumber);
    const phDetails : PlanDetailType | undefined = PlanDetailsData.find((plan) => plan.lpaNumber == lpaNumber);
    const totalAmtPaid = PlanholderPaymentData.reduce((sum, py) => {
    if (py.lpaNumber === lpaNumber) {
        return sum + (py.siAmount ?? 0);
    }
    return sum;
    }, 0);
    const newTAP = PlanTypesData.findLast((plan) => plan.planDescription == phDetails?.planDescription && plan.mode == phDetails.mode && plan.term == phDetails.term && plan.planClass == phDetails.planClass)?.totalAmountPayable;
    const newInstAmt = PlanTypesData.findLast((plan) => plan.planDescription == phDetails?.planDescription && plan.mode == phDetails.mode && plan.term == phDetails.term && plan.planClass == phDetails.planClass)?.installmentAmount;

    const breadcrumbItems = [
        {
        label: "Planholder",
        href: "/plan-management/planholder",
        },
        {
        label: lpaNumber,
        href: "/plan-management/planholder/" + lpaNumber,
        },
        {
        label: "Reinstatement",
        href: "/plan-management/planholder/" + lpaNumber + "/reinstate",
        },
    ];
    
    const planDetails : PhLapsedPlan = {
        lpaNo: lpaNumber,
        newLpaNo: lpaNumber,
        phName: planInfo?.firstName + " " + planInfo?.lastName,
        planType: phDetails?.planDescription ?? "N/A",
        mop: phDetails?.mode ?? "N/A",
        status: phDetails?.accountStatus ?? "N/A",
        totalAmtPayable: phDetails?.totalAmountPayable.toString() ?? "0",
        totalAmtPaid: totalAmtPaid.toString(),
        balance: ((phDetails?.totalAmountPayable ?? 0) - totalAmtPaid).toString(),
        instAmt: phDetails?.installmentAmount.toString() ?? "0",
        newStatus: "ACTIVE",
        newTotalAmtPayable: newTAP?.toString() ?? "0",
        newTotalAmtPaid: totalAmtPaid.toString(),
        newBalance: (newTAP ?? 0 - totalAmtPaid).toString(),
        newInstAmt: (newInstAmt ?? 0).toString(),
        duedate: (phDetails?.effectivityDate)?.toString() ?? "N/A"
    }

//   const stepsData = [
//     {
//       title: "Select Lapsed Plan",
//       icon: FaFileAlt,
//       content: (
//         <RIStep1 item={planDetails}/>
//       ),
//       validateBeforeNext: () => {
//         if (checkedPlans.length === 0) {
//           alert("Please select at least one plan to reinstate.");
//           return false;
//         }
//         return true;
//       },
//     },
//   ];
  
  return (
    <Box maxW={"8xl"} mx="auto">
      <Breadcrumb items={breadcrumbItems} />
      <Box mt={5} p={4} bg={"#fff"} boxShadow={"sm"} borderRadius="sm">
        <FormSteps
          stepsData={[]}
          title={"Reinstatement"}
          description={
            "Quickly bring your plan back on track by reactivating a lapsed plan."
          }
        />
      </Box>
    </Box>
  );
}

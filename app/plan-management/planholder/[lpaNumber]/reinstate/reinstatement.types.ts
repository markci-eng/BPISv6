import { TableRowProps } from "@chakra-ui/react";

export interface PhLapsedPlan {
  lpaNo: string;
  phName: string;
  planType: string;
  mop: string;
  status: string;
  totalAmtPayable: string;
  totalAmtPaid: string;
  balance: string;
  instAmt: string;
  newLpaNo: string;
  newStatus: string;
  newTotalAmtPayable: string;
  newTotalAmtPaid: string;
  newBalance: string;
  newInstAmt: string;
  duedate: string;
}

export interface CheckedPlan {
  lpaNo: string;
  planType: string;
  isFullyPaid: boolean;
  reinstatementFee: number;
  reinstatementPayment: number;
}

export interface RIProps {
  initialPlans?: PhLapsedPlan[];
  onSubmit?: (selectedPlans: CheckedPlan[]) => void;
}

export interface RIPlanItemProps extends TableRowProps {
  checked: boolean;
  plan: PhLapsedPlan;
  onChanged?: (checked: boolean, values: CheckedPlan) => void;
}
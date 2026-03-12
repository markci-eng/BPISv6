import { Role } from "@/data/roletypes";
import ReassignPage from "./reassign-page";

export default function Page() {
  const role: Role = "branch_manager"; // prototype switch - branch_manager, cashier, encoder
  return <ReassignPage role={role} />;
}

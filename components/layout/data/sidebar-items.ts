import { NavItem } from "../app-layout.type";
import { HiOutlineCurrencyDollar, HiOutlineUsers } from "react-icons/hi2";
import { TbUsersMinus } from "react-icons/tb";
import { MdOutlineManageAccounts } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { LuSettings2 } from "react-icons/lu";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { RiBookShelfLine, RiDashboardLine, RiUser2Line } from "react-icons/ri";

export const SideBarItemsBranch: NavItem[] = [
  {
    icon: RiDashboardLine,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: RiUser2Line,
    label: "Sales Agent Management",
    subItems: [
      {
        label: "Sales Agent Profile",
        href: "/sales-force",
      },
      {
        label: "Movement",
        href: "/sales-force/movement",
      },
      {
        label: "Re-Assign",
        href: "/sales-force/re-assign",
      },
      {
        label: "SFID",
        href: "/sales-force/sfid",
      },
    ],
  },
  {
    label: "Document Management",
    icon: RiBookShelfLine,
    href: "/document-management",
    subItems: [
      {
        label: "Assign Documents",
        href: "/document-management/assign-documents",
      },
      {
        label: "Blocked Documents",
        href: "/document-management/blocked-documents",
      },
      {
        label: "Evaluate Documents",
        href: "/document-management/evaluate-documents",
      },
      {
        label: "Tag Unpaid Cancelled Excess SI",
        href: "/document-management/tag-unpaid-cancelled-excess-si",
      },
      {
        label: "Document Reassignment",
        href: "/document-management/document-reassignment",
      },
    ],
  },
  {
    label: "Plan Management",
    icon: HiOutlineUsers,
    subItems: [
      { label: "Add New Sale", href: "/plan-management/add" },
      { label: "Planholder Profile", href: "/plan-management/planholder" },
      { label: "Change of Mode", href: "/plan-management/change-of-mode" },
      { label: "RI TEST (UPDATE)", href: "/plan-management/reinstatement" },
    ],
  },
  {
    label: "Plan Availment",
    icon: TbUsersMinus,
    subItems: [
      { label: "Plan Termination", href: "/plan-termination" },
      { label: "Claim Application", href: "/claim-application" },
    ],
  },
  {
    icon: HiOutlineCurrencyDollar,
    label: "Payment",
    subItems: [
      { label: "Encode Payment", href: "/payment" },
      { label: "Validated Deposit Slip", href: "/payment/validated-deposit" },
    ],
  },

  {
    icon: BsFileEarmarkSpreadsheet,
    label: "Disbursement",
    href: "/disbursement",
  },

  {
    icon: LiaHandHoldingUsdSolid,
    label: "Loan",
    href: "/loan",
  },

  {
    icon: MdOutlineManageAccounts,
    label: "Accounts Maintenance",
    subItems: [
      { label: "MCPR", href: "/accounts-maintenance/mcpr" },
      {
        label: "Loading of Accounts",
        href: "/accounts-maintenance/accounts-loading",
      },
      {
        label: "Tranfsfer of Accounts",
        href: "/accounts-maintenance/accounts-transfer",
      },
    ],
  },

  {
    icon: HiOutlineDocumentReport,
    label: "Reports",
    href: "/reports",
  },

  {
    icon: LuSettings2,
    label: "Utilities",
    href: "/utilities",
  },
];

export const SideBarItemsEKolekta: NavItem[] = [
  {
    icon: RiDashboardLine,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: RiDashboardLine,
    label: "View MCPR",
    href: "/mcpr",
  },
  {
    icon: RiDashboardLine,
    label: "Encode Payment",
    href: "/payment",
  },
  {
    icon: RiDashboardLine,
    label: "View Encoded Payments",
    href: "/payments",
  },
  {
    icon: RiDashboardLine,
    label: "Prepare DRS",
    href: "/pd",
  },
  {
    icon: RiDashboardLine,
    label: "Disbursement",
    href: "/d",
  },
  {
    icon: RiDashboardLine,
    label: "Encode Validated Deposit Slip",
    href: "/evdps",
  },
  {
    icon: RiDashboardLine,
    label: "View Validated Deposit Slip",
    href: "/vvdps",
  },
  {
    icon: RiDashboardLine,
    label: "Add New Sale",
    href: "/plan-management/add",
  },
  {
    icon: RiDashboardLine,
    label: "View Planholder",
    href: "/plan-management/planholder",
  },
  {
    icon: RiDashboardLine,
    label: "Reinstatement",
    href: "/plan-management/reinstatement",
  },
  {
    icon: RiDashboardLine,
    label: "Change of Mode",
    href: "/plan-management/change-of-mode",
  },
  {
    icon: RiDashboardLine,
    label: "Document Cancellation",
    href: "/dc",
  },
];

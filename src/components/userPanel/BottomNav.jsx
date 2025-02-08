// "use client";
// import { Tab, Tabs } from "@nextui-org/react";
// import { Home, User, Wallet, Settings, FileText } from "lucide-react";
// import Link from "next/link";

// const BottomNav = () => {
//   return (
//     <div className="fixed bottom-0 w-full max-w-2xl bg-white border-t border-gray-300">
//       <Tabs
//         aria-label="Bottom Navigation"
//         fullWidth
//         variant="light"
//         className="py-2"
//         classNames={{
//           tabList: "w-full",
//           tab: "p-6",
//           cursor: "w-[5px] bg-blue-100 rounded-xl",
//         }}
//       >
//         <Tab
//           key="home"
//           title={
//             <NavItem
//               icon={<Home size={20} />}
//               label="خانه"
//               active={true}
//               goTo="/userPanel"
//             />
//           }
//         />
//         <Tab
//           key="history"
//           title={
//             <NavItem
//               icon={<FileText size={20} />}
//               label="تاریخچه"
//               active={false}
//               goTo="/userPanel/transactions"
//             />
//           }
//         />
//         <Tab
//           key="services"
//           title={
//             <NavItem
//               icon={<Settings size={20} />}
//               label="خدمات"
//               active={false}
//               goTo="/userPanel/ServicePage"
//             />
//           }
//         />
//         <Tab
//           key="wallet"
//           title={
//             <NavItem
//               icon={<Wallet size={20} />}
//               label="کیف پول"
//               active={false}
//               goTo="/userPanel/wallet"
//             />
//           }
//         />
//         <Tab
//           key="profile"
//           title={
//             <NavItem
//               icon={<User size={20} />}
//               label="پروفایل"
//               active={false}
//               goTo="/userPanel/Profile"
//             />
//           }
//         />
//       </Tabs>
//     </div>
//   );
// };

// const NavItem = ({ icon, label, active, goTo }) => {
//   return (
//     <Link href={goTo}>
//       <div
//         className={`flex flex-col items-center text-gray-500 ${
//           active ? "text-blue-900 font-bold" : ""
//         }`}
//       >
//         {icon}
//         <span className="text-xs mt-1">{label}</span>
//       </div>
//     </Link>
//   );
// };

// export default BottomNav;

"use client";
import { usePathname } from "next/navigation";
import { Tab, Tabs } from "@nextui-org/react";
import { Home, User, Wallet, Settings, FileText } from "lucide-react";
import Link from "next/link";

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <div className="fixed h-[100px] bottom-0 w-full max-w-2xl bg-white border-t border-gray-300">
      <Tabs
        aria-label="Bottom Navigation"
        fullWidth
        variant="light"
        selectedKey={pathname}
        className="py-2"
        classNames={{
          tabList: "w-full",
          tab: "p-6",
          cursor: "w-[5px] bg-blue-100 rounded-xl",
        }}
      >
        <Tab
          key="/userPanel"
          title={
            <NavItem icon={<Home size={20} />} label="خانه" goTo="/userPanel" />
          }
        />
        <Tab
          key="/userPanel/transactions"
          title={
            <NavItem
              icon={<FileText size={20} />}
              label="تاریخچه"
              goTo="/userPanel/transactions"
            />
          }
        />
        <Tab
          key="/userPanel/ServicePage"
          title={
            <NavItem
              icon={<Settings size={20} />}
              label="خدمات"
              goTo="/userPanel/ServicePage"
            />
          }
        />
        <Tab
          key="/userPanel/wallet"
          title={
            <NavItem
              icon={<Wallet size={20} />}
              label="کیف پول"
              goTo="/userPanel/wallet"
            />
          }
        />
        <Tab
          key="/userPanel/Profile"
          title={
            <NavItem
              icon={<User size={20} />}
              label="پروفایل"
              goTo="/userPanel/Profile"
            />
          }
        />
      </Tabs>
    </div>
  );
};

const NavItem = ({ icon, label, goTo }) => {
  return (
    <Link href={goTo}>
      <div className="flex flex-col items-center text-gray-500">
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </div>
    </Link>
  );
};

export default BottomNav;

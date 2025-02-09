"use client";
import { FileText, Home, Settings, User, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between  max-h-[100px] w-full max-w-2xl bg-white border-t border-gray-300 p-5">
      <NavItem
        icon={<Home size={20} />}
        label="خانه"
        goTo="/userPanel"
        active={pathname === "/userPanel"}
      />
      <NavItem
        icon={<FileText size={20} />}
        label="تاریخچه"
        goTo="/userPanel/transactions"
        active={pathname === "/userPanel/transactions"}
      />
      <NavItem
        icon={<Settings size={20} />}
        label="خدمات"
        goTo="/userPanel/ServicePage"
        active={pathname === "/userPanel/ServicePage"}
      />
      <NavItem
        icon={<Wallet size={20} />}
        label="کیف پول"
        goTo="/userPanel/wallet"
        active={pathname === "/userPanel/wallet"}
      />
      <NavItem
        icon={<User size={20} />}
        label="پروفایل"
        goTo="/userPanel/Profile"
        active={pathname === "/userPanel/Profile"}
      />
    </div>
  );
};

const NavItem = ({ icon, label, goTo, active }) => {
  return (
    <Link href={goTo}>
      <div
        className={`flex flex-col items-center ${
          active ? "text-blue-500 font-bold" : "text-gray-500"
        }`}
      >
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </div>
    </Link>
  );
};

export default BottomNav;

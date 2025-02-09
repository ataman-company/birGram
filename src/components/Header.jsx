"use client";
import Image from "next/image";
import Link from "next/link";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Divider,
  ModalProps,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
const Header = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };
  return (
    <header className="text-white">
      <div className="flex items-center justify-between pt-3">
        <div className="md:flex items-center lg:gap-5 md:gap-3 text-sm hidden">
          <Link href={"/"}>
            <Image width={80} height={10} src={"/images/1.png"} alt="gold" />
          </Link>
          <Link
            className="hover:border-b hover:border-b-white duration-200"
            href={"#"}
          >
            راهنمای استفاده
          </Link>
          <Link
            className="hover:border-b hover:border-b-white duration-100"
            href={"#"}
          >
            قوانین مقررات
          </Link>
          <Link
            className="hover:border-b hover:border-b-white duration-100"
            href={"#"}
          >
            مجوز ها
          </Link>
          <Link
            className="hover:border-b hover:border-b-white duration-100"
            href={"#"}
          >
            میلی لنگ
          </Link>
          <Link
            className="hover:border-b hover:border-b-white duration-100"
            href={"#"}
          >
            تماس با ما
          </Link>
          <Link
            className="hover:border-b hover:border-b-white duration-100"
            href={"#"}
          >
            دریافت طلا
          </Link>
        </div>
        <div className="flex items-center lg:gap-3 lg:grow-0 justify-end grow sm:p-0">
          <Button
            className="bg-transparent lg:hidden md:hidden px-0 justify-start min-w-5"
            onPress={onOpen}
          >
            <Image width={34} height={34} src={"/icons/menu.svg"} alt="menu" />
          </Button>
          <Image
            width={80}
            height={20}
            src={"/images/2.png"}
            className="md:hidden ml-auto"
            alt="gold"
          />
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="bg-[#1f2024] text-white p-1 modal-top"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 items-center">
                    <Image
                      width={100}
                      height={20}
                      src={"/images/2.png"}
                      alt="gold"
                    />
                    <h4 className="text-lg">Gold Powered</h4>
                    <Input
                      variant="bordered"
                      classNames={{ inputWrapper: "bg-black" }}
                      endContent={
                        <Image
                          width={24}
                          height={24}
                          src={"/icons/magnifier.svg"}
                          alt="search"
                        />
                      }
                      radius="lg"
                      type="search"
                      placeholder="جستجو ..."
                    />
                  </ModalHeader>
                  <ModalBody>
                    <div className="w-full flex flex-col gap-3 text-sm">
                      <Link href={"#"}>راهنمای استفاده</Link>
                      <Divider className="bg-white" />
                      <Link href={"#"}>قوانین و مقررات</Link>
                      <Divider className="bg-white" />
                      <Link href={"#"}>مجوز ها</Link>
                      <Divider className="bg-white" />
                      <Link href={"#"}>بیرگرم مگ</Link>
                      <Divider className="bg-white" />
                      <Link href={"#"}>تماس با ما</Link>
                      <Divider className="bg-white" />
                      <Link href={"#"}>دریافت طلا</Link>
                    </div>
                    <Link href={""} />
                  </ModalBody>
                  <ModalFooter>
                    {isLoggedIn ? (
                      <button
                        onClick={handleLogout}
                        className="py-2 px-3 bg-red-500 text-white rounded-md text-sm lg:block "
                      >
                        خروج
                      </button>
                    ) : (
                      <>
                        <Link
                          href={"/login"}
                          className="py-2 px-3 bg-blue-400 text-white rounded-md text-sm lg:block "
                        >
                          ورود
                        </Link>
                        <Link
                          href={"/register"}
                          className="py-2 px-3 bg-blue-400 text-white rounded-md text-sm lg:block "
                        >
                          ثبت نام
                        </Link>
                      </>
                    )}
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="py-2 px-3 bg-red-500 text-white rounded-md text-sm lg:block hidden"
            >
              خروج
            </button>
          ) : (
            <Link
              href={"/login"}
              className="py-2 px-3 bg-blue-400 text-white rounded-md text-sm lg:block hidden"
            >
              ورود
            </Link>
          )}
          <Link
            href={"#"}
            className="py-2 px-3 bg-yellow-400 text-black rounded-md flex items-center gap-1 text-sm"
          >
            <Image
              width={20}
              height={16}
              src={"/icons/download.svg"}
              alt="icon"
            />
            نصب اپلیکیشن
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;

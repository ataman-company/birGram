"use client";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
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
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Config from "./config";

const Header = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    // Send GET request to /splash using axios
    axios
      .get(`${Config.apiUrl}/splash`)
      .then((response) => {
        const data = response.data.options;
        // Store the options in localStorage
        localStorage.setItem("Options", JSON.stringify(data));
        localStorage.setItem(
          "current_price",
          JSON.stringify(response.data.current_price)
        );
        localStorage.setItem(
          "siteName",
          JSON.stringify(response.data.options.sitename)
        );
        localStorage.setItem(
          "certificates",
          JSON.stringify(response.data.certificates)
        );
        localStorage.setItem(
          "stepgold",
          JSON.stringify(response.data.stepgold)
        );

        setOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching splash data:", error);
      });

    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  if (!options) return null;

  return (
    <header className="text-white">
      <div className="flex items-center justify-between pt-3 ">
        <div className="md:flex items-center lg:gap-5 md:gap-3 text-sm hidden w-full">
          <Link href={"/"}>
            <Image
              width={80}
              height={10}
              src={`${Config.baseUrl}/${options.logo}`}
              alt="gold"
            />
          </Link>
          <Link
            className="hover:border-b hover:border-b-white duration-200"
            href={"/help?category_id=&search="}
          >
            راهنمای استفاده
          </Link>
          <Link
            className="hover:border-b hover:border-b-white duration-100"
            href={"/rules"}
          >
            قوانین مقررات
          </Link>
          <Link
            className="hover:border-b hover:border-b-white duration-100"
            href={"/certificates"}
          >
            مجوز ها
          </Link>
          <Link
            className="hover:border-b hover:border-b-white duration-100"
            href={"/contact-us"}
          >
            تماس با ما
          </Link>
          <Link
            className="hover:border-b hover:border-b-white duration-100"
            href={"/giving-gold"}
          >
            دریافت طلا
          </Link>
        </div>
        <div className="flex items-center lg:gap-3 lg:grow-0 justify-between grow sm:p-0">
          <Button
            className="bg-transparent lg:hidden md:hidden px-0 justify-start min-w-5"
            onPress={onOpen}
          >
            <Image width={34} height={34} src={"/icons/menu.svg"} alt="menu" />
          </Button>

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
                      src={`${Config.baseUrl}/${options.logo}`}
                      alt="gold"
                    />
                    <h4 className="text-lg"></h4>
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
                      <Link href={"/help?category_id=&search="}>
                        راهنمای استفاده
                      </Link>
                      <Divider className="bg-white" />
                      <Link href={"/rules"}>قوانین و مقررات</Link>
                      <Divider className="bg-white" />
                      <Link href={"/certificates"}>مجوز ها</Link>
                      <Divider className="bg-white" />
                      <Link href={"/contact-us"}>تماس با ما</Link>
                      <Divider className="bg-white" />
                      <Link href={"/giving-gold"}>دریافت طلا</Link>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    {isLoggedIn ? (
                      <>
                        <Link
                          href="/userPanel"
                          className="py-2 px-3 bg-blue-400 text-white rounded-md text-sm lg:block"
                        >
                          ورود به پنل
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="py-2 px-3 bg-red-500 text-white rounded-md text-sm lg:block"
                        >
                          خروج
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href={"/login"}
                          className="py-2 px-3 bg-blue-400 text-white rounded-md text-sm lg:block"
                        >
                          ورود
                        </Link>
                        <Link
                          href={"/register"}
                          className="py-2 px-3 bg-blue-400 text-white rounded-md text-sm lg:block"
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
        </div>
        <div className="flex items-center justify-between flex-shrink-0">
          {isLoggedIn ? (
            <>
              <button
                onClick={handleLogout}
                className="mx-2 py-2 px-3 bg-red-500 text-white rounded-md text-sm lg:block hidden"
              >
                خروج
              </button>
              <Link
                href="/userPanel"
                className="mx-2 py-2 px-3 bg-blue-400 text-white rounded-md text-sm lg:block hidden"
              >
                ورود به پنل
              </Link>
            </>
          ) : (
            <Link
              href={"/login"}
              className="mx-2 py-2 px-3 bg-blue-400 text-white rounded-md text-sm lg:block hidden"
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

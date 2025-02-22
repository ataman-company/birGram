"use client";
import Config from "@/components/config";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";

import BottomNav from "@/components/userPanel/BottomNav";
import Header from "../Header/Header";

import TicketsTable from "./components/TicketTable";
import Image from "next/image";
import PlusIcon from "@public/icons/userPanel/plus";
import Link from "next/link";

const Transactions = () => {
  const [tickets, setTickets] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        setCurrentPrice(JSON.parse(localStorage.getItem("currentPrice")));
        if (!token) {
          setError("Token not found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${Config.apiUrl}/user/ticket/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.code === 1) {
          setTickets(response.data.tickets);
        } else {
          setError("Failed to fetch tickets.");
        }
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);
  if (!tickets) return null;

  return (
    <>
      <div className="flex flex-col gap-2 pb-5 px-2 h-screen max-w-2xl mx-auto">
        <Header currentPrice={currentPrice} />

        <div className="flex justify-end items-center text-center">
          {/* <div className="inline-block text-md">
                      موجودی : {user?.wallet} ریال
                    </div> */}

          <span className="text-center"> ایجاد تیکت</span>
          {/* Open Modal on Button Click */}
          <Link href="/userPanel/ticket/new">
            <PlusIcon color="white" size={36} />
          </Link>
        </div>
        <div className="flex-col justify-between max-w-2xl pb-[100px]">
          {/* {isModalOpen && <FilterModal onClose={() => setIsModalOpen(false)} />} */}
          {tickets ? (
            <TicketsTable tickets={tickets} loading={loading} error={error} />
          ) : (
            <div className="flex justify-center items-center -full text-gray-500 text-lg font-medium p-4 shadow-sm">
              <span>هیچ تیکتی وجود ندارد</span>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white border-gray-300 z-[9999]">
          <div className="flex justify-center">
            <BottomNav />
          </div>
        </div>
      </div>
    </>
  );
};

// export default Transactions;

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Transactions />
    </Suspense>
  );
}

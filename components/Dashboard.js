"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

// Components
import Footer from "./Footer";

import Link from "next/link";
import Image from "next/image";

import { ArrowDownToLine } from "lucide-react";

const Dashboard = () => {
  const dashboardData = [
    {
      name: "Total No of Invoice",
      value: "2",
    },
    {
      name: "Pending Invoice",
      value: "2",
    },
    {
      name: "Paid Invoice",
      value: "4",
    },
    {
      name: "Total Revenue",
      value: "2 Eth",
    },
  ];

  const router = useRouter();
  const pathname = usePathname();

  const viewInvoice = (id) => {
    router.push(`/dashboard/single-invoice/${id}`);
  };

  return (
    <div className="w-3/4 xl:w-3/4 2xl:w-3/5  mx-auto space-y-8 xl:space-y-14">
      {/* Nav */}

      <div className="flex justify-between items-center py-3">
        {/* Brand */}
        <Link href={`/`} className="flex items-center gap-2">
          <Image
            src={`/Images/logo.svg`}
            width={35}
            height={35}
            alt="Graw logo"
          />
          <h1 className="font-lato text-3xl font-bold">Graw</h1>
        </Link>

        <div className="flex gap-2 items-center">
          <span className="p-2 flex items-center justify-center bg-ash rounded-lg">
            <Image
              src={`/Images/profile-ash.svg`}
              width={20}
              height={20}
              alt="Profile icon"
            />
          </span>

          <span className="p-2 text-center text-[#6E6E6E] bg-ash rounded-lg font-bold font-lato">
            0x4037...538f54
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-5 items-center relative">
        <div className="absolute -left-16 top-0 space-y-3">
          <Link
            href={`/dashboard`}
            className={`flex items-center justify-center p-3 ${
              pathname === "/dashboard" ? "bg-[#EFF8D0]" : "bg-ash "
            } rounded-lg cursor-pointer`}
          >
            {pathname === "/dashboard" ? (
              <Image
                src={`/Images/Frame.svg`}
                width={25}
                height={25}
                alt="Dashboard Icon"
              />
            ) : (
              <Image
                src={`/Images/dashboard.svg`}
                width={25}
                height={25}
                alt="Dashboard Icon"
              />
            )}
          </Link>

          <Link
            href={`/create-invoice`}
            className={`flex items-center justify-center p-3 ${
              pathname === "/create-invoice" ? "bg-[#EFF8D0]" : "bg-ash "
            } rounded-lg cursor-pointer`}
          >
            {pathname === "/create-invoice" ? (
              <Image
                src={`/Images/plus-icon.svg`}
                width={25}
                height={25}
                alt="Plus Icon"
              />
            ) : (
              <Image
                src={`/Images/CI.svg`}
                width={25}
                height={25}
                alt="Plus Icon"
              />
            )}
          </Link>
        </div>

        <div className="w-full space-y-5">
          {/* header */}
          <div className="grid grid-cols-4 grid-rows-1 gap-5">
            {dashboardData.map((data, index) => (
              <div
                key={index}
                className="border border-border rounded-xl p-5 col-span-1 space-y-3"
              >
                <h3 className="text-sm font-bold text-[#A8A8A8] font-lato">
                  {data.name}
                </h3>

                <p className="text-2xl font-lato font-bold text-[#6E6E6E]">
                  {data.value}
                </p>
              </div>
            ))}
          </div>

          {/* table */}
          <div>
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                      <thead className="bg-[#FAFAFA]">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-sm font-medium "
                          >
                            Invoice ID
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-sm font-medium "
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-sm font-medium "
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-sm font-medium "
                          >
                            Amount
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-sm font-medium "
                          >
                            Status
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-3 text-start text-sm font-medium "
                          ></th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          className="odd:bg-[#F5F5F5] even:even:bg-[#FAFAFA] cursor-pointer group"
                          onClick={() => viewInvoice("D5VG67")}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-lato font-bold text-[#A8A8A8] ">
                            #Graw - 001
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-lato text-[#A8A8A8] ">
                            05 / 10 / 24
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-lato text-[#A8A8A8] ">
                            Joshua Omobola
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm font-lato text-[#A8A8A8] ">
                            1 ETH
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-lato font-bold">
                            <span className="py-1 px-2 bg-[#F5E1CE] text-[#D9914E] text-xs rounded-xl">
                              Pending
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-sm flex justify-end font-lato font-bold">
                            <ArrowDownToLine
                              className="group-hover:opacity-100 opacity-0 transition-opacity duration-500 hover:text-[#A8A8A8] text-[#A8A8A8]"
                              size={20}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;

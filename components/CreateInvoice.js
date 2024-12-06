"use client";

// Library imports
import { useState } from "react";

// Components
import CreateInvoiceCard from "./CreateInvoiceCard";
import Footer from "./Footer";

import Link from "next/link";
import Image from "next/image";

const CreateInvoice = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const tabs = [
    {
      id: 0,
      label: "Dashboard",
      content: <h1>Dashboard</h1>,
    },
    {
      id: 1,
      label: "Create Invoice",
      content: <CreateInvoiceCard />,
    },
  ];
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
          <div
            className="flex items-center justify-center p-3 bg-ash rounded-lg cursor-pointer"
            onClick={() => handleTabClick(0)}
          >
            <Image
              src={`/Images/dashboard.svg`}
              width={25}
              height={25}
              alt="Dashboard Icon"
            />
          </div>

          <div
            className="flex items-center justify-center p-3 bg-[#EFF8D0] rounded-lg cursor-pointer"
            onClick={() => handleTabClick(1)}
          >
            <Image
              src={`/Images/plus-icon.svg`}
              width={25}
              height={25}
              alt="Plus Icon"
            />
          </div>
        </div>

        {tabs[activeTab].content}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CreateInvoice;

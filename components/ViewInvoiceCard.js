"use client";

// Library imports
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Components
import InvoiceShimmer from "./InvoiceShimmer";

// Icons
import {
  ScrollText,
  Newspaper,
  LayoutPanelTop,
  ArrowRight,
} from "lucide-react";

const ViewInvoiceCard = () => {
  //  Form
  const [formData, setFormData] = useState({});
  const [img, setImg] = useState("/Images/logo-black.svg");

  const [items, setItems] = useState([
    {
      item_name: "",
      quantity: "",
      unit_price: "",
    },
  ]);

  function shortenAddress(address) {
    if (!address) return null;

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("pay invoice");

  return (
    <>
      {/* Left side */}
      {isLoading ? (
        <InvoiceShimmer />
      ) : (
        <div className="w-3/5 bg-[#FAFAFA] h-[75vh] rounded-lg overflow-scroll scrollable-box p-7 space-y-10 relative">
          {/* header */}
          <div className="flex justify-between items-center">
            <h2 className="text-[64px] font-lato font-semibold">Invoice</h2>

            <Image
              src={`${img}`}
              width={90}
              height={90}
              alt="Graw Logo black"
            />
          </div>

          {/* Content */}
          <div>
            {/* Dates */}
            <div className="pb-7 border-b border-b-[#EFEFEF] mb-10">
              <div className="flex">
                <div className="space-y-2 w-[30%]">
                  <h3 className="capitalize text-sm font-lato font-bold">
                    Invoice Date
                  </h3>

                  <div className="font-lato text-xs text-[#A8A8A8] font-bold truncate">
                    {formData?.invoice_date}
                  </div>
                </div>

                <div className="space-y-2 w-[30%]">
                  <h3 className="capitalize text-sm font-lato font-bold">
                    Due Date
                  </h3>

                  <div className="font-lato text-xs text-[#A8A8A8] font-bold truncate">
                    {formData?.due_date}
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice info */}
            <div className="pb-7 border-b border-b-[#EFEFEF] mb-5">
              <div className="flex ">
                <div className="space-y-2 w-[30%]">
                  <h3 className="capitalize text-sm font-lato font-bold">
                    From
                  </h3>

                  <div>
                    <div className="font-lato text-xs text-[#A8A8A8] font-bold truncate">
                      {formData?.sender_name}
                    </div>
                    <div className="font-lato text-xs text-[#A8A8A8] font-bold truncate">
                      {formData?.sender_email}
                    </div>
                  </div>

                  <div className="font-lato text-xs text-[#A8A8A8] font-bold truncate">
                    {shortenAddress(formData?.sender_wallet_address)}
                  </div>
                </div>

                <div className="space-y-2 basis-[30%] truncate">
                  <h3 className="capitalize text-sm font-lato font-bold">To</h3>

                  <div className="w-full overflow-x-hidden">
                    <div className="font-lato text-xs text-[#A8A8A8] font-bold truncate ">
                      {formData?.receiver_name}
                    </div>

                    <div className="font-lato text-xs text-[#A8A8A8] font-bold truncate ">
                      {formData?.receiver_email}
                    </div>
                  </div>

                  <div className="font-lato text-xs text-[#A8A8A8] font-bold truncate">
                    {shortenAddress(formData?.receiver_wallet_address)}
                  </div>
                </div>

                <div className="space-y-2 w-[30%]">
                  <h3 className="capitalize text-sm font-lato font-bold">
                    Invoice No
                  </h3>

                  <div className="font-lato text-xs text-[#A8A8A8] font-bold truncate">
                    {formData?.invoice_no}
                  </div>
                </div>
              </div>
            </div>

            {/* Other Detail */}
            <div className="pb-10 border-b border-b-[#EFEFEF] mb-5">
              {/* Header */}
              <div className="pb-5 border-b border-b-[#EFEFEF] flex mb-5">
                <div className="w-[30%]">
                  <h3 className="text-sm font-lato font-bold">Item</h3>
                </div>

                <div className="w-[30%]">
                  <h3 className="text-sm font-lato font-bold">Quantity</h3>
                </div>

                <div className="w-[30%]">
                  <h3 className="text-sm font-lato font-bold">Unit Price</h3>
                </div>

                <div className="w-[10%]">
                  <h3 className="text-sm font-lato font-bold">Total</h3>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                {items?.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="basis-[30%]">
                      <div className="font-lato text-xs text-[#A8A8A8] font-bold truncate">
                        {item?.item_name}
                      </div>
                    </div>

                    <div className="w-[30%]">
                      <div className="font-lato text-xs text-[#A8A8A8] font-bold truncate">
                        {item?.quantity}
                      </div>
                    </div>

                    <div className="w-[30%]">
                      <div className="font-lato text-xs text-[#A8A8A8] font-bold truncate">
                        {item?.unit_price}
                      </div>
                    </div>

                    <div className="w-[10%]">
                      <div className="font-lato text-xs text-[#A8A8A8] font-bold truncate">
                        {formData?.total}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total amount */}
            <div className="pb-16 border-b border-b-[#EFEFEF] mb-5">
              <div className="float-right w-[70%] flex ">
                <div className="w-[42%]">
                  <p className="text-sm font-lato font-bold">
                    Total amoumnt due
                  </p>
                </div>

                <div className="w-1/2">
                  <div className="font-lato text-xs text-[#A8A8A8] font-bold truncate">
                    {formData?.total_amount_due}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment details */}
            <div className="flex">
              <div className="basis-[30%] space-y-3">
                <h3 className="capitalize text-sm font-lato font-bold">
                  Payment Network
                </h3>

                <div className="font-lato text-xs text-[#A8A8A8] font-bold flex gap-2">
                  <Image
                    src={`${formData?.payment_network?.icon || ""}`}
                    width={15}
                    height={15}
                    alt="logo"
                  />

                  <span className="truncate">
                    {formData?.payment_network?.name}
                  </span>
                </div>
              </div>

              <div className="w-[30%] space-y-3">
                <h3 className="capitalize text-sm font-lato font-bold">
                  Payment Currency
                </h3>

                <div className="font-lato text-xs text-[#A8A8A8] font-bold flex gap-2">
                  <Image
                    src={`${formData?.payment_currency?.icon || ""}`}
                    width={15}
                    height={15}
                    alt="logo"
                  />

                  <span className="truncate">
                    {formData?.payment_currency?.name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center">
            <Link href={`/`}>
              <Image
                src={`/Images/logo-small.svg`}
                width={60}
                height={60}
                alt="Graw logo"
              />
            </Link>

            <Link href={`/`} className="text-[13px] text-[#A8A8A8]">
              Usegraw.xyz
            </Link>
          </div>
        </div>
      )}

      {/* Right side */}
      <div className="w-2/5 bg-[#FAFAFA] rounded-lg overflow-scroll scrollable-box p-5 space-y-5 relative">
        {/* Buttons */}
        <div className="space-y-1 pb-10 border-b border-b-[#EFEFEF]">
          <button
            type="button"
            className={`py-2 w-full font-inter font-semibold ${
              status === "pending"
                ? " bg-[#F5E1CE] text-[#D9914E] border border-[#D9914E]"
                : status === "pay invoice"
                ? "text-[#5D9271] bg-[#EFF8D0] border border-[#EFF8D0]"
                : ""
            }  rounded-lg capitalize`}
          >
            {status}
          </button>

          <button
            type="button"
            className="py-2 w-full font-inter font-semibold text-[#5D9271] bg-white border border-[#5D9271] rounded-lg"
          >
            Download Invoice
          </button>

          <button
            type="button"
            className="py-2 w-full font-inter font-semibold text-[#CF5F5F] bg-white border border-[#CF5F5F] rounded-lg"
          >
            Delete Invoice
          </button>
        </div>

        <div className="w-full h-12 flex items-center justify-center text-[#A8A8A8] font-inter font-medium">
          <Link href={`/dashboard`}>Back to dashboard</Link>
        </div>
      </div>
    </>
  );
};

export default ViewInvoiceCard;

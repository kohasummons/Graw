// Components
import ViewInvoiceCard from "./ViewInvoiceCard";
import Footer from "./Footer";

import Link from "next/link";
import Image from "next/image";

const SingleInvoice = () => {
  return (
    <div className="w-3/4 xl:w-3/4 2xl:w-3/5  mx-auto space-y-8 xl:space-y-14">
      {/* Nav */}

      <div className="flex justify-between items-start py-3">
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
      <div className="flex gap-5 items-start relative">
        <div className="absolute -left-16 top-0 space-y-3">
          <Link
            href={`/dashboard`}
            className="flex items-center justify-center p-3 bg-ash rounded-lg cursor-pointer"
          >
            <Image
              src={`/Images/dashboard.svg`}
              width={25}
              height={25}
              alt="Dashboard Icon"
            />
          </Link>

          <Link
            href={`/create-invoice`}
            className="flex items-center justify-center p-3 bg-[#EFF8D0] rounded-lg cursor-pointer"
          >
            <Image
              src={`/Images/plus-icon.svg`}
              width={25}
              height={25}
              alt="Plus Icon"
            />
          </Link>
        </div>

        <ViewInvoiceCard />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SingleInvoice;

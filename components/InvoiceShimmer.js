import React from "react";
import Link from "next/link";
import Image from "next/image";

const shimmerStyles = `
  @keyframes shimmerAnimation {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
  .shimmer-bg {
    background: linear-gradient(
      90deg,
      #e8e8e8 0%,
      #f5f5f5 50%,
      #e8e8e8 100%
    );
    background-size: 200% 100%;
    animation: shimmerAnimation 4s infinite linear;
  }
`;

const ShimmerBlock = ({ className }) => (
  <div className={`relative overflow-hidden bg-gray-200 ${className}`}>
    <div className="absolute inset-0 shimmer-bg"></div>
  </div>
);

export default function InvoiceShimmer() {
  React.useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = shimmerStyles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="w-3/5 bg-[#FAFAFA] h-[75vh] rounded-lg overflow-scroll scrollable-box p-7 space-y-10 relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-[64px] font-lato font-semibold">Invoice</h2>
        <ShimmerBlock className="w-[90px] h-[90px] rounded-xl" />
      </div>

      {/* Content */}
      <div className="h-1/2 xl:h-[65%] 2xl:h-[72%] overflow-y-scroll overflow-x-hidden scrollable-box">
        {/* Dates */}
        <div className="pb-7 border-b border-b-[#EFEFEF] mb-10">
          <div className="flex">
            <div className="space-y-2 w-[30%]">
              <ShimmerBlock className="h-4 w-24" />
              <ShimmerBlock className="h-3 w-32" />
            </div>
            <div className="space-y-2 w-[30%]">
              <ShimmerBlock className="h-4 w-24" />
              <ShimmerBlock className="h-3 w-32" />
            </div>
          </div>
        </div>

        {/* Invoice info */}
        <div className="pb-7 border-b border-b-[#EFEFEF] mb-5">
          <div className="flex">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="space-y-2 w-[30%]">
                <ShimmerBlock className="h-4 w-24" />
                <ShimmerBlock className="h-3 w-32" />
                <ShimmerBlock className="h-3 w-40" />
              </div>
            ))}
          </div>
        </div>

        {/* Other Detail */}
        <div className="pb-10 border-b border-b-[#EFEFEF] mb-5">
          {/* Header */}
          <div className="pb-5 border-b border-b-[#EFEFEF] flex mb-5">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`w-${index === 3 ? "[10%]" : "[30%]"}`}
              >
                <ShimmerBlock className="h-4 w-20" />
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="space-y-3">
            {[...Array(3)].map((_, rowIndex) => (
              <div key={rowIndex} className="flex">
                {[...Array(4)].map((_, colIndex) => (
                  <div
                    key={colIndex}
                    className={`w-${colIndex === 3 ? "[10%]" : "[30%]"}`}
                  >
                    <ShimmerBlock className="h-3 w-24" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Total amount */}
        <div className="pb-16 border-b border-b-[#EFEFEF] mb-5">
          <div className="float-right w-[70%] flex">
            <div className="w-[42%]">
              <ShimmerBlock className="h-4 w-32" />
            </div>
            <div className="w-1/2">
              <ShimmerBlock className="h-3 w-24" />
            </div>
          </div>
        </div>

        {/* Payment details */}
        <div className="flex">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="w-[30%] space-y-3">
              <ShimmerBlock className="h-4 w-32" />
              <div className="flex gap-2">
                <ShimmerBlock className="h-4 w-4 rounded-full" />
                <ShimmerBlock className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <Link href={`/`}>
          <Image
            src={`/Images/logo-small.svg`}
            width={40}
            height={40}
            alt="Graw logo"
          />
        </Link>

        <Link href={`/`} className="text-[10px] text-[#A8A8A8]">
          graw.xyz
        </Link>
      </div>
    </div>
  );
}

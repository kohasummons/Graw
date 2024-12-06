"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "./Footer";

import Image from "next/image";

const Landing = () => {
  const [isLoggedIn, setIsLogged] = useState(true);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute right-0 h-full">
        <Image
          src={`/Images/Group-5.svg`}
          alt="SVG"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="absolute right-0 bottom-0 h-1/5 w-1/2 z-10">
        <Image
          src={`/Images/Group-6.svg`}
          alt="SVG"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="absolute bottom-0 right-0 h-screen">
        <svg
          width="191"
          height="1117"
          viewBox="0 0 191 1117"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.3925 72.5144C5.96715 72.5816 0.703914 67.4274 0.636706 61.002L0.122387 11.8314C0.0551787 5.40607 5.20947 0.142826 11.6348 0.0756179L83.0633 -0.671515C83.6376 -0.727238 84.219 -0.758713 84.8067 -0.76486L182.928 -1.7912C193.961 -1.9066 202.998 6.94325 203.113 17.9754L206.842 374.462C206.957 385.494 198.107 394.531 187.075 394.647L88.9534 395.673V395.673C88.4612 395.678 88.0546 396.073 88.0597 396.566L88.61 449.172C88.7254 460.204 79.8756 469.241 68.8434 469.356L28.4532 469.779C17.421 469.894 8.38413 461.044 8.26873 450.012L5.70632 205.037C5.59093 194.005 14.4407 184.968 25.4729 184.853L65.8631 184.43V184.43C66.3553 184.425 66.7619 184.03 66.7568 183.538L65.794 91.4945C65.6812 80.7048 56.8429 72.0495 46.0531 72.1623L12.3925 72.5144Z"
            fill="#F7F7F7"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M60.9378 1115.91C61.0532 1126.94 70.0901 1135.79 81.1223 1135.67L179.244 1134.65C190.276 1134.53 199.126 1125.49 199.011 1114.46L195.643 792.515C195.546 783.276 203.18 775.575 208.082 767.744C210.039 764.617 211.154 760.912 211.113 756.95L208.55 511.976V511.976C208.488 506.062 212.704 496.826 218.618 496.764L238.198 496.559C244.623 496.492 249.777 491.229 249.71 484.803L249.196 435.633C249.128 429.207 243.865 424.053 237.44 424.12L122.635 425.321C116.21 425.388 111.056 430.652 111.123 437.077L111.637 486.248C111.704 492.673 116.968 497.827 123.393 497.76V497.76C127.384 497.718 129.973 503.462 128.917 507.311C128.437 509.063 128.189 510.91 128.209 512.816L130.367 719.138C130.48 729.928 121.825 738.766 111.035 738.879L76.9756 739.235C65.9434 739.351 57.0936 748.388 57.209 759.42L60.9378 1115.91Z"
            fill="#F7F7F7"
          />
        </svg>
      </div>
      <div
        className="absolute left-[30%] top-1/3 transform -translate-x-[30%] -translate-y-1/3 
      flex gap-x-5 items-start"
      >
        <div>
          <Image
            src={`/Images/logo.svg`}
            width={90}
            height={90}
            alt="Graw logo"
          />
        </div>

        <div className="space-y-7">
          <div>
            {" "}
            <h1 className="font-lato text-[96px] font-bold leading-none">Graw</h1>
            <p className="text-faded-text font-inter font-medium text-3xl mt-1 ml-1">
              Create Invoice. Send. Get Paid <br /> Instantly — No strings
              attached
            </p>
          </div>

          {isLoggedIn ? (
            <div className="flex gap-2 items-center ml-1">
              <Link
                href="/create-invoice"
                className="bg-[#EFF8D0] p-2 font-inter font-semibold rounded-lg text-[#5D9271]"
              >
                Create Invoice
              </Link>

              <span className="bg-[#EFF8D0] p-2 flex items-center justify-center rounded-lg">
                <Image
                  src={`/Images/profile.svg`}
                  width={20}
                  height={20}
                  alt="Profile"
                />
              </span>
            </div>
          ) : (
            <button
              type="button"
              className="bg-[#EFF8D0] py-2 px-8 font-inter font-semibold rounded-lg text-[#5D9271]"
            >
              Log In
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;

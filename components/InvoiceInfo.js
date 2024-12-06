"use client";

import { useState } from "react";
import Image from "next/image";

import FormInput from "./FormInput";

import { Trash, Plus, ChevronDown } from "lucide-react";

const InvoiceInfo = ({
  formData,
  setFormData,
  items,
  handleChange,
  handleDelete,
  handleAdd,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [selectedCurrency, setSelectedCurrency] = useState("");
  const CurrencyOptions = [`USD`, `NGN`, `GBP`];

  const handleSelectCurrency = (choice) => {
    setSelectedCurrency(choice);
  };

  const [displaySelectOption, setDisplaySelectOption] = useState(false);

  const handleSelect = () => {
    setDisplaySelectOption(!displaySelectOption);
  };

  //   Payment network
  const [selectedPaymentNetwork, setSelectedPaymentNetwork] = useState("");
  const PaymentNetworkOptions = [
    {
      icon: `/Images/eth-logo.svg`,
      name: `Ethereum Sepolia`,
    },
    {
      icon: `/Images/usdt.svg`,
      name: `USDT`,
    },
  ];

  const handleSelectPaymentNetwork = (choice) => {
    setSelectedPaymentNetwork(choice);
    setFormData((prevData) => ({
      ...prevData,
      [`payment_network`]: choice,
    }));
  };

  const [
    displayPaymentNetworkSelectOption,
    setDisplayPaymentNetworkSelectOption,
  ] = useState(false);

  const handlePaymentNetworkSelect = () => {
    setDisplayPaymentNetworkSelectOption(!displayPaymentNetworkSelectOption);
  };

  //   Payment currency
  const [selectedPaymentCurrency, setSelectedPaymentCurrency] = useState("");
  const PaymentCurrencyOptions = [
    {
      icon: `/Images/eth-logo.svg`,
      name: `Ethereum Sepolia`,
    },
    {
      icon: `/Images/usdt.svg`,
      name: `USDT`,
    },
  ];

  const handleSelectPaymentCurrency = (choice) => {
    setSelectedPaymentCurrency(choice);
    setFormData((prevData) => ({
      ...prevData,
      [`payment_currency`]: choice,
    }));
  };

  const [
    displayPayementCurrencySelectOption,
    setDisplayPayementCurrencySelectOption,
  ] = useState(false);

  const handlePayementCurrencySelect = () => {
    setDisplayPayementCurrencySelectOption(
      !displayPayementCurrencySelectOption
    );
  };

  return (
    <div className="space-y-5">
      {/* HEADER */}
      {/* <div className="space-y-2">
        <h3 className="text-sm font-lato font-bold">Client Information</h3>
        <p className="text-xs text-[#A3A3A3] font-bold font-lato w-[90%]">
          Invoice details about the client and the payment preferences
        </p>
      </div> */}

      {/* Form */}
      <form className="space-y-7">
        <div className="space-y-2">
          <FormInput
            type={`text`}
            name={`receiver_name`}
            label={`Client Name`}
            handleInputChange={handleInputChange}
          />

          <FormInput
            type={`email`}
            name={`receiver_email`}
            label={`Client Email`}
            handleInputChange={handleInputChange}
          />

          <FormInput
            type={`text`}
            name={`receiver_wallet_address`}
            label={`Client Wallet Address`}
            handleInputChange={handleInputChange}
          />
        </div>

        <div className="py-3 border-t border-b border-t-border border-b-border mt-2 space-y-3">
          {items?.map((item, index) => (
            <div key={index} className="flex gap-1 bg-[#F5F5F5] rounded-xl">
              <div className="basis-[90%]">
                {" "}
                <div className=" py-3 px-2 grid grid-cols-4 grid-rows-1 gap-3">
                  <div className="col-span-2">
                    <FormInput
                      type={`text`}
                      name={`item_name`}
                      label={`Item`}
                      value={item.item_name}
                      handleInputChange={(e) => handleChange(e, index)}
                      bgWhite={true}
                    />
                  </div>

                  <div className="col-span-1">
                    <FormInput
                      type={`number`}
                      name={`quantity`}
                      label={`Quantity`}
                      value={item.quantity}
                      handleInputChange={(e) => handleChange(e, index)}
                      bgWhite={true}
                    />
                  </div>

                  <div className="col-span-1">
                    <FormInput
                      type={`number`}
                      name={`unit_price`}
                      label={`Price`}
                      value={item.unit_price}
                      handleInputChange={(e) => handleChange(e, index)}
                      bgWhite={true}
                    />
                  </div>
                </div>
              </div>

              <div
                className="basis-[10%] flex items-center justify-center text-[#A3A3A3] mt-5"
                onClick={() => handleDelete(index)}
              >
                <Trash size={20} />
              </div>
            </div>
          ))}

          <div
            className="bg-[#F5F5F5] rounded-xl py-2 flex justify-center items-center"
            onClick={handleAdd}
          >
            <button
              type="button"
              className="flex gap-2 items-center text-[#0F0F0F] text-xs font-lato"
            >
              Add item
              <Plus size={12} />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-5">
            <FormInput
              type={`date`}
              name={`invoice_date`}
              label={`Invoice Date`}
              handleInputChange={handleInputChange}
            />

            <FormInput
              type={`date`}
              name={`due_date`}
              label={`Due Date`}
              handleInputChange={handleInputChange}
            />
          </div>

          <div className="flex items-center justify-between gap-5">
            <div className="basis-1/2">
              <FormInput
                type={`text`}
                name={`invoice_no`}
                label={`Invoice Number`}
                handleInputChange={handleInputChange}
              />
            </div>

            <div className="space-y-2 font-matter basis-1/2">
              <div className="relative space-y-1">
                <label
                  htmlFor={`${name}`}
                  className="text-[10px] text-[#A3A3A3] font-lato font-bold"
                >
                  Currency
                </label>

                <div
                  className="flex justify-between gap-5 w-full py-2 px-5 rounded-xl
      items-center relative border border-border"
                  onClick={handleSelect}
                >
                  <p className={`text-nav font-lato text-sm font-bold`}>
                    {selectedCurrency || `Select currency`}
                  </p>
                  <ChevronDown size={20} className="text-input" />
                </div>

                {/* Options */}
                {displaySelectOption && (
                  <div
                    className="bg-white border border-border rounded-md space-y-1 px-5 py-3 max-h-52 overflow-scroll 
                  absolute top-16 left-0 w-full z-10"
                  >
                    {CurrencyOptions.map((option, index) => (
                      <p
                        key={index}
                        className="text-black hover:bg-ash hover:p-1 cursor-pointer"
                        onClick={() => {
                          handleSelectCurrency(option);
                          handleSelect();
                        }}
                      >
                        {option}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Payment network */}
          <div className="space-y-2 font-matter basis-1/2">
            <div className="relative space-y-1">
              <label
                htmlFor={`${name}`}
                className="text-[10px] text-[#A3A3A3] font-lato font-bold"
              >
                Payment Network
              </label>

              <div
                className="flex justify-between gap-5 w-full py-2 px-5 rounded-xl
      items-center relative border border-border"
                onClick={handlePaymentNetworkSelect}
              >
                <p
                  className={`text-nav font-lato text-sm font-bold flex gap-2 items-center`}
                >
                  {selectedPaymentNetwork && (
                    <Image
                      src={`${selectedPaymentNetwork?.icon}`}
                      width={15}
                      height={15}
                      alt="logo"
                    />
                  )}
                  {selectedPaymentNetwork?.name || `Select payment network`}
                </p>
                <ChevronDown size={20} className="text-input" />
              </div>

              {/* Options */}
              {displayPaymentNetworkSelectOption && (
                <div
                  className="bg-white border border-border rounded-md space-y-2 px-5 py-3 max-h-52 overflow-scroll 
                  absolute top-16 left-0 w-full z-10"
                >
                  {PaymentCurrencyOptions.map((option, index) => (
                    <p
                      key={index}
                      className="text-black hover:bg-ash rounded-xl hover:p-2 cursor-pointer flex items-center gap-2"
                      onClick={() => {
                        handleSelectPaymentNetwork(option);
                        handlePaymentNetworkSelect();
                      }}
                    >
                      <Image
                        src={`${option?.icon}`}
                        width={15}
                        height={15}
                        alt="logo"
                      />

                      {option?.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Payment currency */}
          <div className="space-y-2 font-matter basis-1/2">
            <div className="relative space-y-1">
              <label
                htmlFor={`${name}`}
                className="text-[10px] text-[#A3A3A3] font-lato font-bold"
              >
                Payment Currency
              </label>

              <div
                className="flex justify-between gap-5 w-full py-2 px-5 rounded-xl
      items-center relative border border-border"
                onClick={handlePayementCurrencySelect}
              >
                <p
                  className={`text-nav font-lato text-sm font-bold flex gap-2 items-center`}
                >
                  {selectedPaymentCurrency && (
                    <Image
                      src={`${selectedPaymentCurrency?.icon}`}
                      width={15}
                      height={15}
                      alt="logo"
                    />
                  )}
                  {selectedPaymentCurrency?.name || `Select payment currency`}
                </p>
                <ChevronDown size={20} className="text-input" />
              </div>

              {/* Options */}
              {displayPayementCurrencySelectOption && (
                <div
                  className="bg-white border border-border rounded-md space-y-2 px-5 py-3 max-h-52 overflow-scroll 
                  absolute top-16 left-0 w-full z-10"
                >
                  {PaymentCurrencyOptions.map((option, index) => (
                    <p
                      key={index}
                      className="text-black hover:bg-ash rounded-xl hover:p-2 cursor-pointer flex items-center gap-2"
                      onClick={() => {
                        handleSelectPaymentCurrency(option);
                        handlePayementCurrencySelect();
                      }}
                    >
                      <Image
                        src={`${option?.icon}`}
                        width={15}
                        height={15}
                        alt="logo"
                      />

                      {option?.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InvoiceInfo;

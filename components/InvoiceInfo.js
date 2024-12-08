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
    setFormData((prevData) => ({
      ...prevData,
      [`currency`]: choice,
    }));
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
      icon: `/Images/eth-logo.svg`,
      name: `Etherium Mainnet`,
    },
    {
      icon: `/Images/eth-logo.svg`,
      name: `Gnosis`,
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
      icon: `/Images/usdt.svg`,
      name: `USDT`,
    },
    {
      icon: `/Images/usdt.svg`,
      name: `ETH`,
    },
    {
      icon: `/Images/usdt.svg`,
      name: `USDC`,
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
            value={formData.receiver_name}
            handleInputChange={handleInputChange}
          />

          <FormInput
            type={`email`}
            name={`receiver_email`}
            label={`Client Email`}
            value={formData.receiver_email}
            handleInputChange={handleInputChange}
          />

          <FormInput
            type={`text`}
            name={`receiver_wallet_address`}
            label={`Client Wallet Address`}
            value={formData.receiver_wallet_address}
            handleInputChange={handleInputChange}
          />
        </div>

        <div className="border-t border-b border-t-border border-b-border mt-2 py-10 space-y-5">
          <div className="bg-[#F5F5F5] rounded-xl p-5">
            <div className="px-2 grid grid-cols-4 grid-rows-1 gap-3">
              <span className="text-[10px] text-[#A3A3A3] font-lato font-bold col-span-2">
                Item
              </span>
              <span className="text-[10px] text-[#A3A3A3] font-lato font-bold text-start col-span-1">
                Quantity
              </span>
              <span className="text-[10px] text-[#A3A3A3] font-lato font-bold col-span-1">
                Price
              </span>
            </div>

            {items?.map((item, index) => (
              <div key={index} className="flex gap-1 rounded-xl">
                <div className="basis-[90%]">
                  {" "}
                  <div className=" py-3 px-2 grid grid-cols-4 grid-rows-1 gap-3">
                    <div className="col-span-2">
                      <FormInput
                        type={`text`}
                        name={`item_name`}
                        // label={`Item`}
                        value={item.item_name}
                        handleInputChange={(e) => handleChange(e, index)}
                        bgWhite={true}
                      />
                    </div>

                    <div className="col-span-1">
                      <FormInput
                        type={`number`}
                        name={`quantity`}
                        // label={`Quantity`}
                        value={item.quantity}
                        handleInputChange={(e) => handleChange(e, index)}
                        bgWhite={true}
                      />
                    </div>

                    <div className="col-span-1">
                      <FormInput
                        type={`number`}
                        name={`unit_price`}
                        // label={`Price`}
                        value={item.unit_price}
                        handleInputChange={(e) => handleChange(e, index)}
                        bgWhite={true}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="basis-[10%] flex items-center justify-center text-[#A3A3A3]"
                  onClick={() => handleDelete(index)}
                >
                  <Trash size={20} />
                </div>
              </div>
            ))}
          </div>

          <div
            className="bg-[#F5F5F5] rounded-xl py-5 flex justify-center items-center"
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
              value={formData.invoice_date}
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
                value={formData.invoice_no}
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
                    {formData.currency || `Select currency`}
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
                  {formData.payment_network && (
                    <Image
                      src={`${formData.payment_network?.icon}`}
                      width={15}
                      height={15}
                      alt="logo"
                    />
                  )}
                  {formData.payment_network?.name || `Select payment network`}
                </p>
                <ChevronDown size={20} className="text-input" />
              </div>

              {/* Options */}
              {displayPaymentNetworkSelectOption && (
                <div
                  className="bg-white border border-border rounded-md space-y-2 px-5 py-3 max-h-52 overflow-scroll 
                  absolute top-16 left-0 w-full z-10"
                >
                  {PaymentNetworkOptions.map((option, index) => (
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
                  {formData.payment_currency && (
                    <Image
                      src={`${formData.payment_currency?.icon}`}
                      width={15}
                      height={15}
                      alt="logo"
                    />
                  )}
                  {formData.payment_currency?.name || `Select payment currency`}
                </p>
                <ChevronDown size={20} className="text-input" />
              </div>

              {/* Options */}
              {displayPayementCurrencySelectOption && (
                <div
                  className="bg-white border border-border rounded-md space-y-2 px-5 py-3 max-h-52 overflow-scroll 
                  absolute bottom-10 left-0 w-full z-10"
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

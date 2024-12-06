import FormInput from "./FormInput";

import { Trash, Plus } from "lucide-react";

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
    console.log(formData);
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
      </form>
    </div>
  );
};

export default InvoiceInfo;

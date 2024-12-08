'use client';

// Library imports
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccount, useWalletClient } from 'wagmi';
import { createRequest, prepareRequest } from '@/requestNetwork';
import { toast } from 'react-hot-toast';

// Components
import FieldPlaceholder from './FieldPlaceholder';
import SenderInfo from './SenderInfo';
import InvoiceInfo from './InvoiceInfo';

// Icons
import {
  ScrollText,
  Newspaper,
  LayoutPanelTop,
  ArrowRight,
} from 'lucide-react';

const CreateInvoiceCard = () => {
  const { address } = useAccount();
  //  Form
  const [formData, setFormData] = useState({});
  const [img, setImg] = useState('/Images/logo-black.svg');

  const [items, setItems] = useState([
    {
      item_name: '',
      quantity: '',
      unit_price: '',
      total: 0,
    },
  ]);
  const { data: walletClient } = useWalletClient();

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;

    updatedItems[index].total =
      updatedItems[index].quantity * updatedItems[index].unit_price;

    setItems(updatedItems);
  };

  const handleAdd = () => {
    setItems([...items, { item_name: '', quantity: '', unit_price: '' }]);
  };

  const handleDelete = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const total = items.reduce((acc, item) => acc + item.total, 0);
    setGrandTotal(total);
    setFormData((prevData) => ({
      ...prevData,
      [`total_amount_due`]: total,
    }));
  }, [items]);

  const tabs = [
    {
      id: 0,
      label: 'Your information',
      icon: <Newspaper size={14} />,
      content: (
        <SenderInfo
          formData={formData}
          setFormData={setFormData}
          img={img}
          setImg={setImg}
        />
      ),
    },
    {
      id: 1,
      label: 'New Invoice',
      icon: <ScrollText size={14} />,
      content: (
        <InvoiceInfo
          formData={formData}
          setFormData={setFormData}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
          handleChange={handleChange}
          items={items}
        />
      ),
    },
    {
      id: 2,
      label: 'Templates',
      icon: <LayoutPanelTop size={14} />,
      content: <h1>Content 3</h1>,
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  function shortenAddress(address) {
    if (!address) return null;

    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    const invoiceItems = items.map((item) => ({
      name: item.item_name,
      quantity: Number(item.quantity),
      unitPrice: (Number(item.unit_price) * 1e18).toString(),
      tax: { type: 'percentage', amount: '0' },
      currency: formData.currency,
    }));

    const {
      sender_wallet_address,
      receiver_wallet_address,
      receiver_email,
      sender_email,
      receiver_name,
      sender_name,
      payment_currency,
      total_amount_due,
      invoice_date,
      invoice_no,
      due_date,
    } = formData;
    const sellerInfo = {
      businessName: sender_name,
      email: sender_email,
    };
    const buyerInfo = {
      businessName: receiver_name,
      email: receiver_email,
    };
    const miscellaneous = {
      dueDate: due_date,
    };
    const invoiceDetails = {
      creationDate: new Date(invoice_date).toISOString(),
      invoiceNumber: invoice_no,
      invoiceItems,
      sellerInfo,
      buyerInfo,
      miscellaneous,
    };
    try {
      const requestParams = prepareRequest({
        currency: payment_currency,
        payerAddress: receiver_wallet_address,
        payeeAddress: sender_wallet_address,
        amount: (Number(total_amount_due) * 1e18).toString(),
        invoiceDetails,
      });

      const request = await createRequest({
        requestParams,
        walletProvider: walletClient,
      });

      console.log('Request created:', request);
      toast.success('Invoice created successfully');

      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 3000);
    } catch (error) {
      console.error('Error creating request:', error);
      toast.error('Invoice creation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const router = useRouter();

  const returnToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <>
      {/* Left side */}
      <div className='w-3/5 bg-[#FAFAFA] h-[75dvh] rounded-lg overflow-scroll scrollable-box p-7 space-y-10 relative'>
        {/* header */}
        <div className='flex justify-between items-center sticky'>
          <h2 className='text-[64px] font-lato font-semibold'>Invoice</h2>

          {img ? (
            <Image
              src={`${img}`}
              width={90}
              height={90}
              alt='Graw Logo black'
            />
          ) : (
            <div className='w-[90px] h-[90px] rounded-xl border border-border'></div>
          )}
        </div>

        {/* Content */}
        <div className='space-y-10'>
          <div>
            {/* Dates */}
            <div className='pb-7 border-b border-b-[#EFEFEF] mb-10'>
              <div className='flex gap-5'>
                <div className='space-y-2 w-[25%]'>
                  <h3 className='capitalize text-sm font-lato font-bold'>
                    Invoice Date
                  </h3>

                  <div className='font-lato text-xs text-[#A8A8A8] font-bold truncate'>
                    {formData?.invoice_date || <FieldPlaceholder />}
                  </div>
                </div>

                <div className='space-y-2 w-[25%]'>
                  <h3 className='capitalize text-sm font-lato font-bold'>
                    Due Date
                  </h3>

                  <div className='font-lato text-xs text-[#A8A8A8] font-bold truncate'>
                    {formData?.due_date || <FieldPlaceholder />}
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice info */}
            <div className='pb-7 border-b border-b-[#EFEFEF] mb-5'>
              <div className='flex gap-5'>
                <div className='space-y-2 w-[25%]'>
                  <h3 className='capitalize text-sm font-lato font-bold'>
                    From
                  </h3>

                  <div>
                    <div className='font-lato text-xs text-[#A8A8A8] font-bold truncate'>
                      {formData?.sender_name || <FieldPlaceholder />}
                    </div>
                    <div className='font-lato text-xs text-[#A8A8A8] font-bold truncate'>
                      {formData?.sender_email || <FieldPlaceholder />}
                    </div>
                  </div>

                  <div className='font-lato text-xs text-[#A8A8A8] font-bold truncate'>
                    {shortenAddress(
                      address ?? formData?.sender_wallet_address
                    ) || <FieldPlaceholder />}
                  </div>
                </div>

                <div className='space-y-2 basis-[25%] truncate'>
                  <h3 className='capitalize text-sm font-lato font-bold'>To</h3>

                  <div className='w-full overflow-x-hidden'>
                    <div className='font-lato text-xs text-[#A8A8A8] font-bold truncate '>
                      {formData?.receiver_name || <FieldPlaceholder />}
                    </div>

                    <div className='font-lato text-xs text-[#A8A8A8] font-bold truncate '>
                      {formData?.receiver_email || <FieldPlaceholder />}
                    </div>
                  </div>

                  <div className='font-lato text-xs text-[#A8A8A8] font-bold truncate'>
                    {shortenAddress(formData?.receiver_wallet_address) || (
                      <FieldPlaceholder />
                    )}
                  </div>
                </div>

                <div className='space-y-2 w-[30%]'>
                  <h3 className='capitalize text-sm font-lato font-bold'>
                    Invoice No
                  </h3>

                  <div className='font-lato text-xs text-[#A8A8A8] font-bold truncate'>
                    {formData?.invoice_no || <FieldPlaceholder />}
                  </div>
                </div>
              </div>
            </div>

            {/* Other Detail */}
            <div className='pb-10 border-b border-b-[#EFEFEF] mb-5'>
              {/* Header */}
              <div className='pb-5 border-b border-b-[#EFEFEF] flex gap-5 mb-5'>
                <div className='w-[25%]'>
                  <h3 className='text-sm font-lato font-bold'>Item</h3>
                </div>

                <div className='w-[25%]'>
                  <h3 className='text-sm font-lato font-bold'>Quantity</h3>
                </div>

                <div className='w-[25%]'>
                  <h3 className='text-sm font-lato font-bold'>Unit Price</h3>
                </div>

                <div className='w-[15%]'>
                  <h3 className='text-sm font-lato font-bold'>Total</h3>
                </div>
              </div>

              {/* Content */}
              <div className='space-y-3'>
                {items?.map((item, index) => (
                  <div key={index} className='flex gap-5'>
                    <div className='w-[25%]'>
                      <div className='font-lato text-xs text-[#A8A8A8] font-bold truncate'>
                        {item?.item_name || <FieldPlaceholder />}
                      </div>
                    </div>

                    <div className='w-[25%]'>
                      <div className='font-lato text-xs text-[#A8A8A8] font-bold truncate'>
                        {item?.quantity || <FieldPlaceholder />}
                      </div>
                    </div>

                    <div className='w-[25%]'>
                      <div className='font-lato text-xs text-[#A8A8A8] font-bold truncate'>
                        <span className='text-[8px]'>{formData.currency}</span>{' '}
                        {item?.unit_price || <FieldPlaceholder />}
                      </div>
                    </div>

                    <div className='w-[15%]'>
                      <div className='font-lato text-xs text-[#A8A8A8] font-bold truncate'>
                        <span className='text-[8px]'>{formData.currency}</span>{' '}
                        {item?.total || <FieldPlaceholder />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total amount */}
            <div className='pb-16 border-b border-b-[#EFEFEF] mb-5'>
              <div className='float-right w-[71%] flex items-end'>
                <div className='w-[40%]'>
                  <p className='text-sm font-lato font-bold'>
                    Total amoumnt due
                  </p>
                </div>

                <div className='w-1/2'>
                  <div className='font-lato text-3xl text-[#A8A8A8] font-bold truncate'>
                    <span className='text-sm'>{formData.currency}</span>{' '}
                    {formData?.total_amount_due || <FieldPlaceholder />}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment details */}
            <div className='flex gap-5'>
              <div className='basis-[25%] space-y-3'>
                <h3 className='capitalize text-sm font-lato font-bold'>
                  Payment Network
                </h3>

                <div className='font-lato text-xs text-[#A8A8A8] font-bold flex gap-2'>
                  {formData?.payment_network ? (
                    <Image
                      src={`${formData?.payment_network?.icon}`}
                      width={15}
                      height={15}
                      alt='logo'
                    />
                  ) : (
                    <FieldPlaceholder />
                  )}

                  <span className='truncate'>
                    {formData?.payment_network?.name || <FieldPlaceholder />}
                  </span>
                </div>
              </div>

              <div className='w-[25%] space-y-3'>
                <h3 className='capitalize text-sm font-lato font-bold'>
                  Payment Currency
                </h3>

                <div className='font-lato text-xs text-[#A8A8A8] font-bold flex gap-2'>
                  {formData?.payment_currency ? (
                    <Image
                      src={`${formData?.payment_currency?.icon}`}
                      width={15}
                      height={15}
                      alt='logo'
                    />
                  ) : (
                    <FieldPlaceholder />
                  )}

                  <span className='truncate'>
                    {formData?.payment_currency?.name || <FieldPlaceholder />}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className='flex justify-between items-center bottom-0'>
            <Link href={`/`}>
              <Image
                src={`/Images/logo-small.svg`}
                width={60}
                height={60}
                alt='Graw logo'
              />
            </Link>

            <Link href={`/`} className='text-[13px] text-[#A8A8A8]'>
              Usegraw.xyz
            </Link>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className='w-2/5 bg-[#FAFAFA] h-[75vh] rounded-lg overflow-scroll scrollable-box p-4 space-y-5 relative'>
        {isSuccess ? (
          <div
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform
            w-3/4 space-y-3'
          >
            <div className='flex gap-2 items-center justify-center'>
              <span className='text-xl font-lato font-bold text-[#141414]'>
                Invoice Created
              </span>
              <Image
                src={`/Images/check.svg`}
                width={24}
                height={24}
                alt='Loading'
              />
            </div>
            <p className=' text-center text-sm font-lato font-bold text-[#808080]'>
              The invoice has been successfully created and sent to the
              client&apos;s wallet address.
            </p>

            <div className='flex justify-center items-center gap-2'>
              <div className='p-2 border border-[#5D9271] rounded-lg flex items-center justify-center'>
                <Image
                  src={`/Images/download.svg`}
                  width={24}
                  height={24}
                  alt='Download icon'
                />
              </div>

              <button
                type='button'
                className='p-3 bg-[#EFF8D0] text-[#5D9271] font-inter font-semibold rounded-xl'
                onClick={returnToDashboard}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <>
            {isLoading ? (
              <div
                className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform
             flex gap-2 items-center justify-center w-full'
              >
                <span className='text-xl font-lato font-bold text-[#141414]'>
                  Creating Invoice
                </span>
                <Image
                  src={`/Images/loading.svg`}
                  width={24}
                  height={24}
                  alt='Loading'
                />
              </div>
            ) : (
              <>
                <h2 className='font-bold font-lato text-[#141414] text-xl'>
                  Create Invoice
                </h2>

                {/* Tabs */}
                <div className='flex items-center xl:gap-5 border-b-[#A8A8A8] border-b'>
                  {tabs.map((tab) => (
                    <div
                      key={tab.id}
                      className={`flex gap-2 items-center justify-center p-2 cursor-pointer text-[7px]
                2xl:text-xs xl:text-[9px]  ${
                  activeTab === tab.id ? 'text-[#141414]' : 'text-[#A8A8A8]'
                }  font-bold pb-3  ${
                        activeTab === tab.id
                          ? 'border-b-[#141414] border-b-2'
                          : ''
                      }`}
                      onClick={() => handleTabClick(tab.id)}
                    >
                      {tab.icon}
                      {tab.label}
                    </div>
                  ))}
                </div>

                {activeTab === 0 ? (
                  <div className='space-y-2'>
                    <h3 className='text-sm font-lato font-bold'>Information</h3>
                    <p className='text-xs text-[#A3A3A3] font-bold font-lato w-[90%]'>
                      Set your invoice details to be automatically applied every
                      time you create a new invoice
                    </p>
                  </div>
                ) : activeTab === 1 ? (
                  <div className='space-y-2'>
                    <h3 className='text-sm font-lato font-bold'>
                      Client Information
                    </h3>
                    <p className='text-xs text-[#A3A3A3] font-bold font-lato w-[90%]'>
                      Invoice details about the client and the payment
                      preferences
                    </p>
                  </div>
                ) : (
                  ''
                )}

                {/* Content */}
                <div className='h-2/5 xl:h-[55%] 2xl:h-[68%] overflow-scroll scrollable-box'>
                  {tabs[activeTab].content}
                </div>

                {/* Footer */}
                <div
                  className={`absolute lg:bottom-2 xl:bottom-5 right-4 ${
                    activeTab === 0 ? '' : ''
                  } flex gap-2`}
                >
                  <button
                    className='bg-[#E7E7E7] text-[#A3A3A3] 
           font-inter font-semibold py-2 px-4 rounded-lg'
                  >
                    Cancel
                  </button>

                  {activeTab == 0 ? (
                    <button
                      className='bg-[#EFF8D0] text-[#5D9271] font-inter font-semibold py-2 px-4 rounded-lg
          flex gap-2 items-center'
                      onClick={() => handleTabClick(1)}
                    >
                      Continue
                      <ArrowRight size={20} />
                    </button>
                  ) : (
                    <button
                      className='bg-[#EFF8D0] text-[#5D9271] font-inter font-semibold py-2 px-4 rounded-lg
          flex gap-2 items-center'
                      onClick={handleSubmit}
                    >
                      Create Invoice
                    </button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CreateInvoiceCard;

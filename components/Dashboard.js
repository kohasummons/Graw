'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import { ArrowDownToLine } from 'lucide-react';
import { getRequestsByWalletAddress } from '@/requestNetwork';
import { useWalletClient } from 'wagmi';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatEther } from 'viem';

export const shortenRequestId = (requestId) => {
  if (!requestId) return null;
  return requestId.slice(0, 6) + '...' + requestId.slice(-6);
};

export const formatInvoice = (invoice, address) => {
  if (!invoice) return null;
  const buyerInfo = {
    name:
      invoice.payer?.value == address
        ? 'You'
        : invoice.contentData?.buyerInfo?.businessName,
    address: invoice.payer?.value,
    email: invoice.contentData.buyerInfo?.email,
  };
  const sellerInfo = {
    name:
      invoice.payee?.value == address
        ? 'You'
        : invoice.contentData?.sellerInfo?.businessName,
    address: invoice.payee?.value,
    email: invoice.contentData.sellerInfo?.email,
  };
  const status =
    invoice.balance?.balance === invoice.expectedAmount ? 'Paid' : 'Pending';
  const dueDate = new Date(
    invoice.contentData?.miscellaneous.dueDate
  ).toLocaleDateString();
  const items = invoice.contentData?.invoiceItems?.map((item) => ({
    ...item,
    total: Number(item.quantity) * Number(item.unitPrice),
  }));
  return {
    id: invoice.requestId,
    amount: invoice.expectedAmount,
    date: new Date(invoice.contentData?.creationDate).toLocaleDateString(),
    buyerInfo,
    sellerInfo,
    status,
    dueDate,
    items,
  };
};

const Dashboard = () => {
  const { data: walletClient } = useWalletClient();
  const [invoices, setInvoices] = useState([]);
  const [dashboardData, setDashboardData] = useState([
    { name: 'Total No of Invoice', value: null },
    { name: 'Pending Invoice', value: null },
    { name: 'Paid Invoice', value: null },
    { name: 'Total Revenue', value: null },
  ]);

  const router = useRouter();
  const pathname = usePathname();
  const address = walletClient?.account?.address;

  const viewInvoice = (id) => {
    router.push(`/dashboard/single-invoice/${id}`);
  };

  const getInvoices = useCallback(async () => {
    const res = await getRequestsByWalletAddress(address);
    const totalNumber = res.length;
    const pending = res.filter((item) => item.balance?.balance === '0');
    const paid = res.filter(
      (item) => item.balance?.balance === item.expectedAmount
    );
    const totalRevenue = res
      .filter((item) => item.payee?.value == address)
      .reduce((total, item) => total + Number(item.expectedAmount), 0);
    setDashboardData([
      { name: 'Total No of Invoice', value: totalNumber ?? 0 },
      { name: 'Pending Invoice', value: pending.length ?? 0 },
      { name: 'Paid Invoice', value: paid.length ?? 0 },
      { name: 'Total Revenue', value: formatEther(totalRevenue ?? 0) + ' ETH' },
    ]);
    setInvoices(res.map((item) => formatInvoice(item, address)));
  }, [address]);

  useEffect(() => {
    if (address) getInvoices();
  }, [getInvoices, address]);

  return (
    <div className='flex gap-5 items-center relative'>
      <div className='absolute -left-16 top-0 space-y-3'>
        <Link
          href={`/dashboard`}
          className={`flex items-center justify-center p-3 ${
            pathname === '/dashboard' ? 'bg-[#EFF8D0]' : 'bg-ash '
          } rounded-lg cursor-pointer`}
        >
          {pathname === '/dashboard' ? (
            <Image
              src={`/Images/Frame.svg`}
              width={25}
              height={25}
              alt='Dashboard Icon'
            />
          ) : (
            <Image
              src={`/Images/dashboard.svg`}
              width={25}
              height={25}
              alt='Dashboard Icon'
            />
          )}
        </Link>

        <Link
          href={`/create-invoice`}
          className={`flex items-center justify-center p-3 ${
            pathname === '/create-invoice' ? 'bg-[#EFF8D0]' : 'bg-ash '
          } rounded-lg cursor-pointer`}
        >
          {pathname === '/create-invoice' ? (
            <Image
              src={`/Images/plus-icon.svg`}
              width={25}
              height={25}
              alt='Plus Icon'
            />
          ) : (
            <Image
              src={`/Images/CI.svg`}
              width={25}
              height={25}
              alt='Plus Icon'
            />
          )}
        </Link>
      </div>

      <div className='w-full space-y-5'>
        {/* header */}
        <div className='grid grid-cols-4 grid-rows-1 gap-5'>
          {dashboardData.map((data, index) => (
            <div
              key={index}
              className='border border-border rounded-xl p-5 col-span-1 space-y-3'
            >
              <h3 className='text-sm font-bold text-[#A8A8A8] font-lato'>
                {data.name}
              </h3>

              <p className={`text-2xl font-lato font-bold text-[#6E6E6E] `}>
                {data.value ?? ' - '}
              </p>
            </div>
          ))}
        </div>

        {/* table */}
        <div>
          <div className='flex flex-col'>
            <div className='-m-1.5 overflow-x-auto'>
              <div className='p-1.5 min-w-full inline-block align-middle'>
                <div className='overflow-hidden'>
                  <table className='min-w-full divide-y divide-gray-200 dark:divide-neutral-700'>
                    <thead className='bg-[#FAFAFA]'>
                      <tr>
                        <th
                          scope='col'
                          className='px-6 py-3 text-start text-sm font-medium '
                        >
                          Invoice ID
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-start text-sm font-medium '
                        >
                          Date
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-start text-sm font-medium '
                        >
                          From
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-start text-sm font-medium '
                        >
                          To
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-start text-sm font-medium '
                        >
                          Amount
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-start text-sm font-medium '
                        >
                          Status
                        </th>

                        <th
                          scope='col'
                          className='px-6 py-3 text-start text-sm font-medium '
                        ></th>
                      </tr>
                    </thead>

                    <tbody>
                      {invoices.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            className='odd:bg-[#F5F5F5] even:even:bg-[#FAFAFA] cursor-pointer group'
                            onClick={() => viewInvoice(item.id)}
                          >
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-lato font-bold text-[#A8A8A8] '>
                              {shortenRequestId(item.id)}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-lato text-[#A8A8A8] '>
                              {item.date}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-lato text-[#A8A8A8] '>
                              {item?.sellerInfo?.name}
                            </td>

                            <td className='px-6 py-4 whitespace-nowrap text-sm font-lato text-[#A8A8A8] '>
                              {item?.buyerInfo?.name}
                            </td>

                            <td className='px-6 py-4 whitespace-nowrap text-sm font-lato text-[#A8A8A8] '>
                              {formatEther(item.amount)} ETH
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-start text-sm font-lato font-bold'>
                              <span
                                className={`py-1 px-2 ${
                                  item.status == 'Pending'
                                    ? 'bg-[#F5E1CE] text-[#D9914E]'
                                    : 'bg-[#a2efbc] text-[#6bb655]'
                                } text-xs rounded-xl`}
                              >
                                {item.status}
                              </span>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-end text-sm flex justify-end font-lato font-bold'>
                              <ArrowDownToLine
                                className='group-hover:opacity-100 opacity-0 transition-opacity duration-500 hover:text-[#A8A8A8] text-[#A8A8A8]'
                                size={20}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

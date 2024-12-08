'use client';
// Components
import ViewInvoiceCard from './ViewInvoiceCard';

import Link from 'next/link';
import Image from 'next/image';
import { getRequestByID } from '@/requestNetwork';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { formatInvoice } from './Dashboard';
import { useWalletClient } from 'wagmi';

const SingleInvoice = () => {
  const { invoice_id } = useParams();
  const { data: walletClient } = useWalletClient();
  const address = walletClient?.account?.address;
  const [invoice, setInvoice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getInvoice = useCallback(async () => {
    try {
      const request = await getRequestByID(invoice_id);
      console.log('request', request);
      setInvoice(formatInvoice(request, address));
      setIsLoading(false);
      console.log(formatInvoice(request, address));
    } catch (error) {
      console.error(error);
    }
  }, [invoice_id, address]);

  useEffect(() => {
    getInvoice();
  }, [getInvoice]);

  return (
    <div className='flex gap-5 items-start relative'>
      <div className='absolute -left-16 top-0 space-y-3'>
        <Link
          href={`/dashboard`}
          className='flex items-center justify-center p-3 bg-ash rounded-lg cursor-pointer'
        >
          <Image
            src={`/Images/dashboard.svg`}
            width={25}
            height={25}
            alt='Dashboard Icon'
          />
        </Link>

        <Link
          href={`/create-invoice`}
          className='flex items-center justify-center p-3 bg-[#EFF8D0] rounded-lg cursor-pointer'
        >
          <Image
            src={`/Images/plus-icon.svg`}
            width={25}
            height={25}
            alt='Plus Icon'
          />
        </Link>
      </div>

      <ViewInvoiceCard invoice={invoice} isLoading={isLoading} />
    </div>
  );
};

export default SingleInvoice;

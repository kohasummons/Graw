// Components
import CreateInvoiceCard from './CreateInvoiceCard';

import Link from 'next/link';
import Image from 'next/image';

const CreateInvoice = () => {
  return (
    <div className='flex gap-5 items-center relative'>
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

      <CreateInvoiceCard />
    </div>
  );
};

export default CreateInvoice;

import { ConnectButton } from '@rainbow-me/rainbowkit';

import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <div className='flex justify-between items-center py-3'>
      {/* Brand */}
      <Link href={`/`} className='flex items-center gap-2'>
        <Image
          src={`/Images/logo.svg`}
          width={35}
          height={35}
          alt='Graw logo'
        />
        <h1 className='font-lato text-3xl font-bold'>Graw</h1>
      </Link>

      <div className='flex gap-2 items-center'>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Header;

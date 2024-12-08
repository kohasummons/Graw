'use client';

import { useState } from 'react';
import Image from 'next/image';

import FormInput from './FormInput';

const SenderInfo = ({ formData, setFormData, img, setImg }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  //   const [img, setImg] = useState("");
  const [imgName, setImgName] = useState('');
  const [imgSize, setImgSize] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImg(event.target.result);
        setImgName(file.name);
        setImgSize(file.size);
        console.log(imgName);
      };

      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: file,
      }));

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='space-y-5'>
      {/* HEADER */}
      {/* <div className="space-y-2">
        <h3 className="text-sm font-lato font-bold">Information</h3>
        <p className="text-xs text-[#A3A3A3] font-bold font-lato w-[90%]">
          Set your invoice details to be automatically applied every time you
          create a new invoice
        </p>
      </div> */}

      {/* Form */}
      <form className='space-y-2'>
        <FormInput
          type={`text`}
          name={`sender_name`}
          label={`Personal Name`}
          handleInputChange={handleInputChange}
        />

        <FormInput
          type={`email`}
          name={`sender_email`}
          label={`Personal Email`}
          handleInputChange={handleInputChange}
        />

        <div className='flex gap-2 items-end'>
          <div className='basis-[90%]'>
            <FormInput
              type={`text`}
              name={`sender_wallet_address`}
              label={`Wallet Address`}
              handleInputChange={handleInputChange}
            />
          </div>

          <div className='rounded-xl flex justify-center items-center p-2 h-[40px] border border-[#E7E7E7]'>
            <Image
              src={`/Images/wallet-dis.svg`}
              width={24}
              height={24}
              alt='Icon'
            />
          </div>
        </div>

        <div className='space-y-2 text-sm font-matter cursor-pointer'>
          <p className='text-[10px] text-[#A3A3A3] font-lato font-bold'>Logo</p>
          <div className='bg-ash p-2 border border-border rounded-xl'>
            <label
              htmlFor={`profile_image`}
              className='flex justify-between text-sm items-center px-2'
            >
              <div className='flex gap-2 items-center'>
                <div className='h-[70px] w-[70px] flex items-center justify-center relative border border-border rounded-xl'>
                  {' '}
                  {img && (
                    <Image
                      src={`${img}`}
                      alt={`${imgName}`}
                      layout='fill'
                      objectFit='cover'
                    />
                  )}
                </div>

                <div>
                  {imgName ? (
                    <>
                      <p className='text-sm text-[#A3A3A3] font-lato font-bold capitalize'>
                        {imgName}
                      </p>
                      <p className='text-sm text-[#A3A3A3] font-lato font-bold'>
                        {imgSize}kb
                      </p>
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor={`profile_image`}
                  className=' py-2 px-4 cursor-pointer
                  flex items-center justify-center'
                >
                  <Image
                    src={`/Images/choosseImage.svg`}
                    width={15}
                    height={15}
                    alt='chane image icon'
                  />
                </label>
              </div>
            </label>

            <input
              type='file'
              name='profile_image'
              id='profile_image'
              className='hidden'
              onChange={handleImageChange}
              accept='.jpeg, .jpg, .png, .svg'
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SenderInfo;

import Image from "next/image";

const Footer = () => {
  return (
    <div
      className="absolute left-[30%] bottom-2 xl:bottom-5 transform -translate-x-[30%]  
flex gap-x-2 items-center"
    >
      <p className="text-sm font-inter text-faded-text font-medium">
        Powered by
      </p>

      <Image src={`/Images/Rq.svg`} width={40} height={40} alt="Rq logo" />
    </div>
  );
};

export default Footer;

import Image from "next/image";
export default function Header() {
  return (
    <div
      style={{ writingMode: "vertical-rl" }}
      className="flex absolute  items-center "
    >
      <div className="flex bg-[#101828] cursor-pointer justify-center rounded-md w-[50px] h-[96px] items-center gap-x-2">
        <p className="text-base font-normal text-text-primary">Follow</p>
        <Image src="/images/x.svg" width={20} height={23} alt="x" />
      </div>
      <div
        style={{ boxShadow: "0px -7px 12px 0px #00000040" }}
        className="flex items-center cursor-pointer bg-[#101828] justify-center rounded-md w-[50px] h-[96px] gap-x-2"
      >
        <p className="text-base font-normal text-text-primary">Chat</p>
        <Image src="/images/telegram.svg" width={23} height={23} alt="x" />
      </div>
    </div>
  );
}

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
export default function ConnectWallet() {
  return (
    <div className="p-[1px] ml-auto w-max mt-6 rounded-[30px] mb-2 h-max bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%">
      <div className="  relative  w-max flex bg-background-container items-center rounded-[30px] ">
        <WalletMultiButton
          style={{
            borderRadius: "30px",
            height: "30px",
            position: "relative",
            minWidth: "170px",
            zIndex: 20,
            background: "transparent",
            border: "1px solid #777777",
          }}
        />
        <div className=" absolute z-10 right-2 ">
          <Image src="/images/downmenu1.svg" width={15} height={10} alt="img" />
        </div>
      </div>
    </div>
  );
}

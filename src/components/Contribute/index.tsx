import controllers from "@/controllers";
import Swap from "./swap";
import { useQuery } from "@tanstack/react-query";
import Header from "./header";
import Donation from "./donation";
import MultiSig from "./multiSig";
import Image from "next/image";
import toast from "react-hot-toast";
function Latest() {
  return (
    <div className="w-full absolute bottom-0 px-4 rounded-md mb-3 ">
      <div className="flex items-center gap-x-1">
        <p className="text-xs font-medium text-text-latest">
          Latest Contributions
        </p>
        <Image src="/images/sidearrow.svg" width={8} height={8} alt="img" />{" "}
      </div>
      <div className="w-[30px] h-[30px] absolute z-10 left-[-7px] blur-[9px] top-6 bg-black"></div>
      <div className="flex items-center cursor-pointer py-2 scroll gap-x-4 w-full relative overflow-x-scroll">
        {[1, 2, 34, 5, 6, 7, 8, 9].map((item, i) => (
          <div
            style={{ boxShadow: "1px 1px 7.800000190734863px -6px #ffff" }}
            className="bg-background-latest flex items-center gap-x-1 px-2 min-w-[148px] max-w-[148px] h-[28px] rounded-[15px] border border-border-latest"
          >
            <p className="text-xs font-medium text-text-menu underline underline-offset-2 decoration-2 decoration-[#273044] decoration-dashed">
              15340 BONK
            </p>
            <p className="text-xs font-medium opacity-80 text-text-menu dotted">
              {"(1 hr ago)"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default function Contribute() {
  const campaign = useQuery({
    queryKey: "campaign",
    queryFn: async () => {
      const req = await controllers.getCampaign();
      const res = req.json();
      return res;
    },
    onSuccess: (data) => {
      if (data?.status === "error") {
        toast.error(data?.message);
      }
    },
    refetchOnWindowFocus: false,
  });
  console.log(campaign.data, "campaign");
  return (
    <div className="w-[50%] overflow-hidden flex flex-col relative justify-between h-screen">
      <div className="max-w-[106px] absolute right-0 top-[20%] h-[24px]">
        <img src="/images/superteamside.svg" alt="img" />
      </div>
      <div className="w-[99px] absolute right-0 bottom-20 h-[588px]">
        <Image
          src="/images/sidedesign.svg"
          layout="fill"
          fill="true"
          alt="img"
        />
      </div>
      <div className="w-full relative  px-6 h-[calc(100vh-121px)] flex flex-col items-center justify-center">
        <div className="absolute top-[50%] 2xl:right-[5.5%] right-[7.5%]">
          <Header />
        </div>
        <Donation isSuccess={campaign.isSuccess} data={campaign?.data?.data} />

        <div className="min-h-[200px] w-[320px]  relative">
          <Swap donationId={campaign.data?.data?.donationId || ""} />
        </div>
        <p className="text-xs font-normal mt-6 text-text-menu text-center  ">
          If the goal is not met in 30 days. All the contributions will be
          refunded in USDC
        </p>
        <div className="min-h-[1px] w-[60%] rounded-md bg-border-divider  mt-3  mb-24 "></div>

        <Latest />
      </div>
      <div className="">
        <MultiSig />
      </div>
    </div>
  );
}

import Image from "next/image";
import { Button } from "@chakra-ui/react";
export default function LandingBanner() {
  return (
    <div className="w-[55%] pl-8 pt-5 relative h-screen bg-[url('/images/burj_banner.png')] bg-[length:100%_100%]  bg-no-repeat bg-center">
      <div className="flex justify-between">
        <div>
          <Image
            src="/images/superteam_logo.svg"
            width={256}
            height={59}
            alt="logo"
          />
        </div>
        <div className="mr-6 flex items-center ">
          <Button
            background={"transparent"}
            _hover={{ background: "transparent", opacity: 0.7 }}
            className=" text-base font-normal text-text-primary"
          >
            Buy Breakpoint Tickets
          </Button>
          <Button
            _hover={{ background: "transparent", opacity: 0.7 }}
            background={"transparent"}
            className=" text-base font-normal text-text-primary"
          >
            Buy a Superteam Tshirt
          </Button>
        </div>
      </div>
      <div
        style={{ writingMode: "vertical-rl" }}
        className="rotate-180 outline  2xl:right-[34%] fill-transparent text-7xl font-extrabold absolute bottom-[16%] right-[32%]"
      >
        ON BURJ
      </div>
    </div>
  );
}

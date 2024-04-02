import Image from "next/image";
import truncate from "../../utils/truncate";

import { CircularProgress, Skeleton } from "@mui/material";
export default function EstSol({
  estOutput,
  enableSubmit,
  getSwapFeeConfig,
  mint,
  opLoading,
  solPrice,
  createDonation,
}) {
  createDonation;
  return (
    <div>
      {enableSubmit && (
        <>
          <div
            className={
              " bg-background-container border mt-4 border-border-menu relative  items-center flex justify-center rounded-[8px] w-full p-[1px] h-[58px] "
            }
          >
            {opLoading ? (
              <Skeleton
                className=" opacity-35 h-[30px] w-[70%]"
                style={{ background: "#E0E0E0" }}
                height={50}
                animation="wave"
              />
            ) : (
              <div className="flex items-center justify-center gap-x-2">
                <Image
                  src="/images/usdc.svg"
                  width={24}
                  height={24}
                  alt="img"
                />
                <span className="text-xl font-extrabold text-white">
                  {" "}
                  {truncate(createDonation?.outputAmount / Math.pow(10, 6), 4)}
                </span>
                <span className="text-text-menu self-end">
                  ${truncate(createDonation?.outputAmount / Math.pow(10, 6), 4)}
                </span>
              </div>
            )}

            <div className="h-[18px] w-max justify-center z-0 min-w-[200px] bg-background-container  flex items-center absolute bottom-[-17%]">
              <p className="text-sm font-normal text-text-menu">Est.USDC</p>
              <div
                className={` ${"bg-border-menu"}  absolute  right-0 rounded-[50%] w-[4px] h-[4px]    `}
              ></div>
              <div
                className={` ${"bg-border-menu"} left-0 absolute   rounded-[50%] w-[4px] h-[4px]    `}
              ></div>
            </div>
          </div>

          <div className="text-right mt-4 flex items-center justify-between text-sm p-1 ">
            <label className="label">
              <span className="text-sm font-medium text-text-menu">
                Total Fee (including Gas)
              </span>
            </label>

            {!opLoading ? (
              <p className="text-sm font-semibold text-white">
                {createDonation?.estimatedFee / Math.pow(10, 9) || 0} SOL
              </p>
            ) : (
              <CircularProgress color="inherit" size={14} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

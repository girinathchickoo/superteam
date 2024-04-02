import { Button } from "@chakra-ui/button";
import Image from "next/image";
import styles from "./Contribute.module.css";
import Tooltip from "@mui/material/Tooltip";
import React, { useState } from "react";
export default function MultiSig() {
  const [copied, setCopied] = useState(false);
  return (
    <div
      style={{
        background:
          "linear-gradient(271.24deg, #0C121E -2.84%, #111A2A 97.81%)",
      }}
      className="text-center flex justify-center px-4  h-[121px] pb-2 gap-x-4 items-start pt-4 relative"
    >
      <div className=" ">
        <div className="flex items-center mb-4 gap-x-1">
          <p className="text-sm relative mb-[2px] z-10 font-medium  text-text-menu opacity-50">
            Multisig Contribution Address
          </p>
          <Image src="/images/sidearrow.svg" width={8} height={8} alt="img" />{" "}
        </div>
        <div className="flex items-center mb-4 gap-x-1">
          <p className="text-sm relative z-10 font-medium underline decoration-offset-4 decoration-dashed text-text-menu ">
            GLgvFH6Gn6uhXS8gJoZaykJ3uSP234dMoyC9aEveHF8Nn
          </p>
          <Tooltip
            onClose={() => {
              setTimeout(() => {
                setCopied(false);
              }, [1000]);
            }}
            disableInteractive
            onClick={() => {
              navigator.clipboard
                .writeText("GLgvFH6Gn6uhXS8gJoZaykJ3uSP234dMoyC9aEveHF8Nn")
                .then(() => {
                  setCopied(true);
                });
            }}
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -10],
                    },
                  },
                ],
              },
            }}
            title={`${copied ? "Copied!" : "Copy"}`}
          >
            <Button
              cursor={"pointer"}
              className="min-w-max  h-max bg-transparent p-0 m-0"
            >
              <Image src="/images/copy.svg" width={10} height={10} alt="img" />{" "}
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="">
        <div className="flex items-center gap-x-1">
          <p className="text-sm text-left mb-1 relative z-10 font-medium  text-text-menu opacity-50">
            Multisig Wallet Controlled by
          </p>
          <Image src="/images/sidearrow.svg" width={8} height={8} alt="img" />{" "}
        </div>
        <div className="flex relative z-10  items-center flex-wrap mt-5  gap-2">
          {[1, 2, 3, 4].map((item, i) => (
            <div className={`${styles.flexiblebutton} p-[1px] rounded-sm`}>
              <div
                key={i}
                className="w-[95px] h-[19px] rounded-sm flex items-center gap-x-2 px-1  bg-background-container  "
              >
                <div className="min-w-[15px] h-[15px] bg-black flex items-center justify-center rounded-[50%]">
                  <Image src="/images/x.svg" width={9} height={9} alt="img" />
                </div>
                <p className="text-xs font-normal text-text-menu">defidynam</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Menu, MenuButton, MenuItem, MenuList, Button } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect } from "react";
import controllers from "@/controllers";
import { keyBy } from "lodash";
import { useWallet } from "@solana/wallet-adapter-react";
import truncate from "@/utils/truncate";
export default function MintInput({
  currentMint,
  onChange,
  availableMints,
  transferFields,
  i,
  txnSuccess,
  selectedToken,
  handleToken,
  label = "Select Token",
  page,
  handleSelectedToken,
}: {
  name: string;
  currentMint: string;
  onChange: (e: any) => void;
  availableMints: any;
  transferFields: [];
  i: number;
  selectedToken: {};
  txnSuccess: Boolean;
  label: string;
  page: string;
  handleToken: (e: any) => void;
  handleSelectedToken: (e: any) => void;
  mint: string;
}) {
  const wallet = useWallet();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tokens, setTokens] = React.useState([]);

  const [balance, setBalance] = React.useState({});
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  async function callToken() {
    let res = await controllers.fetchToken();
    console.log(res, "res");
    setTokens(res.endpoints?.transfer?.tokens || []);
  }
  useEffect(() => {
    callToken();
  }, []);
  async function callBalance(address) {
    let res = await controllers.fetchBalance(address);

    setBalance(res.data);
  }
  console.log(wallet.publicKey?.toString(), "pubkey");
  useEffect(() => {
    if (wallet.publicKey?.toString()?.length)
      callBalance(wallet.publicKey?.toString());
  }, [wallet.publicKey, txnSuccess]);

  return (
    <div className="  ">
      <label className="label">
        <span className="text-sm font-medium mb-1 text-text-menu">Pay</span>
      </label>
      <div className="w-max mt-1 flex justify-start">
        <Menu>
          <MenuButton
            className="w-[180px] h-[30px] flex items-center text-text-menu font-normal text-sm border border-border-menu bg-background-container"
            onClick={handleClick}
            as={Button}
          >
            {" "}
            <div className="flex w-full gap-x-2 items-center">
              {selectedToken?.logoURI ? (
                <img
                  src={selectedToken.logoURI}
                  width={20}
                  height={20}
                  alt="img"
                  className="rounded-[50%]"
                />
              ) : (
                <div className="w-[20px]  h-[20px] bg-background-icon rounded-[50%]"></div>
              )}
              <p className="leading-none text-base font-bold text-text-primary mt-[1px] flex items-center">
                {selectedToken?.symbol ? selectedToken?.symbol : "Select Token"}
              </p>

              <p className=" text-base font-nornal text-text-primary mt-[1px] leading-none">
                {selectedToken?.name?.length > 5
                  ? selectedToken.name?.substring(0, 5) + ".."
                  : selectedToken?.name}
              </p>

              <div className=" ml-auto">
                <Image
                  src="/images/downmenu.svg"
                  className="mt-[3px] min-w-[10px] min-h-[7px]"
                  width={10}
                  height={7}
                  alt="image"
                />
              </div>
            </div>
          </MenuButton>
          <MenuList
            zIndex={20}
            className="h-[300px]  bg-background-menu overflow-y-auto"
          >
            {tokens.map((mint, i, arr) => {
              console.log(mint, "mints");
              return (
                <>
                  <MenuItem
                    onClickCapture={() => {
                      handleSelectedToken &&
                        handleSelectedToken(tokens?.[mint.mint]);
                      onChange(mint.mint);
                      handleToken(mint, i);
                    }}
                    className="w-[300px]   flex items-center  bg-background-menu justify-between  "
                    key={mint.mint}
                    onClick={handleClose}
                  >
                    <div className=" flex items-center gap-x-3 ">
                      {mint?.logoURI ? (
                        <img
                          src={mint.logoURI}
                          width={20}
                          height={20}
                          alt="img"
                          className="rounded-[50%]"
                        />
                      ) : (
                        <></>
                      )}

                      <div>
                        <div>
                          <span className="text-text-menu mr-1 text-sm font-medium">
                            {mint.symbol}
                          </span>
                          <span className="text-text-menu text-sm font-normal">
                            {mint?.name || ""}
                          </span>
                        </div>

                        <div
                          className="px-2 h-max flex items-center gap-x-2"
                          style={{
                            background: "#f6f6f6",
                            color: "rgba(111, 116, 115, 0.75)",
                          }}
                        >
                          <p className="text-[10px] leading-2 font-normal">
                            {mint.mint.substring(0, 4) +
                              "..." +
                              mint.mint.substring(
                                mint.mint?.length - 4,
                                mint.mint?.length
                              )}
                          </p>
                          <a
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            href={`https://solscan.io/token/${mint.mint}`}
                            target="_blank"
                            rel="noreferrer"
                            className="m-0 h-[15px] flex items-center p-0"
                          >
                            <Image
                              src="/images/share.svg"
                              width={10}
                              height={10}
                              alt="img"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                    {wallet.publicKey ? (
                      <div className="ml-auto mr-[15px]">
                        <p className="text-sm font-medium text-text-menu">
                          {truncate(
                            balance?.sol?.sol[mint.mint]?.balance /
                              Math.pow(
                                10,
                                balance?.sol?.sol[mint.mint]?.decimals
                              ),
                            4
                          ) || ""}
                        </p>
                        <p className="text-[10px] font-normal text-text-menu opacity-60 text-right">
                          {truncate(
                            tokens[mint.mint]?.lastPrice *
                              truncate(
                                balance?.sol?.sol[mint.mint]?.balance /
                                  Math.pow(
                                    10,
                                    balance?.sol?.sol[mint.mint]?.decimals
                                  ),
                                4
                              ),
                            4
                          ) || ""}
                        </p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </MenuItem>

                  <div className="w-[92%] mx-auto h-[1px] bg-[#e0e0e0]"></div>
                </>
              );
            })}
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

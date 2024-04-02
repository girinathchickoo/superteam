import ConnectWallet from "../ConnectWallet";
import Image from "next/image";
import truncate from "@/utils/truncate";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { TokenAmountInput } from "../TokenAmountInput";
import { SubmitButton } from "../SubmitButton";
import { CircularProgress } from "@mui/material";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import EstSol from "../EstSol";
import { isEmpty } from "lodash";
import { useMutation } from "@tanstack/react-query";
import controllers from "@/controllers";
import { VersionedTransaction, Transaction } from "@solana/web3.js";
import base58 from "bs58";
import TxnSuccessCard from "./txnSuccessCard";
import toast from "react-hot-toast";
const MintInput = dynamic(() => import("../MinInput"), { ssr: false });
export default function Swap({ donationId }: { donationId: string }) {
  const { publicKey, signTransaction, sendTransaction, wallet } = useWallet();
  const { connection } = useConnection();
  const [selectedToken, setSelectedToken] = useState({});
  const [payload, setPayload] = useState([]);
  const [balance, setBalance] = useState({});
  const [isProgress, setIsProgress] = useState(false);
  const [opLoading, setOpLoading] = useState(false);
  const { setVisible } = useWalletModal();
  const [errorMessage, setErrorMessage] = useState("");
  const [txnSuccess, setTxnSuccess] = useState(false);
  const [amount, setAmount] = useState("");
  function handleToken(val: {}, i) {
    setTxnSuccess(false);
    setErrorMessage("");
    setSelectedToken(val);
  }
  async function callBalance(address) {
    let res = await controllers.fetchBalance(address);

    setBalance(res.data);
  }
  useEffect(() => {
    if (publicKey !== null) {
      callBalance(publicKey);
    }
  }, [publicKey]);
  function handleAmount(val: { target: string }) {
    setTxnSuccess(false);
    setErrorMessage("");
    setAmount(val.target.value);
  }
  const enableSubmit = !isEmpty(selectedToken) && amount !== "" && publicKey;
  const isFieldEmpty = isEmpty(selectedToken) || !amount?.length;

  const createDonation = useMutation({
    mutationKey: "donation",
    mutationFn: async (data: {}) => {
      console.log("called");
      const req = await controllers.createDonation(data);
      return await req.json();
    },
    onSuccess: (data) => {
      if (data?.status === "error") {
        toast.error(data?.message);
      } else {
        toast.success("Success");
      }
      setOpLoading(false);
    },
    onError: (err) => {
      console.log(err, "error12");
      toast.error(err?.message);
    },
  });
  async function submitDonation() {
    await createDonation.mutateAsync({
      toSwap: [
        {
          fromTokenAddress: selectedToken?.mint,
          amount: Number(amount) * Math.pow(10, selectedToken?.decimals),
        },
      ],
      donationId,
      user: publicKey,
    });
  }
  function handleReset() {
    setSelectedToken({});
    setAmount("");
    setTxnSuccess(false);
  }
  useEffect(() => {
    !isEmpty(selectedToken) && amount.length && setOpLoading(true);
    let timeout: any;
    if (
      !isEmpty(selectedToken) &&
      amount.length &&
      donationId.length &&
      publicKey
    ) {
      timeout = setTimeout(() => {
        submitDonation();
      }, 2000);
    } else {
      setOpLoading(false);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [donationId, amount, selectedToken, publicKey, payload]);
  async function submitSwap() {
    setErrorMessage("");
    setIsProgress(true);
    let transaction = VersionedTransaction.deserialize(
      base58.decode(createDonation.data?.transaction || "")
    );
    try {
      await sendTransaction(transaction, connection);
      // if (signTransaction) await signTransaction(transaction);
      toast.success("Transaction Successful");
      setTxnSuccess(true);
      setIsProgress(false);
    } catch (err: any) {
      console.log(err);
      setErrorMessage(err.message);
      setIsProgress(false);
    }
  }
  return (
    <div>
      <ConnectWallet />
      <div className="flex items-center mt-5 gap-x-2">
        <MintInput
          onChange={() => {}}
          handleToken={handleToken}
          selectedToken={selectedToken}
        />
        <div>
          <TokenAmountInput
            currentAmount={amount}
            onChange={handleAmount}
            selectedToken={selectedToken}
          />
        </div>
      </div>

      {publicKey && selectedToken?.mint ? (
        <div className="flex items-center gap-x-2 justify-end mr-3 pt-2">
          <Image src="/images/wallet.svg" width={12} height={10} alt="img" />
          <p className="text-sm font-medium text-text-menu">
            {balance?.sol?.sol?.[selectedToken?.mint]?.balance
              ? truncate(
                  balance?.sol?.sol?.[selectedToken?.mint]?.balance /
                    Math.pow(
                      10,
                      balance?.sol?.sol?.[selectedToken?.mint]?.decimals
                    ),
                  4
                )
              : 0}{" "}
            {selectedToken?.symbol || ""}
          </p>
          <button
            onClick={() => {
              setAmount(
                truncate(
                  balance?.sol?.sol?.[selectedToken?.mint]?.balance /
                    Math.pow(
                      10,
                      balance?.sol?.sol?.[selectedToken?.mint]?.decimals
                    ),
                  4
                ).toString()
              );
            }}
            className={`${
              balance?.sol?.sol?.[selectedToken?.mint]?.balance
                ? ""
                : "opacity-70 pointer-events-none"
            } px-1 border border-[#999999] text-[10px] rounded-sm font-medium text-[#999999]`}
          >
            Max
          </button>
        </div>
      ) : (
        <></>
      )}
      <EstSol
        opLoading={opLoading}
        enableSubmit={enableSubmit}
        mint={selectedToken?.mint}
        createDonation={createDonation.data}
      />
      <p className="text-xs w-full text-center top-2 relative text-red-600 ">
        {errorMessage}
      </p>
      {txnSuccess ? (
        <TxnSuccessCard handleReset={handleReset} />
      ) : (
        <SubmitButton
          onClick={() => {
            if (publicKey) {
              submitSwap();
            } else {
              setVisible(true);
              // setIsSubmit(true);
            }
          }}
          disabled={
            !enableSubmit == null || isFieldEmpty || opLoading || isProgress
          }
          text={"Send transaction"}
          disabledText={
            isEmpty(selectedToken) ? (
              "Select Token"
            ) : !amount.length ? (
              "Enter Amount"
            ) : !publicKey ? (
              "Connect Wallet"
            ) : opLoading ? (
              <div className="text-white flex justify-center items-center gap-x-2">
                Loading
                <CircularProgress color="inherit" size={14} />
              </div>
            ) : isProgress ? (
              <div className="text-white justify-center flex items-center gap-x-2">
                In Progress
                <CircularProgress color="inherit" size={14} />
              </div>
            ) : errorMessage?.length ? (
              "Try Again"
            ) : (
              "Get SOL"
            )
          }
        />
      )}
    </div>
  );
}

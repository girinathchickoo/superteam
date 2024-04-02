import Image from "next/image";

export default function TxnSuccessCard({
  handleReset,
}: {
  handleReset: () => void;
}) {
  return (
    <>
      <div
        onClick={() => {
          handleReset();
        }}
        className="bg-gradient-to-r cursor-pointer from-indigo-500 from-10% rounded-sm via-sky-500 w-[320px] mt-5 h-[30px] via-30% to-emerald-500 to-90% p-[2px]"
      >
        <div className="bg-background-container w-full h-full gap-x-2 rounded-sm flex items-center text-base font-bold text-white justify-center">
          Transaction Successful
          <Image
            src="/images/txnsuccess.svg"
            width={16}
            height={16}
            alt="img"
          />
        </div>
      </div>
    </>
  );
}

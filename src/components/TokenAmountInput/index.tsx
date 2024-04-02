import truncate from "../../utils/truncate";

export function TokenAmountInput({
  currentAmount,
  onChange,
  selectedToken,
}: {
  name: string;
  currentAmount: string;
  onChange: (e: any) => void;
  selectedToken: {};
}) {
  return (
    <div className=" relative flex flex-col ">
      <label className="label">
        <span className="text-sm mb-1 font-medium text-text-menu">Amount</span>
      </label>
      <input
        type="text"
        value={currentAmount}
        onChange={(e) => {
          onChange(e);
        }}
        placeholder="0"
        className="w-[130px] mt-1  focus:placeholder:opacity-0 placeholder:opacity-80 rounded-md placeholder:text-text-menu text-text-primary h-[30px] px-2 bg-background-container border border-border-menu max-w-md"
      />
      {selectedToken?.lastPrice ? (
        <p className="absolute bottom-[2px] right-1 text-text-menu opacity-60">
          ${truncate(selectedToken?.lastPrice * Number(currentAmount), 4)}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

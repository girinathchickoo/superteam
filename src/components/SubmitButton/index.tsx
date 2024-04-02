export function SubmitButton({
  loading,
  onClick,
  disabled = false,
  disabledText = null,
}) {
  return (
    <div>
      <button
        style={{ textTransform: "none" }}
        className="group disabled:opacity-65 mt-4 textTra rounded-md disabled:border-0 w-[320px] h-[40px]  m-2 mx-0 btn  bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
        onClick={onClick}
        disabled={disabled}
      >
        {disabledText && (
          <div className=" group-disabled:block text-base text-white">
            {disabledText}
          </div>
        )}
        {loading && (
          <span className="block loading loading-dots loading-xs"></span>
        )}
      </button>
    </div>
  );
}

export default function Donation({
  isSuccess,
  data,
}: {
  isSuccess: Boolean;
  data: { collectedAmount: number; requestingAmount: number };
}) {
  console.log(data, "datad");
  let percentVal = (data?.collectedAmount / data?.requestingAmount) * 100;
  return (
    <div className="w-[481px] mt-8 mb-7 ">
      <h2 className="text-lg text-center mb-4 font-bold text-text-menu">
        Contribute in any SPL Token
      </h2>
      <div
        style={{
          boxShadow: "-4px -4px 9.800000190734863px 0px #28354F5C ",
        }}
        className="w-full h-[66px] px-4 flex flex-col   relative items-center  bg-background-donationbg rounded-lg "
      >
        <div
          style={{ boxShadow: "-4px -4px 9.800000190734863px 0px #28354F5C" }}
          className="mb-2 bg-[#0C121E] min-w-[240px] border border-[#1F292C] rounded-md bottom-[-35%] absolute h-[30px] flex items-center justify-center mt-1"
        >
          <p className="text-lg text-text-menu">
            <span className="font-extrabold">
              {data?.collectedAmount || 0}/
            </span>
            <span className="font-normal">${data?.requestingAmount || 0}</span>
          </p>
        </div>
        <div className="w-full flex mt-3 gap-x-2 items-center">
          <div className="relative h-[10px] w-[90%] bg-background-loader rounded-lg">
            <div
              style={{
                width: `${percentVal || 2}%`,

                boxShadow: "-1px 1px 9px 1px #FFFF ",
              }}
              className=" relative h-[10px] bg-background-menu rounded-lg"
            ></div>
          </div>
          <p className="text-right     text-lg font-normal text-text-heading">
            {percentVal || 0}%
          </p>
        </div>
      </div>
    </div>
  );
}

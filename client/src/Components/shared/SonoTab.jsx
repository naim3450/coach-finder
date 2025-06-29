import React from "react";

const SonoTab = ({ text }) => {
  return (
    <span className="font-normal py-1  text-center flex  justify-center items-center  text-[12px] !text-primaryColor px-3 !rounded-[43px] !bg-BgColor">
      {text.charAt(0).toUpperCase() + text.slice(1)}
    </span>
  );
};

export default SonoTab;

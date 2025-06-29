import React from "react";
import Image from "next/image";
import { HiArrowNarrowRight } from "react-icons/hi";

const FeturedCard = ({ htext, className, ptext, src }) => {
  
  return (
 
       
        <div
          className={`lg:h-[365px] lg:w-[369px] w-full lg:py-0 p-4 rounded-xl text-center border border-[#EAF2FB] transition-all  hover:shadow-[0_10px_20px_rgb(234,242,251)] group`}
        >
          <div className="h-16 w-16 rounded-full  mx-auto relative my-4 shadow-[0_10px_20px_rgb(234,242,251)]">  
             <div className="absolute top-5 left-4">
             {src}
             </div>

          </div>
          <h3 className={`text-[20px] font-bold  ${className}`}>{htext}</h3>
          <p
            className={`text-base font-normal lg:w-[321px] h-[186px] w-[70vw] mx-auto leading-7 pt-3 ${className}`}
          >
            {ptext}
          </p>

          <div className="flex justify-center mb-5 mt-1">
            <h4
              className={`text-base font-medium text-SecondaryColor group-hover:text-BtnColor group-hover:text-[18px]  ${className}`}
            >
              Browse
            </h4>
            <HiArrowNarrowRight  className="mt-[1px] ml-1 text-SecondaryColor group-hover:text-BtnColor h-6 w-6" />
          </div>
        </div>
  
  );
};

export default FeturedCard;

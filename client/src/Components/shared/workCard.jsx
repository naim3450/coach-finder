import React from 'react';
import Image from 'next/image';

const WorkCard = ({ src, num, peragraph, h4text, showLine }) => {
  return (
    <div className="md:grid md:grid-cols-2 pt-16 flex flex-col items-center">
      <Image src={src} alt="alt" />
      <div className="w-[70vw]">
        <div className="flex md:mt-24 gap-5 relative">
          <div className="h-8 w-8 rounded-[100%] bg-BtnColor md:block hidden">
            <span className="flex justify-center pt-1 text-white font-bold text-base">{num}</span>
          </div>

          <h4 className="font-bold md:text-[24px] w-full text-lg md:text-left text-center text-h4Color">{h4text}</h4>

          {/* Conditionally render the line */}
          {showLine && (
            <div className="h-[242px] w-[2px] hidden lg:block bg-[#BFBFBF] absolute md:top-14 md:left-4 -top-10 left-1/2 -translate-x-1/2"></div>
          )}
        </div>
        <p className="md:pl-12  pt-4 md:text-left text-center">{peragraph}</p>
      </div>
    </div>
  );
};

export default WorkCard;

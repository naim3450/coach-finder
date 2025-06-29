import React from "react";

const Cross = ({className}) => {
  return (
    <div className={`${className}`}>
      <svg
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.4583 3.54175L3.54167 13.4584M3.54167 3.54175L13.4583 13.4584"
          stroke="#141B34"
          strokeWidth="1.0625"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Cross;

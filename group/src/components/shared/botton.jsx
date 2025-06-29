import React from 'react'

const Button = ({ TagName = "button", children, className = "", ...props }) => {
  return (
    <TagName
      className={`bg-BtnColor text-white px-6 py-2 rounded-[8px] ${className}`}
      {...props}
    >
      {children}
    </TagName>
  )
}

export default Button



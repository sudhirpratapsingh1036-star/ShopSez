import React from "react"

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  loading = false,
}) => {

  const baseStyle =
    "px-4 py-2 rounded font-semibold transition duration-200"

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-600 text-gray-700 hover:bg-gray-100",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyle} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Please wait..." : children}
    </button>
  )
}

export default Button

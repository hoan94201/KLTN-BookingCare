import { ButtonHTMLAttributes } from "react";

export default function PrimaryButton({
  className = "",
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        `iw-full outline-none border-none rounded-[15px] h-[30px] my-2.5 bg-background text-sm text-white ${
          disabled && "opacity-40 cursor-not-allowed"
        } ` + className
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
}

import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export function Select({ className = "", children, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={`
        w-full
        rounded-xl
        border
        border-zinc-800
        bg-zinc-950
        px-4
        py-3
        text-white
        outline-none
        transition
        focus:border-emerald-500
        ${className}
      `}
    >
      {children}
    </select>
  );
}

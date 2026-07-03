import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-500",

    secondary: "border border-zinc-700 text-zinc-300 hover:bg-zinc-800",

    danger: "border border-red-900/50 text-red-400 hover:bg-red-950/30",
  };

  return (
    <button
      {...props}
      className={`
        rounded-xl
        px-4
        py-2
        font-medium
        transition
        cursor-pointer
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

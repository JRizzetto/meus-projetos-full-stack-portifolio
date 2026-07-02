import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/50
        p-6
        ${className}
      `}
    >
      {children}
    </div>
  );
}

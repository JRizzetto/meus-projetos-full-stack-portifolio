import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
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
    />
  );
}

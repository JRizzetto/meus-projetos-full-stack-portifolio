interface LoadingSpinnerProps {
  text?: string;
}

export function LoadingSpinner({ text = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-700 border-t-emerald-500">
        <span className="text-zinc-400">{text}</span>
      </div>
    </div>
  );
}

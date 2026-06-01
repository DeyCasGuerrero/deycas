"use client";

import type { ReactNode } from "react";

export function cn(...parts: Array<string | undefined | null | false>) {
  return parts.filter(Boolean).join(" ");
}

type FieldShellProps = {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  children: ReactNode;
};

export function FieldShell({
  label,
  helperText,
  error,
  required,
  htmlFor,
  className,
  children,
}: FieldShellProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <label htmlFor={htmlFor} className="flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
          <span>{label}</span>
          {required ? <span className="text-rose-500">*</span> : null}
        </label>
      ) : null}
      {children}
      {helperText || error ? (
        <p className={cn("text-xs", error ? "text-rose-500" : "text-slate-500 dark:text-slate-400")}>{error || helperText}</p>
      ) : null}
    </div>
  );
}

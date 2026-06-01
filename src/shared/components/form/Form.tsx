"use client";

import type { FormHTMLAttributes, ReactNode } from "react";
import { cn } from "./_shared";

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export default function Form({ title, description, footer, className, children, ...props }: FormProps) {
  return (
    <form
      className={cn(
        "rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-800 dark:bg-slate-950/80",
        className,
      )}
      {...props}
    >
      {(title || description) ? (
        <header className="mb-6 space-y-2">
          {title ? <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h2> : null}
          {description ? <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p> : null}
        </header>
      ) : null}

      <div className="space-y-5">{children}</div>

      {footer ? <footer className="mt-6">{footer}</footer> : null}
    </form>
  );
}

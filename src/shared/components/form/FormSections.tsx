"use client";

import type { ReactNode } from "react";
import { cn } from "./_shared";

type FormSectionsProps = {
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function FormSections({ title, description, children, className }: FormSectionsProps) {
  return (
    <div className={cn("rounded-2xl border border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-900/50", className)}>
      {(title || description) ? (
        <header className="mb-4 space-y-1">
          {title ? <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3> : null}
          {description ? <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p> : null}
        </header>
      ) : null}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

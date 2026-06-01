"use client";

import { forwardRef, useId } from "react";
import type { TextareaHTMLAttributes } from "react";
import { cn, FieldShell } from "./_shared";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
};

const textAreaBaseClassName =
  "min-h-32 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:disabled:bg-slate-800";

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, helperText, error, containerClassName, className, id, required, ...props },
  ref,
) {
  const generatedId = useId();
  const textAreaId = id ?? generatedId;

  return (
    <FieldShell
      label={label}
      helperText={helperText}
      error={error}
      required={required}
      htmlFor={textAreaId}
      className={containerClassName}
    >
      <textarea ref={ref} id={textAreaId} required={required} className={cn(textAreaBaseClassName, className)} {...props} />
    </FieldShell>
  );
});

export default TextArea;

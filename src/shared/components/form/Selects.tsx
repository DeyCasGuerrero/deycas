"use client";

import { forwardRef, useId, useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { cn, FieldShell } from "./_shared";
import Icon from "../customIcon";

type SelectOption = {
  label: ReactNode;
  value: string;
  disabled?: boolean;
  iconName?: string;
};

type SelectsProps = {
  label?: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
  placeholder?: string;
  options?: SelectOption[];
  iconName?: string; // Icono para el campo en general
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
};

const selectBaseClassName =
  "flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-300 bg-white py-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:disabled:bg-slate-800";

const Selects = forwardRef<HTMLInputElement, SelectsProps>(function Selects(
  {
    label,
    helperText,
    error,
    containerClassName,
    className,
    required,
    placeholder = "Selecciona una opción",
    options = [],
    iconName,
    name,
    value,
    defaultValue,
    onChange,
    disabled,
  },
  ref,
) {
  const generatedId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? "");
  const containerRef = useRef<HTMLDivElement>(null);

  // Sincronizar valor si cambia externamente
  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === internalValue);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    const newValue = option.value;
    setInternalValue(newValue);
    onChange?.(newValue);
    setIsOpen(false);
  };

  return (
    <FieldShell
      label={label}
      helperText={helperText}
      error={error}
      required={required}
      htmlFor={generatedId}
      className={containerClassName}
    >
      <div className="relative" ref={containerRef}>
        {/* Input oculto para compatibilidad con FormData */}
        <input
          type="hidden"
          name={name}
          value={internalValue}
          ref={ref}
          required={required}
        />

        <button
          type="button"
          id={generatedId}
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            selectBaseClassName,
            iconName || selectedOption?.iconName ? "pl-11" : "px-4",
            className,
          )}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            {(selectedOption?.iconName || iconName) && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                <Icon icon={selectedOption?.iconName ?? iconName!} className="size-4" />
              </div>
            )}
            <span className={cn("truncate", !selectedOption && "text-slate-400 dark:text-slate-500")}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <span className={cn("absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform", isOpen && "rotate-180")}>
            ▾
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl animate-in fade-in zoom-in-95 dark:border-slate-800 dark:bg-slate-900">
            {options.length === 0 ? (
              <div className="px-4 py-2 text-sm text-slate-500 italic">No hay opciones</div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  disabled={option.disabled}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition",
                    internalValue === option.value
                      ? "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                    option.disabled && "cursor-not-allowed opacity-50",
                  )}
                >
                  {option.iconName && (
                    <Icon icon={option.iconName} className={cn("size-4", internalValue === option.value ? "text-sky-500" : "text-slate-400")} />
                  )}
                  <span className="flex-1 truncate">{option.label}</span>
                  {internalValue === option.value && <span className="text-sky-500">✓</span>}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </FieldShell>
  );
});

export default Selects;

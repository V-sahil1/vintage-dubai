"use client";

import Icon from "./Icon";

export const inputCls =
  "w-full h-12 px-4 text-on-surface placeholder:text-outline text-body-sm rounded-sm focus:outline-none focus:bg-surface-container-high focus:ring-1 focus:ring-primary-container/60 transition-colors";

export function FormField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="font-label-badge text-label-badge uppercase tracking-wider text-outline">
        {label}
      </label>
      {children}
    </div>
  );
}

export function SuccessNote({ title, text, onReset }: { title: string; text: string; onReset?: () => void }) {
  return (
    <div role="status" className="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-sm animate-fade-in">
      <Icon name="check_circle" className="text-primary text-[24px] shrink-0" />
      <div className="flex flex-col gap-1">
        <span className="font-label-badge text-label-badge uppercase text-primary">{title}</span>
        <span className="font-body-sm text-body-sm text-on-surface-variant">{text}</span>
        {onReset && (
          <button type="button" onClick={onReset} className="self-start mt-1 font-label-spec text-[12px] text-primary hover:underline">
            Submit another request
          </button>
        )}
      </div>
    </div>
  );
}

/** Gold spinner shown while the three.js chunk and the .glb model load. */
export default function ViewerLoader({
  label,
  progress,
  visible = true,
}: {
  label: string;
  progress?: number;
  visible?: boolean;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
      className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-space-md pointer-events-none transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative size-16">
        <div className="absolute inset-0 rounded-full border border-outline-variant/50" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
        {progress !== undefined && (
          <span className="absolute inset-0 grid place-items-center font-label-spec text-[11px] text-primary">
            {Math.round(progress)}%
          </span>
        )}
      </div>
      <span className="px-space-md text-center font-label-badge text-label-badge uppercase tracking-[0.25em] text-secondary">
        {label}
      </span>
    </div>
  );
}

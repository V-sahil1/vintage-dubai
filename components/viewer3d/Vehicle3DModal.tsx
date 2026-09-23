"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import Icon from "../Icon";
import ViewerLoader from "./ViewerLoader";
import type { Viewer3DConfig } from "@/lib/vehicles";

// three.js / R3F / drei live in this chunk; it is only fetched when the viewer opens (or on card hover).
const loadScene = () => import("./VehicleScene");
const VehicleScene = dynamic(loadScene, {
  ssr: false,
  loading: () => <ViewerLoader label="Preparing showroom" />,
});

/** Warm the 3D chunk ahead of the click. */
export function preloadVehicleScene() {
  void loadScene();
}

const EXIT_MS = 450;

type FsDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitFullscreenEnabled?: boolean;
  webkitExitFullscreen?: () => void;
};
type FsElement = HTMLElement & { webkitRequestFullscreen?: () => void };

const fullscreenElement = () => {
  const d = document as FsDocument;
  return d.fullscreenElement ?? d.webkitFullscreenElement ?? null;
};

function exitFullscreen() {
  const d = document as FsDocument;
  if (d.exitFullscreen) void d.exitFullscreen().catch(() => {});
  else d.webkitExitFullscreen?.();
}

export default function Vehicle3DModal({
  config,
  detailsHref,
  onClose,
}: {
  config: Viewer3DConfig;
  detailsHref?: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);
  const [shown, setShown] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [placeholder, setPlaceholder] = useState(false);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    if (fullscreenElement()) exitFullscreen();
    setShown(false);
    window.setTimeout(onClose, EXIT_MS);
  }, [onClose]);

  // Enter animation, scroll lock, focus in/out.
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const d = document as FsDocument;
    setCanFullscreen(Boolean(d.fullscreenEnabled || d.webkitFullscreenEnabled));

    // Two frames so the initial (hidden) styles are painted before transitioning.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setShown(true);
        dialogRef.current?.focus({ preventScroll: true });
      });
    });

    const onFsChange = () => setIsFullscreen(fullscreenElement() === dialogRef.current);
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [close]);

  function toggleFullscreen() {
    if (fullscreenElement()) return exitFullscreen();
    const el = dialogRef.current as FsElement | null;
    if (!el) return;
    if (el.requestFullscreen) void el.requestFullscreen().catch(() => {});
    else el.webkitRequestFullscreen?.();
  }

  // Keep Tab focus inside the dialog.
  function trapFocus(e: ReactKeyboardEvent) {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const items = dialogRef.current.querySelectorAll<HTMLElement>("button, a[href]");
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  const chrome = `transition-all duration-500 ease-out motion-reduce:transition-none ${
    shown ? "opacity-100 translate-y-0" : "opacity-0"
  }`;
  const barButton =
    "flex items-center gap-1 sm:gap-1.5 whitespace-nowrap px-2 sm:px-4 py-2.5 rounded-sm text-on-surface hover:bg-surface-container-high hover:text-primary focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary font-headline-sm text-[11px] sm:text-body-sm uppercase font-semibold tracking-wider transition-colors";

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${config.title} – interactive 3D viewer`}
      tabIndex={-1}
      onKeyDown={trapFocus}
      className={`fixed inset-0 z-[100] overflow-hidden bg-[#08090b] outline-none transition-opacity duration-[450ms] ease-out motion-reduce:transition-none ${
        shown ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Stage */}
      <div
        className={`absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          shown ? "scale-100" : "scale-[0.96]"
        }`}
      >
        <VehicleScene config={config} resetKey={resetKey} onPlaceholderChange={setPlaceholder} />
      </div>
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.7))]" />

      {/* Top bar: label + close */}
      <div
        className={`absolute top-0 inset-x-0 flex items-start gap-space-sm px-gutter-mobile sm:px-gutter lg:px-space-xl pt-[max(1rem,env(safe-area-inset-top))] pointer-events-none ${chrome} ${
          shown ? "" : "-translate-y-3"
        }`}
      >
        <div className="hidden sm:block w-[104px] shrink-0" />
        <div className="min-w-0 flex-1 flex flex-col sm:items-center pt-1">
          <span className="inline-flex max-w-full items-start gap-2 px-3 py-1.5 rounded-sm bg-surface-container-lowest/70 backdrop-blur-md border border-outline-variant/40 font-label-badge text-label-badge uppercase tracking-[0.2em] text-primary">
            <span className="size-1.5 mt-[4px] shrink-0 rounded-full bg-primary" />
            <span>{config.title}</span>
          </span>
          <span className="mt-2 font-label-spec text-[11px] uppercase tracking-wider text-secondary/80">
            {config.paint.name} • {config.engine}
          </span>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close 3D viewer"
          className="pointer-events-auto w-11 sm:w-[104px] h-11 shrink-0 flex items-center justify-center gap-1.5 rounded-sm bg-surface-container-lowest/70 backdrop-blur-md border border-outline-variant/40 text-on-surface hover:text-primary hover:border-primary/60 focus-visible:outline focus-visible:outline-1 focus-visible:outline-primary font-headline-sm text-body-sm uppercase font-semibold tracking-wider transition-colors"
        >
          <Icon name="close" className="text-[20px]" />
          <span className="hidden sm:inline">Close</span>
        </button>
      </div>

      {/* Bottom bar: hint + controls */}
      <div
        className={`absolute bottom-0 inset-x-0 flex flex-col items-center gap-space-sm px-gutter-mobile pb-[max(1.25rem,env(safe-area-inset-bottom))] pointer-events-none ${chrome} ${
          shown ? "" : "translate-y-3"
        }`}
      >
        <p className="font-label-spec text-[11px] uppercase tracking-wider text-outline">
          <span className="pointer-coarse:hidden">Drag to rotate • Scroll to zoom</span>
          <span className="hidden pointer-coarse:inline">Drag to rotate • Pinch to zoom</span>
        </p>
        <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-sm bg-surface-container-lowest/75 backdrop-blur-md border border-outline-variant/40">
          <button type="button" onClick={() => setResetKey((k) => k + 1)} className={barButton}>
            <Icon name="restart_alt" className="text-[16px] sm:text-[18px]" />
            Reset View
          </button>
          {canFullscreen && (
            <button type="button" onClick={toggleFullscreen} className={barButton}>
              <Icon name={isFullscreen ? "fullscreen_exit" : "fullscreen"} className="text-[16px] sm:text-[18px]" />
              {isFullscreen ? "Exit" : "Fullscreen"}
            </button>
          )}
          {detailsHref && (
            <Link href={detailsHref} className={`${barButton} text-primary`}>
              Details →
            </Link>
          )}
        </div>
        {placeholder && (
          <p className="max-w-md text-center font-label-spec text-[10px] uppercase tracking-wider text-outline/80">
            {process.env.NODE_ENV === "production" ? (
              "Illustrative studio preview"
            ) : (
              <>
                Placeholder model • add <span className="text-primary normal-case">public{config.model}</span>
              </>
            )}
          </p>
        )}
      </div>
    </div>,
    document.body
  );
}

"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import type { Viewer3DConfig } from "@/lib/vehicles";
import Vehicle3DModal, { preloadVehicleScene } from "./Vehicle3DModal";

/**
 * Makes an existing card open the 3D viewer on click without touching its markup.
 * The wrapper is `display: contents`, so grid/flex layouts are unaffected.
 */
export default function Vehicle3DTrigger({
  config,
  detailsHref,
  children,
}: {
  config: Viewer3DConfig;
  detailsHref?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  function onClickCapture(e: MouseEvent) {
    // Keep ctrl/cmd/shift-click and middle-click behaving like normal links.
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    // External actions (WhatsApp) still open in their new tab.
    const anchor = (e.target as HTMLElement).closest("a");
    if (anchor?.target === "_blank") return;
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  }

  return (
    <>
      <div
        className="contents [&>article]:cursor-pointer"
        onClickCapture={onClickCapture}
        onPointerEnter={preloadVehicleScene}
        onFocus={preloadVehicleScene}
      >
        {children}
      </div>
      {/* Rendered outside the wrapper so modal clicks don't hit onClickCapture. */}
      {open && <Vehicle3DModal config={config} detailsHref={detailsHref} onClose={() => setOpen(false)} />}
    </>
  );
}

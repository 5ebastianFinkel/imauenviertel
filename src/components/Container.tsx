import type { ReactNode } from "react";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={["mx-auto w-[min(1240px,calc(100%-2.5rem))]", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

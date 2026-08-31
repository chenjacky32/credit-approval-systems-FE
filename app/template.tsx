"use client";

import React from "react"
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const [show, setShow] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setShow(false);
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div 
      className={`transition-all duration-500 ease-out transform ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </div>
  );
}

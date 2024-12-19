"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function PreviousPageButton({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className={cn("hover:cursor-pointer", className)}
    >
      {children}
    </div>
  );
}

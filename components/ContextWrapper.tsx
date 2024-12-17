"use client";

import { AuthProvider } from "@/context/authContext";
import { ReactNode } from "react";

const ContextWrapper = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default ContextWrapper;

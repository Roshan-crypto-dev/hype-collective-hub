import { createContext, createElement, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "guest" | "buyer" | "seller" | "admin";

type RoleCtx = {
  role: Role;
  setRole: (r: Role) => void;
  isAuthed: boolean;
  name: string;
  initials: string;
};

const Ctx = createContext<RoleCtx | null>(null);
const KEY = "hype.role.v1";

const DISPLAY: Record<Role, { name: string; initials: string }> = {
  guest: { name: "Guest", initials: "G" },
  buyer: { name: "Aarav Mehta", initials: "AM" },
  seller: { name: "HYPE India Store", initials: "HI" },
  admin: { name: "Admin Console", initials: "AC" },
};

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(() => {
    if (typeof window === "undefined") return "guest";
    try {
      const v = window.localStorage.getItem(KEY) as Role | null;
      return v && ["guest", "buyer", "seller", "admin"].includes(v) ? v : "guest";
    } catch {
      return "guest";
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem(KEY, role);
  }, [role]);

  const setRole = useCallback((r: Role) => setRoleState(r), []);

  const value: RoleCtx = {
    role,
    setRole,
    isAuthed: role !== "guest",
    name: DISPLAY[role].name,
    initials: DISPLAY[role].initials,
  };
  return createElement(Ctx.Provider, { value }, children);
}

export function useRole(): RoleCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useRole must be used inside <RoleProvider>");
  return ctx;
}

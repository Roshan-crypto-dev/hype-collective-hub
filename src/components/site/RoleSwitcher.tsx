import { useState } from "react";
import { useRole, type Role } from "@/lib/role-store";
import { FlaskConical, X } from "lucide-react";

const ROLES: { role: Role; label: string; tone: string }[] = [
  { role: "guest", label: "Guest", tone: "bg-cream/10 text-cream" },
  { role: "buyer", label: "Buyer", tone: "bg-green text-green-ink" },
  { role: "seller", label: "Seller", tone: "bg-gold text-ink" },
  { role: "admin", label: "Admin", tone: "bg-red text-cream" },
];

/** Dev-only role switcher. Lets you preview navbar / route chrome as each role. */
export function RoleSwitcher() {
  const { role, setRole } = useRole();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-[60] font-sans">
      {open ? (
        <div className="w-[260px] rounded-2xl border border-cream/10 bg-ink p-3 text-cream shadow-2xl">
          <div className="mb-2 flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-cream/65">
              <FlaskConical size={12} /> Dev · Mock Role
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-6 w-6 place-items-center rounded-full hover:bg-cream/10">
              <X size={12} />
            </button>
          </div>
          <p className="mb-2 px-1 text-[11px] leading-snug text-cream/55">
            No real auth yet. Switch to preview each role's chrome and routes.
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {ROLES.map((r) => (
              <button
                key={r.role}
                onClick={() => setRole(r.role)}
                className={`rounded-lg px-2 py-2 text-xs font-bold transition ${
                  role === r.role ? r.tone : "bg-cream/5 text-cream/70 hover:bg-cream/10"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-cream shadow-lg"
        >
          <FlaskConical size={12} /> {role}
        </button>
      )}
    </div>
  );
}

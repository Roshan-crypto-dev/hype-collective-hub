import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check, Lock } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useCart, formatINR } from "@/lib/cart-store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — HYPE" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const STEPS = ["Address", "Shipping", "Payment", "Review"] as const;

function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartSubtotal, clearCart } = useCart();
  const [step, setStep] = useState(0);
  const [shipMethod, setShipMethod] = useState("standard");
  const [payMethod, setPayMethod] = useState("card");

  const shipping = shipMethod === "express" ? 600 : 250;
  const total = cartSubtotal + shipping;

  const placeOrder = (e: FormEvent) => {
    e.preventDefault();
    clearCart();
    navigate({ to: "/checkout/success" });
  };

  if (cart.length === 0) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-xl px-8 py-24 text-center">
          <h1 className="font-display text-4xl">Nothing to checkout</h1>
          <p className="mt-2 text-sm text-ink/60">Add a drop to your cart first.</p>
          <Link to="/shop" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream">Shop drops</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="bg-shop-bg">
        <div className="mx-auto max-w-[1100px] px-4 py-12 sm:px-8">
          <h1 className="font-display text-4xl">Checkout</h1>

          <ol className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold tracking-[0.14em]">
            {STEPS.map((s, i) => (
              <li key={s} className="flex items-center gap-3">
                <span className={`grid h-7 w-7 place-items-center rounded-full border ${i <= step ? "border-ink bg-ink text-cream" : "border-ink/30 text-ink/50"}`}>
                  {i < step ? <Check size={13} /> : i + 1}
                </span>
                <span className={i === step ? "text-ink" : "text-ink/45"}>{s.toUpperCase()}</span>
                {i < STEPS.length - 1 && <span className="h-px w-6 bg-ink/20" />}
              </li>
            ))}
          </ol>

          <form onSubmit={placeOrder} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="rounded-3xl bg-cream p-6 sm:p-8">
              {step === 0 && (
                <section className="space-y-4">
                  <h2 className="font-display text-2xl">Shipping address</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Full name" required />
                    <Field label="Phone" required type="tel" />
                    <Field label="Address line 1" required wide />
                    <Field label="Address line 2" wide />
                    <Field label="City" required />
                    <Field label="State" required />
                    <Field label="PIN code" required />
                    <Field label="Email" required type="email" />
                  </div>
                </section>
              )}
              {step === 1 && (
                <section>
                  <h2 className="font-display text-2xl">Shipping method</h2>
                  <div className="mt-4 space-y-3">
                    <ShipOption id="standard" current={shipMethod} onChange={setShipMethod} title="Standard" desc="5–7 business days · ₹250" />
                    <ShipOption id="express" current={shipMethod} onChange={setShipMethod} title="Express" desc="2–3 business days · ₹600" />
                  </div>
                </section>
              )}
              {step === 2 && (
                <section>
                  <h2 className="font-display text-2xl">Payment</h2>
                  <div className="mt-4 space-y-3">
                    <PayOption id="card" current={payMethod} onChange={setPayMethod} title="Credit / Debit Card" />
                    <PayOption id="upi" current={payMethod} onChange={setPayMethod} title="UPI" />
                    <PayOption id="netbanking" current={payMethod} onChange={setPayMethod} title="Net Banking" />
                  </div>
                  {payMethod === "card" && (
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <Field label="Card number" required wide placeholder="1234 5678 9012 3456" />
                      <Field label="Expiry" required placeholder="MM / YY" />
                      <Field label="CVC" required placeholder="123" />
                    </div>
                  )}
                  <p className="mt-4 inline-flex items-center gap-2 text-xs text-ink/55"><Lock size={12} /> Test mode — no real payment is processed.</p>
                </section>
              )}
              {step === 3 && (
                <section>
                  <h2 className="font-display text-2xl">Review your order</h2>
                  <ul className="mt-4 divide-y divide-line-soft">
                    {cart.map((l) => (
                      <li key={`${l.id}-${l.size}`} className="flex items-center gap-3 py-3">
                        <img src={l.image} alt={l.name} className="h-14 w-14 rounded-lg object-cover" />
                        <div className="flex-1 text-sm">
                          <div className="font-semibold">{l.name}</div>
                          <div className="text-xs text-ink/55">Size {l.size} · Qty {l.qty}</div>
                        </div>
                        <div className="font-display">{formatINR(l.price * l.qty)}</div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  disabled={step === 0}
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className="rounded-full border border-ink/30 px-5 py-2.5 text-xs font-semibold tracking-[0.14em] disabled:opacity-40"
                >
                  BACK
                </button>
                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    className="rounded-full bg-ink px-6 py-2.5 text-xs font-semibold tracking-[0.14em] text-cream"
                  >
                    CONTINUE
                  </button>
                ) : (
                  <button type="submit" className="rounded-full bg-ink px-6 py-2.5 text-xs font-semibold tracking-[0.14em] text-cream">
                    PLACE ORDER
                  </button>
                )}
              </div>
            </div>

            <aside className="h-fit rounded-3xl bg-ink p-6 text-cream">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-cream/70">Order Summary</h3>
              <ul className="mt-4 space-y-3 text-sm">
                {cart.map((l) => (
                  <li key={`${l.id}-${l.size}`} className="flex justify-between gap-3">
                    <span className="line-clamp-1 text-cream/85">{l.name} × {l.qty}</span>
                    <span>{formatINR(l.price * l.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="my-4 h-px bg-cream/15" />
              <div className="space-y-2 text-sm text-cream/80">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(cartSubtotal)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{formatINR(shipping)}</span></div>
              </div>
              <div className="mt-3 flex justify-between text-base font-bold"><span>Total</span><span>{formatINR(total)}</span></div>
            </aside>
          </form>
        </div>
      </div>
    </SiteLayout>
  );
}

function Field({ label, required, type = "text", wide, placeholder }: { label: string; required?: boolean; type?: string; wide?: boolean; placeholder?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-ink/65 ${wide ? "sm:col-span-2" : ""}`}>
      {label}{required && <span className="text-red"> *</span>}
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-lg border border-line bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal text-ink placeholder:text-ink/35 focus:border-ink focus:outline-none"
      />
    </label>
  );
}

function ShipOption({ id, current, onChange, title, desc }: { id: string; current: string; onChange: (v: string) => void; title: string; desc: string }) {
  const active = current === id;
  return (
    <label className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition ${active ? "border-ink bg-cream-2" : "border-line bg-white"}`}>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-ink/55">{desc}</div>
      </div>
      <input type="radio" name="ship" checked={active} onChange={() => onChange(id)} className="h-4 w-4 accent-ink" />
    </label>
  );
}
function PayOption({ id, current, onChange, title }: { id: string; current: string; onChange: (v: string) => void; title: string }) {
  const active = current === id;
  return (
    <label className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition ${active ? "border-ink bg-cream-2" : "border-line bg-white"}`}>
      <div className="text-sm font-semibold">{title}</div>
      <input type="radio" name="pay" checked={active} onChange={() => onChange(id)} className="h-4 w-4 accent-ink" />
    </label>
  );
}

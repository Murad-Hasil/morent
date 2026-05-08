"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Star, ShieldCheck, ChevronDown, CheckCircle2, Tag } from "lucide-react";
import { toast } from "@/lib/toast";
import { Car } from "@/lib/data";
import {
  billingSchema, rentalSchema, paymentSchema, confirmSchema,
  BillingData, RentalData, PaymentData, ConfirmData,
} from "@/lib/checkout-schema";

const PROMO_CODES: Record<string, number> = {
  MORENT20: 0.20,
  SAVE10: 0.10,
};

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-red-500 mt-1 animate-fade-in-down">{msg}</p>;
}

function SectionCard({ step, title, subtitle, done, children }: {
  step: string; title: string; subtitle: string; done?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="animate-fade-in-up bg-white dark:bg-gray-900 rounded-[10px] p-6 flex flex-col gap-5 border border-transparent dark:border-gray-800">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          {done && <CheckCircle2 size={18} className="text-green-500" />}
          <span className="text-xs text-gray-400">{step}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

function InputField({ label, placeholder, error, registration }: {
  label: string; placeholder: string; error?: string; registration: object;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
      <input
        id={id}
        placeholder={placeholder}
        {...registration}
        className={`w-full border rounded-[8px] px-4 py-3 text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-300 dark:placeholder:text-gray-600 outline-none bg-[#F6F7F9] dark:bg-gray-800 transition-colors
          ${error ? "border-red-400 focus:border-red-500" : "border-gray-200 dark:border-gray-700 focus:border-[#3563E9]"}`}
      />
      <FieldError msg={error} />
    </div>
  );
}

function SelectInput({ label, placeholder, error, registration }: {
  label: string; placeholder: string; error?: string; registration: object;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
      <div className={`flex items-center gap-2 border rounded-[8px] px-4 py-3 bg-[#F6F7F9] dark:bg-gray-800 transition-colors ${error ? "border-red-400" : "border-gray-200 dark:border-gray-700"}`}>
        <input
          placeholder={placeholder}
          {...registration}
          className="text-sm text-gray-500 dark:text-gray-300 flex-1 outline-none bg-transparent placeholder:text-gray-300 dark:placeholder:text-gray-600"
        />
        <ChevronDown size={16} className="text-gray-400 shrink-0" />
      </div>
      <FieldError msg={error} />
    </div>
  );
}

function daysBetween(a: string, b: string): number {
  if (!a || !b) return 1;
  const diff = new Date(b).getTime() - new Date(a).getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return Math.max(1, days);
}

export default function CheckoutForm({ initialCar }: { initialCar: Car & { id: number } }) {
  const car = initialCar;

  const [paymentMethod, setPaymentMethod] = useState<"credit" | "paypal" | "bitcoin">("credit");
  const [step1Done, setStep1Done] = useState(false);
  const [step2Done, setStep2Done] = useState(false);
  const [step3Done, setStep3Done] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const billing = useForm<BillingData>({ resolver: zodResolver(billingSchema), mode: "onBlur" });
  const rental  = useForm<RentalData>({  resolver: zodResolver(rentalSchema),  mode: "onBlur" });
  const payment = useForm<PaymentData>({ resolver: zodResolver(paymentSchema), mode: "onBlur" });
  const confirm = useForm<ConfirmData>({ resolver: zodResolver(confirmSchema), mode: "onBlur" });

  const pickupDate  = rental.watch("pickupDate")  ?? "";
  const dropoffDate = rental.watch("dropoffDate") ?? "";
  const days = daysBetween(pickupDate, dropoffDate);
  const subtotal = car.price * days;
  const discountAmt = subtotal * discount;
  const tax = (subtotal - discountAmt) * 0.1;
  const total = subtotal - discountAmt + tax;

  function applyPromo() {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setDiscount(PROMO_CODES[code]);
      setPromoMsg({ text: `${code} applied — ${PROMO_CODES[code] * 100}% off!`, ok: true });
    } else {
      setDiscount(0);
      setPromoMsg({ text: "Invalid promo code.", ok: false });
    }
  }

  async function handleSubmit() {
    const [b, r, p, c] = await Promise.all([
      billing.trigger(), rental.trigger(), payment.trigger(), confirm.trigger(),
    ]);
    if (!b) { toast.error("Fill in Billing Info correctly"); return; }
    if (!r) { toast.error("Fill in Rental Info correctly"); return; }
    if (!p && paymentMethod === "credit") { toast.error("Fill in Payment details correctly"); return; }
    if (!c) { toast.error("Please agree to the terms"); return; }
    toast.success(`Rental booked for ${days} day${days > 1 ? "s" : ""} — Total $${total.toFixed(2)}`, { duration: 4000 });
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">

      {/* Left — Steps */}
      <div className="flex-1 min-w-0 flex flex-col gap-6">

        {/* Step 1 — Billing */}
        <SectionCard step="Step 1 of 4" title="Billing Info" subtitle="Please enter your billing info" done={step1Done}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Name"         placeholder="Your name"    error={billing.formState.errors.name?.message}    registration={billing.register("name")} />
            <InputField label="Phone Number" placeholder="Phone number" error={billing.formState.errors.phone?.message}   registration={billing.register("phone")} />
            <InputField label="Address"      placeholder="Address"      error={billing.formState.errors.address?.message} registration={billing.register("address")} />
            <InputField label="Town / City"  placeholder="Town or city" error={billing.formState.errors.city?.message}    registration={billing.register("city", { onBlur: () => billing.trigger().then(v => setStep1Done(v)) })} />
          </div>
        </SectionCard>

        {/* Step 2 — Rental Info */}
        <SectionCard step="Step 2 of 4" title="Rental Info" subtitle="Please select your rental date" done={step2Done}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full border-4 border-[#3563E9] bg-[#3563E9]" />
                <span className="font-semibold text-sm text-gray-900 dark:text-white">Pick – Up</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectInput label="Location" placeholder="Select city"  error={rental.formState.errors.pickupCity?.message} registration={rental.register("pickupCity")} />
                <SelectInput label="Date"     placeholder="YYYY-MM-DD"   error={rental.formState.errors.pickupDate?.message} registration={rental.register("pickupDate")} />
              </div>
              <SelectInput label="Time" placeholder="HH:MM" error={rental.formState.errors.pickupTime?.message} registration={rental.register("pickupTime")} />
            </div>
            <div className="border-t border-gray-100 dark:border-gray-800" />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full border-4 border-[#54A6D4] bg-[#54A6D4]" />
                <span className="font-semibold text-sm text-gray-900 dark:text-white">Drop – Off</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectInput label="Location" placeholder="Select city"  error={rental.formState.errors.dropoffCity?.message} registration={rental.register("dropoffCity")} />
                <SelectInput label="Date"     placeholder="YYYY-MM-DD"   error={rental.formState.errors.dropoffDate?.message} registration={rental.register("dropoffDate")} />
              </div>
              <SelectInput label="Time" placeholder="HH:MM" error={rental.formState.errors.dropoffTime?.message} registration={rental.register("dropoffTime", { onBlur: () => rental.trigger().then(v => setStep2Done(v)) })} />
            </div>
            {days > 1 && (
              <p className="text-xs text-[#3563E9] font-semibold">{days} days × ${car.price}/day = ${subtotal.toFixed(2)}</p>
            )}
          </div>
        </SectionCard>

        {/* Step 3 — Payment */}
        <SectionCard step="Step 3 of 4" title="Payment Method" subtitle="Please enter your payment method" done={step3Done}>
          <div className="flex flex-col gap-3">
            {/* Credit Card */}
            <div className={`border rounded-[10px] overflow-hidden transition-colors ${paymentMethod === "credit" ? "border-[#3563E9]" : "border-gray-200 dark:border-gray-700"}`}>
              <button onClick={() => setPaymentMethod("credit")} className="w-full flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "credit" ? "border-[#3563E9]" : "border-gray-300"}`}>
                    {paymentMethod === "credit" && <div className="w-2.5 h-2.5 rounded-full bg-[#3563E9]" />}
                  </div>
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">Credit Card</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-700 font-black text-sm">VISA</span>
                  <div className="flex"><div className="w-6 h-6 rounded-full bg-red-500 opacity-90" /><div className="w-6 h-6 rounded-full bg-yellow-400 opacity-90 -ml-3" /></div>
                </div>
              </button>
              {paymentMethod === "credit" && (
                <div className="px-5 pb-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Card Number" placeholder="1234 5678 9012 3456" error={payment.formState.errors.cardNumber?.message} registration={payment.register("cardNumber", { onBlur: () => payment.trigger().then(v => setStep3Done(v)) })} />
                  <InputField label="Expiry Date" placeholder="MM/YY"               error={payment.formState.errors.expiry?.message}     registration={payment.register("expiry")} />
                  <InputField label="Card Holder" placeholder="Full name"           error={payment.formState.errors.cardHolder?.message}  registration={payment.register("cardHolder")} />
                  <InputField label="CVC"         placeholder="123"                 error={payment.formState.errors.cvc?.message}         registration={payment.register("cvc")} />
                </div>
              )}
            </div>
            {/* PayPal */}
            <button onClick={() => { setPaymentMethod("paypal"); setStep3Done(true); }} className={`w-full flex items-center justify-between px-5 py-4 border rounded-[10px] transition-colors ${paymentMethod === "paypal" ? "border-[#3563E9]" : "border-gray-200 dark:border-gray-700"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "paypal" ? "border-[#3563E9]" : "border-gray-300"}`}>
                  {paymentMethod === "paypal" && <div className="w-2.5 h-2.5 rounded-full bg-[#3563E9]" />}
                </div>
                <span className="font-semibold text-sm text-gray-900 dark:text-white">PayPal</span>
              </div>
              <span className="font-black text-sm"><span className="text-[#009cde]">Pay</span><span className="text-[#003087]">Pal</span></span>
            </button>
            {/* Bitcoin */}
            <button onClick={() => { setPaymentMethod("bitcoin"); setStep3Done(true); }} className={`w-full flex items-center justify-between px-5 py-4 border rounded-[10px] transition-colors ${paymentMethod === "bitcoin" ? "border-[#3563E9]" : "border-gray-200 dark:border-gray-700"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "bitcoin" ? "border-[#3563E9]" : "border-gray-300"}`}>
                  {paymentMethod === "bitcoin" && <div className="w-2.5 h-2.5 rounded-full bg-[#3563E9]" />}
                </div>
                <span className="font-semibold text-sm text-gray-900 dark:text-white">Bitcoin</span>
              </div>
              <span className="font-black text-sm"><span className="text-[#F7931A]">₿</span><span className="text-gray-800 dark:text-gray-200">itcoin</span></span>
            </button>
          </div>
        </SectionCard>

        {/* Step 4 — Confirmation */}
        <SectionCard step="Step 4 of 4" title="Confirmation" subtitle="We are getting to the end. Just few clicks and your rental is ready!">
          <div className="flex flex-col gap-3">
            <label className="flex items-start gap-3 bg-[#F6F7F9] dark:bg-gray-800 rounded-[8px] px-4 py-3.5 cursor-pointer">
              <input type="checkbox" {...confirm.register("agreeMarketing")} className="mt-0.5 accent-[#3563E9] w-4 h-4 shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-300">I agree with sending Marketing and newsletter emails. No spam, promised!</span>
            </label>
            <label className="flex items-start gap-3 bg-[#F6F7F9] dark:bg-gray-800 rounded-[8px] px-4 py-3.5 cursor-pointer">
              <input type="checkbox" {...confirm.register("agreeTerms")} className="mt-0.5 accent-[#3563E9] w-4 h-4 shrink-0" />
              <span className="text-sm text-gray-600 dark:text-gray-300">I agree with our terms and conditions and privacy policy.</span>
            </label>
            <FieldError msg={confirm.formState.errors.agreeTerms?.message} />
            <button
              onClick={handleSubmit}
              className="mt-2 bg-[#3563E9] hover:bg-[#2a52c9] active:scale-[0.97] transition-all text-white font-semibold px-8 py-3.5 rounded-[4px] w-fit"
            >
              Rent Now
            </button>
            <div className="flex items-start gap-3 mt-2">
              <ShieldCheck size={20} className="text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">All your data are safe</p>
                <p className="text-xs text-gray-400 mt-0.5">We are using the most advanced security to provide you the best experience.</p>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Right — Rental Summary */}
      <div className="w-full lg:w-[340px] shrink-0 bg-white dark:bg-gray-900 rounded-[10px] p-6 flex flex-col gap-6 lg:sticky lg:top-6 border border-transparent dark:border-gray-800">
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Rental Summary</h2>
          <p className="text-xs text-gray-400 mt-1">Prices may change depending on the length of the rental and the price of your rental car.</p>
        </div>

        {/* Car preview */}
        <div className="flex items-center gap-4">
          <div className="relative w-[100px] h-[70px] rounded-[8px] overflow-hidden bg-gradient-to-br from-[#1C3FA8] to-[#3563E9] shrink-0">
            <Image src={car.image} alt={car.name} fill sizes="100px" className="object-contain p-2" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">{car.name}</h3>
            <p className="text-xs text-gray-400">{car.type}</p>
            <div className="flex items-center gap-1 mt-1">
              {[1,2,3,4].map(s => <Star key={s} size={12} className="fill-[#FBAD39] text-[#FBAD39]" />)}
              <Star size={12} className="fill-gray-200 text-gray-200" />
              <span className="text-xs text-gray-400 ml-1">440+</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800" />

        {/* Price breakdown */}
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">{days} day{days > 1 ? "s" : ""} × ${car.price}/day</span>
            <span className="font-semibold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Promo ({discount * 100}% off)</span>
              <span>-${discountAmt.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-400">Tax (10%)</span>
            <span className="font-semibold text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
          </div>
        </div>

        {/* Promo code */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-[8px] overflow-hidden">
            <Tag size={16} className="text-gray-400 ml-3 shrink-0" />
            <input
              type="text"
              value={promoCode}
              onChange={e => { setPromoCode(e.target.value); setPromoMsg(null); }}
              placeholder="Promo code (MORENT20)"
              className="flex-1 px-2 py-3 text-sm text-gray-500 dark:text-gray-300 placeholder:text-gray-300 dark:placeholder:text-gray-600 outline-none bg-transparent"
            />
            <button onClick={applyPromo} className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-[#3563E9] transition-colors whitespace-nowrap border-l border-gray-200 dark:border-gray-700">
              Apply
            </button>
          </div>
          {promoMsg && (
            <p className={`text-xs font-medium ${promoMsg.ok ? "text-green-600" : "text-red-500"}`}>{promoMsg.text}</p>
          )}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-gray-900 dark:text-white">Total Rental Price</p>
            <p className="text-xs text-gray-400 mt-0.5">Overall price and includes rental discount</p>
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
        </div>
      </div>

    </div>
  );
}

import { z } from "zod";

export const billingSchema = z.object({
  name:        z.string().min(2, "Name must be at least 2 characters"),
  phone:       z.string().regex(/^\+?[\d\s\-]{7,15}$/, "Enter a valid phone number"),
  address:     z.string().min(5, "Address must be at least 5 characters"),
  city:        z.string().min(2, "City must be at least 2 characters"),
});

export const rentalSchema = z.object({
  pickupCity:     z.string().min(1, "Select pickup city"),
  pickupDate:     z.string().min(1, "Select pickup date"),
  pickupTime:     z.string().min(1, "Select pickup time"),
  dropoffCity:    z.string().min(1, "Select dropoff city"),
  dropoffDate:    z.string().min(1, "Select dropoff date"),
  dropoffTime:    z.string().min(1, "Select dropoff time"),
});

export const paymentSchema = z.object({
  cardNumber:  z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiry:      z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cardHolder:  z.string().min(2, "Enter cardholder name"),
  cvc:         z.string().regex(/^\d{3,4}$/, "CVC must be 3-4 digits"),
});

export const confirmSchema = z.object({
  agreeMarketing: z.boolean(),
  agreeTerms:     z.boolean().refine((v) => v, "You must agree to terms"),
});

export type BillingData  = z.infer<typeof billingSchema>;
export type RentalData   = z.infer<typeof rentalSchema>;
export type PaymentData  = z.infer<typeof paymentSchema>;
export type ConfirmData  = z.infer<typeof confirmSchema>;

"use client";

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean().default(false),
  mfaToken: z.string().optional()
});

export const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid institution email." }),
  password: z.string().min(12, { message: "Password must be at least 12 characters." }),
  confirmPassword: z.string(),
  departmentId: z.string().optional(),
  role: z.enum(["STUDENT", "SUPERVISOR"]).default("STUDENT"),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." })
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"]
});

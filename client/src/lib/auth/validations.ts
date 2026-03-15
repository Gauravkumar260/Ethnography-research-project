"use client";

import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean().optional(),
  mfaToken: z.string().optional(),
  deviceFingerprint: z.string().optional()
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid institution email."),
  password: z.string().min(12, "Password must be at least 12 characters."),
  confirmPassword: z.string(),
  departmentId: z.string().optional(),
  role: z.enum(["STUDENT", "SUPERVISOR"]).optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions."
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"]
});
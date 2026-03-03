import z from 'zod';

// Schema for registration input
const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(12, 'Password must be at least 12 characters'),
  role: z.enum(['STUDENT', 'SUPERVISOR']).default('STUDENT'),
  departmentId: z.string().optional() // Make required if department logic is strictly enforced
}).strict();

// Schema for login input
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1),
  mfaToken: z.string().optional(),
  deviceFingerprint: z.string().optional(),
  rememberMe: z.boolean().optional()
});

export { 
  registerSchema,
  loginSchema
 };

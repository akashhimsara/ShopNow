//server-side validation and user-creation logic 
"use server";
//ensures the input shape is correct and gives friendly field errors.(zod)
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/hash';

const registerSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterResult =
  | { success: true; userId: string }
  | { success: false; errors: Record<string, string | string[]> };

export async function register(formData: FormData): Promise<RegisterResult> {
  try {
    const data = Object.fromEntries(formData) as Record<string, unknown>;
    const parsed = registerSchema.parse({
      name: typeof data.name === 'string' ? data.name : undefined,
      email: typeof data.email === 'string' ? data.email : '',
      password: typeof data.password === 'string' ? data.password : '',
    });

    const existing = await prisma.user.findUnique({ where: { email: parsed.email } });
    if (existing) {
      return { success: false, errors: { email: 'Email is already registered' } };
    }

    const hashed = await hashPassword(parsed.password);
    const user = await prisma.user.create({
      data: {
        email: parsed.email,
        password: hashed,
        name: parsed.name,
      },
    });

    return { success: true, userId: user.id };
  } catch (err) {
    if (err instanceof z.ZodError) {
      const fieldErrors = Object.fromEntries(
        Object.entries(err.flatten().fieldErrors).map(([k, v]) => [k, v?.join(' ') ?? 'Invalid'])
      ) as Record<string, string>;
      return { success: false, errors: fieldErrors };
    }

    return { success: false, errors: { unknown: 'Registration failed' } };
  }
}

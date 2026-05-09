import { NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    let formData: FormData;

    const contentType = request.headers.get('content-type') ?? '';

    if (contentType.includes('application/json')) {
      const body = (await request.json()) as Record<string, unknown>;
      formData = new FormData();

      if (typeof body.email === 'string') formData.set('email', body.email);
      if (typeof body.password === 'string') formData.set('password', body.password);
    } else {
      formData = await request.formData();
    }

    const data = Object.fromEntries(formData) as Record<string, unknown>;
    const parsed = loginSchema.parse({
      email: typeof data.email === 'string' ? data.email : '',
      password: typeof data.password === 'string' ? data.password : '',
    });

    const user = await prisma.user.findUnique({ where: { email: parsed.email } });

    if (!user || !user.password) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(parsed.password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = Object.fromEntries(
        Object.entries(error.flatten().fieldErrors).map(([key, value]) => [
          key,
          Array.isArray(value) ? value.join(' ') : 'Invalid',
        ])
      );

      return NextResponse.json(
        { message: 'Validation failed', errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Login failed' },
      { status: 500 }
    );
  }
}
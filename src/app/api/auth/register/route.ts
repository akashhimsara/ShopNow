import { NextResponse } from 'next/server';

import { register } from '@/actions/auth';

export async function POST(request: Request) {
  let formData: FormData;

  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const body = (await request.json()) as Record<string, unknown>;
    formData = new FormData();

    if (typeof body.name === 'string') formData.set('name', body.name);
    if (typeof body.email === 'string') formData.set('email', body.email);
    if (typeof body.password === 'string') formData.set('password', body.password);
  } else {
    formData = await request.formData();
  }

  const result = await register(formData);

  if (!result.success) {
    return NextResponse.json(
      {
        message: 'Registration failed',
        errors: result.errors,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message: 'User registered successfully',
      userId: result.userId,
    },
    { status: 201 }
  );
}
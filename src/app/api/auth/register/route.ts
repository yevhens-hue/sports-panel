import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, password, firstName, lastName, role } = data;

    if (!email || !password || !firstName || !lastName || !role) {
      return NextResponse.json(
        { error: 'Заполните все обязательные поля' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        name: `${firstName} ${lastName}`.trim(),
      },
    });

    // Don't return password in response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'Регистрация успешна',
      user: userWithoutPassword,
    }, { status: 201 });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Произошла ошибка при регистрации' },
      { status: 500 }
    );
  }
}

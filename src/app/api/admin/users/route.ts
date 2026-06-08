import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const users = await prisma.user.findMany({
    select: {
      id: true, email: true, name: true, firstName: true, lastName: true,
      role: true, points: true, rank: true, city: true, phone: true,
      birthDate: true, createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(users);
}

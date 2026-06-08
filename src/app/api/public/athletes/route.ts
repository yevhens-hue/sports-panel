import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const athletes = await prisma.user.findMany({
    where: { role: 'ATHLETE' },
    select: {
      id: true, name: true, firstName: true, lastName: true,
      email: true, points: true, rank: true, city: true,
    },
    orderBy: { points: 'desc' },
  });
  return NextResponse.json(athletes);
}

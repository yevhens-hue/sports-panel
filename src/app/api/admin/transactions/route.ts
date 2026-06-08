import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const transactions = await prisma.pointTransaction.findMany({
    include: {
      user: { select: { name: true, email: true, role: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 200,
  });
  return NextResponse.json(transactions);
}

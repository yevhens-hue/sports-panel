import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const parent = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!parent) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Find ParentRelations for this parent
  const relations = await prisma.parentRelation.findMany({
    where: { parentId: parent.id },
    include: {
      athlete: {
        select: {
          id: true, name: true, firstName: true, lastName: true,
          email: true, points: true, rank: true, city: true,
          phone: true, birthDate: true, gender: true,
          pointTransactions: {
            orderBy: { createdAt: 'desc' },
            take: 20,
            select: { type: true, amount: true, date: true, source: true },
          },
        },
      },
    },
  });

  const children = relations.map(r => ({
    ...r.athlete,
    transactions: r.athlete.pointTransactions,
  }));

  return NextResponse.json(children);
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { athleteId, amount, type } = await req.json();
    if (!athleteId || !amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    // Add points transaction
    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2,'0')}.${String(today.getMonth()+1).padStart(2,'0')}.${today.getFullYear()}`;

    await prisma.pointTransaction.create({
      data: {
        userId: athleteId,
        type: type ?? 'Тренировка',
        description: type ?? 'Тренировка',
        amount: parseInt(amount),
        date: dateStr,
        source: 'Начислено тренером',
      },
    });

    // Update user total points
    await prisma.user.update({
      where: { id: athleteId },
      data: { points: { increment: parseInt(amount) } },
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

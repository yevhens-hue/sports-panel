import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { role, points, rank } = await req.json();
    const updated = await prisma.user.update({
      where: { id },
      data: { role, points, rank },
    });
    return NextResponse.json(updated);
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

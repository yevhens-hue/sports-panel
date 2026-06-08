import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      email: 'egormoskat1@gmail.com', password: 'egor4ik56', role: 'ATHLETE',
      name: 'Егор Москат', firstName: 'Егор', lastName: 'Москат', patronymic: 'Дмитриевич',
      phone: '0665257223', city: 'Киев', birthDate: '2011-09-11', gender: 'Мужской',
      points: 9, rank: 'III дорослий розряд'
    },
    {
      email: 'akylbekymnichka@gmail.com', password: 'egor4ik54', role: 'SPONSOR',
      name: 'Акылбек Унич', firstName: 'Акылбек', lastName: 'Унич',
      city: 'Бишкек', points: 0
    },
    {
      email: 'moskat.swim.services@gmail.com', password: 'egor4ik53', role: 'ADMIN',
      name: 'Дмитрий Москат', firstName: 'Дмитрий', lastName: 'Москат', patronymic: 'Леонидович',
      phone: '+380990449473', city: 'Киев', birthDate: '1980-03-16',
      points: 3
    },
    {
      email: 'moskatekaterina85@gmail.com', password: 'egor4ik55', role: 'PARENT',
      name: 'Екатерина Москат', firstName: 'Екатерина', lastName: 'Москат', patronymic: 'Владимировна',
      city: 'Киев', birthDate: '1985-11-23', points: 9
    },
    {
      email: 'swim.play.win@gmail.com', password: 'egor4ik57', role: 'COACH',
      name: 'Дмитрий Москат', firstName: 'Дмитрий', lastName: 'Москат', patronymic: 'Леонидович',
      phone: '+380990449473', city: 'Киев', birthDate: '1980-03-16', points: 3
    },
  ];

  const createdUsers = {};

  for (const u of users) {
    const hashedPassword = await bcrypt.hash(u.password, 10);
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {
        name: u.name, firstName: u.firstName, lastName: u.lastName,
        patronymic: u.patronymic ?? null, phone: u.phone ?? null, city: u.city ?? null,
        birthDate: u.birthDate ?? null, gender: u.gender ?? null, points: u.points ?? 0,
        rank: u.rank ?? null
      },
      create: {
        email: u.email, password: hashedPassword, role: u.role, name: u.name,
        firstName: u.firstName ?? null, lastName: u.lastName ?? null,
        patronymic: u.patronymic ?? null, phone: u.phone ?? null, city: u.city ?? null,
        birthDate: u.birthDate ?? null, gender: u.gender ?? null, points: u.points ?? 0,
        rank: u.rank ?? null
      }
    });
    createdUsers[u.role] = user.id;
  }

  // Create Parent-Athlete relation (Екатерина → Егор)
  const parentId = createdUsers['PARENT'];
  const athleteId = createdUsers['ATHLETE'];
  if (parentId && athleteId) {
    await prisma.parentRelation.upsert({
      where: { id: `${parentId}-${athleteId}` },
      update: {},
      create: {
        id: `${parentId}-${athleteId}`,
        parentId, athleteId, relation: 'MOTHER',
      }
    }).catch(async () => {
      // If upsert by custom id fails, try findFirst + create
      const existing = await prisma.parentRelation.findFirst({
        where: { parentId, athleteId }
      });
      if (!existing) {
        await prisma.parentRelation.create({ data: { parentId, athleteId, relation: 'MOTHER' } });
      }
    });
  }

  // Create Coach-Athlete relation
  const coachId = createdUsers['COACH'];
  if (coachId && athleteId) {
    const existing = await prisma.coachRelation.findFirst({ where: { coachId, athleteId } });
    if (!existing) {
      await prisma.coachRelation.create({ data: { coachId, athleteId } });
    }
  }

  // Create some point transactions for Егор
  const txCount = await prisma.pointTransaction.count({ where: { userId: athleteId } });
  if (txCount === 0 && athleteId) {
    await prisma.pointTransaction.createMany({
      data: [
        { userId: athleteId, type: 'Тренировка', description: 'Тренировка', amount: 3, date: '01.06.2026', source: 'Начислено тренером' },
        { userId: athleteId, type: 'Тренировка', description: 'Тренировка', amount: 3, date: '11.05.2026', source: 'Начислено тренером' },
        { userId: athleteId, type: 'Тренировка', description: 'Тренировка', amount: 3, date: '08.05.2026', source: 'Начислено тренером' },
      ]
    });
  }

  console.log('Seed completed successfully!');
  console.log('Users created:', JSON.stringify(createdUsers, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());

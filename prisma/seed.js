import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123@@', 10);

  const users = [
    {
      name: 'Angelou Sereno',
      email: '21103909@usc.edu.ph',
      password: hashedPassword,
    },
    { name: 'Admin', email: 'admin@usc.edu.ph', password: hashedPassword },
  ];

  await prisma.user.createMany({ data: users });

  console.log('✅ Users seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

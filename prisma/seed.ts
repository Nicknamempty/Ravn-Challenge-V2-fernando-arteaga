// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const user1 = await prisma.user.upsert({
    where: { email: 'fermerinonew@gmail.com' },
    update: {},
    create: {
      email: 'fermerinonew@gmail.com',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'fernand0scar@hotmai.com' },
    update: {},
    create: {
      email: 'fernand0scar@hotmail.com',
    },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });

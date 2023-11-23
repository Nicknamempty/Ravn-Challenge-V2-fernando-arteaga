import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'fermerinonew@gmail.com' },
    update: {},
    create: {
      email: 'fermerinonew@gmail.com',
    },
  });

  await prisma.user.upsert({
    where: { email: 'fernand0scar@hotmail.com' },
    update: {},
    create: {
      email: 'fernand0scar@hotmail.com',
    },
  });

  await prisma.role.upsert({
    where: { name: 'Manager' },
    update: {},
    create: {
      name: 'Manager',
    },
  });
  await prisma.role.upsert({
    where: { name: 'Client' },
    update: {},
    create: {
      name: 'Client',
    },
  });

  await prisma.product.upsert({
    where: { name: 'shampoo goof goof' },
    update: {},
    create: {
      name: 'shampoo goof goof',
      description: 'is an incredible shampoo',
      price: 12.34,
      stock: 4,
    },
  });

  await prisma.product.upsert({
    where: { name: 'shampoo meow meow' },
    update: {},
    create: {
      name: 'shampoo meow meow',
      description: 'is an incredible shampoo',
      price: 11.34,
      stock: 5,
    },
  });

  await prisma.category.upsert({
    where: { name: 'clothes' },
    update: {},
    create: {
      name: 'clothes',
    },
  });
  await prisma.category.upsert({
    where: { name: 'food' },
    update: {},
    create: {
      name: 'food',
    },
  });
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

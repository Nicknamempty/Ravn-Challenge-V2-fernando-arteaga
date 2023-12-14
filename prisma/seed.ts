import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const manager = await prisma.role.upsert({
    where: { name: 'Manager' },
    update: {},
    create: {
      name: 'Manager',
    },
  });
  const client = await prisma.role.upsert({
    where: { name: 'Client' },
    update: {},
    create: {
      name: 'Client',
    },
  });
  const defaultPassword = await bcrypt.hash('password123', 12);
  const defaultPassword2 = await bcrypt.hash('pasword124', 12);

  const userManager = await prisma.user.upsert({
    where: { email: 'fermerinonew@gmail.com' },
    update: {},
    create: {
      email: 'fermerinonew@gmail.com',
      password: defaultPassword,
    },
  });

  await prisma.user.upsert({
    where: { email: 'fernand0scar@hotmail.com' },
    update: {},
    create: {
      email: 'fernand0scar@hotmail.com',
      password: defaultPassword2,
      roleId: client.id,
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

  await prisma.user.update({
    where: { id: userManager.id },
    data: {
      role: {
        connect: { id: manager.id },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

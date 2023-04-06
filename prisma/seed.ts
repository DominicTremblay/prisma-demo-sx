import { PrismaClient } from '@prisma/client';

import { movies } from './seeds/movies';
import { actors } from './seeds/actors';
import { casting } from './seeds/casting';

const prisma = new PrismaClient();

async function main() {
  await prisma.movie.createMany({
    data: movies,
  });

  await prisma.actor.createMany({
    data: actors,
  });

  await prisma.casting.createMany({
    data: casting,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

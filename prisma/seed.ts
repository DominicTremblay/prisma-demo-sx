import { PrismaClient } from '@prisma/client';

import {movies} from './seeds/movies';

const prisma = new PrismaClient();

async function main() {
  await prisma.movie.createMany({
    data: movies,
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

import { PrismaClient } from '@prisma/client';
import { prices } from './prices';

const prisma = new PrismaClient();

async function main() {
  // Очищаем существующие цены
  await prisma.price.deleteMany();

  // Создаем новые цены
  for (const [workType, pagePrices] of Object.entries(prices)) {
    for (const [pageRange, amount] of Object.entries(pagePrices)) {
      await prisma.price.create({
        data: {
          workType,
          pageRange,
          amount: amount as number,
        },
      });
    }
  }

  console.log('Цены успешно добавлены в базу данных');
}

main()
  .catch((e) => {
    console.error('Ошибка при заполнении базы данных:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/id_ID";

const prisma = new PrismaClient();

async function main() {
  // hapus data lama
  await prisma.transactions.deleteMany();

  // seed transaksi
  const transactions = [];
  for (let i = 0; i < 100; i++) {
    // tambah ke array transaksi
    transactions.push({
      user_id: faker.number.int({ min: 1, max: 10 }),
      category_id: faker.number.int({ min: 1, max: 10 }),
      wallet_id: faker.number.int({ min: 1, max: 10 }),
      date: faker.date.recent({ days: 30 }),
      amount: faker.number.int({ min: 1000, max: 1000000 }),
      note: faker.lorem,
    });
  }

  //   simpan di database
  await prisma.transactions.createMany({ data: transactions });

  console.log(`${transactions.length} data transaksi berhasil dibuat`);
}

main()
  .catch((e) => {
    console.error("Tidak berhasil seeding database");
    process.exit(1);
  })
  .finally(async () => {
    // apaun yang terjadi
    await prisma.$disconect(); // tutup kodeksi dgn database
  });

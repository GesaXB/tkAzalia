import { PrismaPg } from '@prisma/adapter-pg';
import * as bcryptjs from 'bcryptjs';
import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { Role, Status, StatusValidasi, Tipe } from '../generated/prisma/enums';
import {
  BerkasSiswaSeedData,
  InformasiSekolahSeedData,
  JenisBerkasSeedData,
  UserSeedData,
} from '../src/types/seed.types';

const connectionString = `${process.env.DATABASE_URL}`;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
}

const adminUsers: UserSeedData[] = [
  {
    username: 'admin',
    password: 'admin123',
    role: Role.admin,
    nama_lengkap: 'Administrator Utama',
    email: 'admin@tkazalia.com',
    no_telp: '081234567890',
  },
  {
    username: 'admin2',
    password: 'admin123',
    role: Role.admin,
    nama_lengkap: 'Admin Dua',
    email: 'admin2@tkazalia.com',
    no_telp: '081234567891',
  },
  {
    username: 'admin3',
    password: 'admin123',
    role: Role.admin,
    nama_lengkap: 'Admin Tiga',
    email: 'admin3@tkazalia.com',
    no_telp: '081234567892',
  },
  {
    username: 'admin4',
    password: 'admin123',
    role: Role.admin,
    nama_lengkap: 'Admin Empat',
    email: 'admin4@tkazalia.com',
    no_telp: '081234567893',
  },
  {
    username: 'admin5',
    password: 'admin123',
    role: Role.admin,
    nama_lengkap: 'Admin Lima',
    email: 'admin5@tkazalia.com',
    no_telp: '081234567894',
  },
];

async function seedAdmins(): Promise<number> {
  console.log('Seeding admin users...');
  const usersToCreate: UserSeedData[] = [];

  for (const user of adminUsers) {
    usersToCreate.push({
      ...user,
      password: await hashPassword(user.password),
    });
  }

  await prisma.user.createMany({
    data: usersToCreate,
  });

  console.log(`${usersToCreate.length} admin users berhasil dibuat`);
  return usersToCreate.length;
}

async function main() {
  try {
    console.log('Memulai seeding database (Hanya Admin)...\n');

    console.log('Menghapus data lama...');
    await prisma.berkasSiswa.deleteMany({});
    await prisma.jenisBerkas.deleteMany({});
    await prisma.siswa.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.informasiSekolah.deleteMany({});
    await prisma.ppdbSetting.deleteMany({});
    console.log('Data lama berhasil dihapus\n');

    const adminCount = await seedAdmins();

    console.log('\n' + '='.repeat(50));
    console.log('SEEDING ADMIN BERHASIL!');
    console.log('='.repeat(50));
    console.log(`Berhasil membuat ${adminCount} akun admin.`);
    console.log('='.repeat(50));
  } catch (error) {
    console.error('Error saat seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

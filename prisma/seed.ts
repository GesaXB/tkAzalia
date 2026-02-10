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
    nama_lengkap: 'Administrator',
    email: 'admin@tkazalia.com',
    no_telp: '081234567890',
  },
];

const regularUsers: UserSeedData[] = [
  {
    username: 'john_doe',
    password: 'user123',
    role: Role.user,
    nama_lengkap: 'John Doe',
    email: 'john@tkazalia.com',
    no_telp: '082345678901',
  },
];

const jenisBerkasData: JenisBerkasSeedData[] = [
  { nama_berkas: 'Akte Kelahiran' },
  { nama_berkas: 'Kartu Keluarga' },
  { nama_berkas: 'Foto 3x4' },
];

const namaDepan = ['Ahmad', 'Budi', 'Citra'];

const informasiSekolahData: InformasiSekolahSeedData[] = [
  {
    judul: 'Profil TK Azalia',
    slug: 'profil-tk-azalia',
    konten: 'TK Azalia adalah lembaga pendidikan anak usia dini yang berkomitmen untuk mengembangkan potensi optimal setiap anak.',
    tipe: Tipe.profil,
    status: Status.published,
    urutan: 1,
  },
  {
    judul: 'Visi TK Azalia',
    slug: 'visi-tk-azalia',
    konten: 'Menjadi lembaga pendidikan anak usia dini yang unggul dalam mengembangkan karakter dan kreativitas anak didik.',
    tipe: Tipe.visi,
    status: Status.published,
    urutan: 1,
  },
  {
    judul: 'Misi TK Azalia',
    slug: 'misi-tk-azalia',
    konten: 'Memberikan pendidikan berkualitas, mengembangkan kreativitas anak, dan membentuk karakter yang baik sejak dini.',
    tipe: Tipe.misi,
    status: Status.published,
    urutan: 1,
  },
];

async function seedUsers(): Promise<number> {
  console.log('Seeding users...');

  const usersToCreate: UserSeedData[] = [];

  // Add admin users
  for (const user of adminUsers) {
    usersToCreate.push({
      ...user,
      password: await hashPassword(user.password),
    });
  }

  for (const user of regularUsers) {
    usersToCreate.push({
      ...user,
      password: await hashPassword(user.password),
    });
  }

  for (let i = 0; i < jenisBerkasData.length; i++) {
    usersToCreate.push({
      username: `siswa_${i + 1}`,
      password: await hashPassword(`siswa${i + 1}123`),
      role: Role.user,
      nama_lengkap: `${namaDepan[i]} Hidayat Ramadhan`,
      email: `siswa${i + 1}@tkazalia.com`,
      no_telp: `0834567890${i}${i}`,
    });
  }

  await prisma.user.createMany({
    data: usersToCreate,
  });

  console.log(`${usersToCreate.length} users berhasil dibuat`);
  return usersToCreate.length;
}

async function seedJenisBerkas(): Promise<number> {
  console.log('Seeding jenis berkas...');

  const result = await prisma.jenisBerkas.createMany({
    data: jenisBerkasData,
  });

  console.log(`${result.count} jenis berkas berhasil dibuat`);
  return result.count;
}

async function seedSiswaAndBerkas(): Promise<{ siswaCount: number; berkasCount: number }> {
  console.log('Seeding siswa dan berkas siswa...');

  const jenisBerkasRecords = await prisma.jenisBerkas.findMany();
  const siswaUsers = await prisma.user.findMany({
    where: {
      username: {
        startsWith: 'siswa_',
      },
    },
  });

  const siswaList = [];
  for (const user of siswaUsers) {
    const siswa = await prisma.siswa.create({
      data: {
        user_id: user.user_id,
      },
    });
    siswaList.push(siswa);
  }

  console.log(`${siswaList.length} siswa berhasil dibuat`);

  const berkasSiswaDataToCreate: BerkasSiswaSeedData[] = [];

  for (let i = 0; i < siswaList.length; i++) {
    let status: StatusValidasi;
    let catatan: string;

    if (i % 3 === 0) {
      status = StatusValidasi.tidak_valid;
      catatan = 'File tidak jelas, silahkan upload ulang';
    } else if (i % 2 === 0) {
      status = StatusValidasi.valid;
      catatan = 'Dokumen valid dan diterima';
    } else {
      status = StatusValidasi.menunggu;
      catatan = 'Dokumen sedang divalidasi';
    }

    berkasSiswaDataToCreate.push({
      siswa_id: siswaList[i].siswa_id,
      jenis_berkas_id: jenisBerkasRecords[i].jenis_berkas_id,
      nama_file: `${jenisBerkasRecords[i].nama_berkas}-${namaDepan[i]}.pdf`,
      nama_file_hash: `hash_${Date.now()}_${i}`,
      path_file: `/uploads/berkas/${siswaList[i].siswa_id}/${jenisBerkasRecords[i].nama_berkas}.pdf`,
      ukuran_file: Math.floor(Math.random() * 5000) + 500,
      tipe_file: 'application/pdf',
      status_validasi: status,
      catatan_validasi: catatan,
    });
  }

  const berkasSiswaResult = await prisma.berkasSiswa.createMany({
    data: berkasSiswaDataToCreate,
  });

  console.log(`${berkasSiswaResult.count} berkas siswa berhasil dibuat`);

  return {
    siswaCount: siswaList.length,
    berkasCount: berkasSiswaResult.count,
  };
}

async function seedInformasiSekolah(): Promise<number> {
  console.log('Seeding informasi sekolah...');

  const result = await prisma.informasiSekolah.createMany({
    data: informasiSekolahData,
  });

  console.log(`${result.count} informasi sekolah berhasil dibuat`);
  return result.count;
}


async function main() {
  try {
    console.log('Memulai seeding database...\n');

    console.log('Menghapus data lama...');
    await prisma.berkasSiswa.deleteMany({});
    await prisma.jenisBerkas.deleteMany({});
    await prisma.siswa.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.informasiSekolah.deleteMany({});
    console.log('Data lama berhasil dihapus\n');

    const userCount = await seedUsers();
    await seedJenisBerkas();
    const { siswaCount, berkasCount } = await seedSiswaAndBerkas();
    const informasiCount = await seedInformasiSekolah();

    console.log('\n' + '='.repeat(50));
    console.log('SEEDING BERHASIL DISELESAIKAN!');
    console.log('='.repeat(50));
    console.log('Ringkasan seeding:');
    console.log(`  - Users: ${userCount}`);
    console.log(`  - Jenis Berkas: ${jenisBerkasData.length}`);
    console.log(`  - Siswa: ${siswaCount}`);
    console.log(`  - Berkas Siswa: ${berkasCount}`);
    console.log(`  - Informasi Sekolah: ${informasiCount}`);
    console.log('='.repeat(50));
  } catch (error) {
    console.error('Error saat seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

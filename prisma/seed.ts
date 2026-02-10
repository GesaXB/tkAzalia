import { PrismaPg } from '@prisma/adapter-pg';
import * as bcryptjs from 'bcryptjs';
import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { Role, Status, StatusValidasi, Tipe } from '../generated/prisma/enums';

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

async function main() {
  try {
    console.log('Memulai seeding database...');

    console.log('🗑️  Menghapus data lama...');
    await prisma.berkasSiswa.deleteMany({});
    await prisma.jenisBerkas.deleteMany({});
    await prisma.siswa.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.informasiSekolah.deleteMany({});

    console.log('👤 Seeding users...');
    const hashedPassword1 = await hashPassword('admin123');
    const hashedPassword2 = await hashPassword('user123');
    const hashedPassword3 = await hashPassword('siswa123');

    const adminUser = await prisma.user.create({
      data: {
        username: 'admin',
        password: hashedPassword1,
        role: Role.admin,
        nama_lengkap: 'Administrator',
        email: 'admin@tkazalia.com',
        no_telp: '081234567890',
      },
    });

    const user1 = await prisma.user.create({
      data: {
        username: 'john_doe',
        password: hashedPassword2,
        role: Role.user,
        nama_lengkap: 'John Doe',
        email: 'john@tkazalia.com',
        no_telp: '082345678901',
      },
    });

    const siswaUser = await prisma.user.create({
      data: {
        username: 'ahmad_siswa',
        password: hashedPassword3,
        role: Role.user,
        nama_lengkap: 'Ahmad Hidayat Ramadhan',
        email: 'ahmad@tkazalia.com',
        no_telp: '083456789012',
      },
    });

    console.log(`users berhasil dibuat`);

    console.log('Seeding jenis berkas...');
    const jenisBerkasList = await prisma.jenisBerkas.createMany({
      data: [
        { nama_berkas: 'Akte Kelahiran' },
        { nama_berkas: 'Kartu Keluarga' },
        { nama_berkas: 'Foto 3x4' },
        { nama_berkas: 'Surat Kesehatan' },
        { nama_berkas: 'Surat Rekomendasi dari TK Asal' },
        { nama_berkas: 'Laporan Perkembangan Anak' },
      ],
    });

    console.log(`${jenisBerkasList.count} jenis berkas berhasil dibuat`);

    const jenisBerkasData = await prisma.jenisBerkas.findMany();

    console.log('Seeding siswa...');

    // Buat siswa untuk setiap jenis berkas
    const siswaList = [];
    const namaDepan = [
      'Ahmad',
      'Budi',
      'Citra',
      'Dani',
      'Eka',
      'Faisal',
    ];

    for (let i = 0; i < jenisBerkasData.length; i++) {
      const user = await prisma.user.create({
        data: {
          username: `siswa_${i + 1}`,
          password: await hashPassword(`siswa${i + 1}123`),
          role: Role.user,
          nama_lengkap: `${namaDepan[i]} Hidayat Ramadhan`,
          email: `siswa${i + 1}@tkazalia.com`,
          no_telp: `0834567890${i}${i}`,
        },
      });

      const siswa = await prisma.siswa.create({
        data: {
          user_id: user.user_id,
        },
      });

      siswaList.push(siswa);
    }

    console.log(`${siswaList.length} siswa berhasil dibuat`);

    console.log('Seeding berkas siswa...');
    const berkasSiswaData: Array<{
      siswa_id: number;
      jenis_berkas_id: number;
      nama_file: string;
      nama_file_hash: string;
      path_file: string;
      ukuran_file: number;
      tipe_file: string;
      status_validasi: StatusValidasi;
      catatan_validasi: string;
    }> = [];

    // Setiap siswa akan memiliki satu berkas yang sesuai dengan jenis berkasnya
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

      berkasSiswaData.push({
        siswa_id: siswaList[i].siswa_id,
        jenis_berkas_id: jenisBerkasData[i].jenis_berkas_id,
        nama_file: `${jenisBerkasData[i].nama_berkas}-${namaDepan[i]}.pdf`,
        nama_file_hash: `hash_${Date.now()}_${i}`,
        path_file: `/uploads/berkas/${siswaList[i].siswa_id}/${jenisBerkasData[i].nama_berkas}.pdf`,
        ukuran_file: Math.floor(Math.random() * 5000) + 500,
        tipe_file: 'application/pdf',
        status_validasi: status,
        catatan_validasi: catatan,
      });
    }

    const berkasSiswaCreated = await prisma.berkasSiswa.createMany({
      data: berkasSiswaData,
    });

    console.log(`${berkasSiswaCreated.count} berkas siswa berhasil dibuat`);

    // ========== SEED INFORMASI SEKOLAH ==========
    console.log('Seeding informasi sekolah...');
    const informasiSekolahData = await prisma.informasiSekolah.createMany({
      data: [
        {
          judul: 'Profil TK Azalia',
          slug: 'profil-tk-azalia',
          konten:
            'TK Azalia adalah lembaga pendidikan anak usia dini yang berkomitmen untuk mengembangkan potensi optimal setiap anak melalui pembelajaran yang menyenangkan dan bermakna.',
          tipe: Tipe.profil,
          status: Status.published,
          urutan: 1,
        },
        {
          judul: 'Visi TK Azalia',
          slug: 'visi-tk-azalia',
          konten:
            'Menjadi lembaga pendidikan anak usia dini yang unggul dalam mengembangkan karakter, kreativitas, dan kompetensi anak didik.',
          tipe: Tipe.visi,
          status: Status.published,
          urutan: 1,
        },
        {
          judul: 'Misi TK Azalia',
          slug: 'misi-tk-azalia',
          konten:
            'Memberikan pendidikan yang berkualitas dan inovatif. Mengembangkan kreativitas dan kemampuan sosial anak. Membentuk karakter yang baik sejak dini.',
          tipe: Tipe.misi,
          status: Status.published,
          urutan: 1,
        },
        {
          judul: 'Fasilitas Sekolah',
          slug: 'fasilitas',
          konten:
            'Ruang kelas yang nyaman dan aman. Perpustakaan dengan koleksi buku anak yang lengkap. Area bermain indoor dan outdoor. Kantin yang menyediakan makanan sehat. Fasilitas kesehatan dengan dokter dan perawat.',
          tipe: Tipe.fasilitas,
          status: Status.published,
          urutan: 1,
        },
        {
          judul: 'Kontak',
          slug: 'kontak',
          konten:
            'Alamat: Jl. Azalia No. 123, Jakarta Selatan. Telepon: (021) 1234-5678. Email: info@tkazalia.com. WhatsApp: 0812-3456-7890',
          tipe: Tipe.kontak,
          status: Status.published,
          urutan: 1,
        },
        {
          judul: 'Syarat Pendaftaran',
          slug: 'syarat-pendaftaran',
          konten:
            'Usia anak minimal 2 tahun. Membawa fotokopi akta kelahiran. Membawa fotokopi kartu keluarga. Membawa surat kesehatan dari dokter. Membawa pas foto 3x4 sebanyak 2 lembar.',
          tipe: Tipe.syarat_pendaftaran,
          status: Status.published,
          urutan: 1,
        },
      ],
    });

    console.log(`${informasiSekolahData.count} informasi sekolah berhasil dibuat`);

    console.log('\n✨ Seeding berhasil diselesaikan!');
    console.log('Ringkasan seeding:');
    console.log(`  - Users: 3 + ${siswaList.length} siswa = ${3 + siswaList.length} total`);
    console.log(`  - Jenis Berkas: ${jenisBerkasData.length}`);
    console.log(`  - Siswa: ${siswaList.length}`);
    console.log(`  - Berkas Siswa: ${berkasSiswaCreated.count}`);
    console.log(`  - Informasi Sekolah: ${informasiSekolahData.count}`);
  } catch (error) {
    console.error('Error saat seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

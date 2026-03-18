
import 'dotenv/config';
import { prisma } from './src/lib/prisma';

async function test() {
  try {
    console.log('Testing Prisma singleton with dotenv...');
    const users = await prisma.user.findMany({ take: 1 });
    console.log('Success! Users found:', users.length);
    await prisma.$disconnect();
  } catch (err) {
    console.error('Prisma verification failed:', err);
    process.exit(1);
  }
}

test();

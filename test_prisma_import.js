
const { prisma } = require('./src/lib/prisma');

async function test() {
  try {
    console.log('Attempting to connect...');
    await prisma.$connect();
    console.log('Connected!');
    const users = await prisma.user.findMany({ take: 1 });
    console.log('Users:', users);
    await prisma.$disconnect();
  } catch (err) {
    console.error('FAILED TO CONNECT OR QUERY:', err);
    process.exit(1);
  }
}

test();

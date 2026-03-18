
const { PrismaClient } = require('../generated/prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

async function main() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  try {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });
    
    console.log('Connecting to database...');
    await prisma.$connect();
    console.log('Connected successfully!');
    
    const userCount = await prisma.user.count();
    console.log('User count:', userCount);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('Prisma connection error:', error);
  }
}

main();

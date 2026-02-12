import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { listJenisBerkas } from '@/lib/ppdb';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';

async function getHandler(): Promise<NextResponse<ApiResponse>> {
  const data = await listJenisBerkas();
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status: 200 }
  );
}

export const GET = authMiddleware(getHandler, ['user', 'admin']);

import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types';
import { authMiddleware, AuthenticatedRequest } from '@/lib/middleware/auth';
import { listSiswaWithUser } from '@/lib/ppdb';

async function handler(req: AuthenticatedRequest): Promise<NextResponse<ApiResponse>> {
  const data = await listSiswaWithUser();

  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status: 200 }
  );
}

export const GET = authMiddleware(handler, ['admin']);


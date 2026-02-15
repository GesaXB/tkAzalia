import { AuthService } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export interface AuthPayload {
  userId: number;
  username: string;
  role: string;
  [key: string]: unknown;
}
export interface AuthenticatedRequest extends NextRequest {
  user: AuthPayload;
}
export type ApiHandler<T = unknown> = (
  req: AuthenticatedRequest,
  ...args: unknown[]
) => Promise<NextResponse<T>> | NextResponse<T>;

export function authMiddleware<T = unknown>(
  handler: ApiHandler<T>,
  allowedRoles: string[] = []
) {
  return async (req: NextRequest, ...args: unknown[]) => {
    try {
      const authHeader = req.headers.get('authorization');

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized: No token provided' },
          { status: 401 }
        );
      }

      const token = authHeader.split(' ')[1];
      const payload = AuthService.verifyToken(token);

      if (!payload) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized: Invalid token' },
          { status: 401 }
        );
      }

      const authPayload = payload as AuthPayload;

      if (allowedRoles.length > 0 && !allowedRoles.includes(authPayload.role)) {
        return NextResponse.json(
          { success: false, error: 'Forbidden: Insufficient permissions' },
          { status: 403 }
        );
      }

      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.user = authPayload;

      return handler(authenticatedReq, ...args);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

export type FlexibleApiHandler = (
  req: NextRequest | AuthenticatedRequest,
  ...args: unknown[]
) => Promise<NextResponse> | NextResponse;

export function authMiddleware2<T = Record<string, unknown>>(
  handler: ApiHandler<T>,
  allowedRoles: string[] = []
) {
  return async (req: NextRequest, ...args: unknown[]) => {
    try {
      const authHeader = req.headers.get('authorization');

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json<{ success: false; error: string }>(
          { success: false, error: 'Unauthorized: No token provided' },
          { status: 401 }
        );
      }

      const token = authHeader.split(' ')[1];
      const payload = AuthService.verifyToken(token);

      if (!payload) {
        return NextResponse.json<{ success: false; error: string }>(
          { success: false, error: 'Unauthorized: Invalid token' },
          { status: 401 }
        );
      }

      const authPayload = payload as AuthPayload;

      if (allowedRoles.length > 0 && !allowedRoles.includes(authPayload.role)) {
        return NextResponse.json<{ success: false; error: string }>(
          { success: false, error: 'Forbidden: Insufficient permissions' },
          { status: 403 }
        );
      }

      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.user = authPayload;

      return handler(authenticatedReq, ...args);
    } catch (error) {
      console.error('Auth middleware error:', error);

      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';

      return NextResponse.json<{ success: false; error: string }>(
        { success: false, error: errorMessage },
        { status: 500 }
      );
    }
  };
}

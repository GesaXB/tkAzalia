import { ApiResponse } from '@/types';
import { clearToken, getToken } from './session';

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  withAuth = false
): Promise<ApiResponse<T>> {
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (withAuth) {
    const token = getToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });

  const text = await response.text();
  let data: ApiResponse<T>;
  try {
    data = (text ? JSON.parse(text) : {}) as ApiResponse<T>;
  } catch {
    if (!response.ok) {
      console.error(`API Error: ${response.status} ${response.statusText}`, text ? text.slice(0, 500) : 'Empty response');
      return {
        success: false,
        error: response.status === 500 ? 'Kesalahan server. Cek konsol backend.' : 'Request gagal',
      };
    }
    return {
      success: false,
      error: 'Respons tidak valid',
    };
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearToken();
    }
    return {
      success: false,
      error: (data && typeof data === 'object' && 'error' in data && data.error) || 'Request gagal',
    };
  }

  return data;
}


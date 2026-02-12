import { ApiResponse, RegisterData } from '@/types';
import { apiRequest } from './api';

export interface AuthUser {
  user_id: number;
  username: string;
  role: 'admin' | 'user';
  nama_lengkap: string;
  email: string;
  no_telp: string;
}

export interface LoginResult {
  token: string;
  user: AuthUser;
}

export async function login(username: string, password: string) {
  return apiRequest<LoginResult>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function register(data: RegisterData) {
  return apiRequest<AuthUser>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function fetchProfile() {
  return apiRequest<AuthUser>('/api/auth/profile', {
    method: 'GET',
  }, true);
}

export interface UpdateProfilePayload {
  nama_lengkap?: string;
  email?: string;
  no_telp?: string;
}

export async function updateProfile(payload: UpdateProfilePayload) {
  return apiRequest<AuthUser>('/api/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(payload),
  }, true);
}


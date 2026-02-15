export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^08[0-9]{8,11}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

export interface ValidationError {
  field: string;
  message: string;
}

export const validateRegisterForm = (formData: {
  namaLengkap: string;
  username: string;
  email: string;
  noTelepon: string;
  password: string;
  confirmPassword: string;
}): ValidationError | null => {
  const { namaLengkap, username, email, noTelepon, password, confirmPassword } = formData;

  if (!namaLengkap.trim()) return { field: "namaLengkap", message: "Nama lengkap tidak boleh kosong" };
  if (!username.trim()) return { field: "username", message: "Username tidak boleh kosong" };
  if (!email.trim()) return { field: "email", message: "Email tidak boleh kosong" };
  if (!validateEmail(email)) return { field: "email", message: "Format email tidak valid" };
  if (!noTelepon.trim()) return { field: "noTelepon", message: "Nomor telepon tidak boleh kosong" };
  if (!validatePhone(noTelepon)) return { field: "noTelepon", message: "Nomor telepon harus dimulai dengan 08 dan 10-13 digit" };
  if (!password) return { field: "password", message: "Password tidak boleh kosong" };
  if (!validatePassword(password)) return { field: "password", message: "Password minimal 8 karakter" };
  if (!confirmPassword) return { field: "confirmPassword", message: "Konfirmasi password tidak boleh kosong" };
  if (!validatePasswordMatch(password, confirmPassword)) return { field: "confirmPassword", message: "Konfirmasi password tidak cocok" };

  return null;
};

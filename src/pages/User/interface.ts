export interface User {
  id: number;
  fullName: string;
  email: string;
  role: "ADMIN" | "USER" | string; // role cụ thể nếu muốn giới hạn
  createdAt: string | null; // ISO date string hoặc null
  updatedAt: string | null; // ISO date string hoặc null
}

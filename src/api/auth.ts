import axiosInstance from "@/api/axios";
import qs from "qs";

export const authLogin = async (body: {
  code: string;
  encrypt_key: string;
}) => {
  const res = await axiosInstance.get(
    `/api/security/token?code=${body.code}&encrypt_key=${body.encrypt_key}`
  );
  return res.data;
};

export const authRefreshToken = async (body: any) => {
  const res = await axiosInstance.post(`auth/refresh-token`, body);
  return res.data;
};

export const getProfile = async () => {
  const res = await axiosInstance.get(`/api/security/profile`);
  return res.data.data;
};

export const getMenu = async () => {
  const res = await axiosInstance.get(`/api/security/menu`);
  return res.data.data;
};

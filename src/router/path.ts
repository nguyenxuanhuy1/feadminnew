export const BASE_URL = process.env.REACT_APP_DB_URL;
const Path: Record<string, string> = {
  Home: "/",
  Login: "/login",
  Register: "/register",
  XacThuc: "/xac-thuc",
  BaiViet: "/bai-viet",
  Video: "/video",
  Category: "/category",
  User: "/user",
};
export default Path;

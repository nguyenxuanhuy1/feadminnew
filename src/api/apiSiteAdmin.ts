import axiosInstance from "./axios";


// api cho màn thẩm quyền
export const searchThamQuyen = async (
  body: any,
  page: number,
  size: number
) => {
  const res = await axiosInstance.get(
    `/api/articles/search?${page}&size=${size}`,
    body
  );
  return res;
};
export const createThamQuyen = async (body: any) => {
  const res = await axiosInstance.post(`/api/articles/create`, body);
  return res;
};
export const updateThamQuyen = async (id: string, body: any) => {
  const res = await axiosInstance.post(`/api/articles/update/${id}`, body);
  return res;
};
export const daleteThamQuyen = async (id: string) => {
  const res = await axiosInstance.post(`/api/articles/delete/${id}`, id);
  return res;
};
export const detailThamQuyen = async (id: string) => {
  const res = await axiosInstance.get(`/api/articles/detail/${id}`);
  return res;
};
export const exportThamQuyen = async (body: any) => {
  const res = await axiosInstance.post(`/api/cms/competent/export`, body, {
    responseType: "blob",
  });
  return res;
};
// gửi file thẩm quyền
export const createFileThamQuyen = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosInstance.post(
    "/api/cms/competent/validate-data",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res;
};
export const searchFileThamQuyen = async (
  body: any,
  page: number,
  size: number
) => {
  const res = await axiosInstance.post(
    `/api/cms/competent/search-import-excel?page=${page - 1}&size=${size}`,
    body
  );
  return res;
};

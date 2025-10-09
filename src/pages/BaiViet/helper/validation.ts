import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  docTypeCode: Yup.string().required("Loại văn bản là bắt buộc"),
  sectorCode: Yup.string().required("Lĩnh vực là bắt buộc"),
  documentCode: Yup.string().required("Trích yếu là bắt buộc"),
  article: Yup.string().required("Điều là bắt buộc"),
  code: Yup.string().required("Mã thẩm quyền là bắt buộc"),
  competentAuthorityCode: Yup.string().required("Cấp thẩm quyền là bắt buộc"),
  content: Yup.string().required("Nội dung là bắt buộc"),
});

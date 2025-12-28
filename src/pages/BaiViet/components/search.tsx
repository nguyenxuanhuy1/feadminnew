import { Col, Row } from "antd";
import { Field, Form, Formik } from "formik";
import Input from "../../../components/CustomField/InputField";
import Select from '../../../components/CustomSelect/index'
import { useRef } from "react";
import WrapperSearchForm from "@/components/WrapSection/wrapSearch";
import { valueSearch } from "../helper/initialValues";

const SearchForm = (props: any) => {
  const { setSearchForm, setParamsPage } =
    props;

  const formikRef = useRef<any>(null);
  return (
    <WrapperSearchForm formikRef={formikRef}>
      <Formik
        onSubmit={(values) => {
          setParamsPage((prev: any) => ({
            ...prev,
            page: 1,
          }));
          setSearchForm({ ...values });
        }}
        initialValues={valueSearch}
        innerRef={formikRef}
      >
        {(propFormik: any) => {
          return (
            <Form className="form-search">
              <Row gutter={[8, 16]}>
                <Col xs={20} md={20}>
                  <Field
                    component={Input}
                    label="Tên bài viết"
                    name="title"
                    placeholder="Nhập tên bài viết"
                  />
                </Col>
                <Col xs={4} md={4}>
                  <Field
                    component={Select}
                    label="Trạng thái bài viết"
                    name="status"
                    placeholder="Chọn trạng thái"
                    options={[
                      { label: "Tất cả", value: null },
                      { label: "Chờ duyệt", value: "PENDING" },
                      { label: "Đã duyệt", value: "PUBLISHED" },
                      { label: "Từ chối", value: "REVOKED" },
                    ]}
                  />
                </Col>

              </Row>

            </Form>
          );
        }}
      </Formik>
    </WrapperSearchForm>
  );
};

export default SearchForm;

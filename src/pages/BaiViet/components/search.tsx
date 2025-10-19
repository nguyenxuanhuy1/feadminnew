import { Col, Row } from "antd";
import { Field, Form, Formik } from "formik";
import Input from "../../../components/CustomField/InputField";
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
                <Col xs={24} md={24}>
                  <Field
                    component={Input}
                    label="Tên bài viết"
                    name="title"
                    placeholder="Nhập tên bài viết"
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

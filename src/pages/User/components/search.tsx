import { Col, Row } from "antd";
import { Field, Form, Formik } from "formik";
import Input from "../../../components/CustomField/InputField";
import { useRef } from "react";
import WrapperSearchForm from "@/components/WrapSection/wrapSearch";
import { valueSearch } from "./initialValues";

const SearchUserForm = (props: any) => {
  const { setKeyword, setParamsPage } = props;

  const formikRef = useRef<any>(null);
  return (
    <WrapperSearchForm formikRef={formikRef}>
      <Formik
        onSubmit={(values) => {
          setParamsPage((prev: any) => ({
            ...prev,
            page: 1,
          }));
          setKeyword(values.keyword); 
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
                    label="Tên hoặc Email"
                    name="keyword"
                    placeholder="Nhập tên hoặc email user"
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

export default SearchUserForm;

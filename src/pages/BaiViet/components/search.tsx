import { Col, Row } from "antd";
import { Field, Form, Formik } from "formik";
import Input from "../../../components/CustomField/InputField";
import Select from "../../../components/CustomSelect";
import { useRef } from "react";
import WrapperSearchForm from "@/components/WrapSection/wrapSearch";
import { valueSearch } from "../helper/initialValues";
import DatePicker from "@/components/CustomDatePicker";

const SearchForm = (props: any) => {
  const { setSearchForm, categoryCode, issLevel, typeDoc, setParamsPage } =
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
            <Form>
              <Row gutter={[8, 16]}>
               
                <Col span={8}>
                  <Field
                    component={Input}
                    label="Tên bài viết"
                    name="documentName"
                    placeholder="Nhập thông tin trích yếu"
                  />
                </Col>
                <Col span={8}>
                  <Field
                    component={Select}
                    label="Mã bài viết"
                    name="competentAuthorityCode"
                    placeholder="Chọn cấp thẩm quyền"
                    options={issLevel}
                    allowClear
                    showSearch
                  />
                </Col>
               
                <Col span={8}>
                  <Field
                    component={Input}
                    label="url"
                    name="content"
                    placeholder="Nhập nội dung"
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

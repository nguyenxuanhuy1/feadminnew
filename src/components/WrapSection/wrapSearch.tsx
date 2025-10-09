import { Row } from "antd";
import { ButtonHTMLTypes } from "@/interfaces";
import { ButtonCancel, ButtonSearch } from "../CustomButton";
import { RedoOutlined } from "@ant-design/icons";
interface IProps {
  title?: string;
  children: any;
  formikRef: any;
}

const WrapperSearchForm = (props: IProps) => {
  const { children, formikRef } = props;

  return (
    <div>
      {children}
      <Row
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <ButtonCancel
            title="Làm mới"
            icon={<RedoOutlined />}
            onClick={() => {
              formikRef.current.handleReset();
              formikRef.current.handleSubmit();
            }}
          />
          <ButtonSearch
            title="Tìm kiếm"
            htmlType={ButtonHTMLTypes.Submit}
            onClick={() => formikRef.current.handleSubmit()}
          />
        </div>
      </Row>
    </div>
  );
};

export default WrapperSearchForm;

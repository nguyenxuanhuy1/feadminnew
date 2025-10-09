import { ButtonCancel, ButtonCreate } from "@/components/CustomButton";
import ModalSection from "@/components/CustomModal";
import CustomTable from "@/components/CustomTable";
import WrapperTable from "@/components/WrapSection/wrapTable";
import {
  DeleteOutlined,
  DeliveredProcedureOutlined,
  EditOutlined,
  EyeOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { Col, notification, Row } from "antd";
import { ColumnsType } from "antd/es/table";
import { Field, Form, Formik } from "formik";
import React, { useMemo, useRef } from "react";
import { valueSubmit } from "../helper/initialValues";
import Select from "@/components/CustomSelect";
import Input from "@/components/CustomField/InputField";
import {
  createThamQuyen,
  daleteThamQuyen,
  detailThamQuyen,
  updateThamQuyen,
} from "@/api/apiSiteAdmin";
import { validationSchema } from "../helper/validation";
import { ButtonHTMLTypes } from "@/interfaces";
import { ITableFormProps } from "../helper/interface";
import { diemOptions, dieuOptions, khoanOptions } from "@/utils/law";
import TextEditor from "@/components/TextEditor";

const TableForm = (props: ITableFormProps) => {
  const {
    dataSearch,
    setParamsPage,
    paramsPage,
    setRefresh,
    issLevel,
    typeDoc,
  } = props;
  const [modal, setModal] = React.useState("");
  const [itemTarget, setItemTarget] = React.useState<any | null>(null);
  const formikRef = useRef<any>(null);

  const [optionsSector, setOptionsSector] = React.useState([]);
  const [optionsDocument, setOptionsDocument] = React.useState([]);
  const [docTypeCode, setDocTypeCode] = React.useState<string>();
  const [sectorCode, setSectorCode] = React.useState<string>();

    const handleSubmit = async (values: typeof valueSubmit) => {
    try {
      const res = await createThamQuyen(values);
      if (res.status === 200) {
        notification.success({
          message: res.data.msg,
        });
        setModal("");
        setRefresh((prev) => !prev);
      }
    } catch (err: any) {}
  };
  const handleUpdate = async (values: typeof valueSubmit) => {
    try {
      const res = await updateThamQuyen(itemTarget.code, values);
      if (res.status === 200) {
        setModal("");
        notification.success({
          message: res.data.msg,
        });
        setRefresh((prev) => !prev);
      }
    } catch (err: any) {}
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await daleteThamQuyen(id);
      if (res.status === 200) {
        setModal("");
        notification.success({
          message: res.data.msg,
        });
        setRefresh((prev) => !prev);
      }
    } catch (err: any) {}
  };

  const handleDetail = async (code: string) => {
    if (modal !== "create") {
      try {
        const res = await detailThamQuyen(code);
        if (res.status === 200) {
          formikRef?.current?.setValues(res.data.data);
          setDocTypeCode(res.data.data.docTypeCode);
          setSectorCode(res.data.data.sectorCode);
        }
      } catch (err: any) {}
    }
  };

  const toolbar = (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div>
        <ButtonCreate
          title="Thêm mới"
          onClick={() => {
            setModal("create");
          }}
        />
      </div>
    </div>
  );

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      width: 90,
      render: (_text, _record, index) =>
        (paramsPage.page - 1) * paramsPage.size + index + 1,
    },
    {
      title: "Lĩnh vực",
      dataIndex: "sectorName",
      key: "name",
      width: 110,
    },
    {
      title: "Loại văn bản",
      dataIndex: "docTypeName",
      key: "docTypeName",
      width: 130,
    },
    {
      title: "Trích yếu",
      dataIndex: "documentName",
      key: "documentName",
      width: 350,
    },
    {
      title: "Cấp thẩm quyền",
      dataIndex: "competentAuthority",
      key: "competentAuthority",
    },
    {
      title: "Mục",
      dataIndex: "tag",
      key: "tag",
    },
    {
      width: 110,
      title: "Thao tác",
      key: "action",
      render: (_text, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <EyeOutlined
            onClick={() => {
              setModal("preview");
              handleDetail(record?.code);
            }}
          />
          <EditOutlined
            onClick={() => {
              handleDetail(record?.code);
              setModal("update");
            }}
          />
          <DeleteOutlined
            onClick={() => {
              setModal("delete");
            }}
          />
        </div>
      ),
    },
  ];

  const title = useMemo(() => {
    switch (modal) {
      case "create":
        return "THÊM MỚI BÀI VIẾT";
      case "update":
        return "CHỈNH SỬA BÀI VIẾT";
      case "preview":
        return "XEM CHI TIẾT BÀI VIẾT";
      case "delete":
        return "XÓA BÀI VIẾT";
      default:
        return "";
    }
  }, [modal]);

  return (
    <WrapperTable title="QUẢN LÝ BÀI VIẾT" toolbar={toolbar}>
      <CustomTable
        columns={columns}
        dataSource={dataSearch.data}
        paramsPage={paramsPage}
        setParamPage={setParamsPage}
        total={dataSearch.total}
        setItemTarget={setItemTarget}
      />
      {modal && modal !== "delete" && modal !== "import" && (
        <ModalSection
          open={!!modal}
          onClose={() => {
            setModal("");
          }}
          title={title}
          width={"80%"}
        >
          <Formik
            initialValues={valueSubmit}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              if (modal === "create") {
                handleSubmit(values);
              } else {
                handleUpdate(values);
              }
            }}
            innerRef={formikRef}
          >
            {({ handleSubmit, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <Row gutter={[8, 16]}>
                  <Col span={8}>
                    <Field
                      component={Select}
                      label="Loại văn bản"
                      name="docTypeCode"
                      placeholder="Nhập loại văn bản"
                      options={typeDoc}
                      isRequired
                      showSearch
                      disabled={modal === "preview"}
                      onChange={(value: any) => {
                        setFieldValue("docTypeCode", value);
                        setFieldValue("sectorCode", "");
                        setFieldValue("documentCode", "");
                        setDocTypeCode(value);
                      }}
                    />
                  </Col>
                  <Col span={8}>
                    <Field
                      component={Select}
                      label="Lĩnh vực"
                      name="sectorCode"
                      placeholder="Chọn lĩnh vực"
                      options={optionsSector}
                      disabled={
                        modal === "preview" ||
                        !formikRef.current?.values?.docTypeCode
                      }
                      isRequired
                      showSearch
                      onChange={(value: any) => {
                        setFieldValue("sectorCode", value);
                        setFieldValue("documentCode", "");
                        setSectorCode(value);
                      }}
                    />
                  </Col>
                  <Col span={8}>
                    <Field
                      component={Select}
                      label="Trích yếu"
                      name="documentCode"
                      placeholder="Nhập trích yếu"
                      options={optionsDocument}
                      isRequired
                      disabled={
                        modal === "preview" ||
                        !formikRef.current?.values?.sectorCode
                      }
                    />
                  </Col>

                  <Col span={8}>
                    <Field
                      component={Select}
                      label="Điều"
                      name="article"
                      placeholder="Chọn điều"
                      options={dieuOptions}
                      disabled={modal === "preview"}
                      isRequired
                      showSearch
                    />
                  </Col>
                  <Col span={8}>
                    <Field
                      component={Select}
                      label="Khoản"
                      name="clause"
                      placeholder="Chọn khoản"
                      options={khoanOptions}
                      disabled={modal === "preview"}
                      showSearch
                    />
                  </Col>
                  <Col span={8}>
                    <Field
                      component={Select}
                      label="Điểm"
                      name="point"
                      placeholder="Chọn diểm"
                      options={diemOptions}
                      disabled={modal === "preview"}
                      showSearch
                    />
                  </Col>

                  <Col span={8}>
                    <Field
                      component={Input}
                      label="Mã thẩm quyền"
                      name="code"
                      placeholder="Nhập mã thẩm quyền"
                      isRequired
                      disabled={modal === "preview"}
                    />
                  </Col>
                  <Col span={8}>
                    <Field
                      component={Select}
                      label="Cấp thẩm quyền"
                      name="competentAuthorityCode"
                      placeholder="Chọn cấp thẩm quyền"
                      options={issLevel}
                      disabled={modal === "preview"}
                      isRequired
                      showSearch
                    />
                  </Col>
                  <Col span={8}>
                    <Field
                      component={Input}
                      label="Ghi chú"
                      name="note"
                      placeholder="Nhập ghi chú"
                      disabled={modal === "preview"}
                    />
                  </Col>
                  <Col span={24}>
                    <Field
                      component={TextEditor}
                      label="Nội dung"
                      name="content"
                      height="300px"
                      isRequired
                      onChange={(value: string) => {
                        if (value === "<p><br></p>") {
                          setFieldValue("content", "");
                          return;
                        }
                        setFieldValue("content", value);
                      }}
                      disabled={modal === "preview"}
                    />
                  </Col>
                </Row>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem",
                    gap: "8px",
                  }}
                >
                  <ButtonCancel
                    title="Đóng"
                    onClick={() => {
                      setModal?.("");
                    }}
                  />
                  {modal !== "preview" && (
                    <ButtonCreate
                      title="Lưu"
                      htmlType={ButtonHTMLTypes.Submit}
                    />
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </ModalSection>
      )}
      {modal === "delete" && (
        <ModalSection
          open={!!modal}
          onClose={() => {
            setModal("");
          }}
          title="XOÁ THẨM QUYỀN"
        >
          Bạn có chắc chắn xoá
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
              gap: "8px",
            }}
          >
            <ButtonCancel
              title="Đóng"
              onClick={() => {
                setModal?.("");
              }}
            />
            <ButtonCreate
              title="Đồng ý"
              htmlType={ButtonHTMLTypes.Submit}
              onClick={() => {
                handleDelete(itemTarget?.code);
              }}
            />
          </div>
        </ModalSection>
      )}
      
    </WrapperTable>
  );
};

export default TableForm;

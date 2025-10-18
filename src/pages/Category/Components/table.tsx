import { ButtonCancel, ButtonCreate } from "@/components/CustomButton";
import ModalSection from "@/components/CustomModal";
import CustomTable from "@/components/CustomTable";
import WrapperTable from "@/components/WrapSection/wrapTable";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Col, notification, Row } from "antd";
import { ColumnsType } from "antd/es/table";
import { Field, Form, Formik } from "formik";
import React, { useMemo, useRef, useState } from "react";
import Input from "@/components/CustomField/InputField";
import { ButtonHTMLTypes } from "@/interfaces";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/api/apiSiteAdmin";
import { CTableFormProps } from "../../Category/Helper/interface";

const TableCategory = (props: CTableFormProps) => {
  const { dataSearch, setParamsPage, paramsPage, setRefresh } = props;
  const [modal, setModal] = useState("");
  const [itemTarget, setItemTarget] = useState<any | null>(null);
  const formikRef = useRef<any>(null);

  const handleSubmit = async (values: any) => {
    try {
      const res = await createCategory(values);
      if (res.status === 200) {
        notification.success({ message: "Thêm danh mục thành công!" });
        setModal("");
        setRefresh((prev) => !prev);
      }
    } catch (err: any) { }
  };

  const handleUpdate = async (values: any) => {
    try {
      const res = await updateCategory(itemTarget.id, values);
      if (res.status === 200) {
        notification.success({ message: "Cập nhật danh mục thành công!" });
        setModal("");
        setRefresh((prev) => !prev);
      }
    } catch (err: any) { }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteCategory(id);
      if (res.status === 200) {
        notification.success({ message: "Xóa danh mục thành công!" });
        setModal("");
        setRefresh((prev) => !prev);
      }
    } catch (err: any) { }
  };

  const handleDetail = (record: any) => {
    setItemTarget(record);
    setTimeout(() => {
      formikRef?.current?.setValues({
        name: record.name || "",
        slug: record.slug || "",
        description: record.description || "",
      });
    }, 0);
  };

  const toolbar = (
    <div style={{ display: "flex", gap: "1rem" }}>
      <ButtonCreate
        title="Thêm danh mục"
        onClick={() => {
          setItemTarget(null);
          setModal("create");
          setTimeout(() => {
            formikRef?.current?.resetForm();
          }, 0);
        }}
      />
    </div>
  );

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "index",
      width: 60,
      render: (_text, _record, index) =>
        (paramsPage.page - 1) * paramsPage.size + index + 1,
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      width: 250,
      render: (text: string) => (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 400,
          }}
          title={text}
        >
          {text}
        </div>
      ),
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
              handleDetail(record);
            }}
          />
          <EditOutlined
            onClick={() => {
              setModal("update");
              handleDetail(record);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              setItemTarget(record);
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
        return "THÊM DANH MỤC";
      case "update":
        return "CHỈNH SỬA DANH MỤC";
      case "preview":
        return "XEM CHI TIẾT DANH MỤC";
      case "delete":
        return "XÓA DANH MỤC";
      default:
        return "";
    }
  }, [modal]);

  return (
    <div className="table-category">
      <WrapperTable title="QUẢN LÝ DANH MỤC" toolbar={toolbar}>
        <CustomTable
          columns={columns}
          dataSource={dataSearch.data}
          paramsPage={paramsPage}
          setParamPage={setParamsPage}
          total={dataSearch.total}
          setItemTarget={setItemTarget}
        />

        {modal && modal !== "delete" && (
          <ModalSection open={!!modal} onClose={() => setModal("")} title={title}>
            <Formik
              innerRef={formikRef}
              enableReinitialize
              initialValues={{
                name: itemTarget?.name || "",
                slug: itemTarget?.slug || "",
                description: itemTarget?.description || "",
              }}
              onSubmit={(values) => {
                if (modal === "create") handleSubmit(values);
                else if (modal === "update") handleUpdate(values);
              }}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Row gutter={[8, 16]}>
                    <Col span={24}>
                      <Field
                        component={Input}
                        label="Tên danh mục"
                        name="name"
                        placeholder="Nhập tên danh mục"
                        isRequired
                        disabled={modal === "preview"}
                        maxLength={50}
                        showCount
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
                    <ButtonCancel title="Đóng" onClick={() => setModal("")} />
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

        {/* --- DELETE --- */}
        {modal === "delete" && (
          <ModalSection
            open={!!modal}
            onClose={() => setModal("")}
            title="XOÁ DANH MỤC"
          >
            Bạn có chắc chắn muốn xoá danh mục này không?
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1rem",
                gap: "8px",
              }}
            >
              <ButtonCancel title="Đóng" onClick={() => setModal("")} />
              <ButtonCreate
                title="Đồng ý"
                onClick={() => handleDelete(itemTarget?.id)}
              />
            </div>
          </ModalSection>
        )}
      </WrapperTable>
    </div>
  );
};

export default TableCategory;

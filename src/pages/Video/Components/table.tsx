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
import {
  createVideo,
  daleteVideo,
  updateVideo,
} from "@/api/apiSiteAdmin";
import { ButtonHTMLTypes } from "@/interfaces";
import { ITableFormProps } from "../Helper/interface";
import { convertYoutubeLink } from "../Helper/chuyenLinkEmbed";

const TableVideo = (props: ITableFormProps) => {
  const { dataSearch, setParamsPage, paramsPage, setRefresh } = props;
  const [modal, setModal] = useState("");
  const [itemTarget, setItemTarget] = useState<any | null>(null);
  const formikRef = useRef<any>(null);
  console.log(dataSearch.data);

  const handleSubmit = async (values: any) => {
    try {
      const newValues = {
        ...values,
        link: convertYoutubeLink(values.link),
      };
      const res = await createVideo(newValues);
      if (res.status === 200) {
        notification.success({ message: "Thêm video thành công!" });
        setModal("");
        setRefresh((prev) => !prev);
      }
    } catch (err: any) { }
  };

  const handleUpdate = async (values: any) => {
    try {
      const newValues = {
        ...values,
        link: convertYoutubeLink(values.link),
      };
      const res = await updateVideo(itemTarget.id, newValues);
      if (res.status === 200) {
        notification.success({ message: "Cập nhật video thành công!" });
        setModal("");
        setRefresh((prev) => !prev);
      }
    } catch (err: any) { }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await daleteVideo(id);
      if (res.status === 200) {
        notification.success({ message: "Xóa video thành công!" });
        setModal("");
        setRefresh((prev) => !prev);
      }
    } catch (err: any) { }
  };

  const handleDetail = (record: any) => {
    setItemTarget(record);
    setTimeout(() => {
      formikRef?.current?.setValues({
        title: record.title || "",
        link: record.link || "",
      });
    }, 0);
  };

  const toolbar = (
    <div style={{ display: "flex", gap: "1rem" }}>
      <ButtonCreate
        title="Thêm video"
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
      title: "Tiêu đề",
      dataIndex: "title",
      width: 250,
      render: (text: string) => (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 230,
          }}
          title={text}
        >
          {text}
        </div>
      ),
    },
    {
      title: "Link video",
      dataIndex: "link",
      width: 300,
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
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
        return "THÊM VIDEO MỚI";
      case "update":
        return "CHỈNH SỬA VIDEO";
      case "preview":
        return "XEM VIDEO";
      case "delete":
        return "XÓA VIDEO";
      default:
        return "";
    }
  }, [modal]);

  return (
    <div className="table-video">
      <WrapperTable title="QUẢN LÝ VIDEO" toolbar={toolbar}>
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
                title: itemTarget?.title || "",
                link: itemTarget?.link || "",
              }}
              onSubmit={(values) => {
                if (modal === "create") handleSubmit(values);
                else if (modal === "update") handleUpdate(values);
              }}
            >
              {({ handleSubmit, values }) => (
                <Form onSubmit={handleSubmit}>
                  <Row gutter={[8, 16]}>
                    <Col span={24}>
                      <Field
                        component={Input}
                        label="Tiêu đề video"
                        name="title"
                        placeholder="Nhập tiêu đề"
                        isRequired
                        disabled={modal === "preview"}
                        maxLength={300}
                        showCount
                      />
                    </Col>

                    <Col span={24}>
                      <Field
                        component={Input}
                        label="Link video (URL YouTube)"
                        name="link"
                        placeholder="Dán link video"
                        isRequired
                        disabled={modal === "preview"}
                      />
                    </Col>
                  </Row>

                  {modal === "preview" && values.link && (
                    <div style={{ marginTop: 20 }}>
                      <iframe
                        width="100%"
                        height="350"
                        style={{ borderRadius: 8 }}
                        src={values.link}
                        title="Video preview"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}

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
        {modal === "delete" && (
          <ModalSection
            open={!!modal}
            onClose={() => setModal("")}
            title="XOÁ VIDEO"
          >
            Bạn có chắc chắn muốn xoá video này không?
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

export default TableVideo;

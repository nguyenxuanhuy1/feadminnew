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
import { Col, notification, Row, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useMemo, useRef } from "react";
import { valueSubmit } from "../helper/initialValues";
import Select from "@/components/CustomSelect";
import Input from "@/components/CustomField/InputField";
import {
  createThamQuyen,
  daleteThamQuyen,
  detailThamQuyen,
  statusAdmin,
  updateThamQuyen,
} from "@/api/apiSiteAdmin";
import { validationSchema } from "../helper/validation";
import { ButtonHTMLTypes } from "@/interfaces";
import { ITableFormProps } from "../helper/interface";
import TextEditor from "@/components/TextEditor";
import { getMenu } from "../../../api/auth"
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
  const role = localStorage.getItem('role');
  const [optionsSelect, setOptionsSelect] = React.useState([]);
  const [docTypeCode, setDocTypeCode] = React.useState<string>();
  const [sectorCode, setSectorCode] = React.useState<string>();

  const handleApproveOrReject = async (
    id: number,
    status: "PUBLISHED" | "REVOKED"
  ) => {
    try {
      const payload = {
        status,
      };

      await statusAdmin(id, payload);

      notification.success({
        message:
          status === "PUBLISHED"
            ? "Duyệt bài viết thành công"
            : "Từ chối bài viết thành công",
      });

      setRefresh((prev) => !prev);
    } catch (err: any) {
      notification.error({
        message: err?.response?.data?.message || "Có lỗi xảy ra",
      });
    }

  };


  const handleSubmit = async (values: typeof valueSubmit) => {
    // debugger
    try {
      const payload = {
        ...values,
        isFeatured: values.categoryId === 1 ? true : values.isFeatured,
      };

      const res = await createThamQuyen(payload);

      if (res.status === 200) {
        notification.success({
          message: res.data || "Tạo bài viết thành công",
        });
        setModal("");
        setRefresh((prev) => !prev);
      }
    } catch (err: any) {
      notification.error({
        message: "Có lỗi xảy ra khi tạo bài viết",
      });
    }
  };

  const handleGet = async () => {
    try {
      const res = await getMenu();
      const list = res.data.map((item: any) => ({
        label: item.name,
        value: item.id,
      }));
      setOptionsSelect(list)
    } catch (err: any) { }
  };

  useEffect(() => {
    handleGet();
  }, []);


  const handleUpdate = async (values: typeof valueSubmit) => {
    try {
      const res = await updateThamQuyen(itemTarget.id, values);
      if (res.status === 200) {
        setModal("");
        notification.success({
          message: res.data,
        });
        setRefresh((prev) => !prev);
      }
    } catch (err: any) { }
  };

  const handleDelete = async (id: string) => {
    if (modal == "delete") {
      try {
        const res = await daleteThamQuyen(id);
        if (res.status === 200) {
          setModal("");
          notification.success({
            message: res.data,
          });
          setRefresh((prev) => !prev);
        }
      } catch (err: any) { }
    }
  };

  const handleDetail = async (code: string) => {
    if (modal !== "create") {
      try {
        const res = await detailThamQuyen(code);
        if (res.status === 200) {
          formikRef?.current?.setValues(res.data);
          setDocTypeCode(res.data.data.docTypeCode);
          setSectorCode(res.data.data.sectorCode);
        }
      } catch (err: any) { }
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
      width: 60,
      render: (_text, _record, index) =>
        (paramsPage.page - 1) * paramsPage.size + index + 1,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
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
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      width: 200,
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
      title: "Lượt xem",
      dataIndex: "views",
      key: "views",
      width: 100,
      sorter: (a: any, b: any) => a.views - b.views,
    },
    {
      title: "Nổi bật",
      dataIndex: "isFeatured",
      key: "isFeatured",
      width: 100,
      render: (featured: boolean) =>
        featured ? (
          <Tag color="gold">Nổi bật</Tag>
        ) : (
          <Tag color="default">Thường</Tag>
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => {
        const label =
          status === "PENDING"
            ? "⌛"
            : status === "PUBLISHED"
              ? "✔️"
              : status === "REVOKED"
                ? "❌"
                : status;

        return <span>{label}</span>;
      },

    },
    {
      width: 110,
      title: "Thao tác",
      key: "action",
      render: (_text, record) => {
        const isPublished = record?.status === "PUBLISHED";
        const isAdmin = role === "ADMIN";

        return (
          <div style={{ display: "flex", gap: 8 }}>
            {isAdmin && (
              <Select
                placeholder="Trạng thái"
                value={record?.status}
                options={[
                  { label: "✔️", value: "PUBLISHED" },
                  { label: "❌", value: "REVOKED" },
                ]}
                onChange={(value) => {
                  handleApproveOrReject(record.id, value);
                }}
              />
            )}
            <EyeOutlined
              onClick={() => {
                setModal("preview");
                handleDetail(record?.slug);
              }}
            />
            {isAdmin && (
              <div style={{ display: 'flex', gap: 8 }}>
                <EditOutlined
                  onClick={() => {
                    handleDetail(record?.slug);
                    setItemTarget(record);
                    setModal("update");
                  }}
                />

                <DeleteOutlined
                  onClick={() => {
                    setItemTarget(record);
                    setModal("delete");
                  }}
                />
              </div>
            )}
            {!isAdmin && !isPublished && (
              <>
                <EditOutlined
                  onClick={() => {
                    handleDetail(record?.slug);
                    setItemTarget(record);
                    setModal("update");
                  }}
                />

                {/* <DeleteOutlined
                  onClick={() => {
                    setItemTarget(record);
                    setModal("delete");
                  }}
                /> */}
                
              </>
            )}
          </div>
        );
      },
    }

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
    <div className="table-bai-viet">
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
                    <Col span={12} xs={24} md={12}>
                      <Field
                        component={Input}
                        label="Tiêu đề bài viết"
                        name="title"
                        placeholder="Nhập tiêu đề"
                        isRequired
                        disabled={modal === "preview"}
                        maxLength={200}
                        showCount
                      />
                    </Col>

                    <Col span={12} xs={24} md={12}>
                      <Field
                        component={Input}
                        label="Ảnh (URL)"
                        name="image"
                        isRequired
                        disabled={modal === "preview"}
                        maxLength={500}
                        showCount
                      />
                    </Col>

                    <Col span={8} xs={24} md={8}>
                      <Field
                        component={Select}
                        label="Danh mục"
                        name="categoryId"
                        placeholder="Chọn danh mục"
                        options={optionsSelect}
                        isRequired
                        disabled={modal === "preview"}
                      />
                    </Col>

                    <Col span={8} xs={24} md={8}>
                      <Field
                        component={Input}
                        label="Lượt xem"
                        name="views"
                        placeholder="Nhập số lượt xem"
                        type="number"
                        isRequired
                        disabled={modal === "preview"}
                      />
                    </Col>

                    {modal !== "create" && (
                      <Col span={8} xs={24} md={8}>
                        <Field
                          component={Select}
                          label="Bài viết nổi bật"
                          name="isFeatured"
                          placeholder="Chọn trạng thái"
                          options={[
                            { label: "Có", value: true },
                            { label: "Không", value: false },
                          ]}
                          isRequired
                        />
                      </Col>
                    )}


                    <Col span={24}>
                      <Field
                        component={Select}
                        label="Tags"
                        name="tags"
                        mode="tags"
                        placeholder="Nhập hoặc chọn tags"
                        options={[
                          { label: "Tin nóng", value: "tin-nong" },
                          { label: "Thời sự", value: "thoi-su" },
                          { label: "Công nghệ", value: "cong-nghe" },
                          { label: "Giải trí", value: "giai-tri" },
                        ]}
                        disabled={modal === "preview"}
                      />
                    </Col>

                    <Col span={24}>
                      <Field
                        component={Input}
                        label="Mô tả ngắn"
                        name="shortContent"
                        placeholder="Nhập mô tả"
                        type="text"
                        isRequired
                        disabled={modal === "preview"}
                        maxLength={200}
                        showCount
                      />
                    </Col>

                    <Col span={24}>
                      <Field
                        component={TextEditor}
                        label="Nội dung bài viết"
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
                        setModal("");
                      }}
                    />
                    {modal !== "preview" && (
                      <ButtonCreate title="Lưu" htmlType={ButtonHTMLTypes.Submit} />
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
                  handleDelete(itemTarget?.id);
                }}
              />
            </div>
          </ModalSection>
        )}

      </WrapperTable>
    </div>
  );
};

export default TableForm;

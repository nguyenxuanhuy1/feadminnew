import { Button, notification } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { User } from "../interface";
import { deleteUser } from "@/api/apiSiteAdmin";
import ModalSection from "@/components/CustomModal";
import { ButtonCancel, ButtonCreate } from "@/components/CustomButton";
import { ButtonHTMLTypes } from "@/interfaces";
import CustomTable from "@/components/CustomTable";

interface UserTableProps {
  dataSearch: { data: User[]; total: number };
  paramsPage: { page: number; size: number };
  setParamsPage: React.Dispatch<
    React.SetStateAction<{ page: number; size: number }>
  >;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserTable: React.FC<UserTableProps> = ({
  dataSearch,
  paramsPage,
  setParamsPage,
  setRefresh,
}) => {
  const [modal, setModal] = useState("");
  const [itemTarget, setItemTarget] = useState<User | null>(null);

  const handleDeleteUser = async (id: number) => {
    try {
      const res = await deleteUser(id);

      notification.success({
        message: res?.data?.message || "Xoá thành công",
      });

      setRefresh((prev) => !prev);
      setModal("");
    } catch (error: any) {
      notification.error({
        message:
          error?.response?.data?.message || "Có lỗi xảy ra khi xoá",
      });
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", width: 80 },
    { title: "Họ tên", dataIndex: "fullName" },
    { title: "Email", dataIndex: "email" },
    { title: "Quyền", dataIndex: "role" },
    {
      title: "Hành động",
      width: 100,
      render: (_: any, record: User) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={(e) => {
            e.stopPropagation(); 
            setItemTarget(record);
            setModal(record.id.toString());
          }}
        />
      ),
    },
  ];

  return (
    <>
      <CustomTable<User>
        columns={columns}
        dataSource={dataSearch.data}
        rowKey="id"
        paramsPage={paramsPage}
        setParamPage={setParamsPage}
        total={dataSearch.total}
        setItemTarget={setItemTarget}
      />

      <ModalSection
        open={!!modal}
        onClose={() => setModal("")}
        title="XOÁ THẨM QUYỀN"
      >
        <div style={{ textAlign: "center", fontSize: 16 }}>
          Bạn có chắc chắn xoá?
        </div>

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
            htmlType={ButtonHTMLTypes.Submit}
            onClick={() => {
              if (itemTarget) handleDeleteUser(itemTarget.id);
            }}
          />
        </div>
      </ModalSection>
    </>
  );
};

export default UserTable;

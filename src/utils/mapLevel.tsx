import { Tag } from "antd";

export const renderLevelTag = (level: string) => {
  switch (level) {
    case "":
      return (
        <Tag color="default" className="tag-table">
          Tất cả cấp
        </Tag>
      );
    case "W":
      return (
        <Tag color="volcano-inverse" className="tag-table">
          Trung ương
        </Tag>
      );
    case "P":
      return (
        <Tag color="green-inverse" className="tag-table">
          Tỉnh
        </Tag>
      );
    case "V":
      return (
        <Tag color="blue-inverse" className="tag-table">
          Xã
        </Tag>
      );
    default:
      return (
        <Tag color="default" className="tag-table">
          Không xác định
        </Tag>
      );
  }
};

export const statusApprove = (status: number) => {
  switch (status) {
    case 0:
      return (
        <Tag color="red-inverse" className="tag-table">
          Chưa trả lời
        </Tag>
      );
    case 1:
      return (
        <Tag color="orange-inverse" className="tag-table">
          Chờ duyệt
        </Tag>
      );
    case 2:
      return (
        <Tag color="green-inverse" className="tag-table">
          Đã phê duyệt
        </Tag>
      );
    default:
      return (
        <Tag color="default" className="tag-table">
          Không xác định
        </Tag>
      );
  }
};

export const statusResponse = (status: number) => {
  switch (status) {
    case 1:
      return (
        <Tag color="green-inverse" className="tag-table">
          Đã trả lời
        </Tag>
      );
    case 0:
      return (
        <Tag color="volcano-inverse" className="tag-table">
          Chưa trả lời
        </Tag>
      );
    default:
      return (
        <Tag color="default" className="tag-table">
          Không xác định
        </Tag>
      );
  }
};

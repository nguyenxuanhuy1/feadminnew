import { AppContext } from "@/App";
import { Spin } from "antd";
import { useContext } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingOverlay = () => {
  const { loading } = useContext(AppContext);

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 48, color: "#a30000" }} spin />
  );

  return loading ? (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(255,255,255,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Spin
        size="large"
        tip={
          <span style={{ color: "#a30000", fontWeight: "bold" }}>
            Đang tải...
          </span>
        }
        indicator={antIcon}
      />
    </div>
  ) : null;
};

export default LoadingOverlay;

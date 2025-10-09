import { Modal } from "antd";
import React from "react";

interface CustomModalSectionProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
}

const ModalSection: React.FC<CustomModalSectionProps> = ({
  open,
  onClose,
  title,
  children,
  width,
}) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={null}
      width={width || 800}
      centered
    >
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            backgroundColor: "#990000",
            color: "white",
            height: "38px",
            fontWeight: 600,
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            padding: "1rem 1rem",
            overflowY: "auto",
            maxHeight: "calc(100vh - 38px - 100px)",
          }}
        >
          {children}
        </div>
      </div>
    </Modal>
  );
};

export default ModalSection;

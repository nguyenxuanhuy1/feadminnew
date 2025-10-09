import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ErrorMessage } from "formik";
import { Fragment, useState } from "react";
import type { UploadProps } from "antd";
import type { RcFile, UploadChangeParam } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

interface UploadFieldProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  disabled?: boolean;
  form?: any;
  field?: any;
  maxCount?: number;
}

const UploadField = ({
  name,
  label,
  isRequired,
  disabled,
  form,
  field,
  maxCount = 1,
}: UploadFieldProps) => {
  const { setFieldValue, errors, touched } = form ?? {};
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    setFileList(info.fileList);
    setFieldValue(name, info.file);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <Fragment>
        <div style={{ display: "flex" }}>
          {isRequired && (
            <span style={{ color: "red", marginRight: 4 }}>*</span>
          )}
          <span style={{ fontSize: "14px", fontWeight: 400 }}>{label}</span>
        </div>
      </Fragment>

      <Upload
        beforeUpload={() => false}
        fileList={fileList}
        onChange={handleChange}
        disabled={disabled}
        maxCount={maxCount}
      >
        <Button icon={<UploadOutlined />} disabled={disabled}>
          Tải lên
        </Button>
      </Upload>

      {touched?.[name] && errors?.[name] && (
        <span style={{ color: "red" }}>
          <ErrorMessage name={name} />
        </span>
      )}
    </div>
  );
};

export default UploadField;

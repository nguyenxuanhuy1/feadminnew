import React, { Fragment } from "react";
import { Input as InputAntd } from "antd";
import { IPropsTextArea } from "./TextAreaField.interfaces";
import { ErrorMessage } from "formik";

const TextArea = ({
  name,
  form,
  field,
  disabled,
  autoSize,
  className,
  maxLength,
  onChange,
  placeholder,
  label,
  isRequired,
  rows,
  value,
  showCount,
}: IPropsTextArea) => {
  const { TextArea } = InputAntd;
  const { errors, touched } = form ?? {};

  const inputName = name || field?.name || "";

  const inputValue = value || field?.value;

  return (
    <>
      <Fragment>
        <span className="text-[14px] font-[400] mb-[4px] ">{label}</span>
        {isRequired && (
          <span style={{ color: "red", margin: "0" }} className=" items-center">
            *
          </span>
        )}
      </Fragment>
      <TextArea
        name={inputName}
        disabled={disabled}
        autoSize={autoSize}
        value={inputValue}
        className={`custom-textarea ${className}`}
        maxLength={maxLength}
        onChange={onChange || field?.onChange}
        placeholder={placeholder}
        rows={rows}
        showCount={showCount}
        status={touched?.[inputName] && errors?.[inputName] ? "error" : ""}
      />
      {touched?.[inputName] && errors?.[inputName] && (
        <span style={{ color: "red" }}>
          <ErrorMessage name={inputName || ""} />
        </span>
      )}
    </>
  );
};

export default TextArea;

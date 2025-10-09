import { Button, Input as InputAntd, Space } from "antd";
import { ErrorMessage } from "formik";
import InputProps from "./interface";

const InputCompact = ({
  name,
  size,
  type,
  value,
  onChange,
  placeholder,
  className,
  form,
  onBlur,
  disabled,
  label,
  isRequired,
  prefix,
  suffix,
  id,
  min,
  onClick,
  maxLength,
  titleCompact,
  onClickCompact,
  disabledCompact,
  readOnly,
  ...props
}: InputProps<any, any>) => {
  const inputName = name || props?.field?.name || "";
  const inputValue = value || props.field?.value;
  const inputOnChange = onChange || props.field?.onChange;
  const inputOnBlur = onBlur || props.field?.onBlur;
  const { errors, touched } = form ?? {};

  return (
    <div className="wrap-input">
      <>
        {label}
        {isRequired ? (
          <span style={{ color: "red", margin: "0" }}>*</span>
        ) : null}
      </>
      <Space.Compact style={{ width: "100%" }}>
        <InputAntd
          autoComplete="off"
          id={id}
          name={inputName}
          disabled={disabled}
          size={size}
          type={type}
          value={inputValue}
          onChange={inputOnChange}
          onBlur={inputOnBlur}
          onClick={onClick}
          placeholder={placeholder}
          className={`custom-input ${className}`}
          prefix={prefix}
          suffix={suffix}
          status={touched?.[inputName] && errors?.[inputName] ? "error" : ""}
          min={min}
          maxLength={maxLength}
          readOnly={readOnly}
        />
        <Button
          style={{
            margin: "10px 0",
            borderColor:
              touched?.[inputName] && errors?.[inputName] ? "red" : "",
          }}
          onClick={onClickCompact}
          disabled={disabledCompact}
        >
          {titleCompact || "Chọn"}
        </Button>
      </Space.Compact>
      {touched?.[inputName] && errors?.[inputName] && (
        <span className="span_error">
          <ErrorMessage name={inputName || ""} />
        </span>
      )}
    </div>
  );
};

export default InputCompact;

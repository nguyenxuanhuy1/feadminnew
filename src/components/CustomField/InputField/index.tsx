import { Input as InputAntd } from "antd";
import { ErrorMessage } from "formik";
import InputProps from "./interface";
import { Fragment } from "react";

const Input = ({
  allowClear,
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
  defaultValue,
  style,
  bordered,
  showCount,
  ...props
}: InputProps<any, any>) => {
  const inputName = name || props?.field?.name || "";
  const inputValue = value || props.field?.value;
  const inputOnChange = onChange || props.field?.onChange;
  const inputOnBlur = onBlur || props.field?.onBlur;
  const { errors, touched } = form ?? {};
  const allowedKeys = [
    "Ctrl",
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Tab",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <Fragment>
        <div style={{ display: "flex" }}>
          {isRequired && (
            <span style={{ color: "red", margin: "0", alignItems: "center" }}>
              *
            </span>
          )}
          <span style={{ fontSize: "14px", fontWeight: 400 }}>{label}</span>
        </div>
      </Fragment>
      <InputAntd
        allowClear={allowClear}
        defaultValue={defaultValue}
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
        style={{
          width: "100%",
          color: "#495057",
          paddingLeft: "12px",
          minHeight: "38px",
          borderRadius: "4px",
          ...(style || {}),
        }}
        prefix={prefix}
        suffix={suffix}
        status={touched?.[inputName] && errors?.[inputName] ? "error" : ""}
        min={min}
        maxLength={maxLength}
        bordered={bordered}
        showCount={showCount}
        onKeyDown={
          type === "num"
            ? (e) => {
                if (
                  !/^\d$/.test(e.key) &&
                  !allowedKeys.includes(e.key) &&
                  !(
                    e.ctrlKey &&
                    (e.key === "a" || e.key === "c" || e.key === "v")
                  )
                ) {
                  e.preventDefault();
                }
              }
            : undefined
        }
      />
      {touched?.[inputName] && errors?.[inputName] && (
        <span style={{ color: "red" }}>
          <ErrorMessage name={inputName || ""} />
        </span>
      )}
    </div>
  );
};

export default Input;

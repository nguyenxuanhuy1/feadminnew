import { Select as SelectAntd } from "antd";
import { ErrorMessage } from "formik";
import { Fragment, FunctionComponent } from "react";
import { FieldSelectPropsRoot } from "./Select.interface";
import { CloseOutlined, DownOutlined } from "@ant-design/icons";

const Select: FunctionComponent<FieldSelectPropsRoot> = ({
  defaultValue,
  value,
  size,
  open,
  options,
  placeholder,
  showArrow,
  onChange,
  onBlur,
  className,
  form,
  field,
  mode,
  label,
  showSearch,
  onSearch,
  disabled,
  handlePopupScroll,
  isRequired,
  close,
  setState,
  allowClear,
  setStatePrivileages,
}) => {
  const { errors, touched, setFieldValue = () => {} } = form ?? {};

  const onBlurCustom = () => {
    form?.setTouched({ ...form.touched, [field?.name || ""]: true });
  };

  const handleOnChange = (e: any) => {
    setFieldValue(field?.name || "", e);
    if (setState) {
      setState(e);
    }
    if (setStatePrivileages) {
      const result = options?.find((el: any) => el.value === e);
      setStatePrivileages(result);
    }
  };

  const inputOnChange = onChange || handleOnChange;

  return (
    <div>
      <div style={{ marginBottom: "4px" }}>
        {isRequired ? <span style={{ color: "red" }}>*</span> : null}
        <span style={{ fontSize: "14px", fontWeight: 400 }}>{label}</span>
      </div>
      <SelectAntd
        allowClear={allowClear}
        onPopupScroll={handlePopupScroll}
        disabled={disabled}
        showSearch={showSearch}
        defaultValue={defaultValue}
        value={value || field?.value}
        size={size}
        open={open}
        mode={mode}
        options={options}
        placeholder={placeholder}
        showArrow={showArrow}
        onChange={inputOnChange}
        onSearch={onSearch}
        suffixIcon={
          field?.value ? (
            close && (
              <CloseOutlined
                onClick={() => {
                  setFieldValue(field?.name || "", "");
                  if (setState) {
                    setState(null);
                  }
                }}
              />
            )
          ) : (
            <DownOutlined />
          )
        }
        status={
          touched?.[field?.name || ""] && errors?.[field?.name || ""]
            ? "error"
            : ""
        }
        style={{
          width: "100%",
          color: "#495057",
          minHeight: "38px",
        }}
        onBlur={onBlur || onBlurCustom}
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
      />
      {field && touched?.[field?.name || ""] && errors?.[field?.name || ""] && (
        <div style={{ color: "red", marginTop: 4 }}>
          <ErrorMessage name={field?.name || ""} />
        </div>
      )}
    </div>
  );
};

export default Select;

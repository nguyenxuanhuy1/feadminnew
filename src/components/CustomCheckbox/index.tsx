import React from "react";
import { Checkbox as CheckboxAntd } from "antd";
import { CheckBoxProps } from "./CustomCheckbox.interface";
import { ErrorMessage } from "formik";

const CheckBox = ({
  label,
  isRequired,
  title,
  onChange,
  checked,
  name,
  form,
  field,
  className,
  disabled,
  defaultChecked,
  setState,
}: CheckBoxProps<any, any>) => {
  const { errors, touched } = form ?? {};
  const customOnChange = (el: any) => {
    form?.setFieldValue(name || field?.name || "", el.target.checked);
    if (setState) {
      setState(el.target.checked);
    }
  };

  const customChecked = field?.value;

  return (
    <div>
      <>
        {label && (
          <div style={{ marginBottom: "12px" }}>
            {label}
            {isRequired ? (
              <span style={{ color: "red", margin: "0 4px" }}>*</span>
            ) : null}
          </div>
        )}
      </>
      <CheckboxAntd
        onChange={onChange || customOnChange}
        checked={checked || customChecked}
        name={name}
        className={className}
        disabled={disabled}
        defaultChecked={defaultChecked}
      >
        {title}
      </CheckboxAntd>
      <div>
        {field &&
          touched?.[field?.name || ""] &&
          errors?.[field?.name || ""] && (
            <span className="text-[red]">
              <ErrorMessage name={field?.name || ""} className="span_error" />
            </span>
          )}
      </div>
    </div>
  );
};

export default CheckBox;

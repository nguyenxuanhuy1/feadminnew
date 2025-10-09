import { Checkbox } from "antd";

import { CheckBoxGroupProps } from "./ICheckboxGroup";

export const CustomCheckboxGroup = ({
  title,
  value,
  name,
  form,
  field,
  className,
  options,
  onChange,
  disabled,
  isRequired,
}: CheckBoxGroupProps<any, any>) => {
  const { setFieldValue = () => {} } = form ?? {};

  const handleOnChange = (e: any[]) => {
    setFieldValue(field?.name || "", e);
  };

  return (
    <div>
      <div style={{ marginBottom: "8px" }}>
        {title}
        {isRequired ? (
          <span style={{ color: "red", margin: "0 4px" }}>*</span>
        ) : null}
      </div>
      <Checkbox.Group
        options={options}
        onChange={onChange || handleOnChange}
        name={name}
        className={className}
        value={value || field?.value}
        disabled={disabled}
      />
    </div>
  );
};

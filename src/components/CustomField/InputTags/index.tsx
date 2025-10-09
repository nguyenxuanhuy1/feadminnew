import {
  ErrorMessage,
  FieldInputProps,
  FormikHelpers,
  FormikState,
} from "formik";
import React from "react";
import { TagsInput } from "react-tag-input-component";

interface IProps {
  placeHolder?: string;
  name: string;
  field?: FieldInputProps<any>;
  form?: FormikHelpers<any> & FormikState<any>;
  onChange?: (tags: string[]) => void;
  value?: Array<string>;
  label?: string;
  isRequired?: boolean;
  disabled?: boolean;
  onBlur?: any;
}

const CustomTagsInput = (props: IProps) => {
  //! define
  const {
    placeHolder,
    name,
    field,
    form,
    onChange,
    value,
    label,
    isRequired,
    disabled,
    onBlur,
  } = props;

  const { errors, touched } = form ?? {};

  const tagsValue = value || field?.value || [];

  const tagsName = name || field?.name || "";

  const simulateEnterKey = (inputElement: any) => {
    const event = new KeyboardEvent("keydown", {
      key: "Enter",
      keyCode: 13,
      code: "Enter",
      which: 13,
      bubbles: true,
    });
    inputElement.dispatchEvent(event);
  };

  const handleBlur = (e: any) => {
    simulateEnterKey(e.target);
    form?.setFieldTouched(tagsName, true);
  };

  return (
    <React.Fragment>
      <span className="text-[14px] font-[400] mb-[4px] ">{label}</span>
      {isRequired && (
        <span
          style={{ color: "red", margin: "0 4px" }}
          className=" items-center"
        >
          *
        </span>
      )}
      <TagsInput
        value={tagsValue}
        onChange={(e: any) => {
          return form?.setFieldValue(field?.name || "", e) || onChange;
        }}
        placeHolder={placeHolder || "Nhấn enter để thêm"}
        name={tagsName}
        classNames={{ tag: "tag-cls", input: "input-cls" }}
        disabled={disabled}
        onBlur={handleBlur}
      />
      {touched?.[tagsName] && errors?.[tagsName] && (
        <span className="text-[red]">
          <ErrorMessage name={tagsName || ""} />
        </span>
      )}
    </React.Fragment>
  );
};

export default CustomTagsInput;

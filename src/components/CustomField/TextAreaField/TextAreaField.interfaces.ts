import { FieldInputProps, FormikHelpers, FormikState } from "formik";

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

export interface IPropsTextArea {
  name?: string;
  value?: string;
  field?: FieldInputProps<any>;
  form?: FormikHelpers<any> & FormikState<any>;
  disabled?: boolean;
  isRequired?: boolean;
  autoSize?: boolean | AutoSizeType;
  className?: string;
  placeholder?: string;
  label?: string;
  maxLength?: number;
  rows?: number;
  onChange?: (e: any) => void;
  showCount?: any;
}

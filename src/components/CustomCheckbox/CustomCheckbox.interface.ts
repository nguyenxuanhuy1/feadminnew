import { FieldInputProps, FormikState, FormikHelpers } from "formik";

export interface CheckBoxProps<T, V> {
  title?: string;
  onChange?: (e: T) => void;
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  name?: string;
  field?: FieldInputProps<T>;
  form?: FormikHelpers<V> & FormikState<any>;
  className?: string;
  label?: string;
  isRequired?: boolean;
  setState?: any;
}

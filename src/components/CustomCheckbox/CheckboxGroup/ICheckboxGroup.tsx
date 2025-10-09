import { CheckboxOptionType } from "antd";

import { FormikState, FormikHelpers } from "formik";

export interface CheckBoxGroupProps<T, V> {
  title?: string;
  onChange?: (e: T) => void;
  checked?: boolean;
  name?: string;
  field?: any;
  form?: FormikHelpers<V> & FormikState<any>;
  className?: string;
  options?: (string | number | CheckboxOptionType)[] | undefined;
  handleChange: (checkedValue: any) => void;
  isRequired?: boolean;
  value?: any;
  disabled?: boolean;
}

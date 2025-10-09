import { FieldInputProps, FormikHelpers, FormikState } from "formik";

interface DatePickerProps<T, V> {
  onChange: () => void;
  onBlur?: () => void;
  className?: string;
  name?: string;
  field?: FieldInputProps<T>;
  form?: FormikHelpers<V> & FormikState<any>;
  disabled?: boolean;
  label?: string;
  isRequired?: boolean;
  defaultValue?: any;
  format?: string;
  placeholder?: string;
  value?: any;
  picker?: "time" | "date" | "month" | "week" | "quarter" | "year";
  mode?: any;
  maxDate?: any;
  minDate?: any;
  isMin?: boolean;
  isDisableDate?: boolean;
  showTime?: boolean;
}

export default DatePickerProps;

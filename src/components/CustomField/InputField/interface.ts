import { Size } from "@/interfaces";
import { FieldInputProps, FormikState, FormikHelpers } from "formik";
import { ReactNode } from "react";

interface ICustomFieldInputProps<T, V> {
  children?: any;
  field?: FieldInputProps<T>;
  form?: FormikHelpers<V> & FormikState<any>;
}
interface InputProps<T, V> extends ICustomFieldInputProps<any, any> {
  size?: Size;
  type?: string;
  value?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: any;
  placeholder?: string;
  className?: string;
  name?: string;
  props?: any;
  field?: FieldInputProps<T>;
  form?: FormikHelpers<V> & FormikState<any>;
  disabled?: boolean;
  label?: string;
  isRequired?: boolean;
  isStyleDefault?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  id?: any;
  min?: number;
  maxLength?: number;
  onClick?: any;
  style?: React.CSSProperties;
  titleCompact?: string;
  onClickCompact?: () => void;
  disabledCompact?: boolean;
  defaultValue?: string;
  bordered?: boolean;
  allowClear?: boolean;
  readOnly?: boolean;
  showCount?: any;
}

export default InputProps;

export interface InputPropsFile<T, V> extends ICustomFieldInputProps<any, any> {
  size?: Size;
  type?: string;
  value?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur?: any;
  placeholder?: string;
  className?: string;
  name?: string;
  props?: any;
  field?: FieldInputProps<T>;
  form?: FormikHelpers<V> & FormikState<any>;
  disabled?: boolean;
  label?: string;
  isRequired?: boolean;
  isStyleDefault?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  id?: any;
  min?: number;
  maxLength?: number;
  onClick?: any;
  style?: React.CSSProperties;
  titleCompact?: string;
  onClickCompact?: () => void;
  disabledCompact?: boolean;
  defaultValue?: string;
  bordered?: boolean;
  allowClear?: boolean;
  readOnly?: boolean;
  handleFile: (e: any) => void;
}

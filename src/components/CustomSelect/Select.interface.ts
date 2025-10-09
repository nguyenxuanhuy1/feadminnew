import React from "react";
// import { Size, SelectStatus } from "interfaces/index";
import { FormikState, FormikHelpers, FieldInputProps } from "formik";
import { IOptions, Size } from "../../interfaces";

export interface FieldSelectPropsRoot {
  defaultValue?: string | null | undefined;
  value?: string | null | undefined;
  size?: Size;
  open?: boolean;
  options?: IOptions[];
  placeholder?: React.ReactNode;
  showArrow?: boolean;
  allowClear?: boolean;
  mode?: "multiple" | "tags" | undefined;
  onChange?: (value: any) => void;
  onBlur?: any;
  className?: string;
  form?: FormikHelpers<any> & FormikState<any>;
  field?: FieldInputProps<any>;
  label?: string | React.ReactNode;
  showSearch?: boolean;
  onSearch?: (value: string) => void;
  isRequied?: boolean;
  disabled?: boolean;
  handlePopupScroll?: any;
  setState?: any;
  suffixIcon?: React.ReactNode;
  isRequired?: boolean;
  name?: string;
  close?: boolean;
  setOptions?: any;
  setDateOfBirth?: any;
  dateOfBirth?: any;
  setStatePrivileages?: any;
}

export interface FieldSelectPropsRoleTag extends FieldSelectPropsRoot {}

export interface FieldSelectPropsPrivileageTag extends FieldSelectPropsRoot {
  setThuongTru?: any;
  thuongtru?: any;
}

export interface FieldSelectPropsPostTypeByLanguage
  extends FieldSelectPropsRoot {
  languageId: number;
  detailPost: any;
  isDisable?: (disable: boolean) => void;
  setNoteTexts: (noteTexts: any) => void;
  setHasLink: (disable: boolean) => void;
}

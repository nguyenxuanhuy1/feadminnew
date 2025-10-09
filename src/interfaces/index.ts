export interface ResponseGenerator<T = any> {
  config?: any;
  data?: T;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export enum ButtonType {
  Primary = "primary",
  // Ghost = "ghost",
  Dashed = "dashed",
  Link = "link",
  Text = "text",
}

export enum ButtonHTMLTypes {
  Submit = "submit",
  Button = "button",
  Reset = "reset",
}

export enum Size {
  Large = "large",
  Middle = "middle",
  Small = "small",
}

export interface IDefaultLayout {
  children: React.ReactElement;
  isNoDefault?: boolean;
}

export enum ButtonShape {
  Circle = "circle",
  Round = "round",
  Default = "default",
}
export interface IParamsPage {
  page: number;
  size: number;
}

export interface IMeta {
  page: number;
  page_of_number: number;
  total: number;
}

export interface IOptions {
  label: string;
  value: any;
}

export enum TypeModal {
  Info = "info",
  Success = "success",
  Error = "error",
  Warn = "warn",
  Warning = "warning",
  Confirm = "confirm",
}

import {
  CloseCircleOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  SaveOutlined,
  StopOutlined,
  CheckOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { ButtonHTMLTypes } from "../../interfaces";
import Button from "./button";

interface ButtonProps {
  icon?: React.ReactNode;
  title?: string;
  disable?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  htmlType?: ButtonHTMLTypes | undefined;
  className?: string;
  styles?: React.CSSProperties;
  type?: any;
}

export const ButtonCreate = (props: ButtonProps) => {
  const { title, htmlType, onClick, className, icon, disabled } = props;
  return (
    <Button
      title={title}
      className={
        className
          ? className
          : disabled
          ? "btn-remain-disable"
          : "btn-group btn-create"
      }
      icon={icon ?? <PlusCircleOutlined />}
      onClick={onClick}
      htmlType={htmlType}
      disabled={disabled}
    />
  );
};

export const ButtonConfirm = (props: ButtonProps) => {
  const { title, htmlType, onClick, className, icon, disabled } = props;
  return (
    <Button
      title={title || "Xác nhận"}
      className={className ?? "btn-group btn-save"}
      icon={icon ?? <CheckOutlined />}
      onClick={onClick}
      htmlType={htmlType}
      disabled={disabled}
    />
  );
};

export const ButtonSave = (props: ButtonProps) => {
  const { title, htmlType, onClick, className, icon, disabled } = props;
  return (
    <Button
      title={title || "Lưu"}
      className={className ?? "btn-group btn-save"}
      icon={icon ?? <SaveOutlined />}
      onClick={onClick}
      htmlType={htmlType}
      disabled={disabled}
    />
  );
};

export const ButtonCancel = (props: ButtonProps) => {
  const { title, htmlType, onClick, className, icon, disabled } = props;
  return (
    <Button
      title={title || "Hủy"}
      className={
        className
          ? className
          : disabled
          ? "btn-remain-disable"
          : "btn-group btn-cancel"
      }
      icon={icon ?? <StopOutlined />}
      onClick={onClick}
      htmlType={htmlType}
      disabled={disabled}
    />
  );
};

export const ButtonDelete = (props: ButtonProps) => {
  const { title, htmlType, onClick, className, icon, disable } = props;

  return (
    <Button
      title={title}
      className={
        className
          ? className
          : disable
          ? "btn-remain-disable"
          : "btn-group btn-delete"
      }
      icon={icon ?? <CloseCircleOutlined />}
      onClick={onClick}
      htmlType={htmlType}
      disabled={disable}
    />
  );
};

export const ButtonRemain = (props: ButtonProps) => {
  const { title, htmlType, onClick, className, disable, icon } = props;
  return (
    <Button
      title={title}
      className={className ?? (disable ? "btn-remain-disable" : "btn-remain")}
      icon={icon ?? <PlusCircleOutlined />}
      onClick={onClick}
      htmlType={htmlType}
      disabled={disable}
    />
  );
};

export const ButtonSearch = (props: ButtonProps) => {
  const { title, htmlType, onClick, className, icon, disable } = props;
  return (
    <Button
      title={title}
      className={
        className
          ? className
          : disable
          ? "btn-remain-disable"
          : "btn-group btn-searchIcon"
      }
      icon={icon ?? <SearchOutlined />}
      disabled={disable}
      onClick={onClick}
      htmlType={htmlType}
    />
  );
};

export const ButtonHistory = (props: ButtonProps) => {
  const { title, htmlType, onClick, className, icon, disable } = props;
  return (
    <Button
      title={title}
      className={
        className
          ? className
          : disable
          ? "btn-remain-disable"
          : "btn-group btn-historyIcon"
      }
      icon={icon ?? <HistoryOutlined />}
      disabled={disable}
      onClick={onClick}
      htmlType={htmlType}
    />
  );
};

export const ButtonIcon = (props: ButtonProps) => {
  const { icon, onClick, className, disable } = props;
  return (
    <Button
      icon={icon}
      className={className ?? "btn-icon"}
      onClick={onClick}
      disabled={disable}
    />
  );
};

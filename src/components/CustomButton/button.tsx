import { Button as ButtonAntd, Tooltip } from "antd";
import ButtonProps from "./interface";

const Button = ({
  icon,
  loading,
  disabled,
  title,
  size,
  type,
  className,
  shape,
  onClick,
  htmlType,
  tooltip,
  style,
}: ButtonProps) => {
  return (
    <Tooltip title={tooltip} placement="top" color={"#333333"}>
      <ButtonAntd
        icon={icon}
        loading={loading}
        disabled={disabled}
        size={size}
        shape={shape}
        type={type}
        htmlType={htmlType}
        className={`custom-button ${className}`}
        onClick={onClick}
        style={style}
      >
        {title}
      </ButtonAntd>
    </Tooltip>
  );
};

export default Button;

import { Typography } from "antd";
import { TitleProps } from "antd/es/typography/Title";

const { Title } = Typography;

const CustomTitle = (props: TitleProps) => {
  const { title } = props;
  return <Title {...props}>{title}</Title>;
};

export default CustomTitle;

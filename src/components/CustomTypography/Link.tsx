import { Typography } from "antd";
import { LinkProps } from "antd/es/typography/Link";

const { Link } = Typography;

const CustomText = (props: LinkProps) => {
  const { title } = props;
  return <Link {...props}>{title}</Link>;
};

export default CustomText;

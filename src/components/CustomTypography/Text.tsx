import { Typography } from "antd";
import { TextProps } from "antd/es/typography/Text";

const { Text } = Typography;

const CustomText = (props: TextProps) => {
  const { title } = props;
  return <Text {...props}>{title}</Text>;
};

export default CustomText;

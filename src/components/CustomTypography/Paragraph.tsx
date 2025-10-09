import { Typography } from "antd";
import { ParagraphProps } from "antd/es/typography/Paragraph";

const { Paragraph } = Typography;

const CustomParagraph = (props: ParagraphProps) => {
  const { title } = props;
  return <Paragraph {...props}>{title}</Paragraph>;
};

export default CustomParagraph;

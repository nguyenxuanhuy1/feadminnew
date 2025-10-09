import { ButtonCreate } from "@/components/CustomButton/index";

interface IProps {
  title: string;
  handleCreate?: () => void;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
}

const WrapperTable = (props: IProps) => {
  const { title, handleCreate, toolbar, children } = props;
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#606060",
          }}
        >
          {title}
        </div>
        <div>
          {toolbar ? (
            toolbar
          ) : (
            <ButtonCreate title="Thêm mới" onClick={handleCreate} />
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default WrapperTable;

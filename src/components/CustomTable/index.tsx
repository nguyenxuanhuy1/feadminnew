import { Table, type TableProps, Pagination } from "antd";

interface ParamsPage {
  page: number;
  size: number;
}

interface CustomTableProps<RecordType> extends TableProps<RecordType> {
  paramsPage?: ParamsPage;
  setParamPage?: (page: ParamsPage) => void;
  total?: number;
  setItemTarget?: (record: RecordType) => void;
}

const CustomTable = <RecordType extends object = any>({
  paramsPage,
  setParamPage,
  total,
  setItemTarget,
  ...rest
}: CustomTableProps<RecordType>) => {
  return (
    <div>
      <Table
        scroll={{ x: "max-content" }}
        className="custom-red-header"
        pagination={false}
        onRow={(record) => ({
          onClick: () => {
            setItemTarget?.(record);
          },
        })}
        {...rest}
      />
      <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
        <Pagination
          current={paramsPage?.page ?? 1}
          pageSize={paramsPage?.size ?? 10}
          total={total}
          showSizeChanger
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} / ${total} bản ghi`
          }
          onChange={(page, size) => {
            setParamPage?.({ page, size: size });
          }}
        />
      </div>
    </div>
  );
};

export default CustomTable;

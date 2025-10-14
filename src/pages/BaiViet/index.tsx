import SearchForm from "./components/search";
import TableForm from "./components/table";
import React, { useContext } from "react";
import { exportThamQuyen, searchThamQuyen } from "@/api/apiSiteAdmin";
import { valueSearch } from "./helper/initialValues";
import { Option } from "./helper/interface";
import { notification } from "antd";
import { AppContext } from "@/App";
import { exportFileBlob } from "@/utils/exportFile";
import WrapSection from "@/components/WrapSection";

const BaiViet = () => {
  const [paramsPage, setParamsPage] = React.useState({
    page: 1,
    size: 10,
  });

  const [searchForm, setSearchForm] = React.useState(valueSearch);
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const [categoryCode, setCategoryCode] = React.useState<Option[]>([]);
  const [issLevel, setIssLevel] = React.useState<Option[]>([]);
  const [typeDoc, setTypeDoc] = React.useState<Option[]>([]);
  const { setLoading } = useContext(AppContext);

  const [dataSearch, setDataSearch] = React.useState<{
    data: any[];
    total: number;
  }>({
    data: [],
    total: 0,
  });

  const getListTable = async (body: any, page: number, size: number) => {
    setLoading(true);
    try {
      const result = await searchThamQuyen(body, page, size);
      if (result.status === 200) {
        setDataSearch({
          data: result.data.data,
          total: result.data.total,
        });
        console.log(result.data.data);
        
        if (result.data.msg !== null) {
          notification.success({
            message: result.data.msg,
          });
        }
      }
    } catch (error) {
      notification.error({
        message: "Lỗi khi tìm kiếm",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const res = await exportThamQuyen(searchForm);
      if (res && res.data) {
        exportFileBlob(res.data, "DS_thamquyen");
      }
    } catch (error) {
      console.error("Lỗi xuất file:", error);
    }
  };

  React.useEffect(() => {
    getListTable(searchForm, paramsPage.page, paramsPage.size);
  }, [searchForm, paramsPage, refresh]);

  return (
    <WrapSection>
      <SearchForm
        setSearchForm={setSearchForm}
        categoryCode={categoryCode}
        issLevel={issLevel}
        typeDoc={typeDoc}
        setParamsPage={setParamsPage}
      />
      <TableForm
        dataSearch={dataSearch}
        paramsPage={paramsPage}
        setParamsPage={setParamsPage}
        setRefresh={setRefresh}
        categoryCode={categoryCode}
        issLevel={issLevel}
        typeDoc={typeDoc}
        handleExport={handleExport}
      />
    </WrapSection>
  );
};

export default BaiViet;

import React, { useEffect, useState } from "react";
import TableVideo from "./Components/table";
import { ICategory} from "./Helper/interface"
import { getAllCategory } from "@/api/apiSiteAdmin";
import TableCategory from "./Components/table";

const CategoryPage = () => {
  const [dataSearch, setDataSearch] = useState<{ data: ICategory[]; total: number }>({
    data: [],
    total: 0,
  });

  const [paramsPage, setParamsPage] = useState({ page: 1, size: 100 });
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    try {
      const res = await getAllCategory();
      if (res.status === 200) {
        setDataSearch({
          data: res.data,
          total: res.data.total,
        });
      }
    } catch (error) {
      console.error("Lỗi tải video:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [paramsPage, refresh]);

  return (
    <div style={{margin:'20px'}}>
      <TableCategory
        dataSearch={dataSearch}
        paramsPage={paramsPage}
        setParamsPage={setParamsPage}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default CategoryPage;

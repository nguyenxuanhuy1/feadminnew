import React, { useEffect, useState } from "react";
import UserTable from "./components/table";
import SearchUserForm from "./components/search";
import { User } from "./interface";
import { searchUser } from "@/api/apiSiteAdmin";

const UserPage = () => {
  const [dataSearch, setDataSearch] = useState<{ data: User[]; total: number }>({
    data: [],
    total: 0,
  });

  const [paramsPage, setParamsPage] = useState({ page: 1, size: 10 });
  const [keyword, setKeyword] = useState("");
  const [refresh, setRefresh] = useState(false);


  const fetchData = async () => {
    try {
      const res = await searchUser(keyword, paramsPage.page, paramsPage.size);
      if (res.status === 200) {
        setDataSearch({
          data: res.data.data,
          total: res.data.total,
        });
      }
    } catch (error) {
      console.error("Lỗi tải user:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [paramsPage, keyword, refresh]);

  return (
    <div style={{ margin: "20px" }}>
      <SearchUserForm setKeyword={setKeyword} setParamsPage={setParamsPage} />
      <br />
      <UserTable
        dataSearch={dataSearch}
        paramsPage={paramsPage}
        setParamsPage={setParamsPage}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default UserPage;

import React, { useEffect, useState } from "react";
import TableVideo from "./Components/table";
import { IVideo } from "./Helper/interface";
import { getAllVideos } from "@/api/apiSiteAdmin";

const VideoPage = () => {
  const [dataSearch, setDataSearch] = useState<{ data: IVideo[]; total: number }>({
    data: [],
    total: 0,
  });

  const [paramsPage, setParamsPage] = useState({ page: 1, size: 10 });
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    try {
      const res = await getAllVideos(paramsPage.page, paramsPage.size);
      if (res.status === 200) {
        setDataSearch({
          data: res.data.data,
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
      <TableVideo
        dataSearch={dataSearch}
        paramsPage={paramsPage}
        setParamsPage={setParamsPage}
        setRefresh={setRefresh}
      />
    </div>
  );
};

export default VideoPage;

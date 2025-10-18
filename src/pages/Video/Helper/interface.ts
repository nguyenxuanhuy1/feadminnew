// helper/interface.ts

export interface IVideo {
  id: number | string;      
  title: string;            
  linkVideo: string;      
}

export interface ITableFormProps {
  dataSearch: {
    data: IVideo[];       
    total: number;          
  };
  paramsPage: {
    page: number;
    size: number;
  };
  setParamsPage: (params: { page: number; size: number }) => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  issLevel?: boolean;
  typeDoc?: string;
}

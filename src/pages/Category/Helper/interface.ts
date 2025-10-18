export interface ICategory {
  id: string;
  name: string;
}


export interface CTableFormProps {
  dataSearch: {
    data: ICategory[];
    total: number;
  };
  paramsPage: {
    page: number;
    size: number;
  };
  setParamsPage: React.Dispatch<
    React.SetStateAction<{ page: number; size: number }>
  >;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

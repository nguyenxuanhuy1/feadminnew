export interface ITableFormProps {
  dataSearch: {
    data: any[];
    total: number;
  };
  paramsPage: {
    page: number;
    size: number;
  };
  setParamsPage: (params: { page: number; size: number }) => void;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  categoryCode: any;
  issLevel: any;
  typeDoc: any;
  handleExport: () => void;
}

export interface Option {
  value: string;
  label: string;
}

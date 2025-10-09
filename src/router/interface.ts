import React from "react";

export interface IRoute {
  name: string;
  key: string;
  path: string;
  isPrivateRoute?: boolean;
  layout:
    | React.LazyExoticComponent<React.MemoExoticComponent<any>>
    | React.ExoticComponent<any>
    | typeof React.Component;
  component: typeof React.Component | React.FC | null;
  icon?: React.ReactNode;
  routeChild: {
    name: string;
    path: string;
    layout:
      | React.LazyExoticComponent<React.MemoExoticComponent<any>>
      | React.ExoticComponent<any>
      | typeof React.Component;
    component: typeof React.Component | React.FC | null;
    isPrivateRoute?: boolean;
    key: string;
    routeChild: any;
    icon?: React.ReactNode;
  }[];
}

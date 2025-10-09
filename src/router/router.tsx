import React, { lazy } from "react";
import Path from "./path";
import { IRoute } from "./interface";
import { HomeOutlined, SafetyCertificateOutlined } from "@ant-design/icons";

const DefaultLayoutAdmin = lazy(() => import("@/defaultLayout/layoutAdmin"));
const Home = lazy(() => import("@/pages/Home/idex"));
const BaiViet = lazy(() => import("@/pages/BaiViet/index"));
const login = lazy(() => import("@/pages/login/index"));
const routes: IRoute[] = [
  {
    name: "login",
    key: "login",
    path: Path.Login,
    layout: React.Fragment,
    component: login,
    routeChild: [],
  },
  {
    name: "Home",
    key: "home",
    path: Path.Home,
    layout: DefaultLayoutAdmin,
    component: Home,
    isPrivateRoute: true,
    icon: <HomeOutlined />,
    routeChild: [],
  },
  {
    name: "Quản lý bài viết",
    key: "Baiviet",
    path: Path.BaiViet,
    layout: DefaultLayoutAdmin,
    component: BaiViet,
    isPrivateRoute: true,
    icon: <SafetyCertificateOutlined />,
    routeChild: [],
  },
];

export default routes;

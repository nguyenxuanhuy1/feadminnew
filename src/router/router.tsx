import React, { lazy } from "react";
import Path from "./path";
import { IRoute } from "./interface";
import { HomeOutlined, MenuOutlined, SafetyCertificateOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons";

const DefaultLayoutAdmin = lazy(() => import("@/defaultLayout/layoutAdmin"));
const Home = lazy(() => import("@/pages/Home/idex"));
const BaiViet = lazy(() => import("@/pages/BaiViet/index"));
const login = lazy(() => import("@/pages/login/index"));
const register = lazy(() => import("@/pages/Register/index"));
const Video = lazy(() => import("@/pages/Video/index"));
const Category = lazy(() => import("@/pages/Category/index"));
const User = lazy(() => import("@/pages/User/index"));
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
    name: "Register",
    key: "Register",
    path: Path.Register,
    layout: React.Fragment,
    component: register,
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
  {
    name: "Quản lý video",
    key: "video",
    path: Path.Video,
    layout: DefaultLayoutAdmin,
    component: Video,
    isPrivateRoute: true,
    icon: <VideoCameraOutlined />,
    routeChild: [],
  },
  {
    name: "Quản lý menu",
    key: "category",
    path: Path.Category,
    layout: DefaultLayoutAdmin,
    component: Category,
    isPrivateRoute: true,
    icon: <MenuOutlined />,
    routeChild: [],
  },
  {
    name: "Quản lý người dùng",
    key: "user",
    path: Path.User,
    layout: DefaultLayoutAdmin,
    component: User,
    isPrivateRoute: true,
    icon: <UserOutlined />,
    routeChild: [],
  },
];

export default routes;

import React, { useState } from "react";
import { Avatar, Dropdown, Image, Layout, Menu, MenuProps } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import routes from "@/router/router";
import { IRoute } from "@/router/interface";
import SubMenu from "antd/es/menu/SubMenu";
import { Link, useNavigate } from "react-router-dom";
import { isEmpty } from "@/utils/lodash";
import Path from "@/router/path";
import { CustomTypography } from "@/components/CustomTypography";
import quochuy from "@/assets/quochuy.png";
import MenuLeft from "@/components/menu";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const profile = localStorage.getItem("profile");
  const fullName = profile ? JSON.parse(profile).fullName : "";

  const renderMenu = (data: IRoute[]) => {
    const dataLayout = data.filter((item) => item.isPrivateRoute);
    return dataLayout.map((route) => {
      return !isEmpty(route.routeChild) ? (
        <SubMenu key={route.path} title={route.name} icon={route.icon}>
          {renderMenu(route.routeChild)}
        </SubMenu>
      ) : (
        <Menu.Item key={route.path} icon={route.icon}>
          <Link to={route.path}>{route.name}</Link>
        </Menu.Item>
      );
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <LogoutOutlined />
          <CustomTypography.Text title=" Đăng xuất" />
        </div>
      ),
      onClick: () => {
        window.localStorage.clear();
        window.location.href = "/login"
      },
    },
  ];

  return (
    <Layout className="headerAdmin">
      <Sider
        style={{ background: "none" }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={270}
      >
        <div
          className="h"
          onClick={() => {
            navigate(Path.Home);
          }}
        >
          <Image width={50} height={50} preview={false} src={quochuy} />
        </div>
         <Menu theme="light" mode="inline" className="bg-red">
          {renderMenu(routes)}
        </Menu>

      </Sider>
      <Layout style={{ maxHeight: "calc(100vh-17px)", overflow: "auto" }}>
        <Header
          className={`header-wrapper ${collapsed ? "collapsed" : "expanded"}`}
        >
          <div className="right-text">
            <CustomTypography.Text
              strong
              title="QUẢN LÝ TRANG TIN"
              className="text-white"
              style={{ fontSize: "20px" }}
            />
          </div>
          <div className="right-header">
            <CustomTypography.Text title={fullName} className="text-white" />
            <Dropdown
              placement="bottomRight"
              menu={{ items }}
              trigger={["click"]}
              className="cursor-pointer "
            >
              <div className="flex items-center gap-4">
                <Avatar icon={<UserOutlined />} />
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="content-layout">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;

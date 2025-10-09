import { Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  HomeOutlined,
  CrownOutlined,
  SafetyCertificateOutlined,
  BookOutlined,
  ProfileOutlined,
  WechatWorkOutlined,
  IssuesCloseOutlined,
  ContactsOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";

interface RawMenuItem {
  code: string;
  name: string;
  url: string;
  children?: RawMenuItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  HOME: <HomeOutlined />,
  TQ: <SafetyCertificateOutlined />,
  CTQ: <CrownOutlined />,
  LV: <AppstoreOutlined />,
  LVB: <BookOutlined />,
  VB: <ProfileOutlined />,
  VM: <WechatWorkOutlined />,
  VP: <IssuesCloseOutlined />,
  QLND: <ContactsOutlined />,
  QLVT: <UsergroupAddOutlined />,
};

// Hàm render Menu
const renderMenu = (menus: RawMenuItem[]) =>
  menus.map((item) => {
    if (item.children && item.children.length > 0) {
      return (
        <Menu.SubMenu
          key={item.code}
          title={item.name}
          icon={iconMap[item.code]}
        >
          {renderMenu(item.children)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={item.url} icon={iconMap[item.code]}>
        <Link to={item.url} style={{ fontWeight: item.children ? 600 : 400 }}>
          {item.name}
        </Link>
      </Menu.Item>
    );
  });

const MenuLeft = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const publicUrl = process.env.PUBLIC_URL || "";

  const rawMenu: RawMenuItem[] = JSON.parse(
    localStorage.getItem("menu") || "[]"
  );

  // Chuyển hướng lần đầu
  useEffect(() => {
    if (rawMenu.length && localStorage.getItem("checkFirst") === "true") {
      const defaultPath = rawMenu[0]?.url;
      if (defaultPath) navigate(publicUrl + defaultPath);
      localStorage.setItem("checkFirst", "false");
    }
  }, [rawMenu, navigate, publicUrl]);

  return (
    <Menu
      className="custom-menu"
      mode="inline"
      selectedKeys={[location.pathname.replace(publicUrl, "")]}
    >
      {renderMenu(rawMenu)}
    </Menu>
  );
};

export default MenuLeft;

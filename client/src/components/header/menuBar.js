import React from "react";
import { Nav } from "react-bootstrap";

const Menubar = () => {
  return (
    <>
      <Nav
        justify="true"
        activeKey="/home"
        className="nav_box"
        style={{ backgroundColor: "#f7f4f0", borderRadius: 10 }}
      >
        <Nav.Item>
          <Nav.Link
            href="/home"
            className="nav_item"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            community
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            Event & Notice
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            Room reservation
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="disabled"
            style={{ color: "#ffaf2d", fontWeight: "bold", fontSize: 20 }}
          >
            My page
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* <Menu mode="horizontal" className="big_menu">
        <Menu.SubMenu key="SubMenu1" title="커뮤니티" icon={<MailOutlined />}>
          <Menu.Item key="two" icon={<AppstoreOutlined />}>
            글 작성하기
          </Menu.Item>
          <Menu.Item key="three" icon={<AppstoreOutlined />}>
            글 확인하기
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="SubMenu2"
          title="행사 및 공지"
          icon={<SettingOutlined />}
        >
          <Menu.Item key="four" icon={<AppstoreOutlined />}>
            행사 찾아보기
          </Menu.Item>
          <Menu.Item key="five" icon={<AppstoreOutlined />}>
            공지 확인하기
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="SubMenu3"
          title="펫 호텔 예약"
          icon={<SettingOutlined />}
        >
          <Menu.Item key="four" icon={<AppstoreOutlined />}>
            호텔 예약하기
          </Menu.Item>
          <Menu.Item key="four" icon={<AppstoreOutlined />}>
            예약 확인하기
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="mail" icon={<MailOutlined />}>
          마이페이지
        </Menu.Item>
      </Menu> */}
    </>
  );
};

export default Menubar;

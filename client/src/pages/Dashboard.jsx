import React, { useEffect } from 'react';
import { Layout, Menu, theme, Button, Dropdown, Flex } from 'antd';
import SidebarMenuList from '../components/SidebarMenuList';
const { Header, Content, Footer, Sider } = Layout;
import { EditOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AddAppartment from '../components/AddAppartment';
import ApartmentList from '../components/ApartmentList';
import UserApartment from '../components/UserApartment';

const items = [
  {
    key: '1',
    label: <Link to="/profile">Edit Profile</Link>,
    icon: <EditOutlined />,
    disabled: true,
  },
  {
    key: '2',
    label: (
      <Link
        to="/"
        onClick={() => {
          localStorage.removeItem('token');
          navigate('', { replace: true });
        }}
      >
        Logout
      </Link>
    ),
    icon: <LogoutOutlined />,
  },
];

const Dashboard = ({ setUserLoggedIn }) => {
  useEffect(() => {
    setUserLoggedIn(true);
  }, []);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      ></Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            padding: '0 3rem',
            background: colorBgContainer,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2 style={{ color: 'gray' }}>Dashboard</h2>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomLeft"
            arrow
          >
            <Button>
              <UserOutlined />
            </Button>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              background: colorBgContainer,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h2>List</h2>
              <AddAppartment />
            </div>

            {/* <ApartmentList /> */}
            <UserApartment />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Space Seekers ©2023 All Rights Reserved
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;

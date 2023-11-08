import { Menu } from 'antd';
import {
  HomeOutlined,
  UnorderedListOutlined,
  AreaChartOutlined,
  PayCircleOutlined,
  SettingOutlined,
  BarsOutlined,
} from '@ant-design/icons';
import '../styles/sidebarMenu.css';
import logoImage from '../assets/logo.png';
import { Link } from 'react-router-dom';

const SidebarMenuList = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">
          <img src={logoImage} alt="" />
          <h4>Space Seekers</h4>
        </div>
      </div>
      <Menu theme="dark" mode="inline" className="menu-bar">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/dashboard">Home</Link>
        </Menu.Item>
        <Menu.Item key="activity" icon={<UnorderedListOutlined />}>
          <Link to="/list">List</Link>
        </Menu.Item>
        <Menu.SubMenu key="tasks" icon={<BarsOutlined />} title="Tasks">
          <Menu.Item key="task-1">Task 1</Menu.Item>
          <Menu.Item key="task-2">Task 2</Menu.Item>
          <Menu.SubMenu key="subtasks" title="Subtasks">
            <Menu.Item key="subtask-1">Subtask 1</Menu.Item>
            <Menu.Item key="subtask-2">Subtask 2</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu>
        <Menu.Item key="progress" icon={<AreaChartOutlined />}>
          Progress
        </Menu.Item>
        <Menu.Item key="payment" icon={<PayCircleOutlined />}>
          Payment
        </Menu.Item>
        <Menu.Item key="setting" icon={<SettingOutlined />}>
          Setting
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SidebarMenuList;

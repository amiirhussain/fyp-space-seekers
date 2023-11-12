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

const SidebarMenuList = ({ onMenuClick }) => {
  const handleClick = ({ key }) => {
    onMenuClick(key);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <div className="logo-icon">
          <img src={logoImage} alt="" />
          <h4>Space Seekers</h4>
        </div>
      </div>
      <Menu
        onClick={handleClick}
        theme="dark"
        mode="inline"
        className="menu-bar"
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key="list" icon={<UnorderedListOutlined />}>
          List
        </Menu.Item>
        {/* <Menu.SubMenu key="tasks" icon={<BarsOutlined />} title="Tasks">
          <Menu.Item key="task-1">Task 1</Menu.Item>
          <Menu.Item key="task-2">Task 2</Menu.Item>
          <Menu.SubMenu key="subtasks" title="Subtasks">
            <Menu.Item key="subtask-1">Subtask 1</Menu.Item>
            <Menu.Item key="subtask-2">Subtask 2</Menu.Item>
          </Menu.SubMenu>
        </Menu.SubMenu> */}
        <Menu.Item key="analytics" icon={<AreaChartOutlined />}>
          Analytics
        </Menu.Item>
        <Menu.Item key="chats" icon={<PayCircleOutlined />}>
          Chats
        </Menu.Item>
        <Menu.Item key="setting" icon={<SettingOutlined />}>
          Setting
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SidebarMenuList;

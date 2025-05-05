import React from 'react';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, BookOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const DashboardSidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider width={200} style={{ background: '#fff', minHeight: '100vh', boxShadow: '2px 0 8px #f0f1f2' }}>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0, paddingTop: 40 }}
        items={[
          {
            key: '/dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
            onClick: () => navigate('/dashboard'),
          },
          {
            key: '/books',
            icon: <BookOutlined />,
            label: 'Books',
            onClick: () => navigate('/books'),
          },
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: onLogout,
            danger: true,
          },
        ]}
      />
    </Sider>
  );
};

export default DashboardSidebar;

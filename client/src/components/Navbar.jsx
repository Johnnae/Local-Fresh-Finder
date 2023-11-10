import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <Menu mode="horizontal" theme="dark">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link to="/profile">Farmer Login</Link>
        </Menu.Item>
        {/* if user is logged in show saved profile and logout */}
        {Auth.loggedIn() ? (
          <>
            <Menu.Item key="saved" icon={<UserOutlined />}>
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<UserOutlined />} onClick={Auth.logout}>
              Logout
            </Menu.Item>
          </>
        ) : (
          <Menu.Item key="login" icon={<UserOutlined />} onClick={() => setShowModal(true)}>
            Login/Sign Up
          </Menu.Item>
        )}
        {/* set modal data up */} 
        
      </Menu>
    </>
  );
};

export default AppNavbar;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Modal, Tabs } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: 'Login',
      children: <LoginForm handleOk={handleOk} handleCancel={handleCancel} />,
    },
    {
      key: '2',
      label: 'Sign Up',
      children: <SignUpForm handleOk={handleOk} handleCancel={handleCancel} />,
    },
  ];

  return (
    <>
      <Menu mode="horizontal" theme="dark">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        {/* if user is logged in show saved profile and logout */}
        {Auth.loggedIn() ? (
          <>
            <Menu.Item key="saved" icon={<UserOutlined />}>
              <Link to="/profile">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<UserOutlined />} onClick={Auth.logout}>
              Logout
            </Menu.Item>
          </>
        ) : (
          <Menu.Item key="login" icon={<UserOutlined />} onClick={() => showModal(true)}>
            Farmer Login/Sign Up
          </Menu.Item>
        )}
      </Menu>
        {/* set modal data up */} 
        <Modal
          size="lg"
          show={showModal}
          title="Login or Sign Up"
          aria-labelledby="signup-modal"
          open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
        >
          {/* tab container to do either signup or login component */}
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

        </Modal>

    </>
  );
};

export default AppNavbar;

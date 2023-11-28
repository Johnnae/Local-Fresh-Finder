// see SignupForm.js for comments
import { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';

import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });

  const [validated] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [form] = Form.useForm();


  const handleCancel = () => {
    setIsModalVisible(false);
  };



  const [login, { error }] = useMutation(LOGIN_USER);

  const onFinish = async (values) => {
    console.log('Received values:', values);
    await handleFormSubmit(values);
    setIsModalVisible(false);
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (values) => {

    try {
      const response = await login({
          variables: { 
            email: values.email, 
            password: values.password
           }
        });

        console.log(response);

        const { token, farmer } = response.data.login;

        Auth.login(token);
        
      } catch (err) {
        console.log(err);
        console.error(err);
        setShowAlert(true);
      }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  return (
    <>
      <Form 
        {...formItemLayout}
        name = "login" 
        onFinish={onFinish} 
        initialValues={{ remember: true }}>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="login-form-button" >
            Log in
          </Button>
        </Form.Item>
      </Form >
    </>
  );
}  


export default LoginForm;

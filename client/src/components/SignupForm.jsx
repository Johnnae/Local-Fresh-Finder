import { useState } from 'react';
import { AutoComplete, Button, Form, Input, Select, notification } from 'antd';

import Auth from '../utils/auth';

import { useMutation } from '@apollo/client';
import { ADD_FARMER } from '../utils/mutations';


const SignupForm = () => {

  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);


  const [addFarmer, { data }] = useMutation(ADD_FARMER);

  const [error, setError] = useState('');

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    await handleFormSubmit(values);
    setIsModalVisible(false);
  }
  const handleFormSubmit = async (values) => {
    try {
      const {data} = await addFarmer({
        variables: { 
          bio: values.bio,
          companyName: values.companyName,
          email: values.email,
          password: values.password,
          phone: values.phone,
          website: values.website,
         },
      });
      // Assuming your server returns some data after a successful user creation
      if (data.addFarmer) {
        notification.success({
          message: 'User Created',
          description: 'The user has been successfully created.',
        });
        const { token, user } = addFarmer.data.addFarmer;
        console.log(user);
        Auth.login(token);
        setIsModalVisible(false)
      }
      console.log(data);
        const { token, farmer } = data.addFarmer.farmer;
        console.log(farmer);
        Auth.login(token);
        setIsModalVisible(false)
      
    } catch {
      console.log(error);
      console.error(error);
      setShowAlert(true);
    }
    setIsModalVisible({
      email: '',
      password: '',
      companyName: '',
      phone: '',
      website: '',
      bio: '',
    })
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

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
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="companyName"
          label="Company name"
          tooltip="What is your farm or company name? Customers will find you buy this name"
          rules={[
            {
              required: true,
              message: 'Please input your farm or company name!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please input your company phone number!',
            },
          ]}
        >
          <Input
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          name="website"
          label="Website"
          rules={[
            {
              required: false,
              message: 'Please input website!',
            },
          ]}
        >
          <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
            <Input />
          </AutoComplete>
        </Form.Item>

        <Form.Item
          name="Bio"
          label="Bio"
          rules={[
            {
              required: false,
              message: 'Please input Intro',
            },
          ]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Register
          </Button>
        </Form.Item>
      </Form>
      </>
  );
};

export default SignupForm;

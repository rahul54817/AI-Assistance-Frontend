import { Form, Input, Button, Card, Typography, message, } from 'antd';
import {LockOutlined, MailOutlined } from '@ant-design/icons';
import '../Css/registerPage.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const LoginPage = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: { email: string, password: string }) => {
    setLoginLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        email: values.email,
        password: values.password
      });
      message.success(response.data.message || 'Login successful!');
      navigate('/');
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Login failed!');
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <Title level={2} className="register-title">Login</Title>
        <Form name="login" onFinish={handleLogin} scrollToFirstError>
              <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please input your Email!' }]}>
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>

              <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={loginLoading}>
                  Login
                </Button>
              </Form.Item>
            </Form>
      </Card>
    </div>
  );
};

export default LoginPage;

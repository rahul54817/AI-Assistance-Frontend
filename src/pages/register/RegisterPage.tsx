import { Form, Input, Button, Checkbox, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import '../../Css/registerPage.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values : {
    username : string,
    email : string,
    password : string
    confirmPassword : string
  }) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/user/register', {
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword : values.confirmPassword
      });
      message.success(response.data.message || 'Registration successful!');
      navigate('/')
      
    } catch (error : any) {
      message.error(error.response?.data?.message || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <Title level={2} className="register-title">Register</Title>
        <Form name="register" initialValues={{ remember: true }} onFinish={onFinish} scrollToFirstError>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}>
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item name="confirmPassword" dependencies={['password']} rules={[{ required: true, message: 'Please confirm your Password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item name="agreement" valuePropName="checked" rules={[{
            validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          }]}> 
            <Checkbox>I have read the <a href="/">agreement</a></Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;

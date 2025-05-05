import React, { useState } from 'react';
import { Button, Form, Input, Typography, Card, Layout } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const { Title } = Typography;
const { Content } = Layout;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post('/auth/login', values);
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful!');
      form.resetFields();
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Card style={{ width: 350, borderRadius: 16, boxShadow: '0 6px 32px 0 rgba(22,119,255,0.15)' }}>
          <Title level={3} style={{ textAlign: 'center', color: '#1677ff' }}>Login</Title>
          <Form form={form} name="login" initialValues={{ remember: true }} onFinish={onFinish} layout="vertical">
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}> 
  <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
</Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}> 
  <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
</Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large" loading={loading}>Login</Button>
            </Form.Item>
          </Form>
          <div style={{ textAlign: 'center' }}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </Card>
        </motion.div>
      </Content>
    </Layout>
  );
};

export default LoginPage;

import React from 'react';
import { motion } from 'framer-motion';
import { Button, Typography, Layout, Row, Col, Card } from 'antd';
import { Link } from 'react-router-dom';
import { BookOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const LandingPage = () => (
  <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
    <Header style={{ background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px #f0f1f2' }}>
      <Title level={2} style={{ margin: 0, color: '#1677ff' }}><BookOutlined /> Library System</Title>
      <div>
        <Link to="/login"><Button icon={<LoginOutlined />} type="primary" style={{ marginRight: 10 }}>Login</Button></Link>
        <Link to="/signup"><Button icon={<UserAddOutlined />} type="default">Sign Up</Button></Link>
      </div>
    </Header>
    <Content style={{ padding: '60px 20px 0 20px', flex: 1 }}>
      <Row justify="center" align="middle" style={{ minHeight: '60vh' }}>
        <Col xs={24} sm={20} md={12} lg={10}>
          <Card style={{ borderRadius: 16, boxShadow: '0 6px 32px 0 rgba(22,119,255,0.15)' }}>
            <Title level={2} style={{ color: '#1677ff' }}>Welcome to the Library Management System</Title>
            <Paragraph style={{ fontSize: 18, margin: '20px 0' }}>
              Manage your books, track your reading, and explore new titles. Sign up or log in to get started!
            </Paragraph>
            <Row gutter={16} justify="center">
              <Col><Link to="/login"><Button icon={<LoginOutlined />} size="large" type="primary">Login</Button></Link></Col>
              <Col><Link to="/signup"><Button icon={<UserAddOutlined />} size="large">Sign Up</Button></Link></Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Content>
    <Footer style={{ textAlign: 'center', background: 'transparent', color: '#888' }}>
      &copy; {new Date().getFullYear()} Library Management System
    </Footer>
  </Layout>
);

export default LandingPage;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Typography, Button, Row, Col, Card, Statistic, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BookOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import DashboardSidebar from '../components/DashboardSidebar';
import BooksYearChart from '../components/BooksYearChart';
import axiosInstance from '../utils/axiosInstance';

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Logged out');
    navigate('/login');
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/books');
        setBooks(res.data);
      } catch {
        toast.error('Failed to fetch books');
      }
      setLoading(false);
    };
    fetchBooks();
  }, []);

  // Prepare data for chart: count per publishedYear
  const booksByYear = books.reduce((acc, book) => {
    const year = book.publishedYear ? String(book.publishedYear) : 'Unknown';
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.entries(booksByYear).map(([year, count]) => ({ year, count })).sort((a, b) => a.year.localeCompare(b.year));

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <DashboardSidebar onLogout={handleLogout} />
      <Layout>
        <Header style={{ background: 'white', boxShadow: '0 2px 8px #f0f1f2', marginLeft: 0 }}>
          <Title level={2} style={{ margin: 0, color: '#1677ff' }}><BookOutlined /> Dashboard</Title>
        </Header>
        <Content style={{ padding: '40px 24px 0 24px', flex: 1 }}>
          {loading ? (
            <Spin size="large" style={{ display: 'block', margin: '80px auto' }} />
          ) : (
            <>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} md={8}>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}>
                    <Card style={{ borderRadius: 16, textAlign: 'center', background: 'linear-gradient(135deg, #1677ff 0%, #e0eafc 100%)', color: '#fff', boxShadow: '0 6px 32px 0 rgba(22,119,255,0.12)' }}>
                      <Statistic
                        title={<span style={{ color: '#fff', fontWeight: 500 }}>Books Registered</span>}
                        value={books.length}
                        valueStyle={{ color: '#fff', fontSize: 38 }}
                        prefix={<BookOutlined />}
                      />
                    </Card>
                  </motion.div>
                </Col>
                <Col xs={24} md={16}>
                  <BooksYearChart data={chartData} />
                </Col>
              </Row>
            </>
          )}
        </Content>
        <Footer style={{ textAlign: 'center', background: 'transparent', color: '#888' }}>
          &copy; {new Date().getFullYear()} Library Management System
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { Layout, Typography, Button, Table, Modal, Form, Input, Space, Popconfirm, Card, Row, Col } from 'antd';
import DashboardSidebar from '../components/DashboardSidebar';
import { InputNumber } from 'antd';
import { LeftOutlined, RightOutlined, SaveOutlined } from '@ant-design/icons';
import { BookOutlined, PlusOutlined, LogoutOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axiosInstance from '../utils/axiosInstance';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/books');
      setBooks(res.data);
    } catch (err) {
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.info('Logged out');
    navigate('/login');
  };

  const showModal = (book = null) => {
    setEditingBook(book);
    setModalVisible(true);
    if (book) {
      form.setFieldsValue(book);
    } else {
      form.resetFields();
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingBook) {
        await axiosInstance.put(`/books/${editingBook.id}`, values);
        toast.success('Book updated!');
      } else {
        await axiosInstance.post('/books', values);
        toast.success('Book added!');
      }
      setModalVisible(false);
      fetchBooks();
    } catch (err) {
      toast.error('Failed to save book');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/books/${id}`);
      toast.success('Book deleted!');
      fetchBooks();
    } catch (err) {
      toast.error('Failed to delete book');
    }
  };

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [pageSizeInput, setPageSizeInput] = useState(6);

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Year', dataIndex: 'publishedYear', key: 'publishedYear' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Popconfirm title="Delete this book?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <DashboardSidebar onLogout={handleLogout} />
      <Layout>
        <Header style={{ background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px #f0f1f2' }}>
          <Title level={2} style={{ margin: 0, color: '#1677ff' }}><BookOutlined /> My Books</Title>
          <Button icon={<LogoutOutlined />} type="primary" danger onClick={handleLogout}>Logout</Button>
        </Header>
        <Content style={{ padding: '40px 20px 0 20px', flex: 1 }}>
          <Row justify="center" align="middle">
            <Col xs={24} sm={22} md={20} lg={16}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Card style={{ borderRadius: 16, boxShadow: '0 6px 32px 0 rgba(22,119,255,0.15)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <Title level={3} style={{ color: '#1677ff', margin: 0 }}>Books</Title>
                    <Button icon={<PlusOutlined />} type="primary" onClick={() => showModal()}>Add Book</Button>
                  </div>
                  <Table
                    columns={columns}
                    dataSource={books.slice((current-1)*pageSize, current*pageSize)}
                    loading={loading}
                    rowKey="id"
                    pagination={false}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: 16, gap: 16 }}>
                    <span>Rows per page:</span>
                    <InputNumber
                      min={1}
                      max={books.length || 100}
                      value={pageSizeInput}
                      onChange={value => setPageSizeInput(value || 1)}
                      style={{ width: 80 }}
                    />
                    <Button
                      icon={<SaveOutlined />}
                      size="small"
                      type="primary"
                      style={{ padding: '0 8px' }}
                      onClick={() => {
                        setPageSize(pageSizeInput);
                        setCurrent(1);
                      }}
                    >Save</Button>
                    <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Button
                        icon={<LeftOutlined />}
                        size="small"
                        disabled={current === 1}
                        onClick={() => setCurrent(current - 1)}
                      />
                      <span>
                        Page {current} / {Math.ceil(books.length / pageSize) || 1}
                      </span>
                      <Button
                        icon={<RightOutlined />}
                        size="small"
                        disabled={current === Math.ceil(books.length / pageSize) || 1}
                        onClick={() => setCurrent(current + 1)}
                      />
                    </span>
                  </div>
                </Card>
              </motion.div>

            </Col>
          </Row>
          <Modal
          title={editingBook ? 'Edit Book' : 'Add Book'}
          open={modalVisible}
          onOk={handleModalOk}
          onCancel={() => setModalVisible(false)}
          okText={editingBook ? 'Update' : 'Create'}
        >
          <Form form={form} layout="vertical">
  <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}> 
    <Input />
  </Form.Item>
  <Form.Item name="author" label="Author" rules={[{ required: true, message: 'Please input the author!' }]}> 
    <Input />
  </Form.Item>
  <Form.Item name="description" label="Description"> 
    <Input.TextArea rows={2} />
  </Form.Item>
  <Form.Item name="publishedYear" label="Published Year" rules={[{ required: true, message: 'Please input the year!' }, { pattern: /^\d{4}$/, message: 'Enter a valid year (e.g., 2024)' }]}> 
    <Input />
  </Form.Item>
</Form>
        </Modal>
      </Content>
      <Footer style={{ textAlign: 'center', background: 'transparent', color: '#888' }}>
        &copy; {new Date().getFullYear()} Library Management System
      </Footer>
        </Layout>
      </Layout>
  );
};

export default BooksPage;

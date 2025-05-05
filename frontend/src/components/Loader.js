import React from 'react';
import { motion } from 'framer-motion';
import { Spin } from 'antd';

const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
    <Spin size="large" tip="Loading..." />
  </div>
);

export default Loader;

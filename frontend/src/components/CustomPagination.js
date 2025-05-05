import React from 'react';
import { Pagination, Select, Row, Col } from 'antd';

const CustomPagination = ({ current, pageSize, total, onChange, onPageSizeChange }) => {
  return (
    <Row justify="space-between" align="middle" style={{ margin: '16px 0' }}>
      <Col>
        <Select
          value={pageSize}
          onChange={onPageSizeChange}
          style={{ width: 120 }}
          options={[
            { value: 5, label: '5 / page' },
            { value: 10, label: '10 / page' },
            { value: 20, label: '20 / page' },
            { value: 50, label: '50 / page' },
          ]}
        />
      </Col>
      <Col>
        <Pagination
          current={current}
          pageSize={pageSize}
          total={total}
          showSizeChanger={false}
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

export default CustomPagination;

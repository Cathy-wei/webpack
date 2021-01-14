import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert, Typography, Col, Row } from 'antd';
import { useIntl, FormattedMessage } from 'umi';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => {
  return (
    <PageContainer>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={6}>
            <Card title="总销售额" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={6}>
            <Card title="订单数量" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={6}>
            <Card title="用户总数" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={6}>
            <Card title="未发货订单数" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>,
    </PageContainer>
  );
};

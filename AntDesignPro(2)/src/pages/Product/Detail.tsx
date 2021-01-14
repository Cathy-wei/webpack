import React, { useState, useEffect } from 'react';
import { Layout, Card, Col, Row, Button, Divider } from 'antd';
import { query as queryProducts } from '@/services/products';

const { Header, Footer, Sider, Content } = Layout;
import { useIntl, FormattedMessage } from 'umi';
import { queryID } from '@/services/products';
import { Table, Tag, Space } from 'antd';


export default () => {


  const [ID, setID] = useState(window.location.href?.substring(window.location.href?.lastIndexOf("/") + 1));
  const [res, setRes] = useState({});
  useEffect(async () => {
    // 更新文档的标题
    const res = await queryID(window.location.href?.substring(window.location.href?.lastIndexOf("/") + 1))
    setRes(res)
    console.log(res);

  }, [ID]);


  // 商品详情
  const dataSource0 = [
    {
      key: '1',
      ID: res?.ID,
      title: res?.title,
      max_price: '$ ' + res?.max_price,
      min_price: '$ ' + res?.min_price,
      max_discount: res?.max_discount + '折',
      sale_price: '$ ' + res?.sale_price
    },
  ];
  const columns0 = [
    {
      title: '商品编号',
      dataIndex: 'ID',
      key: 'order_item_id',
      align: 'center'
    },
    {
      title: '商品标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center'
    },
    {
      title: '最高价格',
      dataIndex: 'max_price',
      key: 'max_price',
      align: 'center'
    },
    {
      title: '最低价格',
      dataIndex: 'min_price',
      key: 'min_price',
      align: 'center'
    },
    {
      title: '最大折扣',
      dataIndex: 'max_discount',
      key: 'max_discount',
      align: 'center'
    },
    {
      title: '售价',
      dataIndex: 'sale_price',
      key: 'sale_price',
      align: 'center'
    },
  ];

  // 商品发布信息
  const dataSource1 = [
    {
      key: '1',
      post_author: res.post_author,
      post_name: res?.post_name,
      post_title: res.post_title,
      post_date: res.post_date,
      post_date_gmt: res.post_date_gmt,
      post_modified: res.post_modified,
      post_status: res.post_status,
    },
  ];
  const columns1 = [
    {
      title: '发布者',
      dataIndex: 'post_author',
      key: 'post_author',
      align: 'center'
    },
    {
      title: '发布名称',
      dataIndex: 'post_name',
      key: 'post_name',
      align: 'center'
    },
    {
      title: '发布标题',
      dataIndex: 'post_title',
      key: 'post_title',
      align: 'center'
    },
    {
      title: '发布日期',
      dataIndex: 'post_date',
      key: 'post_date',
      align: 'center'
    },
    {
      title: '发布日期时区',
      dataIndex: 'post_date_gmt',
      key: 'post_date_gmt',
      align: 'center'
    },
    {
      title: '修改时间',
      dataIndex: 'post_modified',
      key: 'post_modified',
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'post_status',
      key: 'post_status',
      align: 'center'
    },
  ];

  // 账单地址
  const dataSource2 = [
    {
      key: '1',
      first_name: res?.billing_address?.first_name,
      last_name: res?.billing_address?.last_name,
      address_1: res?.billing_address?.address_1,
      postcode: res?.billing_address?.postcode,
      city: res?.billing_address?.city,
      email: res?.billing_address?.email,
      phone: res?.billing_address?.phone,
      address_index: res?.billing_address?.address_index
    }
  ];
  const columns2 = [
    {
      title: '名字',
      dataIndex: 'first_name',
      key: 'first_name',
      align: 'center'
    },
    {
      title: '姓氏',
      dataIndex: 'last_name',
      key: 'last_name',
      align: 'center'
    },
    {
      title: '地址',
      dataIndex: 'address_1',
      key: 'address_1',
      align: 'center'
    },
    {
      title: '邮编',
      dataIndex: 'postcode',
      key: 'postcode',
      align: 'center'
    },
    {
      title: '城市编码',
      dataIndex: 'city',
      key: 'city',
      align: 'center'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      align: 'center'
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center'
    },
    {
      title: '详细地址',
      dataIndex: 'address_index',
      key: 'address_index',
      align: 'center'
    },
  ];

  return (
    <Layout >
      <Row gutter={[16, 48]}>
        <Col span={24} style={{ margin: '10px' }}>
          <span>
            商品编号:
            </span>
          <span>
            {res.ID}
          </span>
        </Col>
        <Col span={24} style={{ margin: '10px' }}>
          <Card title="商品详情" bordered={false}>
            <Table pagination={false} dataSource={dataSource0} columns={columns0} />
          </Card>
          <Card title="商品发布信息" bordered={true}>
            <Table pagination={false} dataSource={dataSource1} columns={columns1} />
          </Card>
        </Col>
      </Row>
      <Row type="flex" justify="center" align="middle" style={{ marginTop: '10px' }}>
        <Button type="primary" >发货</Button>
      </Row>
    </Layout>
  );
}

import React, { useState, useEffect } from 'react';
import { Layout, Card, Col, Row,  Button, Divider} from 'antd';
import { query as queryCustomers } from '@/services/customer';

const { Header, Footer, Sider, Content } = Layout;
import { useIntl, FormattedMessage } from 'umi';
import { queryID } from '@/services/customer';
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


  // 顾客信息
  const dataSource0 = [
    {
      key: '1',
      ID:res?.ID,
      user_nicename:res?.user_nicename,
      user_email:res?.user_email,
      user_registered:res?.user_registered,
      country:res?.country,
      first_name:res?.first_name,
      last_name:res?.last_name,
      phone:res?.phone
    },
  ];
  const columns0 = [
    {
      title: '顾客编号',
      dataIndex: 'ID',
      key: 'ID',
      align: 'center'
    },
    {
      title: '用户昵称',
      dataIndex: 'user_nicename',
      key: 'user_nicename',
      align: 'center'
    },
    {
      title: '姓氏',
      dataIndex: 'first_name',
      key: 'first_name',
      align: 'center'
    },
    {
      title: '名称',
      dataIndex: 'last_name',
      key: 'last_name',
      align: 'center'
    },
    {
      title: '用户邮箱',
      dataIndex: 'user_email',
      key: 'user_email',
      align: 'center'
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center'
    },
    {
      title: '注册时间',
      dataIndex: 'user_registered',
      key: 'user_registered',
      align: 'center'
    },
    {
      title: '国家',
      dataIndex: 'country',
      key: 'country',
      align: 'center'
    },
  ];

  // 账单地址
  const dataSource1 = [
    {
      key: '1',
      address_1: res?.billing_address?.address_1,
      city: res?.billing_address?.city,
      country:res?.billing_address?.country,
      first_name:res?.billing_address?.first_name,
      last_name:res?.billing_address?.last_name,
      phone:res?.billing_address?.phone,
      postcode:res?.billing_address?.postcode,
      state:res?.billing_address?.state,
      state_name:res?.billing_address?.state_name
    },
  ];
  const columns1 = [
    {
      title: '账单地址',
      dataIndex: 'address_1',
      key: 'address_1',
      align: 'center'
    },
    {
      title: '城市',
      dataIndex: 'city',
      key: 'name',
      align: 'center'
    },
    {
      title: '国家',
      dataIndex: 'country',
      key: 'country',
      align: 'center'
    },
    {
      title: '姓氏',
      dataIndex: 'first_name',
      key: 'first_name',
      align: 'center'
    },
    {
      title: '名字',
      dataIndex: 'last_name',
      key: 'last_name',
      align: 'center'
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center'
    },
    {
      title: '邮编',
      dataIndex: 'postcode',
      key: 'postcode',
      align: 'center'
    },
    {
      title: '省份',
      dataIndex: 'state',
      key: 'state',
      align: 'center'
    },
    {
      title: '省份名称',
      dataIndex: 'state_name',
      key: 'state_name',
      align: 'center'
    },
  ];

  // 收获地址
  const dataSource2 = [
    {
      key: '1',
      address_1: res?.shipping_address?.first_name,
      last_name: res?.shipping_address?.last_name,
      address_1: res?.shipping_address?.address_1,
      postcode: res?.shipping_address?.postcode,
      city: res?.shipping_address?.city,
      phone: res?.shipping_address?.phone,
      }
  ];
  const columns2 = [
    {
      title: '收获地址',
      dataIndex: 'address_1',
      key: 'address_1',
      align: 'center'
    },
    {
      title: '姓氏',
      dataIndex: 'last_name',
      key: 'last_name',
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
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center'
    },
  ];

  // 账单地址
  const dataSource3 = [
    {
      key: '1',

    }
  ];
  const columns3 = [
    {
      title: '名字',
      dataIndex: 'first_name',
      key: 'first_name',
      align: 'center'
    },
  ];


  return (
    <Layout>
      <Layout >
            <Row >
              <Col span={18} style={{ margin: '10px' }}>
                <span>
                  用户编号:
                </span>
                <span>
                  {res.ID}
                </span>
              </Col>
              <Col span={18} style={{ margin: '10px' }}>
                <Card title="顾客信息" bordered={false}>
                  <Table pagination={false} dataSource={dataSource0} columns={columns0} />
                </Card>
                <Card title="收货地址" bordered={true}>
                  <Table pagination={false} dataSource={dataSource1} columns={columns1} />
                </Card>
                <Card title="账单地址" bordered={false}>
                  <Table pagination={false} dataSource={dataSource2} columns={columns2} />
                </Card>
              </Col>
              <Col style={{ margin: '10px' }} span={5}>
            <Card title="顾客订单地址" bordered={false}>
              <div>
                <span style={{fontSize:'15px',fontWeight:'bold',color:'#3051AE'}}>顾客编号:</span>
                <span style={{fontSize:'14px'}}>{res.ID}</span>
              </div>
              <div>
              <span style={{fontSize:'15px',fontWeight:'bold',color:'#3051AE'}}>订单金额:</span>
              <span style={{fontSize:'14px'}}>{'$' + res.order_total}</span>
              </div>
              <div>
              <span style={{fontSize:'15px',fontWeight:'bold',color:'#3051AE'}}>订单数量:</span>
              <span style={{fontSize:'14px'}}>{res.order_count}</span>
              </div>
              <Divider />
              <div>
                <span style={{fontSize:'15px',fontWeight:'bold',color:'#3051AE'}}>用户昵称:</span>
                <span style={{fontSize:'14px'}}>{res.user_nicename}</span>
              </div>
              <div>
                <span style={{fontSize:'15px',fontWeight:'bold',color:'#3051AE'}}>用户地址:</span>
                <span style={{fontSize:'14px'}}>{res?.billing_address?.address_1}</span>
              </div>
              <div>
                <span style={{fontSize:'15px',fontWeight:'bold',color:'#3051AE'}}>用户电话:</span>
                <span style={{fontSize:'14px'}}>{res?.billing_address?.phone}</span>
              </div>
              <div>
                <span style={{fontSize:'15px',fontWeight:'bold',color:'#3051AE'}}>用户邮箱:</span>
                <span style={{fontSize:'14px'}}>{res.user_email}</span>
              </div>            
            </Card>
          </Col>
            </Row>
            <Row type="flex" justify="center" align="middle" style={{marginTop:'10px'}}>
              <Button type="primary" >修改</Button>
            </Row>
      </Layout>
    </Layout>
  );
}

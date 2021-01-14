import { Row, Col, Statistic, Tooltip,Typography, Divider, Card ,Progress,Layout  } from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';
import React from 'react';
import {
    
    Tooltip as Tt
  } from 'bizcharts';

 
const UndeliveredOrders=()=>{
    const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 155 },
        { genre: 'Action', sold: 230 },
        { genre: 'Shooter', sold: 250 },
        { genre: 'Other', sold: 450 },
        { genre: 'qa', sold: 23 },
        { genre: 'wqqa', sold: 245 },
        { genre: 'dfdgg', sold: 222 } 
      ];
       
return(
 
    <div style={{ width:'100%'}} >
    <Row>
      <Col span={20}>
        <Typography.Text  type="secondary">未发货订单数</Typography.Text>
      </Col>
      <Col span={4}>
        <Tooltip title="未发货订单数" ><InfoCircleOutlined /></Tooltip>
      </Col>
    </Row>
    <Row style={{  }}>
      <Col><Statistic  value={96} /></Col>
    </Row>
    <Row style={{ width: "100%", height: 50 }} align="bottom">
       <Progress percent={70} status="active" showInfo={false} strokeLinecap="square" />
    </Row>
    <Divider type="horizontal" style={{margin:'10px 0'}} ></Divider>
    <Row>
      <Col>
      <Typography.Text  type="secondary">发货完成率</Typography.Text> 
      </Col>
      <Col offset={3}>
      <Typography.Text  type="secondary">78%</Typography.Text> 
      </Col>
    </Row>
    
  </div>
      
 
)}
export default UndeliveredOrders
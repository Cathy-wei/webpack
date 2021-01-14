import { Row, Col, Statistic, Tooltip,Typography, Divider, Card  } from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';
import React from 'react';
import {
  Chart,
  Interval,
  Tooltip as Tt
} from 'bizcharts';
 
const UsersNum=({visits})=>{
   const d=[]
   const c=()=>{
     let v=0
    visits.map(item => {
      v += item.value
      d.push(item.value)
    })
    return v
   }
  // console.log("123",c(),d)
  // const data=d
   const data=[
        { datatime: 'Sports', value: 275 },
        { datatime: 'Strategy', value: 155 },
        { datatime: 'Action', value: 230 },
        { datatime: 'Shooter', value: 250 },
        { datatime: 'Other', value: 450 },
        { datatime: 'qa', value: 23 },
        { datatime: 'wqqa', value: 245 },
        { datatime: 'dfdgg', value: 222 } 
      ];
       
return(
 
    <div style={{ width:'100%'}} >
    <Row>
      <Col span={20}>
        <Typography.Text  type="secondary">用户数量</Typography.Text>
      </Col>
      <Col span={4}>
        <Tooltip title="用户数量" ><InfoCircleOutlined /></Tooltip>
      </Col>
    </Row>
    <Row style={{  }}>
      <Col><Statistic  value={6560} /></Col>
    </Row>
    <Row style={{ width: "100%", height: 50 }} >
        <Chart data={data} autoFit pure >
            <Tt/>
            <Interval position="datatime*value" />
        </Chart> 
    </Row>
    <Divider type="horizontal" style={{margin:'10px 0'}} ></Divider>
    <Row>
      <Col>
      <Typography.Text  type="secondary">日均访问数</Typography.Text> 
      </Col>
      <Col offset={3}>
      <Typography.Text  type="secondary">{Math.floor(c()/visits.length)}</Typography.Text> 
      </Col>
    </Row>
    
  </div>
      
 
)}
export default UsersNum
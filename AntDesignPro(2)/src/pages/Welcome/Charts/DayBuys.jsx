import React from 'react'
import ProCard from '@ant-design/pro-card'; 
import { Statistic, Card, Row, Col,Tooltip,Typography, Divider } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, CarTwoTone } from '@ant-design/icons';
import {InfoCircleOutlined} from '@ant-design/icons';
 
const DayBuys=({sales})=>{ 
  const c = sales?.reduce((num,item)=>num+item.value,0)
 
  // console.log('a',sales,c);  

    return (  
             
          <div style={{ width:'100%'}}>
            <Row>
              <Col span={20}>
                <Typography.Text  type="secondary">商品总额</Typography.Text>
              </Col>
              <Col span={4}>
                <Tooltip title="商品总销售额" ><InfoCircleOutlined /></Tooltip>
              </Col>
            </Row>
            <Row>
              <Col><Statistic  value={122893} /></Col>
            </Row>
            <Row justify="space-between" gutter={18}>
              <Col > 
                <Statistic
                  title="周同比"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: '#3f8600',fontSize:'15px' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Col> 
              <Col >
                <Statistic
                  title="日同比"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: '#cf1322',fontSize:'15px'  }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                /> 
              </Col>
            </Row>
            <Divider type="horizontal" style={{margin:'10px 0'}} ></Divider>
            <Row>
              <Col>
              <Typography.Text  type="secondary">日均销售额</Typography.Text> 
              </Col>
              <Col offset={3}>
              <Typography.Text  type="secondary">{(c/sales.length).toFixed(2)}</Typography.Text> 
              </Col>
            </Row>
            
          </div>
        
    )
}
export default DayBuys
 
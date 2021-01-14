import React,{useState,useEffect} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Col,Row } from 'antd'; 
import styles from './Welcome.less'; 
import ProCard  from '@ant-design/pro-card'; 
import DayBuys from '@/pages/Welcome/Charts/DayBuys';
import OrdersNum from '@/pages/Welcome/Charts/OrdersNum';
import UsersNum from '@/pages/Welcome/Charts/UsersNum';
import UndeliveredOrders from '@/pages/Welcome/Charts/UndeliveredOders';
import UpOrder from '@/pages/Welcome/Charts/UpOder';
import UpUser from '@/pages/Welcome/Charts/UpUser';
import UpBuys from '@/pages/Welcome/Charts/UpBuys';
import { connect } from 'umi'
 

const Welcome=({dispatch,orders,visits,sales}) => {
  const [ range, setRange ] = useState({ 'filter[start]': '2020-09-07 00:00', 'filter[end]': '2020-09-17 00:00' })
  useEffect( async()=>{
    await dispatch({
      type:'report/fetchReports',
      payload:range
    })
  }
  )
 
  return (
    <PageContainer>  
        <ProCard direction="row" gutter={[18,18]} ghost> 
           
          <ProCard colSpan={6} layout="center" bordered bodyStyle={{ padding: 10 }}  >
           <DayBuys sales={sales} />
          </ProCard>
          <ProCard colSpan={6} layout="center" bordered bodyStyle={{ padding: 10 }} >
            <OrdersNum orders={orders} />
          </ProCard>
          <ProCard colSpan={6}  Layout="center" bordered>
            <UsersNum visits={visits} />
          </ProCard>
          <ProCard colSpan={6}   layout="center" bordered>
            <UndeliveredOrders/>
          </ProCard>
        </ProCard>
        <Row gutter={[0,18]}>
           <Col span={24}><UpOrder/>
           </Col> 
        </Row>
      <Row gutter={[18,0]}>
        <Col span={12}>
          <UpUser/>
        </Col>
        <Col span={12}>
           <UpBuys/>
        </Col>
      </Row>
    </PageContainer>
  );
};

const mapStateProps = ({
  report:{
    orders, 
    sales, 
    visits
  }
}) => {
  return { orders, sales, visits};
};
export default connect(mapStateProps)(Welcome);

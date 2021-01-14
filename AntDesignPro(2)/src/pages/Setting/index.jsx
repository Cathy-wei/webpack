import React,{useState} from "react"
 
import { Menu,Form,Input,Button,Card,Row,Col,Divider} from 'antd';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout'; 
import PasswordSetting from "./components/PasswordSetting";
import WuLiu from "./components/WuLiu";
import PayPal from "./components/PayPal";
const Accountsetting = () => { 
  const [selectedKey, setselectedKey] = useState('1');
  // console.log(selectedKey);
  return (
    <PageContainer>
      <Card style={{height:'500px'}}> 
          <Row>
            <Col span={6}> 
              <Menu
                
                defaultSelectedKeys={['1']} 
                mode='inline'
                theme='light'
                onClick={(e)=>setselectedKey(e.key)}
              >
                <Menu.Item key="1" >
                  安全设置
                </Menu.Item>
                <Menu.Item key="2" >
                  物流设置
                </Menu.Item>
                <Menu.Item key="3" >
                  支付配置
                </Menu.Item>
              </Menu> 
            </Col>
            <Col span={18}> 
              {selectedKey==='1'&&
                <PasswordSetting/>}
              {selectedKey==='2' &&
                <WuLiu/>} 
              {selectedKey==='3'&&
                <PayPal/>}
            </Col>
            
          </Row>
          

     
      </Card>
     
      
    </PageContainer>
  );
};

export default Accountsetting
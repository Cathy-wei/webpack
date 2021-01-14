import { Chart, Line } from 'bizcharts';
import { Typography, Col,Row,Button,Tabs,Card } from 'antd';
import React from "react"
const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 45 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
]; 


const UpUser=()=> {

  return (
    
<Card>
<Tabs>
        <Tabs.TabPane tab="用户日增长" key="1">
            <Chart height={300} autoFit data={data} >
                <Line shape="smooth" position="year*sales"  />
            </Chart> 
        </Tabs.TabPane>
         
      </Tabs>
</Card>
    
  )
}
export default UpUser
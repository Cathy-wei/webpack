
import React from 'react'
import {Form,Divider,Input,Button} from "antd"  
import {FormattedMessage} from 'umi'
import ProForm,{ ProFormText } from '@ant-design/pro-form';
const PasswordSetting =()=>{
    const layout = {
        labelCol: {  offset: 2,span:  4},
        wrapperCol: {  offset: 2,span: 12 },
      };
      const tailLayout = {
        wrapperCol: { offset: 18, span: 4},
      };
      const waitTime = (time = 100) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, time);
        });
    };
    return( 
        <ProForm
        
         onFinish={async () => {
          await waitTime(2000);
          message.success('提交成功');
        }}
        {...layout}
        submitter={{
          searchConfig: {
            submitText: '保存',
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            size: 'large',
            style:{width:'50%',marginLeft:'60px'}
          } 
        }}
        > 
          <Divider orientation="left">修改密码</Divider>
          <ProFormText.Password label="当前密码" placeholder="请输入当前密码" name="input-password1" />
          <ProFormText.Password label="新密码" placeholder="请输入当新密码" name="input-password2" />
          <ProFormText.Password label="确认新密码" placeholder="请输入确认新密码" name="input-password3" />
        </ProForm>
       
    )
}

export default PasswordSetting
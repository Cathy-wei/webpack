import React from 'react';
import ProCard from '@ant-design/pro-card';
import ProForm,{ ProFormText } from '@ant-design/pro-form';

const PayPal =()=>{
    return(
        <ProCard title="支付方式" subTitle="快速结账" split="vertical">
            <ProCard colSpan="50%">
                <ProForm 
                    submitter={{
                        searchConfig: {
                        submitText: '绑定',
                        },
                        render: (_, dom) => dom.pop(),
                        submitButtonProps: {
                        size: 'large',
                        style:{width:'50%',marginLeft:'60px'}
                        } 
                    }}
                >  
                    <ProFormText.Password label="当前密码" placeholder="请输入当前密码" name="input-password1" />
                    <ProFormText.Password label="新密码" placeholder="请输入当新密码" name="input-password2" />
                    <ProFormText.Password label="确认新密码" placeholder="请输入确认新密码" name="input-password3" />
                </ProForm>
            </ProCard>
            <ProCard colSpan="50%">
                <p>个人账号绑定指引</p>
                <a href="#">设置或关联已存在的paypal沙盒账户</a>
            </ProCard>
        </ProCard>
    )
}
export default PayPal
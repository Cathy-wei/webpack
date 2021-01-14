/** Title: 可编辑表格 */
import React, { useState } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import ProField from '@ant-design/pro-field';
import { ProFormRadio } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
import {Divider} from "antd"
const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};
const defaultData = [
    {
        id: 624748504,
        title: '普通快递', 
        price: '10.22',
        created_at: '2020-05-26T09:42:56Z',
    },
    {
        id: 624691229,
        title: '顺丰快递', 
        price: '233.33',
        created_at: '2020-05-26T08:19:22Z',
    },
];
export default () => {
    const [editableKeys, setEditableRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [position, setPosition] = useState('bottom');
    const [newRecord, setNewRecord] = useState({
        id: (Math.random() * 1000000).toFixed(0),
    });
    const columns = [
        {
            title: '方案名称',
            dataIndex: 'title',
            formItemProps: (form, { rowIndex }) => {
                return {
                    rules: rowIndex > 2 ? [{ required: true, message: '此项为必填项' }] : [],
                };
            },
            // 第二行不允许编辑
            editable: (text, record, index) => {
                return index !== 0;
            },
            width: '30%',
            // colSize:10
            // marginLeft:'60px'
        },
        {
            title: '运费',
            // key: 'state',
            dataIndex: 'price',
            width:'30%',
            valueType: 'money',
            // locale: 'en-Us'
            // valueEnum: {
            //     all: { text: '全部', status: 'Default' },
            //     open: {
            //         text: '未解决',
            //         status: 'Error',
            //     },
            //     closed: {
            //         text: '已解决',
            //         status: 'Success',
            //     },
            // },
        },
      
        {
            title: '操作',
            valueType: 'option',
            // width: 200,
            render: (text, record, _, action) => [
                <a key="editable" onClick={() => {
                    var _a;
                    (_a = action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
                }}>
          编辑
        </a>,
                <a key="delete" onClick={() => {
                    setDataSource(dataSource.filter((item) => item.id !== record.id));
                }}>
          删除
        </a>,
            ],
        },
    ];
    return (<>
          
        <Divider orientation="left">物流方案</Divider> 
        <EditableProTable rowKey="id" headerTitle=""
        maxLength={5} 
        tableStyle={
            {
                // marginLeft:'60px'
            }
        }
        recordCreatorProps={
            {
                position: 'end',
                // maxLength: '12',
                record: newRecord,
            }
            }
        columns={columns} 
        
        cardBordered={true}
        request={async () => ({
            data: defaultData,
            total: 3,
            success: true,
        })} 
        value={dataSource} 
        onChange={setDataSource} 
        editable={{
            editableKeys,
            onSave: async () => {
                await waitTime(2000);
                setNewRecord({
                    id: (Math.random() * 1000000).toFixed(0),
                });
            },
            onChange: setEditableRowKeys,
        }}/>
      
    </>);
};
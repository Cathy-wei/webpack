import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer,Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage,history } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm from './components/UpdateForm';
import { queryRule, updateRule, addRule, removeRule } from './service';
import { query as queryOrder } from '@/services/customer';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.x((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = () => {
  /**
   * 新建窗口的弹窗
   */
  const [createModalVisible, handleModalVisible] = useState(false);
  /**
   * 分布更新窗口的弹窗
   */

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  /**
   * 国际化配置
   */

  const intl = useIntl();
  const columns = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.updateForm.userID"
          defaultMessage="顾客编号"
        />
      ),
      dataIndex: 'ID',
      // tip: '订单编号',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              history.push(`/customer/allCustomer/${entity.ID}`);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.user_nicename" defaultMessage="用户昵称  " />,
      dataIndex: 'user_nicename',
    },
    {
      title: <FormattedMessage id="pages.searchTable.user_email" defaultMessage="用户邮箱" />,
      dataIndex: 'user_email',
    },
    {
      title: <FormattedMessage id="pages.searchTable.phone" defaultMessage="手机号" />,
      dataIndex: 'phone',
    },
    {
      title: <FormattedMessage id="pages.searchTable.country" defaultMessage="国家" />,
      dataIndex: 'country',
    },
    {
      title: <FormattedMessage id="pages.searchTable.subscribed" defaultMessage="订阅状态" />,
      dataIndex: 'subscribed',
      hideInForm: true,
      valueEnum: {
        "true": {
          text: (
            <Tag color="success" id="pages.searchTable.nameStatus.true">已订阅</Tag>
          ),
          status: 'true',
        },
        "false": {
          text: (
            <Tag color="error" id="pages.searchTable.nameStatus.true">未订阅</Tag>
            // <FormattedMessage id="pages.searchTable.nameStatus.false" defaultMessage="未订阅" />
          ),
          status: 'false',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.order_count" defaultMessage="订单数量" />,
      dataIndex: 'order_count',
    },
    {
      title: <FormattedMessage id="pages.searchTable.order_total" defaultMessage="订单总金额" />,
      dataIndex: 'order_total',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.searchTable.config" defaultMessage="配置" />
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: '查询表格',
        })}
        actionRef={actionRef}
        rowKey={v=>v.ID}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="新建" />
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          const res = await queryOrder({ ...params, sorter, filter })
          console.log(res);
          return { data: res.data, success: true, total: 100 }
        }
        }
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="已选择" />{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="服务调用次数总计"
                />{' '}
                {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)}{' '}
                <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage id="pages.searchTable.batchDeletion" defaultMessage="批量删除" />
          </Button>
          <Button type="primary">
            <FormattedMessage id="pages.searchTable.batchApproval" defaultMessage="批量审批" />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: '新建规则',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="规则名称为必填项"
                />
              ),
            },
          ]}
          width="m"
          name="name"
        />
        <ProFormTextArea width="m" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;

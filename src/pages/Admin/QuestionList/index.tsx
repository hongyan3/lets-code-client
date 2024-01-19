import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { addQuestionUsingPost, deleteQuestionByIdUsingDelete, getQuestionListUsingGet } from '@/services/Server/questionAdminController';
import CreateForm from './components/CreateForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.QuestionAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    const res = await addQuestionUsingPost({
      ...fields,
    });
    if (res.code != 0) {
      message.error(res.message);
    } else {
      message.success('添加成功')
    }
    hide();
    return true;
  } catch (error: any) {
    hide();
    message.error('添加失败 '+error.message);
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.QuestionVO[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    selectedRows.forEach(async (e) => {
      await deleteQuestionByIdUsingDelete({
        questionId: e.id as string
      });
    })
    hide();
    message.success('删除成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('删除失败 ',error.message);
    return false;
  }
};
const QuestionList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.QuestionVO>();
  const [selectedRowsState, setSelectedRows] = useState<API.QuestionVO[]>([]);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: '题目ID',
      dataIndex: 'id',
      valueType: "text"
    },
    {
      title: '题目标题',
      dataIndex: 'title',
      valueType: "text"
    },
    {
      title: '题目描述',
      dataIndex: 'description',
      ellipsis: true,
      valueType: "text"
    },
    {
      title: '题目答案',
      dataIndex: 'answer',
      ellipsis: true,
      valueType: "textarea"
    },
    {
      title: '题目标签',
      dataIndex: 'tags',
      valueType: "jsonCode"
    },
    {
      title: '判题配置',
      dataIndex: 'judgeConfig',
      valueType: "jsonCode"
    },
    {
      title: '判题用例',
      dataIndex: 'judgeCase',
      valueType: "jsonCode"
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: "dateTime",
      hideInForm: true
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: "dateTime",
      hideInForm: true
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          配置
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          订阅警报
        </a>,
      ],
    },
  ];
  const fetchList = async (
    params: API.getQuestionListUsingGETParams & {
      current?: number;
      pageSize?: number;
    },
    options?: { [key: string]: any },
  ) => {
    const res = await getQuestionListUsingGet({
      ...params
    })
    return {
      data: res.data?.records || [],
      success: res.code == 0? true : false,
      total: res.data?.total || 0
    }
  }
  return (
    <PageContainer>
      <ProTable<API.QuestionVO, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        scroll={{ x: 'max-content' }}
        rowKey="id"
        search={{
          labelWidth: 100,
        }}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新增题目
          </Button>,
        ]}
        request={fetchList}
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
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
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
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <CreateForm 
        onCancel={() => {
          handleModalOpen(false);
        }}
        onSubmit={async (values) => {
          handleAdd(values);
          handleModalOpen(false);
        }}
        visible={createModalOpen}    
        />
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.title && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.title}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default QuestionList;

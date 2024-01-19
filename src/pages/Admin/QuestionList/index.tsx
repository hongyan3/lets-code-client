import {
  addQuestionUsingPost,
  deleteQuestionByIdUsingDelete,
  getQuestionListUsingGet,
  updateQuestionUsingPut,
} from '@/services/Server/questionAdminController';
import { updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { values } from 'lodash';

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
      message.success('添加成功');
    }
    hide();
    return true;
  } catch (error: any) {
    hide();
    message.error('添加失败 ' + error.message);
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.QuestionUpdateRequest) => {
  const hide = message.loading('Configuring');
  try {
    const res = await updateQuestionUsingPut(fields)
    if (res.code != 0) {
      message.error(res.message);
    }
    hide();
    message.success('更新成功');
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
        questionId: e.id as string,
      });
    });
    hide();
    message.success('删除成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('删除失败 ', error.message);
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
      valueType: 'text',
      width: 100
    },
    {
      title: '题目标题',
      dataIndex: 'title',
      valueType: 'text',
      width: 200
    },
    {
      title: '题目描述',
      dataIndex: 'description',
      ellipsis: true,
      valueType: 'text',
      width: 300
    },
    {
      title: '题目答案',
      dataIndex: 'answer',
      ellipsis: true,
      valueType: 'textarea',
      width: 300
    },
    {
      title: '题目标签',
      dataIndex: 'tags',
      valueType: 'jsonCode',
      width: 150
    },
    {
      title: '判题配置',
      dataIndex: 'judgeConfig',
      valueType: 'jsonCode',
      width: 200
    },
    {
      title: '判题用例',
      dataIndex: 'judgeCase',
      valueType: 'jsonCode',
      width: 200
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      width: 200
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
      width: 200
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);            
            setCurrentRow(record);
          }}
        >
          修改
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
      ...params,
    });
    return {
      data: res.data?.records || [],
      success: res.code == 0 ? true : false,
      total: res.data?.total || 0,
    };
  };
  return (
    <PageContainer>
      <ProTable<API.QuestionVO, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 100,
        }}
        scroll={{x: '2000'}}
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
        request={fetchList as any}
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
          await handleAdd(values);
          actionRef.current?.reloadAndRest?.();
          handleModalOpen(false);
        }}
        visible={createModalOpen}
      />
      <UpdateForm
        onCancel={() => {
          handleUpdateModalOpen(false);
        }}
        visible={updateModalOpen}
        onSubmit={async (values) => {
          await handleUpdate(values)
          handleUpdateModalOpen(false)
          actionRef.current?.reloadAndRest?.();
        }}
        origin={currentRow || {}}
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
          <ProDescriptions<API.QuestionVO>
            column={2}
            title={currentRow?.title}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={columns as ProDescriptionsItemProps<API.QuestionVO>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default QuestionList;
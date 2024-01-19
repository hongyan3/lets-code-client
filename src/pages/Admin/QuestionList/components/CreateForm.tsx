import {
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import { json } from 'express';
import React from 'react';

export type Props = {
  onCancel: () => void;
  onSubmit: (values: API.QuestionAddRequest) => Promise<void>;
  visible: boolean;
};
const createColums: ProColumns<API.QuestionAddRequest>[] = [
  {
    title: '题目标题',
    dataIndex: 'title',
    valueType: "text"
  },
  {
    title: '题目描述',
    dataIndex: 'description',
    ellipsis: true,
    valueType: "textarea"
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
];
const CreateModal: React.FC<Props> = (Props) => {
  const {visible,onCancel,onSubmit} = Props
  return <Modal open={visible} onCancel={() => onCancel?.()} footer={null}>
    <ProTable 
      type='form' 
      columns={createColums} 
      onSubmit={async (values) => {
        console.log(values);
        
        // onSubmit?.(values)
      }}
    />
  </Modal>;
}
export default CreateModal;

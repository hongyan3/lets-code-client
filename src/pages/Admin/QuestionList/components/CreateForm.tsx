import {
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Modal, message } from 'antd';
import React, { useState } from 'react';

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
const CreateForm: React.FC<Props> = (Props) => {
  const {visible,onCancel,onSubmit} = Props
  return <Modal open={visible} onCancel={() => onCancel?.()} footer={null}>
    <ProTable 
      type='form' 
      columns={createColums}
      onSubmit={async (values) => {
          try{
            const {title,description,answer,tags,judgeConfig,judgeCase} = values
            const jsonConfigJson = JSON.parse(judgeConfig)
            const tagsJson = JSON.parse(tags)
            const judgeCaseJson = JSON.parse(judgeCase)
            onSubmit?.({
              title,
              description,
              answer,
              tags: tagsJson,
              judgeConfig: jsonConfigJson,
              judgeCase: judgeCaseJson
            })
          } catch(error :any) {
            message.error(error.message)
          }
        return
      }}
    />
  </Modal>;
}
export default CreateForm;

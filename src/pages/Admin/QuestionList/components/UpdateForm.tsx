import { ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import { Modal, message } from 'antd';
import { values } from 'lodash';
import React, { useEffect, useRef } from 'react';

export type Props = {
  onCancel: () => void;
  onSubmit: (values: API.QuestionUpdateRequest) => Promise<void>;
  visible: boolean;
  origin: API.QuestionVO;
};
const updateColums: ProColumns<API.QuestionUpdateRequest>[] = [
  {
    title: '题目ID',
    dataIndex: 'id',
    valueType: 'text',
  },
  {
    title: '题目标题',
    dataIndex: 'title',
    valueType: 'text',
  },
  {
    title: '题目描述',
    dataIndex: 'description',
    ellipsis: true,
    valueType: 'textarea',
  },
  {
    title: '题目答案',
    dataIndex: 'answer',
    ellipsis: true,
    valueType: 'textarea',
  },
  {
    title: '题目标签',
    dataIndex: 'tags',
    valueType: 'jsonCode',
  },
  {
    title: '判题配置',
    dataIndex: 'judgeConfig',
    valueType: 'jsonCode',
  },
  {
    title: '判题用例',
    dataIndex: 'judgeCase',
    valueType: 'jsonCode',
  },
];
const UpdateForm: React.FC<Props> = (Props) => {
  const { visible, onCancel, onSubmit, origin } = Props;
  const fromRef = useRef<ProFormInstance>();
  useEffect(() => {
    if (fromRef) {
      fromRef.current?.setFieldsValue(origin);
    }
  }, [origin]);
  return (
    <Modal open={visible} onCancel={() => onCancel?.()} footer={null}>
      <ProTable
        type="form"
        columns={updateColums}
        formRef={fromRef}
        onSubmit={async (values) => {
          try {
            const { id, title, description, answer, tags, judgeConfig, judgeCase } = values;
            const jsonConfigJson = JSON.parse(judgeConfig);
            const tagsJson = JSON.parse(tags);
            const judgeCaseJson = JSON.parse(judgeCase);
            onSubmit?.({
              id,
              title,
              description,
              answer,
              tags: tagsJson,
              judgeConfig: jsonConfigJson,
              judgeCase: judgeCaseJson,
            });
          } catch (error: any) {
            message.error(error.message);
          }
          return;
        }}
        onReset={() => {
          fromRef.current?.setFieldsValue(origin);
        }}
      />
    </Modal>
  );
};
export default UpdateForm;

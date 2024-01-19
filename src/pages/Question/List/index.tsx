import { getQuestionListUsingGet1 } from '@/services/Server/questionController';
import { EllipsisOutlined } from '@ant-design/icons';
import {
  PageContainer, ProList, Search,
} from '@ant-design/pro-components';
import { render } from '@testing-library/react';
import { Progress, Space, Tag } from 'antd';
import Link from 'antd/es/typography/Link';
import routes from 'config/routes';
import route from 'mock/route';
import React, { useRef, useState } from 'react';

const List: React.FC = () => {
  const fetchList = async (
    params: API.getQuestionListUsingGET1Params & {
      current?: number;
      pageSize?: number;
    },
  ) => {
    const res = await getQuestionListUsingGet1({
      ...params
    })
    return {
      data: res.data?.records || [],
      success: res.code == 0 ? true : false,
      total: res.data?.total || 0
    }
  }
  return (
    <PageContainer>
      <ProList<API.QuestionVO>
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
        }}
        search={{}}
        size="large"
        split={false}
        rowKey="id"
        metas={{
          id: {
            title: '题目ID',
            dataIndex: 'id'
          },
          title: {
            title: '标题',
            dataIndex: 'title',
            render: (_, item) => {
              return (
                <Link style={{color: '#1f1f1f'}} href={`/question/${item.id}`}><div>{`${item.id}. ${item.title}`}</div></Link>
              )
            }
          },
          description: {
            title: '描述',
            dataIndex: 'description',
            search: false
          },
          subTitle: {
            title: '标签',
            dataIndex: 'tags',
            render: (_, row) => {
              return (
                <Space size={row.tags?.length}>
                  {row.tags?.map((item, _) => (
                    <Tag color="blue" key={item}>
                      {item}
                    </Tag>
                  ))}
                </Space>
              );
            }
          },
          submitNum: {
            dataIndex: 'submitNum',
            search: false
          },
          accessNum: {
            dataIndex: 'accessNum',
            search: false
          },
          content: {
            search: false,
            render: (_, row) => {
              const sub = row.submitNum as number
              const ac = row.accessNum as number
              return (
                <div
                  style={{
                    width: 200,
                  }}
                >
                  <div>通过率</div>
                  <Progress percent={sub / ac} />
                </div>
              )
            }
          },
          actions: {
            search: false,
            render: (_,e) => {
              return (<a href={`/question/${e.id}`}>去做题</a>)
            }
          },
        }}
        headerTitle='题目列表'
        request={fetchList}
      // dataSource={data}
      />
    </PageContainer>
  );
};
export default List;

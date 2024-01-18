import Icon, { GithubOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import '@umijs/max';
import React from 'react';
export type SiderTheme = 'light' | 'dark';
export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://github.com/xiyuan230/lets-code-server');
      }}
    >
      <GithubOutlined />
    </div>
  );
};

import { getQuestionByIdUsingGet1 } from '@/services/Server/questionController';
import { CloudUploadOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
import { Button, Select, Space, Tag, Typography, message } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import Title from 'antd/lib/typography/Title';
import { useEffect, useState } from 'react';
import AceEditor from 'react-ace';
// AceEditor相关资源导入
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-tomorrow';
import { random } from 'lodash';
import { getQuestionSubmitListUsingGet, submitQuestionUsingPost } from '@/services/Server/questionSubmitController';

const Info: React.FC = () => {
  const [question, setQuestion] = useState<API.QuestionVO>();
  const [language, setLanguage] = useState<string>('Java');
  const [mode, setMode] = useState<string>('acm');
  const [code, setCode] = useState<string>();
  const [theme, setTheme] = useState<string>('tomorrow');
  const [loading,setLoading] = useState<boolean>(false)
  const params = useParams();
  const id = params.id as string;
  useEffect(() => {
    if (!id) {
      return;
    }
    try {
      (async () => {
        const res = await getQuestionByIdUsingGet1({
          questionId: id,
        });
        if (res.data) {
          setQuestion(res.data);
        }
      })();
    } catch (error: any) {
      message.error('获取题目信息失败 ' + error.message);
    }
  }, []);
  return (
    <PageContainer
      extra={
        <Button
          type="primary"
          size="middle"
          icon={<CloudUploadOutlined />}
          onClick={() => {
            setLoading(true)
            submitQuestionUsingPost({
              code,
              language,
              questionId: id
            }).then(async res => {
              if(res.code == 0) {
                let id = res.data
                let interval = setInterval(async () => {
                  getQuestionSubmitListUsingGet({
                    id
                  }).then((res) => {
                    let submit = res.data?.records
                    switch(submit[0].status) {
                      case 2:
                        if (submit[0].judgeInfo?.message == 'Accepted') {
                          message.success('提交通过')
                        } else {
                          message.warning('提交未通过')
                        }
                        clearInterval(interval)
                        break
                      case 3:
                        message.warning('代码编译/运行错误')
                        clearInterval(interval)
                        break
                      default:
                        console.log('轮询中...');
                    } 
                    setLoading(false)             
                  })
                },500)
              } else {
                message.warning('提交失败')
                setLoading(false)
              }
            })
          }}
          loading={loading}
        >
          提交代码
        </Button>
      }
    >
      <ProCard gutter={10} ghost>
        <ProCard type="inner" bordered colSpan="35%" bodyStyle={{ height: 550, maxHeight: 600,overflowY: 'scroll' }}>
          <Typography>
            <Title level={4}>{question?.title}</Title>
            <Space
              style={{
                marginBottom: 15,
              }}
            >
              {question?.tags?.map((e) => (
                <Tag color="blue" key={e}>
                  {e}
                </Tag>
              ))}
            </Space>
            {
              question?.description?.split("\n").map(e => (
                <Paragraph key={e}>{e}</Paragraph>
              ))
            }
          </Typography>
        </ProCard>
        <ProCard type="inner" bordered bodyStyle={{ height: 550, maxHeight: 600 }}>
          <Space
            wrap
            style={{
              marginBottom: 15,
            }}
          >
            <div>编程语言</div>
            <Select
              defaultValue="Java"
              style={{ width: 120 }}
              title="编程语言"
              onChange={(value) => {
                setLanguage(value);
              }}
              options={[
                { value: 'java', label: 'Java' },
                { value: 'golang', label: 'Go' },
                { value: 'javascript', label: 'JavaScript' },
              ]}
              key="language"
            />
            <div>模式</div>
            <Select
              defaultValue="acm"
              style={{ width: 120 }}
              onChange={(value) => {
                setMode(value);
              }}
              options={[
                { value: 'acm', label: 'ACM' },
                { value: 'leetcode', label: 'LeetCode' },
              ]}
              title="模式"
              key="mode"
            />
            <div>主题</div>
            <Select
              defaultValue="tomorrow"
              style={{ width: 120 }}
              onChange={(value) => {
                setTheme(value);
              }}
              options={[
                { value: 'tomorrow', label: 'Tomorrow' },
                { value: 'github', label: 'Github' },
                { value: 'monokai', label: 'Monokai' },
              ]}
              title="模式"
              key="theme"
            />
          </Space>
          <AceEditor
            mode={language}
            theme={theme}
            name="code"
            width="100%"
            height="90%"
            // onLoad={this.onLoad}
            onChange={(e) => {
              setCode(e);
            }}
            fontSize={14}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            value={code}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: true,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};
export default Info;

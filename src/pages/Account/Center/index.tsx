import { uploadFileUsingPost } from "@/services/Server/fileController";
import { getLoginUserUsingGet, updateUserUsingPut1 } from "@/services/Server/userController";
import { PageContainer, ProCard, ProForm, ProFormRadio, ProFormText, ProFormUploadButton } from "@ant-design/pro-components";
import { Form, message } from "antd";

const Center: React.FC = () => {
  return (
    <PageContainer>
      <ProCard
        bordered
        headerBordered
        direction="column"
        gutter={[0, 16]}
        style={{ marginBlockStart: 8 }}

      >
        <ProCard title="基本信息" type="inner" bordered>
          <ProForm
            request={async () => {
              try {
                const res = await getLoginUserUsingGet()
                if (res.data) {
                  return {
                    userName: res.data.userName,
                    userAvatar: [
                      {
                        uid: '1',
                        name: 'user_avatar',
                        url: res.data.userAvatar,
                        response: ''
                      }
                    ],
                    gender: res.data?.gender
                  }
                }
              } catch (error: any) {
                message.error('获取个人信息失败' + error.message)
                return
              }
            }}
            onFinish={async (formData) => {
              try {
                const res = await updateUserUsingPut1({
                  userAvatar: formData?.userAvatar[0].response,
                  userName: formData?.userName,
                  gender: formData?.gender
                })
                if (res.code == 0) {
                  message.success('更新成功')
                } else {
                  message.error(res.message)
                }
              } catch (error: any) {
                message.error('更新失败' + error.message)
              }
            }}
          >
            <ProFormText
              name="userName"
              width="sm"
              label="用户昵称"
            >
            </ProFormText>
            <ProFormUploadButton
              name="userAvatar"
              label="头像"
              max={1}
              fieldProps={{
                name: 'file',
                listType: 'picture-card',
                customRequest: async (options) => {
                  try {
                    const file = options.file as File
                    const onSuccess = options.onSuccess
                    const res = await uploadFileUsingPost({
                      business: 'user_avatar'
                    }, file)
                    if (res.data) {
                      onSuccess && onSuccess(res.data)
                    }
                  } catch (error: any) {
                    message.error('上传失败' + error.message)
                  }
                }
              }}
            />
            <ProFormRadio.Group
              name="gender"
              label="性别"
              options={[
                {
                  label: '男',
                  value: 1,
                },
                {
                  label: '女',
                  value: 2,
                },
                {
                  label: '保密',
                  value: 3,
                },
              ]}
            />
          </ProForm>
        </ProCard>
        <ProCard title="做题记录" type="inner" bordered>
          
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};
export default Center;

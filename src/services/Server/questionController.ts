// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getQuestionList GET /api/question */
export async function getQuestionListUsingGet1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionListUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionVO>('/api/question', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getQuestionById GET /api/question/${param0} */
export async function getQuestionByIdUsingGet1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionByIdUsingGET1Params,
  options?: { [key: string]: any },
) {
  const { questionId: param0, ...queryParams } = params;
  return request<API.BaseResponseQuestionVO>(`/api/question/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

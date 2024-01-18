// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getQuestionSubmitList GET /api/question_submit */
export async function getQuestionSubmitListUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionSubmitListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestionSubmitVO>('/api/question_submit', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** submitQuestion POST /api/question_submit */
export async function submitQuestionUsingPost(
  body: API.QuestionSubmitAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/question_submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

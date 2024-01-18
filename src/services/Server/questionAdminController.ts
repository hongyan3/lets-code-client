// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getQuestionList GET /api/admin/question */
export async function getQuestionListUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageQuestion>('/api/admin/question', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** updateQuestion PUT /api/admin/question */
export async function updateQuestionUsingPut(
  body: API.QuestionUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/admin/question', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** addQuestion POST /api/admin/question */
export async function addQuestionUsingPost(
  body: API.QuestionAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/admin/question', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getQuestionById GET /api/admin/question/${param0} */
export async function getQuestionByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  const { questionId: param0, ...queryParams } = params;
  return request<API.BaseResponseQuestion>(`/api/admin/question/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** deleteQuestionById DELETE /api/admin/question/${param0} */
export async function deleteQuestionByIdUsingDelete(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteQuestionByIdUsingDELETEParams,
  options?: { [key: string]: any },
) {
  const { questionId: param0, ...queryParams } = params;
  return request<API.BaseResponseboolean>(`/api/admin/question/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

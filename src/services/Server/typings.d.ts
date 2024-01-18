declare namespace API {
  type BaseResponseboolean = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponselong = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponsePageQuestion = {
    code?: number;
    data?: PageQuestion;
    message?: string;
  };

  type BaseResponsePageQuestionSubmitVO = {
    code?: number;
    data?: PageQuestionSubmitVO;
    message?: string;
  };

  type BaseResponsePageQuestionVO = {
    code?: number;
    data?: PageQuestionVO;
    message?: string;
  };

  type BaseResponsePageUser = {
    code?: number;
    data?: PageUser;
    message?: string;
  };

  type BaseResponsePageUserVO = {
    code?: number;
    data?: PageUserVO;
    message?: string;
  };

  type BaseResponseQuestion = {
    code?: number;
    data?: Question;
    message?: string;
  };

  type BaseResponseQuestionVO = {
    code?: number;
    data?: QuestionVO;
    message?: string;
  };

  type BaseResponsestring = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUser = {
    code?: number;
    data?: User;
    message?: string;
  };

  type BaseResponseUserVO = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type deleteQuestionByIdUsingDELETEParams = {
    /** questionId */
    questionId: string;
  };

  type deleteUserUsingDELETEParams = {
    /** userId */
    userId: string;
  };

  type getQuestionByIdUsingGET1Params = {
    /** questionId */
    questionId: string;
  };

  type getQuestionByIdUsingGETParams = {
    /** questionId */
    questionId: string;
  };

  type getQuestionListUsingGET1Params = {
    createTime?: string;
    current?: string;
    description?: string;
    id?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    updateTime?: string;
    userId?: string;
  };

  type getQuestionListUsingGETParams = {
    createTime?: string;
    current?: string;
    description?: string;
    id?: string;
    pageSize?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    updateTime?: string;
    userId?: string;
  };

  type getQuestionSubmitListUsingGETParams = {
    code?: string;
    current?: string;
    id?: string;
    language?: string;
    pageSize?: string;
    questionId?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    userId?: string;
  };

  type getUserByIdUsingGETParams = {
    /** userId */
    userId: string;
  };

  type JudgeCase = {
    input?: string;
    output?: string;
  };

  type JudgeConfig = {
    memoryLimit?: string;
    stackLimit?: string;
    timeLimit?: string;
  };

  type JudgeInfo = {
    memory?: string;
    message?: string;
    time?: string;
  };

  type ModelAndView = {
    empty?: boolean;
    model?: Record<string, any>;
    modelMap?: Record<string, any>;
    reference?: boolean;
    status?:
      | 'ACCEPTED'
      | 'ALREADY_REPORTED'
      | 'BAD_GATEWAY'
      | 'BAD_REQUEST'
      | 'BANDWIDTH_LIMIT_EXCEEDED'
      | 'CHECKPOINT'
      | 'CONFLICT'
      | 'CONTINUE'
      | 'CREATED'
      | 'DESTINATION_LOCKED'
      | 'EXPECTATION_FAILED'
      | 'FAILED_DEPENDENCY'
      | 'FORBIDDEN'
      | 'FOUND'
      | 'GATEWAY_TIMEOUT'
      | 'GONE'
      | 'HTTP_VERSION_NOT_SUPPORTED'
      | 'IM_USED'
      | 'INSUFFICIENT_SPACE_ON_RESOURCE'
      | 'INSUFFICIENT_STORAGE'
      | 'INTERNAL_SERVER_ERROR'
      | 'I_AM_A_TEAPOT'
      | 'LENGTH_REQUIRED'
      | 'LOCKED'
      | 'LOOP_DETECTED'
      | 'METHOD_FAILURE'
      | 'METHOD_NOT_ALLOWED'
      | 'MOVED_PERMANENTLY'
      | 'MOVED_TEMPORARILY'
      | 'MULTIPLE_CHOICES'
      | 'MULTI_STATUS'
      | 'NETWORK_AUTHENTICATION_REQUIRED'
      | 'NON_AUTHORITATIVE_INFORMATION'
      | 'NOT_ACCEPTABLE'
      | 'NOT_EXTENDED'
      | 'NOT_FOUND'
      | 'NOT_IMPLEMENTED'
      | 'NOT_MODIFIED'
      | 'NO_CONTENT'
      | 'OK'
      | 'PARTIAL_CONTENT'
      | 'PAYLOAD_TOO_LARGE'
      | 'PAYMENT_REQUIRED'
      | 'PERMANENT_REDIRECT'
      | 'PRECONDITION_FAILED'
      | 'PRECONDITION_REQUIRED'
      | 'PROCESSING'
      | 'PROXY_AUTHENTICATION_REQUIRED'
      | 'REQUESTED_RANGE_NOT_SATISFIABLE'
      | 'REQUEST_ENTITY_TOO_LARGE'
      | 'REQUEST_HEADER_FIELDS_TOO_LARGE'
      | 'REQUEST_TIMEOUT'
      | 'REQUEST_URI_TOO_LONG'
      | 'RESET_CONTENT'
      | 'SEE_OTHER'
      | 'SERVICE_UNAVAILABLE'
      | 'SWITCHING_PROTOCOLS'
      | 'TEMPORARY_REDIRECT'
      | 'TOO_EARLY'
      | 'TOO_MANY_REQUESTS'
      | 'UNAUTHORIZED'
      | 'UNAVAILABLE_FOR_LEGAL_REASONS'
      | 'UNPROCESSABLE_ENTITY'
      | 'UNSUPPORTED_MEDIA_TYPE'
      | 'UPGRADE_REQUIRED'
      | 'URI_TOO_LONG'
      | 'USE_PROXY'
      | 'VARIANT_ALSO_NEGOTIATES';
    view?: View;
    viewName?: string;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageQuestion = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: Question[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageQuestionSubmitVO = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: QuestionSubmitVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageQuestionVO = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: QuestionVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUser = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: User[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type PageUserVO = {
    countId?: string;
    current?: string;
    maxLimit?: string;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: string;
    records?: UserVO[];
    searchCount?: boolean;
    size?: string;
    total?: string;
  };

  type Question = {
    accessNum?: number;
    answer?: string;
    createTime?: string;
    description?: string;
    id?: string;
    isDelete?: number;
    judgeCase?: string;
    judgeConfig?: string;
    submitNum?: number;
    tags?: string;
    title?: string;
    updateTime?: string;
    userId?: string;
  };

  type QuestionAddRequest = {
    answer?: string;
    description?: string;
    judgeCase?: JudgeCase[];
    judgeConfig?: JudgeConfig;
    tags?: string[];
    title?: string;
  };

  type QuestionSubmitAddRequest = {
    code?: string;
    id?: string;
    language?: string;
    questionId?: string;
  };

  type QuestionSubmitVO = {
    code?: string;
    createTime?: string;
    id?: string;
    judgeInfo?: JudgeInfo;
    language?: string;
    questionId?: string;
    status?: number;
    updateTime?: string;
    userId?: string;
    userInfo?: UserVO;
  };

  type QuestionUpdateRequest = {
    answer?: string;
    description?: string;
    id?: string;
    judgeCase?: JudgeCase[];
    judgeConfig?: JudgeConfig;
    tags?: string[];
    title?: string;
  };

  type QuestionVO = {
    accessNum?: number;
    answer?: string;
    createTime?: string;
    description?: string;
    id?: string;
    judgeConfig?: JudgeConfig;
    submitNum?: number;
    tags?: string[];
    title?: string;
    updateTime?: string;
    userId?: string;
    userInfo?: UserVO;
  };

  type User = {
    createTime?: string;
    gender?: number;
    id?: string;
    isDelete?: number;
    password?: string;
    role?: number;
    status?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
  };

  type UserAddRequest = {
    id?: string;
    password?: string;
    role?: number;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
  };

  type UserEditRequest = {
    gender?: number;
    userAvatar?: string;
    userName?: string;
  };

  type userListUsingGET1Params = {
    createTime?: string;
    current?: string;
    gender?: number;
    id?: string;
    isDelete?: number;
    pageSize?: string;
    role?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    updateTime?: string;
    userAccount?: string;
    userName?: string;
  };

  type userListUsingGETParams = {
    createTime?: string;
    current?: string;
    gender?: number;
    id?: string;
    isDelete?: number;
    pageSize?: string;
    role?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    updateTime?: string;
    userAccount?: string;
    userName?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userName?: string;
    userPassword?: string;
  };

  type UserUpdateRequest = {
    gender?: number;
    id?: string;
    isDelete?: number;
    role?: number;
    status?: number;
    updateTime?: string;
    userName?: string;
  };

  type UserVO = {
    createTime?: string;
    gender?: number;
    id?: string;
    role?: number;
    status?: number;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
  };

  type View = {
    contentType?: string;
  };
}

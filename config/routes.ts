export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
    ],
  },
  { path: '/welcome', name: '主页', icon: 'homeOutlined', component: './Welcome' },
  { name: '浏览题目', icon: 'fileTextOutlined', path: '/question/list', component: './Question/List' },
  { name: '题目详情', hideInMenu: true, path: '/question/:id', component: './Question/Info' },
  {
    path: '/account/center',
    icon: 'user',
    name: '个人中心',
    component: './Account/Center'
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/questionList' },
      { path: '/admin/questionList', name: '题目管理', component: './Admin/QuestionList' },
    ],
  },
  // 
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];

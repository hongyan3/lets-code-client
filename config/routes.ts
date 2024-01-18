export default [
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
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
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '题目管理', component: './Admin' },
    ],
  },
  // 
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];

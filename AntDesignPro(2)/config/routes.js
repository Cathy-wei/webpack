/*
 * @Author: your name
 * @Date: 2020-12-24 10:58:44
 * @LastEditTime: 2021-01-14 13:35:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \AntDesignPro\config\routes.js
 */
export default [{
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [{
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [{
          name: 'login',
          path: '/user/login',
          component: './user/login',
        }, ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [{
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              // 主页
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              // 订单
              {
                name: 'order',
                icon: 'file-text',
                path: '/list',
                // component: './ListTableList',
                routes: [{
                  path: '/list/allOrder',
                  name: 'list',
                  component: './ListTableList',
                  authority: ['admin'],
                },
                {
                  path: '/list/allOrder/:id',
                  name: 'detail',
                  component: './ListTableList/Detail',
                  hideInMenu:true,
                  authority: ['admin'],
                },
              ],
              },
              // 商品
              {
                path: '/goods',
                name: 'goods',
                icon: 'bars',
                authority: ['admin'],
                routes: [{
                    path: '/goods/allProducts',
                    name: 'list',
                    component: './Product',
                    authority: ['admin'],
                  },
                  {
                    path: '/goods/allProducts/:id',
                    name: 'detail',
                    component: './Product/Detail',
                    hideInMenu:true,
                    authority: ['admin'],
                  },

                  {
                    path: '/goods/allCategory',
                    name: 'category',
                    component: './Category',
                    authority: ['admin'],
                  },
                  {
                    path: '/goods/allCategory/:id',
                    name: 'categoryDetail',
                    component: './Category/Detail',
                    hideInMenu:true,
                    authority: ['admin'],
                  },
                ],
              },
              // 顾客
              {
                name: 'customer',
                icon: 'user',
                path: '/customer',
                // component: './CustomerList',
                routes: [{
                  path: '/customer/allCustomer',
                  name: 'list',
                  component: './CustomerList',
                  authority: ['admin'],
                },
                {
                  path: '/customer/allCustomer/:id',
                  name: 'detail',
                  component: './CustomerList/Detail',
                  hideInMenu:true,
                  authority: ['admin'],
                },
              ],
              },

              // 管理员
              // {
              //   path: '/admin',
              //   name: 'admin',
              //   icon: 'crown',
              //   component: './Admin',
              //   authority: ['admin'],
              //   routes: [{
              //     path: '/admin/sub-page',
              //     name: 'sub-page',
              //     icon: 'smile',
              //     component: './Welcome',
              //     authority: ['admin'],
              //   }, ],
              // },
              // 设置
              {
                name: 'list.setting-list',
                icon: 'setting',
                path: '/setting',
                component: './Setting',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];

/*
 * @Author: your name
 * @Date: 2020-12-24 10:58:44
 * @LastEditTime: 2021-01-04 09:45:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \AntDesignPro\src\utils\request.js
 */
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {
  extend
} from 'umi-request';
import {
  notification
} from 'antd';
import Qs from "qs"

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  const {
    response
  } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const {
      status,
      url
    } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
  headers: {
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYjY2MTEwZmZjYTY2NWY2MTgwOGZjMjA4ZjAwZWQxOGU0ZmU0ZTMzNTFlOGNkMjMxYWE5NWJlYWU3MDcwYjJkODg5NTQ0ZGY5YmVlZTlkZTEiLCJpYXQiOjE2MDg3ODEyMDksIm5iZiI6MTYwODc4MTIwOSwiZXhwIjoxNjQwMzE3MjA5LCJzdWIiOiIzIiwic2NvcGVzIjpbIioiXX0.Ml9XaYvW4ebNLlMk9yJr9EEow3kwvylGzV3L0IhRJC5CkZiY27SXmcFkzGsKCc6xkL1xs7s9hD3HlZSn6dMJ2UPidzyJHI0OAXNgQm8n4IkjmXAfdKFN0iJlVR4ZP-Mp8RtbK217NgDgo77FY4LOkHgrQx3MvifGseJQQYp21ZCKsTHaFSzByXkhaszF4yvwjgsWyt4tO7d_gbFwXiqfNZsBgTNyZk9BkjpwJX8KJn9T6I2dRNYecgC9PyAoKH6ZhOgqCpGAdPPemOo86YmFcjf34Rby6YUvy6ajjtHQNlhvBGKAz9f9YKbh2sqI-y_b4qBke227-tF86k50xO5PT_htGBy62WkKw1-LLCgAUqp-UzdHiNVMOZi-vprrf2NxIhzaX3zD0FMn6oU7pZDpeUGd5Nygt3Tdx1z_2yo5rpFBi6QwDaFtyiCD_ebq3v3lha4Z9YF411npUIwNQjXNmfalpKZjGxTRQmB5u75BGoNTe0Sp9XfZ0A6IX63XatuXeCMDR6A_9U_dN8IRteZmPpdbnoCLGfBrbfyx7VGK9s8aUy0jQuIw81ACtEUXPJkz_yM2WWcVmwBDumIXjZKGXoOcmcl80SYFBkXmlE7tOt1PV0S1sZRI-xYJLrgXFxR5_u0yCYpd9N8ZHRw7xVQXsCkM72JMvCtoFL7EHP8runs'
  },

  // 查询操作
  paramsSerializer: function (params) {
    return Qs.stringify(params, {
      arrayFormat: 'brackets'
    })
  }
  
});
export default request;

/*
 * @Author: your name
 * @Date: 2020-12-24 11:50:36
 * @LastEditTime: 2021-01-13 22:27:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \AntDesignPro\src\services\order.js
 */
import request from '@/utils/request';

export async function query({
  sorter,

}) {
  const params = {
    page_size: '',
    page: ''
  }

  if (sorter) {
    // console.log(sorter);
    const sort = ''
    params.sort = sort
  }

  return request('/api/admin/oauth/token', {
    params
  });
}


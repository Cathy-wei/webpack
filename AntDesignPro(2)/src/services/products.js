/*
 * @Author: your name
 * @Date: 2020-12-24 11:50:36
 * @LastEditTime: 2021-01-13 12:56:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \AntDesignPro\src\services\order.js
 */
import request from '@/utils/request';

export async function query({
  sorter,
  ID,
  title
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

  // 根据商品ID查询
  if (ID) {
    params['filter[id]'] = ID
  }

  // 根据商品ID查询
  if (title) {
    params['filter[search]'] = title
  }

  return request('/api/admin/products', {
    params
  });
}

export async function queryID(ID) {
  const res = await request(`/api/admin/products/${ID}`);
  return res
}

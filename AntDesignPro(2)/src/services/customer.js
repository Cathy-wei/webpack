/*
 * @Author: your name
 * @Date: 2020-12-24 11:50:36
 * @LastEditTime: 2021-01-12 16:45:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \AntDesignPro\src\services\order.js
 */
import request from '@/utils/request';

export async function query({
  sorter,
  user_nicename,
  subscribed,
  country,
  order_total
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

  // 根据用户昵称查询
  if (user_nicename) {
    params['filter[search]'] = user_nicename
  }

  // 根据订阅状态查询
  if (subscribed) {
    params['filter[subscribed]'] = subscribed
  }

  // 根据国家查询
  if (country) {
    params['filter[country]'] = country
  }

  // 根据订单总金额查询
  if (order_total) {
    params['filter[order_total]'] = order_total
  }

  return request('/api/admin/customers', {
    params
  });
}

export async function queryID(ID){
 const res =await request(`/api/admin/customers/${ID}`);
 return res
}
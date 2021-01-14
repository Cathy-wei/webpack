import request from '@/utils/request';

export async function  reports(params) {  
  return request('/api/admin/reports',{
    method:'GET',
    params
  });
}
 
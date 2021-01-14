/*
 * @Author: your name
 * @Date: 2021-01-14 10:24:05
 * @LastEditTime: 2021-01-14 10:31:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \AntDesignPro\src\models\report.js
 */
import {
    reports,
    // ordersReport as orders,
    // visitsReport as visits,
    
  } from '@/services/report';
  
  const ReportModel = {
    namespace: 'report',
    state: {
      sales:[],
      orders:[],
      visits:[]
    },
    effects: {
      * fetchReports({payload}, { call, put  }) {
        const response = yield call(reports,payload);
        // console.log('response', response)
        yield put({
          type: 'reports',
          payload: response,
        });
      },
    //   * fetchOrder(_, {
    //     call,
    //     put
    //   }) {
    //     const response = yield call(orders);
    //     console.log('order', response)
    //     yield put({
    //       type: 'orders',
    //       payload: response,
    //     });
    //   },
    //   * fetchVisit(_, {
    //     call,
    //     put
    //   }) {
    //     const response = yield call(visits);
    //     console.log('visits', response)
    //     yield put({
    //       type: 'visits',
    //       payload: response,
    //     });
    //   },
    },
    reducers: {
        reports(state, {payload}) {
            const s=payload
            // console.log("sales",s);
            return {
              ...state,
            report:payload,
            sales:payload[0].data,
            orders:payload[1].data,
            visits:payload[2].data
            };
        },
        // orders(state,action){
        //     return{
        //         ...state,
        //         orders:action.payload || {}
        //     }
        // },
        // visits(state,action){
        //     return{
        //         ...state,
        //         visits:action.payload || {}
        //     }
        // }
    },
  };
  export default ReportModel;
  
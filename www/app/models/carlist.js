var fp = require("lodash/fp");
import {fetchCarList} from "./util/fetchServer.js";
//model
export default {
    "namespace":"carlist",
    "state":{
        "filters":[
        ],
        "pageandSizeAndSort":{
            "page":1,
            "pagesize":10,
            "sortby":"id", //按id排序
            "sortdirection":1  //排序的方向
        },
        "results":[],
        "amount":0
    },
    "reducers":{
       addOrchangeFilter_sync(state,{filter_name,value}){

            var isFilterNameFlag = false;

            state.filters.forEach(item=>item.filter_name == filter_name && (isFilterNameFlag = true));
            var o = fp.set("pageandSizeAndSort",fp.set("page",1,state.pageandSizeAndSort),state);
            if(!isFilterNameFlag){
                // 若当前没有filter_name，此时要加一项
                return fp.set("filters",fp.concat(o.filters,{filter_name,value}),o)
            }else{
                // 若当前有filter_name，改变value
                return fp.set("filters",
                        o.filters.map(item=>item.filter_name == filter_name ? fp.set("value",value,item) : item)
                    ,o);
            }
       },
       removeFilter_sync(state,{filter_name}){
            var o = fp.set("pageandSizeAndSort",fp.set("page",1,state.pageandSizeAndSort),state);
            return fp.set("filters",
                    o.filters.filter(item=>item.filter_name != filter_name)
                ,o);
       },
       changeResults(state,{results}){
            return fp.set("results",results,state);
       },
       changePageAndSort_sync(state,{pageSize,current,columnKey,order}){
            order = order == "descend" ? -1 : 1;
            if(order != state.pageandSizeAndSort.sortdirection ) current = 1;
            var o = fp.set("pageandSizeAndSort",
                    fp.set("pagesize",pageSize,state.pageandSizeAndSort)
                ,state);
                o = fp.set("pageandSizeAndSort",
                    fp.set("page",current,o.pageandSizeAndSort)
                ,o);
                o = fp.set("pageandSizeAndSort",
                    fp.set("sortdirection",order,o.pageandSizeAndSort)
                ,o);
                o = fp.set("pageandSizeAndSort",
                    fp.set("sortby",columnKey,o.pageandSizeAndSort)
                ,o);
            return o;
       },
       changeAmounts(state,{amount}){
            return fp.set("amount",amount,state);
       }
    },
    "effects":{
        *addOrchangeFilter(action,{put,select,call,fork}){
            // 同步改变action发送过来的最新的state；
            yield put({...action,"type":"addOrchangeFilter_sync"})
            // 得到filter
            const filters = yield select(({carlist})=>carlist.filters);
            // 得到page和sort
            var pageandsort = yield select(({carlist})=>carlist.pageandSizeAndSort)
            // 请求服务器
            yield fork(fetchCarList,filters,pageandsort,put);

        },
        *removeFilter(action,{put,select,call,fork}){
            // 同步改变action发送过来的最新的state；
            yield put({...action,"type":"removeFilter_sync"})
            // 得到filter
            const filters = yield select(({carlist})=>carlist.filters);
             // 得到page和sort
            var pageandsort = yield select(({carlist})=>carlist.pageandSizeAndSort)
            // 请求服务器
            yield fork(fetchCarList,filters,pageandsort,put);
        },
        // 拉取默认数据
        *fetchData(action,{put,select,call,fork}){
            // 得到page和sort
            var pageandsort = yield select(({carlist})=>carlist.pageandSizeAndSort)
            // 请求服务器提供给一系列的数据
            yield fork(fetchCarList,[],pageandsort,put)
        },
        // 改变分页和排序
        *changePageAndSort(action,{put,select,call,fork}){
            // 还是先获取筛选条件
            const filters = yield select(({carlist})=>carlist.filters);
            //同步改变state的数据
            yield put({...action,"type":"changePageAndSort_sync"});
            // 得到page和sort
            var pageandsort = yield select(({carlist})=>carlist.pageandSizeAndSort)

            // 请求服务器提供的数据
            yield fork(fetchCarList,filters,pageandsort,put)

        }
    }

}
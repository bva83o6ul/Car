var fp = require("lodash/fp");
import {fetchCarInfo,fetchCarLike,fetchCarPics} from "./util/fetchServer.js";
export default {
    "namespace":"picshow",
    "state":{
        "id":1000065, //当前你在看什么车
        "carinfo":{}, //当前的车的信息
        "carpics":{
            "engine":[],
            "view":[],
            "inner":[],
            "more":[]
        },
        "carlike":[],   //与当前相似的车
        "nowalbum":"view", //当前再看什么相册
        "nowidx":0 //当前相册的地计划好图片。从0开始。
    },
    "reducers":{
        changeCarInfo(state,action){
            return fp.set("carinfo",action.result,state);
        },
        changeCarLike(state,action){
            return fp.set("carlike",action.results,state);
        },
        changeCarPics(state,action){
            return fp.set("carpics",action.images,state);
        },
        changeNowAlbum(state,action){
            var  o = fp.clone(state);
            o.nowalbum = action.nowalbum;
            o.nowidx = 0;
            return o;
        },
        changeId(state,action){
            return fp.set("id",action.id,state);
        },
        changeNowidx(state,action){
            return fp.set("nowidx",action.nowidx,state);
        },
        // 下一张
        goNext(state,action){
            // nowidx如果没有达到次图集的总数-1，nowidx允许加1
            if(state.nowidx < state.carpics[state.nowalbum].length - 1){

                return fp.set("nowidx",state.nowidx+1,state)
            }else{
                var arr = ["view","inner","engine","more"];
                // 当前的图集在arr中的位置
                var weizhi = arr.indexOf(state.nowalbum);
                var o = _.clone(state);
                o.nowidx = 0;
                o.nowalbum = arr[(weizhi + 1)%4];
                return o;
            }
        },
        // 上一张
        goPrev(state,action){
            // nowidx如果没有达到次图集的总数-1，nowidx允许加1
            if(state.nowidx > 0 ){
                return fp.set("nowidx",state.nowidx-1,state)
            }else{
                var arr = ["view","inner","engine","more"];
                // 当前的图集在arr中的位置
                var weizhi = arr.indexOf(state.nowalbum);
                var o = _.clone(state);
                weizhi = weizhi <= 0 ? 3 : weizhi -1;
                o.nowalbum = arr[weizhi];
                o.nowidx = state.carpics[o.nowalbum].length - 1;
                return o;
            }
        },
    },
    "effects":{
        *fetchCarInfo(action,{put,select,fork}){
            // select用来获取Store中的State上的数据。
            const id = yield select(({picshow})=>picshow.id);
            // 调用代理函数
            yield fork(fetchCarInfo,id,put)
        },
        *fetchCarLike(action,{put,select,fork}){
            // select用来获取Store中的State上的数据。
            const id = yield select(({picshow})=>picshow.id);
            // 调用代理函数
            yield fork(fetchCarLike,id,put)
        },
        *fetchCarPics(action,{put,select,fork}){
            // select用来获取Store中的State上的数据。
            const id = yield select(({picshow})=>picshow.id);
            // 调用代理函数
            yield fork(fetchCarPics,id,put)
        },
        *changeIdAsync(action,{put,select,fork}){
            const id = action.id;
            // 有一个同步
            yield put({"type":"changeId",id});
            // 3个异步
            // 调用代理函数
            yield fork(fetchCarInfo,id,put)
            yield fork(fetchCarLike,id,put)
            yield fork(fetchCarPics,id,put)
        }
    }
}
export const fetchCarInfo = function* (id,put){
    // 发出ajax请求
    const {result} = yield fetch("/carinfo/"+id).then(data=>data.json());
    // 交给同步的方法去处理state。
    yield put({"type":"changeCarInfo",result})
};
export const fetchCarLike = function* (id,put){
    // 发出ajax请求
    const {results} = yield fetch("/carlike/"+id).then(data=>data.json());
    // 交给同步的方法去处理state。
    yield put({"type":"changeCarLike",results})
};
export const fetchCarPics = function* (id,put){
   // 发出ajax请求
   const {images} = yield fetch("/carpic/"+id).then(data=>data.json());
   // 交给同步的方法去处理state。
   yield put({"type":"changeCarPics",images})
};
export const fetchCarList = function* (filters,pageandsort,put){

    // 发出post形式的ajax。
    const {results,amount} = yield fetch("/cars",{
            "method":"POST",
            "headers":{
              "Content-Type":"application/json"
            },
            "body":JSON.stringify({filters,pageandsort})

          }).then(data=>data.json());
    // 服务器下发了数据后，改变models中的state数据
    yield put({"type":"changeResults",results});
    yield put({"type":"changeAmounts",amount});
}
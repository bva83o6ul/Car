import React from 'react';
import {connect} from "dva";
class BigImage extends React.Component {
    constructor(props) {
        super(props);
    }
    // 门神函数
    shouldComponentUpdate(nextProps){
        // 如果改变是因为id变化的话
         if( nextProps.id !=this.props.id ){
           // 那么，就要看carpics是不是从服务器获得新的数据了
            return nextProps.carpics !== this.props.carpics;
        }
        // 如果不是因为id变化的，直接放行。
        return true;
    }
    // 在更新之前
    componentWillReceiveProps(nextProps){
         if( nextProps.id !=this.props.id ){
           if(nextProps.carpics === this.props.carpics){
              return
           }
        };
        // 这里制作loading效果
        // 下面的是图片真实的路径
        const str = `${nextProps.id}/${nextProps.nowalbum}/${nextProps.carpics[nextProps.nowalbum][nextProps.nowidx]}`;
       //先将大图的src换成小图的src
       $(this.refs.bigimg).attr("src","/carimages_small/"+str).css({
        "width":"90%",
        "height":"90%"
       });
       // 显示自行车
       $(this.refs.inner).addClass('loading');
       // 发送对图片的真正请求
       var img = new Image();
       img.src = `/carimages/`+str;
       var self = this;
       // 监视load
       img.onload = function(){
          $(self.refs.inner).removeClass('loading');
            // 显示
            $(self.refs.bigimg).attr("src",img.src).css({
                "max-width":"90%",
                "max-height":"90%"
           });
       };
       // 预加载
       // 把所有的图片集展开成一维数组
      this.pretreatmentArr = nextProps.carpics.view.map(item=>{
        return "view/"+item;
      }).concat(
            nextProps.carpics.inner.map(item=>{
                return "inner/"+item;
            }),
            nextProps.carpics.engine.map(item=>{
                return "engine/"+item;
            }),
            nextProps.carpics.more.map(item=>{
                return "more/"+item;
            }),
      );
      // 得到图片的当前的位置
      this.currentPosition = this.pretreatmentArr.indexOf(nextProps.nowalbum+"/"+nextProps.carpics[nextProps.nowalbum][nextProps.nowidx]);
      // 预读后三张
      const preRead = this.currentPosition + 3 < this.pretreatmentArr.length-1 ? this.currentPosition + 3 :  this.pretreatmentArr.length-1;

      for (let i = this.currentPosition; i < preRead; i++) {
            let preReadImg = new Image();
            preReadImg.src = "./carimages/"+nextProps.id+"/"+this.pretreatmentArr[i+1];
      };
    }
    render() {

        // 解构
        const {id,nowalbum,carpics,nowidx} = this.props;
        if(!carpics[nowalbum].length) return null;
        var url = `/carimages/${id}/${nowalbum}/${carpics[nowalbum][nowidx]}`;
        return (
            <div className="bigimagebox">
                <div className="inner" ref="inner">
                    <img ref="bigimg" className="bigimg"/>
                    <div className="leftBtn" onClick={()=>{ this.props.dispatch({"type":"picshow/goPrev"})}}></div>
                    <div className="rightBtn" onClick={()=>{ this.props.dispatch({"type":"picshow/goNext"})}}></div>
                </div>
            </div>
        );
    }
}
export default connect(
    ({picshow})=>({
        id:picshow.id,
        nowalbum:picshow.nowalbum,
        carpics:picshow.carpics,
        nowidx:picshow.nowidx
    })
)(BigImage);
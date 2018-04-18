import React from 'react';
import {connect} from "dva";
class CarLike extends React.Component {
    constructor(props) {
        super(props);
        // 初始值
        this.bTop = 0;
    }
    // 组件DOM上树后
    componentDidMount(){
        var self = this;
        // 拖拽
        $(this.refs.b).draggable({
            // 限制盒子
            "containment":"parent",
            // 获取b此时移动的值
            "drag":function(event,ui){
                // 得到b的top值
                self.bTop = ui.position.top;
                // 改变content的top
                $(self.refs.listcontent).css("top",-self.bTop*self.rate);
            }
        });

        // 鼠标滚动事件
        $(this.refs.listpanel).mousewheel(function(event,delta){
            if(delta < 0){
                // 改变btop
                self.bTop += 10;
                // 验收滚动范围
                if( self.bTop > self.bMaxTop){
                    self.bTop = self.bMaxTop;
                }
            }else if( delta > 0){
                // 改变btop
                self.bTop -= 10;
                // 验收滚动范围
                if( self.bTop < 0){
                    self.bTop = 0;
                }
            };
            $(self.refs.b).css("top",self.bTop);
            $(self.refs.listcontent).css("top",-self.bTop*self.rate);

        });
    }
    //当组件收到信的carlike列表的时候重新导致render的渲染，重新计算内容盒子的高度
    componentDidUpdate(nextProps){
        // 获取内容高度和盒子的高度
        const listpanelHeight = $(this.refs.listpanel).height();
        const listcontentHeight = $(this.refs.listcontent).height();
        // 比例
        this.rate = listcontentHeight / listpanelHeight;
        if(!this.rate) return;
        // 根据rate小于了1，说明不需要滚动了
        if(this.rate < 1){
            $(this.refs.bar).hide();
        }else {
            $(this.refs.bar).show();
        }
        // b的高度
        const bHeight = listpanelHeight / this.rate;
        // 允许滑动b的最高高度
        this.bMaxTop = listpanelHeight - bHeight;
        // 设置b的高度
        $(this.refs.b).css("height",bHeight);
    }
    render() {
        return (
            <div className="carlikebox">
                <h3>更多为您推荐的{this.props.carinfo.brand}{this.props.carinfo.series}</h3>
                <div className="listpanel" ref="listpanel">
                    <div className="listcontent" ref="listcontent">
                       {
                        this.props.carlike.map(item=>{
                            let buyyear = new Date(item.buydata).getFullYear();
                            return <p
                                key = {item.id}
                                onClick = {()=>{
                                    this.props.dispatch({"type":"picshow/changeIdAsync","id":item.id});
                                }}
                            >
                            {item.color}色{buyyear}年{item.km}公里{item.price}万元{item.engine}排量
                            </p>
                        })
                       }
                    </div>
                    <div className="bar" ref ="bar">
                        <b ref="b"></b>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(
    ({picshow})=>({
        carlike : picshow.carlike,
        carinfo : picshow.carinfo
    })
)(CarLike);
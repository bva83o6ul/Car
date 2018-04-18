import React from 'react';
import {connect} from "dva";
import classnames from "classnames";
class SmallPicNav extends React.Component {

    constructor(props) {
        super(props);
    }
    // 组件上树之后
    componentDidMount(){
        var self = this;
        // 事件委托
        $(this.refs.unit).on("click","li",function(){
            self.props.dispatch({"type":"picshow/changeNowidx","nowidx":$(this).data("n")})
        });
        // 事件委托
        $(this.refs.pagebar).on("click","span",function(){
            $(self.refs.unit).css({"left":-280*$(this).data("i")});
            // 给自己加cur
            $(this).addClass('cur').siblings().removeClass('cur');
        })
    };
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
    render() {
        const {nowidx,id,nowalbum,carpics} = this.props;
        // 获取当前图集的名字
        const theAlbumPicArr = carpics[nowalbum];
        // 总页数
        const pageAmount = Math.ceil(theAlbumPicArr.length/4);
        // 一位数组的数据，要展开为二维的形式，就要slice，这个就是“套路”。
        const showUlLis = ()=>{
            var arr = [];
            for (let i = 0; i < pageAmount; i++) {
                arr.push(
                        <ul key={i}>
                           {
                             theAlbumPicArr.slice(i*4,i*4+4).map((item,index)=>{
                                var number = i * 4 + index;
                                return <li
                                    key ={number}
                                    className = {classnames({"cur":number==nowidx})}
                                    data-n={number}
                                >
                                <img
                                    src={`/carimages_small/${id}/${nowalbum}/${theAlbumPicArr[number]}`}
                                />
                                </li>
                             })
                           }
                        </ul>
                    )
            };
            return arr;
        };
        // 计算当前nowidx在第几页显示。页码从0开始
        const nowpage = parseInt(nowidx / 4);
        // 决定unit的left要移动多少
        $(this.refs.unit).css({"left":-280 * nowpage})
        // 显示轮播图分页条
        const showRect = ()=>{
            var arr = [];
            for (var i = 0; i < pageAmount; i++) {
                arr.push(
                    <span
                        key={i}
                        className = {classnames({"cur":nowpage ==i })}
                        style={{"width":278/pageAmount -10 + "px"}}
                        data-i={i}
                    >
                    </span>
                )
            };
            return arr;
        }
        return (
            <div className="smallpicnav">
                <div className="unit" ref="unit">
                    {showUlLis()}
                </div>
                <div className="pagebar" ref="pagebar">
                    {showRect()}
                </div>
            </div>
        );
    }
}
export default connect(
    ({picshow})=>({
        carpics : picshow.carpics,
        id:picshow.id,
        nowalbum:picshow.nowalbum,
        nowidx:picshow.nowidx
    })
)(SmallPicNav);


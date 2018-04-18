import React from 'react';
import {connect} from "dva";
import { Tag } from 'antd';
class Dangqian extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var arr = [];
        this.props.filters.forEach(item=>{
            if(item.filter_name == "brand"){
                arr.push(
                    <Tag key="brand" closable onClose={()=>{
                        this.props.dispatch({"type":"carlist/removeFilter","filter_name":"brand"});
                        this.props.dispatch({"type":"carlist/removeFilter","filter_name":"series"});
                    }}>
                        品牌 ：{item.value}
                    </Tag>
                )
            }else if( item.filter_name == "series" ){
                arr.push(
                    <Tag key="series" closable onClose={()=>{
                        this.props.dispatch({"type":"carlist/removeFilter","filter_name":"series"});
                    }}>
                        车系 ：{item.value}
                    </Tag>
                )
            }else if( item.filter_name == "price" ){
                arr.push(
                    <Tag key="price" closable onClose={()=>{
                        this.props.dispatch({"type":"carlist/removeFilter","filter_name":"price"});
                        // 告诉父亲，还原自己
                        this.props.setPrice([0,100])
                    }}>
                        售价 ：{item.value[0]} 万元 到 {item.value[1]}万元
                    </Tag>
                )
            }else if( item.filter_name == "km" ){
                arr.push(
                    <Tag key="km" closable onClose={()=>{
                        this.props.dispatch({"type":"carlist/removeFilter","filter_name":"km"});
                        // 告诉父亲，还原自己
                        this.props.setKm([0,100])
                    }}>
                        公里数 ：{item.value[0]} 万公里 到 {item.value[1]}万公里
                    </Tag>
                )
            }else if( item.filter_name == "type" ){
                arr.push(
                    <Tag key="type" closable onClose={()=>{
                        this.props.dispatch({"type":"carlist/removeFilter","filter_name":"type"});

                    }}>
                        车型 ：{item.value.join(" 、 ")}
                    </Tag>
                )
            }else if( item.filter_name == "color" ){
                arr.push(
                    <Tag key="color" closable onClose={()=>{
                        this.props.dispatch({"type":"carlist/removeFilter","filter_name":"color"});

                    }}>
                        颜色 ：{item.value.join(" 、 ")}
                    </Tag>
                )
            }else if( item.filter_name == "engine" ){
                arr.push(
                    <Tag key="engine" closable onClose={()=>{
                        this.props.dispatch({"type":"carlist/removeFilter","filter_name":"engine"});

                    }}>
                        排量 ：{item.value.join(" 、 ")}
                    </Tag>
                )
            }else if( item.filter_name == "seat" ){
                arr.push(
                    <Tag key="seat" closable onClose={()=>{
                        this.props.dispatch({"type":"carlist/removeFilter","filter_name":"seat"});

                    }}>
                        座位数 ：{item.value.join(" 、 ")}
                    </Tag>
                )
            }else if( item.filter_name == "buydata" ){
                arr.push(
                    <Tag key="buydata" closable onClose={()=>{
                        this.props.dispatch({"type":"carlist/removeFilter","filter_name":"buydata"});

                    }}>
                        购买日期 ：{item.value[0]} 到 {item.value[1]}
                    </Tag>
                )
            }else if( item.filter_name == "pai" ){
                arr.push(
                    <Tag key="pai" closable onClose={()=>{
                        this.props.dispatch({"type":"carlist/removeFilter","filter_name":"pai"});

                    }}>
                        是否上牌 ：{item.value}
                    </Tag>
                )
            }else if( item.filter_name == "local" ){
                arr.push(
                    <Tag key="local" closable onClose={()=>{
                        this.props.dispatch({"type":"carlist/removeFilter","filter_name":"local"});

                    }}>
                        是否本地车 ：{item.value}
                    </Tag>
                )
            }
        })
        return (
            <div>
                {arr}
            </div>
        );
    }
}
export default connect(
    ({carlist})=>({
        filters:carlist.filters
    })

)(Dangqian);

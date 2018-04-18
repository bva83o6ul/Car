import React from 'react';
import {connect} from "dva";
// 引入样式表
import "./carlist.less";
// 引入组件
import FilterBox from "./FilterBox.js";
import TableBox from "./TableBox.js";
import PicShow from "../picshow/index.js";
class CarList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "isShowTanChuCeng":false
        }

        // 拉取默认的数据
        props.dispatch({"type":"carlist/fetchData"})
    }
    // 设置state的值
    setShowTanChuCeng(isShowTanChuCeng){
        this.setState({
            isShowTanChuCeng
        })
    }
    render() {
        return (
            <div className = "carlist">
                <FilterBox></FilterBox>
                <TableBox setShowTanChuCeng={this.setShowTanChuCeng.bind(this)}></TableBox>
                {
                    this.state.isShowTanChuCeng
                    ?
                    <div className="tanchuceng">
                        <div className="mask"></div>
                        <div className ="inner">
                            <a href="javascript:void(0);" className="closeBtn" onClick={()=>{
                                this.setShowTanChuCeng(false);
                            }}>X</a>
                            <PicShow></PicShow>
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}
export default connect(
    (state)=>({

    })
)(CarList);


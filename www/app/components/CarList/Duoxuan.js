import React from 'react';
import {connect} from "dva";
import { Checkbox } from "antd"
class Duoxuan extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Checkbox.Group
                    value = {this.props.value}
                    onChange={(value)=>{
                         this.props.dispatch({"type":"carlist/addOrchangeFilter","filter_name":this.props.filter_name,"value":value})
                    }}
                >
                     {
                        this.props.options.map(item=>{
                            return <Checkbox value={item} key={item}>{item}</Checkbox>
                        })
                     }

                 </Checkbox.Group>
            </div>
        );
    }
}
export default connect()(Duoxuan);
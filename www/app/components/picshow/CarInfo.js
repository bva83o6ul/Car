import React from 'react';
import {connect} from "dva";
 class CarInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const carinfo = this.props.carinfo;
        const buyYear = new Date(carinfo.buydata).getFullYear();
        return (
            <div className="carinfobox">
                <h3>{carinfo.brand}--{carinfo.series}<span>{carinfo.id}</span></h3>
                <h4>{carinfo.color}色{buyYear}年{carinfo.km}万公里{carinfo.price}万元{carinfo.engine}</h4>
            </div>
        );
    }
}
export default connect(
    ({picshow})=>({
        carinfo:picshow.carinfo
    })
)(CarInfo);
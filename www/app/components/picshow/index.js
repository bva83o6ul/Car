import React from 'react';
import {connect} from "dva";
import "./picshow.less";
import BigImage from "./BigImage.js";
import CarInfo from "./CarInfo.js";
import AlbumChooser from "./AlbumChooser.js";
import CarLike from "./CarLike.js";
import SmallPicNav from "./SmallPicNav.js";
class PicShow extends React.Component {

    constructor(props) {
        super(props);
        props.dispatch({"type":"picshow/fetchCarInfo"});
        props.dispatch({"type":"picshow/fetchCarLike"});
        props.dispatch({"type":"picshow/fetchCarPics"});
    }

    render() {
        return (
            <div className="picshow">
                <BigImage></BigImage>
                <div className="rightBar">
                    <CarInfo></CarInfo>
                    <AlbumChooser></AlbumChooser>
                    <CarLike></CarLike>
                    <SmallPicNav></SmallPicNav>
                </div>
            </div>
        );
    }
}
export default connect(
    (state)=>{
        return{
            state
        }
    }
)(PicShow);
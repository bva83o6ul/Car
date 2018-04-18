import React from 'react';
import {connect} from "dva";
import classnames from "classnames";
class AlbumChooser extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const carpics = this.props.carpics;
        const nowalbum = this.props.nowalbum;
        const dispatch = this.props.dispatch;
        return (
            <div className="albumchooer">
                <a  href="javascript:void(0);"
                    className={classnames({"cur":nowalbum == "view"})}
                    onClick = {()=>{
                        dispatch({"type":"picshow/changeNowAlbum","nowalbum":"view"})
                    }}
                >外观{carpics.view.length}</a>
                <a
                    href="javascript:void(0);"
                    className={classnames({"cur":nowalbum == "inner"})}
                    onClick = {()=>{
                        dispatch({"type":"picshow/changeNowAlbum","nowalbum":"inner"})
                    }}
                    >内饰{carpics.inner.length}</a>
                <a
                    href="javascript:void(0);"
                    className={classnames({"cur":nowalbum == "engine"})}
                    onClick = {()=>{
                        dispatch({"type":"picshow/changeNowAlbum","nowalbum":"engine"})
                    }}
                >结构和发动机{carpics.engine.length}</a>
                <a
                    href="javascript:void(0);"
                    className={classnames({"cur":nowalbum == "more"})}
                    onClick = {()=>{
                        dispatch({"type":"picshow/changeNowAlbum","nowalbum":"more"})
                    }}
                    >更多细节{carpics.more.length}</a>
            </div>
        );
    }
}
export default connect(
    ({picshow})=>({
        carpics:picshow.carpics,
        nowalbum:picshow.nowalbum
    })
)(AlbumChooser);
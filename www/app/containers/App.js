import React from 'react';
import {connect} from "dva";
import "./App.less";
import PicShow from "../components/picshow/index.js";
import CarList from "../components/CarList/index.js";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="app">
                <CarList></CarList>
            </div>
        );
    }
}
export default connect()(App);
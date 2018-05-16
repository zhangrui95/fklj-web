import React, {Component} from 'react'
import {mainReducer} from "../../reducers/reducers";
import {connect} from "react-redux";
import {Header} from "../../components/Header";

//样式
const font = {
    fontSize: 30, color:"rgb(231, 231, 231)" , marginBottom: 10,marginTop: 250, textAlign: 'center'
}

export class ComePerson extends Component{


    render(){
        return(
            <div style={{color:"#FFF"}}>
                <p style={font}>{this.props.context !== undefined ? this.props.context: '功能开发中...'}</p>
            </div>

        );
    }
}

export default connect(mainReducer)(ComePerson);
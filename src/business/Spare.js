/*
 洛阳备用的功能开发页面
 */
import React, {Component} from 'react'
import {mainReducer} from "../reducers/reducers";
import {connect} from "react-redux";
import {Header} from "../components/Header";
import EchartsReact from 'echarts-for-react';
//import {fetchUsersData} from "../actions/actions";
import {store} from '../index.js';

//样式
const font = {
    fontSize: 30, color:"rgb(231, 231, 231)" , marginBottom: 10,marginTop: 250, textAlign: 'center'
}

export class Spare extends Component{


    render(){
        return(
            <div style={{color:"#FFF",textAlign:'center'}}>
               {this.props.header === 'true' ? <Header /> :''}
               <p style={font}>{this.props.context !== undefined ? this.props.context: '功能开发中...'}</p>
            </div>
            
        );
    }
}

export default connect(mainReducer)(Spare);
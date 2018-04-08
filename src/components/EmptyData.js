//空数据展示组件
import {connect} from "react-redux";
import React, { Component, PropTypes } from 'react';

export class EmptyData extends Component{
  render(){
    return (
        <div style={{marginBottom:"40px"}}>
            <p style={{fontSize:"30px",color:"#e7e7e7",marginBottom:"10px",marginTop:"250px",textAlign:"center"}}>未找到相关数据</p>
        </div>
    )
  }
};



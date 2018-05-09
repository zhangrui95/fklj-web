/*
 呼市任务管理
 */
import React, {Component} from 'react'
import {mainReducer} from "../reducers/reducers";
import {connect} from "react-redux";
import {Header} from "../components/Header";
// import EchartsReact from 'echarts-for-react';
import {store} from '../index.js';
import {
    SliderMenuItem,
    Shade
} from "./generalPurposeModule";
import {changeMenu, initTaskManagementMenu} from "../actions/actions";
import {TaskMANAGEMENT_MODULE} from "../utils/Constants";
import {TaskManagementRight} from "./TaskManagementRight";
import WebSocket from './WebSocket';
// import  * as constants from "../utils/Constants";
//
// import  {Spare}  from "./Spare";
//样式
const font = {
    fontSize: 30, color:"rgb(231, 231, 231)" , marginBottom: 10,marginTop: 250, textAlign: 'center'
}

class TaskManagement extends Component{
    componentWillUnmount() { //销毁
        store.dispatch(initTaskManagementMenu(this.props.TaskManagement.uiData.menus))
    }

    //设置管理菜单点击-获取数据-开关事件
    handleMenuClick = (menu, type) => {
        store.dispatch(changeMenu(menu, type, TaskMANAGEMENT_MODULE));
    }

    render() {
        //遮罩状态
        let isBlock = store.getState().root.uiData.ModalDialogueBg;
        return (

            
            <div>
                <Shade isBlock={isBlock}/>
                <Header homeType="hs_fklj_sys"/>
                <div className="sileder_left">
                    <SliderMenuItem menus={store.getState().TaskManagement.uiData.menus}
                                    handleMenuClick={this.handleMenuClick}/>
                </div>

                <div className="sileder_right">
                    {/*<div>任务管理</div>*/}
                    <TaskManagementRight />
                </div>
                <div className="clear"></div>
                <WebSocket/>
            </div>

        );
    }
}



export default connect(mainReducer)(TaskManagement);
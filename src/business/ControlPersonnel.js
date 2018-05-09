/**
 * 呼市管控人员主页
 */
import React, {Component} from 'react'
import {mainReducer} from "../reducers/reducers";
import {connect} from "react-redux";
import {Header} from "../components/Header";
import WebSocket from './WebSocket';
import {store} from '../index.js';
import {
    SliderMenuItem,
    Shade
} from "./generalPurposeModule";
import {changeMenu, initControlPersonnelMenu} from "../actions/actions";
import {CONTROLPERSONNEL_MODULE} from "../utils/Constants";
import ControlPersonnelRight from "./ControlPersonnelRight"
//样式
const font = {
    fontSize: 30, color:"rgb(231, 231, 231)" , marginBottom: 10,marginTop: 250, textAlign: 'center'
}

class ControlPersonnel extends Component{
    // componentWillUnmount() { //销毁
    //     store.dispatch(initControlPersonnelMenu(this.props.TaskManagement.uiData.menus))
    // }
    //
    // //设置管理菜单点击-获取数据-开关事件
    handleMenuClick = (menu, type) => {
        store.dispatch(changeMenu(menu, type, CONTROLPERSONNEL_MODULE));
    }

    render() {
        //遮罩状态
        let isBlock = store.getState().root.uiData.ModalDialogueBg;
        let menusList = [];
        this.props.ControlPersonnel.uiData.menus.map((menu) =>  {
            if(menu.isShow) {
                menusList.push(menu);
            }
        })
        return (
            <div>
                <Shade isBlock={isBlock}/>
                <Header homeType="hs_fklj_sys"/>
                <div className="sileder_left">
                    <SliderMenuItem menus={menusList}
                                    handleMenuClick={this.handleMenuClick}/>
                </div>
                <div className="sileder_right">
                    <ControlPersonnelRight />
                </div>
                <div className="clear"></div>
                <WebSocket/>
            </div>

        );
    }
}



export default connect(mainReducer)(ControlPersonnel);
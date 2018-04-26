//卡点管理
import React, {Component} from 'react'
import {connect} from "react-redux";
import AreaManagementRight from "./AreaManagementRight";
import {changeMenu, initAreaManagementCenterMenu} from "../actions/actions";
import {store} from '../index.js';
import {mainReducer} from "../reducers/reducers";
import {AREAMANAGEMENT_MODULE} from "../utils/Constants";
import  * as constants from "../utils/Constants";
import {Header} from "../components/Header";
import {
    SliderMenuItem,
    Shade
} from "./generalPurposeModule";
import WebSocket from './WebSocket';
class AreaManagement extends Component {
    componentDidMount() {
        console.log('this.props.AreaManagement', this.props.AreaManagement);
    }
    componentWillUnmount() { //销毁
        store.dispatch(initAreaManagementCenterMenu(this.props.AreaManagement.uiData.menus))
    }

    //动态管控菜单点击-获取数据-开关事件
    handleMenuClick = (menu,type) => {
        store.dispatch(changeMenu(menu,type,AREAMANAGEMENT_MODULE));
    }
    render(){
        let isBlock = store.getState().root.uiData.ModalDialogueBg;
        return (
            <div style={{overflow:'hidden',width:"100%"}}>
                <Shade isBlock={isBlock}/>
                <Header />
                <div  className="sileder_left">
                    <SliderMenuItem  menus={this.props.AreaManagement.uiData.menus}
                                     handleMenuClick={this.handleMenuClick}   />
                </div>
                <div  className="sileder_right">
                    <AreaManagementRight />
                </div>
                <div className="clear"></div>
                <WebSocket/>
            </div>

        );
    }
}

export default connect(mainReducer)(AreaManagement);
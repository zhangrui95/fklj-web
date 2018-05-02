/**
 * 设置管理
 */
import React, {Component} from 'react'
import {mainReducer} from "../reducers/reducers";
import {connect} from "react-redux";
import {store} from '../index.js';
import {
    StylePage,
    ShallowBlueBtn,
    DeepRedBtn,
    Input,
    DeepBlueBtn,
    PhotoItem,
    Pag,
    SliderMenuItem,
    Shade
} from "./generalPurposeModule";
import {fetchUsersData, changeMenu, initSyetemSetupMenu} from "../actions/actions";
import {SYSREMSETUP_MODULE} from "../utils/Constants";
import SystemSetupRight from "./SystemSetupRight";
import  * as constants from "../utils/Constants";
import {Header} from "../components/Header";
import WebSocket from './WebSocket';
import {
    fetchPlaceOfInfluxPersonData,
    fetchPlaceOfOriginPersonData,
    fetchWhiteListData,
    fetchBlackListData,
    getExceptionParameterReminderData,
    fetchInterrogationInformationData,
    fetchHorrorSoftwareData,
    getHorrorSoftwareData,
    fetchHighRiskLineData,
    fetchHighRiskCitiesData,
    postExceptionParameterReminderData,
    GetRedList,
    saveRedList
} from "../actions/SystemSetup";
import {Spare} from './Spare.js';
class SystemSetup extends Component {
    componentWillUnmount() { //销毁
        store.dispatch(initSyetemSetupMenu(this.props.SystemSetup.uiData.menus))
    }

    //设置管理菜单点击-获取数据-开关事件
    handleMenuClick = (menu, type) => {
        store.dispatch(changeMenu(menu, type, SYSREMSETUP_MODULE));
    }

    render() {
        //遮罩状态
        let isBlock = store.getState().root.uiData.ModalDialogueBg;
        let menus = [];
        this.props.SystemSetup.uiData.menus.map((menu) =>  {
            if(menu.isShow){
                menus.push(menu);
            }
        })
        return (
            <div>
                <Shade isBlock={isBlock}/>
                <Header homeType="hs_fklj_sys"/>
                <div className="sileder_left">
                    <SliderMenuItem menus={menus}
                                    handleMenuClick={this.handleMenuClick}/>
                </div>
                <div className="sileder_right">
                    <SystemSetupRight/>
                </div>
                <div className="clear"></div>
                <WebSocket/>
            </div>

        );
    }
}

export default connect(mainReducer)(SystemSetup);
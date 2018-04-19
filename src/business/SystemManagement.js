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
import {fetchUsersData, changeMenu, initSystemManagementMenu} from "../actions/actions";
import {SYSTEMMANAGEMENT_MODULE} from "../utils/Constants";
import SystemManagementRight from "./SystemManagementRight";
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
} from "../actions/SystemManagement";
import {Spare} from './Spare.js';
class SystemManagement extends Component {
    componentWillUnmount() { //销毁
        store.dispatch(initSystemManagementMenu(this.props.SystemManagement.uiData.menus))
    }

    //设置管理菜单点击-获取数据-开关事件
    handleMenuClick = (menu, type) => {
        store.dispatch(changeMenu(menu, type, SYSTEMMANAGEMENT_MODULE));

        switch (menu.menuName) {
            case constants.SYSTEMMANAGEMENT_MENU_HORRORSOFTWARE:
                // this.props.dispatch(getHorrorSoftwareData('/getHorrorSoftware'));
                break
            case constants.SYSTEMMANAGEMENT_MENU_INTERROGATIONINFORMATION:
                // this.props.dispatch(fetchInterrogationInformationData('/getInterrogationInformation'));
                break
            case constants.SYSTEMMANAGEMENT_MENU_BLACKLIST:
                // this.props.dispatch(fetchBlackListData('/getBlackList'));
                break
            case constants.SYSTEMMANAGEMENT_MENU_WHITELIST:
                // this.props.dispatch(fetchWhiteListData('/getWhiteList'));
                break
            //
            // case constants.SYSTEMMANAGEMENT_MENU_HIGHRISK_CITIES:
            //     this.props.dispatch(fetchHighRiskCitiesData('/getHighRiskCities'));
            //     break
            case constants.SYSTEMMANAGEMENT_MENU_HIGHRISKAREA:
                // this.props.dispatch(fetchHighRiskLineData('/getHighRiskLine'));
                break
            case constants.SYSTEMMANAGEMENT_MENU_PLACEOFORIGINPERSON:
                // this.props.dispatch(fetchPlaceOfOriginPersonData('/getPlaceOfOriginPerson'));
                break
            case constants.SYSTEMMANAGEMENT_MENU_PLACEOFINFLUXPERSON:
                // this.props.dispatch(fetchPlaceOfInfluxPersonData('/getPlaceOfInfluxPerson'));
                break
            
            case constants.SYSTEMMANAGEMENT_MENU_ABNORMALEMINDER:
                
                break
            case constants.SYSTEMMANAGEMENT_MENU_REDLIST:
                let creds = {
                    currentPage: 1,
                    pd: {},
                    showCount: 10
                }
              this.props.dispatch(GetRedList(creds));
              break
              case constants.SYSTEMMANAGEMENT_MENU_CODE:
              // this.props.dispatch(fetchPlaceOfInfluxPersonData('/getPlaceOfInfluxPerson'));
              break
            default:
                break
        }

    }

    render() {
        //遮罩状态
        let isBlock = store.getState().root.uiData.ModalDialogueBg;
        return (
            <div>
                <Shade isBlock={isBlock}/>
                <Header />
                <div className="sileder_left">
                    <SliderMenuItem menus={this.props.SystemManagement.uiData.menus}
                                    handleMenuClick={this.handleMenuClick}/>
                </div>

                <div className="sileder_right">
                    <SystemManagementRight/>
                </div>
                {/*<Spare header='true'/>*/}
                <div className="clear"></div>
                <WebSocket/>
            </div>

        );
    }
}

export default connect(mainReducer)(SystemManagement);
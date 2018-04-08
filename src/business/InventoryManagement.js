/**
 * create by zy 2017-07-27
 */
// 盘查管理主页面
import React, {Component} from 'react'
import {mainReducer} from "../reducers/reducers";
import {connect} from "react-redux";
import {store} from '../index.js';
import {
    SliderMenuItem,
    Shade
} from "./generalPurposeModule";
import {fetchUsersData, changeMenu, initInventoryManagementMenu} from "../actions/actions";
import {INVENTORYMANAGEMENT_MODULE} from "../utils/Constants";
import InventoryManagementRight from "./InventoryManagementRight";
import  * as constants from "../utils/Constants";
import {Header} from "../components/Header";
import {
    fetchPersonnelInventoryData,fetchCarInventoryData,fetchBayonetInventoryData
} from "../actions/InventoryManagement";
class InventoryManagement extends Component {
    componentWillUnmount() { //销毁
        store.dispatch(initInventoryManagementMenu(this.props.InventoryManagement.uiData.menus))
    }

    //设置管理菜单点击-获取数据-开关事件
    handleMenuClick = (menu, type) => {
        store.dispatch(changeMenu(menu, type, INVENTORYMANAGEMENT_MODULE));
    }

    render() {
        //遮罩状态
        let isBlock = store.getState().root.uiData.ModalDialogueBg;
        return (
            <div>
                <Shade isBlock={isBlock}/>
                <Header />
                <div className="sileder_left">
                    <SliderMenuItem menus={this.props.InventoryManagement.uiData.menus}
                                    handleMenuClick={this.handleMenuClick}/>
                </div>

                <div className="sileder_right">
                    <InventoryManagementRight/>
                </div>
                <div className="clear"></div>
            </div>

        );
    }
}

export default connect(mainReducer)(InventoryManagement);

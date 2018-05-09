/**
 * 呼市管控人员右侧
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../reducers/reducers";
import {Control}  from "./ControlPersonnel/Control";
import {store} from '../index.js';
import  * as constants from "../utils/Constants";

class ControlPersonnelRight extends Component{
    render(){
        let isSelectMenu, haveSonMenu;
        let content;
        //查找被选中菜单
        store.getState().ControlPersonnel.uiData.menus.forEach(function(menu){
            if (menu.isSelect === true) { //判断一级目录是否选中
                isSelectMenu = menu;
                return
            }
            if (menu.haveSon === true) {
                haveSonMenu = menu;
                haveSonMenu.sonMenu.forEach(function(sonMenu) {
                    // if(sonMenu.isShow){
                        if (sonMenu.isSelect) {
                            isSelectMenu = sonMenu;
                            return
                        }
                    // }
                })
            }
        });
        switch(isSelectMenu.menuName){
            case constants.CONTROLPERSONNEL_MODULE_GZ_NLHRY:
                // content = <ComePerson/>
                content = <Control controlType="GZ_NLHRY"/>
                break
            case constants.CONTROLPERSONNEL_MODULE_GZ_ZALY:
                // content = <PublicSecurity/>
                content = <Control controlType="GZ_ZALY"/>
                break
            case constants.CONTROLPERSONNEL_MODULE_GK_WGK:
                // content = <NotControlled/>
                content = <Control controlType="GK_WGK"/>
                break
            case constants.CONTROLPERSONNEL_MODULE_GK_YGK:
                content = <Control controlType="GK_YGK"/>
                break
            case constants.CONTROLPERSONNEL_MODULE_GK_LKZRQ:
                // content = <LeaveArea/>
                content = <Control controlType="GK_LKZRQ"/>
                break
            case constants.CONTROLPERSONNEL_MODULE_GK_SK:
                // content = <RunAway/>
                content = <Control controlType="GK_SK"/>
                break
            case constants.CONTROLPERSONNEL_MODULE_DR:
                // content = <WithdrawPerson/>
                content = <Control controlType="LY_DR"/>
                break
            case constants.CONTROLPERSONNEL_MODULE_XZ:
                // content = <AddPerson/>
                content = <Control controlType="LY_XZ"/>
                break
            default:
                break
        }
        return(
            <div>
                {content}
            </div>
        );
    }
};


export default connect(mainReducer)(ControlPersonnelRight);
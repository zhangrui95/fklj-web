/**
 * 设置管理右侧
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../reducers/reducers";
import {ComePerson}  from "./ControlPersonnel/ComePerson";
import {PublicSecurity}  from "./ControlPersonnel/PublicSecurity";
import {ControlPersonnel}  from "./ControlPersonnel/ControlPersonnel";
import {WithdrawPerson}  from "./ControlPersonnel/WithdrawPerson";
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
                content = <ComePerson/>
                break
            case constants.CONTROLPERSONNEL_MODULE_GZ_ZALY:
                content = <PublicSecurity/>
                break
            case constants.CONTROLPERSONNEL_MODULE_GK:
                content = <ControlPersonnel/>
                break
            case constants.CONTROLPERSONNEL_MODULE_YCC:
                content = <WithdrawPerson/>
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
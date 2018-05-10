/**
 * 呼市系统设置右侧
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../reducers/reducers";
import {AddSystem}  from "./SystemSetup/AddSystem";
import {store} from '../index.js';
import  * as constants from "../utils/Constants";

class SystemSetupRight extends Component{
    render(){
        let isSelectMenu, haveSonMenu;
        let content;
        //查找被选中菜单
        store.getState().SystemSetup.uiData.menus.forEach(function(menu){
            if (menu.isSelect === true) { //判断一级目录是否选中
                isSelectMenu = menu;
                return
            }
            if (menu.haveSon === true) {
                haveSonMenu = menu;
                haveSonMenu.sonMenu.forEach(function(sonMenu) {
                    if (sonMenu.isSelect) {
                        isSelectMenu = sonMenu;
                        return
                    }
                })
            }
        });
        switch(isSelectMenu.menuName){
            case constants.SYSREMSETUP_MODULE_TIME:
                content = <AddSystem/>
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


export default connect(mainReducer)(SystemSetupRight);
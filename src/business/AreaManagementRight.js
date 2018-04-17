/**
 * 设置管理右侧
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../reducers/reducers";
import {AreaManage}  from "./AreaManagement/AreaManage";
import {store} from '../index.js';
import  * as constants from "../utils/Constants";

class AreaManagementRight extends Component{
    render(){
        let isSelectMenu;
        let content;
        //查找被选中菜单
        store.getState().AreaManagement.uiData.menus.forEach(function(menu){
            if(menu.isSelect === true){//判断一级目录是否选中
                isSelectMenu = menu;
                return
            }

        });
        switch(isSelectMenu.menuName){
            case constants.AREAMANAGEMENT_MODULE:
                content = <AreaManage/>
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


export default connect(mainReducer)(AreaManagementRight);
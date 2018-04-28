/**
 * create by zy 2017-07-27
 */
//盘查管理右侧页面
import React, {Component} from 'react'
import {mainReducer} from "../reducers/reducers";
import {connect} from "react-redux";
import {store} from '../index.js';
import  {PersonnelInventory}  from "./InventoryManagement/PersonnelInventory";
import  {CarInventory}  from "./InventoryManagement/CarInventory";
import {fetchPersonnelInventoryData,fetchCarInventoryData,fetchBayonetInventoryData
} from "../actions/InventoryManagement";
import  * as constants from "../utils/Constants";


class InventoryManagementRight extends Component{
    componentDidMount() {
    }
    render(){
        let isSelectMenu,haveSonMenu;
        let content;
        //查找被选中菜单
        this.props.InventoryManagement.uiData.menus.forEach(function(menu){
            if(menu.isSelect === true){//判断一级目录是否选中
                isSelectMenu = menu;
                return
            }
            if(menu.haveSon === true){
                haveSonMenu = menu;
            }
            haveSonMenu.sonMenu.forEach(function(sonMenu){
                if(sonMenu.isSelect){
                    isSelectMenu = sonMenu;
                    return
                }
            })
        });
        console.log('isSelectMenu',isSelectMenu)
        switch(isSelectMenu.id){ //赋值显示页面
            case '101'://人员盘查-巡逻
                content = <PersonnelInventory   type={constants.inventoryType.patrolPerson}  />
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
}
export default connect(mainReducer)(InventoryManagementRight);

/**
 * 呼市反恐利剑数据统计右侧
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../reducers/reducers";
import {StylePage,ShallowBlueBtn,DeepRedBtn,Input,DeepBlueBtn,PhotoItem,Pag,SelectModel,TextArea,Shade} from "./generalPurposeModule";
import {store} from '../index.js';
import  * as constants from "../utils/Constants";
import PopulationStatistics from "./ReportForms/PopulationStatistics";
import TaskStatistics from "./ReportForms/TaskStatistics";
import ActivityStatistics from "./ReportForms/ActivityStatistics";

class ReportFormsRight extends Component{
    render(){
        let isSelectMenu;
        let content;
        //查找被选中菜单
        this.props.ReportForms.uiData.menus.forEach(function(menu){
            if(menu.isSelect === true){//判断一级目录是否选中
                isSelectMenu = menu;
                return
            }
        });
        switch(isSelectMenu.menuName){
            case constants.REPORTFORMS_MENU_POPULATIONS:
                content = <PopulationStatistics  />
                break
            case constants.REPORTFORMS_MENU_TASKS:
                content =<TaskStatistics />
                break
            // case constants.REPORTFORMS_MENU_ACTIVITYS:
            //     content =<ActivityStatistics />
            //     break

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

export default connect(mainReducer)(ReportFormsRight);
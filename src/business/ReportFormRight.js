/**
 * 统计报表右侧
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../reducers/reducers";
import {StylePage,ShallowBlueBtn,DeepRedBtn,Input,DeepBlueBtn,PhotoItem,Pag,SelectModel,TextArea,Shade} from "./generalPurposeModule";
import {store} from '../index.js';
import  * as constants from "../utils/Constants";
import PopulationStatistics from "./ReportForm/PopulationStatistics";
import TaskStatistics from "./ReportForm/TaskStatistics";
import ActivityStatistics from "./ReportForm/ActivityStatistics";

class ReportFormRight extends Component{
    render(){
        let isSelectMenu;
        let content;
        //查找被选中菜单
        this.props.ReportFormChart.uiData.menus.forEach(function(menu){
            if(menu.isSelect === true){//判断一级目录是否选中
                isSelectMenu = menu;
                return
            }
        });
        switch(isSelectMenu.menuName){
            case constants.REPORTFORMS_MENU_POPULATION:
                content = <PopulationStatistics  />
                break
            case constants.REPORTFORMS_MENU_TASK:
                content =<TaskStatistics />
                break
            case constants.REPORTFORMS_MENU_ACTIVITY:
                content =<ActivityStatistics />
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

export default connect(mainReducer)(ReportFormRight);
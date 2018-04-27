//任务管理右侧页面
import React, {Component} from 'react'
import {mainReducer} from "../reducers/reducers";
import {connect} from "react-redux";
import {store} from '../index.js';
import  {PointTask}  from "./TaskManagement/PointTask";
import  {PatrolTask}  from "./TaskManagement/PatrolTask";
import  {DoneTask}  from "./TaskManagement/DoneTask";
import  {OverTask}  from "./TaskManagement/OverTask";

// import {fetchTaskStatisticsData,fetchTaskHistoryData
// } from "../../actions/Luoyang/DefineWarehouse";
import  * as constants from "../utils/Constants";

export class TaskManagementRight extends Component{
    componentDidMount() {
       
    }
    render(){
        let isSelectMenu;
        let content;
        //查找被选中菜单
        store.getState().TaskManagement.uiData.menus.forEach(function(menu){
            if(menu.isSelect === true){//判断一级目录是否选中
                isSelectMenu = menu;
                return
            }

        });
        switch(isSelectMenu.menuName){
            case constants.TASKMANAGEMENT_MENU_POINT:
                content = <PointTask />
                break
            case constants.TASKMANAGEMENT_MENU_PATROL:
                content = <PatrolTask />
                break
            case constants.TASKMANAGEMENT_MENU_DONE:
                content = <DoneTask />
                break
            case constants.TASKMANAGEMENT_MENU_OUT:
                content = <OverTask />
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


export default connect(mainReducer)(TaskManagementRight);

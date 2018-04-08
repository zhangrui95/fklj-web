/**
 * 个人中心右侧
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../reducers/reducers";
import {PostPersonCenterData} from "../actions/PersonalCenter";
import {StylePage,ShallowBlueBtn,DeepRedBtn,Input,DeepBlueBtn,PhotoItem,Pag} from "./generalPurposeModule";
import {store} from '../index.js';
import  * as constants from "../utils/Constants";
import  {PersonalContent}  from "./PersonalCenter/PersonalContent";
import  {PersonalContentfollow}  from "./PersonalCenter/PersonalContentfollow";
import  {PersonalContentJudge}  from "./PersonalCenter/PersonalContentJudge";

// 样式
const sliderdyHeader = {
    borderBottom:"1px solid #0C5F93",
    padding:"18px 0"
}
const font14 = {
    fontSize: "14px",
    color: "#fff"
}

class PersonalCenterRight extends Component{
   
    componentDidMount() {
   }
    
    render(){
       let isSelectMenu,haveSonMenu;
        let content;
        //查找被选中菜单
        this.props.PersonalCenter.uiData.menus.forEach(function(menu){
            if(menu.isSelect === true){//判断一级目录是否选中
                isSelectMenu = menu;
                return
            }
            // if(menu.haveSon === true){
            //     haveSonMenu = menu;
            // }
            // haveSonMenu.sonMenu.forEach(function(sonMenu){
            //     if(sonMenu.isSelect){
            //         isSelectMenu = sonMenu;
            //         return
            //     }
            // })
        });
        switch(isSelectMenu.id){ //赋值显示页面
            case '101'://我的盘查
                content = <PersonalContent   type={constants.personalCenterType.myInventory}  />
                break
            case '102'://我的收藏
                content = <PersonalContentfollow  type={constants.personalCenterType.myFollow}   />
                break
            case '106'://我的研判
                content = <PersonalContentJudge   type={constants.personalCenterType.myJudge}  />
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




export default connect(mainReducer)(PersonalCenterRight);

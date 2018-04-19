/**
 * Created by zy on 2017/5/8.
 */
//智能检索右侧组件
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {mainReducer} from "../reducers/reducers";

import {fetchIntelligentRetrievalData,initIntelligentRetrievalData} from "../actions/IntelligentRetrieval";
import {initIntelligentRetrievaMenu} from "../actions/actions";

import {StylePage,ShallowBlueBtn,DeepRedBtn,Input,DeepBlueBtn,PhotoItem,Pag} from "./generalPurposeModule";
import {store} from '../index.js'
import  * as constants from "../utils/Constants";

import  {IntelligentRetrievalContent}  from "./IntelligentRetrieval/IntelligentRetrievalContent";

class IntelligentRetrievalRight extends Component{
    
    componentWillUnmount() { //销毁
        store.dispatch(initIntelligentRetrievaMenu(store.getState().IntelligentRetrievalType.uiData.menus))//销毁时初始化菜单
        store.dispatch(initIntelligentRetrievalData());//初始数据
        this.setState({
            keyword:''
        });
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
            case '101'://全部
                content = <IntelligentRetrievalContent   type={constants.intellgentRetrievalType.all}  />
                break
            case '102'://利剑数据
                content = <IntelligentRetrievalContent  type={constants.intellgentRetrievalType.swordData}   />
                break
            case '103'://研判报告
                content = <IntelligentRetrievalContent   type={constants.intellgentRetrievalType.judgeReport}  />
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



// 样式
const sliderdyHeader = {
    borderBottom:"1px solid #0C5F93",
    padding:"18px 0",
    overflow: "hidden"
}
const font14 = {
    fontSize: "14px",
    color: "#fff"
}


export default connect(mainReducer)(IntelligentRetrievalRight);

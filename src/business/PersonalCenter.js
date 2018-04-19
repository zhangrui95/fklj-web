//个人中心页面
import React, {Component} from 'react'
import {mainReducer} from "../reducers/reducers";
import {connect} from "react-redux";
import {store} from '../index.js'
import PersonalCenterRight from "./PersonalCenterRight";
import {StylePage,ShallowBlueBtn,DeepRedBtn,Input,DeepBlueBtn,PhotoItem,Pag,SliderMenuItem} from "./generalPurposeModule";
import {changeMenu,initPersonalCenterMenu} from "../actions/actions";
import {PERSONALCENTER_MODULE} from "../utils/Constants";
import {Header} from "../components/Header";
import WebSocket from './WebSocket';
class PersonalCenter extends Component {
    // componentWillUnmount() { //销毁
    //     store.dispatch(initPersonalCenterMenu(this.props.PersonalCenter.uiData.menus))
    // }
    //个人中心菜单点击-获取数据-开关事件
    handleMenuClick = (menu,type) => {
        store.dispatch(changeMenu(menu,type,PERSONALCENTER_MODULE));
    }

    render(){
        return (
            <div>
                <Header />
                <div  className="sileder_left">
                    <SliderMenuItem  menus={store.getState().PersonalCenter.uiData.menus} handleMenuClick={this.handleMenuClick}/>
                </div>

                <div  className="sileder_right">
                    <PersonalCenterRight />
                </div>
                <div className="clear"></div>
                <WebSocket/>
            </div>

        );
    }
}

export default connect(mainReducer)(PersonalCenter);
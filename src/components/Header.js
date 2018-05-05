//头部导航
import {connect} from "react-redux";
import React, { Component, PropTypes } from 'react';
import {
    Link
} from "react-router";
import {StylePage,ShallowBlueBtn,DeepRedBtn,FangSelectBlueBtn} from "../business/generalPurposeModule";
/*import {DevTools} from "../containers/DevTools";*/
import {mainReducer} from "../reducers/reducers";
import {logoutUser} from "../actions/login";
import {store} from '../index.js';
import {clientNameList,clientName,securityCenterUrls} from '../utils/index';
import '../resources/index.css';
import {sysName} from '../utils/Configuration';
import {
  DevTools
} from "../containers/DevTools";
/*const DevTools = window.devToolsExtension
  ? () => null
  : require('../containers/DevTools').default;  火狐和360老版不支持*/
const collapseDiv = {
    width:"100%",
    background:"#001333",
    height:60,
    lineHeight:"60px",
    textAlign:"center"
};
const collapseA = {
    fontSize:18,
    color:"#fff"
};

const collapseB = {
    fontSize:18,
    color:"red"
};

const collapseLi = {
    width:"7%",
    margin:"0 2%",
    color:"#fff",
   // padding:"1% 2.22%",
    // margin:"0 2%"
    fontSize:16
};
const collapseLi1 = {
    width:"7%",
    margin:"0 2%",
    background:"#153073",
    // padding:"1% 2.22%",
    // margin:"0 2%",
    fontSize:16
};


const marginT220= {
    margin:"17px 0 17px 44px"   
}
const marginT13= {
    marginTop:"7px" ,
    marginLeft:"5px"  
}
const marring = {
    marginRight:"20px",
}
const martop = {
    marginTop:"27px"
}
const fontSize14= {
    fontSize:14,
    color:"#fff"
}


const user = JSON.parse(sessionStorage.getItem('user'));
export class Header extends Component{
  render(){
      let {hideNav,homeType} = this.props;
      let user = JSON.parse(sessionStorage.getItem('user'));
      let navigations = store.getState().root.uiData.navigations;
      let  navigationList = [];
      let fk = false;
      let hs = false;
      navigations.forEach(function(navigation, i){
          let css;
          if(navigation.isShow){
              {navigation.isSelect===true?css=collapseLi1:css=collapseLi}
              if(homeType==='fklj_sys'&&navigation.homeType==='fklj'){
                  navigationList.push(
                      <li className="fl" style={css} key={i}>
                          <Link to={navigation.path} style={{color:"#fff"}}>{navigation.navigationName}</Link>
                      </li>
                  );
              }else if(homeType==='hs_fklj_sys'&&navigation.homeType===''){
                  navigationList.push(
                      <li className="fl" style={css} key={i}>
                          <Link to={navigation.path} style={{color:"#fff"}}>{navigation.navigationName}</Link>
                      </li>
                  );
              }
          }
      });
      let nav = '';
      if(!hideNav){
          nav =  (<div style={collapseDiv}>
              <ul>
                  {navigationList}
                  {/*<span><img src="/images/cyzy_1.png" alt="" style={{float:"right"}}/></span>*/}
                  <div style={{clear:"both"}}></div>
              </ul>
          </div>)
      }
      user.menu.map((menu) =>  {
          if(menu.resourceCode === 'yfklj_sys'){
              fk = true;
          }else if(menu.resourceCode === 'hsfklj_sys'){
              hs = true;
          }
      })
      let pathUrl;
      if(fk&&hs) {
          pathUrl = '/Transfer';
      } else if(fk&&!hs) {
          pathUrl = '/Homes';
      } else if(hs&&!fk) {
          pathUrl = '/Home';
      }

    return (
        <div>
            <div className="headTop" style={{height:"94px",position:"relative"}}>
            <DevTools/>
                <div style={{position:"absolute",top:22,left:44}}>
                    <Link to= {pathUrl}>
                        <div>
                            <img  src= "/images/guohui.png" style={{float:"left"}}   alt=""/>
                            <div  style={{float:"left"}}>
                                <p className="headTitle">{sysName}</p>
                            </div>
                            <div style={{clear:"both"}}></div>
                        </div>
                    </Link>
                </div>
                <div className="headIconDiv fr" style={{position:"absolute",right:0}}>
                    {/*封装的组件*/}
                    <LoginIcon user = {user} />
                </div>
                <div className="clear"></div>
             </div>
            {nav}
        </div>
                 
    )
  }
};




// 登陆者图像和姓名
class LoginIcon extends Component{
    //注销按钮点击事件
    logoutUserClick = () =>{
        store.dispatch(logoutUser());
    }

    // onClickUserManagement=()=>{
    //     let url = securityCenterUrl+"/user/user/login?token="+sessionStorage.getItem('id_token') || '';
    //     window.open(url);
    // }
    onClickUserManagement=()=>{
        let url = securityCenterUrls + "/loginToken?token="+sessionStorage.getItem('id_token') || '';
        // http://172.19.12.249:8200/user/login
        window.open(url);
    }




  render(){
      let user = this.props.user;
      let btnShow;
      user.menu.map((col, index) => {
          if(col.resourceCode === 'yhgl_btn'||col.resourceCode === 'fklj_yhgl_btn'){
              btnShow = true;
          }
      })
    return (
          <div>
              <div className="fl" style={marginT220}>
                  <div className="fl" style={marring}>
                      <img src="/images/head.png" width="57" height="57" />
                  </div>
                  <div className="fl" style={{margin:"19px 20px 0 0"}}>
                      <p style={fontSize14}>{user.user.name}</p>
                  </div>
                  <div className="clear"></div>
              </div>
             {/*<FangSelectBlueBtn padding="6px" float="left" margin="27px 20px 0 0" imgMargin="5px 0 0 5px" text="涉恐背景查询" fangselectIconUl1="/images/down.png" fangselectIconUl2="/images/up.png"/>*/}
              {/*修改密码*/}
              {/*通过utype判断是否显示用户管理按钮*/}
              { btnShow ?
                  <ShallowBlueBtn padding="6px" width="80px" float="left" margin="27px 20px 0 0" onClick={ onClick=>this.onClickUserManagement()} imgMargin="5px 0 0 5px" text="用户管理"  />
                  : ''
              }

              {/*退出系统按钮*/}
              <div className="quitbtnWrap fr" style={martop}>
               <DeepRedBtn  width={82} text="退出系统" onClick={this.logoutUserClick} margin="0 44px 0 0"/>
                {/*<HlkButton width='40' color='red' text='' data={   {name:'zy', age:11}  style={{width:30, backgroundColor: color}} } onClick/>
                <RedButton/><BlueButton color={}/>*/}
              </div>
              
          </div>
    )
  }
};

export default connect(mainReducer)(Header);
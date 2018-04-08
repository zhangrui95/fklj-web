import React, {
    Component,
    PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import {
    Provider
} from 'react-redux';
import '../resources/index.css';
import {
    mainReducer
} from "../reducers/reducers";
import {
    connect
} from "react-redux";
import {
    loginUser
} from "../actions/login";
import {
    store
} from '../index.js';
import {
    clientNameList,
    clientName,
    pkiLoginIsOpen
} from '../utils/index';
import {
    sysName
} from '../utils/Configuration';


//import {Spinner}  from 'react-core-loading-spinner';

import {
    DevTools
} from "../containers/DevTools";
/*const DevTools = window.devToolsExtension
  ? () => null : require('../containers/DevTools').default; 火狐和360老版不支持*/
import {
    browserHistory
} from 'react-router';
import {
    Route,
    Router,
    Link,
} from "react-router";



export class Login extends Component {
    //初始化
    constructor(props) {
        super(props);
        this.state = {
            tab: "user_tab",
            leftEnd: ''
        }
    }

    componentDidMount() {
        //回车触发方法绑定
        window.addEventListener('keydown', this.keyDown);
    }
    componentWillMount () {
      document.title = global.configUrl.sysName;
    }

    componentWillReceiveProps(nextProps) {

        }
        //登录按钮点击事件
    handleLoginClick(event) {
            this.login();
        }
        //账号登录tab点击事件
    handleUserTabClick(event) {
            this.setState({
                tab: "user_tab"
            });
        }
        //PKI登录tab点击事件
    handlePkiTabClick(event) {
            this.setState({
                tab: "pki_tab"
            });
        }
        //回车触发登录
    keyDown = (e) => {
        e.keyCode === 13 && this.login()
    }

    login = () => {
        const username = this.refs.username;
        const password = this.refs.password;
        const creds = {
            username: username.value.trim(),
            password: password.value.trim()
        }
        store.dispatch(loginUser(creds));
    }
    widthlogin = () => {
        let bodyWidth = document.body.clientWidth;
        let elementWidth = document.getElementById("textcss").clientWidth
        let leftNum = bodyWidth - elementWidth;
        let leftEnd = leftNum / 2;
        this.setState({
            leftEnd: leftEnd
        });

    }

    render() {


        let tab = this.state.tab;
        let isFetching = this.props.login.isFetching;
        let leftEnd = this.state.leftEnd;

        return (
            <div style={{width:"100%",height:"100%",minWidth:"1440px",paddingTop:"10%",background:"url(/images/logobg.gif)"}} onLoad={this.widthlogin}>
                {/*登陆界面*/}
                <div style={{textAlign:"center"}} className="LogoWrap">
                <DevTools/>
                    {/*文字图片*/}
                    <div style={{position:"relative",height:"132px"}}>
                        {/*<img  src={clientName === clientNameList.luoyang ? "../images/title_ly.png" : "../images/title.png"}   alt=""/>*/}
                        <p className='textcss' id="textcss" style={{left:leftEnd}}>{sysName}</p>
                        <p className='textcss2'  style={{left:leftEnd}}>{sysName}</p>
                    </div>
                    {/*图标和表单*/}
                    <div style={{width:"950px",margin:"0 auto",marginTop:"88px",position:"relative"}}>
                        <img src="../images/denglu.png" alt="" style={{float:"left"}}/>
                        {tab === 'user_tab' ? <div style={{width:"520px",marginTop:"10px",position:"absolute",right:"0",top:"11px"}}>
                            {pkiLoginIsOpen === true?<div style={{width:"520px",position:"relative",zIndex:999,height:60}}>
                                <div style={logoTagleftActive}  onClick={(event) => this.handleUserTabClick(event)}>账号登陆</div>
                                <div style={logoTagright}  onClick={(event) => this.handlePkiTabClick(event)} >PKI登陆</div>
                            </div>
                            :<div style={{width:"520px",position:"relative",zIndex:999,height:60}}>
                                <div style={{position:"absolute",bottom:"-1px",left:"0",width:'520px',eight:"61px",lineHeight:"60px",fontSize:"20px",color:"#bebebe",border:"1px solid rgba(215,192,72,0.5)",borderBottom:0,background:"rgb(38, 47, 75)"}}>
                                    账号登录
                                </div>
                            </div>
                            }
                            
                            <div style={formWrap}>
                                {/*账号登录的表单*/}
                                <div style={formDiv}>
                                    <div style={InpDiv}>
                                        <input style={Inp} placeholder="用户名"   type='text' ref='username'/>
                                        <img src="../images/user.png" alt="" style={{position:"absolute",right:"20px",top:"10px"}}/>
                                    </div>
                                    <div style={InpDiv}>
                                        <input style={Inp} placeholder="密码" type="password"  ref='password'/>
                                        <img src="../images/password.png" alt="" style={{position:"absolute",right:"20px",top:"10px"}}/>
                                    </div>
                                    <div>
                                        <button style={logoBtn} onClick={(event) => this.handleLoginClick(event)}  >
                                            登录  
                                        </button>
                                    </div>
                                </div>
                                        
                                {/*PKI登陆表单*/}
                                <div style={{display:"none"}}>
                                    <div style={pkiDiv}>
                                       <img src="../images/dl.png" alt=""/>
                                    </div>
                                </div>
                                
                            </div>
                        </div> :<div style={{width:"520px",marginTop:"10px",position:"absolute",right:"0",top:"70px"}}>
                            <div style={{width:"520px",position:"relative",zIndex:999}}>
                                <div style={logoTagleft}  onClick={(event) => this.handleUserTabClick(event)}>账号登陆</div>
                                <div style={logoTagrightActive}  onClick={(event) => this.handlePkiTabClick(event)} >PKI登陆</div>
                            </div>
                            <div style={formWrap}>
                                {/*账号登录的表单*/}
                                <div style={formDiv2}>
                                    <div style={InpDiv}>
                                        <input style={Inp} placeholder="用户名"  type='text' ref='username'/>
                                        <img src="../images/user.png" alt="" style={{position:"absolute",right:"20px",top:"10px"}}/>
                                    </div>
                                    <div style={InpDiv}>
                                        <input style={Inp} placeholder="密码" type="password"  ref='password'/>
                                        <img src="../images/password.png" alt="" style={{position:"absolute",right:"20px",top:"10px"}}/>
                                    </div>
                                    <div>
                                        <button style={logoBtn} onClick={(event) => this.handleLoginClick(event)} >
                                            登录  
                                        </button>
                                    </div>
                                </div>
                                        
                                {/*PKI登陆表单*/}
                                <div style={{display:"block"}}>
                                    <div style={pkiDiv}>
                                       <img src="../images/dl.png" alt=""/>
                                    </div>
                                </div>
                                
                            </div>
                        </div>}
                        
                        <div style={{clear:"both"}}></div>
                    </div>
                </div>
            </div>
        );
    }
}
//标签样式
const logoTagleft = {
    position: "absolute",
    bottom: "0px",
    left: "0",
    width: "250px",
    height: "60px",
    lineHeight: "60px",
    fontSize: "20px",
    color: "#bebebe",
    border: "1px solid rgba(215,192,72,0.5)",

    background: "#050e28",
}
const logoTagright = {
    position: "absolute",
    bottom: "0px",
    right: "0",
    width: "250px",
    height: "60px",
    lineHeight: "60px",
    fontSize: "20px",
    color: "#bebebe",
    border: "1px solid rgba(215,192,72,0.5)",
    borderBottom: "0",
    background: "#050e28",
}
const logoTagleftActive = {
    position: "absolute",
    bottom: "-1px",
    left: "0",
    width: "250px",
    height: "61px",
    lineHeight: "60px",
    fontSize: "20px",
    color: "#bebebe",
    border: "1px solid rgba(215,192,72,0.5)",

    background: "#262f4b",
    borderBottom: "0",
    zIndex: "99"
}
const logoTagrightActive = {
        position: "absolute",
        bottom: "-1px",
        right: "0",
        width: "250px",
        height: "61px",
        lineHeight: "60px",
        fontSize: "20px",
        color: "#bebebe",
        border: "1px solid rgba(215,192,72,0.5)",

        background: "#262f4b",
        borderBottom: "0",
        zIndex: "99"
    }
    //表单样式
const formWrap = {
    position: "relative",
    width: "520px",
    height: "294px",
    border: "1px solid rgba(215,192,72,0.5)",
    background: "#262f4b",
    zIndex: 1
}
const formDiv = {
    width: "433px",
    margin: "0 auto",
    padding: "40px 0",
    display: 'block'
}
const formDiv2 = {
    width: "433px",
    margin: "0 auto",
    padding: "40px 0",
    display: 'none'
}
const InpDiv = {
    width: "433px",
    // background:"rgba(58,69,102,0.5)",
    position: "relative",
}
const Inp = {
    width: "413px",
    background: "rgba(58,69,102,0.5)",
    padding: "10px",
    border: "0",
    height: "50px",
    lineHeight: "30px",
    fontSize: '20px',
    color: "#aaa",
    marginBottom: "32px",
}
const logoBtn = {
    width: "433px",
    height: "50px",
    fontSize: "20px",
    color: "#fff",
    background: "#a4933a",
    border: "0"
}
const pkiDiv = {
    width: "164px",
    margin: "0 auto",
    marginTop: "96px",
}
export default connect(mainReducer)(Login);
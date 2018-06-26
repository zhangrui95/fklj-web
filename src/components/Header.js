//头部导航
import { connect } from "react-redux";
import React, { Component, PropTypes, PureComponent } from 'react';
import {
    Link,
} from "react-router";
import { goBack, push, replace } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { StylePage, ShallowBlueBtn, DeepRedBtn, FangSelectBlueBtn } from "../business/generalPurposeModule";
/*import {DevTools} from "../containers/DevTools";*/
import { mainReducer } from "../reducers/reducers";
import { logoutUser } from "../actions/login";
import { postModifiypaddword } from "../actions/actions";
import { store } from '../index.js';
import { clientNameList, clientName, securityCenterUrls } from '../utils/index';
import '../resources/index.css';
import { sysName } from '../utils/Configuration';
import {
    DevTools
} from "../containers/DevTools";
import { Menu, Dropdown, Icon, Avatar, Modal, Form, message, Button, Input } from 'antd';
import MD5 from 'md5-es';
const FormItem = Form.Item;
/*const DevTools = window.devToolsExtension
  ? () => null
  : require('../containers/DevTools').default;  火狐和360老版不支持*/
const collapseDiv = {
    width: "100%",
    background: "#001333",
    height: 60,
    lineHeight: "60px",
    textAlign: "center"
};
const collapseA = {
    fontSize: 18,
    color: "#fff"
};

const collapseB = {
    fontSize: 18,
    color: "red"
};

const collapseLi = {
    width: "7%",
    margin: "0 2%",
    color: "#fff",
    // padding:"1% 2.22%",
    // margin:"0 2%"
    fontSize: 16
};
const collapseLi1 = {
    width: "7%",
    margin: "0 2%",
    background: "#153073",
    // padding:"1% 2.22%",
    // margin:"0 2%",
    fontSize: 16
};


const marginT220 = {
    margin: "17px 0 17px 44px"
}
const marginT13 = {
    marginTop: "7px",
    marginLeft: "5px"
}
const marring = {
    marginRight: "20px",
}
const martop = {
    marginTop: "27px"
}
const fontSize14 = {
    fontSize: 14,
    color: "#fff"
}


const user = JSON.parse(sessionStorage.getItem('user'));
export class Header extends Component {
    render() {
        let { hideNav, homeType } = this.props;
        let user = JSON.parse(sessionStorage.getItem('user'));
        let navigations = store.getState().root.uiData.navigations;
        let navigationList = [];
        let fk = false;
        let hs = false;
        navigations.forEach(function (navigation, i) {
            let css;
            if (navigation.isShow) {
                { navigation.isSelect === true ? css = collapseLi1 : css = collapseLi }
                if (homeType === 'fklj_sys' && navigation.homeType === 'fklj') {
                    navigationList.push(
                        <li className="fl" style={css} key={i}>
                            <Link to={navigation.path} style={{ color: "#fff" }}>{navigation.navigationName}</Link>
                        </li>
                    );
                } else if (homeType === 'hs_fklj_sys' && navigation.homeType === '') {
                    navigationList.push(
                        <li className="fl" style={css} key={i}>
                            <Link to={navigation.path} style={{ color: "#fff" }}>{navigation.navigationName}</Link>
                        </li>
                    );
                }
            }
        });
        let nav = '';
        if (!hideNav) {
            nav = (<div style={collapseDiv}>
                <ul>
                    {navigationList}
                    {/*<span><img src="/images/cyzy_1.png" alt="" style={{float:"right"}}/></span>*/}
                    <div style={{ clear: "both" }}></div>
                </ul>
            </div>)
        }
        user.menu.map((menu) => {
            if (menu.resourceCode === 'yfklj_sys') {
                fk = true;
            } else if (menu.resourceCode === 'hsfklj_sys') {
                hs = true;
            }
        })
        let pathUrl;
        if (fk && hs) {
            pathUrl = '/Home';
            // pathUrl = '/Transfer';
        } else if (fk && !hs) {
            pathUrl = '/Homes';
        } else if (hs && !fk) {
            pathUrl = '/Home';
        }

        return (
            <div>
                <div className="headTop" style={{ height: "94px", position: "relative" }}>
                    <DevTools />
                    <div style={{ position: "absolute", top: 22, left: 44 }}>
                        <Link to={pathUrl}>
                            <div>
                                <img src="/images/guohui.png" style={{ float: "left" }} alt="" />
                                <div style={{ float: "left" }}>
                                    <p className="headTitle">{sysName}</p>
                                </div>
                                <div style={{ clear: "both" }}></div>
                            </div>
                        </Link>
                    </div>
                    <div className="headIconDiv fr" style={{ position: "absolute", right: 0 }}>
                        {/*封装的组件*/}
                        <LoginIcon user={user} />
                    </div>
                    <div className="clear"></div>
                </div>
                {nav}
            </div>

        )
    }
};




// 登陆者图像和姓名
class LoginIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        }
    }

    //注销按钮点击事件
    // logoutUserClick = () => {
    //     store.dispatch(logoutUser());
    // }

    // onClickUserManagement=()=>{
    //     let url = securityCenterUrl+"/user/user/login?token="+sessionStorage.getItem('id_token') || '';
    //     window.open(url);
    // }
    // onClickUserManagement = () => {
    //     let url = securityCenterUrls + "/home?token=" + sessionStorage.getItem('id_token') || '';
    //     // http://172.19.12.249:8200/user/login
    //     window.open(url);
    // }
    onMenuClick = ({ key }) => {
        if (key === 'modifyPassword') {
            this.setState({
                modalVisible: true
            });
        } else if (key === 'usermanage') {
            let url = securityCenterUrls + "/loginToken?token=" + sessionStorage.getItem('id_token') || '';
            // http://172.19.12.249:8200/user/login
            window.open(url);
        } else if (key === 'logout') {
            store.dispatch(logoutUser());
        }
    }
    // 关闭模态框
    close = () => {
        this.setState({
            modalVisible: false
        });
    }

    render() {
        let user = this.props.user;
        let btnShow;
        user.menu.map((col, index) => {
            if (col.resourceCode === 'yhgl_btn' || col.resourceCode === 'fklj_yhgl_btn') {
                btnShow = true;
            }
        })
        const menu = (
            <Menu selectedKeys={[]} onClick={this.onMenuClick}>
                <Menu.Item key="modifyPassword"><Icon type="unlock" />修改密码</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="usermanage"><Icon type="user" />用户管理</Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
            </Menu>
        );
        return (
            <div style={{ marginTop: '20px' }}>
                {/* <div className="fl" style={marginT220}>
                  <div className="fl" style={marring}>
                      <img src="/images/head.png" width="57" height="57" />
                  </div>
                  <div className="fl" style={{margin:"19px 20px 0 0"}}>
                      <p style={fontSize14}>{user.user.name}</p>
                  </div>
                  <div className="clear"></div>
              </div>
              { btnShow ?
                  <ShallowBlueBtn padding="6px" width="80px" float="left" margin="27px 20px 0 0" onClick={ onClick=>this.onClickUserManagement()} imgMargin="5px 0 0 5px" text="用户管理"  />
                  : ''
              }
              <div className="quitbtnWrap fr" style={martop}>
               <DeepRedBtn  width={82} text="退出系统" onClick={this.logoutUserClick} margin="0 44px 0 0"/>
                
              </div> */}
                <Dropdown overlay={menu}>
                    <span>
                        {/* <Avatar size="small" className={styles.avatar} src={currentUser.avatar} /> */}
                        <Avatar size="large" src="/images/head.png" style={{ width: 57, height: 57 }} />
                        <div className="fr" style={{ margin: "19px 20px 0 0" }}><p style={{ fontSize: 14, color: '#fff', marginLeft: 10 }}>{user.user.name}</p></div>
                    </span>
                </Dropdown>
                <LoginTable modalVisible={this.state.modalVisible} close={this.close} />
            </div>
        )
    }
};

class LoginTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: true,
            pwdValidate: /(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,24}/,
            newPassword: '',
            oldPassword: '',
        };
    }

    componentDidMount() {

    }
    handleCancel = () => {
        this.props.close();
    }
    statusFalse = () => {
        this.setState({
            status: false
        });
    }

    handleOk = () => {
        //保存
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    newPassword: values.newPassword,
                    oldPassword: values.oldPassword
                });
                if (values.confirmPassword !== values.newPassword) {
                    message.warn('提示：两次密码输入不一致');
                    return;
                }
                if (values.newPassword === values.oldPassword) {
                    message.warn('提示：两次密码输入一致');
                    return;
                }
                const creds = {
                    idcard: JSON.parse(sessionStorage.getItem('user')).user.idCard || JSON.parse(sessionStorage.getItem('user')).user.pcard,
                    newPassword: MD5.hash(values.newPassword),
                    oldPassword: MD5.hash(values.oldPassword)
                }
                store.dispatch(postModifiypaddword(creds, this.statusFalse));
                // const { dispatch } = this.props;
                // const creds = {
                //     idcard: JSON.parse(sessionStorage.getItem('user')).idcard || JSON.parse(sessionStorage.getItem('user')).pcard,
                //     newPassword: MD5.hash(values.newPassword),
                //     oldPassword: MD5.hash(values.oldPassword)
                // }
                // dispatch({
                //     type: 'login/modifyPassword',
                //     payload: creds,
                //     callback: () => {
                //         this.setState({
                //             status: false
                //         });
                //         sessionStorage.clear();
                //     }
                // });

            }
        });
    }

    hrefClick = () => {
        browserHistory.replace('/')
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const visible = this.props.modalVisible;
        console.log('visible', visible);
        console.log('this.state.', this.state.status);
        console.log('sessionStorage.getItem(user)', JSON.parse(sessionStorage.getItem('user')));
        return (
            <Modal
                title="修改密码"
                visible={visible}
                maskClosable={false}
                onCancel={this.handleCancel}
                closable={this.state.status}
                footer={this.state.status ?
                    <div>
                        <Button onClick={this.handleCancel}>取消</Button>
                        <Button type="primary" onClick={this.handleOk}>确定</Button>
                    </div>
                    :
                    <div>
                        <Button type="primary" onClick={this.hrefClick}>确定</Button>
                    </div>}
            >
                {this.state.status ?
                    <div>
                        <Form onSubmit={this.handleSubmit} layout="inline">
                            <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} label="原密码" style={{ width: '90%', marginBottom: '16px' }} >
                                {getFieldDecorator('oldPassword', {
                                    rules: [{

                                        required: true, message: '请输入原密码！',
                                    }],
                                })(
                                    <Input
                                        size="large"
                                        //prefix={<Icon type="user" className={styles.prefixIcon} />}
                                        type="password"
                                        placeholder="请输入原密码"
                                        style={{ fontSize: 14 }}
                                    />
                                )}
                            </FormItem>
                            <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} label="新密码" style={{ width: '90%', marginBottom: '16px' }}>
                                {getFieldDecorator('newPassword', {
                                    rules: [{
                                        // pattern: this.state.pwdValidate,
                                        required: true,
                                        message: '请输入新密码!',
                                    }],
                                })(
                                    <Input
                                        size="large"
                                        //prefix={<Icon type="lock" className={styles.prefixIcon} />}
                                        type="password"
                                        placeholder="请输入新密码！"
                                        style={{ fontSize: 14 }}
                                    />
                                )}
                            </FormItem>
                            <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 14 }} label="确认密码" style={{ width: '90%', marginBottom: '16px' }}>
                                {getFieldDecorator('confirmPassword', {
                                    rules: [{
                                        // pattern: this.state.pwdValidate,
                                        required: true,
                                        message: '请输入确认密码',
                                    }],
                                })(
                                    <Input
                                        size="large"
                                        //prefix={<Icon type="lock" className={styles.prefixIcon} />}
                                        type="password"
                                        placeholder="请输入确认密码！"
                                        style={{ fontSize: 14 }}
                                    />
                                )}
                            </FormItem>
                        </Form>
                    </div> :
                    <div style={{ textAlign: 'center' }}>
                        <Icon style={{ fontSize: '60px', color: '#1890ff' }} type="check" />
                        <span>修改密码成功，请重新登录</span>
                    </div>
                }

            </Modal>
        );
    }
}

LoginTable = Form.create()(LoginTable);
export default connect(mainReducer)(Header);
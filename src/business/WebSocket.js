import React, { Component} from 'react';
import Websocket from 'react-websocket';
import 'ant-design-pro/dist/ant-design-pro.css';
// import { notification } from 'antd';
// import NoticeIcon from 'ant-design-pro/lib/NoticeIcon';
import NoticeIcon from './NoticeIcon';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import { Tag } from 'antd';

let that = '';
let dataLists = [];
class WebSocket extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            show: false
        }
        that = this;
    }
    onPopupChange = (e) => {
        this.setState({
            show: e
        })
    }
    handleData(data) {
        console.log('data===>',data)
        let result = JSON.parse(data);
        that.setState({
            data: result,
            show: true
        });
    }
    sendMessage(message){
        this.refWebSocket.sendMessage(message);
        console.log('message===>',message)
    }
    onItemClick = (item, tabProps) => {
        console.log(item, tabProps);
    }
    onClear(tabTitle) {
        console.log(tabTitle);
    }
    getNoticeData(notices) {
        if (notices.length === 0) {
            return {};
        }
        const newNotices = notices.map((notice) => {
            const newNotice = { ...notice };
            if (newNotice.datetime) {
                newNotice.datetime = moment(notice.datetime).fromNow();
            }
            // transform id to item key
            if (newNotice.id) {
                newNotice.key = newNotice.id;
            }
            if (newNotice.extra && newNotice.status) {
                const color = ({
                    todo: '',
                    processing: 'blue',
                    urgent: 'red',
                    doing: 'gold',
                })[newNotice.status];
                newNotice.extra = <Tag color={color} style={{ marginRight: 0 }}>{newNotice.extra}</Tag>;
            }
            return newNotice;
        });
        return groupBy(newNotices, 'type');
    }
    render(){
        const {data, show} = this.state;
        const noticeData = this.getNoticeData(data);
        return (
            <div>
                <div
                    style={{
                        position: 'fixed',
                        right: '30px',
                        bottom: '20px',
                        textAlign: 'right',
                        boxShadow: '0 1px 4px rgba(0,21,41,.12)',
                        width: '60px',
                        float:'right',
                        color: '#fff',
                        background: 'rgba(43, 108, 197, 0.7)',
                        padding: '7px 0 0',
                        cursor:'pointer'
                    }}
                >
                    {/*<div onClick={() => this.sendMessage("Hello,hyLink!")}>点击</div>*/}
                    <NoticeIcon
                        className="notice-icon"
                        count={data.length}
                        onItemClick={this.onItemClick}
                        onClear={this.onClear}
                        onPopupVisibleChange = {this.onPopupChange}
                        popupVisible={show}
                    >
                        <NoticeIcon.Tab
                            list={noticeData['通知']}
                            title="通知"
                            emptyText="你已查看所有通知"
                            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
                        />
                    </NoticeIcon>
                </div>
                <Websocket url='ws://172.19.12.213:8083/websocketServer' onMessage={this.handleData} reconnect={true} ref={Websocket => {this.refWebSocket = Websocket}}/>
            </div>
        )
    }
}
export default WebSocket;
// ws://172.19.12.213:8083/websocketServer
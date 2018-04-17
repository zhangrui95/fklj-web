import React, { Component} from 'react';
import Websocket from 'react-websocket';
import { notification } from 'antd';

class WebSocket extends Component{
    handleData(data) {
        console.log('data====>',data);
        notification.open({
            placement: 'bottomRight',
            message: '消息提醒',
            description: data,
            // duration: null
        });
    }
    render(){
        return (
            <div>
                <Websocket url='ws://172.19.12.232:8081/JavaWebSocket/websocket' onMessage={this.handleData} reconnect={true}/>
            </div>
        )
    }
}
export default WebSocket;
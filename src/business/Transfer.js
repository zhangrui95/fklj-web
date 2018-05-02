import React, {
    Component
} from 'react'
import {
    mainReducer
} from "../reducers/reducers";
import {
    Link
} from "react-router";
import {
    connect
} from "react-redux";
import {
    Header
} from "../components/Header";
import WebSocket from './WebSocket';
import {
    store
} from '../index.js';
import { Card, Col, Row  } from 'antd';


const cardStyle = {width:'90%',margin: '0 5%',cursor:"pointer", background:"rgba(25, 41, 85, 0.5)", color:'#fff', border:'none'}
const cardWord = {fontSize:'28px',marginTop:'1em',textAlign:'center',WebkitMaskImage:'-webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), color-stop(55%, rgba(0, 0, 0, 0.7)), to(#ffffff))',textShadow: '0px 0px 1px #fff'}
class Transfer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div style={{overflow:"hidden",width:"100%"}}>
                <Header hideNav={true}/>
                <div style={{ width:'40%',margin: '300px 30%' }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Link to={'/Homes'}>
                                <Card style={cardStyle}>
                                    <p style={cardWord}>反恐利剑</p>
                                </Card>
                            </Link>
                        </Col>
                        <Col span={12}>
                            <Link to={'/Home'}>
                                <Card style={cardStyle}>
                                    <p style={cardWord}>呼市反恐利剑</p>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                </div>
                <WebSocket/>
            </div>

        );
    }
}






export default connect(mainReducer)(Transfer);
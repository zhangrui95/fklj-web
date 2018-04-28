// banner动效
//图片放大组件 2017-12-06
import React, { Component } from 'react';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
const BgElement = Element.BgElement;
import 'rc-banner-anim/assets/index.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { store } from '../index.js';


export class BannerAnimImg extends Component {
    constructor(props)  {
        super(props);
        
        let imgArray =  [];
        if  (this.props.currentImg ) {
            this.imgArray = this.props.arrayImg;//数组
            this.currentImg = this.props.currentImg;
            this.index = this.props.index;
        }  else {//不是数组的情况
            if  (this.props.arrayImg instanceof Array ) {//判断是否是数组
                this.imgArray =  this.props.arrayImg;
            }  else {
                this.imgArray.push(this.props.arrayImg);
                this.currentImg = this.props.arrayImg;
            }
        }
    }
// componentDidMount(){
//     console.log('1111111');
// }
    // handleCancel = () => {
    //     this.props.handleCancel();
    // }
    render() {
        let showCurret = [];
        for (let i   =  0 ;  i < this.imgArray.length ; i++){
            showCurret.push(
                <Element key= {"ele"+i}>
                    <BgElement
                        key="bg"
                        className="bg"
                        style={{
                            backgroundImage: `url(${this.imgArray[i]})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            height: '480px',
                            width: '640px',
                            position: 'absolute',
                            top: '13%',
                            left: '-320px',
                            marginLeft:'50%'
                        }}
                    />

                </Element>
            );
            
        } 
           console.log('show',showCurret); 
           console.log('this.index',this.index);
        return(
            <div>
                    <BannerAnim prefixCls="banner-user" type='acrossOverlay' style={{height:"100%"}} initShow={this.index?this.index : 0}>
                        {showCurret}
                    </BannerAnim>

            </div>
        );
    }
}

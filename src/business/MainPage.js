import React, { Component } from 'react';
import logo from '../resources/logo.svg';
import '../resources/App.css';
import {connect} from 'react-redux';
import {mainReducer} from "../reducers/reducers";
import {add, changeText, dec} from "../actions/actions";
import {StylePage,ShallowBlueBtn,DeepRedBtn,Input,DeepBlueBtn,PhotoItem,Pag,Interrogation,InterrogationDetailsItem} from "./generalPurposeModule";



import {Login} from './Login';
class App extends Component {
    render() {
        return (
           <div></div>
        );
    }
}

export default connect(mainReducer)(App);

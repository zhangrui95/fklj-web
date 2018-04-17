/*
import {DYNAMICCONTROL_MENU_INIT,USERS_ERROR,USERS_TIMEOUT,USERS_DATA,DTGK_MENU_LDRY_CHAGE,DTGK_MENU_ZDGZ_CHAGE,DTGK_MENU_ALL_CHANGE,DTGK_MENU_CHANGE_CURRENT,
NAVIGATION_CHANGE,SHADE_CHANGE,AREA_CITY_DATA,AREA_PROVINCE_DATA,AREA_CITY_ERROR,AREA_PROVINCE_ERROR,TERROR_TYPE_DATA,JUDGMENT_LEVEL_DATA,DISPOSITIONL_DATA,
    POLICE_UNITS_DATA,PERSON_TAGS_DATA,CAR_TAGS_DATA,TASKHISTORY_UNITS_DATA} from "../actions/actions";
import {initialState,lyInitialState} from './initialState.js';
import  {fetchPersonalCenterUsers} from './PersonalCenter.js';
import {fetchSystemManagementUsers} from './SystemManagement';
import  {fetchInterrogationRecordUsers} from './InterrogationRecord';
import  {fetchInterrogationDetailsUsers} from './InterrogationDetails';
import  {fetchIntelligentRetrieval} from './IntelligentRetrieval';
import  {fetchAuditReport} from './AuditReport';
import  {fetchReportForms} from './ReportForms';
import  {fetchHome} from './Home';
import {fetchUsers} from './Users';
import  {fetchInventoryManagementUsers} from './InventoryManagement';
import  {fetchCustomsPass} from './CustomsPassManagement';
import  {fetchRoot} from './root';
import  {clientNameList,clientName} from '../utils/index';
import  {fetchElectronicArchivesUsers} from './ElectronicArchives';
import  {login} from './login';
import { routerReducer } from 'react-router-redux';
import {store} from '../index.js';
export function mainReducer(state=initialState, action) {
    //console.info('test:',fetchInterrogationRecordUsers(action));
    return {
        root:fetchRoot(action),
        login:login(action),
        Home:fetchHome(action),
        AuditReport:fetchAuditReport(action),
        PersonalCenter:fetchPersonalCenterUsers(action),
        IntelligentRetrievalType:fetchIntelligentRetrieval(action),
        InterrogationDetailsUsers:fetchInterrogationDetailsUsers(action),
        InterrogationRecordUsers:fetchInterrogationRecordUsers(action),
        ReportForms:fetchReportForms(action),
        SystemManagement:fetchSystemManagementUsers(action),
        DynamicControl:fetchUsers(action),
        ElectronicArchivesUsers:fetchElectronicArchivesUsers(action),
    };
}
*/
import { routerReducer} from 'react-router-redux';
import { combineReducers } from 'redux';

const login = require('./login');
const root = require('./root');
const Home = require('./Home');
const AuditReport = require('./AuditReport');
const PersonalCenter = require('./PersonalCenter.js');
const IntelligentRetrievalType = require('./IntelligentRetrieval');
const InterrogationDetailsUsers = require('./InterrogationDetails');
const InterrogationRecordUsers = require('./InterrogationRecord');
const TaskManagement = require('./TaskManagement')
const ReportForms = require('./ReportForms');
const SystemManagement = require('./SystemManagement');
const AreaManagement = require('./AreaManagement');
const DynamicControl = require('./Users');
const ElectronicArchivesUsers = require('./ElectronicArchives');

export const mainReducer = combineReducers({
  ...login,
  ...root,
  ...Home,
  ...AuditReport,
  ...PersonalCenter,
  ...IntelligentRetrievalType,
  ...InterrogationDetailsUsers,
  ...InterrogationRecordUsers,
  ...ReportForms,
  ...SystemManagement,
  ...AreaManagement,
  ...TaskManagement,
  ...DynamicControl,
  ...ElectronicArchivesUsers,
  routing:routerReducer,
});

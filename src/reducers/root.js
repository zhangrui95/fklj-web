import {DYNAMICCONTROL_MENU_INIT,USERS_ERROR,USERS_TIMEOUT,USERS_DATA,DTGK_MENU_LDRY_CHAGE,DTGK_MENU_ZDGZ_CHAGE,DTGK_MENU_ALL_CHANGE,DTGK_MENU_CHANGE_CURRENT,
    NAVIGATION_CHANGE,SHADE_CHANGE,AREA_CITY_DATA,AREA_PROVINCE_DATA,AREA_CITY_ERROR,AREA_PROVINCE_ERROR,TERROR_TYPE_DATA,JUDGMENT_LEVEL_DATA,DISPOSITIONL_DATA,
    POLICE_UNITS_DATA,PERSON_TAGS_DATA,CAR_TAGS_DATA} from "../actions/actions";
import {store} from '../index.js';
import {history} from '../index.js';


const initialState = {
    data: {
        provinceList: [], //省份集合
            cityList: [],//城市集合
            cityListReserve: [],//储备城市集合
            judgmentLevelList: [],//研判级别集合
            terrorTypeList: [],//涉恐类别集合
            dispositionlList: [],//处置措施集合
            policeUnitsList:[], //警员单位集合
            personTagsList:[],//人员标签集合
            carTagsList:[],//车辆标签集合
            taskTypeList:[],//任务类型集合
            taskStatusList:[],//任务状态集合
    },
    uiData: {
        navigations: [ //导航集合
            {
                id: '101',
                navigationName: '首页',
                isSelect: true,
                path: "/Home",
                isShow: true
            },
            {
                id: '102',
                navigationName: '动态管控',
                isSelect: false,
                path: "/DynamicControl",
                isShow: true
            },
            {
                id: '109',
                navigationName: '片区管理',
                isSelect: false,
                path: "/AreaManagement",
                isShow: true
            }, {
                id: '111',
                navigationName: '管控人员',
                isSelect: false,
                path: "/ControlPersonnel",
                isShow: true
            }, {
                id: '110',
                navigationName: '任务管理',
                isSelect: false,
                path: "/TaskManagement",
                isShow: true
            },
            // {
            //     id: '103',
            //     navigationName: '智能检索',
            //     isSelect: false,
            //     path: "/IntelligentRetrieval"
            // },
            {
                id: '104',
                navigationName: '统计报表',
                isSelect: false,
                path: "/ReportForms",
                isShow: true
            },
            // {
            //     id:'105',
            //     navigationName: '研判分析',
            //     isSelect:false,
            //     path:"/"
            // },
            {
                id: '107',
                navigationName: '个人中心',
                isSelect: false,
                path: "/PersonalCenter",
                isShow: true
            },
            {
                id: '108',
                navigationName: '系统管理',
                isSelect: false,
                path: "/SystemManagement",
                isShow: false
            }
        ],
        ModalDialogueBg: 'none'//遮罩展示与隐藏
    }
}

//全局变量通用
const root = (state=initialState, action) => {
    let newState = Object.assign({}, state);
    switch(action.type) {
        case NAVIGATION_CHANGE:  //导航切换
            let navigations = action.navigations;
            let navigationList=[];
            for(let i in  navigations){
                if(navigations[i].path === action.navigationPath){
                    navigations[i].isSelect = true;
                }else{
                    navigations[i].isSelect = false;
                }
                navigationList.push(navigations[i]);
            }
            state.uiData.navigations = navigationList;


            return state;
        case SHADE_CHANGE: //遮罩状态切换
            newState.uiData.ModalDialogueBg = action.isBlock;
            return newState;
        case AREA_PROVINCE_DATA: //获取省份集合
            newState.data.provinceList = action.data.data.provinceList;
            return newState;
        case AREA_CITY_DATA: //获取城市集合
            if(action.project === 'first'){
                newState.data.cityList = action.data.data.cityList;
            }else if(action.project === 'second'){
                newState.data.cityListReserve = action.data.data.cityList;
            }
            return newState;
        case JUDGMENT_LEVEL_DATA://获取研判级别
            newState.data.judgmentLevelList = action.data.result.list;
            return newState;
        case TERROR_TYPE_DATA://获取涉恐类别
            newState.data.terrorTypeList = action.data.result.list;
            return newState;
        case DISPOSITIONL_DATA://获取处置措施
            newState.data.dispositionlList = action.data.result.list;
            return newState;
        case CAR_TAGS_DATA: //车辆标签
            newState.data.carTagsList = action.data.result.list;
            return newState;
        case   PERSON_TAGS_DATA: //人员标签
            newState.data.personTagsList = action.data.result.list;
            return newState;
        case   POLICE_UNITS_DATA: //警员单位
            newState.data.policeUnitsList = action.data.result.list;
            return newState;
        default:
            if(store !== undefined){
                return store.getState().root;
            }else{
                return state;
            }
    }
}

module.exports = {root}




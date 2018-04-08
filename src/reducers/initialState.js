//定义初始状态
export const initialState = {
    root: {
        data: {
            provinceList: [], //省份集合
            cityList: [],//城市集合
            cityListReserve: [],//储备城市集合
            judgmentLevelList: [],//研判级别集合
            terrorTypeList: [],//涉恐类别集合
            dispositionlList: []//处置措施集合
        },
        uiData: {
            navigations: [ //导航集合
                {
                    id: '101',
                    navigationName: '首页',
                    isSelect: true,
                    path: "/Home"
                },
                {
                    id: '102',
                    navigationName: '动态管控',
                    isSelect: false,
                    path: "/DynamicControl"
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
                    path: "/ReportForms"
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
                    path: "/PersonalCenter"
                },
                {
                    id: '108',
                    navigationName: '系统管理',
                    isSelect: false,
                    path: "/SystemManagement"
                }
            ],
            ModalDialogueBg: 'none'//遮罩展示与隐藏
        }
    },
    Home: {
        success: true,
        data: {
            taskStatisticsList: [],
            inventoryTotalData: [],
            populationDataList: [],
            concernTotalData: [],
            activityStatisticsList: {
                data: {
                    in: {
                        mh: 0,
                        tl: 0,
                        gl: 0
                    },
                    out: {
                        mh: 0,
                        tl: 0,
                        gl: 0
                    }
                }
            },
            inflowTotalData: [],
            outflowTotalData: [],
            personnelNotList: {//未落地人员
                data: []
            },
            personnelKeyList: {//重点关注人员
                data: []
            },
            personnelMissingList: {//失踪人员
                data: []
            },
            distributeMapData: [],//分布地图-首页
            airportCoordMapData: []
        }
    },
    users: {
        success: true,
        data: {
            count: 0,
            users: []
        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '全部',
                    isOpen: false,
                    search: 'type=all',
                    haveSon: false,
                    isSelect: true
                },
                {
                    id: '102',
                    menuName: '关注人员',
                    isOpen: false,
                    search: 'type=gzry',
                    haveSon: true,
                    isSelect: false,
                    sonMenu: [
                        {
                            id: '1021',
                            menuName: '盘查异常',
                            search: 'type=gzry&state=1',
                            isSelect: false,
                        },
                        {
                            id: '1022',
                            menuName: '重点人员',
                            search: 'type=gzry&state=2',
                            isSelect: false,
                        },
                        {
                            id: '1023',
                            menuName: '临控对象',
                            search: 'type=gzry&state=3',
                            isSelect: false
                        },
                        {
                            id: '1024',
                            menuName: '在侦在控',
                            search: 'type=gzry&state=4',
                            isSelect: false
                        }
                    ]
                },
                {
                    id: '103',
                    menuName: '流动人员',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: true,
                    isSelect: false,
                    sonMenu: [
                        {
                            id: '1031',
                            menuName: '未落地人员',
                            search: 'type=ldry&state=1',
                            isSelect: false
                        },
                        {
                            id: '1032',
                            menuName: '流入人员',
                            search: 'type=ldry&state=2',
                            isSelect: false
                        },
                        {
                            id: '1033',
                            menuName: '流出人员',
                            search: 'type=ldry&state=3',
                            isSelect: true
                        },
                        {
                            id: '1034',
                            menuName: '失踪人员',
                            search: 'type=ldry&state=4',
                            isSelect: false
                        }
                    ]
                }
            ]
        }
    },
    AuditReport: { //研判报告
        success: true,
        data: {
            commonResources: {//常用资源
                list: [],
                count: 0
            },
            judgeHistory: {//研判历史
                list: [],
                count: 0
            },
            head: {//头部信息
                number: null,//编号
                name: null,//姓名
                judgmentLevel: null,//研判级别
                terrorType: null,//涉恐类别
                judgePeople: null,//研判人
                judgmentTime: null,//研判时间
                source: null//线索来源
            },
            basicInformation: null,//基础信息
            bgInformation: {//背景信息
                householdInformationList: null,//同户信息
                domicilePlaceList: null,//户籍地核查
                illegalCrimeList: null,//违法犯罪前科
            },
            onlineInformationList: null,//网上通联信息
            bankInformationList: null,//银行信息
            relatedPersonList: null,//关联人
            trajectoryInformationList: null,//轨迹信息
            judgmentAnalysis: {//研判分析
                judgmentLevel: null,//研判级别
                terrorType: null,//涉恐类别
                dispositionl: null,//处置措施
                conclusion: null,//结论
                source: null//线索来源
            }
        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '基础信息',
                    isSelect: false,  //当前选中
                    lastSelect: false,  //最后选中
                    stage: 1  //阶段
                },
                {
                    id: '102',
                    menuName: '背景信息',
                    isSelect: false,
                    lastSelect: false,
                    stage: 2
                },
                {
                    id: '103',
                    menuName: '网上通联信息',
                    isSelect: false,
                    lastSelect: false,
                    stage: 3
                },
                {
                    id: '104',
                    menuName: '银行信息',
                    isSelect: false,
                    lastSelect: false,
                    stage: 4
                },
                {
                    id: '105',
                    menuName: '轨迹信息',
                    isSelect: false,
                    lastSelect: false,
                    stage: 5
                },
                {
                    id: '106',
                    menuName: '关联人',
                    isSelect: true,
                    lastSelect: true,
                    stage: 6
                },
                {
                    id: '107',
                    menuName: '研判分析',
                    isSelect: false,
                    lastSelect: false,
                    stage: 7
                },
            ]
        }
    }
    ,
    IntelligentRetrievalType: { //智能检索
        success: true,
        data: {
            count: 0,
            IntelligentRetrievalList: []
        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '全部',
                    isOpen: false,
                    search: 'type=mypc',
                    haveSon: false,
                    isSelect: true
                },
                {
                    id: '102',
                    menuName: '利剑数据',
                    isOpen: false,
                    search: 'type=mygz',
                    haveSon: false,
                    isSelect: false
                },
                {
                    id: '103',
                    menuName: '研判报告',
                    isOpen: false,
                    search: 'type=myzj',
                    haveSon: false,
                    isSelect: false
                },

            ]
        }
    },
    PersonalCenter: {
        success: true,
        data: {
            count: 0,
            users: []
        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '我的盘查',
                    isOpen: false,
                    search: 'type=mypc',
                    haveSon: false,
                    isSelect: true
                },
                {
                    id: '102',
                    menuName: '我的收藏',
                    isOpen: false,
                    search: 'type=mygz',
                    haveSon: false,
                    isSelect: false
                },
                // {
                //     id:'105',
                //     menuName: '我的接收',
                //     isOpen: false,
                //     search:'type=myjs',
                // {
                //     id:'103',
                //     menuName: '我的足迹',
                //     isOpen: false,
                //     search:'type=myzj',
                //     haveSon:false,
                //     isSelect:false
                // },
                // {
                //     id:'104',
                //     menuName: '我的推送',
                //     isOpen: false,
                //     search:'type=myts',
                //     haveSon:false,
                //     isSelect:false
                // },
                // {
                //     id:'106',
                //     menuName: '我的研判',
                //     isOpen: false,
                //     search:'type=myyp',
                //     haveSon:false,
                //     isSelect:false
                // }
                //     id:'105',
                //     menuName: '我的接收',
                //     isOpen: false,
                //     search:'type=myjs',
                //     haveSon:false,
                //     isSelect:false
                // },
                {
                    id: '106',
                    menuName: '我的研判',
                    isOpen: false,
                    search: 'type=myyp',
                    haveSon: false,
                    isSelect: false
                }
            ]
        }
    },
    InterrogationRecordUsers: {
        success: true,
        data: {
            count: 0,
            interrogationRecord: []
        }
    },
    InterrogationDetailsUsers: {
        data: {
            interrogationDetails: {
                personnelInformation: {},
                basicInformation: {
                    temporaryPopulation: [],
                    marriageInf: [],
                    residenceMember: [],
                    relationship: [],
                    temporaryInterrogation: [],
                    vehicle: [],
                    driver: []
                },
                bgInformationList: {
                    criminalPersonnel: [],
                    drugRelated: [],
                    trafficViolation: [],
                    relatedjiangzangStudent: [],
                    fugitives: []
                },
                swordData: {
                    essentialInformation: [],
                    vehicleBasicInformation: [],
                    influxPlace: [],
                    mobileBasicData: [],
                    installSoftwareRecords: [],
                    phoneRecords: [],
                    photoRecords: [],
                    internetRecords: [],
                    fileRecords: [],
                },
                activeTrajectoryList: {},
            }
        },
        uiData: {
            tabs: [
                {
                    id: '101',
                    tabName: '基础信息',
                    isSelect: true
                },
                {
                    id: '102',
                    tabName: '背景信息',
                    isSelect: false
                },
                {
                    id: '103',
                    tabName: '活动轨迹',
                    isSelect: false
                },
                {
                    id: '104',
                    tabName: '盘查数据',
                    isSelect: false
                }
            ]
        }
    },

    login: {
        isFetching: false,
        isAuthenticated: sessionStorage.getItem('id_token') ? true : false
    },
    SystemManagement: { //系统管理
        success: true,
        data: {
            placeOfInfluxPersonList: {
                list: [],
                count: 0
            },
            placeOfOriginPersonList: {
                list: [],
                count: 0
            },
            exceptionParameterReminder: {
                telephoneMaxNumber: 0,
                telephoneMinNumber: 0,
                callLogMaxNumber: 0,
                callLogMinNumber: 0,
                smsMaxNumber: 0,
                smsMinNumber: 0
            },
            highRiskCitiesList: {
                list: [],
                count: 0
            },
            highRiskLineList: {
                list: [],
                count: 0
            },


            whiteList: {
                list: [],
                count: 0
            },
            blackList: {
                list: [],
                count: 0
            },
            interrogationInformationList: {
                list: [],
                count: 0
            },
            horrorSoftwareList: {
                list: [],
                count: 0
            }
        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '涉恐软件',
                    isOpen: false,
                    search: 'type=all',
                    haveSon: false,
                    isSelect: true
                },
                {
                    id: '102',
                    menuName: '人工盘查',
                    isOpen: false,
                    search: 'type=gzry',
                    haveSon: false,
                    isSelect: false
                },
                {
                    id: '103',
                    menuName: '异常比对规则',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: false,
                    isSelect: false
                },
                {
                    id: '104',
                    menuName: '黑名单',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: false,
                    isSelect: false
                },
                {
                    id: '105',
                    menuName: '白名单',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: false,
                    isSelect: false
                },
                {
                    id: '106',
                    menuName: '高危地区',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: false,
                    isSelect: false
                    // sonMenu: [
                    //     {id:'1061',
                    //         menuName: '高危城市',
                    //         search:'type=ldry&state=1',
                    //         isSelect:false
                    //     },
                    //     {id:'1062',
                    //         menuName: '高危线路',
                    //         search:'type=ldry&state=2',
                    //         isSelect:false
                    //     },
                    //
                    // ]
                },
                {
                    id: '107',
                    menuName: '原籍地联系人',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: false,
                    isSelect: false
                },
                {
                    id: '108',
                    menuName: '流入地联系人',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: false,
                    isSelect: false
                },
                {
                  id: '109',
                  menuName: '红名单',
                  isOpen: false,
                  search: 'type=ldry',
                  haveSon: false,
                  isSelect: false
                }
            ]
        }
    },
    ReportForms: {
        success: true,
        data: {
            distributeChartsList: {//分布情况
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []

            },
            originalChartsList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            liveChartsList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            sexChartsList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            obtainEmploymentChartsList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            ageChartsList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            AbnormalList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            AttentionCategoryList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            completeList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            inflowList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            dataSourcesList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            flowOutList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            activePersonnelList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            totalAttention: {//查询-关注人员总和
                reason: {
                    "code": "",
                    "text": ""
                },
                data: null
            },
            taskTotalAttention: {//查询-利剑数据的关注人员总和
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            activityInflow: {//查询-活动数据的流入人员总和
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            activityOutflow: {//查询-活动数据的流出人员总和
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '总体数据统计',
                    isOpen: false,
                    search: 'type=ztsjtj',
                    haveSon: false,
                    isSelect: true
                },
                {
                    id: '102',
                    menuName: '盘查数据统计',
                    isOpen: false,
                    search: 'type=ljsjtj',
                    haveSon: false,
                    isSelect: false
                },
                {
                    id: '103',
                    menuName: '活动数据统计',
                    isOpen: false,
                    search: 'type=hdsjtj',
                    haveSon: false,
                    isSelect: false
                }
            ]
        }
    }
};


export const initialStateReturn = {
    root: {
        data: {
            provinceList: [], //省份集合
            cityList: [],//城市集合
            cityListReserve: [],//储备城市集合
            judgmentLevelList: [],//研判级别集合
            terrorTypeList: [],//涉恐类别集合
            dispositionlList: []//处置措施集合
        },
        uiData: {
            navigations: [ //导航集合
                {
                    id: '101',
                    navigationName: '首页',
                    isSelect: true,
                    path: "/Home"
                },
                {
                    id: '102',
                    navigationName: '动态管控',
                    isSelect: false,
                    path: "/DynamicControl"
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
                    path: "/"
                },
                // {
                //     id:'105',
                //     navigationName: '研判分析',
                //     isSelect:false,
                //     path:"/"
                // },
                {
                    id: '106',
                    navigationName: '工作审计',
                    isSelect: false,
                    path: "/"
                },
                {
                    id: '107',
                    navigationName: '个人中心',
                    isSelect: false,
                    path: "/PersonalCenter"
                },
                {
                    id: '108',
                    navigationName: '系统管理',
                    isSelect: false,
                    path: "/SystemManagement"
                }
            ],
            ModalDialogueBg: 'none'//遮罩展示与隐藏
        }
    },
    Home: {
        success: true,
        data: {
            taskStatisticsList: [],
            inventoryTotalData: [],
            populationDataList: [],
            concernTotalData: [],
            ActivityStatisticsList: [],
            activityStatisticsList: {
                data: {
                    in: {
                        mh: 0,
                        tl: 0,
                        gl: 0
                    },
                    out: {
                        mh: 0,
                        tl: 0,
                        gl: 0
                    }
                }
            },
            inflowTotalData: [],
            outflowTotalData: [],
            personnelList: {
                data: []
            },
            DistributeMapData: [],//分布地图-首页
        }
    },
    users: {
        success: true,
        data: {
            count: 0,
            users: []
        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '全部',
                    isOpen: false,
                    search: 'type=all',
                    haveSon: false,
                    isSelect: true
                },
                {
                    id: '102',
                    menuName: '关注人员',
                    isOpen: false,
                    search: 'type=gzry',
                    haveSon: true,
                    isSelect: false,
                    sonMenu: [
                        {
                            id: '1021',
                            menuName: '盘查异常',
                            search: 'type=gzry&state=1',
                            isSelect: false,
                        },
                        {
                            id: '1022',
                            menuName: '重点人员',
                            search: 'type=gzry&state=2',
                            isSelect: false,
                        },
                        {
                            id: '1023',
                            menuName: '临控对象',
                            search: 'type=gzry&state=3',
                            isSelect: false
                        },
                        {
                            id: '1024',
                            menuName: '在侦在控',
                            search: 'type=gzry&state=4',
                            isSelect: false
                        }
                    ]
                },
                {
                    id: '103',
                    menuName: '流动人员',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: true,
                    isSelect: false,
                    sonMenu: [
                        {
                            id: '1031',
                            menuName: '未落地人员',
                            search: 'type=ldry&state=1',
                            isSelect: false
                        },
                        {
                            id: '1032',
                            menuName: '流入人员',
                            search: 'type=ldry&state=2',
                            isSelect: false
                        },
                        {
                            id: '1033',
                            menuName: '流出人员',
                            search: 'type=ldry&state=3',
                            isSelect: true
                        },
                        {
                            id: '1034',
                            menuName: '失踪人员',
                            search: 'type=ldry&state=4',
                            isSelect: false
                        }
                    ]
                }
            ]
        }
    },
    AuditReport: { //研判报告
        success: true,
        data: {
            commonResources: {//常用资源
                list: [],
                count: 0
            },
            judgeHistory: {//研判历史
                list: [],
                count: 0
            },
            head: {//头部信息
                number: null,//编号
                name: null,//姓名
                judgmentLevel: null,//研判级别
                terrorType: null,//涉恐类别
                judgePeople: null,//研判人
                judgmentTime: null,//研判时间
                source: null//线索来源
            },
            basicInformation: null,//基础信息
            bgInformation: {//背景信息
                householdInformationList: null,//同户信息
                domicilePlaceList: null,//户籍地核查
                illegalCrimeList: null,//违法犯罪前科
            },
            onlineInformationList: null,//网上通联信息
            bankInformationList: null,//银行信息
            relatedPersonList: null,//关联人
            trajectoryInformationList: null,//轨迹信息
            judgmentAnalysis: {//研判分析
                judgmentLevel: null,//研判级别
                terrorType: null,//涉恐类别
                dispositionl: null,//处置措施
                conclusion: null,//结论
                source: null//线索来源
            }
        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '基础信息',
                    isSelect: false,  //当前选中
                    lastSelect: false,  //最后选中
                    stage: 1  //阶段
                },
                {
                    id: '102',
                    menuName: '背景信息',
                    isSelect: false,
                    lastSelect: false,
                    stage: 2
                },
                {
                    id: '103',
                    menuName: '网上通联信息',
                    isSelect: false,
                    lastSelect: false,
                    stage: 3
                },
                {
                    id: '104',
                    menuName: '银行信息',
                    isSelect: false,
                    lastSelect: false,
                    stage: 4
                },
                {
                    id: '105',
                    menuName: '轨迹信息',
                    isSelect: false,
                    lastSelect: false,
                    stage: 5
                },
                {
                    id: '106',
                    menuName: '关联人',
                    isSelect: true,
                    lastSelect: true,
                    stage: 6
                },
                {
                    id: '107',
                    menuName: '研判分析',
                    isSelect: false,
                    lastSelect: false,
                    stage: 7
                },
            ]
        }
    }
    ,
    IntelligentRetrievalType: { //智能检索
        success: true,
        data: {
            count: 0,
            IntelligentRetrievalList: []
        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '全部',
                    isOpen: false,
                    search: 'type=mypc',
                    haveSon: false,
                    isSelect: true
                },
                {
                    id: '102',
                    menuName: '利剑数据',
                    isOpen: false,
                    search: 'type=mygz',
                    haveSon: false,
                    isSelect: false
                },
                {
                    id: '103',
                    menuName: '研判报告',
                    isOpen: false,
                    search: 'type=myzj',
                    haveSon: false,
                    isSelect: false
                },

            ]
        }
    },
    PersonalCenter: {
        success: true,
        data: {
            count: 0,
            users: []
        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '我的盘查',
                    isOpen: false,
                    search: 'type=mypc',
                    haveSon: false,
                    isSelect: true
                },
                {
                    id: '102',
                    menuName: '我的收藏',
                    isOpen: false,
                    search: 'type=mygz',
                    haveSon: false,
                    isSelect: false
                },
                // {
                //     id:'103',
                //     menuName: '我的足迹',
                //     isOpen: false,
                //     search:'type=myzj',
                //     haveSon:false,
                //     isSelect:false
                // },
                // {
                //     id:'104',
                //     menuName: '我的推送',
                //     isOpen: false,
                //     search:'type=myts',
                //     haveSon:false,
                //     isSelect:false
                // },
                // {
                //     id:'105',
                //     menuName: '我的接收',
                //     isOpen: false,
                //     search:'type=myjs',
                //     haveSon:false,
                //     isSelect:false
                // },
                {
                    id: '106',
                    menuName: '我的研判',
                    isOpen: false,
                    search: 'type=myyp',
                    haveSon: false,
                    isSelect: false
                }
            ]
        }
    },
    InterrogationRecordUsers: {
        success: true,
        data: {
            count: 0,
            interrogationRecord: []
        }
    },
    InterrogationDetailsUsers: {
        data: {
            interrogationDetails: {
                personnelInformation: {},
                basicInformation: {
                    temporaryPopulation: [],
                    marriageInf: [],
                    residenceMember: [],
                    relationship: [],
                    vehicle: [],
                    driver: []
                },
                bgInformationList: {
                    criminalPersonnel: [],
                    drugRelated: [],
                    trafficViolation: [],
                    relatedjiangzangStudent: [],
                    fugitives: []
                },
                swordData: {
                    essentialInformation: [],
                    vehicleBasicInformation: [],
                    influxPlace: [],
                    mobileBasicData: [],
                    installSoftwareRecords: [],
                    phoneRecords: [],
                    photoRecords: [],
                    internetRecords: [],
                    fileRecords: [],
                },
                activeTrajectoryList: {},
            }
        },
        uiData: {
            tabs: [
                {
                    id: '101',
                    tabName: '基础信息',
                    isSelect: true
                },
                {
                    id: '102',
                    tabName: '背景信息',
                    isSelect: false
                },
                {
                    id: '103',
                    tabName: '活动轨迹',
                    isSelect: false
                },
                {
                    id: '104',
                    tabName: '盘查数据',
                    isSelect: false
                }
            ]
        }
    },
    login: {
        isFetching: false,
        isAuthenticated: sessionStorage.getItem('id_token') ? true : false
    },
    SystemManagement: { //系统管理
        success: true,
        data: {
            placeOfInfluxPersonList: {
                list: [],
                count: 0
            },
            placeOfOriginPersonList: {
                list: [],
                count: 0
            },
            exceptionParameterReminder: {
                telephoneMaxNumber: 0,
                telephoneMinNumber: 0,
                callLogMaxNumber: 0,
                callLogMinNumber: 0,
                smsMaxNumber: 0,
                smsMinNumber: 0
            },
            highRiskCitiesList: {
                list: [],
                count: 0
            },
            highRiskLineList: {
                list: [],
                count: 0
            },


            whiteList: {
                list: [],
                count: 0
            },
            blackList: {
                list: [],
                count: 0
            },
            interrogationInformationList: {
                list: [],
                count: 0
            },
            horrorSoftwareList: {
                list: [],
                count: 0
            }
        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '涉恐软件',
                    isOpen: false,
                    search: 'type=all',
                    haveSon: false,
                    isSelect: true
                },
                {
                    id: '102',
                    menuName: '人工盘查',
                    isOpen: false,
                    search: 'type=gzry',
                    haveSon: false,
                    isSelect: false
                },
                {
                    id: '103',
                    menuName: '异常比对规则',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: false,
                    isSelect: false
                },
                {
                    id: '104',
                    menuName: '黑名单',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: false,
                    isSelect: false
                },
                {
                    id: '105',
                    menuName: '白名单',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: false,
                    isSelect: false
                },
                {
                    id: '106',
                    menuName: '高危地区',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: false,
                    isSelect: false
                    // sonMenu: [
                    //     {id:'1061',
                    //         menuName: '高危城市',
                    //         search:'type=ldry&state=1',
                    //         isSelect:false
                    //     },
                    //     {id:'1062',
                    //         menuName: '高危线路',
                    //         search:'type=ldry&state=2',
                    //         isSelect:false
                    //     },
                    //
                    // ]
                },
                {
                    id: '107',
                    menuName: '原籍地联系人',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: false,
                    isSelect: false
                },
                {
                    id: '108',
                    menuName: '流入地联系人',
                    isOpen: false,
                    search: 'type=ldry',
                    haveSon: false,
                    isSelect: false
                },
                {
                  id: '109',
                  menuName: '红名单',
                  isOpen: false,
                  search: 'type=ldry',
                  haveSon: false,
                  isSelect: false
                }
            ]
        }
    },
    ReportForms: {
        success: true,
        data: {
            distributeChartsList: {//分布情况
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []

            },
            originalChartsList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            liveChartsList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            sexChartsList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            obtainEmploymentChartsList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            ageChartsList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            AbnormalList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            AttentionCategoryList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            completeList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            inflowList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            dataSourcesList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            flowOutList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            activePersonnelList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            totalAttention: {//查询-总体数据的关注人员总和
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            taskTotalAttention: {//查询-利剑数据的关注人员总和
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            activityInflow: {//查询-活动数据的流入人员总和
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
            activityOutflow: {//查询-活动数据的流出人员总和
                reason: {
                    "code": "",
                    "text": ""
                },
                data: []
            },
        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '总体数据统计',
                    isOpen: false,
                    search: 'type=ztsjtj',
                    haveSon: false,
                    isSelect: true
                },
                {
                    id: '102',
                    menuName: '盘查数据统计',
                    isOpen: false,
                    search: 'type=ljsjtj',
                    haveSon: false,
                    isSelect: false
                },
                {
                    id: '103',
                    menuName: '活动数据统计',
                    isOpen: false,
                    search: 'type=hdsjtj',
                    haveSon: false,
                    isSelect: false
                }
            ]
        }
    }
};


export const lyInitialState = {
    root: {
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
        },
        uiData: {
            navigations: [ //导航集合
                {
                    id: '101',
                    navigationName: '首页',
                    isSelect: true,
                    path: "/LyHome"
                },
                {
                    id: '102',
                    navigationName: '盘查管理',
                    isSelect: false,
                    path: "/InventoryManagement"
                },
                {
                    id: '103',
                    navigationName: '任务管理',
                    isSelect: false,
                    path: "/TaskManagement"
                },
                {
                    id: '104',
                    navigationName: '卡口管理',
                    isSelect: false,
                    path: "/CustomsPassManagement"
                },
                {
                    id: '107',
                    navigationName: '统计报表',
                    isSelect: false,
                    path: "/Report"
                },
                {
                    id: '108',
                    navigationName: '系统管理',
                    isSelect: false,
                    path: "/LySystemManagement"
                }
            ],
            ModalDialogueBg: 'none'//遮罩展示与隐藏
        }
    },
    login: {
        isFetching: false,
        isAuthenticated: sessionStorage.getItem('id_token') ? true : false
    },
    InventoryManagement: { //盘查管理
        success: true,
        data: {
            personnelInventoryList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    total: 0,
                    list: [{
                        "id": "2132313123",
                        "checktime": "2017-06-12 08:45:12",
                        "police_name": "张三",
                        "police_idcard": "1232331321321321",
                        "police_code": "230001",
                        "police_area": "地区",
                        "police_unitcode": "单位",
                        "imei": "设备码",
                        "cid": "设备码",
                        "type": "盘查类型",
                        "idcard": "被盘查人身份号",
                        "zpurl": "http://iliulei.com/wp-content/uploads/2017/07/23212619910902101920170331160353486.png",
                        "sex": "性别",
                        "nation": "民族",
                        "address": "现住址",
                        "birth": "2017-07-28",
                        "idcard_issuing_authority": "身份证颁发机构",
                        "idcard_expiry_date": "身份证有效期",
                        "id_card_photo_path": "身份证照片地址",
                        "name": "张三",
                        "phoneNumber": '131111111111',
                        "tags": "重点人员, 在逃人员, 其他"
                    }],
                },
                isFetching: false

            },
            CarInventoryList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    total: 0,
                    list: [{
                        "id": "2132313123",
                        "checktime": "2017-06-12 08:45:12",
                        "police_name": "张三",
                        "police_idcard": "1232331321321321",
                        "police_code": "230001",
                        "police_area": "地区",
                        "police_unitcode": "单位",
                        "imei": "设备码",
                        "cid": "设备码",
                        "type": "盘查类型",
                        "idcard": "被盘查人身份号",
                        "zpurl": "http://iliulei.com/wp-content/uploads/2017/07/23212619910902101920170331160353486.png",
                        "sex": "性别",
                        "nation": "民族",
                        "address": "现住址",
                        "birth": "2017-07-28",
                        "idcard_issuing_authority": "身份证颁发机构",
                        "idcard_expiry_date": "身份证有效期",
                        "id_card_photo_path": "身份证照片地址",
                        "name": "zhangsan",
                        "phoneNumber": '131111111111',
                        "tags": "重点人员, 在逃人员, 其他"
                    }],
                },
                isFetching: false
            },
            CumtomerpersonnelList:{
                reason: {
                    "code": "",
                    "text": ""
                },
                result:{
                    total:0,
                    list:[{
                         "id": "2132313123",
                        "checktime": "2017-06-12 08:45:12",
                        "police_name": "张三",
                        "police_idcard": "1232331321321321",
                        "police_code": "230001",
                        "police_area": "地区",
                        "police_unitcode": "单位",
                        "imei": "设备码",
                        "cid": "设备码",
                        "type": "盘查类型",
                        "idcard": "被盘查人身份号",
                        "zpurl": "http://iliulei.com/wp-content/uploads/2017/07/23212619910902101920170331160353486.png",
                        "sex": "性别",
                        "nation": "民族",
                        "address": "现住址",
                        "birth": "2017-07-28",
                        "idcard_issuing_authority": "身份证颁发机构",
                        "idcard_expiry_date": "身份证有效期",
                        "id_card_photo_path": "身份证照片地址",
                        "name": "张三",
                        "phoneNumber": '131111111111',
                        "tags": "重点人员, 在逃人员, 其他"
                    }],
                }
                
            },
            CumtomerCarList:{
               reason: {
                    "code": "",
                    "text": ""
                },
                result:{
                    total:0,
                    list:[{
                         "id": "2132313123",
                        "checktime": "2017-06-12 08:45:12",
                        "police_name": "张三",
                        "police_idcard": "1232331321321321",
                        "police_code": "230001",
                        "police_area": "地区",
                        "police_unitcode": "单位",
                        "imei": "设备码",
                        "cid": "设备码",
                        "type": "盘查类型",
                        "idcard": "被盘查人身份号",
                        "zpurl": "http://iliulei.com/wp-content/uploads/2017/07/23212619910902101920170331160353486.png",
                        "sex": "性别",
                        "nation": "民族",
                        "address": "现住址",
                        "birth": "2017-07-28",
                        "idcard_issuing_authority": "身份证颁发机构",
                        "idcard_expiry_date": "身份证有效期",
                        "id_card_photo_path": "身份证照片地址",
                        "name": "zhangsan",
                        "phoneNumber": '131111111111',
                        "tags": "重点人员, 在逃人员, 其他"
                    }],
                }
            },
            relevancePersonList:{//关联人员
                reason: {
                    "code": "",
                    "text": ""
                },
                result:{
                    total:0,
                    list:[],
                }
            },
            relevanceCarList:{//关联车辆
                reason: {
                    "code": "",
                    "text": ""
                },
                result:{
                    total:0,
                    list:[],
                }
            }
        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '巡逻盘查',
                    isOpen: true,
                    search: 'type=ldpc',
                    haveSon: true,
                    isSelect: false,
                    sonMenu: [
                        {
                            id: '101001',
                            menuName: '人员盘查',
                            isOpen: false,
                            search: 'type=all',
                            haveSon: false,
                            isSelect: true
                        },
                        {
                            id: '101002',
                            menuName: '车辆盘查',
                            isOpen: false,
                            search: 'type=gzry',
                            haveSon: false,
                            isSelect: false
                        }
                    ]
                }, {
                    id: '102',
                    menuName: '卡点盘查',
                    isOpen: false,
                    search: 'type=ldpc',
                    haveSon: true,
                    isSelect: false,
                    sonMenu: [
                        {
                            id: '102001',
                            menuName: '人员盘查',
                            isOpen: false,
                            search: 'type=all',
                            haveSon: false,
                            isSelect: false
                        },
                        {
                            id: '102002',
                            menuName: '车辆盘查',
                            isOpen: false,
                            search: 'type=gzry',
                            haveSon: false,
                            isSelect: false
                        }
                    ]
                }

            ]
        }
    },
    //统计报表
    Report:{
        success: true,
        data:{
            taskStatisticsList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    total: 0,
                    list: [{
                        "id": "2132313123",
                        "checktime": "2017-06-12 08:45:12",
                        "police_name": "张三",
                        "police_idcard": "1232331321321321",
                        "police_code": "230001",
                        "police_area": "地区",
                        "police_unitcode": "单位",
                        "imei": "设备码",
                        "cid": "设备码",
                        "type": "盘查类型",
                        "idcard": "被盘查人身份号",
                        "zpurl": "http://iliulei.com/wp-content/uploads/2017/07/23212619910902101920170331160353486.png",
                        "sex": "性别",
                        "nation": "民族",
                        "address": "现住址",
                        "birth": "2017-07-28",
                        "idcard_issuing_authority": "身份证颁发机构",
                        "idcard_expiry_date": "身份证有效期",
                        "id_card_photo_path": "身份证照片地址",
                        "name": "张三",
                        "phoneNumber": '131111111111',
                        "tags": "重点人员, 在逃人员, 其他"
                    }],
                },
                isFetching: false
            },
            taskHIstoryList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    total: 0,
                    list: [],
                },
                isFetching: false
            },
        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '盘查历史统计',
                    isOpen: false,
                    search: 'type=pclstj',
                    haveSon: false,
                    isSelect: true,
                },
                {
                    id: '102',
                    menuName: '任务统计',
                    isOpen: true,
                    search: 'type=rwtj',
                    haveSon: false,
                    isSelect: false,
                }, 

            ]
        }

    },
    CustomsPassManagement: { //卡口
        success: true,
        data: {
            personnelInventoryList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    total: 0,
                    list: [/*{
                        "id": "2132313123",
                        "checktime": "2017-06-12 08:45:12",
                        "police_name": "张三",
                        "police_idcard": "1232331321321321",
                        "police_code": "230001",
                        "police_area": "地区",
                        "police_unitcode": "单位",
                        "imei": "设备码",
                        "cid": "设备码",
                        "type": "盘查类型",
                        "idcard": "被盘查人身份号",
                        "zpurl": "http://iliulei.com/wp-content/uploads/2017/07/23212619910902101920170331160353486.png",
                        "sex": "性别",
                        "nation": "民族",
                        "address": "现住址",
                        "birth": "2017-07-28",
                        "idcard_issuing_authority": "身份证颁发机构",
                        "idcard_expiry_date": "身份证有效期",
                        "id_card_photo_path": "身份证照片地址",
                        "name": "张三",
                        "phoneNumber": '131111111111',
                        "tags": "重点人员, 在逃人员, 其他"
                    }*/],
                }

            },
            CarInventoryList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    total: 0,
                    list: [/*{
                        "id": "2132313123",
                        "checktime": "2017-06-12 08:45:12",
                        "police_name": "张三",
                        "police_idcard": "1232331321321321",
                        "police_code": "230001",
                        "police_area": "地区",
                        "police_unitcode": "单位",
                        "imei": "设备码",
                        "cid": "设备码",
                        "type": "盘查类型",
                        "idcard": "被盘查人身份号",
                        "zpurl": "http://iliulei.com/wp-content/uploads/2017/07/23212619910902101920170331160353486.png",
                        "sex": "性别",
                        "nation": "民族",
                        "address": "现住址",
                        "birth": "2017-07-28",
                        "idcard_issuing_authority": "身份证颁发机构",
                        "idcard_expiry_date": "身份证有效期",
                        "id_card_photo_path": "身份证照片地址",
                        "name": "zhangsan",
                        "phoneNumber": '131111111111',
                        "tags": "重点人员, 在逃人员, 其他"
                    }*/],
                }
            },

        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '人员盘查',
                    isOpen: false,
                    search: 'type=all',
                    haveSon: false,
                    isSelect: true
                },
                {
                    id: '102',
                    menuName: '车辆盘查',
                    isOpen: false,
                    search: 'type=gzry',
                    haveSon: false,
                    isSelect: false
                },
                // {
                //     id:'103',
                //     menuName: '卡口盘查',
                //     isOpen: false,
                //     search:'type=ldry',
                //     haveSon:false,
                //     isSelect:false
                // },

            ]
        }
    }

};


export const lyInitialStateReturn = {
    root: {
        data: {
            provinceList: [], //省份集合
            cityList: [],//城市集合
            cityListReserve: [],//储备城市集合
            judgmentLevelList: [],//研判级别集合
            terrorTypeList: [],//涉恐类别集合
            dispositionlList: []//处置措施集合
        },
        uiData: {
            navigations: [ //导航集合
                {
                    id: '101',
                    navigationName: '首页',
                    isSelect: true,
                    path: "/LyHome"
                },
                {
                    id: '102',
                    navigationName: '盘查管理',
                    isSelect: false,
                    path: "/InventoryManagement"
                },
                {
                    id: '103',
                    navigationName: '任务管理',
                    isSelect: false,
                    path: "/TaskManagement"
                },
                {
                    id: '104',
                    navigationName: '卡口管理',
                    isSelect: false,
                    path: "/CustomsPassManagement"
                },
                {
                    id: '107',
                    navigationName: '统计报表',
                    isSelect: false,
                    path: "/Report"
                },
                {
                    id: '108',
                    navigationName: '系统管理',
                    isSelect: false,
                    path: "/LySystemManagement"
                }
            ],
            ModalDialogueBg: 'none'//遮罩展示与隐藏
        }
    },
    login: {
        isFetching: false,
        isAuthenticated: sessionStorage.getItem('id_token') ? true : false
    },
    InventoryManagement: { //盘查管理
        success: true,
        data: {
            personnelInventoryList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    total: 0,
                    list: [{
                        "id": "2132313123",
                        "checktime": "2017-06-12 08:45:12",
                        "police_name": "张三",
                        "police_idcard": "1232331321321321",
                        "police_code": "230001",
                        "police_area": "地区",
                        "police_unitcode": "单位",
                        "imei": "设备码",
                        "cid": "设备码",
                        "type": "盘查类型",
                        "idcard": "被盘查人身份号",
                        "zpurl": "http://iliulei.com/wp-content/uploads/2017/07/23212619910902101920170331160353486.png",
                        "sex": "性别",
                        "nation": "民族",
                        "address": "现住址",
                        "birth": "2017-07-28",
                        "idcard_issuing_authority": "身份证颁发机构",
                        "idcard_expiry_date": "身份证有效期",
                        "id_card_photo_path": "身份证照片地址",
                        "name": "张三",
                        "phoneNumber": '131111111111',
                        "tags": "重点人员, 在逃人员, 其他"
                    }],
                }

            },
            CarInventoryList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    total: 0,
                    list: [{
                        "id": "2132313123",
                        "checktime": "2017-06-12 08:45:12",
                        "police_name": "张三",
                        "police_idcard": "1232331321321321",
                        "police_code": "230001",
                        "police_area": "地区",
                        "police_unitcode": "单位",
                        "imei": "设备码",
                        "cid": "设备码",
                        "type": "盘查类型",
                        "idcard": "被盘查人身份号",
                        "zpurl": "http://iliulei.com/wp-content/uploads/2017/07/23212619910902101920170331160353486.png",
                        "sex": "性别",
                        "nation": "民族",
                        "address": "现住址",
                        "birth": "2017-07-28",
                        "idcard_issuing_authority": "身份证颁发机构",
                        "idcard_expiry_date": "身份证有效期",
                        "id_card_photo_path": "身份证照片地址",
                        "name": "zhangsan",
                        "phoneNumber": '131111111111',
                        "tags": "重点人员, 在逃人员, 其他"
                    }],
                }
            },

        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '巡逻盘查',
                    isOpen: true,
                    search: 'type=ldpc',
                    haveSon: true,
                    isSelect: false,
                    sonMenu: [
                        {
                            id: '101001',
                            menuName: '人员盘查',
                            isOpen: false,
                            search: 'type=all',
                            haveSon: false,
                            isSelect: true
                        },
                        {
                            id: '101002',
                            menuName: '车辆盘查',
                            isOpen: false,
                            search: 'type=gzry',
                            haveSon: false,
                            isSelect: false
                        }
                    ]
                }, {
                    id: '102',
                    menuName: '卡口盘查',
                    isOpen: false,
                    search: 'type=ldpc',
                    haveSon: true,
                    isSelect: false,
                    sonMenu: [
                        {
                            id: '102001',
                            menuName: '人员盘查',
                            isOpen: false,
                            search: 'type=all',
                            haveSon: false,
                            isSelect: false
                        },
                        {
                            id: '102002',
                            menuName: '车辆盘查',
                            isOpen: false,
                            search: 'type=gzry',
                            haveSon: false,
                            isSelect: false
                        }
                    ]
                }

            ]
        }
    },
     //统计报表
    Report:{
        success: true,
        data:{
            taskStatisticsList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    total: 0,
                    list: [{
                        "id": "2132313123",
                        "checktime": "2017-06-12 08:45:12",
                        "police_name": "张三",
                        "police_idcard": "1232331321321321",
                        "police_code": "230001",
                        "police_area": "地区",
                        "police_unitcode": "单位",
                        "imei": "设备码",
                        "cid": "设备码",
                        "type": "盘查类型",
                        "idcard": "被盘查人身份号",
                        "zpurl": "http://iliulei.com/wp-content/uploads/2017/07/23212619910902101920170331160353486.png",
                        "sex": "性别",
                        "nation": "民族",
                        "address": "现住址",
                        "birth": "2017-07-28",
                        "idcard_issuing_authority": "身份证颁发机构",
                        "idcard_expiry_date": "身份证有效期",
                        "id_card_photo_path": "身份证照片地址",
                        "name": "张三",
                        "phoneNumber": '131111111111',
                        "tags": "重点人员, 在逃人员, 其他"
                    }],
                },
                isFetching: false
            },
            taskHIstoryList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    total: 0,
                    list: [{
                        "id": "2132313123",
                        "checktime": "2017-06-12 08:45:12",
                        "police_name": "张三",
                        "police_idcard": "1232331321321321",
                        "police_code": "230001",
                        "police_area": "地区",
                        "police_unitcode": "单位",
                        "imei": "设备码",
                        "cid": "设备码",
                        "type": "盘查类型",
                        "idcard": "被盘查人身份号",
                        "zpurl": "http://iliulei.com/wp-content/uploads/2017/07/23212619910902101920170331160353486.png",
                        "sex": "性别",
                        "nation": "民族",
                        "address": "现住址",
                        "birth": "2017-07-28",
                        "idcard_issuing_authority": "身份证颁发机构",
                        "idcard_expiry_date": "身份证有效期",
                        "id_card_photo_path": "身份证照片地址",
                        "name": "张三",
                        "phoneNumber": '131111111111',
                        "tags": "重点人员, 在逃人员, 其他"
                    }],
                },
                isFetching: false
            },
        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '任务统计',
                    isOpen: true,
                    search: 'type=ldpc',
                    haveSon: false,
                    isSelect: true,
                }, {
                    id: '102',
                    menuName: '盘查历史统计',
                    isOpen: false,
                    search: 'type=ldpc',
                    haveSon: false,
                    isSelect: false,
                }

            ]
        }

    },
    CustomsPassManagement: { //卡口
        success: true,
        data: {
            personnelInventoryList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    total: 0,
                    list: [{
                        "id": "2132313123",
                        "checktime": "2017-06-12 08:45:12",
                        "police_name": "张三",
                        "police_idcard": "1232331321321321",
                        "police_code": "230001",
                        "police_area": "地区",
                        "police_unitcode": "单位",
                        "imei": "设备码",
                        "cid": "设备码",
                        "type": "盘查类型",
                        "idcard": "被盘查人身份号",
                        "zpurl": "http://iliulei.com/wp-content/uploads/2017/07/23212619910902101920170331160353486.png",
                        "sex": "性别",
                        "nation": "民族",
                        "address": "现住址",
                        "birth": "2017-07-28",
                        "idcard_issuing_authority": "身份证颁发机构",
                        "idcard_expiry_date": "身份证有效期",
                        "id_card_photo_path": "身份证照片地址",
                        "name": "张三",
                        "phoneNumber": '131111111111',
                        "tags": "重点人员, 在逃人员, 其他"
                    }],
                }

            },
            CarInventoryList: {
                reason: {
                    "code": "",
                    "text": ""
                },
                result: {
                    total: 0,
                    list: [{
                        "id": "2132313123",
                        "checktime": "2017-06-12 08:45:12",
                        "police_name": "张三",
                        "police_idcard": "1232331321321321",
                        "police_code": "230001",
                        "police_area": "地区",
                        "police_unitcode": "单位",
                        "imei": "设备码",
                        "cid": "设备码",
                        "type": "盘查类型",
                        "idcard": "被盘查人身份号",
                        "zpurl": "http://iliulei.com/wp-content/uploads/2017/07/23212619910902101920170331160353486.png",
                        "sex": "性别",
                        "nation": "民族",
                        "address": "现住址",
                        "birth": "2017-07-28",
                        "idcard_issuing_authority": "身份证颁发机构",
                        "idcard_expiry_date": "身份证有效期",
                        "id_card_photo_path": "身份证照片地址",
                        "name": "zhangsan",
                        "phoneNumber": '131111111111',
                        "tags": "重点人员, 在逃人员, 其他"
                    }],
                }
            },

        },
        uiData: {
            menus: [
                {
                    id: '101',
                    menuName: '人员盘查',
                    isOpen: false,
                    search: 'type=all',
                    haveSon: false,
                    isSelect: true
                },
                {
                    id: '102',
                    menuName: '车辆盘查',
                    isOpen: false,
                    search: 'type=gzry',
                    haveSon: false,
                    isSelect: false
                },
                // {
                //     id:'103',
                //     menuName: '卡口盘查',
                //     isOpen: false,
                //     search:'type=ldry',
                //     haveSon:false,
                //     isSelect:false
                // },

            ]
        }
    }

};
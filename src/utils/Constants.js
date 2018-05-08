//常量类

//分页数量
export const pageSize = 16;


//电子档案、盘查记录内表格分页数量
export const recordPageSize = 6;

//设置地图分段颜色的倍数
export const doubleNum = 1.5;

/*
 字典
 */
//涉恐类别
export const DICT_TERROR_TYPE = 'dict_terror_type';
//研判级别
export const DICT_JUDGMENT_LEVEL = 'dict_judgment_level';
//处置措施
export const DICT_DISPOSITIONL = 'dict_dispositionl';

//统计报表菜单几个模块
export const REPORTFORMS_MENU_POPULATION = "总体数据统计"
export const REPORTFORMS_MENU_TASK = "盘查数据统计"
export const REPORTFORMS_MENU_ACTIVITY = "活动数据统计"

//个人中心模块
export const PERSONALCENTER_MODULE = 'personalcenter_module';
//动态管控模块
export const DYNAMICCONTROL_MODULE = 'dynamiccontrol_module';
//卡点管理模块
export const AREAMANAGEMENT_MODULE = '卡点管理';
//卡点管理模块
export const CONTROLPERSONNEL_MODULE = '管控人员';
export const CONTROLPERSONNEL_MODULE_GZ_NLHRY = '拟来呼人员';
export const CONTROLPERSONNEL_MODULE_GZ_ZALY = '治安来源';
export const CONTROLPERSONNEL_MODULE_GK_WGK = '未管控';
export const CONTROLPERSONNEL_MODULE_GK_YGK = '已管控';
export const CONTROLPERSONNEL_MODULE_GK_LKZRQ = '离开责任区';
export const CONTROLPERSONNEL_MODULE_GK_SK = '失控';
export const CONTROLPERSONNEL_MODULE_DR = '导入';
export const CONTROLPERSONNEL_MODULE_XZ = '新增';
//系统设置模块（呼市）
export const SYSREMSETUP_MODULE = '系统设置';
export const SYSREMSETUP_MODULE_Add = '添加到任务';
export const SYSREMSETUP_MODULE_Choice = '选择责任单位';
//智能检索模块
export const INTELLIGENTRETRIEVAL_MODULE = 'intelligentretrieval_module';
//设置管理模块
export const SYSTEMMANAGEMENT_MODULE = 'systemmanagement_module';
//统计报表模块(反恐利剑)
export const REPORTFORM_MODULE = 'reportform_module';
//统计报表模块(呼市)
export const REPORTFORMS_MODULE = 'reportforms_module';
//盘查详情页模块
export const INTERROGATIONDETAILS_MODULE = 'interrogationdetails_module';
export const ELETRO_MODULE = 'eletro_module';
//研判报告模块-进度条
export const AUDIT_REPORT_MODULE = "audit_report_module"
//洛阳
//设置盘查管理模块
export const INVENTORYMANAGEMENT_MODULE = 'Inventorymanagement_module';
//设置卡口管理模块
export const CUSTOMMANAGEMENT_MODULE = 'CustomManagement_module';
//设置统计报表模块
export const REPORTLY_MODULE = 'ReportLy_module';
//设置临控管理模块
export const DEFINEWARE_MODULE = 'DefineWare_module';
//设置任务管理模块
export const TaskMANAGEMENT_MODULE = 'TaskManagement_module';
// 盘查管理（呼市）
export const INVENTORYMANAGEMENT_HUSHI_MODULE = '盘查管理';
//设置周期任务-按天(呼市)
export const INVENTORYMANAGEMENT_HUSHI_MODULE_AT = '按天';
//设置周期任务-按周(呼市)
export const INVENTORYMANAGEMENT_HUSHI_MODULE_AZ = '按周';
//自定义库模块
// export const DEFINE_WAREHOUSE_MODULE = 'define_warehouse_module';


//设置盘查管理侧边导航_洛阳
export const INVENTORYMANAGEMENT_MENU = "流动盘查"//盘查管理一级菜单
export const INVENTORYMANAGEMENT_MENU_PERDONNEL = "人员盘查"
export const INVENTORYMANAGEMENT_MENU_CAR = "车辆盘查"
export const INVENTORYMANAGEMENT_MENU_BAYONET = "卡点盘查"
//设置洛阳——卡口盘查 菜单的名称，用来判断
export const CUSTOMERMANAGEMENT_MENU_POINT = "卡点管理"
// export const CUSTOMERMANAGEMENT_MENU_PERDONNEL = "人员盘查"
// export const CUSTOMERMANAGEMENT_MENU_CAR = "车辆盘查"
//设置统计报表_洛阳 菜单名称
export const TASKSTATISTICSNAME_MENU_REPORT = "任务统计"
export const HISTORYSTATISTICSNAME_MENU_REPORT = "盘查历史统计"
//设置临控库管理_洛阳 菜单名称
export const DEFINEWAREHOUSE_MENU_PERSON = "临控人员"
export const DEFINEWAREHOUSE_MENU_CAR = "临控车辆"
// 任务管理 菜单名称
export const TASKMANAGEMENT_MENU = "任务管理"
// 任务管理 菜单名称
export const TASKMANAGEMENT_MENU_PATROL = "任务设置"
export const TASKMANAGEMENT_MENU_POINT = "待办任务"
export const TASKMANAGEMENT_MENU_DONE = "已办任务"
export const TASKMANAGEMENT_MENU_OUT = "超期任务"
////////////////////////////////////////////////////////////////////
export const SYSTEMMANAGEMENT_MENU_HORRORSOFTWARE = "涉恐软件"
export const SYSTEMMANAGEMENT_MENU_INTERROGATIONINFORMATION = "特征设置"
export const SYSTEMMANAGEMENT_MENU_ABNORMALEMINDER = "异常比对规则"
export const SYSTEMMANAGEMENT_MENU_BLACKLIST = "黑名单"
export const SYSTEMMANAGEMENT_MENU_WHITELIST = "白名单"
export const SYSTEMMANAGEMENT_MENU_HIGHRISKAREA = "高危地区"

export const SYSTEMMANAGEMENT_MENU_HIGHRISK_CITIES = "高危城市"
export const SYSTEMMANAGEMENT_MENU_HIGHRISK_LINE = "高危线路"

export const SYSTEMMANAGEMENT_MENU_PLACEOFORIGINPERSON = "原籍地联系人"
export const SYSTEMMANAGEMENT_MENU_PLACEOFINFLUXPERSON = "流入地联系人"
export const SYSTEMMANAGEMENT_MENU_REDLIST = "红名单"
export const SYSTEMMANAGEMENT_MENU_SAVEREDLIST = "保存红名单"
export const SYSTEMMANAGEMENT_MENU_CODE = "数据字典"

//盘查详情页tab
export const INTERROGATIONDETAILS_TAB_BASIC = "基础信息"
export const INTERROGATIONDETAILS_TAB_CONTEXT = "背景信息"
export const INTERROGATIONDETAILS_TAB_ACTIVE_TRAJECTORY = "活动轨迹"
export const INTERROGATIONDETAILS_TAB_LJ_DATA = "盘查数据"
export const INTERROGATIONDETAILS_TAB_NEW_LJ_DATA = "最新盘查数据"

//智能检索tab
export const INTELLIGENTRETRIEVAL_ALL = "全部"
export const INTELLIGENTRETRIEVAL_LJ_DATA = "利剑数据"
export const INTELLIGENTRETRIEVAL_AUDIT_REPORT = "研判报告"

//研判报告
export const AUDIT_REPORT_BASICIN_FORMATION = "基础信息"
// export const Audit_Report_AUDIT_REPORT="研判报告"
// export const Audit_Report_AUDIT_REPORT="研判报告"
// export const Audit_Report_AUDIT_REPORT="研判报告"
// export const Audit_Report_AUDIT_REPORT="研判报告"
// export const Audit_Report_AUDIT_REPORT="研判报告"
export const AUDIT_REPORT_BG_INFORMATION = "背景信息"
export const AUDIT_REPORT_ONLINE_INFORMATION = "网上通联信息"
export const AUDIT_REPORT_BANK_INFORMATION = "银行信息"
export const AUDIT_REPORT_RELATED_PERSON = "关联人"


export const AUDIT_REPORT_JUDGMENT_ANALYSIS = "研判分析"
export const AUDIT_REPORT_TRAJECTORY_INFORMATION = "轨迹信息"


//LuoYang
//洛阳盘查管理 查询类型
export const inventoryType = {
    patrolPerson: '904002',  //人员盘查  巡逻
    patrolCar: '904001', //车辆盘查  巡逻
    customsPassPerson: '904015', //人员盘查  卡口
    customsPassCar: '904016'//车辆盘查  卡口
}
//反恐利剑
export const dybamicControlType = {
    all: '101',  //全部
    followPerson: '102', //关注人员
    abnormal: '1021', //盘查异常
    keyPerson: '1022', //重点人员
    clinicalControl: '1023', //临控对象
    reconnaissance: '1024', //在侦在控
    flowPerson: '103', //流动人员
    notLanded: '1031', //未落地人员
    inflow: '1032', //流入人员
    outflow: '1033', //流出人员
    beMissing: '1034', //失踪人员
}
export const dybamicControlCode = {
    all: '',  //全部
    followPerson: '102', //关注人员
    abnormal: '1021', //盘查异常
    keyPerson: '201001', //重点人员
    clinicalControl: '201003', //临控对象
    reconnaissance: '201002', //在侦在控
    flowPerson: '103', //流动人员
    notLanded: '1031', //未落地人员
    inflow: '1032', //流入人员
    outflow: '1033', //流出人员
    beMissing: '1034', //失踪人员
   
}

//个人中心
export const personalCenterType = {
    myInventory: '101',  //我的盘查
    myFollow: '102', //我的收藏
    myJudge: '106', //我的研判
}

//智能检索
export const intellgentRetrievalType = {
    all: '101',  //全部
    swordData: '102', //利剑数据
    judgeReport: '106', //研判报告
}

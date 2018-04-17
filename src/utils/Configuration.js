/**
 * 配置文件
 */

//系统名称
/*export const sysName = '反恐利剑信息化作战系统';*/
export const sysName = global.configUrl.sysName;
//开发模式
export const developmentModeList = {mock:'mock',standard:'standard'};//easy-mock模式 随机数据    standard标准模式 调用标准接口数据
export const developmentMode = developmentModeList.standard;


//客户区域
/*export const clientArea  = "广西";*/

//安全中心地址         czp 172.19.12.232:8081
export  const  securityCenterUrl = global.configUrl.securityCenterUrl;
export  const  securityCenterUrls = global.configUrl.securityCenterUrls;

//登陆地址
export  const  loginUrl = global.configUrl.loginUrl;

//洛阳  http://10.58.45.4:8100    http://172.19.12.217:8071
//4.4 http://172.19.4.4:7070
//http://172.19.12.232:8081
//广西 http://10.148.77.204:8100
//济南 http://10.48.142.138:8100
//吉林省 http://10.106.73.203:8100  http://10.106.73.202:8100
// export const  serverUrl = "http://172.19.12.147:7077";
//http://10.58.45.4:7000 http://172.19.12.147:7077   http://172.19.12.195:8888

export const  serverUrl = global.configUrl.serverUrl;
//shd  演示接口 http://172.19.12.195:8888
//shd  开发中接口 http://172.19.12.195:8889
// /data-service


//PKI登录是否开启
/*export  const  pkiLoginIsOpen = false;*/
export  const  pkiLoginIsOpen = global.configUrl.pkiLoginIsOpen;

//版本号调用
export const versionNumberQuote = global.configUrl.versionNumber;








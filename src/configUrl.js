const Interface = {//服务器
  luoyang: 'http://10.58.45.4:8100',
  jiamusi: 'http://10.116.1.215:8100',
  tianjin: 'http://20.3.2.31:8100',
  chongqing: 'http://10.158.35.98:8100',
  ceshizuji1: 'http://172.19.1.140:8100',
  ceshizuji2: 'http://172.19.4.4:7070',
  test: 'http://172.19.1.145:7000',
  fxdl: '/data-service',
  lsfxdl: '/data-service-wwhc',
  fkww:'/fkww-data-service',
  MXD: 'http://172.19.12.102:8888',//慕兴达
  ZZH: 'http://172.19.12.213:8088/data-service',//张泽恒
  pingshiTest:'http://172.19.12.249:8888'
};
const securityCenter = {//安全中心
  test: 'http://172.19.1.145:8100',
  ZX: 'http://172.19.12.165:8080',//张旭接口
  pingshiTest: 'http://172.19.12.249:8100',
  fxdl:'/security-service',
};


global.configUrl = {
  //系统名称
  sysName: '反恐利剑信息化作战系统',

  securityCenterUrl: securityCenter.ZX,
  serverUrl: Interface.ZZH,
//测试打包
  // securityCenterUrl: securityCenter.fxdl,
  // serverUrl: Interface.fkww,
  messageQueue:'ws://172.19.12.249:7005/myHandler',
  //客户区域
  clientArea: '黑龙江',
  //PKI登录是否开启
  pkiLoginIsOpen: false,
  // 首页 拟来某地区展示图的配置文字
  configureRegionText: '流入人员',
  //版本号
  versionNumber: '1.0.0.1 演示版',
}
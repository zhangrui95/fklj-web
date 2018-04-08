export const dateFormat = 'YYYY-MM-DD';
export const monthFormat = 'YYYY-MM';

//获取当前的日期时间 格式“yyyy-MM-dd HH:MM:SS”
export function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}

/**
 * js将字符串转成日期格式，返回年月日
 * @param dateStr 日期字符串
 * @param type 转换类型 d返回日、md返回月日、ymd返回年月日
 */
export function getYmd(dateStr, type) {
    var date = new Date(Date.parse(dateStr.replace(/-/g, "/")));
    var mm = date.getMonth() + 1;
    //月
    var dd = date.getDate();
    //日
    var yy = date.getFullYear();
    //年
    if (type == "d") {
        return dd;
    } else if (type == "md") {
        return mm + "-" + dd;
    } else if (type == "ymd") {
        return yy + "-" + mm + "-" + dd;
    }
}


/**
 * 根据当前天，获取本周周一的日期
 */
export function getMondayTime() {
    var now = new Date();
    var nowTime = now.getTime();//指定的日期时间距1970-01-01午夜（DMT）时间的毫秒数
    var day = now.getDay();//星期当天的数字
    var oneDayLong = 24 * 60 * 60 * 1000;
    var MondayTime = nowTime - (day - 1) * oneDayLong;
    var monday = new Date(MondayTime);
    monday=monday.getFullYear() + '-' + (monday.getMonth() + 1) + '-' + monday.getDate();
    return monday;
}
/**
 * 根据当前天，获取本周周天的日期
 */
export function getSundayTime() {
    var now = new Date();
    var nowTime = now.getTime();
    var day = now.getDay();
    var oneDayLong = 24 * 60 * 60 * 1000;
    var SundayTime = nowTime + (7 - day) * oneDayLong;
    var sunday = new Date(SundayTime);
    sunday=sunday.getFullYear() + '-' + (sunday.getMonth() + 1) + '-' + sunday.getDate();
    return sunday;
}

//获取一周前的时间
export function getWeekDate() {
    var now = new Date();
    var newDate = new Date(now.getTime() - 6 * 24 * 3600 * 1000);
    var line = '-';
    var year = newDate.getFullYear();
    var month = newDate.getMonth() + 1;//getMonth()获取月份0-11，0代表1月份，但是要展现出来只能+1
    var strDate = newDate.getDate();

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate;
    }
    var nowWeekDate = year + line + month + line + strDate;
    return nowWeekDate;
}


export function getLastDay(year,month)     
{     
 var new_year = year;  //取当前的年份     
 var new_month = ++month;//取下一个月的第一天，方便计算（最后一天不固定）     
 if(month>11)      //如果当前大于12月，则年份转到下一年     
 {     
 new_month -=12;    //月份减     
 new_year++;      //年份增     
 }     
 var new_date = new Date(new_year,new_month,1);        //取当年当月中的第一天     
 return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期     
} 

//身份证校验
function testid (rule, value, callback){
    const id = value;
    if (id) {
    // 1 "验证通过!", 0 //校验不通过
       var format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
       //号码规则校验
       if(!format.test(id)){
           //return {'status':0,'msg':'身份证号码不合规'};
           callback('身份证号码不合规', 'input Spaces, please check');
           return;
       }
       //区位码校验
       //出生年月日校验   前正则限制起始年份为1900;
       var year = id.substr(6,4),//身份证年
           month = id.substr(10,2),//身份证月
           date = id.substr(12,2),//身份证日
           time = Date.parse(month+'-'+date+'-'+year),//身份证日期时间戳date
           now_time = Date.parse(new Date()),//当前时间戳
           dates = (new Date(year,month,0)).getDate();//身份证当月天数
       if(time>now_time||date>dates){
        //    return {'status':0,'msg':'出生日期不合规'}
        callback('出生日期不合规', 'input Spaces, please check');
        return;
       }
       //校验码判断
       var c = new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);   //系数
       var b = new Array('1','0','X','9','8','7','6','5','4','3','2');  //校验码对照表
       var id_array = id.split("");
       var sum = 0;
       for(var k=0;k<17;k++){
           sum+=parseInt(id_array[k])*parseInt(c[k]);
       }
       if(id_array[17].toUpperCase() != b[sum%11].toUpperCase()){
           //return {'status':0,'msg':'身份证校验码不合规'}
           callback('身份证校验码不合规', 'input Spaces, please check');
           return;
       }
       //return {'status':1,'msg':'校验通过'}
       callback();
       return;
    }
}
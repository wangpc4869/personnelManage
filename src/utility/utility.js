//设置时间格式
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
//获取时间段
export function time_quantum (day,fmt) {
  const dateList = [...Array(day).keys()].map(days => {
    let t = new Date(Date.now() - 86400000 * days);
    let str = formatDate(t,fmt);
    return str;
  });
  return dateList;
}
//获取星期
export function week_quantum (day,arr) {
  const dateList = [...Array(day).keys()].map(days => {
    let week = arr;
    let t = new Date(Date.now() - 86400000 * days);
    let day = t.getDay();//获取星期
    return week[day];
  });
  return dateList;
}
//获取上一个月
export function prev_date(date) {
  let arr = date.split('-');
  let year = arr[0]; //获取当前日期的年份
  let month = arr[1]; //获取当前日期的月份
  let day = arr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中月的天数
  let year2 = year;
  let month2 = parseInt(month) - 1;
  if (month2 == 0) {
    year2 = parseInt(year2) - 1;
    month2 = 12;
  }
  let day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }

  let value = year2 + '-' + month2 + '-' + day2;
  return value;
}
//获取下一个月
export function next_date (date) {
  let arr = date.split('-');
  let year = arr[0]; //获取当前日期的年份
  let month = arr[1]; //获取当前日期的月份
  let day = arr[2]; //获取当前日期的日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前日期中的月的天数
  let year2 = year;
  let month2 = parseInt(month) + 1;
  if (month2 == 13) {
    year2 = parseInt(year2) + 1;
    month2 = 1;
  }
  let day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }

  let value = year2 + '-' + month2 + '-' + day2;
  return value;
}
//时间补零
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};


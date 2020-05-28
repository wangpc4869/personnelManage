import axios from 'axios'
import { Message, MessageBox, Notification } from 'element-ui'
import router from "@/router";

// 创建axios实例
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // headers: {
  //  'Content-Type': 'text/plain; charset=utf-8'
  // },
  timeout: 30000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  // 在发送请求之前做些什么 undefined的话，不能给参数啊
  if (!config.params) {
    // json对象作为入参 - 操控config.params
    // config.params = {}
    // 表单数据作为入参 - 操控地址栏
    config.params = new URLSearchParams()
  }
  // let configUrl = config.url.split(':');
  // let configUrl1 = configUrl[1];
  // let configUrl2 = configUrl[2];
  //过滤免token请求
  // if(configUrl2.includes('login/index')||configUrl2.includes('8011/pm25')) {
    // delete config.params.access_token
    // config.params = {}
  // }else{
    // let userMsg = getStore({ name:'userMsg' });
    // // if(localStorage.getItem('userMsg')){
    // if(sessionStorage.getItem('userMsg')){
    //     // config.params.access_token = JSON.parse(localStorage.getItem('userMsg')).content.uuid;
    //     // json对象作为入参 - 操控config.params
    //     // config.params.uuid = userMsg.uuid;
    //     // 表单数据作为入参 - 操控地址栏
    //     config.params.append('uuid',userMsg.uuid)
    // }
  // }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
});

// response拦截器
service.interceptors.response.use(
  response => response,
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  (err) => { // 这里是返回状态码不为200时候的错误处理
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误';
          break;

        case 401:
          err.message = '未授权，请登录';
          break;

        case 403:
          err.message = '拒绝访问';
          // router.push('/403');
          break;

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`;
          break;

        case 408:
          err.message = '请求超时';
          break;

        case 500:
          err.message = '服务器内部错误';
          break;

        case 501:
          err.message = '服务未实现';
          break;

        case 502:
          err.message = '网关错误';
          break;

        case 503:
          err.message = '服务不可用';
          break;

        case 504:
          err.message = '网关超时';
          break;

        case 505:
          err.message = 'HTTP版本不受支持';
          break;

        default:
          err.message = `连接错误${err.response.status}`
      }
    }else {
      // 跨域获取不到状态码或者其他状态码进行的处理
      err.message = '网络出现问题，请稍后重试'
    }
    return Promise.reject(err)
  });

export default service

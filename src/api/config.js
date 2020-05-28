
const apiURL = 'https://www.sl3.online:112/api';

const baseConfig = {
  /**
   * api配置项
   * */
  apix: {
    // //获取车辆信息
    // getCarPointInfo: { url: `${apiURL}/CarInfoManage/GetCarPointInfo` , method: 'get' },
    // //获取车辆轨迹
    // getHistoryByVehicleCode: { url: `${apiURL}/CarRealTime/GetHistoryByVehicleCode` , method: 'get' },
    //字典
    getAllowAnonymousDictionaryByString: { url: `${apiURL}/Sys_Dictionary/GetAllowAnonymousDictionaryByString` , method: 'get' },
    //获取指定城市编码的城市天气
    getCityWeatherInfo: { url: `${apiURL}/Br_tourism_scenic/GetCityWeatherInfo` , method: 'get' },
    //获取公厕列表
    getPageDataIgnoreByModel: { url: `${apiURL}/Br_tourism_toilet/getPageDataIgnoreByModel` , method: 'post' },
    toilet_pageDataIgnore: { url: `${apiURL}/Br_tourism_toilet/GetPageDataIgnore` , method: 'post' },
    //获取公厕使用概况列表
    getToiletPitStatusListDatas: { url: `${apiURL}/ScenicSpotToiletWork/GetToiletPitStatusListDatas` , method: 'post' },
    //获取公厕使用概况列表
    getToiletPitStatusListDatasBytid: { url: `${apiURL}/ScenicSpotToiletWork/GetToiletPitStatusListDatasBytid` , method: 'get' },
    //获取指定公厕的坑位实时详情
    getToiletPitStatusDatas: { url: `${apiURL}/ScenicSpotToiletWork/GetToiletPitStatusDatas` , method: 'post' },
    //获取指定公厕的坑位实时详情
    getToiletPitStatusDatasBytid: { url: `${apiURL}/ScenicSpotToiletWork/GetToiletPitStatusDatasBytid` , method: 'get' },
    //提交接口
    saveTourismtoiletcomment: { url: `${apiURL}/Br_tourism_toilet_comment/SaveTourismtoiletcomment` , method: 'post' },
    //获取微信参数
    getToiletWxConfigInfo: { url: `${apiURL}/ScenicSpotToiletWork/GetToiletWxConfigInfo` , method: 'get' },
    //获取月入厕人数统计数据
    getToiletMonthStatisticsDatasByDay: { url: `${apiURL}/ScenicSpotToiletWork/GetToiletMonthStatisticsDatasByDay` , method: 'get' },
    //获取评论列表
    getTourismtoiletcommentBytid: { url: `${apiURL}/Br_tourism_toilet_comment/GetTourismtoiletcommentBytid` , method: 'get' },
    //获取公厕列表
    getTourismScenicTolietList: { url: `${apiURL}/Br_tourism_toilet/GetTourismScenicTolietList` , method: 'get' },
    //评论列表
    getTourismtoietCommentDatasBytid: { url: `${apiURL}/Br_tourism_toilet_comment/GetTourismtoietCommentDatasBytid` , method: 'get' },
  }
};

export default baseConfig;

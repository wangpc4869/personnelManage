
const apiURL = 'https://www.sl3.online:112/api';

const baseConfig = {
  /**
   * api配置项
   * */
  apix: {
    //字典
    getAllowAnonymousDictionaryByString: { url: `${apiURL}/Sys_Dictionary/GetAllowAnonymousDictionaryByString` , method: 'get' },
  }
};

export default baseConfig;

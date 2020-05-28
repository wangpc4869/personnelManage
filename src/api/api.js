import request from '@/utility/request'
import baseConfig from '@/api/config'
const { apix } = baseConfig;

/**
 * api配置项
 * */
export function API(apixkey, param, queryData){
  const reqconfig = apix[apixkey];
  const params = param || '';
  const data = queryData || {};
  if(reqconfig){
    return request({
      ...reqconfig,
      url: `${reqconfig.url}`,
      params,
      data
    })
  }
  return {
    code: '0',
    desc: `没有找到[${apixkey}]对应的请求配置`
  }
}



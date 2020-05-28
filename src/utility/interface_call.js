
// 根据json对象获取form-data
export const getParamsByObj = (obj) => {
    let params = new URLSearchParams();
    for(let k in obj){
        params.append(k,obj[k])
    }
    return params
}

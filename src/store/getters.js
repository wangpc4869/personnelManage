/**
 * 数据仓库
 */
const getters = {
    // 登录 - 用户及其角色信息
    isLogin: state => state.user.isLogin,
    userInfo: state => state.user.userInfo,
};
export default getters

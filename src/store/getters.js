export default {
  // 用户信息
  userInfo: state => state.user.userInfo,

  // 用户ID
  userId: state => state.user.userInfo && state.user.userInfo.id
};
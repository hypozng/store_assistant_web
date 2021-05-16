import moment from "moment";

// 格式化时间
function formatDate(date, pattern) {
  return moment(date).format(pattern);
}

export default {
  moment,
  formatDate,
  // 渲染时间
  time(date) {
    return formatDate(date, "YYYY-MM-DD HH:mm");
  },
  // 渲染日期
  date(date) {
    return formatDate(date, "YYYY-MM-DD");
  }
};
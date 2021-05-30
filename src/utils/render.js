import moment from "moment";

const render = {
  // 格式化时间
  formatDate(date, pattern) {
    if (!date) {
      return "";
    }
    return moment(date).format(pattern);
  },
  // 渲染时间
  time(date) {
    return render.formatDate(date, "YYYY-MM-DD HH:mm");
  },
  // 渲染日期
  date(date) {
    return render.formatDate(date, "YYYY-MM-DD");
  },
  // 禁用状态
  disable(val) {
    return val ? "禁用" : "启用";
  },
  // 金额
  money(val) {
    val = isNaN(val) ? 0 : 0 + val;
    return "￥" + val.toFixed(2);
  }
};

export default render;
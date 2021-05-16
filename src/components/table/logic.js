import render from "@/utils/render.js";

export default {
  // 单元格渲染
  getCellRender(value, row, column) {
    let fn = function (value) {
      return value;
    };
    if (typeof column.render === "string") {
      fn = render[column.render];
    } else if (typeof column.render === "function") {
      fn = column.render;
    }
    return fn(value, row, column);
  },
  // 获取配置的属性
  getConfigProperty(prop, data) {
    if (typeof prop === "function") {
      return prop(data);
    }
    return prop;
  },

}
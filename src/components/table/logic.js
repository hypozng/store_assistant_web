import render from "@/utils/render.js";

export default {
  // 调用函数，如果fn不是函数，则直接返回fn
  call(fn, args) {
    if (typeof prop === "function") {
      return fn(args);
    }
    return fn;
  },
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
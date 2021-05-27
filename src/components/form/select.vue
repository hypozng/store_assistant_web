<template>
  <el-form-item :label="label" :prop="prop" :required="required" :rules="cRules">
    <el-select :value="value" @input="$emit('input', $event)" :style="vStyle" :placeholder="placeholder" :size="size">
      <el-option v-for="(option, index) in cOptions" :key="index" :label="option[labelKey]" :value="option[valueKey]" />
    </el-select>
  </el-form-item>
</template>
<script>
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      cRules: this.required
        ? [
            {
              required: true,
              message: "请选择" + this.label,
              trigger: ["blur", "change"],
            },
          ]
        : null,
      cOptions: [],
    };
  },
  mounted() {
    this.handleOptionsChange();
    this.handleUrlChange();
  },
  methods: {
    // 加载数据
    loadData() {
      fetch.get(this.url).then((res) => {
        this.cOptions = res.data;
      });
    },
    // 选项数据更改
    handleOptionsChange() {
      if (this.url) {
        return;
      }
      this.cOptions = this.options;
    },
    // 数据url更改
    handleUrlChange() {
      if (!this.url) {
        return;
      }
      this.loadData();
    },
  },
  watch: {
    // 监听选项值的更改
    options() {
      this.handleOptionsChange();
    },
    // 监听数据加载url的更改
    url() {
      this.handleUrlChange();
    },
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      default: null,
    },
    vStyle: {
      type: String,
      default: "width:100%",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
    size: {
      type: String,
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    url: {
      type: String,
    },
    labelKey: {
      type: String,
      default: "name",
    },
    valueKey: {
      type: String,
      default: "id",
    },
  },
};
</script>
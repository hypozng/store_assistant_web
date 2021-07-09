<template>
  <el-form-item :label="label" :prop="prop" :rules="rules">
    <el-date-picker :value="value" @input="$emit('input', $event)" :style="vStyle" :disabled="disabled" :placeholder="placeholder" :size="size" :type="type" />
  </el-form-item>
</template>
<script>
export default {
  data() {
    return {
      rules: this.required
        ? [
            {
              required: true,
              message: "请输入" + this.label,
              trigger: ["blur", "change"]
            }
          ]
        : null
    };
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    value: {
      default: null
    },
    vStyle: {
      type: String,
      default: "width:100%"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请输入"
    },
    size: {
      type: String
    },
    type: {
      type: String,
      default: "date"
    }
  }
};
</script>
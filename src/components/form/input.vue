<template>
  <el-form-item :label="label" :prop="prop" :required="required" :rules="rules">
    <el-input :value="value" @input="$emit('input', $event)" :size="size" :type="type" />
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
              trigger: ["blur", "change"],
            },
          ]
        : null,
    };
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
    size: {
      type: String,
      default: "small",
    },
    type: {
      type: String,
    },
  },
};
</script>
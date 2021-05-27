<template>
  <el-form-item :label="label" :prop="prop" :required="required" :rules="rules">
    <el-input-number
      :value="value"
      @input="$emit('input', $event)"
      :style="vStyle"
      :disabled="disabled"
      :size="size"
      :placeholder="placeholder"
      :min="0"
      :max="max"
      :step="0.5"
      :precision="2"
    />
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
    max: {
      type: Number,
    },
  },
};
</script>
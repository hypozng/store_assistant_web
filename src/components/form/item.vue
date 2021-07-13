<template>
  <el-form-item v-if="prop" :label="label" :prop="prop" :rules="rules" class="ff-item">
    <slot></slot>
  </el-form-item>
  <div v-else class="ff-item">
    <slot></slot>
  </div>
</template>
<script>
export default {
  data() {
    let rules = null;
    if (this.required) {
      rules = [{ required: true, trigger: ["blur", "change"], message: this.message.replace("{label}", this.label) }];
    }
    return {
      rules
    };
  },
  props: {
    prop: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: "请输入{label}"
    }
  }
};
</script>
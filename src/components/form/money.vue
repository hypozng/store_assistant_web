<template>
  <ff-item :label="label" :prop="prop" :required="required">
    <span v-if="readonly">{{$utils.render("money", value)}}</span>
    <el-input-number
      v-else
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
  </ff-item>
</template>
<script>
export default {
  data() {
    return {};
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
    readonly: {
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
    max: {
      type: Number
    }
  }
};
</script>
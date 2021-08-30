<template>
  <ff-item :label="label" :prop="prop">
    <span v-if="readonly">{{render()}}</span>
    <el-date-picker
      v-else
      :value="value"
      @input="$emit('input', $event)"
      :style="vStyle"
      :disabled="disabled"
      :placeholder="placeholder"
      :size="size"
      :type="type"
    />
  </ff-item>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    render() {
      return this.$moment(this.value).format("YYYY-MM-DD");
    }
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
    type: {
      type: String,
      default: "date"
    }
  }
};
</script>
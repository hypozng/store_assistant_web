<template>
  <ff-item :label="label" :prop="prop" :required="required">
    <el-select :value="value" @input="$emit('input', $event)" :style="vStyle" :placeholder="placeholder" :size="size">
      <el-option v-for="(option, index) in optionsList" :key="index" :label="option[labelKey]" :value="option[valueKey]" />
    </el-select>
  </ff-item>
</template>
<script>
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      optionsList: []
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // 加载数据
    loadData() {
      if (this.dictionaryKey) {
        this.$store.dispatch("dictionary", this.dictionaryKey).then(res => {
          this.optionsList = res.map(item => ({
            label: item.name,
            value: item.code
          }));
        });
        return;
      }
      if (this.url) {
        fetch.get(this.url).then(res => {
          this.optionsList = res.data.map(item => ({
            label: item.name,
            value: item.id
          }));
        });
        return;
      }
      this.optionsList = this.options;
    }
  },
  watch: {
    // 监听选项值的更改
    options() {
      this.loadData();
    },
    // 监听数据加载url的更改
    url() {
      this.loadData();
    },
    // 监听字典key更改
    dictionaryKey() {
      this.loadData();
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
    placeholder: {
      type: String,
      default: "请输入"
    },
    size: {
      type: String
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    url: {
      type: String
    },
    dictionaryKey: {
      type: String
    },
    labelKey: {
      type: String,
      default: "label"
    },
    valueKey: {
      type: String,
      default: "value"
    }
  }
};
</script>
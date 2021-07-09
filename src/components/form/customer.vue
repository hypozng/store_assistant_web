<template>
  <div>
    <el-dialog ref="dialog" :visible="visible" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false"></el-dialog>
    <el-form-item :label="label" :prop="prop" :rules="rules">
      <el-input :value="customer&&customer.name" :placeholder="placeholder" @click.native="openSelect" />
    </el-form-item>
  </div>
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
        : null,
      customer: null,
      visible: false
    };
  },
  methods: {
    openDialog() {
      this.visible = true;
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
      default() {
        return "请选择" + this.label;
      }
    }
  }
};
</script>
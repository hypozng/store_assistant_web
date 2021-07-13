<template>
  <ff-item :label="label" :prop="prop" :required="required">
    <v-attachment-image
      :value="value"
      @input="$emit('input', $event)"
      :style="vStyle"
      :disabled="disabled"
      :placeholder="placeholder"
      :size="size"
      :type="type"
      class="ff-image"
      style="background-color: transparent"
    />
  </ff-item>
</template>
<script>
import vAttachmentImage from "../ui/attachmentImage";
export default {
  components: {
    vAttachmentImage
  },
  data() {
    return {};
  },
  methods: {
    handleSuccess(res) {
      console.log("success", res);
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
      type: String
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
      type: String
    }
  }
};
</script>
<style>
.ff-image {
  width: 200px;
  height: 200px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}
</style>
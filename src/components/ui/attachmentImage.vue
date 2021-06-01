<template>
  <upload ref="upload" :attachment-id="attachmentId" :disabled="disabled" @success="handleSuccess">
    <div class="v-attachment-image-box" slot-scope="scope">
      <v-image
        :src="scope.data.url"
        class="v-attachment-image"
        :class="imageClassName"
        :style="imageStyle"
        :iconClassName="getIconClassName"
        :iconStyle="iconStyle"
      />
    </div>
  </upload>
</template>
<script>
import upload from "./upload";
import vImage from "./image";
export default {
  components: {
    upload,
    vImage
  },
  computed: {
    attachmentId() {
      return isNaN(this.value) ? null : parseInt(this.value);
    },
    getIconClassName() {
      if (this.iconClassName) {
        return this.iconClassName;
      }
      return this.disabled ? "el-icon-picture-outline" : "el-icon-plus";
    }
  },
  methods: {
    handleSuccess(res) {
      this.$emit("input", res && res.id);
    }
  },
  props: {
    value: {
      type: [Number, String]
    },
    uploadClassName: {
      type: String
    },
    uploadStyle: {
      type: String
    },
    imageClassName: {
      type: String
    },
    imageStyle: {
      type: String
    },
    iconClassName: {
      type: String
    },
    iconStyle: {
      type: String
    },
    defaultResult: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style>
.v-attachment-image-box {
  width: 100%;
  height: 100%;
}
.v-attachment-image {
  width: 100%;
  height: 100%;
}
</style>
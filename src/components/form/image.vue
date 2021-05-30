<template>
  <el-image
    :src="src"
    :fit="fit"
    :alt="alt"
    :referrer-policy="referrerPolicy"
    :lazy="lazy"
    :preview-src-list="previewSrcList"
    :z-index="zIndex"
    :style="imageStyle"
    :class="imageClassName"
  >
    <div slot="default" class="v-image-slot" :style="defaultStyle" :class="defaultClassName">
      <i class="el-icon-picture-outline v-icon" :style="iconStyle" :class="iconClassName" />
    </div>
    <div slot="error" class="v-image-slot" :style="defaultStyle" :class="defaultClassName">
      <i class="el-icon-picture-outline v-icon" :style="iconStyle" :class="iconClassName" />
    </div>
  </el-image>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    src: {
      type: String,
    },
    fit: {
      type: String,
      default: "cover",
    },
    alt: {
      type: String,
    },
    referrerPolicy: {
      type: String,
    },
    lazy: {
      type: Boolean,
      default: false,
    },
    previewSrcList: {
      type: Array,
    },
    zIndex: {
      type: Number,
    },
    imageStyle: {
      type: String,
    },
    imageClassName: {
      type: String,
    },
    defaultStyle: {
      type: String,
    },
    defaultClassName: {
      type: String,
    },
    iconStyle: {
      type: String,
    },
    iconClassName: {
      type: String,
    },
  },
};
</script>
<style>
.v-image-slot {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e0e0;
}
.v-icon {
  font-size: 50px;
  color: white;
}
</style>
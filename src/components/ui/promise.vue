<template>
  <span v-if="rejected">
    <slot name="rejected" :data="rejected">{{rejected}}</slot>
  </span>
  <span v-else>
    <slot :data="resolved||defaultValue">{{resolved||defaultValue}}</slot>
  </span>
</template>
<script>
export default {
  data() {
    return {
      resolved: null,
      rejected: null,
    };
  },
  mounted() {
    this.value = this.defaultValue;
    this.promise
      .then((val) => {
        this.resolved = val;
      })
      .catch((error) => {
        this.rejected = error;
      });
  },
  props: {
    promise: {
      type: Promise,
      required: true,
    },
    defaultValue: {
      default: "",
    },
  },
};
</script>
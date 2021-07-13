<template>
  <span v-if="rejected">
    <slot name="rejected" :data="rejected">{{rejected}}</slot>
  </span>
  <span v-else>
    <slot :data="resolved||defaultValue">{{resolved||defaultValue}}</slot>
  </span>
</template>
<script>
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      resolved: null,
      rejected: null
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.value = this.defaultValue;
      let promise = this.promise || fetch.get(this.url).then(res => res.data);
      promise
        .then(val => {
          this.resolved = val;
        })
        .catch(error => {
          this.rejected = error;
        });
    }
  },
  props: {
    promise: {
      type: Promise
    },
    url: {
      type: String,
      default: ""
    },
    defaultValue: {
      default: ""
    }
  }
};
</script>
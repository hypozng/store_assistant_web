<template>
  <v-promise :promise="$store.dispatch('dictionary',dictionaryKey)">
    <template slot-scope="scope">{{getValue(scope.data,value)}}</template>
  </v-promise>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    getValue(list, value) {
      if (!list || !value) {
        return "";
      }
      let item = list.find((item) => item.code == value);
      return (item && item.name) || value;
    },
  },
  props: {
    dictionaryKey: {
      type: String,
      required: true,
    },
    value: {
      default: "",
    },
  },
};
</script>
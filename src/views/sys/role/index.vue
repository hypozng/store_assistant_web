<template>
  <list ref="list" :columns="columns" :search="search" :buttons="buttons" />
</template>
<script>
import list from "@/components/list/index.vue";
import { Message } from "element-ui";
export default {
  components: {
    list,
  },
  data() {
    return {
      search: [
        { key: "name", label: "角色名称", searchType: "input" },
        { key: "code", label: "角色编码", searchType: "input" },
        { key: "remark", label: "备注", searchType: "input" },
      ],
      columns: [
        {
          key: "name",
          label: "角色名称",
          align: "left",
          sortable: false,
        },
        {
          key: "code",
          label: "角色编码",
          align: "left",
          sortable: false,
        },
        {
          key: "disabled",
          label: "禁用",
          align: "center",
          sortable: false,
        },
        {
          key: "createUserName",
          label: "创建人",
          align: "left",
          sortable: false,
        },
        {
          key: "createTime",
          label: "创建时间",
          align: "center",
          sortable: false,
        },
      ],
      buttons: [
        {
          label: "编辑",
          type: "primary",
          click: this.editMethod,
        },
        {
          label: "删除",
          type: "primary",
          click: this.deleteMethod,
        },
      ],
      searchParameter: {
        params: {},
        sort: "id",
        dir: "asc",
      },
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // 加载数据
    loadData() {
      this.$refs.list.loadData("api/sys/role/page", this.searchParameter);
    },
    // 编辑
    editMethod() {
      Message.info("编辑");
    },
    // 删除
    deleteMethod() {
      Message.info("删除");
    },
  },
};
</script>
<style>
</style>
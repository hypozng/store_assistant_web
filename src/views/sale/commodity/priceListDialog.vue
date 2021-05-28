<template>
  <el-dialog :visible.sync="visible" title="调价记录" width="700px" height="60vh" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false">
    <v-table ref="table" :url="url" :columns="columns" :search="search" :buttons="buttons" :tools="tools" :auto-load="false" sort="create_time" dir="desc" />
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      url: "api/sale/commodity/price/page",
      columns: [
        { key: "salePrice", label: "销售价格", width: "120", align: "center", render: "money" },
        { key: "purchasePrice", label: "采购价格", width: "120", align: "center", render: "money" },
        { key: "createTime", label: "调价时间", width: "180", align: "center", render: "time" },
        { key: "remark", label: "备注" }
      ],
      search: [],
      buttons: [],
      tools: []
    };
  },
  methods: {
    show(id) {
      setTimeout(() => {
        this.$refs.table.params = {
          commodityId: id
        }
        this.loadData();
      }, 200);
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    // 加载数据
    loadData() {
      this.$refs.table.loadData();
    }
  }
};
</script>
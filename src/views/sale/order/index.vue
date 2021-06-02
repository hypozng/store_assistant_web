<template>
  <div>
    <detail-dialog ref="detailDialog" />
    <v-table ref="table" :url="url" :columns="columns" :search="search" :buttons="buttons" :tools="tools" />
  </div>
</template>
<script>
import detailDialog from "./detailDialog";
export default {
  components: {
    detailDialog
  },
  data() {
    return {
      url: "api/sale/order/page",
      columns: [
        { key: "code", label: "订单号", width: "300", align: "center" },
        { key: "salePrice", label: "销售价", width: "100", align: "right", render: "money" },
        { key: "purchasePrice", label: "采购价", width: "100", align: "right", render: "money" },
        { key: "finalPrice", label: "成交价", width: "100", align: "right", render: "money" },
        { key: "paidPrice", label: "支付金额", width: "100", align: "right", render: "money" },
        { key: "remark", label: "备注", minWidth: "300" }
      ],
      search: [{ key: "code", label: "订单号" }],
      buttons: [{ label: "查看", type: "primary", click: this.detail }],
      tools: []
    };
  },
  methods: {
    loadData() {
      this.$refs.table.loadData();
    },
    detail(r) {
      this.$refs.detailDialog.show(r.id);
    }
  }
};
</script>
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
    detailDialog,
  },
  data() {
    return {
      url: "api/sale/order/page",
      columns: [
        { key: "code", label: "订单号", width: "200", align: "center" },
        { key: "name", label: "姓名", width: "100" },
        // { key: "gender", label: "性别", width: "80", align: "center", dictionaryKey: "gender" },
        { key: "tel", label: "电话", width: "150", align: "center" },
        { key: "address", label: "地址", width: "300" },
        { key: "salePrice", label: "销售价", width: "120", align: "right", render: "money" },
        // { key: "purchasePrice", label: "采购价", width: "100", align: "right", render: "money" },
        { key: "finalPrice", label: "成交价", width: "120", align: "right", render: "money" },
        { key: "paidAmount", label: "支付金额", width: "120", align: "right", render: "money" },
        { key: "createTime", label: "购买时间", width: "150", align: "center", render: "time" },
        { key: "remark", label: "备注", minWidth: "300" },
      ],
      search: [
        { key: "code", label: "订单号" },
        { key: "remark", label: "备注" },
      ],
      buttons: [{ label: "详情", type: "primary", click: this.detail }],
      tools: [],
    };
  },
  methods: {
    loadData() {
      this.$refs.table.loadData();
    },
    detail(r) {
      this.$refs.detailDialog.show(r.id);
    },
  },
};
</script>
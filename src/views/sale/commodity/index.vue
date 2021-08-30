<template>
  <div>
    <edit-dialog ref="editDialog" @success="loadData" />
    <price-list-dialog ref="priceListDialog" />
    <detail-dialog ref="detailDialog" />
    <v-table ref="table" :url="url" :columns="columns" :search="search" :buttons="buttons" :tools="tools" :operation-column-width="300" />
  </div>
</template>

<script>
import editDialog from "./editDialog";
import priceListDialog from "./priceListDialog";
import detailDialog from "./detailDialog";
export default {
  components: {
    editDialog,
    priceListDialog,
    detailDialog
  },
  data() {
    return {
      url: "api/sale/commodity/page",
      columns: [
        { key: "name", label: "商品名称", width: "200" },
        { key: "brandName", label: "品牌", align: "center", width: "100" },
        { key: "categoryName", label: "种类", align: "center", width: "120" },
        { key: "model", label: "型号", align: "center", width: "150" },
        { key: "sku", label: "SKU", align: "center", width: "150" },
        { key: "code", label: "货号", align: "center", width: "150" },
        { key: "salePrice", label: "销售价格", align: "center", width: "120" },
        { key: "purchasePrice", label: "采购价格", align: "center", width: "120" },
        { key: "amount", label: "库存数量", align: "center", width: "100" },
        { key: "remark", label: "备注", align: "left", minWidth: "300" }
      ],
      search: [
        { key: "brandId", label: "品牌", type: "select", url: "api/sale/commodityBrand" },
        { key: "categoryId", label: "种类", type: "select", url: "api/sale/commodityCategory" },
        { key: "name", label: "商品名称" },
        // { key: "price", label: "价格" },
        { key: "sku", label: "SKU" },
        { key: "code", label: "货号" }
      ],
      buttons: [
        { label: "调价记录", type: "primary", click: this.handlePriceRecordClick },
        { label: "查看", type: "primary", click: this.handleRowDetailClick },
        { label: "编辑", type: "primary", click: this.handleRowEditClick },
        { label: "删除", type: "danger", click: this.handleRowDeleteClick }
      ],
      tools: [{ label: "添加", type: "success", click: this.handleAddClick }]
    };
  },
  methods: {
    // 处理添加按钮click事件
    handleAddClick() {
      this.$refs.editDialog.show();
    },
    // 处理表格数据编辑按钮click事件
    handleRowEditClick(r) {
      this.$refs.editDialog.show(r);
    },
    // 处理表格数据查看按钮click事件
    handleRowDetailClick(r) {
      this.$refs.detailDialog.show(r.id);
    },
    // 处理表格数据详情按钮
    handlePriceRecordClick(r) {
      this.$refs.priceListDialog.show(r.id);
    },
    // 处理表格数据删除按钮delete事件
    handleRowDeleteClick(r) {
      this.$utils.delete.call(this, "api/sale/commodity/" + r.id);
    },
    // 加载数据
    loadData() {
      this.$refs.table.loadData();
    }
  }
};
</script>
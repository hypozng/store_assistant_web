<template>
  <el-dialog title="订单详情" :visible.sync="visible" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false">
    <ul class="order-commodity-list">
      <li v-for="item in formData.commodities" :key="item.id" class="order-commodity-list-item">
        <v-attachment-image :value="item.image" disabled class="item-image" />
        <div class="item-right">
          <span class="item-title" :title="item.name">{{item.name}}</span>
          <span class="item-price">{{$utils.render("money", item.salePrice)}}</span>
          <span style="margin-left:10px">×{{item.amount}}</span>
          <!-- <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleOrderDeleteClick(order.commodityId)" style="margin-left:10px" /> -->
        </div>
      </li>
    </ul>
  </el-dialog>
</template>
<script>
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      visible: false,
      id: 0,
      formData: {},
    };
  },
  methods: {
    show(id) {
      if (!id) {
        return;
      }
      this.id = id;
      this.visible = true;
      this.loadData();
    },
    close() {
      this.visible = false;
    },
    // 加载订单数据
    loadData() {
      fetch.get("api/sale/order/" + this.id).then(res => {
        this.formData = res.data;
      });
    }
  }
};
</script>
<style scoped>
.order-commodity-list {
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: scroll;
}
.order-commodity-list-item {
  box-shadow: 0 0 3px black;
  margin: 5px;
  list-style: none;
  display: flex;
  flex-direction: row;
}

.order-commodity-list-item .el-input-number {
  width: 100px;
}

.order-commodity-list-item .item-image {
  width: 80px;
  height: 80px;
}

.order-commodity-list-item .item-right {
  padding: 5px;
  margin-left: 5px;
  flex: 1;
  align-content: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}

.order-commodity-list-item .item-title {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.order-commodity-list-item .item-price {
  margin-left: 10px;
}
</style>
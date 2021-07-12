<template>
  <el-dialog title="订单详情" width="500px" :visible.sync="visible" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false">
    <div class="order-info">
      <div>
        <span class="label" style="color:black">订单号：</span>
        <span class="content" style="color:#707070;margin-left:5px">{{formData.code}}</span>
      </div>
      <ul class="order-commodity-list">
        <li v-for="item in formData.commodities" :key="item.id" class="order-commodity-list-item">
          <v-attachment-image :value="item.image" disabled class="item-image" />
          <div class="item-right">
            <span class="item-title" :title="item.commodity.name">{{item.commodity.name}}</span>
            <span class="item-price">{{$utils.render("money", item.salePrice)}}</span>
            <span style="margin-left:10px">×{{item.amount}}</span>
          </div>
        </li>
      </ul>
      <p>
        <span>{{orderAmount}}</span>
        <span>件商品，共</span>
        <span style="color:#e4393c">{{$utils.render("money", formData.salePrice)}}</span>
        <span>元，实际成交价：</span>
        <span style="color:#e4393c">{{$utils.render("money", formData.finalPrice)}}</span>
        <span>元</span>
      </p>
      <p>
        <span>支付：</span>
        <span style="color:#e4393c">{{$utils.render("money", formData.paidAmount)}}</span>
        <span>元</span>
        <template v-if="formData.paidAmount > formData.finalPrice">
          <span>，找零：</span>
          <span style="color:#e4393c">{{$utils.render("money", formData.paidAmount - formData.finalPrice)}}</span>
          <span>元</span>
        </template>
      </p>
      <p style="text-align:right">{{$utils.render("time", formData.createTime)}}</p>
      <el-divider content-position="center">客户信息</el-divider>
      <template v-if="formData.customer">
        <p>姓名：{{formData.customer.name}}</p>
        <p>电话：{{formData.customer.phone}}</p>
        <p>地址：{{formData.customer.address}}</p>
      </template>
      <template v-else>
        <p>匿名购买</p>
      </template>
      <el-divider content-position="center">备注</el-divider>
      <span>{{formData.remark || "无"}}</span>
    </div>
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
  computed: {
    orderAmount() {
      if (!this.formData || !this.formData.commodities || !this.formData.commodities.length) {
        return 0;
      }
      return this.formData.commodities.reduce((s, i) => s + i.amount, 0);
    },
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
      fetch.get("api/sale/order/" + this.id).then((res) => {
        this.formData = res.data;
      });
    },
  },
};
</script>
<style scoped>
.order-info {
  border: 1px solid #e0e0e0;
  padding: 10px;
  border-radius: 10px;
}

.order-commodity-list {
  padding: 0;
  margin: 0;
  flex: 1;
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
  color: #e4393c;
}
</style>
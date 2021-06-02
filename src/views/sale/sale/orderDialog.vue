<template>
  <el-dialog title="提交订单" :visible.sync="visible" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false">
    <el-form :model="formData" label-width="120px" size="medium">
      <el-row>
        <el-col :span="12">
          <ul class="order-commodity-list">
            <li v-for="item in commodities" :key="item.id" class="order-commodity-list-item">
              <v-attachment-image :value="item.image" disabled class="item-image" />
              <div class="item-right">
                <span class="item-title" :title="item.name">{{item.name}}</span>
                <span class="item-price">{{$utils.render("money", item.salePrice)}}</span>
                <span style="margin-left:10px">×{{item.amount}}</span>
                <!-- <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleOrderDeleteClick(order.commodityId)" style="margin-left:10px" /> -->
              </div>
            </li>
          </ul>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单价格" prop="price">{{$utils.render("money",formData.price)}}</el-form-item>
          <v-money label="成交价" prop="finalPrice" v-model="formData.finalPrice" />
          <v-money label="支付金额" prop="paidPrice" v-model="formData.paidPrice" />
          <el-form-item v-if="formData.paidPrice>formData.finalPrice" label="找零">
            <span>{{$utils.render("money", formData.paidPrice - formData.finalPrice)}}</span>
          </el-form-item>
          <el-form-item v-else-if="formData.paidPrice<formData.finalPrice" label="欠款">
            <span style="color:red">{{$utils.render("money", formData.finalPrice - formData.paidPrice)}}</span>
          </el-form-item>
          <v-textarea label="备注" prop="remark" v-model="formData.remark" />
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer">
      <el-button plain size="medium" @click="close">关闭</el-button>
      <el-button type="primary" size="medium" @click="save">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      visible: false,
      formData: {},

      commodities: []
    };
  },
  methods: {
    // 显示订单弹窗
    show(commodities) {
      if (!commodities || !commodities.length) {
        Message.error("请先添加商品");
        return;
      }
      this.commodities = commodities;
      let price = commodities.reduce((s, i) => s + i.salePrice * i.amount, 0);
      let amount = commodities.reduce((s, i) => s + i.amount);
      this.formData = {
        price,
        amount,
        finalPrice: price,
        paidPrice: price,
        commodities: commodities.map(item => ({ commodityId: item.id, amount: item.amount }))
      };
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    save() {
      this.$utils.save.call(this, "api/sale/order/save");
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
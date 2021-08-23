<template>
  <el-dialog title="提交订单" :visible.sync="visible" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false">
    <el-form :model="formData" label-width="120px" size="medium">
      <el-row>
        <el-col :span="12" style>
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
          <el-form-item label="订单价格" prop="salePrice">{{$utils.render("money", formData.salePrice)}}</el-form-item>
          <ff-money label="成交价" prop="finalPrice" v-model="formData.finalPrice" />
          <ff-money label="支付金额" prop="paidAmount" v-model="formData.paidAmount" />
          <ff-select label="支付方式" prop="payMethod" v-model="formData.payMethod" dictionaryKey="pay_method" />
          <ff-customer label="客户" prop="customerId" v-model="formData.customerId" />
          <ff-date-picker label="销售时间" prop="createTime" v-model="formData.createTime" type="datetime" />
          <el-form-item v-if="formData.paidAmount>formData.finalPrice" label="找零">
            <span>{{$utils.render("money", formData.paidAmount - formData.finalPrice)}}</span>
          </el-form-item>
          <el-form-item v-else-if="formData.paidAmount<formData.finalPrice" label="欠款">
            <span style="color:red">{{$utils.render("money", formData.finalPrice - formData.paidAmount)}}</span>
          </el-form-item>
          <ff-textarea label="备注" prop="remark" v-model="formData.remark" />
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
      orderPrice: 0,
      commodities: []
    };
  },
  watch: {
    "formData.finalPrice": function() {
      this.formData.paidAmount = this.formData.finalPrice;
    }
  },
  methods: {
    // 显示订单弹窗
    show(commodities) {
      if (!commodities || !commodities.length) {
        Message.info("请先添加商品");
        return;
      }
      this.commodities = commodities;
      let salePrice = commodities.reduce((s, i) => s + i.salePrice * i.amount, 0);
      this.formData = {
        salePrice,
        finalPrice: salePrice,
        paidAmount: salePrice,
        commodities: commodities.map(item => ({ commodityId: item.id, amount: item.amount }))
      };
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    save() {
      if (this.formData.finalPrice > this.formData.salePrice) {
        this.$confirm("订单的成交价大于订单价格，是否继续提交？").then(() => {
          this.$utils.save.call(this, "api/sale/order/save");
        });
        return;
      }
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
  height: 345px;
  overflow-y: auto;
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
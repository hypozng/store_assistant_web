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
          <ff-select label="支付方式" prop="payMethod" v-model="formData.payMethod" dictionary-key="pay_method" />
          <!-- <ff-customer label="客户" prop="customerId" v-model="formData.customerId" /> -->
          <ff-select label="配送方式" prop="distributionMode" v-model="formData.distributionMode" dictionary-key="distribution_mode" />
          <template v-if="formData.distributionMode=='0001'">
            <ff-input label="电话" prop="tel" v-model="formData.tel" />
            <ff-input label="姓名" prop="name" v-model="formData.name" />
            <ff-input label="地址" prop="address" v-model="formData.address" />
          </template>
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
import fetch from "@/utils/fetch.js"
export default {
  data() {
    return {
      visible: false,
      formData: {},
      orderPrice: 0,
      commodities: [],
      telInputTimer: null,
      customer: null,
    };
  },
  watch: {
    "formData.finalPrice": function() {
      this.formData.paidAmount = this.formData.finalPrice;
    },
    "formData.tel": function() {
      if (this.telInputTimer) {
        clearTimeout(this.telInputTimer);
      }
      this.telInputTimer = setTimeout(this.loadCustomer, 200);
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
        distributionMode: "0002",
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
    },
    // 加载客户信息
    async loadCustomer() {
      let tel = this.formData && this.formData.tel;
      if (!tel || tel.length < 7) {
        return;
      }
      let res = await fetch.get("api/sale/customer/tel/" + tel);
      this.customer = res.data;
      this.$set(this.formData, "name", this.customer && this.customer.name || "");
      this.$set(this.formData, "address", this.customer && this.customer.address || "");
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
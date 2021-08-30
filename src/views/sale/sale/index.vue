<template>
  <div class="page-main">
    <order-dialog ref="orderDialog" @success="onOrderSuccess" />

    <commodity-dialog ref="commodityDialog" />

    <!-- 商品列表 -->
    <div class="commodity-box">
      <div class="commodity-search">
        <el-select v-model="searchParameter.params.brandId" @change="loadData" size="medium" clearable>
          <v-promise url="api/sale/commodityBrand">
            <template slot-scope="scope">
              <el-option v-for="item in scope.data" :key="item.id" :label="item.name" :value="item.id" />
            </template>
          </v-promise>
        </el-select>
        <el-select v-model="searchParameter.params.categoryId" @change="loadData" size="medium" clearable>
          <v-promise url="api/sale/commodityCategory">
            <template slot-scope="scope">
              <el-option v-for="item in scope.data" :key="item.id" :label="item.name" :value="item.id" />
            </template>
          </v-promise>
        </el-select>
        <el-input v-model="searchParameter.params.keyword" @keypress.enter.native="loadData" size="medium" clearable />
        <el-button type="primary" size="medium" @click="loadData">搜索</el-button>
      </div>
      <ul class="commodity-list">
        <li v-for="item in dataList" :key="item.id" class="commodity-list-item" @click="handleItemClick(item)">
          <v-attachment-image :value="item.image" disabled class="item-image" icon-style="font-size:100px" />
          <span class="item-title link" :title="item.name" @click.stop="commodityDetail(item.id)">{{item.name}}</span>
          <span class="item-sku">
            <span :title="item.sku">{{item.sku}}</span>
            <i class="el-icon-document-copy link" title="点击复制" @click.stop="$utils.copy(item.sku)"></i>
          </span>
          <div class="item-footer">
            <span class="item-price">{{$utils.render("money", item.salePrice)}}</span>
            <span class="item-amount">{{item.amount || 0}}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 订单商品列表 -->
    <div class="order-box">
      <ul class="order-commodity-list">
        <li v-for="item in orderList" :key="item.id" class="order-commodity-list-item">
          <v-attachment-image :value="item.image" disabled class="item-image" @click.native="commodityDetail(item.id)" />
          <div class="item-right">
            <span class="item-title link" :title="item.name" @click="commodityDetail(item.id)">{{item.name}}</span>
            <span class="item-price">{{$utils.render("money", item.salePrice)}}</span>
            <el-input-number :value="item.amount" size="mini" :min="1" @input="handleOrderAmountInput(item.id,$event)" style="margin-left:10px" />
            <el-button type="danger" size="mini" icon="el-icon-delete" @click.stop="handleOrderDeleteClick(item.id)" style="margin-left:10px" />
          </div>
        </li>
      </ul>
      <div class="order-info">
        <span>共{{orderAmount||0}}件商品</span>
        <span>{{$utils.render("money",orderPrice)}}</span>
        <el-button type="primary" size="mini" @click="submitOrder">提交订单</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import fetch from "@/utils/fetch.js";
import orderDialog from "./orderDialog";
import commodityDialog from "@/views/sale/commodity/detailDialog";
export default {
  components: {
    orderDialog,
    commodityDialog
  },
  data() {
    return {
      dataList: [],
      orderList: [],
      orderInfo: {},
      searchParameter: {
        params: {
          keyword: ""
        },
        page: 1,
        size: 1000,
        sort: "id",
        dir: "asc"
      }
    };
  },
  mounted() {
    this.loadData();
  },
  computed: {
    orderAmount() {
      return this.orderList.reduce((s, i) => s + i.amount, 0);
    },
    orderPrice() {
      return this.orderList.reduce((s, i) => s + i.salePrice * i.amount, 0);
    }
  },
  methods: {
    // 处理商品列表商品点击事件
    handleItemClick(commodity) {
      let orderCommodity = this.orderList.find(item => item.id == commodity.id);
      if (orderCommodity) {
        orderCommodity.amount += 1;
        return;
      }
      orderCommodity = JSON.parse(JSON.stringify(commodity));
      orderCommodity.amount = 1;
      this.orderList.push(orderCommodity);
    },
    // 处理订单商品数量更改事件
    handleOrderAmountInput(id, val) {
      let orderCommodity = this.orderList.find(item => item.id == id);
      if (orderCommodity) {
        orderCommodity.amount = val;
      }
    },
    // 处理订单商品删除按钮点击事件
    handleOrderDeleteClick(id) {
      let orderCommodity = this.orderList.find(item => item.id == id);
      if (orderCommodity) {
        this.orderList.splice(this.orderList.indexOf(orderCommodity), 1);
      }
    },
    // 查看商品详细信息
    commodityDetail(id) {
      this.$refs.commodityDialog.show(id);
    },
    // 提交订单
    submitOrder() {
      this.$refs.orderDialog.show(this.orderList);
    },
    // 加载数据
    loadData() {
      this.$utils.showLoading.call(
        this,
        fetch.post("api/sale/commodity/page", this.searchParameter).then(res => {
          this.dataList = res.data.content;
        })
      );
    },
    onOrderSuccess() {
      this.orderList.splice(0);
      this.loadData();
    }
  }
};
</script>
<style scoped>
.page-main {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
}

.commodity-box {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.commodity-search {
  padding: 5px;
  display: flex;
  flex-direction: row;
  /* box-shadow: 0 0 3px; */
}

.commodity-search > * {
  margin-left: 10px;
}

.commodity-list {
  flex: 1;
  padding: 0;
  margin: 5px 0 0 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  place-content: flex-start;
  list-style: none;
  overflow-y: scroll;
}

.commodity-list-item {
  width: 200px;
  margin: 5px;
  box-shadow: 0 0 3px;
  position: relative;
  cursor: pointer;
  background-color: white;
}

.commodity-list-item .item-image {
  width: 200px;
  height: 200px;
}

.commodity-list-item .item-title {
  width: 100%;
  padding: 0 5px;
  display: block;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.commodity-list-item .item-footer {
  padding: 0 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.commodity-list-item .item-price {
  color: #e4393c;
}

.commodity-list-item .item-amount {
  color: blue;
  margin-left: 20px;
}

.commodity-list-item .item-sku {
  width: 100%;
  padding: 0 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #707070;
}

.commodity-list-item .item-sku span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.commodity-list-item .item-sku i {
  margin-left: 5px;
}
.commodity-list-item .item-sku i {
  margin-left: 5px;
}

.order-box {
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  /* box-shadow: 0 0 3px; */
}

.order-commodity-list {
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: scroll;
}
.order-commodity-list-item {
  margin: 10px 5px;
  box-shadow: 0 0 3px black;
  border-radius: 3px;
  overflow: hidden;
  list-style: none;
  display: flex;
  flex-direction: row;
  background-color: white;
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

.order-info {
  padding: 5px;
  box-shadow: 0 0 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.link {
  cursor: pointer;
}

.link:hover {
  color: blue;
}
</style>
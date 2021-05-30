<template>
  <div class="page-main">
    <div class="commodity-box">
      <div class="commodity-search">
        <el-select v-model="searchParameter.params.categoryId" @change="loadData" size="mini" clearable>
          <el-option v-for="category in categoryOptions" :key="category.id" :label="category.name" :value="category.id" />
        </el-select>
        <el-select v-model="searchParameter.params.brandId" @change="loadData" size="mini" clearable>
          <el-option v-for="brand in brandOptions" :key="brand.id" :label="brand.name" :value="brand.id" />
        </el-select>
        <el-input v-model="searchParameter.params.keyword" size="mini" clearable />
        <el-button type="primary" size="mini" @click="loadData">搜索</el-button>
      </div>
      <ul class="commodity-list">
        <li v-for="commodity in commodityList" :key="commodity.id" class="commodity-list-item" @click="handleCommodityClick(commodity)">
          <v-image :src="commodity.image" class="commodity-image" icon-style="font-size:100px" />
          <div class="commodity-title">{{commodity.detail}}</div>
          <span class="commodity-price">{{$utils.render("money", commodity.salePrice)}}</span>
        </li>
      </ul>
    </div>
    <div class="order-box">
      <ul class="order-list">
        <li v-for="order in orderList" :key="order.commodityId" class="order-list-item">
          <v-image :src="order.image" class="order-image" />
          <div class="order-list-item-right">
            <span class="order-title" :title="order.name">{{order.name}}</span>
            <span class="order-price">{{$utils.render("money", order.salePrice)}}</span>
            <el-input-number :value="order.amount" size="mini" :min="1" @input="handleOrderAmountInput(order.commodityId,$event)" style="margin-left:10px" />
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleOrderDeleteClick(order.commodityId)" style="margin-left:10px" />
          </div>
        </li>
      </ul>
      <div class="order-info">
        <span>共{{orderInfo.amount||0}}件商品</span>
        <span>{{$utils.render("money",orderInfo.salePrice)}}</span>
        <el-button type="primary" size="mini" style="justify-content:flex-end">提交订单</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import fetch from "@/utils/fetch.js";
export default {
  data() {
    return {
      commodityList: [],
      orderList: [],
      orderInfo: {},
      categoryOptions: [],
      brandOptions: [],
      searchParameter: { params: {} },
    };
  },
  mounted() {
    this.loadData();
    this.loadCategoryOptions();
    this.loadBrandOptions();
  },
  methods: {
    handleCommodityClick(commodity) {
      let order = this.orderList.find((item) => item.commodityId == commodity.id);
      if (order) {
        order.amount += 1;
        return;
      }
      this.orderList.push({
        commodityId: commodity.id,
        name: commodity.detail,
        image: commodity.image,
        salePrice: commodity.salePrice,
        purchasePrice: commodity.purchasePrice,
        amount: 1,
      });
      console.log(this.orderList);
      this.orderInfo.amount = this.orderList.reduce((s, n) => s + n.amount, 0);
      this.orderInfo.salePrice = this.orderList.reduce((s, n) => s + n.salePrice * n.amount, 0);
    },
    handleOrderAmountInput(id, val) {
      let order = this.orderList.find((item) => item.commodityId == id);
      if (order) {
        order.amount = val;
        this.orderInfo.amount = this.orderList.reduce((s, n) => s + n.amount, 0);
        this.orderInfo.salePrice = this.orderList.reduce((s, n) => s + n.salePrice * n.amount, 0);
      }
    },
    handleOrderDeleteClick(id) {
      let order = this.orderList.find((item) => item.commodityId == id);
      if (order) {
        this.orderList.splice(this.orderList.indexOf(order), 1);
        this.orderInfo.amount = this.orderList.reduce((s, n) => s + n.amount, 0);
        this.orderInfo.salePrice = this.orderList.reduce((s, n) => s + n.salePrice * n.amount, 0);
      }
    },
    // 加载数据
    loadData() {
      let loading = this.$loading({
        lock: true,
        text: "正在加载",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      fetch
        .post("api/sale/commodity/query", this.searchParameter)
        .then((res) => {
          this.commodityList = res.data;
        })
        .finally(() => {
          loading.close();
        });
    },
    // 加载种类数据
    loadCategoryOptions() {
      fetch.get("api/sale/commodityCategory").then((res) => {
        this.categoryOptions = res.data;
      });
    },
    // 加载品牌数据
    loadBrandOptions() {
      fetch.get("api/sale/commodityBrand").then((res) => {
        this.brandOptions = res.data;
      });
    },
  },
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
  box-shadow: 0 0 3px;
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
  justify-content: flex-start;
  list-style: none;
  overflow-y: scroll;
}
.commodity-list-item {
  width: 200px;
  margin: 5px;
  box-shadow: 0 0 3px black;
  position: relative;
  cursor: pointer;
}
.commodity-image {
  width: 200px;
  height: 200px;
}
.commodity-price {
  color: red;
  position: absolute;
  left: 0;
  top: 180px;
}
.image-slot {
  width: 100%;
  height: 100%;
}
.commodity-title {
  width: 100%;
  height: 50px;
  line-height: 25px;
  padding: 0 5px;
  box-sizing: border-box;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.order-box {
  width: 450px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  box-shadow: 0 0 3px;
}
.order-list {
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: scroll;
}
.order-list-item {
  box-shadow: 0 0 3px black;
  margin: 5px;
  list-style: none;
  display: flex;
  flex-direction: row;
}
.order-image {
  width: 80px;
  height: 80px;
}
.order-list-item-right {
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
.order-title {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.order-amount {
  width: 60px;
}
.order-price {
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
</style>
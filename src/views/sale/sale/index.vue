<template>
  <div class="page-main">
    <order-dialog ref="orderDialog" @success="orderCommodityList.splice(0);loadData()" />
    <!-- 商品列表 -->
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
        <li v-for="item in commodityList" :key="item.id" class="commodity-list-item" @click="handleCommodityClick(item)">
          <v-attachment-image :value="item.image" disabled class="item-image" icon-style="font-size:100px" />
          <span class="item-title" :title="item.name">{{item.name}}</span>
          <span class="item-sku">
            <span :title="item.sku">{{item.sku}}</span>
            <i class="el-icon-document-copy" title="点击复制" @click.stop="$utils.copy(item.sku)"></i>
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
        <li v-for="item in orderCommodityList" :key="item.id" class="order-commodity-list-item">
          <v-attachment-image :value="item.image" disabled class="item-image" />
          <div class="item-right">
            <span class="item-title" :title="item.name">{{item.name}}</span>
            <span class="item-price">{{$utils.render("money", item.salePrice)}}</span>
            <el-input-number :value="item.amount" size="mini" :min="1" @input="handleOrderAmountInput(item.id,$event)" style="margin-left:10px" />
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleOrderDeleteClick(item.id)" style="margin-left:10px" />
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
export default {
  components: {
    orderDialog
  },
  data() {
    return {
      commodityList: [],
      orderCommodityList: [],
      orderInfo: {},
      categoryOptions: [],
      brandOptions: [],
      searchParameter: { params: {} }
    };
  },
  mounted() {
    this.loadData();
    this.loadCategoryOptions();
    this.loadBrandOptions();
  },
  computed: {
    orderAmount() {
      return this.orderCommodityList.reduce((s, i) => s + i.amount, 0);
    },
    orderPrice() {
      return this.orderCommodityList.reduce((s, i) => s + i.salePrice * i.amount, 0);
    }
  },
  methods: {
    handleCommodityClick(commodity) {
      let orderCommodity = this.orderCommodityList.find(item => item.id == commodity.id);
      if (orderCommodity) {
        orderCommodity.amount += 1;
        return;
      }
      orderCommodity = JSON.parse(JSON.stringify(commodity));
      orderCommodity.amount = 1;
      this.orderCommodityList.push(orderCommodity);
    },
    handleOrderAmountInput(id, val) {
      let orderCommodity = this.orderCommodityList.find(item => item.id == id);
      if (orderCommodity) {
        orderCommodity.amount = val;
      }
    },
    handleOrderDeleteClick(id) {
      let orderCommodity = this.orderCommodityList.find(item => item.id == id);
      if (orderCommodity) {
        this.orderCommodityList.splice(this.orderCommodityList.indexOf(orderCommodity), 1);
      }
    },
    // 提交订单
    submitOrder() {
      this.$refs.orderDialog.show(this.orderCommodityList);
    },
    // 加载数据
    loadData() {
      let loading = this.$loading({
        lock: true,
        text: "正在加载",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      fetch
        .post("api/sale/commodity/query", this.searchParameter)
        .then(res => {
          this.commodityList = res.data;
        })
        .finally(() => {
          loading.close();
        });
    },
    // 加载种类数据
    loadCategoryOptions() {
      fetch.get("api/sale/commodityCategory").then(res => {
        this.categoryOptions = res.data;
      });
    },
    // 加载品牌数据
    loadBrandOptions() {
      fetch.get("api/sale/commodityBrand").then(res => {
        this.brandOptions = res.data;
      });
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

.order-box {
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  box-shadow: 0 0 3px;
}

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

.order-info {
  padding: 5px;
  box-shadow: 0 0 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>
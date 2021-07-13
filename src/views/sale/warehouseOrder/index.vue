<template>
  <div class="page">
    <div class="page-left">
      <div class="search-box">
        <el-input v-model="searchParameter.params.keyword" @input="handleSearchInput" @keypress.enter.native="loadCommodities" clearable>
          <el-button slot="append" icon="el-icon-search" @click="loadCommodities"></el-button>
        </el-input>
      </div>
      <div class="commodity-list-box">
        <ul class="commodity-list">
          <li v-for="commodity in commodities" :key="commodity.id" class="commodity-list-item" @click="handleCommodityItemClick(commodity)">
            <v-attachment-image :value="commodity.image" disabled class="item-image" />
            <span class="item-name">{{commodity.name}}</span>
          </li>
        </ul>
      </div>
      <div v-if="commodity" class="commodity-info-box">
        <div class="commodity-info-top">
          <v-attachment-image :value="commodity.image" disabled class="commodity-info-image" />
          <div class="commodity-info-top-right">
            <span class="commodity-info-name">{{commodity.name}}</span>
            <div class="flex-row space-between">
              <span>{{$utils.render("money", commodity.salePrice)}}</span>
              <span>{{commodity.amount}}件</span>
            </div>
            <div class="flex-row space-between">
              <span>sku:{{commodity.sku}}</span>
              <span>货号:{{commodity.code}}</span>
            </div>
          </div>
        </div>
        <span class="commodity-info-detail">{{commodity.detail}}</span>
        <div class="commodity-info-bottom">
          <el-input v-model="remark" placeholder="请输入备注信息" />
          <el-input-number v-model="amount" :min="1" :step="1" controls-position="right" />
          <el-button type="primary" @click="put">入库</el-button>
        </div>
      </div>
    </div>
    <div class="page-right">
      <v-table ref="table" :url="url" :columns="columns" :search="search" :buttons="buttons" :autoLoad="false" sort="create_time" dir="desc" />
    </div>
  </div>
</template>
<script>
import fetch from "@/utils/fetch.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      url: "api/sale/warehouseOrder/page",
      columns: [
        { key: "createTime", label: "时间", width: "180", align: "center", render: "time" },
        { key: "type", label: "类型", width: "100", align: "center", render: this.orderTypeRender },
        { key: "amount", label: "数量", width: "100", align: "center" },
        { key: "revoked", label: "是否撤销", width: "100", align: "center", render: this.revokedRender },
        { key: "remark", label: "备注", minWidth: "200" }
      ],
      search: [
        {
          key: "type",
          label: "类型",
          type: "select",
          data: [
            { id: 1, name: "入库" },
            { id: 2, name: "出库" }
          ]
        }
      ],
      buttons: [
        {
          label: "撤销",
          click: this.revoke,
          type: "danger",
          hidden: r => r.revoked == 1
        }
      ],
      searchParameter: {
        params: {
          keyword: ""
        },
        page: 1,
        size: 1000,
        sort: "id",
        dir: "asc"
      },
      searchInputTimer: null,
      commodities: [],
      commodity: null,
      amount: 0,
      remark: ""
    };
  },
  mounted() {
    this.loadCommodities();
  },
  destroyed() {
    if (this.searchInputTimer) {
      clearTimeout(this.searchInputTimer);
    }
  },
  methods: {
    handleSearchInput() {
      if (this.searchInputTimer) {
        clearTimeout(this.searchInputTimer);
      }
      this.searchInputTimer = setTimeout(() => {
        this.loadCommodities();
      }, 500);
    },
    handleCommodityItemClick(r) {
      this.amount = 1;
      this.remark = "";
      this.commodity = r;
      this.$refs.table.params.commodityId = r.id;
      this.loadData();
    },
    orderTypeRender(val) {
      switch (val) {
        case 1:
          return "入库";
        case 2:
          return "出库";
        default:
          return "其他";
      }
    },
    revokedRender(val) {
      return (val && "√") || "";
    },
    // 加载库存订单数据
    loadData() {
      this.$refs.table.loadData();
    },
    // 加载商品信息
    loadCommodities() {
      let commodityId = this.commodity && this.commodity.id;
      return this.$utils.showLoading.call(
        this,
        fetch.post("api/sale/commodity/page", this.searchParameter).then(res => {
          this.commodities = res.data.content;
          if (commodityId) {
            this.commodity = this.commodities.find(item => item.id == commodityId);
          }
        })
      );
    },
    // 入库
    put() {
      if (!this.commodity) {
        Message.info("请选择要入库的商品");
        return;
      }
      if (!this.amount || this.amount <= 0) {
        Message.info("请输入正确的商品入库数量");
        return;
      }
      let formData = {
        commodityId: this.commodity.id,
        amount: this.amount,
        type: 1,
        remark: this.remark
      };
      fetch.post("api/sale/warehouseOrder/save", formData).then(() => {
        this.loadData();
        this.loadCommodities();
        this.amount = 1;
        this.remark = "";
      });
    },
    revoke(r) {
      this.$confirm("确定撤销这条入库记录吗？")
        .then(() => {
          fetch.get("api/sale/warehouseOrder/revoke?id=" + r.id).then(() => {
            this.loadCommodities();
            this.loadData();
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
.page {
  display: flex;
  flex-direction: row;
}
.page-left {
  width: 500px;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.page-right {
  width: 400px;
  flex: 1;
}
.search-box {
}

.commodity-list-box {
  width: 100%;
  flex: 1;
  overflow: auto;
  margin-top: 10px;
}

.commodity-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.commodity-list-item {
  box-shadow: 0 0 3px black;
  margin: 5px;
  padding: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.item-image {
  width: 40px;
  height: 40px;
}

.item-name {
  margin-left: 10px;
}

.commodity-info-box {
  width: 100%;
  height: 300px;
  margin-top: 10px;
  box-shadow: 0 0 3px black;
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.commodity-info-top {
  display: flex;
  flex-direction: row;
}

.commodity-info-top-right {
  flex: 1;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.commodity-info-image {
  width: 80px;
  height: 80px;
}

.commodity-info-name {
  width: 100%;
}

.commodity-info-detail {
  flex: 1;
}
.commodity-info-bottom {
  margin-top: 5px;
  text-align: right;
  display: flex;
  flex-direction: row;
}
.commodity-info-bottom .el-button {
  margin-left: 5px;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.space-between {
  justify-content: space-between;
}

.space-around {
  justify-content: space-around;
}
</style>
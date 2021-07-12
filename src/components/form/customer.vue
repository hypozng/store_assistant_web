<template>
  <div>
    <el-dialog ref="dialog" title="选择客户" width="800px" :visible.sync="visible" :close-on-click-modal="false" :append-to-body="true">
      <div class="customer-list-box">
        <el-input v-model="searchParameter.params.keyword" @keypress.enter.native="loadData" clearable>
          <el-button slot="append" icon="el-icon-search" type="primary" @click="loadData"></el-button>
        </el-input>
        <ul class="customer-list">
          <li
            v-for="item in dataList"
            :key="item.id"
            class="customer-list-item"
            :class="{selected:selectedCustomer&&item.id==selectedCustomer.id}"
            @click="select(item)"
          >
            <span class="item-name">
              {{item.name}}
              <span v-html="genderRender(item.gender)"></span>
            </span>
            <span v-if="item.phone" class="item-phone">
              <i class="el-icon-phone"></i>
              {{item.phone}}
            </span>
          </li>
        </ul>
      </div>
      <div v-if="selectedCustomer" class="customer-info-box">
        <div class="customer-info-head">
          <v-attachment-image :value="selectedCustomer.photo" disabled style="width:100px;height:100px" />
          <div class="customer-info-head-right">
            <div>
              {{selectedCustomer.name}}
              <span v-html="genderRender(selectedCustomer.gender)"></span>
            </div>
            <div>
              <i class="el-icon-phone"></i>
              {{selectedCustomer.phone}}
            </div>
            <div>
              <i class="el-icon-postcard"></i>
              {{selectedCustomer.idcard}}
            </div>
          </div>
        </div>
        <div class="customer-info-line">
          <i class="el-icon-location"></i>
          {{selectedCustomer.address}}
        </div>
        <div class="customer-info-remark">{{selectedCustomer.remark}}</div>
      </div>
      <span slot="footer">
        <el-button plain size="medium" @click="closeDialog">取消</el-button>
        <el-button type="primary" size="medium" @click="submit">确定</el-button>
      </span>
    </el-dialog>
    <el-form-item :label="label" :prop="prop" :rules="rules">
      <el-input :value="customer&&customer.name" :placeholder="placeholder" @click.native="openDialog" @focus="openDialog" />
    </el-form-item>
  </div>
</template>
<script>
import fetch from "@/utils/fetch.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      rules: this.required
        ? [
            {
              required: true,
              message: "请输入" + this.label,
              trigger: ["blur", "change"]
            }
          ]
        : null,
      customer: null,
      selectedCustomer: null,
      visible: false,
      searchParameter: {
        params: {
          keyword: ""
        },
        page: 1,
        size: 100,
        sort: "id",
        dir: "asc"
      },
      dataList: []
    };
  },
  mounted() {
    this.loadCustomer();
  },
  methods: {
    openDialog() {
      console.log("value", this.value);
      this.loadData();
      this.visible = true;
    },
    closeDialog() {
      this.visible = false;
      this.selectedCustomer = null;
    },
    genderRender(gender) {
      switch (gender) {
        case "0001":
          return `<i class="el-icon-male" style="color:#0099CC;"></i>`;
        case "0002":
          return `<i class="el-icon-female" style="color:#FF9999;"></i>`;
      }
      return "";
    },
    loadData() {
      fetch.post("api/sale/customer/page", this.searchParameter).then(res => {
        this.dataList = res.data.content;
        if (this.value) {
          this.selectedCustomer = this.dataList.find(item => item.id == this.value);
        }
      });
    },
    loadCustomer(id) {
      id = id || this.value;
      if (!id) {
        return;
      }
      fetch.get("api/sale/customer/" + id).then(res => {
        this.customer = res.data;
      });
    },
    select(r) {
      this.selectedCustomer = r;
    },
    submit() {
      if (!this.selectedCustomer) {
        Message.info("请选择客户");
        return;
      }
      this.$emit("input", this.selectedCustomer.id);
      this.closeDialog();
    }
  },
  watch: {
    value() {
      this.loadCustomer();
    }
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    value: {
      default: null
    },
    vStyle: {
      type: String,
      default: "width:100%"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default() {
        return "请选择" + this.label;
      }
    }
  }
};
</script>
<style scoped>
::v-deep .el-dialog__body {
  padding: 10px;
  display: flex;
  flex-direction: row;
}
::v-deep .v-attachment-image {
  width: 100px;
  height: 100px;
}

.customer-list-box {
  width: 350px;
  height: 500px;
  font-size: 16px;
  padding: 5px;
  display: flex;
  flex-direction: column;
}

.customer-list {
  flex: 1;
  margin: 10px 0 0 0;
  padding: 0;
  overflow: auto;
}
.customer-list-item {
  list-style: none;
  margin: 5px 0;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid rgb(220 223 230);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.customer-list-item.selected {
  background-color: #cccccc;
}

.customer-info-box {
  flex: 1;
  font-size: 16px;
  margin-left: 10px;
  line-height: 20px;
}
.customer-info-head {
  display: flex;
  flex-direction: row;
}
.customer-info-head-right {
  flex: 1;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.customer-info-line {
  line-height: 30px;
}
.customer-info-remark {
  color: #777777;
}
</style>
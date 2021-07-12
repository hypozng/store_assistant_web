<template>
  <div>
    <customer-dialog ref="customerDialog" append-to-body @success="onSuccess" />

    <el-dialog ref="dialog" title="选择客户" width="400px" :visible.sync="visible" :close-on-click-modal="false" append-to-body @close="closeDialog">
      <div class="customer-list-box">
        <div class="search-box">
          <el-input v-model="searchParameter.params.keyword" @input="handleSearchInput" @keypress.enter.native="loadData" clearable>
            <el-button slot="append" icon="el-icon-search" type="primary" @click="loadData"></el-button>
          </el-input>
        </div>
        <ul class="customer-list">
          <li v-for="item in dataList" :key="item.id" class="customer-list-item" :class="{selected:selectedCustomer&&item.id==selectedCustomer.id}" @click="select(item)">
            <div v-if="selectedCustomer&&selectedCustomer.id==item.id" class="customer-info-box">
              <div class="customer-info-head">
                <v-attachment-image :value="item.photo" disabled style="width:80px;height:80px" />
                <div class="customer-info-head-right">
                  <div>
                    {{item.name}}
                    <span v-html="genderRender(item.gender)"></span>
                  </div>
                  <div>
                    <i class="el-icon-phone"></i>
                    {{item.phone}}
                  </div>
                  <div>
                    <i class="el-icon-postcard"></i>
                    {{item.idcard}}
                  </div>
                </div>
              </div>
              <div>
                <i class="el-icon-location"></i>
                {{item.address}}
              </div>
            </div>
            <template v-else>
              <span class="item-name">
                {{item.name}}
                <span v-html="genderRender(item.gender)"></span>
              </span>
              <span v-if="item.phone" class="item-phone">
                <i class="el-icon-phone"></i>
                {{item.phone}}
              </span>
            </template>
          </li>
          <li class="customer-list-item add-customer" @click="addCustomer">点击添加客户资料</li>
        </ul>
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
import customerDialog from "@/views/sale/customer/editDialog";
export default {
  components: {
    customerDialog,
  },
  data() {
    return {
      rules: this.required
        ? [
            {
              required: true,
              message: "请输入" + this.label,
              trigger: ["blur", "change"],
            },
          ]
        : null,
      customer: null,
      selectedCustomer: null,
      visible: false,
      searchInputTimer: null,
      searchParameter: {
        params: {
          keyword: "",
        },
        page: 1,
        size: 100,
        sort: "id",
        dir: "asc",
      },
      dataList: [],
    };
  },
  mounted() {
    this.loadCustomer();
  },
  destroyed() {
    if (this.searchInputTimer) {
      clearTimeout(this.searchInputTimer);
    }
  },
  methods: {
    // 打开选择对话框
    openDialog() {
      this.loadData();
      this.visible = true;
    },
    // 关闭选择对话框
    closeDialog() {
      this.visible = false;
      this.selectedCustomer = null;
    },
    // 处理输入框input事件
    handleSearchInput(val) {
      if (this.searchInputTimer) {
        clearTimeout(this.searchInputTimer);
      }
      this.searchInputTimer = setTimeout(() => {
        this.searchParameter.params.keyword = val;
        this.loadData();
      }, 500);
    },
    // 性别渲染
    genderRender(gender) {
      switch (gender) {
        case "0001":
          return `<i class="el-icon-male" style="color:#0099CC;"></i>`;
        case "0002":
          return `<i class="el-icon-female" style="color:#FF9999;"></i>`;
      }
      return "";
    },
    // 选中指定客户
    select(r) {
      this.selectedCustomer = r;
    },
    // 提交选择的客户
    submit() {
      if (!this.selectedCustomer) {
        Message.info("请选择客户");
        return;
      }
      this.$emit("input", this.selectedCustomer.id);
      this.closeDialog();
    },
    // 添加客户数据
    addCustomer() {
      this.$refs.customerDialog.show();
    },
    // 客户数据添加成功后调用
    onSuccess(r) {
      this.select(r);
      this.submit();
    },
    // 加载客户列表数据
    loadData() {
      fetch.post("api/sale/customer/page", this.searchParameter).then((res) => {
        this.dataList = res.data.content;
        if (!this.dataList.length) {
          this.selectedCustomer = null;
        } else if (!this.value) {
          this.selectedCustomer = this.dataList[0];
        } else {
          this.selectedCustomer = this.dataList.find((item) => item.id == this.value);
        }
      });
    },
    // 加载指定客户数据
    loadCustomer(id) {
      id = id || this.value;
      if (!id) {
        return;
      }
      fetch.get("api/sale/customer/" + id).then((res) => {
        this.customer = res.data;
      });
    },
  },
  watch: {
    value() {
      this.loadCustomer();
    },
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      default: null,
    },
    vStyle: {
      type: String,
      default: "width:100%",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default() {
        return "请选择" + this.label;
      },
    },
  },
};
</script>
<style scoped>
::v-deep .el-dialog__body {
  padding: 10px;
}

.customer-list-box {
  height: 500px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
}

.search-box {
  padding: 5px;
}

.customer-list {
  flex: 1;
  margin: 0;
  padding: 5px;
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
  box-shadow: 0 0 3px;
  background-color: #f0f0f0;
  border: none;
}
.customer-list-item.add-customer {
  display: block;
  text-align: center;
  color: #777777;
  background-color: transparent;
  border: none;
}
.customer-info-box {
  flex: 1;
  font-size: 16px;
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
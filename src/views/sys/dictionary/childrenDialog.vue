<template>
  <div>
    <edit-dialog ref="editDialog" @save="handleSave" />
    <el-dialog title="字典值列表" :visible.sync="visible" :close-on-click-modal="false" :append-to-body="false" :modal-append-to-body="false" width="500px">
      <ul class="dictionary-list">
        <li v-for="(item,index) in formData.children" :key="index" class="dictionary-list-item" @click="handleItemClick(item)">
          <span class="item-title">{{item.name}}</span>
          <el-button size="mini" icon="el-icon-arrow-up" :disabled="index==0" @click.stop="handleUpClick(index)"></el-button>
          <el-button size="mini" icon="el-icon-arrow-down" :disabled="index==formData.children.length-1" @click.stop="handleDownClick(index)"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click.stop="handleDeleteClick(index)"></el-button>
        </li>
      </ul>
      <el-input ref="groupName" v-model="groupName" size="small" class="group-name" clearable @keypress.enter.native="handleAddClick">
        <el-button slot="append" size="small" plain @click="handleAddClick">添加</el-button>
      </el-input>
      <span slot="footer">
        <el-button palin size="medium" @click="close">关闭</el-button>
        <el-button type="primary" size="medium" @click="save">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Message } from "element-ui";
import fetch from "@/utils/fetch.js";
import editDialog from "./editDialog";
export default {
  components: {
    editDialog
  },
  data() {
    return {
      visible: false,
      groupName: "",
      formData: {}
    };
  },
  methods: {
    handleAddClick() {
      let groupName = this.groupName.trim();
      if (!groupName) {
        return;
      }
      if (!this.formData.children) {
        this.formData.children = [];
      }
      let child = this.formData.children.find(item => item.name == groupName);
      if (child) {
        Message.info(`字典“${groupName}”已存在`);
        return;
      }
      this.formData.children.push({ name: groupName, index: this.formData.children.length - 1 });
      this.groupName = "";
    },
    handleDeleteClick(index) {
      this.formData.children.splice(index, 1);
    },
    handleUpClick(index) {
      if (index <= 0) {
        return;
      }
      this.formData.children.splice(index - 1, 0, ...this.formData.children.splice(index, 1));
    },
    handleDownClick(index) {
      if (index >= this.formData.children.length - 1) {
        return;
      }
      this.formData.children.splice(index + 1, 0, ...this.formData.children.splice(index, 1));
    },
    handleItemClick(r) {
      this.$refs.editDialog.show(r, true);
    },
    handleSave(r) {
      let child = this.formData.children.find(item => item.index == r.index);
      let index = this.formData.children.indexOf(child);
      this.formData.children.splice(index, 1, r);
    },
    show(r) {
      if (!r || !r.id) {
        return;
      }
      this.formData = JSON.parse(JSON.stringify(r));
      this.visible = true;
      this.loadData();
    },
    close() {
      this.visible = false;
    },
    async loadData() {
      let list = [];
      for (let i = 0; i < 10; ++i) {
        list.push(i);
      }
      let res = await fetch.get("api/sys/dictionary/group/" + this.formData.groupKey);
      res.data.forEach(item => (item.index = item.id));
      this.$set(this.formData, "children", res.data);
      this.$refs.groupName.focus();
    },
    async save() {
      await this.$utils.save.call(this, "api/sys/dictionary/save");
    }
  }
};
</script>
<style scoped>
::v-deep .el-dialog__body {
  padding: 10px;
}

.dictionary-list {
  height: 455px;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: auto;
}

.dictionary-list-item {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  padding: 0 10px;
  margin: 10px 5px;
  background-color: white;
  box-shadow: 0 0 5px;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.dictionary-list-item .item-title {
  flex: 1;
}

.group-name {
  margin-top: 10px;
}
</style>
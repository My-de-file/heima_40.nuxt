<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="searchname.departCity"
          @blur="handleblur1"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          v-model="searchname.destCity"
          @blur="handleblur2"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button
          style="width:100%;"
          type="primary"
          icon="el-icon-search"
          @click="handleSubmit(searchname)"
        >搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      mydata: [],
      searchname: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      value1: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now();
        }
      }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index === 1) {
        this.$confirm("目前暂不支持往返，请使用单程选票！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      this.mydata = [];
      if (value.trim() === "") {
        cb([]);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        this.mydata.push(...res.data.data);
        this.mydata = this.mydata.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
        cb(this.mydata);
      });
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      this.mydata = [];
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        this.mydata.push(...res.data.data);
        this.mydata = this.mydata.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });
      });
      cb(this.mydata);
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.searchname.departCity = item.value;
      this.searchname.departCode = item.sort;
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.searchname.destCity = item.value;
      this.searchname.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.searchname.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      // console.log('有一说一');
      let { departCity, departCode, destCity, destCode } = this.searchname;

      this.searchname.departCity = destCity;

      this.searchname.departCode = destCode;

      this.searchname.destCity = departCity;

      this.searchname.destCode = departCode;

      // console.log(this.searchname);
    },

    // 提交表单是触发
    handleSubmit(form) {
      console.log(form);
      const rules = {
        departCity: {
          value: this.searchname.departCity,
          err_message: "出发城市不能为空"
        },
        destCity: {
          value: this.searchname.destCity, //this.searchname.departDate
          err_message: "目标城市不能为空"
        },
        departDate: {
          value: this.searchname.departDate,
          err_message: "出发日期不能为空"
        }
      };
      let err = true;

      Object.keys(rules).forEach(res => {
        if (err === false) return;

        if (rules[res].value === "") {
          this.$message({message: rules[res].err_message,type: "warning"});
          err = false
        }
      });
      if(err===false)  return;
      this.$router.push({
        path: "/air/flights",
        query:form
      });
    },
    handleblur1() {
      // console.log(this.mydata[0]);
      this.searchname.departCity = this.mydata[0].value;
      this.searchname.departCode = this.mydata[0].sort;
    },
    handleblur2() {
      this.searchname.destCity = this.mydata[0].value;
      this.searchname.destCode = this.mydata[0].sort;
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>